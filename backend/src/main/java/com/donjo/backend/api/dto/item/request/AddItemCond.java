package com.donjo.backend.api.dto.item.request;

import com.donjo.backend.solidity.Item.ItemSol;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddItemCond {
    // 아이템 제목
    @NotNull
    @Size(min = 2)
    private String title;
    // 아이템 이미지 경로
    @NotNull
    private String imgPath;
    // 아이템 설명
    @NotNull
    private String description;
    // 아이템 가격
    @NotNull
    private Double price;
    // 구매 메세지
    @NotNull
    private String message;
    // 아이템 파일 경로
    @NotNull
    private String filePath;
    // ItemSol 객체 생성
    public ItemSol from(String address){
        return ItemSol.builder()
                .id(1L)
                .title(this.getTitle())
                .imgPath(this.getImgPath())
                .description(this.getDescription())
                .price(this.getPrice())
                .salesCount(0L)
                .salesAmount(0.0)
                .message(this.getMessage())
                .filePath(this.getFilePath())
                .isDeleted(false)
                .seller(address)
                .build();
    }
}
