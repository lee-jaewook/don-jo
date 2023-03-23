package com.donjo.backend.api.dto.member;

import com.donjo.backend.solidity.wishlist.WishlistSol;
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

    public static WishListItemBuilder builder(WishlistSol wishlistSol) {
        return MakeWishListItemBuilder()
                .uid(wishlistSol.getId())
                .title(wishlistSol.getTitle())
                .imgPath(wishlistSol.getImgPath())
                .collectedAmount(wishlistSol.getCollectedAmount())
                .totalAmount(wishlistSol.getTargetAmount());

    }
}
