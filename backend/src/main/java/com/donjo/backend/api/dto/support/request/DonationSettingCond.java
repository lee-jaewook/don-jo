package com.donjo.backend.api.dto.support.request;

import com.donjo.backend.db.entity.DonationSetting;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationSettingCond {
    @NotNull
    private int pricePerDonation;

    @NotNull
    private String donationEmoji;

    @NotNull
    private String donationName;

    @NotNull
    private String thankMsg;

    public DonationSettingCond getDonation(DonationSetting donationSetting){
        DonationSettingCond donationSettingCond = DonationSettingCond.builder()
                .pricePerDonation(donationSetting.getPricePerDonation())
                .donationEmoji(donationSetting.getDonationEmoji())
                .donationName(donationSetting.getDonationName())
                .thankMsg(donationSetting.getThankMsg())
                .build();
        return donationSettingCond;
    }
}

