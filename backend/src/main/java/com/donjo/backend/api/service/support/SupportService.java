package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.request.AddSupportCond;
import com.donjo.backend.api.dto.support.request.DonationSettingCond;
import com.donjo.backend.api.dto.support.response.FindSupportDetailPayload;
import com.donjo.backend.api.dto.support.response.FindSupportPayload;
import com.donjo.backend.api.dto.support.response.FindTop10Payload;

import java.util.List;

public interface SupportService {
    Double getEarning(String address,String type, int period);

    int getSupportCount(String type,String memberAddress);

    DonationSettingCond getDonationSetting(String memberAddress);

    void createSupports(AddSupportCond addSupportCond);

    List<FindSupportPayload> getSupports(String memberAddress, String Type, int pageNum, int pageSize);

    FindSupportDetailPayload getSupportDetail(String toAddress, Long supportUid);

    void changeDonation(DonationSettingCond donationSettingCond, String memberAddress);

    List<FindTop10Payload> getTop10();
}
