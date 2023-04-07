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
    // 맴버 주소
    private String memberAddress;
    // 프로필 이미지 경로
    private String profileImgPath;
    // 배경사진 이미지 경로
    private String backgroundImgPath;
    // 개인 닉네임
    private String nickname;
    // 개인 소개글
    private String introduction;
    // 후원자 수
    private int numSupporters;
    // 개인 테마색
    private int themeColor;
    // 개인 소셜리스트
    private List<String> socialList;
    // member정보 DTO에 담기
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
