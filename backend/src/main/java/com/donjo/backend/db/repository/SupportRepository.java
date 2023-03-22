package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.List;

@Repository
public interface SupportRepository extends JpaRepository<Support, String> {

    @Transactional(readOnly = true)
    List<Support> findByToAddress(Member member);

    @Transactional(readOnly = true)
    List<Support> findByFromAddress(Member member);

    List<Support> findAllBySupportTypeAndToAddress(String supportType, String toAddress, Pageable pageable);

}
