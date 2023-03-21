package com.donjo.backend.api.service.member;

import com.donjo.backend.api.dto.member.request.LoginMemberCond;
import com.donjo.backend.api.dto.member.request.SignUpMemberCond;
//import com.donjo.backend.api.dto.member.response.FindPageInfoPayload;
import com.donjo.backend.config.jwt.JwtFilter;
import com.donjo.backend.config.jwt.TokenProvider;
import com.donjo.backend.db.entity.Authority;
import com.donjo.backend.db.entity.DonationSetting;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.DuplicateDataException;
import com.donjo.backend.exception.DuplicateMemberException;

import com.donjo.backend.exception.NoContentException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import com.donjo.backend.exception.UnAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service("MemberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenProvider tokenProvider;
  private final String PAGE_NAME = "pageName";

  @Override
  public Optional<Member> findMember(String memberAddress) {
    return Optional.ofNullable(memberRepository.findByAddress(memberAddress));
  }

  @Override
  public Optional<Member> isPageNameDuplicate(String pageName) {
    return Optional.ofNullable(memberRepository.findByPageName(pageName));
  }

  @Override
  public Map<String, Object> signUpMember(SignUpMemberCond signUpMemberCond) {
    if (memberRepository.findByAddress(signUpMemberCond.getAddress()) != null) {
      throw new DuplicateMemberException("이미 존재하는 회원입니다.");
    }

    if (memberRepository.findByPageName(signUpMemberCond.getPageName()) != null) {
      throw new DuplicateDataException("이미 존재하는 페이지입니다.");
    }

    Authority userAuthority = Authority.user();

    Member member = Member.builder()
        .address(signUpMemberCond.getAddress())
        .nickname(signUpMemberCond.getNickname())
        .pageName(signUpMemberCond.getPageName())
        .password(passwordEncoder.encode(signUpMemberCond.getPassword()))
        .profileImagePath(signUpMemberCond.getProfileImgPath())
        .authorities(Set.of(userAuthority))
        .build();

    DonationSetting donationSetting = DonationSetting.builder()
        .member(member)
        .memberAddress(signUpMemberCond.getAddress())
        .build();

    member.setDonationSetting(donationSetting);
    memberRepository.save(member);

    Map<String, Object> result = returnToken(member);
    result.put(PAGE_NAME, member.getPageName());

    return result;
  }

  @Override
  public Map<String, Object> loginMember(LoginMemberCond loginMemberCond) {
    Member member = Optional.ofNullable(memberRepository.findByAddress(loginMemberCond.getMemberAddress())).orElseThrow(() -> new BadRequestException("아이디가 존재하지 않습니다."));
    Map<String, Object> result = returnToken(member);
    result.put(PAGE_NAME, member.getPageName());

    return result;
  }

  @Override
  public Map<String, Object> refreshAccessToken(String refreshToken) {
    Member object = getMemberInfoWithToken(refreshToken);

    if (object != null) {
      Member member = object;
      if (refreshToken.equals(member.getRefreshToken())) {
        if (tokenProvider.validateToken(refreshToken)) {
          HashMap<String, Object> token = returnToken(member);
          member.setRefreshToken((String) token.get(JwtFilter.REFRESH_HEADER));
          memberRepository.save(member);
          return token;
        } else {
          throw new UnAuthorizationException("refreshToken 만료");
        }
      } else {
        throw new UnAuthorizationException("refreshToken 매칭 오류");
      }
    } else {
      throw new BadRequestException("회원이 존재 하지 않습니다.");
    }
  }

  @Override
  public void logout(String accessToken) {
    Member member = getMemberInfoWithToken(accessToken);

    if (member != null) {
      member.setRefreshToken("");
      memberRepository.save(member);
    } else {
      throw new BadRequestException("회원이 존재 하지 않습니다.");
    }

  }

//  @Override
//  public FindPageInfoPayload getPageInfoByPageName(String pageName) {
//    Member member = Optional.ofNullable(memberRepository.findByPageName(pageName)).orElseThrow(() -> new NoContentException("페이지가 존재하지 않습니다."));
//
//    FindPageInfoPayload findPageInfoPayload = new FindPageInfoPayload();
//    findPageInfoPayload.setMemberInfo(member);
//    findPageInfoPayload.setDonationSetting(member.getDonationSetting());
//    return findPageInfoPayload;
//  }

  public HashMap<String, Object> returnToken(Member member) {
    String accessToken = tokenProvider.createAccessToken(member);
    String refreshToken = tokenProvider.createRefreshToken(member);

    member.setRefreshToken(refreshToken);
    memberRepository.save(member);

    return new HashMap<>() {{
      put(JwtFilter.ACCESS_HEADER, accessToken);
      put(JwtFilter.REFRESH_HEADER, refreshToken);
    }};
  }

  public Member getMemberInfoWithToken(String token) {
    Authentication authentication = tokenProvider.getAuthentication(token);
    return memberRepository.findByAddress(authentication.getName());
  }
}
