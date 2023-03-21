package com.donjo.backend.api.dto.item.request;

import com.donjo.backend.solidity.Item.Item;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.nio.charset.StandardCharsets;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddItemCond {
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

    public Item from(String address){
        return Item.builder()
                .id(1L)
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
