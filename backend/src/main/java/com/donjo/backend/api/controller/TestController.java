package com.donjo.backend.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "테스트 컨트롤러 (차후 삭제)")
public class TestController {

    @GetMapping("/api/test/limited")
    @ApiOperation(value = "아이템 리스트 가져오기", notes = "<strong>멤버의 주소</strong>를 입력받아 아이템 리스트를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> rateLimitingTest(){
        return ResponseEntity.status(200).build();
    }
}
