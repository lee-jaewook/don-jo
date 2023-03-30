package com.donjo.backend.solidity.Item;

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
public class ItemSol {
    private Long id;
    private String title;
    private String imgPath;
    private String description;
    private Double price; // matic
    private Long salesCount;
    private Double salesAmount;
    private String message;
    private String filePath;
    private boolean isDeleted;
    private String seller;

    public ApplicationHandler.ItemSol toSol(){
        BigInteger solId = BigInteger.valueOf(id);
        byte[] solTitle = title.getBytes(StandardCharsets.UTF_8);
        byte[] solImgPath = imgPath.getBytes(StandardCharsets.UTF_8);
        byte[] solDescription = description.getBytes(StandardCharsets.UTF_8);
        BigInteger solPrice = ConvertUtil.doubleToBigInteger(price);
        BigInteger solSalesCount = BigInteger.valueOf(salesCount);
        byte[] solMessage = message.getBytes(StandardCharsets.UTF_8);
        byte[] solFilePath = filePath.getBytes(StandardCharsets.UTF_8);
        Boolean solIsDeleted = isDeleted;
        String solSeller = seller;
        return new ApplicationHandler.ItemSol(solId, solTitle, solImgPath, solDescription, solPrice, solSalesCount, solMessage, solFilePath, solIsDeleted, solSeller);
    }

    public static ItemSol fromSol(ApplicationHandler.ItemSol item){
        return ItemSol.builder()
                .id(item.id.longValue())
                .title(new String(item.title, StandardCharsets.UTF_8))
                .imgPath(new String(item.imgPath, StandardCharsets.UTF_8))
                .description(new String(item.description, StandardCharsets.UTF_8))
                .price(ConvertUtil.bigIntegerToDouble(item.price))
                .salesCount(item.salesCount.longValue())
                .salesAmount(ConvertUtil.bigIntegerToDouble(item.salesCount.multiply(item.price)))
                .message(new String(item.message, StandardCharsets.UTF_8))
                .filePath(new String(item.filePath, StandardCharsets.UTF_8))
                .isDeleted(item.isDeleted.booleanValue())
                .seller(item.seller)
                .build();
    }
}
