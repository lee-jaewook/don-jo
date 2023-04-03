package com.donjo.backend.api.dto.support.response;

import com.donjo.backend.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberItem {
    private String memberAddress;

    private String memberPageName;

    private String memberProfileImagePath;

    private String memberNickname;

    public static MemberItem fromMember(Member member){
        return MemberItem.builder()
                .memberAddress(member.getAddress())
                .memberPageName(member.getPageName())
                .memberProfileImagePath(member.getProfileImagePath())
                .memberNickname(member.getNickname())
                .build();
    }

}
