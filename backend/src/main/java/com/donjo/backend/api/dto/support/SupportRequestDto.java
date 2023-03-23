package com.donjo.backend.api.dto.support;

import com.donjo.backend.db.entity.Support;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
public class SupportRequestDto {
    private String transactionHash;
    private String supportType;

    private Long supportUid;

    private String fromAddress;

    private String toAddress;

    private String sendMsg;

    private Double amountEth;

    public Support toSupport(LocalDateTime sendTime){
        return  Support.builder()
                .transactionHash(this.getTransactionHash())
                .supportType(this.getSupportType())
                .supportUid(this.getSupportUid())
                .fromAddress(this.getFromAddress())
                .toAddress(this.getToAddress())
                .sendMsg(this.getSendMsg())
                .sendTimeStamp(sendTime)
                .amount((long) (this.getAmountEth() * Math.pow(10, 18)))
                .build();
    }
}
