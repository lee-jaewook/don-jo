package com.donjo.backend.api.service.member;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.SignatureException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class MemberServiceImplTest {

    @Autowired
    private MemberService memberService;

    @Test
    public void testCheckSignature() throws SignatureException {
        System.out.println("?????");
    }

}