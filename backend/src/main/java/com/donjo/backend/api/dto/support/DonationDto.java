package com.donjo.backend.api.dto.support;

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
}
