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
@Builder(builderMethodName = "MakeFromMemberBuilder")
@ToString
public class FromMemberItem {
  private String address;
  private String nickname;
  private String pageName;
  private String profileImgPath;

  public static FromMemberItemBuilder builder(Member member) {
    return MakeFromMemberBuilder()
        .address(member.getAddress())
        .nickname(member.getNickname())
        .pageName(member.getPageName())
        .profileImgPath(member.getProfileImagePath());
  }

}
