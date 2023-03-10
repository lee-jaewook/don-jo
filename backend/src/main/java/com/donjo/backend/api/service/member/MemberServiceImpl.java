package com.donjo.backend.api.service.member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import java.security.SignatureException;
import java.util.Optional;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService{

    @Override
    public boolean checkSignature(String address, String signature) throws SignatureException {
        // Extract v, r, s
        byte[] bytes = Numeric.hexStringToByteArray(signature);
        byte[] r = new byte[32];
        byte[] s = new byte[32];
        byte v = 0;
        if (bytes.length == 65) {
            System.arraycopy(bytes, 0, r, 0, 32);
            System.arraycopy(bytes, 32, s, 0, 32);
            v = bytes[64];
        } else if (bytes.length == 64) {
            System.arraycopy(bytes, 0, r, 0, 32);
            System.arraycopy(bytes, 32, s, 0, 32);
        }

        // Extract the address from the signature
        Sign.SignatureData signatureData = new Sign.SignatureData(v, r, s);
        String extractedAddress = "0x" + Numeric.toHexStringNoPrefix(
                Optional.ofNullable(Sign.signedMessageToKey(("Login to my app with address " + address).getBytes(), signatureData))
                        .orElseThrow(()-> new RuntimeException("xxx")));

        log.info("주소 : {} | 서명 정보 속 주소 : {}",address, extractedAddress);
        // Compare the two addresses
        return address.equalsIgnoreCase(extractedAddress);
    }
}
