package com.donjo.backend.api.dto.support;

import com.donjo.backend.db.entity.DonationSetting;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationDto {
    @NotNull
    private int pricePerDonation;

    @NotNull
    private String donationEmoji;

    @NotNull
    private String donationName;

    @Min(1)
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

