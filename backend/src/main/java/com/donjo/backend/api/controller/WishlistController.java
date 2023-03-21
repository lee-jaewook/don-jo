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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@Api(tags = "위시리스트 관련 기능 API")
@RequiredArgsConstructor
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

    @PostMapping("/api/auth/member/wishlist")
    @ApiOperation(value = "멤버의 위시 리시트 추가", notes = "<strong>위시리스트 정보</strong>를 입력받아 위시리스트를 추가합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(작성 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> addMemberWishlist(HttpServletRequest request, @RequestBody @Valid AddWishlistCond cond){
        wishlistService.addWishlist(memberService.getMemberAddress(request), cond);
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
        wishlistService.deleteWishlist(memberService.getMemberAddress(request), wishlistUid);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/api/auth/member/wishlist")
    @ApiOperation(value = "멤버의 위시 리시트 삭제", notes = "<strong>위시리스트 uid</strong>를 입력받아 위시리스트를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(삭제 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateMemberWishlist(HttpServletRequest request, @RequestBody @Valid UpdateWishlistCond cond){
        wishlistService.updateWishlist(memberService.getMemberAddress(request), cond);
        return ResponseEntity.status(200).build();
    }
}
