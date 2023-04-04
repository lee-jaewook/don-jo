package com.donjo.backend.api.dto.support.request;

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
public class AddSupportCond {

    // transactionHash 값
    @NotNull
    private String transactionHash;

    // supportType(donation,item,wishlist)
    @NotNull
    private String supportType;

    // TypeUid
    private Long supportTypeUid;

    // transaction Uid값
//    @NotNull
//    private Long supportUid;

    // 보낸 사람 주소
    @NotNull
    private String fromAddress;

    // 보낸 사람 주소
    @NotNull
    private String toAddress;

    // 후원할 때 보낸 메세지
    private String sendMsg;

    // 보낸 금액
    @NotNull
    private Double amountEth;

    //
    public Support toSupport(LocalDateTime sendTime){
        // 빌더 방식으로 DB에 저장
        return  Support.builder()
                .transactionHash(this.getTransactionHash())
                .supportType(this.getSupportType())
                .supportTypeUid(this.getSupportTypeUid())
                .supportUid(null)
                .fromAddress(this.getFromAddress())
                .toAddress(this.getToAddress())
                .sendMsg(this.getSendMsg())
                .sendTimeStamp(sendTime)
                .amount(this.getAmountEth())
                .build();
    }
}
