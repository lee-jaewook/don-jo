package com.donjo.backend.solidity.wishlist;

import com.donjo.backend.util.ConvertUtil;
import lombok.*;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistSol {
    private Long id;
    private String title;
    private String imgPath;
    private String description;
    private Double collectedAmount; // matic
    private Double targetAmount; // matic
    private String message;
    private boolean isClosed;
    private String seller;

    public ApplicationHandler.WishlistSol toSol(){
        return new ApplicationHandler.WishlistSol(
                BigInteger.valueOf(id),
                imgPath.getBytes(StandardCharsets.UTF_8),
                title.getBytes(StandardCharsets.UTF_8),
                description.getBytes(StandardCharsets.UTF_8),
                ConvertUtil.doubleToBigInteger(collectedAmount),
                ConvertUtil.doubleToBigInteger(targetAmount),
                message.getBytes(StandardCharsets.UTF_8),
                isClosed,
                seller
        );
    }

    public static WishlistSol fromSol(ApplicationHandler.WishlistSol w){
        return WishlistSol.builder()
                .id(w.id.longValue())
                .title(new String(w.title, StandardCharsets.UTF_8))
                .imgPath(new String(w.imgPath, StandardCharsets.UTF_8))
                .description(new String(w.description, StandardCharsets.UTF_8))
                .collectedAmount(ConvertUtil.bigIntegerToDouble(w.collectedAmount))
                .targetAmount(ConvertUtil.bigIntegerToDouble(w.targetAmount))
                .message(new String(w.message, StandardCharsets.UTF_8))
                .isClosed(w.isClosed)
                .seller(w.seller)
                .build();
    }
}
