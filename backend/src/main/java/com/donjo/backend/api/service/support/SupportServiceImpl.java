package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.request.AddReplyCond;
import com.donjo.backend.api.dto.support.request.AddSupportCond;
import com.donjo.backend.api.dto.support.request.DonationSettingCond;
import com.donjo.backend.api.dto.support.response.FindSupportDetailPayload;
import com.donjo.backend.api.dto.support.response.FindSupportItem;
import com.donjo.backend.api.dto.support.response.FindSupportListPayload;
import com.donjo.backend.api.dto.support.response.FindTop10Payload;
import com.donjo.backend.api.dto.support.response.MemberItem;
import com.donjo.backend.config.jwt.JwtFilter;
import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
import com.donjo.backend.db.repository.DonationSettingRepository;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.db.repository.SupportRepository;
import com.donjo.backend.db.repository.SupportRepositorySupport;
import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.support.SupportSolidity;
import com.donjo.backend.util.Web3jUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.donjo.backend.solidity.support.SupportSol;
import org.web3j.applicationhandler.ApplicationHandler;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;

import javax.transaction.Transactional;
import java.io.IOException;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service("SupportService")
@RequiredArgsConstructor
@EnableScheduling
public class SupportServiceImpl implements SupportService{
    // logger 선언
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    // MemberRepository 선언
    private final MemberRepository memberRepository;
    // SupportSolidity 선언
    private final SupportSolidity supportSolidity;
    // DonationSettingRepository 선언
    private final DonationSettingRepository donationSettingRepository;
    //SupportRepository 선언
    private final SupportRepository supportRepository;
    // SupportRepositorySupport 선언
    private final SupportRepositorySupport supportRepositorySupport;
    private final Web3jUtil web3jUtil;

    public Double getEarning(String address,String type,int period){
        logger.info("supportRepositorySupport.findEarning 요청");
        // Type과 Period를 변수로 넘겨 Support 리스트 가져오기
        Optional<List<Support>> supportList = Optional.ofNullable(supportRepositorySupport.findEarning(address,type,period));
        logger.info("결과값을 Wei에서 ETH로 변환");
        // list를 돌면서 amount값을 더해주고 총값을 10^18로 나눠준다(wei를 ETH로 변환)
        double totalAmountInWei = supportList.map(List::stream)
                .orElseGet(Stream::empty)
                .mapToDouble(Support::getAmount)
                .sum();

        return Double.parseDouble(String.format("%.3f", totalAmountInWei));
    }

    @Override
    public void createSupports(AddSupportCond dto){
        logger.info("DB 후원 저장");
        supportRepository.save(dto.toSupport(LocalDateTime.now()));
    }
    @Override
    public FindSupportListPayload getSupportList(String memberAddress, String type, int pageNum, int pageSize){
        // PageRequest 변수 생성
        Pageable pageable = PageRequest.of(pageNum, pageSize);

        //type과 memberAddress와 pageable 값을 넘겨서 조건에 맞는 Support 엔티티 배열 반환
        Page<Support> list = supportRepositorySupport.findAllOrderByArriveTime(type,memberAddress,pageable);

        // Dto 리스트배열 생성
        List<FindSupportItem> findSupportItemList = list.stream().map(support -> {
            Member fromMember = memberRepository.findById(support.getFromAddress())
                    .orElse(new Member(support.getFromAddress()));
            Member toMember = memberRepository.findById(support.getToAddress())
                    .orElse(new Member(support.getToAddress()));

            return FindSupportItem.fromSupportAndMember(support,
                                                        MemberItem.fromMember(fromMember),
                                                        MemberItem.fromMember(toMember));
        }).collect(Collectors.toList());

        logger.info("RESULT Support Item SIZE : {}, HasNext : {}", findSupportItemList.size(), list.hasNext());

        // supportList와 next페이지가 있는지 hashMore 던져줌
        return FindSupportListPayload.getSupportList(list.hasNext(), findSupportItemList);
    }

