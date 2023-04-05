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


}