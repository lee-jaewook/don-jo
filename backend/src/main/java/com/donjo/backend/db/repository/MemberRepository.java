package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface MemberRepository extends JpaRepository<Member, String> {

  // Address로 맴버 조회
  @Transactional(readOnly = true)
  Member findByAddress(String address);

  // PageName으로 맴버 조회
  @Transactional(readOnly = true)
  Member findByPageName(String address);

}