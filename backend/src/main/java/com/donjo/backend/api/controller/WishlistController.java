package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.wishlist.request.AddWishlistCond;
import com.donjo.backend.api.dto.wishlist.request.UpdateWishlistCond;
import com.donjo.backend.api.service.member.MemberService;
import com.donjo.backend.api.service.wishlist.WishlistService;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.exception.NoContentException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@Api(tags = "위시리스트 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class WishlistController {

    private final MemberService memberService;
    private final WishlistService wishlistService;

    @GetMapping("/api/member/wishlists")
    @ApiOperation(value = "멤버의 위시 리시트 가져오기", notes = "<strong>멤버의 주소</strong>를 입력받아 위시리스트를을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMemberWishlists(@RequestParam @NotNull String memberAddress, @RequestParam @NotNull int pageNum, @RequestParam @NotNull int pageSize){
        // pagination이 포함 된 Wishlist 가져오기
        return ResponseEntity.status(200)
                .body(wishlistService.getAllWishlist(memberAddress, pageNum, pageSize));
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
        // wishlistUid로 Wishlist 상세조회
        return ResponseEntity.status(200)
                .body(wishlistService.getOneWishlist(wishlistUid));
    }

    @PostMapping("/api/auth/member/wishlist/limited")
    @ApiOperation(value = "멤버의 위시 리시트 추가", notes = "<strong>위시리스트 정보</strong>를 입력받아 위시리스트를 추가합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(작성 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> addMemberWishlist(HttpServletRequest request, @RequestBody @Valid AddWishlistCond cond){
        // cond 안에 있는 가격이 0이면 400(작설 실패) 반환
        if(cond.getTargetAmount() == 0) return ResponseEntity.status(400).build();
        log.info("call ADD wishlist");
        // 헤더에 있는 토큰값으로 memberAddress조회한 후 Wishlist 추가
        wishlistService.addWishlist(memberService.getMemberAddress(request), cond);
        log.info("Done ADD wishlist");
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/api/auth/member/wishlist")
    @ApiOperation(value = "멤버의 위시 리시트 삭제", notes = "<strong>위시리스트 uid</strong>를 입력받아 위시리스트를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(삭제 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteMemberWishlist(HttpServletRequest request, @RequestParam @NotNull Long wishlistUid){
        // 헤더에 있는 토큰값으로 memberAddress조회한 후 wishlistUid 이용하여 wishlist 삭제
        wishlistService.deleteWishlist(memberService.getMemberAddress(request), wishlistUid);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/api/auth/member/wishlist/limited")
    @ApiOperation(value = "멤버의 위시 리시트 수정", notes = "<strong>위시리스트 uid를 포함한 전체 데이터</strong>를 입력받아 위시리스트를 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(수정 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateMemberWishlist(HttpServletRequest request, @RequestBody @Valid UpdateWishlistCond cond){
        // 헤더에 있는 토큰값으로 memberAddress 조회한 후 wishList Update
        log.info("위시리스트 업데이트 호출");
        wishlistService.updateWishlist(memberService.getMemberAddress(request), cond);
        return ResponseEntity.status(200).build();
    }
}
