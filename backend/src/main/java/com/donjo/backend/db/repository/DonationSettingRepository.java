package com.donjo.backend.db.repository;

//import com.donjo.backend.api.dto.member.MemberInfoItem;
import com.donjo.backend.db.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface DonationSettingRepository extends JpaRepository<Member, String> {


}