    @Override
    @Transactional
    public FindSupportDetailPayload getSupportDetail(String transactionHash){

        Support support = supportRepository.findById(transactionHash)
                .orElseThrow(()-> new NoContentException("트랜잭션 정보가 DB에 없습니다."));

        // 만약 도착하지 않은 후원이라면

        if(support.getSupportUid() == null){
            logger.info("후원 UID가 null 입니다.");
            // 트랜잭션 정보를 체크 합니다.
            Long supportId = checkTransactionStatus(transactionHash); // -2 = 취소된 status, -1 : 아직 도착하지 않음, 1 이상 : 도착함
            logger.info("supportUid : {}", supportId);
            if(supportId == -2) {
                supportRepository.deleteById(transactionHash);
                throw new NoContentException("취소된 후원 내역입니다.");
            }
            else if(supportId > 0){
                updateArrivedSupport(transactionHash, supportId, support);
            }
        }
        // 회원 (보낸 사람)
        Member fromMember = memberRepository.findById(support.getFromAddress())
                .orElse(Member.builder().address(support.getFromAddress()).build());
        // 회원 (받은 사람)
        Member toMember = memberRepository.findById(support.getToAddress())
                .orElse(Member.builder().address(support.getToAddress()).build());


        return FindSupportDetailPayload
                .fromSupport(support, MemberItem.fromMember(fromMember), MemberItem.fromMember(toMember));
    }

    private Long checkTransactionStatus(String transactionHash) {
        try {
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(web3jUtil.getWeb3jApi(), 0, 2);
            TransactionReceipt receipt = receiptProcessor.waitForTransactionReceipt(transactionHash);

            if (receipt == null) {
                return -1L; // 트랜잭션 처리 안된 경우
            }

            if (!receipt.isStatusOK()) {
                return -2L; // 취소된 트랜잭션
            }

            // 여기에서 솔리디티 이벤트 로그에서 ID 값을 추출합니다.
            // 예를 들어, 스마트 컨트랙트의 이벤트가 `event MyEvent(uint256 indexed id);`와 같이 정의되었다고 가정합니다.
            // 그런 경우, 다음과 같이 이벤트 로그에서 ID 값을 추출할 수 있습니다.
            List<ApplicationHandler.SupportIdEventEventResponse> myEventResponses = web3jUtil.getContractApi().getSupportIdEventEvents(receipt);

            if (myEventResponses.isEmpty()) {
                return -2L; // 취소된 트랜잭션
            }

            BigInteger id = myEventResponses.get(0).id;
            return id.longValue(); // 완료된 트랜잭션의 ID 값

        } catch (IOException | TransactionException e) {
            return -1L; // 트랜잭션 처리 안된 경우
        }
    }

    @Override
    public int getSupportCount(String type, String memberAddress){
        // 조건에 맞는 SupportList 가져오기
        List<Support> list = supportRepository.findAllBySupportCount(type,memberAddress);
        // SupportList 길이 반환
        return list.size();
    }

    @Override
    public DonationSettingCond getDonationSetting(String memberAddress){
        // memberAddress로 도네이션 정보 가지고 오기
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();
        // 도네이션 Dto에 담아서 리턴
        DonationSettingCond donationSettingCond = new DonationSettingCond();

        return donationSettingCond.getDonation(donationSetting);
    }

    @Override
    @Transactional
    public void changeDonation(DonationSettingCond donationSettingCond, String memberAddress){
        // memberAddress로 도네이션 정보 가지고 오기
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();

        // 가져온 엔티티에 Dto에 있는 Request값 넣어주기 @Transactional로 엔티티 변화가 있으면 자동저장
        donationSettingCond.updateDonationSetting(donationSetting);
    }

    @Override
    public List<FindTop10Payload> getTop10(){
        //배열 생성
        List<FindTop10Payload> findTop10PayloadList = new ArrayList<>();

        // arriveTimeStamp가 null값이 아닌, 최신 후원 10개 가져옴
        List<Support> supportList = supportRepositorySupport.findTop10();

        // Dto에 담아서 리턴
        for (Support support : supportList) {
            FindTop10Payload findTop10Payload = FindTop10Payload.getTop10(support);
            findTop10PayloadList.add(findTop10Payload);
        }

        return findTop10PayloadList;
    }

