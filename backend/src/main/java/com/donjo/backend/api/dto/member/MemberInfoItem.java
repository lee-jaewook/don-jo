package com.donjo.backend.api.dto.member;

import com.donjo.backend.db.entity.Member;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "MakeMemberInfoItemBuilder")
@ToString
public class MemberInfoItem {

    private String memberAddress;
    private String profileImgPath;
    private String backgroundImgPath;
    private String nickname;
    private String introduction;
    private int numSupporters;
    private int themeColor;
    private List<String> socialList;

    public static MemberInfoItemBuilder builder(Member member) {
        return MakeMemberInfoItemBuilder()
                .memberAddress(member.getAddress())
                .profileImgPath(member.getProfileImagePath())
                .backgroundImgPath(member.getBackgroundImgPath())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .numSupporters(member.getNumSupporters())
                .themeColor(member.getThemeColor())
                .socialList(member.getSocial().stream()
                        .map(social -> social.getSocialLink())
                        .collect(Collectors.toList()));

    }
}
