package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.*;
import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
import com.donjo.backend.db.repository.DonationSettingRepository;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.db.repository.SupportRepository;
import com.donjo.backend.db.repository.SupportRepositorySupport;
import com.donjo.backend.exception.NoContentException;
import com.donjo.backend.solidity.support.SupportSolidity;
import com.donjo.backend.util.Web3jUtil;
import jnr.a64asm.Mem;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.donjo.backend.solidity.support.SupportSolidity;
import com.donjo.backend.solidity.support.SupportSol;
import org.web3j.applicationhandler.ApplicationHandler;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
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
        List<Support> supportList = supportRepositorySupport.findEarning(address,type,period);
        BigInteger result = BigInteger.ZERO;
        for (Support support : supportList) {
            result=result.add(BigInteger.valueOf(support.getAmount()));
        }
        result = result.divide(BigInteger.valueOf((long) Math.pow(10,18)));
        Double resultETH = result.doubleValue();
        return resultETH;
    }

    @Override
    public void createSupports(SupportRequestDto dto){
        System.out.println(dto);
        LocalDateTime sendTime = supportSolidity.getSendDateTime(dto.getToAddress(), dto.getSupportUid())
                .orElseThrow(() -> new NoContentException());
        supportRepository.save(dto.toSupport(sendTime));
    }
    @Override
    public List<SupportResponseDto> getSupports(String memberAddress, String type, int pageNum,int pageSize){
        List<SupportResponseDto> supportResponseDtoList = new ArrayList<>();
        List<Support> list = new ArrayList<>();

        Pageable pageable = PageRequest.of(pageNum, pageSize);
        if (type.equals("all")) {
            list = supportRepository.findAllByToAddress(memberAddress,pageable);
        }
        else{
            list = supportRepository.findAllBySupportTypeAndToAddress(type, memberAddress, pageable);
        }
        System.out.println(list.get(0).getFromAddress());
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getFromAddress()==null || list.get(i).getFromAddress().isEmpty()){
                Member findToMember = memberRepository.findById(list.get(i).getToAddress()).get();
                SupportResponseDto.toMember toMember = SupportResponseDto.getToMember(findToMember);
                SupportResponseDto supportResponseDto = SupportResponseDto.getSomeoneSupport(list.get(i),toMember);
                supportResponseDtoList.add(supportResponseDto);
            }
            else {
                Member findFromMember = memberRepository.findById(list.get(i).getFromAddress()).get();
                Member findToMember = memberRepository.findById(list.get(i).getToAddress()).get();
                SupportResponseDto.fromMember fromMember = SupportResponseDto.getFromMember(findFromMember);
                SupportResponseDto.toMember toMember = SupportResponseDto.getToMember(findToMember);
                SupportResponseDto supportResponseDto = SupportResponseDto.getSupport(list.get(i), fromMember,toMember);
                supportResponseDtoList.add(supportResponseDto);
            }

        }
        return supportResponseDtoList;
    }

    @Override
    public SupportDetailResponseDto getSupportDetail(String toAddress,Long supportUid ){
        System.out.println("여기옴3?");
        Support support = supportRepository.findByToAddressAndSupportUid(toAddress,supportUid);
        System.out.println("여기옴?");
        Optional<SupportSol> supportSol = supportSolidity.getSupportDetail(toAddress,supportUid);
        System.out.println("여기옴2?");
        SupportDetailResponseDto supportDetailResponseDto = SupportDetailResponseDto.fromSupport(supportSol);

        Web3j web3 = Web3j.build(new HttpService("https://sepolia.infura.io/v3/ac3a17c914fd47a29cb5ed54315f746a"));
        try {
            EthTransaction ethTransaction = web3.ethGetTransactionByHash(support.getTransactionHash()).send();
            BigInteger blockNumber = ethTransaction.getTransaction().get().getBlockNumber();
            EthBlock ethBlock = web3.ethGetBlockByNumber(DefaultBlockParameter.valueOf(blockNumber), true).send();
            BigInteger timeStamp = ethBlock.getBlock().getTimestamp();
            if(timeStamp==null){
                return supportDetailResponseDto;
            }
            else {
                Instant instant = Instant.ofEpochSecond(timeStamp.longValue());
                LocalDateTime transactionTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                support.setArriveTimeStamp(transactionTime);
                supportDetailResponseDto.setArriveTimeStamp(transactionTime);
                return supportDetailResponseDto;
            }
        } catch (IOException e) {
            System.out.println("못찾음");
            throw new RuntimeException(e);
        }
    }
    @Override
    public int getSupportCount(String type, String memberAddress){
        List<Support> list = new ArrayList<>();
        if (type.equals("all")){
            list = supportRepository.findAllByToAddress(memberAddress);
        }
        else{
            list = supportRepository.findAllBySupportTypeAndToAddress(type, memberAddress);
        }

        return list.size();
    }


    @Override
    public DonationDto getDonationSetting(String memberAddress){
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();
        DonationDto donationDto = new DonationDto();

        return donationDto.getDonation(donationSetting);
    }

    @Override
    @Transactional
    public void changeDonation(DonationDto donationDto,String memberAddress){
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();

        donationSetting.setPricePerDonation(donationDto.getPricePerDonation());
        donationSetting.setDonationEmoji(donationDto.getDonationEmoji());
        donationSetting.setDonationName(donationDto.getDonationName());
        donationSetting.setThankMsg(donationDto.getThankMsg());
    }



    @Override
    public List<Top10ResponseDto> getTop10(){
        List<Support> supportList = supportRepositorySupport.findTop10();
        List<Top10ResponseDto> top10ResponseDtoList = new ArrayList<>();

        for (int i = 0; i < supportList.size(); i++) {
            Top10ResponseDto top10ResponseDto = Top10ResponseDto.getTop10(supportList.get(i));
            top10ResponseDtoList.add(top10ResponseDto);
        }

        return top10ResponseDtoList;
    }
}
