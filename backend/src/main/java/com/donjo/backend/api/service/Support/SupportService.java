package com.donjo.backend.api.service.Support;

import com.donjo.backend.api.dto.Support.*;

import java.util.List;

public interface SupportService {
    EarningsResponseDto getEarning(String type, int period);

    CountResponseDto getSupportCount(String type);

    DonationResponseDto getDonationSetting(int uid);

    List<SupportResponseDto> getSupports(String Type, int pageNum);

    SupportDetailResponseDto getSupportDetail(String type,int supportUid);

    void changeDonation(DonationRequestDto donationRequestDto);

    QrResponseDto getQrcode(int uid);
}
