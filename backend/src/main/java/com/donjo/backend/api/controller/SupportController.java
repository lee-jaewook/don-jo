package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.support.request.AddReplyCond;
import com.donjo.backend.api.dto.support.request.AddSupportCond;
import com.donjo.backend.api.dto.support.request.DonationSettingCond;
import com.donjo.backend.api.dto.support.response.FindSupportDetailPayload;
import com.donjo.backend.api.dto.support.response.FindTop10Payload;
import com.donjo.backend.api.service.member.MemberService;
import com.donjo.backend.api.service.support.SupportService;
import com.donjo.backend.config.jwt.JwtFilter;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;


@RestController
@Api(tags = "후원 관련 기능 API")
@RequiredArgsConstructor
public class SupportController {
    // logger 선언
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    // SupportService 선언
    private final SupportService supportService;
    // MemberService 선언
    private final MemberService memberService;

    @GetMapping(path="/api/auth/member/dashboard/earning")
    @ApiOperation(value = "수익금 조회", notes = "수익금을 조건에 맞게 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getEarning(HttpServletRequest request, @RequestParam @NotNull String type, @RequestParam @NotNull int period) {
        // type과 period를 조건으로 수익금 조회
        logger.info("memberService.getMemberAddress 요청");
        return ResponseEntity.status(200)
                .body(supportService.getEarning(memberService.getMemberAddress(request), type, period));
    }

    @PostMapping(path="/api/member/supports")
    @ApiOperation(value = "후원내역 저장", notes = "후원내역을 DB에 저장한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> createSupport(@RequestBody @Valid AddSupportCond addSupportCond) {
        logger.info("supportService.createSupports 요청");
        // 후원 저장
        supportService.createSupports(addSupportCond);

        return ResponseEntity.status(200).build();
    }

//    @PutMapping(path="/api/member/support/arrive")
//    @ApiOperation(value = "후원 도착 업데이트", notes = "<strong>후원 트랜잭션 해시와 uid</strong>를 입력받아 후원이 도착했음을 업데이트합니다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "OK(수정 성공)"),
//            @ApiResponse(code = 400, message = "BAD REQUEST(수정 실패)"),
//            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//
//    })
//    public ResponseEntity<?> updateArrivedSupport(@RequestParam String transactionHash, @RequestParam Long supportUid) {
//        logger.info("후원 도착 업데이트 요청");
//        supportService.updateArrivedSupport(transactionHash, supportUid);
//        return ResponseEntity.status(200).build();
//    }

    @GetMapping(path="/api/member/dashboard/supports")
    @ApiOperation(value = "서포트 리스트 조회", notes = "후원내역 리스트를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(정보 없음)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportList(@RequestParam @NotNull String memberAddress, @RequestParam @NotNull String type, @RequestParam @NotNull int pageNum, @RequestParam @NotNull int pageSize) {
        logger.info("supportService.getSupports 요청");
        return ResponseEntity.status(200).body(supportService.getSupportList(memberAddress, type, pageNum,pageSize));
    }

    @GetMapping(path="/api/member/support")
    @ApiOperation(value = "서포트 상세 조회", notes = "후원 상세내역을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportDetail(@RequestParam @NotNull String transactionHash) {
        // Address와 supportUid로 SupportDetail을 조회합니다.
        logger.info("supportService.getSupportDetail 요청");
        return ResponseEntity.status(200).body(supportService.getSupportDetail(transactionHash));
    }

    @GetMapping(path="/api/auth/member/supports/count")
    @ApiOperation(value = "서포트 수 조회", notes = "조건에 맞게 후원수를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code=404, message = "NOT FOUND(정보 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportCount(HttpServletRequest request,@RequestParam @NotNull String type) {
        logger.info("supportService.getSupportCount 요청");
        // type을 조건으로 서포트 개수 조회
        int countSupport = supportService.getSupportCount(type,memberService.getMemberAddress(request));
        return ResponseEntity.status(200).body(countSupport);
    }

    @GetMapping(path="/api/auth/member/donation/setting")
    @ApiOperation(value = "도네이션 설정 가져오기", notes = "개인 도네이션 설정을 가져온다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getDonationSetting(HttpServletRequest request) {
        logger.info("supportService.getDonationSetting 요청");
        // Header에 있는 토큰값으로 Address를 조회한 후 도네이션 정보 가져오기
        DonationSettingCond donationSettingCond = supportService.getDonationSetting(memberService.getMemberAddress(request));
        return ResponseEntity.status(200).body(donationSettingCond);
    }

    @PutMapping(path="/api/auth/member/donation/setting")
    @ApiOperation(value = "도네이션 수정하기", notes = "개인 도네이션을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> changeDonationSetting(HttpServletRequest request,@RequestBody @Valid DonationSettingCond donationSettingCond) {
        logger.info("supportService.changeDonation 요청");
        // Header에 있는 토큰값으로 Address를 조회한 후 도네이션 정보 업데이트
        supportService.changeDonation(donationSettingCond,memberService.getMemberAddress(request));
        return ResponseEntity.status(200).build();
    }

    @GetMapping(path="/api/main/supports")
    @ApiOperation(value = "최근 후원 내역 10개 가져오기(인트로페이지)", notes = "인트로페이지에 보여질 최근 후원 내역을 10개 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(조회 실패)"),
            @ApiResponse(code = 404, message = "NOT FOUND(정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> getSupportTop10() {
        logger.info("supportService.getTop10 요청");
        // 최근 후원 10개 불러오기
        List<FindTop10Payload> top10 = supportService.getTop10();
        return ResponseEntity.status(200).body(top10);
    }

    @PostMapping(path="/api/auth/support/reply")
    @ApiOperation(value = "댓글 저장", notes = "후원에 댓글을 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성,수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(작성,수정 실패)"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> saveReply(@RequestBody @Valid AddReplyCond dto) {
        logger.info("supportService.saveReply 요청");
        // 댓글 저장
        supportService.saveReply(dto);
        return ResponseEntity.status(200).body("저장 성공");
    }

    @PutMapping(path="/api/auth/support/reply")
    @ApiOperation(value = "댓글 수정", notes = "후원에 작성한 댓글을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성,수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(작성,수정 실패)"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> changeReply(@RequestBody @Valid AddReplyCond dto) {
        logger.info("supportService.saveReply 요청");
        // 댓글 수정
        supportService.saveReply(dto);
        return ResponseEntity.status(200).body("수정 성공");
    }


    @DeleteMapping(path="/api/auth/support/reply")
    @ApiOperation(value = "댓글 삭제", notes = "후원에 작성했었던 댓글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(삭제 실패)"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")

    })
    public ResponseEntity<?> deleteReply(@RequestParam @NotNull String transactionHash) {
        logger.info("supportService.deleteReply 요청");
        // transactionHash값으로 support에 있는 댓글 삭제
        supportService.deleteReply(transactionHash);
        return ResponseEntity.status(200).body("삭제 성공");
    }
}
