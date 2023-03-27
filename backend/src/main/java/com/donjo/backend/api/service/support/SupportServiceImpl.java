package com.donjo.backend.api.service.support;

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

import javax.transaction.Transactional;
import java.io.IOException;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


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
    public List<FindSupportPayload> getSupports(String memberAddress, String type, int pageNum, int pageSize){
        // Dto 리스트배열 생성
        List<FindSupportPayload> findSupportPayloadList = new ArrayList<>();

        // PageRequest 변수 생성
        Pageable pageable = PageRequest.of(pageNum, pageSize);

        //type과 memberAddress와 pageable 값을 넘겨서 조건에 맞는 Support 엔티티 배열 반환
        List<Support> list=supportRepository.findAllBySupport(type,memberAddress,pageable);

        // 리스트를 돌면서 FromAddress가 있으면 To와From 둘다 담고 없으면 To객체만 담아서 배열에 추가(add)
        for (Support support : list) {
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
        return findSupportPayloadList;
    }

    @Override
    public FindSupportDetailPayload getSupportDetail(String toAddress, Long supportUid ){
        // Address와 Uid로 Solidity[][] 가져오기
        Support support = supportRepository.findByToAddressAndSupportUid(toAddress,supportUid);
        Optional<SupportSol> supportSol = supportSolidity.getSupportDetail(toAddress,supportUid);
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.fromSupport(supportSol);

        //
        Web3j web3 = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        try {
            EthTransaction ethTransaction = web3.ethGetTransactionByHash(support.getTransactionHash()).send();
            BigInteger blockNumber = ethTransaction.getTransaction().get().getBlockNumber();
            EthBlock ethBlock = web3.ethGetBlockByNumber(DefaultBlockParameter.valueOf(blockNumber), true).send();
            BigInteger timeStamp = ethBlock.getBlock().getTimestamp();
            if(timeStamp==null){
                return findSupportDetailPayload;
            }
            else {
                Instant instant = Instant.ofEpochSecond(timeStamp.longValue());
                LocalDateTime transactionTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                support.setArriveTimeStamp(transactionTime);
                findSupportDetailPayload.setArriveTimeStamp(transactionTime);
                return findSupportDetailPayload;
            }
        } catch (IOException e) {
            System.out.println("못찾음");
            throw new BadRequestException("정보가 존재 하지 않습니다.");
        }
    }
    @Override
    public int getSupportCount(String type, String memberAddress){
        List<Support> list = supportRepository.findAllBySupportCount(type,memberAddress);

        return list.size();
    }

    @Override
    public DonationSettingCond getDonationSetting(String memberAddress){
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();
        DonationSettingCond donationSettingCond = new DonationSettingCond();

        return donationSettingCond.getDonation(donationSetting);
    }

    @Override
    @Transactional
    public void changeDonation(DonationSettingCond donationSettingCond, String memberAddress){
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();

        donationSetting.setPricePerDonation(donationSettingCond.getPricePerDonation());
        donationSetting.setDonationEmoji(donationSettingCond.getDonationEmoji());
        donationSetting.setDonationName(donationSettingCond.getDonationName());
        donationSetting.setThankMsg(donationSettingCond.getThankMsg());
    }

    @Override
    public List<FindTop10Payload> getTop10(){
        List<Support> supportList = supportRepositorySupport.findTop10();
        List<FindTop10Payload> findTop10PayloadList = new ArrayList<>();

        for (Support support : supportList) {
            FindTop10Payload findTop10Payload = FindTop10Payload.getTop10(support);
            findTop10PayloadList.add(findTop10Payload);
        }

        return findTop10PayloadList;
    }
}
