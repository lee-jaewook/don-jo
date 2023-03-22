package com.donjo.backend.api.dto.support;

import com.donjo.backend.db.entity.DonationSetting;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationDto {
    private int pricePerDonation;

    private String donationEmoji;

    private String donationName;

    private String thankMsg;

    public DonationDto getDonation(DonationSetting donationSetting){
        DonationDto donationDto = DonationDto.builder()
                .pricePerDonation(donationSetting.getPricePerDonation())
                .donationEmoji(donationSetting.getDonationEmoji())
                .donationName(donationSetting.getDonationName())
                .thankMsg(donationSetting.getThankMsg())
                .build();
        return donationDto;
    }
}

