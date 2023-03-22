package com.donjo.backend.api.dto.member;

import com.donjo.backend.solidity.wishlist.Wishlist;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "MakeWishListItemBuilder")
@ToString
public class WishListItem {
    private Long uid;
    private String title;
    private String imgPath;
    private Long collectedAmount;
    private Long totalAmount;

    public static WishListItemBuilder builder(Wishlist wishlist) {
        return MakeWishListItemBuilder()
                .uid(wishlist.getId())
                .title(wishlist.getTitle())
                .imgPath(wishlist.getImgPath())
                .collectedAmount(wishlist.getCollectedAmount())
                .totalAmount(wishlist.getTargetAmount());

    }
}
