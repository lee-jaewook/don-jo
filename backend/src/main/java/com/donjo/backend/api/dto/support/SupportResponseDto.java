package com.donjo.backend.api.dto.support;

import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@Setter
@ToString
@Builder
public class SupportResponseDto {

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

    public static SupportResponseDto.fromMember getFromMember(Member member){
        SupportResponseDto.fromMember newFromMember = new SupportResponseDto.fromMember();
        newFromMember.setFromMemberAddress(member.getAddress());
        newFromMember.setFromMemberPageName(member.getPageName());
        newFromMember.setFromMemberProfileImagePath(member.getProfileImagePath());
        newFromMember.setFromMemberNickname(member.getNickname());
        return newFromMember;
    }
    public static SupportResponseDto.toMember getToMember(Member member){
        SupportResponseDto.toMember newToMember = new SupportResponseDto.toMember();
        newToMember.setToMemberAddress(member.getAddress());
        newToMember.setToMemberNickname(member.getNickname());
        newToMember.setToMemberProfileImagePath(member.getProfileImagePath());
        return newToMember;
    }
    public static SupportResponseDto getSupport(Support support, fromMember fromMemberAddress,toMember toMemberAddress){
        SupportResponseDto supportResponseDto = SupportResponseDto.builder()
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .fromMember(fromMemberAddress)
                .toAddress(toMemberAddress)
                .amount((double) (support.getAmount()/ Math.pow(10, 18d)))
                .arriveTimeStamp(support.getArriveTimeStamp())
                .replyMsg(support.getReplyMsg())
                .build();
        return supportResponseDto;
    }
    public static SupportResponseDto getSomeoneSupport(Support support,toMember toMemberAddress){
        SupportResponseDto supportResponseDto = SupportResponseDto.builder()
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .toAddress(toMemberAddress)
                .amount((double) (support.getAmount()/ Math.pow(10, 18d)))
                .arriveTimeStamp(support.getArriveTimeStamp())
                .replyMsg(support.getReplyMsg())
                .build();
        return supportResponseDto;
    }
}
