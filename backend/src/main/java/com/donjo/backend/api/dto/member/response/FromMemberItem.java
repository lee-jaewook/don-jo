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
  // 맴버 주소
  private String address;
  // 맴버 닉네임
  private String nickname;
  // 맴버 페이지 이름
  private String pageName;
  // 맴버 프로필 이미지 경로
  private String profileImgPath;
  // memberEntity DTO에 저장
  public static FromMemberItemBuilder builder(Member member) {
    return MakeFromMemberBuilder()
        .address(member.getAddress())
        .nickname(member.getNickname())
        .pageName(member.getPageName())
        .profileImgPath(member.getProfileImagePath());
  }

}
