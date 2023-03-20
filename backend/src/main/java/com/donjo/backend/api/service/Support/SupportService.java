package com.donjo.backend.api.service.Support;

import com.donjo.backend.api.dto.Support.*;

import java.util.List;

public interface SupportService {
    Double getEarning(String type, int period);

    CountResponseDto getSupportCount(String type);

    DonationDto getDonationSetting(String memberAddress);

    List<SupportResponseDto> getSupports(String Type, int pageNum);

    SupportDetailResponseDto getSupportDetail(String type,int supportUid);

    void changeDonation(DonationDto donationDto);

    QrResponseDto getQrcode(String memberAddress);
}
