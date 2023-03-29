package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.List;

@Repository
public interface SupportRepository extends JpaRepository<Support, String> {

    Support findByToAddressAndSupportUid(String toAddress,Long supportUid);

    @Query("SELECT s FROM Support s WHERE (:type = 'all' OR s.supportType = :type) AND s.toAddress = :memberAddress")
    List<Support> findAllBySupportCount(@Param("type") String type, @Param("memberAddress") String memberAddress);

    @Query("SELECT s FROM Support s WHERE (:type = 'all' OR s.supportType = :type) AND s.toAddress = :memberAddress ORDER BY s.arriveTimeStamp DESC NULLS FIRST ")
    List<Support> findAllBySupport(@Param("type") String type, @Param("memberAddress") String memberAddress, Pageable pageable);
}
