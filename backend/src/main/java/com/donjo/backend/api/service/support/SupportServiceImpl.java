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
import jnr.a64asm.Mem;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.donjo.backend.solidity.support.SupportSolidity;
import com.donjo.backend.solidity.support.SupportSol;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
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
        Long result = 0L;
        for (Support support : supportList) {
            result += support.getAmount();
        }
        return result / Math.pow(10,18);
    }

    @Override
    public void createSupports(SupportRequestDto dto){
        System.out.println(dto);
        LocalDateTime sendTime = supportSolidity.getSendDateTime(dto.getToAddress(), dto.getSupportUid())
                .orElseThrow(() -> new NoContentException());
        supportRepository.save(dto.toSupport(sendTime));
    }
    @Override
    public List<SupportResponseDto> getSupports(String memberAddress, String type, int pageNum){
        List<SupportResponseDto> supportResponseDtoList = new ArrayList<>();
        List<Support> list = new ArrayList<>();

        Pageable pageable = PageRequest.of(pageNum, 15);
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
                SupportResponseDto.toMember toMember = new SupportResponseDto.toMember();
                toMember.setToMemberAddress(findToMember.getAddress());
                toMember.setToMemberNickname(findToMember.getNickname());
                SupportResponseDto supportResponseDto = SupportResponseDto.getSomeoneSupport(list.get(i),toMember);
                supportResponseDtoList.add(supportResponseDto);
            }
            else {
                SupportResponseDto.fromMember fromMember = new SupportResponseDto.fromMember();
                SupportResponseDto.toMember toMember = new SupportResponseDto.toMember();
                Member findFromMember = memberRepository.findById(list.get(i).getFromAddress()).get();
                Member findToMember = memberRepository.findById(list.get(i).getToAddress()).get();
                fromMember.setFromMemberAddress(findFromMember.getAddress());
                fromMember.setFromMemberNickname(findFromMember.getNickname());
                fromMember.setFromMemberPageName(findFromMember.getPageName());
                fromMember.setFromMemberProfileImagePath(findFromMember.getProfileImagePath());
                toMember.setToMemberAddress(findToMember.getAddress());
                toMember.setToMemberNickname(findToMember.getNickname());
                SupportResponseDto supportResponseDto = SupportResponseDto.getSupport(list.get(i), fromMember,toMember);
                supportResponseDtoList.add(supportResponseDto);
            }

        }
        return supportResponseDtoList;
    }

    @Override
    public SupportDetailResponseDto getSupportDetail(String memberAddress,String type,Long supportUid ){
        Optional<SupportSol> supportSol = supportSolidity.getSupportDetail(memberAddress,supportUid);
        SupportDetailResponseDto supportDetailResponseDto = SupportDetailResponseDto.fromSupport(supportSol);
        //web3에서 arrive 가져와야함

        //🌍 type : String
        //    - donation or
        //    - item or
        //    - wishilist or
        //    - all
        //🌍 support_uid : int
        // 서포트 상세 조회해서 Dto에 담아 리턴!



        return supportDetailResponseDto;
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
