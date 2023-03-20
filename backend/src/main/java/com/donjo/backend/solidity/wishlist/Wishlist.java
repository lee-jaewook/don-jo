package com.donjo.backend.solidity.wishlist;

import lombok.*;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wishlist {
    private Long id;
    private String title;
    private String imgPath;
    private String description;
    private Long collectedAmount; // wei
    private Long targetAmount; // wei
    private String message;
    private boolean isClosed;
    private String seller;

    public ApplicationHandler.Wishlist toSol(){
        return new ApplicationHandler.Wishlist(
                BigInteger.valueOf(id),
                imgPath.getBytes(StandardCharsets.UTF_8),
                title.getBytes(StandardCharsets.UTF_8),
                description.getBytes(StandardCharsets.UTF_8),
                BigInteger.valueOf(collectedAmount),
                BigInteger.valueOf(targetAmount),
                message.getBytes(StandardCharsets.UTF_8),
                isClosed,
                seller
        );
    }

    public static Wishlist fromSol(ApplicationHandler.Wishlist w){
        return Wishlist.builder()
                .id(w.id.longValue())
                .title(new String(w.title, StandardCharsets.UTF_8))
                .imgPath(new String(w.imgPath, StandardCharsets.UTF_8))
                .description(new String(w.description, StandardCharsets.UTF_8))
                .collectedAmount(w.collectedAmount.longValue())
                .targetAmount(w.targetAmount.longValue())
                .message(new String(w.message, StandardCharsets.UTF_8))
                .isClosed(w.isClosed)
                .seller(w.seller)
                .build();
    }
}
