package com.donjo.backend.api.dto.member.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpMemberCond {
  // 맴버 주소
  @NotNull
  private String address;
  // 맴버 닉네임
  @NotNull
  private String nickname;
  // 맴버 페이지 이름
  @NotNull
  private String pageName;
  // 맴버 비밀번호
  @NotNull
  private String password;
  // 맴버 프로필 이미지 경로
  private String profileImgPath;
}