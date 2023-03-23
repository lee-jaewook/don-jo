package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.support.*;
import com.donjo.backend.api.service.member.MemberService;
import com.donjo.backend.api.service.support.SupportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@Api(tags = "후원 관련 기능 API")
@RequiredArgsConstructor
public class SupportController {

    private final SupportService supportService;
    private final MemberService memberService;

    @GetMapping(path="/api/auth/member/dashboard/earning")
    @ApiOperation(value = "수익금 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getEarning(HttpServletRequest request, @RequestParam String type, @RequestParam int period) {
        return ResponseEntity.status(200)
                .body(supportService
                        .getEarning(memberService.getMemberAddress(request), type, period));
    }

    @PostMapping(path="/api/auth/member/supports")
    @ApiOperation(value = "후원내역 저장", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> createSupport(@RequestBody SupportRequestDto supportRequestDto) {
        System.out.println(supportRequestDto);
        supportService.createSupports(supportRequestDto);
        return ResponseEntity.status(200).build();
    }

    @GetMapping(path="/api/auth/member/dashboard/supports")
    @ApiOperation(value = "대시보드 서포트 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupports(@RequestParam String memberAddress, @RequestParam String type, @RequestParam int pageNum,@RequestParam int pageSize) {
        List<SupportResponseDto> supports = supportService.getSupports(memberAddress, type, pageNum,pageSize);
        if (supports.size()>0){
            return ResponseEntity.status(200).body(supports);
        }
        else {
            return ResponseEntity.status(204).body(supports);
        }
    }

    @GetMapping(path="/api/member/supports")
    @ApiOperation(value = "서포트 상세 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportDetail(@RequestParam String toAddress, @RequestParam Long supportUid) {
        try {
            SupportDetailResponseDto supportDetail = supportService.getSupportDetail(toAddress,supportUid);
            return ResponseEntity.status(200).body(supportDetail);
        }
        catch (Exception e){
            return ResponseEntity.status(404).body("정보 없음");
        }
    }

    @GetMapping(path="/api/member/supporters/count")
    @ApiOperation(value = "서포트 수 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportCount(HttpServletRequest request,@RequestParam String type) {
        int countSupport = supportService.getSupportCount(type,memberService.getMemberAddress(request));
        return ResponseEntity.status(200).body(countSupport);
    }

    @GetMapping(path="/api/auth/member/donation/setting")
    @ApiOperation(value = "도네이션 설정 가져오기", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getDonationSetting(HttpServletRequest request) {
        DonationDto donationDto = supportService.getDonationSetting(memberService.getMemberAddress(request));
        return ResponseEntity.status(200).body(donationDto);
    }

    @PutMapping(path="/api/auth/member/donation/setting")
    @ApiOperation(value = "도네이션 수정하기", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> changeDonationSetting(HttpServletRequest request, @RequestBody DonationDto donationDto) {
        supportService.changeDonation(donationDto,memberService.getMemberAddress(request));
        return ResponseEntity.status(200).build();
    }

    @GetMapping(path="/api/main/supports")
    @ApiOperation(value = "최근 후원 내역 10개 가져오기(인트로페이지)", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "NOT FOUND(정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportTop10(HttpServletRequest request) {
        List<Top10ResponseDto> top10 = supportService.getTop10();
        return ResponseEntity.status(200).body(top10);
    }
}
