package com.donjo.backend.api.controller;

import com.donjo.backend.api.service.member.MemberServiceImpl;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.exception.DuplicateDataException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

  private final MemberServiceImpl memberService;

  @ApiOperation(value="기존 유저 정보 확인", notes = "기존 유저 정보를 확인합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(가입한 유저)"),
      @ApiResponse(code = 204, message = "NO CONTENT(가입하지 않은 유저)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/members/{memberAddress}")
  public ResponseEntity<?> checkExistingMember(@PathVariable("memberAddress") String memberAddress) {
    Optional<Member> member = memberService.findMember(memberAddress);

    if (member.isPresent()) {
      return new ResponseEntity(HttpStatus.OK);
    }
    return new ResponseEntity(HttpStatus.NO_CONTENT);

  }

  @ApiOperation(value="페이지 이름 중복 검사", notes = "페이지 이름 중복 검사를 합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(사용 가능한 이름)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 409, message = "CONFLICT(이미 사용 중인 이름)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/members/page-name/check")
  public ResponseEntity<?> checkDuplicatePageName(@RequestParam("pageName") String pageName) {
    if(memberService.isPageNameDuplicate(pageName).isPresent()) throw new DuplicateDataException("이미 사용중인 페이지명 입니다.");
    return new ResponseEntity(HttpStatus.OK);
  }
}
