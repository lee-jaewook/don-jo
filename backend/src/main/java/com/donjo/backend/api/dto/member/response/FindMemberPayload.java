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

  private String profileImgPath;
  private String backgroundImgPath;
  private String nickname;
  private String pageName;
  private int themeColor;
  private List<String> socialList;

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
