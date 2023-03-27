package com.donjo.backend.api.dto.wishlist.response;

import com.donjo.backend.solidity.wishlist.WishlistSol;
import lombok.*;

import java.nio.charset.StandardCharsets;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WishlistDetailPayload {
    private Long id;
    private String title;
    private String imgPath;
    private String description;
    private Double collectedAmount; // ETH
    private Double targetAmount; // ETH
    private String message;
    private boolean isClosed;
    private String seller;

    public static WishlistDetailPayload from(WishlistSol sol){
        return WishlistDetailPayload.builder()
                .id(sol.getId())
                .title(sol.getTitle())
                .imgPath(sol.getImgPath())
                .description(sol.getDescription())
                .collectedAmount(sol.getCollectedAmount() / Math.pow(10, 18))
                .targetAmount(sol.getTargetAmount() / Math.pow(10, 18))
                .message(sol.getMessage())
                .isClosed(sol.isClosed())
                .seller(sol.getSeller())
                .build();
    }
}
