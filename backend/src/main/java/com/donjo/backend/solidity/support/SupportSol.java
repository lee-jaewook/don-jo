package com.donjo.backend.solidity.support;

import com.donjo.backend.util.ConvertUtil;
import lombok.*;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupportSol {
    // Support Uid
    public Long id;
    // Support 보낸사람
    public String from;
    // Support 받는사람
    public String to;
    // Support 후원 금액
    public Double amount; // matic
    // Support 보낸 시간
    public LocalDateTime arriveTimestamp;
    // Support 타입
    public Long supportType; //  Donation : 0, Item : 1, Wishlist : 2
    // Support 상태
    public Long supportStatus; // 1 ok
    // Support 내보내기
    public ApplicationHandler.SupportSol toSol(){
        return new ApplicationHandler.SupportSol(
                BigInteger.valueOf(id),
                from,
                to,
                ConvertUtil.doubleToBigInteger(amount),
                ConvertUtil.convertToUint256Timestamp(arriveTimestamp),
                BigInteger.valueOf(supportType)
        );
    }
    // SupportSol에 담기
    public static SupportSol fromSol(ApplicationHandler.SupportSol s){
        return SupportSol.builder()
                .id(s.id.longValue())
                .from(s.from)
                .to(s.to)
                .amount(ConvertUtil.bigIntegerToDouble(s.amount))
                .arriveTimestamp(ConvertUtil.convertToLocalDateTime(s.arriveTime))
                .supportType(s.supportType.longValue())
                .supportStatus(1L)
                .build();
    }
}
