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
    // Item ID
    private Long id;
    // Item 제목
    private String title;
    // Item 이미지 경로
    private String imgPath;
    // Item 설명
    private String description;
    // Item 가격
    private Double price; // matic
    // Item 판매횟수
    private Long salesCount;
    // Item 판매 총량
    private Double salesAmount;
    // Item 감사 메세지
    private String message;
    // Item 파일 경로
    private String filePath;
    // Item 삭제여부
    private boolean isDeleted;
    // 판매자
    private String seller;
    // 객체 입력 받아 Dto 저장
    public static ItemDetailPayload from(ItemSol itemSol){
        return ItemDetailPayload.builder()
                .id(itemSol.getId())
                .title(itemSol.getTitle())
                .imgPath(itemSol.getImgPath())
                .description(itemSol.getDescription())
                .price(itemSol.getPrice())
                .salesCount(itemSol.getSalesCount())
                .salesAmount(itemSol.getSalesAmount())
                .message(itemSol.getMessage())
                .filePath(itemSol.getFilePath())
                .isDeleted(itemSol.isDeleted())
                .seller(itemSol.getSeller())
                .build();
    }
}
