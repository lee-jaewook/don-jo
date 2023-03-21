package com.donjo.backend.db.repository;

//import com.donjo.backend.api.dto.member.MemberInfoItem;
//import com.donjo.backend.api.dto.member.QMemberInfoItem;
import com.donjo.backend.db.entity.QMember;
import com.querydsl.core.types.dsl.ListExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositorySupport{
  private final JPAQueryFactory jPAQueryFactory;

//  public MemberInfoItem findMemberInfoByAddressSupport(String address) {
//
//    QMember member = QMember.member;
//    ListExpression<String> socialLinks = jPAQueryFactory.select(member.social.any().socialLink)
//        .from(member)
//        .where(member.address.eq(address))
//        .fetch();
//
//    MemberInfoItem memberInfoItem = jPAQueryFactory.select(new QMemberInfoItem(
//            member.address,
//            member.profileImagePath,
//            member.backgroundImgPath,
//            member.nickname,
//            member.introduction,
//            member.numSupporters,
//            member.themeColor,
//            socialLinks))
//        .from(member)
//        .where(member.address.eq(address))
//        .fetchOne();
//
//    return memberInfoItem;
//  }
}
