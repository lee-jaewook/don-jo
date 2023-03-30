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
    // 도네이션 단위
    private int pricePerDonation;
    // 도네이션 이모지
    private String donationEmoji;
    // 도네이션 이름
    private String donationName;
    // 감사 메세지
    private String thankMsg;
    // 도네이션정보 DTO에 담기
    public static DonationSettingItemBuilder builder(Member member) {
        return MakeDonationSettingBuilder()
                .pricePerDonation(member.getDonationSetting().getPricePerDonation())
                .donationEmoji(member.getDonationSetting().getDonationEmoji())
                .donationName(member.getDonationSetting().getDonationName())
                .thankMsg(member.getDonationSetting().getThankMsg());
    }
}
