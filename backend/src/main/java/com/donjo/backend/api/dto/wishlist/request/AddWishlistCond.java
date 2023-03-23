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
    private Long targetAmount; // ETH
    @NotNull
    private String message;

    public WishlistSol toWishlist(String memberAddress) {
        return WishlistSol.builder()
                .id(1L)
                .title(title)
                .imgPath(imgPath)
                .description(description)
                .targetAmount(targetAmount)
                .message(message)
                .seller(memberAddress)
                .build();
    }
}
