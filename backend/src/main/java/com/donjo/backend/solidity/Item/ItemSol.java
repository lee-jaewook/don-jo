package com.donjo.backend.solidity.Item;

import lombok.*;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemSol {
    private Long id;
    private String title;
    private String imgPath;
    private String description;
    private Long price; // wei
    private String message;
    private String filePath;
    private boolean isDeleted;
    private String seller;

    public ApplicationHandler.ItemSol toSol(){
        BigInteger solId = BigInteger.valueOf(id);
        byte[] solTitle = title.getBytes(StandardCharsets.UTF_8);
        byte[] solImgPath = imgPath.getBytes(StandardCharsets.UTF_8);
        byte[] solDescription = description.getBytes(StandardCharsets.UTF_8);
        BigInteger solPrice = BigInteger.valueOf(price);
        byte[] solMessage = message.getBytes(StandardCharsets.UTF_8);
        byte[] solFilePath = filePath.getBytes(StandardCharsets.UTF_8);
        Boolean solIsDeleted = isDeleted;
        String solSeller = seller;
        return new ApplicationHandler.ItemSol(solId, solTitle, solImgPath, solDescription, solPrice, solMessage, solFilePath, solIsDeleted, solSeller);
    }

    public static ItemSol fromSol(ApplicationHandler.ItemSol item){
        return ItemSol.builder()
                .id(item.id.longValue())
                .title(new String(item.title, StandardCharsets.UTF_8))
                .imgPath(new String(item.imgPath, StandardCharsets.UTF_8))
                .description(new String(item.description, StandardCharsets.UTF_8))
                .price(item.price.longValue())
                .message(new String(item.message, StandardCharsets.UTF_8))
                .filePath(new String(item.filePath, StandardCharsets.UTF_8))
                .isDeleted(item.isDeleted.booleanValue())
                .seller(item.seller)
                .build();
    }
}
