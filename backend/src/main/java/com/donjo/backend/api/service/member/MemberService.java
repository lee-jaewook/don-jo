package com.donjo.backend.api.service.member;

import com.donjo.backend.api.dto.member.request.LoginMemberCond;
import com.donjo.backend.api.dto.member.request.ModifyMemberCond;
import com.donjo.backend.api.dto.member.request.SignUpMemberCond;
import com.donjo.backend.api.dto.member.response.FindMemberPayload;
import com.donjo.backend.api.dto.member.response.FindPageInfoPayload;
import com.donjo.backend.db.entity.Member;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

public interface MemberService {

  Optional<Member> findMember(String memberAddress);

  Optional<Member> isPageNameDuplicate(String pageName);

  Map<String, Object> signUpMember(SignUpMemberCond signUpMemberCond);

  Map<String, Object> loginMember(LoginMemberCond loginMemberCond);

  Map<String, Object> refreshAccessToken(String refreshToken);

  void logout(String accessToken);

  String getMemberAddress(HttpServletRequest request);

  FindPageInfoPayload getPageInfoByPageName(String pageName);

//  FindMemberPayload getMemberInfo(String memberAddress);

  void modifyMemberInfo(String memberAdress, ModifyMemberCond modifyMemberCond);

  boolean verifySignature(String memberAddress, String signature, String message);
}
