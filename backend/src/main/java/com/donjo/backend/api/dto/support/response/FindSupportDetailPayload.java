package com.donjo.backend.api.dto.support.response;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
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
    // 서포트 Uid
    private Long supportUid;
    // 서포트 트랜잭션해쉬
    private String transactionHash;
    // 서포트 보내는 사람
    private fromMember from;
    // 서포트 받는 사람
    private toMember to;
    // 서포트 타입
    private String supportType; //  Donation : 0, Item : 1, Wishlist : 2
    // 서포트타입 Uid
    private Long supportTypeUid;
    // 후원 금액
    private Double amount;
    // 보낸 시간
    private LocalDateTime sendTimeStamp ;
    // 받는 시간
    private LocalDateTime arriveTimeStamp ;
    // 보내는 메세지
    private String sendMsg;

//    private Long supportStatus;

    @Getter
    @Setter
    @ToString
    public static class fromMember {
        private String fromMemberAddress;

        private String fromMemberPageName;

        private String fromMemberProfileImagePath;

        private String fromMemberNickname;

    }
    @Getter
    @Setter
    @ToString
    public static class toMember {
        private String toMemberAddress;

        private String toMemberNickname;

        private String toMemberProfileImagePath;

    }

    public static FindSupportDetailPayload.fromMember getFromMember(Member member){
        FindSupportDetailPayload.fromMember newFromMember = new FindSupportDetailPayload.fromMember();
        newFromMember.setFromMemberAddress(member.getAddress());
        newFromMember.setFromMemberPageName(member.getPageName());
        newFromMember.setFromMemberProfileImagePath(member.getProfileImagePath());
        newFromMember.setFromMemberNickname(member.getNickname());
        return newFromMember;
    }
    public static FindSupportDetailPayload.toMember getToMember(Member member){
        FindSupportDetailPayload.toMember newToMember = new FindSupportDetailPayload.toMember();
        newToMember.setToMemberAddress(member.getAddress());
        newToMember.setToMemberNickname(member.getNickname());
        newToMember.setToMemberProfileImagePath(member.getProfileImagePath());
        return newToMember;
    }

    public static FindSupportDetailPayload fromSupport(Optional<SupportSol> supportsol, Support support, fromMember fromMember, toMember toMember){
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.builder()
                .supportUid(support.getSupportUid())
                .transactionHash(support.getTransactionHash())
                .supportType(support.getSupportType())
                .to(toMember)
                .from(fromMember)
                .amount(Double.valueOf(supportsol.get().getAmount()))
                .sendTimeStamp(support.getSendTimeStamp())
                .sendMsg(support.getSendMsg())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .build();
        return findSupportDetailPayload;
    }

    public static FindSupportDetailPayload fromSomeoneSupport(Optional<SupportSol> supportsol, Support support, toMember toMember){
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.builder()
                .supportUid(support.getSupportUid())
                .transactionHash(support.getTransactionHash())
                .supportType(support.getSupportType())
                .to(toMember)
                .amount(Double.valueOf(supportsol.get().getAmount()))
                .sendTimeStamp(support.getSendTimeStamp())
                .sendMsg(support.getSendMsg())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .build();
        return findSupportDetailPayload;
    }
}
