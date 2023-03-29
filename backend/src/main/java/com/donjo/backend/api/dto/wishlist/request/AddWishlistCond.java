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
    @NotNull
    private String title;
    @NotNull
    private String imgPath;
    @NotNull
    private String description;
    @NotNull
    private Double targetAmount; // ETH
    @NotNull
    private String message;

    public WishlistSol toWishlist(String memberAddress) {
        return WishlistSol.builder()
                .id(1L)
                .title(title)
                .imgPath(imgPath)
                .description(description)
                .collectedAmount(0L) // 1 Ether in wei
                .targetAmount((long) (targetAmount * Math.pow(10, 18))) // 5 Ether in wei
                .message(message)
                .isClosed(false)
                .seller(memberAddress)
                .build();
    }
}
