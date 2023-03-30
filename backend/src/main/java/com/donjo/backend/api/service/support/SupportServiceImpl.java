package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.request.AddReplyCond;
import com.donjo.backend.api.dto.support.request.AddSupportCond;
import com.donjo.backend.api.dto.support.request.DonationSettingCond;
import com.donjo.backend.api.dto.support.response.FindSupportDetailPayload;
import com.donjo.backend.api.dto.support.response.FindSupportPayload;
import com.donjo.backend.api.dto.support.response.FindTop10Payload;
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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.donjo.backend.solidity.support.SupportSol;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.http.HttpService;

import javax.transaction.Transaction;
import javax.transaction.Transactional;
import java.io.IOException;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;


@Service("SupportService")
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService{
    private final MemberRepository memberRepository;
    private final SupportSolidity supportSolidity;
    private final DonationSettingRepository donationSettingRepository;
    private final SupportRepository supportRepository;
    private final SupportRepositorySupport supportRepositorySupport;

    public Double getEarning(String address,String type,int period){
        // Type과 Period를 변수로 넘겨 Support 리스트 가져오기
        Optional<List<Support>> supportList = Optional.ofNullable(supportRepositorySupport.findEarning(address,type,period));

        // list를 돌면서 amount값을 더해주고 총값을 10^18로 나눠준다(wei를 ETH로 변환)
        return supportList.map(list -> list.stream()
                        .mapToLong(Support::getAmount)
                        .sum())
                .map(result -> result.doubleValue() / Math.pow(10, 18d))
                .orElse(0.0);
    }

    @Override
    public void createSupports(AddSupportCond dto){
        // contract가서 보낸시간을 가져오고, dto의 값과 가져온 sendTime값을 넣어주고 저장한다.
        LocalDateTime sendTime = supportSolidity.getSendDateTime(dto.getToAddress(), dto.getSupportUid())
                .orElseThrow(() -> new NoContentException());
        supportRepository.save(dto.toSupport(sendTime));
    }
    @Override
    public Map<String, Object> getSupports(String memberAddress, String type, int pageNum, int pageSize){
        // Dto 리스트배열 생성
        List<FindSupportPayload> findSupportPayloadList = new ArrayList<>();

        // PageRequest 변수 생성
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Pageable nextpageable = PageRequest.of(pageNum+1, pageSize);

        //type과 memberAddress와 pageable 값을 넘겨서 조건에 맞는 Support 엔티티 배열 반환
        List<Support> list=supportRepository.findAllBySupport(type,memberAddress,pageable);
        List<Support> nextlist=supportRepository.findAllBySupport(type,memberAddress,nextpageable);

        // 다음 페이지에 값이 있는지 확인
        boolean hasMore = !nextlist.isEmpty();
        System.out.println("여기옴?");
        // 리스트를 돌면서 FromAddress가 있으면 To와From 둘다 담고 없으면 To객체만 담아서 배열에 추가(add)
        for (Support support : list) {
            System.out.println(support.getArriveTimeStamp());
            if (support.getArriveTimeStamp()==null){
                try {
                    getArriveTimeStamp(support.getTransactionHash());
                }
                catch (NoSuchElementException e){
                    e.printStackTrace();
                }
            }
            System.out.println("여기옴2?");
            if (support.getFromAddress()==null || support.getFromAddress().isEmpty()){
                Member findToMember = memberRepository.findById(support.getToAddress()).get();
                FindSupportPayload.toMember toMember = FindSupportPayload.getToMember(findToMember);
                FindSupportPayload findSupportPayload = FindSupportPayload.getSomeoneSupport(support,toMember);
                findSupportPayloadList.add(findSupportPayload);
            }
            else {
                Member findFromMember = memberRepository.findById(support.getFromAddress()).get();
                Member findToMember = memberRepository.findById(support.getToAddress()).get();
                FindSupportPayload.fromMember fromMember = FindSupportPayload.getFromMember(findFromMember);
                FindSupportPayload.toMember toMember = FindSupportPayload.getToMember(findToMember);
                FindSupportPayload findSupportPayload = FindSupportPayload.getSupport(support, fromMember,toMember);
                findSupportPayloadList.add(findSupportPayload);
            }
        }

        // supportList와 next페이지가 있는지 hashMore 던져줌
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("hasMore", hasMore);
        resultMap.put("supportList", findSupportPayloadList);

        return resultMap;
    }

    @Override
    @Transactional
    public FindSupportDetailPayload getSupportDetail(String toAddress, Long supportUid){
//         Address와 Uid로 Solidity[][] 가져오기
        FindSupportDetailPayload findSupportDetailPayload;
//        Support support = supportRepository.findById(hash).orElseThrow(()->new NoContentException());
        Optional<SupportSol> supportSol = Optional.ofNullable(supportSolidity.getSupportDetail(toAddress, supportUid).orElseThrow(() -> new NoContentException()));
        System.out.println("여기는 옴");
        System.out.println(supportSol.get().getTo());
        Support support = Optional.ofNullable(supportRepository.findByToAddressAndSupportUid(toAddress,supportUid)).orElseThrow(()-> new NoContentException());

        if (support.getArriveTimeStamp() == null) {
            try {
                getArriveTimeStamp(support.getTransactionHash());
            }
            catch (NoSuchElementException e){
                e.printStackTrace();
            }
        }
        if (support.getFromAddress()==null || support.getFromAddress().isEmpty()){
            Member findToMember = memberRepository.findById(support.getToAddress()).get();
            FindSupportDetailPayload.toMember toMember = FindSupportDetailPayload.getToMember(findToMember);
            findSupportDetailPayload = FindSupportDetailPayload.fromSomeoneSupport(support,toMember);
        }
        else {
            Member findFromMember = memberRepository.findById(support.getFromAddress()).get();
            Member findToMember = memberRepository.findById(support.getToAddress()).get();
            FindSupportDetailPayload.fromMember fromMember = FindSupportDetailPayload.getFromMember(findFromMember);
            FindSupportDetailPayload.toMember toMember = FindSupportDetailPayload.getToMember(findToMember);
            findSupportDetailPayload = FindSupportDetailPayload.fromSupport(support,fromMember,toMember);
        }


        return findSupportDetailPayload;
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

    @Transactional
    public void getArriveTimeStamp(String transactionHash){
        // Web3j 객체를 생성하고, Infura 노드를 사용하여 polygon-mumbai 네트워크에 연결합니다
        Web3j web3 = Web3j.build(new HttpService("https://polygon-mumbai.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        try {

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
