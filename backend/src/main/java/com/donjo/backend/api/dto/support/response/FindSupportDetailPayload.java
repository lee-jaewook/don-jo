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
    // fromMember 클래스 설정
    @Getter
    @Setter
    @ToString
    public static class fromMember {
        private String fromMemberAddress;

        private String fromMemberPageName;

        private String fromMemberProfileImagePath;

        private String fromMemberNickname;

    }
    // toMember 클래스 설정
    @Getter
    @Setter
    @ToString
    public static class toMember {
        private String toMemberAddress;

        private String toMemberNickname;

        private String toMemberProfileImagePath;

    }
    //Member를 입력 받아 fromMember에 넣기
    public static FindSupportDetailPayload.fromMember getFromMember(Member member){
        FindSupportDetailPayload.fromMember newFromMember = new FindSupportDetailPayload.fromMember();
        newFromMember.setFromMemberAddress(member.getAddress());
        newFromMember.setFromMemberPageName(member.getPageName());
        newFromMember.setFromMemberProfileImagePath(member.getProfileImagePath());
        newFromMember.setFromMemberNickname(member.getNickname());
        return newFromMember;
    }
    //Member를 입력 받아 toMember에 넣기
    public static FindSupportDetailPayload.toMember getToMember(Member member){
        FindSupportDetailPayload.toMember newToMember = new FindSupportDetailPayload.toMember();
        newToMember.setToMemberAddress(member.getAddress());
        newToMember.setToMemberNickname(member.getNickname());
        newToMember.setToMemberProfileImagePath(member.getProfileImagePath());
        return newToMember;
    }
    // 입력 받아 Dto에 저장
    public static FindSupportDetailPayload fromSupport(Optional<SupportSol> supportsol, Support support, fromMember fromMember, toMember toMember){
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.builder()
                .supportUid(support.getSupportUid())
                .transactionHash(support.getTransactionHash())
                .supportType(support.getSupportType())
                .to(toMember)
                .from(fromMember)
                .amount(supportsol.get().getAmount())
                .sendTimeStamp(support.getSendTimeStamp())
                .sendMsg(support.getSendMsg())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .build();
        return findSupportDetailPayload;
    }
    // 입력 받아 Dto에 저장 fromMember가 없을 때
    public static FindSupportDetailPayload fromSomeoneSupport(Optional<SupportSol> supportsol, Support support, toMember toMember){
        FindSupportDetailPayload findSupportDetailPayload = FindSupportDetailPayload.builder()
                .supportUid(support.getSupportUid())
                .transactionHash(support.getTransactionHash())
                .supportType(support.getSupportType())
                .to(toMember)
                .amount(supportsol.get().getAmount())
                .sendTimeStamp(support.getSendTimeStamp())
                .sendMsg(support.getSendMsg())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .build();
        return findSupportDetailPayload;
    }
}
