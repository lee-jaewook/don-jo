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
    private Long supportUid;

    private String transactionHash;

    private fromMember from;

    private toMember to;

    private String supportType; //  Donation : 0, Item : 1, Wishlist : 2

//    private Long supportTypeUid;

    private Double amount;

    private LocalDateTime sendTimeStamp ;

    private LocalDateTime arriveTimeStamp ;

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

    public static FindSupportDetailPayload fromSupport(Support support,fromMember fromMember, toMember toMember){
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.builder()
                .supportUid(support.getSupportUid())
                .transactionHash(support.getTransactionHash())
                .supportType(support.getSupportType())
                .to(toMember)
                .from(fromMember)
                .amount((double) (support.getAmount()/ Math.pow(10, 18d)))
                .sendTimeStamp(support.getSendTimeStamp())
                .sendMsg(support.getSendMsg())
                .build();
        return findSupportDetailPayload;
    }

    public static FindSupportDetailPayload fromSomeoneSupport(Support support,toMember toMember){
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.builder()
                .supportUid(support.getSupportUid())
                .transactionHash(support.getTransactionHash())
                .supportType(support.getSupportType())
                .to(toMember)
                .amount((double) (support.getAmount()/ Math.pow(10, 18d)))
                .sendTimeStamp(support.getSendTimeStamp())
                .sendMsg(support.getSendMsg())
                .build();
        return findSupportDetailPayload;
    }
}
