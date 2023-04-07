package com.donjo.backend.api.dto.member.response;


import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Social;
import java.util.ArrayList;
import java.util.List;
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
@Builder(builderMethodName = "MakeMemberBuilder")
@ToString
public class FindMemberPayload {
  // 프로필 이미지 경로
  private String profileImgPath;
  // 배경 이미지 경로
  private String backgroundImgPath;
  // 개인 닉네임
  private String nickname;
  // 개인 페이지 이름
  private String pageName;
  // 개인 테마 색깔
  private int themeColor;
  // 개인 소셜 리스트(3개)
  private List<String> socialList;
  // 엔티티 Dto에 담기
  public static FindMemberPayloadBuilder builder(Member member) {
    List<String> newSocialList = new ArrayList<>();

    for(Social social : member.getSocial()) {
      newSocialList.add(social.getSocialLink());
    }

    return MakeMemberBuilder()
        .profileImgPath(member.getProfileImagePath())
        .backgroundImgPath(member.getBackgroundImgPath())
        .nickname(member.getNickname())
        .pageName(member.getPageName())
        .themeColor(member.getThemeColor())
        .socialList(newSocialList);
  }
}
