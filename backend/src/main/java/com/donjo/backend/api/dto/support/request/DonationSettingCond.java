package com.donjo.backend.api.dto.support.request;

import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Social;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationSettingCond {
    // 도네이션 개당 가격
    @NotNull
    private int pricePerDonation;
    // 도네이션 이모지
    @NotNull
    private String donationEmoji;
    // 도네이션 이름
    @NotNull
    private String donationName;
    // 감사 메세지
    @NotNull
    private String thankMsg;
    // 도네이션 정보 DTO에 담기
    public DonationSettingCond getDonation(DonationSetting donationSetting){
        DonationSettingCond donationSettingCond = DonationSettingCond.builder()
                .pricePerDonation(donationSetting.getPricePerDonation())
                .donationEmoji(donationSetting.getDonationEmoji())
                .donationName(donationSetting.getDonationName())
                .thankMsg(donationSetting.getThankMsg())
                .build();
        return donationSettingCond;
    }
    // 도네이션 Update
    public void updateDonationSetting(DonationSetting donationSetting){
        donationSetting.setDonationName(donationName);
        donationSetting.setPricePerDonation(pricePerDonation);
        donationSetting.setThankMsg(thankMsg);
        donationSetting.setDonationEmoji(donationEmoji);
    }


}

