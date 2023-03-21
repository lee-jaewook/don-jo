package com.donjo.backend.api.dto.support;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class DonationDto {
    private int pricePerDonation;

    private String donationEmoji;

    private String donationName;

    private String thankMsg;
}
