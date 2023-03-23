package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.*;

import java.util.List;

public interface SupportService {
    Double getEarning(String address,String type, int period);

    int getSupportCount(String type,String memberAddress);

    DonationDto getDonationSetting(String memberAddress);

    void createSupports(SupportRequestDto supportRequestDto);

    List<SupportResponseDto> getSupports(String memberAddress, String Type, int pageNum);

    SupportDetailResponseDto getSupportDetail(String toAddress,Long supportUid);

    void changeDonation(DonationDto donationDto,String memberAddress);



    List<Top10ResponseDto> getTop10();
}
