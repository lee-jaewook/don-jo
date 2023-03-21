package com.donjo.backend.api.dto.support;

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

    private Integer supportUid;

    private String fromAddress;

    private String toAddress;

    private String sendMsg;

    private Double amountEth;
}
