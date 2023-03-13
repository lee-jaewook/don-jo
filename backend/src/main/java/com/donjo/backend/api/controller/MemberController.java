package com.donjo.backend.api.controller;

import com.donjo.backend.api.service.member.MemberServiceImpl;
import com.donjo.backend.db.entity.Member;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
  @GetMapping(path="/members/{member_address}")
  public ResponseEntity checkExistingMember(@PathVariable("member_address") String member_address) {
    Optional<Member> member = memberService.findMember(member_address);

    if (member.isPresent()) {
      return new ResponseEntity(HttpStatus.OK);
    }
    return new ResponseEntity(HttpStatus.NO_CONTENT);

  }

}
