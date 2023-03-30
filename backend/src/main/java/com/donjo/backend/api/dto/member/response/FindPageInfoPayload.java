package com.donjo.backend.api.dto.member.response;

import com.donjo.backend.api.dto.member.DonationSettingItem;
import com.donjo.backend.api.dto.member.MemberInfoItem;
import com.donjo.backend.api.dto.member.WishListItem;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "MakeFindPageInfoPayloadBuilder")
public class FindPageInfoPayload {
    // 개인 아이템리스트
    private MemberInfoItem memberInfoItem;
    // 개인 도네이션 셋팅
    private DonationSettingItem donationSetting;
    // 개인 위시리스트
    private List<WishListItem> wishList;
    // page 정보 DTO에 담기
    public static FindPageInfoPayloadBuilder builder(MemberInfoItem memberInfoItem, DonationSettingItem donationSetting, List<WishListItem> wishListItems) {
        return MakeFindPageInfoPayloadBuilder()
            .memberInfoItem(memberInfoItem)
            .donationSetting(donationSetting)
            .wishList(wishListItems);
    }
}
