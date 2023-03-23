package com.donjo.backend.api.dto.support;

import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Support;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Top10ResponseDto {
    private Long amount;

    private String supportType;

    private LocalDateTime arriveTimeStamp;


    public static Top10ResponseDto getTop10(Support support){
        Top10ResponseDto top10ResponseDto = Top10ResponseDto.builder()
                .amount((long) (support.getAmount()/ Math.pow(10, 18)))
                .supportType(support.getSupportType())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .build();
        return top10ResponseDto;
    }
}

