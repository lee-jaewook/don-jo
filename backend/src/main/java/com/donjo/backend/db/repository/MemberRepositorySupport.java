package com.donjo.backend.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositorySupport{
  private final JPAQueryFactory jPAQueryFactory;
}
