package com.donjo.backend.api.dto.member.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpMemberCond {
  @NotNull
  private String address;

  @NotNull
  private String nickname;

  @NotNull
  private String pageName;

  @NotNull
  private String password;

  private String profileImgPath;
}