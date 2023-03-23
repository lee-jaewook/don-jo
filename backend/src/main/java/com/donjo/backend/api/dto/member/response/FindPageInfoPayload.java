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
    private MemberInfoItem memberInfoItem;
    private DonationSettingItem donationSetting;
    private List<WishListItem> wishList;

    public static FindPageInfoPayloadBuilder builder(MemberInfoItem memberInfoItem, DonationSettingItem donationSetting, List<WishListItem> wishListItems) {
        return MakeFindPageInfoPayloadBuilder()
            .memberInfoItem(memberInfoItem)
            .donationSetting(donationSetting)
            .wishList(wishListItems);
    }
}
