package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface MemberRepository extends JpaRepository<Member, String> {
  @Transactional(readOnly = true)
  Member findByAddress(String address);

  @Transactional(readOnly = true)
  Member findByPageName(String address);


}
