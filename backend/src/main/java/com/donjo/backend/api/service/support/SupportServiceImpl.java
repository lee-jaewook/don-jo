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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service("SupportService")
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService{

    private final MemberRepository memberRepository;
    private final SupportSolidity supportSolidity;
    private final DonationSettingRepository donationSettingRepository;
    private final SupportRepository supportRepository;

    private final SupportRepositorySupport supportRepositorySupport;


    public Double getEarning(String address,String type, int period){
        List<Support> supportList = supportRepositorySupport.findEarning(address, type, period);
        Long result = 0L;
        for (Support support : supportList) {
            result += support.getAmount();
        }
        return result / Math.pow(10,18);
    }

    @Override
    public void createSupports(SupportRequestDto dto){
        LocalDateTime sendTime = supportSolidity.getSendDateTime(dto.getToAddress(), dto.getSupportUid())
                .orElseThrow(() -> new NoContentException());
        supportRepository.save(dto.toSupport(sendTime));
    }
    @Override
    public List<SupportResponseDto> getSupports(String memberAddress, String type, int pageNum){
        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 pageNum: int
        //support 조회해서 리스트로 넘겨줘야함!
        Pageable pageable = PageRequest.of(pageNum, 15);
        List<Support> list = supportRepository.findAllBySupportTypeAndToAddress(type, memberAddress, pageable);

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