    @Override
    @Transactional
    public void saveReply(AddReplyCond dto){
        // transactionHash로 Support 가지고 오기
        Support support = supportRepository.findById(dto.getTransactionHash()).get();

        // 댓글 저장
        support.setReplyMsg(dto.getReplyMsg());
    }

    @Override
    @Transactional
    public void deleteReply(String transactionHash){
        // transactionHash로 Support 가지고 오기
        Support support = supportRepository.findById(transactionHash).get();

        // 댓글 삭제
        support.setReplyMsg(null);
    }

    @Override
    @Transactional
    public void updateArrivedSupport(String transactionHash, Long supportUid, Support support) {
        logger.info("후원 수신 주소 : {}", support.getToAddress());
        LocalDateTime arriveTimeStamp = supportSolidity.getArriveTimeStamp(support.getToAddress(), supportUid)
                .orElseThrow(()->new RuntimeException("블록체인에 후원 정보가 없습니다."));
        support.setSupportUid(supportUid);
        support.setArriveTimeStamp(arriveTimeStamp);

        // toAddress -> fromAddress : 최초의 후원인 경우
        if(supportRepositorySupport.checkFistSupport(support.getFromAddress(), support.getToAddress())){
            logger.info("{}님이 {} 에게 처음으로 후원하였습니다.",support.getFromAddress(), support.getToAddress());
            Optional<Member> member = memberRepository.findById(support.getToAddress());
            if(member.isEmpty()) return;
            member.get().setNumSupporters(member.get().getNumSupporters()+1);
        }
    }

    @Transactional
    public void getArriveTimeStamp(String transactionHash){
        // Web3j 객체를 생성하고, Infura 노드를 사용하여 polygon-mumbai 네트워크에 연결합니다
        Web3j web3 = Web3j.build(new HttpService("https://polygon-mumbai.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        try {
            System.out.println(transactionHash);
            // web3 객체를 사용하여, 특정 트랜잭션의 정보를 가져옵니다. support.getTransactionHash()는 특정 트랜잭션의 해시값을 반환합니다.
            EthTransaction ethTransaction = web3.ethGetTransactionByHash(transactionHash).send();

            // 가져온 트랜잭션 정보에서 블록 번호를 가져옵니다.
            BigInteger blockNumber = ethTransaction.getTransaction().get().getBlockNumber();

            // web3 객체를 사용하여, 특정 블록의 정보를 가져옵니다.DefaultBlockParameter.valueOf(blockNumber)는 가져올 블록의 번호를 나타냅니다.
            EthBlock ethBlock = web3.ethGetBlockByNumber(DefaultBlockParameter.valueOf(blockNumber), true).send();

            // 가져온 블록 정보에서 블록 생성 시간 정보를 가져옵니다.
            BigInteger timeStamp = ethBlock.getBlock().getTimestamp();

            // 블록 생성 시간 정보가 없을 경우, 기본값인 findSupportDetailPayload를 반환하고 함수를 종료합니다
            if(timeStamp != null){
                Instant instant = Instant.ofEpochSecond(timeStamp.longValue());
                // Instant 객체를 이용하여 LocalDateTime 객체를 생성합니다. ZoneId.systemDefault()는 현재 시스템의 시간대를 나타냅니다.
                LocalDateTime transactionTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                Optional<Support> support = supportRepository.findById(transactionHash);
                if(support.isPresent()) {
                    support.get().setArriveTimeStamp(transactionTime);
                    supportRepository.save(support.get());
                }
                // 서포트 객체에 도착시간을 저장한다.
                // Dto값에 도착시간을 넣고, Dto 리턴.
            }

        } catch (IOException e) {
            System.out.println("못찾음");
            throw new BadRequestException("정보가 존재 하지 않습니다.");
        }
    }
}
