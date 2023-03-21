package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.*;
import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
import com.donjo.backend.db.repository.DonationSettingRepository;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.db.repository.SupportRepository;
import com.donjo.backend.db.repository.SupportRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service("SupportService")
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService{

    private final MemberRepository memberRepository;
    private final DonationSettingRepository donationSettingRepository;
    private final SupportRepository supportRepository;

    private final SupportRepositorySupport supportRepositorySupport;


    public Double getEarning(String address,String type, int period){
        List<Support> supportList = supportRepositorySupport.findEarning(address,type,period);
        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 period : int
        // type과 period를 입력 받아 support 레포에 들어가서 jqpl사용?
        System.out.println(supportList);
        return null;
    }

    @Override
    public void createSupports(SupportRequestDto supportRequestDto){
        Member toMember = memberRepository.findByAddress(supportRequestDto.getToAddress());
        Member fromMember = memberRepository.findByAddress(supportRequestDto.getFromAddress());
        System.out.println(supportRequestDto);
        Support newsupport = Support.builder()
                .transactionHash(supportRequestDto.getTransactionHash())
                .supportType(supportRequestDto.getSupportType())
                .supportUid(supportRequestDto.getSupportUid())
                .fromAddress(fromMember)
                .toAddress(toMember)
                .sendMsg(supportRequestDto.getSendMsg())
                .sendTimeStamp(LocalDateTime.now())
                .amountEth(supportRequestDto.getAmountEth())
                .build();
        System.out.println(newsupport);
        supportRepository.save(newsupport);

    }
    @Override
    public List<SupportResponseDto> getSupports(String type, int pageNum){
        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 pageNum: int
        //support 조회해서 리스트로 넘겨줘야함!
        return null;
    }

    @Override
    public SupportDetailResponseDto getSupportDetail(String type,int supportUid ){
        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 support_uid : int
        // 서포트 상세 조회해서 Dto에 담아 리턴!
        return null;
    }
    @Override
    public CountResponseDto getSupportCount(String type){
        //🌍 type : String
        //- donation or
        //- item or
        //- wishilist or
        //- all
        // type을 받아 서포트 수 Dto에 담아 return!
        return null;
    }


    @Override
    public DonationDto getDonationSetting(String memberAddress){
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();
        DonationDto donationDto = DonationDto.builder()
                .pricePerDonation(donationSetting.getPricePerDonation())
                .donationEmoji(donationSetting.getDonationEmoji())
                .donationName(donationSetting.getDonationName())
                .thankMsg(donationSetting.getThankMsg())
                .build();

        return donationDto;
    }

    @Override
    @Transactional
    public void changeDonation(DonationDto donationDto,String memberAddress){
        DonationSetting donationSetting = donationSettingRepository.findById(memberAddress).get().getDonationSetting();

        donationSetting.setPricePerDonation(donationDto.getPricePerDonation());
        donationSetting.setDonationEmoji(donationDto.getDonationEmoji());
        donationSetting.setDonationName(donationDto.getDonationName());
        donationSetting.setThankMsg(donationDto.getThankMsg());
        //업데이트 해줘야함 도네이션 설정!
    }

    @Override
    public QrResponseDto getQrcode(String memberAddress){
        //맴버 접근해서 qr코드 가져오기!
        return null;
    }
}
