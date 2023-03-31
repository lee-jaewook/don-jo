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
    // 위시리시트 Uid
    private Long id;
    // 위시리시트 제목
    private String title;
    // 위시리시트 이미지경로
    private String imgPath;
    // 위시리시트 설명
    private String description;
    // 위시리시트 지금까지 후원 금액
    private Double collectedAmount; // matic
    // 위시리스트 목표 금액
    private Double targetAmount; // matic
    // 위시리스트 감사 메세지
    private String message;
    // 위시리스트 종료 여부 판단
    private boolean isClosed;
    // 위시리스트 판매자
    private String seller;
    // 위시리스트 Sol 변환
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
    // 위시르스트 WishlistSol에 담기
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
