package com.donjo.backend.api.dto.wishlist.request;

import com.donjo.backend.solidity.wishlist.WishlistSol;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddWishlistCond {
    // 위시리스트 제목
    @NotNull
    private String title;
    // 위시리스트 이미지경로
    @NotNull
    private String imgPath;
    // 위시리스트 설명
    @NotNull
    private String description;
    // 위시리스트 목표금액
    @NotNull
    private Double targetAmount; // MATIC
    // 감사 메시지
    @NotNull
    private String message;
    // 엔티티에 저장
    public WishlistSol toWishlist(String memberAddress) {
        return WishlistSol.builder()
                .id(1L)
                .title(title)
                .imgPath(imgPath)
                .description(description)
                .collectedAmount(0.0)
                .targetAmount(targetAmount) // 5 Ether in wei
                .message(message)
                .isClosed(false)
                .seller(memberAddress)
                .build();
    }
}
