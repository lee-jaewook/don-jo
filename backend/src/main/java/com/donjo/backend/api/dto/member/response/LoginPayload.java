package com.donjo.backend.api.dto.member.response;

import com.donjo.backend.api.dto.member.LoginItem;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class LoginPayload {
    // 페이지 이름
    private String pageName;
    // 프로필 이미지 경로
    private String imagePath;
    // 개인 닉네임
    private String nickName;
    // 개인 테마색
    private int themeColor;

    public static  LoginPayload getMemberInfo(LoginItem result) {
        LoginPayload loginPayload = LoginPayload.builder()
                .pageName(result.getPageName())
                .imagePath(result.getProfileImgPath())
                .nickName(result.getNickName())
                .themeColor(result.getThemeColor())
                .build();

        return loginPayload;
    }
}
