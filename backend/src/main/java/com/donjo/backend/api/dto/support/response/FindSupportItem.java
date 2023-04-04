package com.donjo.backend.api.dto.support.response;

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
public class FindSupportItem {
    // 서포트 Uid
    private Long uid;
    // 서포트 타입
    private String supportType;
    // 보내는 사람
    private MemberItem fromMember;
    // 받는 사람
    private MemberItem toMember;
    // 댓글
    private String replyMsg;
    // 후원 금액
    private Double amount;
    // 도착 시간
    private LocalDateTime arriveTimeStamp;
    // 보낸 메세지
    private String sendMsg;
    // 트랜잭션 해쉬
    private String transactionHash;

    // 입력 받아 Dto에 저장
    public static FindSupportItem fromSupportAndMember(Support support, MemberItem fromMember, MemberItem toMember){
        return FindSupportItem.builder()
                .transactionHash(support.getTransactionHash())
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .fromMember(fromMember)
                .toMember(toMember)
                .amount(support.getAmount())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .sendMsg(support.getSendMsg())
                .replyMsg(support.getReplyMsg())
                .build();
    }
}
