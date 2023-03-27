package com.donjo.backend.api.dto.support.response;

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
public class FindSupportDetailPayload {
    private Long id;

    private String from;

    private String to;

    private Long supportType; //  Donation : 0, Item : 1, Wishlist : 2

    private Long supportTypeUid;

    private Double amount;

    private LocalDateTime sendTimeStamp ;

    private LocalDateTime arriveTimeStamp ;

    private Long supportStatus;

    public static FindSupportDetailPayload fromSupport(Optional<SupportSol> supportSol){
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.builder()
                .id(supportSol.get().getId())
                .supportType(supportSol.get().getSupportType())
                .amount(Double.valueOf(supportSol.get().getAmount()))
                .sendTimeStamp(supportSol.get().getSendTimestamp())
                .supportStatus(supportSol.get().getSupportStatus())
                .build();
        return findSupportDetailPayload;
    }
}
