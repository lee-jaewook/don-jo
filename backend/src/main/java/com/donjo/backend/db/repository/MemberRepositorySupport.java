package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class MemberRepositorySupport{
  private final JPAQueryFactory jPAQueryFactory;

  @Transactional(readOnly = true)
  public Optional<Member> findByAddress(String address) {
    return Optional.ofNullable(jPAQueryFactory
        .selectFrom(QMember.member)
        .where(QMember.member.address.eq(address))
        .fetchOne());
  }

  @Transactional(readOnly = true)
  public Optional<Member> findByPageName(String pageName) {
    return Optional.ofNullable(jPAQueryFactory
        .selectFrom(QMember.member)
        .where(QMember.member.pageName.eq(pageName))
        .fetchOne());
  }

}
