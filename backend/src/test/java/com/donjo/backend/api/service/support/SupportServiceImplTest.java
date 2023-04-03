package com.donjo.backend.api.service.support;

import com.donjo.backend.api.dto.support.response.FindSupportDetailPayload;
import com.donjo.backend.api.service.member.MemberService;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.db.entity.Support;
import com.donjo.backend.db.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class SupportServiceImplTest {

    @Autowired
    public SupportService supportService;

    @Autowired
    public MemberRepository memberRepository;

    @Test
    public void supportCountTest(){
        String memberAddress = "0x614540203f30c0e2ffa5ba90f643e7d39e1b2600";
        Member member = memberRepository.findById(memberAddress).get();

        int count = member.getNumSupporters();
        System.out.println("BEFORE : "+count);


        String transactionHx = "0x9efea39a16a11b86490646ac2497a8f388a5fe415939d5e2aaa25cb4c4972731";
        Long supportUid = 1L;

        supportService.updateArrivedSupport(transactionHx, supportUid);

        FindSupportDetailPayload support= supportService.getSupportDetail(transactionHx);



        Member member2 = memberRepository.findById(memberAddress).get();

        System.out.println("AFTER : "+member2.getNumSupporters());

    }

}