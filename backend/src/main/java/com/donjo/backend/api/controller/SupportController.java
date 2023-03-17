package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.Support.*;
import com.donjo.backend.api.service.Support.SupportService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class SupportController {

    private final SupportService supportService;


    @ApiOperation(value = "수익금 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    @GetMapping(path="api/auth/member/dashboard/earning")
    public ResponseEntity<?> getEarning(@RequestParam String type, @RequestParam int period) {
        EarningsResponseDto earningsResponseDto = supportService.getEarning(type,period);
        return ResponseEntity.status(200).body("수익조회!");
    }

    @ApiOperation(value = "대시보드 서포트 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    @GetMapping(path="api/auth/member/dashboard/supports")
    public ResponseEntity<?> getSupports(@RequestParam String type, @RequestParam int page_num) {
        List<SupportResponseDto> supports = supportService.getSupports(type,page_num);
        return ResponseEntity.status(200).body(supports);
    }


    @ApiOperation(value = "서포트 상세 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    @GetMapping(path="api/member/supports")
    public ResponseEntity<?> getSupportDetail(@RequestParam String type, @RequestParam int supportUid) {
        SupportDetailResponseDto supportDetail = supportService.getSupportDetail(type,supportUid);
        return ResponseEntity.status(200).body(supportDetail);
    }


    @ApiOperation(value = "서포트 수 조회", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    @GetMapping(path="api/member/supporters/count")
    public ResponseEntity<?> getSupportCount(@RequestParam String type) {
        CountResponseDto countResponseDto = supportService.getSupportCount(type);
        return ResponseEntity.status(200).body(countResponseDto);
    }

    @ApiOperation(value = "도네이션 설정 가져오기", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    @GetMapping(path="api/auth/member/donation/setting")
    public ResponseEntity<?> getDonationSetting() {
        DonationDto donationDto = supportService.getDonationSetting("수정해야함");
        return ResponseEntity.status(200).body(donationDto);
    }

    @ApiOperation(value = "도네이션 수정하기", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    @PutMapping(path="api/auth/member/donation/setting")
    public ResponseEntity<?> changeDonationSetting(@RequestBody DonationDto donationDto) {
        supportService.changeDonation(donationDto);
        return ResponseEntity.status(200).build();
    }

    @ApiOperation(value = "qr코드 불러오기", notes = "example content")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    @GetMapping(path="api/auth/member/qrcode")
    public ResponseEntity<?> getQrcode() {
        QrResponseDto qrResponseDto = supportService.getQrcode("수정해야함");
        return ResponseEntity.status(200).body(qrResponseDto);
    }
}
