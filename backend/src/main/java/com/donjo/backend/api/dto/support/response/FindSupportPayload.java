package com.donjo.backend.api.dto.support.response;

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
public class FindSupportPayload {

    private long uid;

    private String supportType;


    private fromMember fromMember;

    private toMember toAddress;

    private String replyMsg;

    private Double amount;

    private LocalDateTime arriveTimeStamp;

//    private LocalDateTime sendTimeStamp;

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

    public static FindSupportPayload.fromMember getFromMember(Member member){
        FindSupportPayload.fromMember newFromMember = new FindSupportPayload.fromMember();
        newFromMember.setFromMemberAddress(member.getAddress());
        newFromMember.setFromMemberPageName(member.getPageName());
        newFromMember.setFromMemberProfileImagePath(member.getProfileImagePath());
        newFromMember.setFromMemberNickname(member.getNickname());
        return newFromMember;
    }
    public static FindSupportPayload.toMember getToMember(Member member){
        FindSupportPayload.toMember newToMember = new FindSupportPayload.toMember();
        newToMember.setToMemberAddress(member.getAddress());
        newToMember.setToMemberNickname(member.getNickname());
        newToMember.setToMemberProfileImagePath(member.getProfileImagePath());
        return newToMember;
    }
    public static FindSupportPayload getSupport(Support support, fromMember fromMemberAddress, toMember toMemberAddress){
        FindSupportPayload findSupportPayload = FindSupportPayload.builder()
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .fromMember(fromMemberAddress)
                .toAddress(toMemberAddress)
                .amount((double) (support.getAmount()/ Math.pow(10, 18d)))
                .arriveTimeStamp(support.getArriveTimeStamp())
                .replyMsg(support.getReplyMsg())
                .build();
        return findSupportPayload;
    }
    public static FindSupportPayload getSomeoneSupport(Support support, toMember toMemberAddress){
        FindSupportPayload findSupportPayload = FindSupportPayload.builder()
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .toAddress(toMemberAddress)
                .amount((double) (support.getAmount()/ Math.pow(10, 18d)))
                .arriveTimeStamp(support.getArriveTimeStamp())
                .replyMsg(support.getReplyMsg())
                .build();
        return findSupportPayload;
    }
}
