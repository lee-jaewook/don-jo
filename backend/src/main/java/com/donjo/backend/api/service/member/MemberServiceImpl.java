package com.donjo.backend.api.service.member;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("MemberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
//  @Override
  public Optional<Member> findMember(String memberAddress) {
    return memberRepository.findByAddressSupport(memberAddress);
  }
}
