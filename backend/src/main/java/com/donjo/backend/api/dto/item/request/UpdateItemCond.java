package com.donjo.backend.api.dto.item.request;

import com.donjo.backend.solidity.Item.Item;
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

    private String description;

    @NotNull
    private double price;

    private String message;

    @NotNull
    private String filePath;

    public Item from(String address){
        return Item.builder()
                .id(this.getUid())
                .title(this.getTitle())
                .imgPath(this.getImgPath())
                .description(this.getDescription())
                .price((long) (this.getPrice()*Math.pow(10, 18)))
                .message(this.getMessage())
                .filePath(this.getFilePath())
                .isDeleted(false)
                .seller(address)
                .build();
    }
}
