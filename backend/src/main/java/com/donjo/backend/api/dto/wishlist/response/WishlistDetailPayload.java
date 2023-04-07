package com.donjo.backend.api.dto.wishlist.response;

import com.donjo.backend.solidity.wishlist.WishlistSol;
import lombok.*;

import java.nio.charset.StandardCharsets;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WishlistDetailPayload {
    // 위시리스트 UID 값
    private Long id;
    // 위시리스트 제목
    private String title;
    // 위시리스트 이미지 경로
    private String imgPath;
    // 위시리스트 설명
    private String description;
    // 위시리스트 현재 모금액
    private Double collectedAmount; // MATIC
    // 위시리스트 목표 모금액
    private Double targetAmount; // MATIC
    // 감사 메세지
    private String message;
    // 삭제 여부
    private boolean isClosed;
    // 판매자
    private String seller;
    // DTO에 담기
    public static WishlistDetailPayload from(WishlistSol sol){
        return WishlistDetailPayload.builder()
                .id(sol.getId())
                .title(sol.getTitle())
                .imgPath(sol.getImgPath())
                .description(sol.getDescription())
                .collectedAmount(sol.getCollectedAmount())
                .targetAmount(sol.getTargetAmount())
                .message(sol.getMessage())
                .isClosed(sol.isClosed())
                .seller(sol.getSeller())
                .build();
    }
}
