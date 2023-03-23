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

  private String profileImgPath;
  private String backgroundImgPath;
  private String nickname;
  private String introduction;
  private String pageName;
  private int themeColor;
  private List<Social> socialList;

  public void updateMember(Member member) {
    member.setProfileImagePath(profileImgPath);
    member.setBackgroundImgPath(backgroundImgPath);
    member.setNickname(nickname);
    member.setIntroduction(introduction);
    member.setPageName(pageName);
    member.setThemeColor(themeColor);
    if (socialList != null) {
      for (Social social : socialList) {
        Social existingSocial = member.getSocial()
            .stream()
            .filter(s -> s.getId().equals(social.getId()))
            .findFirst()
            .orElse(null);
        if (existingSocial != null) {
          existingSocial.setSocialLink(social.getSocialLink());
        }
      }
    }
  }

}
