package com.donjo.backend.api.dto.item.response;

import com.donjo.backend.solidity.Item.ItemSol;
import lombok.*;

import java.nio.charset.StandardCharsets;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemDetailPayload {
    private Long id;
    private String title;
    private String imgPath;
    private String description;
    private Double price; // wei
    private Long salesCount;
    private Double salesAmount;
    private String message;
    private String filePath;
    private boolean isDeleted;
    private String seller;

    public static ItemDetailPayload from(ItemSol itemSol){
        ItemDetailPayload payload = ItemDetailPayload.builder()
                .id(itemSol.getId())
                .title(itemSol.getTitle())
                .imgPath(itemSol.getImgPath())
                .description(itemSol.getDescription())
                .price(itemSol.getPrice() / Math.pow(10, 18))
                .salesCount(itemSol.getSalesCount())
                .message(itemSol.getMessage())
                .filePath(itemSol.getFilePath())
                .isDeleted(itemSol.isDeleted())
                .seller(itemSol.getSeller())
                .build();
        payload.setSalesAmount(payload.getPrice() * payload.salesCount);
        return payload;
    }
}
