package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupportRepository extends JpaRepository<Support, String> {

    // Address와 supportUid로 Support 조회
    Optional<Support> findByToAddressAndSupportUid(String toAddress, Long supportUid);

    // type이 all일 경우 memberAddress만 조회 type과 address로 List<Support> 반환
    @Query("SELECT s FROM Support s WHERE (:type = 'all' OR s.supportType = :type) AND s.toAddress = :memberAddress")
    List<Support> findAllBySupportCount(@Param("type") String type, @Param("memberAddress") String memberAddress);

    // type이 all일 경우 memberAddress만 조회 type과 address로 List<Support> 반환
    @Query("SELECT s FROM Support s WHERE (:type = 'all' OR s.supportType = :type) AND s.toAddress = :memberAddress ORDER BY s.arriveTimeStamp DESC NULLS FIRST ")
    List<Support> findAllBySupport(@Param("type") String type, @Param("memberAddress") String memberAddress, Pageable pageable);

    Page<Support> findAllBySupportTypeAndToAddressOrderByArriveTimeStampDesc(String supportType, String toAddress, Pageable pageable);
}
