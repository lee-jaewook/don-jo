package com.donjo.backend.api.dto.member.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginMemberCond {
  // 개인 주소(지갑 주소)
  @NotNull
  private String memberAddress;
  // 회원 서명
  @NotNull
  private String memberSignature;

  // 회원 서명 메세지
  @NotNull
  private String signMessage;

}