package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.item.request.AddItemCond;
import com.donjo.backend.config.jwt.TokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@Api(tags = "아이템 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class ItemController {
    private static final String TOKEN_HEADER = "accessToken";
    private final TokenProvider tokenProvider;

    @GetMapping("/api/member/items")
    @ApiOperation(value = "아이템 리스트 가져오기", notes = "<strong>멤버의 주소</strong>를 입력받아 아이템 리스트를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyItemList(@RequestParam @NotNull String memberAddress){
        return ResponseEntity.ok(memberAddress);
    }

    @PostMapping("/api/auth/member/item/")
    @ApiOperation(value = "아이템 등록", notes = "<strong>아이템 정보</strong>를 입력받아 아이템을 등록합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> addMyItem(HttpServletRequest request, @RequestBody @Valid AddItemCond cond){
//        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
//        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
//        String memberAddress = authentication.getName();
//
//        itemService.addItem(cond, memberAddress);

        return ResponseEntity.ok().build();
    }
}
