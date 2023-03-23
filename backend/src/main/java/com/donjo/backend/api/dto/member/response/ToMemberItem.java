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
  private String address;
  private String nickname;

  public static ToMemberItemBuilder builder(Member member) {
    return MakeToMemberBuilder()
        .address(member.getAddress())
        .nickname(member.getNickname());
  }

}
