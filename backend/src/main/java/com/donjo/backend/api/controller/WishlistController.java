package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.service.wishlist.WishlistService;
import com.donjo.backend.exception.NoContentException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@Api(tags = "위시리스트 관련 기능 API")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping("/api/member/wishlists")
    @ApiOperation(value = "멤버의 위시 리시트 가져오기", notes = "<strong>멤버의 주소</strong>를 입력받아 위시리스트를을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMemberWishlists(@RequestParam @NotNull String memberAddress){
        return ResponseEntity.status(200)
                .body(wishlistService.getAllWishlist(memberAddress)
                        .orElseThrow(()-> new NoContentException("위시리스트가 없습니다.")));
    }

    @GetMapping("/api/member/wishlist")
    @ApiOperation(value = "멤버의 위시 리시트 상세조회", notes = "<strong>위시리스트 ID</strong>를 입력받아 위시리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMemberWishlists(@RequestParam @NotNull Long wishlistUid){
        return ResponseEntity.status(200)
                .body(wishlistService.getOneWishlist(wishlistUid)
                        .orElseThrow(()-> new NoContentException("위시리스트가 없습니다.")));
    }

    @PostMapping("/api/member/wishlist")
    @ApiOperation(value = "멤버의 위시 리시트 추가", notes = "<strong>위시리스트 ID</strong>를 입력받아 위시리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> addMemberWishlist(@RequestBody @Valid AddWishlistCond cond){
        return null;
    }

}
