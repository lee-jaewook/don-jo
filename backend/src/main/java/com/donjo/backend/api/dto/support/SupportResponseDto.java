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

    private String toAddress;

    private String replyMsg;

    private Long amount;

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
    @Nullable
    public static SupportResponseDto getSupport(Support support, fromMember fromMemberAddress){
        SupportResponseDto supportResponseDto = SupportResponseDto.builder()
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .fromMember(fromMemberAddress)
                .toAddress(support.getToAddress())
                .amount(support.getAmount())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .replyMsg(support.getReplyMsg())
                .build();
        return supportResponseDto;
    }
    public static SupportResponseDto getSomeoneSupport(Support support){
        SupportResponseDto supportResponseDto = SupportResponseDto.builder()
                .uid(support.getSupportUid())
                .supportType(support.getSupportType())
                .toAddress(support.getToAddress())
                .amount(support.getAmount())
                .arriveTimeStamp(support.getArriveTimeStamp())
                .replyMsg(support.getReplyMsg())
                .build();
        return supportResponseDto;
    }
}
