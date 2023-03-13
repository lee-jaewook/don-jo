package com.donjo.backend.api.dto.Support;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DonationRequestDto {

    private int pricePerDonation;

    private String donationEmoji;

    private String donationName;

    private String thankMsg;
}
