package com.donjo.backend.api.service.member;

import java.security.SignatureException;

public interface MemberService {
    boolean checkSignature(String address, String signature) throws SignatureException;
}
