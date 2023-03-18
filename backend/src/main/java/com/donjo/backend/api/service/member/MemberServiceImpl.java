package com.donjo.backend.api.service.member;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.db.repository.MemberRepositorySupport;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("MemberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
  private final MemberRepositorySupport memberRepositorySupport;
  @Override
  public Optional<Member> findMember(String memberAddress) {
    return Optional.ofNullable(memberRepository.findByAddress(memberAddress));
  }

  @Override
  public Optional<Member> isPageNameDuplicate(String pageName) {
    return Optional.ofNullable(memberRepository.findByPageName(pageName));
  }

  @Override
  public void signUpMember(SignUpMemberCond signUpMemberCond) {
    if (memberRepository.findByAddressSupport(signUpMemberCond.getMemberAddress()).isPresent()) {
      throw new DuplicateMemberException("이미 존재하는 회원입니다.");
    }

    if (memberRepository.findByPageNameSupport(signUpMemberCond.getPageName()).isPresent()) {
      throw new DuplicateDataException("이미 존재하는 페이지입니다.");
    }

    Authority userAuthority = Authority.user();

    Member member = Member.builder()
        .address(signUpMemberCond.getMemberAddress())
        .nickname(signUpMemberCond.getNickname())
        .pageName(signUpMemberCond.getPageName())
        .password(passwordEncoder.encode(signUpMemberCond.getPassword()))
        .profileImagePath(signUpMemberCond.getProfileImgPath())
        .authorities(Set.of(userAuthority))
        .build();

    memberRepository.saveMember(member);
  }
}
