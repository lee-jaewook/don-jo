package com.donjo.backend.api.dto.member;

import com.donjo.backend.db.entity.Member;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "MakeDonationSettingBuilder")
@ToString
public class DonationSettingItem {
    private int pricePerDonation;
    private String donationEmoji;
    private String donationName;
    private String thankMsg;

    public static DonationSettingItemBuilder builder(Member member) {
        return MakeDonationSettingBuilder()
                .pricePerDonation(member.getDonationSetting().getPricePerDonation())
                .donationEmoji(member.getDonationSetting().getDonationEmoji())
                .donationName(member.getDonationSetting().getDonationName())
                .thankMsg(member.getDonationSetting().getThankMsg());
    }
}
