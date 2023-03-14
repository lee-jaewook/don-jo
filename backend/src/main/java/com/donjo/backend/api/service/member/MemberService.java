package com.donjo.backend.api.service.member;

import com.donjo.backend.db.entity.Member;
import java.util.Optional;

public interface MemberService {
  Optional<Member> findMember(String memberAddress);

}
