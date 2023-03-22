package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.*;

import java.util.List;

public interface SupportService {
    Double getEarning(String address,String type, int period);

    CountResponseDto getSupportCount(String type);

    DonationDto getDonationSetting(String memberAddress);

    void createSupports(SupportRequestDto supportRequestDto);

    List<SupportResponseDto> getSupports(String memberAddress, String Type, int pageNum);

    SupportDetailResponseDto getSupportDetail(String type,int supportUid);

    void changeDonation(DonationDto donationDto,String memberAddress);

    QrResponseDto getQrcode(String memberAddress);
}
