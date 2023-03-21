package com.donjo.backend.api.service.member;

import com.donjo.backend.api.dto.member.request.LoginMemberCond;
import com.donjo.backend.api.dto.member.request.SignUpMemberCond;
//import com.donjo.backend.api.dto.member.response.FindPageInfoPayload;
import com.donjo.backend.db.entity.Member;

import java.util.Map;
import java.util.Optional;

public interface MemberService {
  Optional<Member> findMember(String memberAddress);
  Optional<Member> isPageNameDuplicate(String pageName);
  Map<String, Object> signUpMember(SignUpMemberCond signUpMemberCond);
  Map<String, Object> loginMember(LoginMemberCond loginMemberCond);
  Map<String, Object> refreshAccessToken(String refreshToken);
  void logout(String accessToken);
//  FindPageInfoPayload getPageInfoByPageName(String pageName);
}
