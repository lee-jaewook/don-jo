package com.donjo.backend.api.service.member;

import com.donjo.backend.api.dto.member.request.LoginMemberCond;
import com.donjo.backend.api.dto.member.request.ModifyMemberCond;
import com.donjo.backend.api.dto.member.request.SignUpMemberCond;
import com.donjo.backend.api.dto.member.response.FindPageInfoPayload;
import com.donjo.backend.api.dto.member.LoginItem;
import com.donjo.backend.db.entity.Member;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

public interface MemberService {

  // 가입 된 유저 확인
  Optional<Member> findMember(String memberAddress);

  // 페이지이름 중복 확인
  Optional<Member> isPageNameDuplicate(String pageName);

  // 회원가입
  Map<String, Object> signUpMember(SignUpMemberCond signUpMemberCond);

  // 로그인
  LoginItem loginMember(LoginMemberCond loginMemberCond);

  // 리프레쉬 토큰 재발급
  Map<String, Object> refreshAccessToken(String refreshToken);

  // 로그아웃
  void logout(String accessToken);

  // 토큰에서 Address 받기
  String getMemberAddress(HttpServletRequest request);

  // 페이지정보 보내기
  FindPageInfoPayload getPageInfoByPageName(String pageName);

//  FindMemberPayload getMemberInfo(String memberAddress);

  // member 정보 수정
  void modifyMemberInfo(String memberAdress, ModifyMemberCond modifyMemberCond);

  // 배경화면 수정
  void modifyMemberBackgroundImage(String backgroundImageSrc, HttpServletRequest request);

  // 프로필사진 수정
  void modifyMemberProfileImage(String profileImageSrc, HttpServletRequest request);

  // 소개글 수정
  void modifyMemberIntroduction(String introduction, HttpServletRequest request);

  // 서명 확인
  boolean verifySignature(String memberAddress, String signature, String message);

  // 비밀번호 체크
  boolean checkPassword(String requestPassword, HttpServletRequest request);
}
