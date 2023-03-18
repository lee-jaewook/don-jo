package com.donjo.backend.api.service.member;

import com.donjo.backend.api.dto.member.request.LoginMemberCond;
import com.donjo.backend.api.dto.member.request.SignUpMemberCond;
import com.donjo.backend.config.jwt.TokenProvider;
import com.donjo.backend.db.entity.Authority;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.exception.BadRequestException;
import com.donjo.backend.exception.DuplicateDataException;
import com.donjo.backend.exception.DuplicateMemberException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service("MemberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenProvider tokenProvider;

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

    memberRepository.save(member);

    return returnTokenAndPagename(member);
  }

  @Override
  public Map<String, Object> loginMember(LoginMemberCond loginMemberCond) {
    Member member = Optional.ofNullable(memberRepository.findByAddress(loginMemberCond.getMemberAddress())).orElseThrow(() -> new BadRequestException("아이디가 존재하지 않습니다."));

    return returnTokenAndPagename(member);
  }

  public Map<String, Object> returnTokenAndPagename(Member member) {
    String accessToken = tokenProvider.createAccessToken(member);
    String refreshToken = tokenProvider.createRefreshToken(member);

    member.setRefreshToken(refreshToken);
    memberRepository.save(member);

    return new HashMap<>() {{
      put("pageName", member.getPageName());
      put("accessToken", accessToken);
      put("refreshToken", refreshToken);
    }};
  }
}
