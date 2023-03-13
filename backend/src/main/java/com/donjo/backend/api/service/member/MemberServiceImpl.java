package com.donjo.backend.api.service.member;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.repository.MemberRepository;
import com.donjo.backend.exception.DuplicateMemberException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("MemberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
//  @Override
  public Optional<Member> findMember(String memberAddress) {
    Optional<Member> member = memberRepository.findByAddress(memberAddress);

    return member;
  }
}
