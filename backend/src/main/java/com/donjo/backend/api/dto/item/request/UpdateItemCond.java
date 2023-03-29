package com.donjo.backend.api.dto.item.request;

import com.donjo.backend.api.dto.item.response.ItemDetailPayload;
import com.donjo.backend.solidity.Item.ItemSol;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateItemCond {
    @NotNull
    private Long uid;

    @NotNull
    @Size(min = 2)
    private String title;

    @NotNull
    private String imgPath;

    @NotNull
    private String description;

    @NotNull
    private Double price;

    @NotNull
    private String message;

    @NotNull
    private String filePath;

    public ItemSol from(String address, ItemDetailPayload item){
        return ItemSol.builder()
                .id(this.getUid())
                .title(this.getTitle())
                .imgPath(this.getImgPath())
                .description(this.getDescription())
                .price((long) (this.getPrice()*Math.pow(10, 18)))
                .salesCount(item.getSalesCount())
                .salesAmount((long)(item.getSalesAmount() * Math.pow(10,18)))
                .message(this.getMessage())
                .filePath(this.getFilePath())
                .isDeleted(false)
                .seller(address)
                .build();
    }
}
