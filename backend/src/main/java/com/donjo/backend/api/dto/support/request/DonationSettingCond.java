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

    public void updateDonationSetting(DonationSetting donationSetting){
        donationSetting.setDonationName(donationName);
        donationSetting.setPricePerDonation(pricePerDonation);
        donationSetting.setThankMsg(thankMsg);
        donationSetting.setDonationEmoji(donationEmoji);
    }


}

