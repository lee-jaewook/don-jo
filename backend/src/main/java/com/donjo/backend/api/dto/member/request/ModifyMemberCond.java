package com.donjo.backend.api.dto.member.request;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Social;
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
@Builder(builderMethodName = "MakeMemberInfoItemBuilder")
@ToString
public class ModifyMemberCond {
  // 프로필사진 경로
  private String profileImgPath;
  // 배경사진 경로
  private String backgroundImgPath;
  // 회원 닉네임
  private String nickname;
  // 회원 페이지 이름
  private String pageName;
  // 회원 테마 색깔
  private int themeColor;
  // 회원 소셜 주소
  private List<String> socialList;
  // member entity Update
  public void updateMember(Member member) {
    member.setProfileImagePath(profileImgPath);
    member.setBackgroundImgPath(backgroundImgPath);
    member.setNickname(nickname);
    member.setPageName(pageName);
    member.setThemeColor(themeColor);

    List<Social> socials = member.getSocial();
    for (int i = 0; i < socials.size(); i++) {
      socials.get(i).setSocialLink(socialList.get(i));
    }
    member.setSocial(socials);
  }

}
