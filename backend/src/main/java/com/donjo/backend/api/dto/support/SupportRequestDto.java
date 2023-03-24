package com.donjo.backend.api.dto.support;

import com.donjo.backend.db.entity.Support;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
public class SupportRequestDto {
    @NotNull
    private String transactionHash;
    @NotNull
    private String supportType;
    @NotNull
    private Long supportUid;

    private String fromAddress;
    @NotNull
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
                .amount((long) (this.getAmountEth() * Math.pow(10, 18d)))
                .build();
    }
}
