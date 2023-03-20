package com.donjo.backend.api.dto.member.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginMemberCond {
  @NotNull
  private String memberAddress;

  @NotNull
  private String memberSignature;

}