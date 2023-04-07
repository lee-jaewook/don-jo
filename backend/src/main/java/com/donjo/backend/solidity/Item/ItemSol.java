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
    // Item Uid
    private Long id;
    // Item 제목
    private String title;
    // 아이템 이미지경로
    private String imgPath;
    // 아이템 설명
    private String description;
    // 아이템 가격
    private Double price; // matic
    // 아이템 판매 횟수
    private Long salesCount;
    // 아이템 판매 총 금액
    private Double salesAmount;
    // 아이템 구매 메세지
    private String message;
    // 아이템 파일 경로
    private String filePath;
    // 아이템 삭제 여부
    private boolean isDeleted;
    // 아이템 판매자
    private String seller;
    // 블록체인 가능한 형태로 변환
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
    // ItemSol에 데이터 저장
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
