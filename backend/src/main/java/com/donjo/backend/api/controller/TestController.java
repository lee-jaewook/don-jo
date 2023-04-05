package com.donjo.backend.api.controller;

import com.donjo.backend.api.service.support.SupportService;
import com.donjo.backend.config.jwt.TokenProvider;
import com.donjo.backend.db.entity.Authority;
import com.donjo.backend.db.entity.Member;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@Api(value = "테스트 컨트롤러 (차후 삭제)")
public class TestController {
    private final TokenProvider tokenProvider;
    private final SupportService supportService;

    @Value("${eth.address}")
    String address;

    @GetMapping("/api/test/limited")
    @ApiOperation(value = "요청 제한 테스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(성공)"),
            @ApiResponse(code = 429, message = "Too Many Requests(1시간에 6번의 요청만 가능합니다)"),
    })
    public ResponseEntity<?> rateLimitingTest(){
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/api/test/access-token")
    @ApiOperation(value = "엑세스 토큰 발급")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(성공)"),
    })
    public ResponseEntity<?> getAccessToken(){
        return ResponseEntity.status(200)
                .body("Bearer " + tokenProvider
                        .createAccessToken(Member.builder()
                                .address(address)
                                .authorities(Collections.singleton(Authority.user())).build()));
    }

    @GetMapping("/api/auth/test")
    @ApiOperation(value = "auth 테스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(성공)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(키가 없거나 유효하지 않음)"),
    })
    public ResponseEntity<?> getAuthTest(){
        return ResponseEntity.status(200).build();
    }
}
