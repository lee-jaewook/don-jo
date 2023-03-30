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
    // 위시리스트 Uid값
    private Long uid;
    // 위시리스트 제목
    private String title;
    // 위시리스트 이미지 경로
    private String imgPath;
    // 위시리스트 지금까지 달성 수입
    private Double collectedAmount;
    // 위시리스트 목표 금액
    private Double totalAmount;
    // wishlist DTO에 담기
    public static WishListItemBuilder builder(WishlistSol wishlistSol) {
        return MakeWishListItemBuilder()
                .uid(wishlistSol.getId())
                .title(wishlistSol.getTitle())
                .imgPath(wishlistSol.getImgPath())
                .collectedAmount(wishlistSol.getCollectedAmount())
                .totalAmount(wishlistSol.getTargetAmount());

    }
}
