package com.donjo.backend.api.dto.member.response;

import com.donjo.backend.db.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "MakeToMemberBuilder")
@ToString
public class ToMemberItem {
  // 맴버 주소
  private String address;
  // 맴버 닉네임
  private String nickname;
  // 맴버 정보 Dto에 담기
  public static ToMemberItemBuilder builder(Member member) {
    return MakeToMemberBuilder()
        .address(member.getAddress())
        .nickname(member.getNickname());
  }

}
