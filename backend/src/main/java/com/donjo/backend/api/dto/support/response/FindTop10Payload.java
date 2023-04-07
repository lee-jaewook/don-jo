package com.donjo.backend.api.dto.support.response;

import com.donjo.backend.db.entity.Support;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindTop10Payload {
    // 후원 금액
    private Double amount;
    // 후원 타입
    private String supportType;
    // 도착 시간
    private LocalDateTime arriveTimeStamp;

    // Entity DTO에 담기
    public static FindTop10Payload getTop10(Support support){
        FindTop10Payload findTop10Payload = FindTop10Payload.builder()
                .amount(support.getAmount())
                .supportType(support.getSupportType())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .build();
        return findTop10Payload;
    }
}

