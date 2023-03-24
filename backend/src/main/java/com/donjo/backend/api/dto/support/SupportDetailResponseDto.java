package com.donjo.backend.api.dto.support;

import com.donjo.backend.solidity.support.SupportSol;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@Setter
@Builder
@ToString
public class SupportDetailResponseDto {
    private Long id;

    private String from;

    private String to;

    private Long supportType; //  Donation : 0, Item : 1, Wishlist : 2

    private Long amount;

    private LocalDateTime sendTimeStamp ;

    private LocalDateTime arriveTimeStamp ;

    private Long supportStatus;

    public static SupportDetailResponseDto fromSupport(Optional<SupportSol> supportSol){
        SupportDetailResponseDto supportDetailResponseDto = SupportDetailResponseDto.builder()
                .id(supportSol.get().getId())
                .supportType(supportSol.get().getSupportType())
                .amount(supportSol.get().getAmount())
                .sendTimeStamp(supportSol.get().getSendTimestamp())
                .supportStatus(supportSol.get().getSupportStatus())
                .build();
        return supportDetailResponseDto;
    }
}
