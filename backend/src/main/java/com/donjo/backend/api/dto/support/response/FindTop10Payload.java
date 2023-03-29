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
    private Double amount;

    private String supportType;

    private LocalDateTime arriveTimeStamp;


    public static FindTop10Payload getTop10(Support support){
        FindTop10Payload findTop10Payload = FindTop10Payload.builder()
                .amount((double) (support.getAmount()/ Math.pow(10, 18d)))
                .supportType(support.getSupportType())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .build();
        return findTop10Payload;
    }
}

