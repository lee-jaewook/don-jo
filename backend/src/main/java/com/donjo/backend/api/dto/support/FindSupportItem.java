package com.donjo.backend.api.dto.support;

import com.donjo.backend.db.entity.Member;
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
    private long uid;
    // 서포트 타입
    private String supportType;
    // 보내는 사람
    private fromMember fromMember;
    // 받는 사람
    private toMember toAddress;
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

//    private LocalDateTime sendTimeStamp;
    // fromMember 클래스 저장
    @Getter
    @Setter
    @ToString
    public static class fromMember {
        private String fromMemberAddress;

        private String fromMemberPageName;

        private String fromMemberProfileImagePath;

        private String fromMemberNickname;

    }
    // toMember 클래스 저장
    @Getter
    @Setter
    @ToString
    public static class toMember {
        private String toMemberAddress;

        private String toMemberNickname;

        private String toMemberProfileImagePath;

    }
    // Member 입력 받아 fromMember 저장
    public static FindSupportItem.fromMember getFromMember(Member member){
        FindSupportItem.fromMember newFromMember = new FindSupportItem.fromMember();
        newFromMember.setFromMemberAddress(member.getAddress());
        newFromMember.setFromMemberPageName(member.getPageName());
        newFromMember.setFromMemberProfileImagePath(member.getProfileImagePath());
        newFromMember.setFromMemberNickname(member.getNickname());
        return newFromMember;
    }
    // Member 입력 받아 toMember 저장
    public static FindSupportItem.toMember getToMember(Member member){
        FindSupportItem.toMember newToMember = new FindSupportItem.toMember();
        newToMember.setToMemberAddress(member.getAddress());
        newToMember.setToMemberNickname(member.getNickname());
        newToMember.setToMemberProfileImagePath(member.getProfileImagePath());
        return newToMember;
    }
    // 입력 받아 Dto에 저장
    public static FindSupportItem getSupport(Support support, fromMember fromMemberAddress, toMember toMemberAddress){
        FindSupportItem findSupportItem = FindSupportItem.builder()
                .transactionHash(support.getTransactionHash())
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .fromMember(fromMemberAddress)
                .toAddress(toMemberAddress)
                .amount(support.getAmount())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .sendMsg(support.getSendMsg())
                .replyMsg(support.getReplyMsg())
                .build();
        return findSupportItem;
    }
    // 입력 받아 Dto에 저장 fromMember가 없을 때
    public static FindSupportItem getSomeoneSupport(Support support, toMember toMemberAddress){
        FindSupportItem findSupportItem = FindSupportItem.builder()
                .transactionHash(support.getTransactionHash())
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .toAddress(toMemberAddress)
                .amount(support.getAmount())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .sendMsg(support.getSendMsg())
                .replyMsg(support.getReplyMsg())
                .build();
        return findSupportItem;
    }
}
