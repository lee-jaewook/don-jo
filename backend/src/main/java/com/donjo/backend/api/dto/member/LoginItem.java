package com.donjo.backend.api.dto.member;

import com.donjo.backend.db.entity.Member;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class LoginItem {
    // 토큰
    private Map<String, Object> result;
    // 맴버 주소
    private String pageName;
    // 프로필 이미지 경로
    private String profileImgPath;
    // 개인 닉네임
    private String nickName;
    // 개인 테마색
    private int themeColor;


    // member정보 DTO에 담기
    public static LoginItem getInfo(Map<String, Object> result, Member member) {
        LoginItem loginItem = LoginItem.builder()
                .result(result)
                .pageName(member.getPageName())
                .nickName(member.getNickname())
                .profileImgPath(member.getProfileImagePath())
                .themeColor(member.getThemeColor())
                .build();

        return loginItem;
    }


}
