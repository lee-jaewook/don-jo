package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.member.request.LoginMemberCond;
import com.donjo.backend.api.dto.member.request.ModifyMemberCond;
import com.donjo.backend.api.dto.member.request.SignUpMemberCond;
import com.donjo.backend.api.dto.member.response.FindMemberPayload;
import com.donjo.backend.api.dto.member.response.FindPageInfoPayload;
import com.donjo.backend.api.dto.member.LoginItem;
import com.donjo.backend.api.dto.member.response.LoginPayload;
import com.donjo.backend.api.service.member.MemberServiceImpl;
import com.donjo.backend.config.jwt.JwtFilter;
import com.donjo.backend.db.entity.Member;
import com.donjo.backend.exception.DuplicateDataException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@Api(tags = "사용자 관련 기능 API")
@RequiredArgsConstructor
public class MemberController {
  // MemberServiceImpl 선언
  private final MemberServiceImpl memberService;
  // PAGE_NAME 선언
  private final String PAGE_NAME = "pageName";
  // NICK_NAME 선언
  private final String NICK_NAME = "nickName";
  // THEME_COLOR 선언
  private final String THEME_COLOR = "themeColor";
  // IMAGE_PATH 선언
  private final String IMAGE_PATH = "imagePath";

  @ApiOperation(value="기존 유저 정보 확인", notes = "기존 유저 정보를 확인합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(가입한 유저)"),
      @ApiResponse(code = 204, message = "NO CONTENT(가입하지 않은 유저)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/api/members/{memberAddress}")
  public ResponseEntity<?> checkExistingMember(@PathVariable("memberAddress") String memberAddress) {
    // 맴버 Address로 member 엔티티 가져옴
    Optional<Member> member = memberService.findMember(memberAddress);

    // 맴버에 값이 있으면 200을 값이 없으면 204를 반환
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
  @GetMapping(path="/api/members/page-name/check")
  public ResponseEntity<?> checkDuplicatePageName(@RequestParam("pageName") String pageName) {
    // 맴버 db안에 Pagename이 있는지 확인하고 있으면 409를 없으면 200을 반환합니다.
    if(memberService.isPageNameDuplicate(pageName).isPresent()) throw new DuplicateDataException("이미 사용중인 페이지명 입니다.");
    return new ResponseEntity(HttpStatus.OK);
  }

  @ApiOperation(value="회원가입", notes = "회원 가입을 합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(회원 가입 성공)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 409, message = "CONFLICT(address or pageName 존재)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @PostMapping(path="/api/member")
  public ResponseEntity signUpMember(@RequestBody @Valid SignUpMemberCond signUpMemberCond) {
    // member Signup
    Map<String, Object> result = memberService.signUpMember(signUpMemberCond);
    HttpHeaders headers = returnTokenHeader(result);

    // Page_Name을 return
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put(PAGE_NAME, result.get(PAGE_NAME));
    }}, headers, HttpStatus.OK);
  }

  @ApiOperation(value="로그인", notes = "로그인을 합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(로그인 성공)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @PostMapping(path="/api/members")
  public ResponseEntity<?> login(@RequestBody LoginMemberCond loginMemberCond) {
    // login 확인
    LoginItem result = memberService.loginMember(loginMemberCond);
    HttpHeaders headers = returnTokenHeader(result.getResult());
    LoginPayload memberInfo = LoginPayload.getMemberInfo(result);
    return ResponseEntity.status(200)
            .headers(headers)
            .body(memberInfo);
  }

  @ApiOperation(value = "Access 토큰 재발급", notes = "헤더의 refresh 토큰 정보를 통해 access 토큰을 재발급한다.")
  @ApiResponses({
          @ApiResponse(code = 200, message = "Access Token 재발급 성공"),
          @ApiResponse(code = 400, message = "기타 오류"),
          @ApiResponse(code = 401, message = "UNAUTHORIZED(재발급 실패, 로그아웃)"),
          @ApiResponse(code = 500, message = "서버 오류")
  })
  @GetMapping("/api/member/refresh")
  public ResponseEntity<?> refreshAccessToken(HttpServletRequest request) {
    // refreshAccessToken을 조회해서 재생성
    String refreshToken = request.getHeader(JwtFilter.REFRESH_HEADER);
    Map<String, Object> result = memberService.refreshAccessToken(refreshToken.substring(7));
    HttpHeaders headers = returnTokenHeader(result);

    return ResponseEntity.status(200).headers(headers).build();
  }

  @ApiOperation(value="로그아웃", notes = "헤더의 access 토큰 정보를 통해 refreshToken을 삭제 시킨다.")
  @ApiResponses({
          @ApiResponse(code = 200, message = "OK(로그아웃 성공)"),
          @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
          @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/api/auth/member/logout")
  public ResponseEntity<?> logout(HttpServletRequest request) {
    // jwt토큰값을 받습니다.
    String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
    // logout(토큰값 제거)
    memberService.logout(accessToken.substring(7));

    return new ResponseEntity(HttpStatus.OK);
  }

  public HttpHeaders returnTokenHeader(Map<String, Object> result) {
    //  HTTP 요청 헤더에 액세스 토큰과 리프레시 토큰을 추가하여 인증에 필요한 정보를 제공
    HttpHeaders headers = new HttpHeaders();
    headers.add(JwtFilter.ACCESS_HEADER, "Bearer " + result.get("accessToken"));
    headers.add(JwtFilter.REFRESH_HEADER, "Bearer " + result.get("refreshToken"));

    return headers;
  }

  @ApiOperation(value="페이지 정보 요청", notes = "PathVariable 값 page-name을 사용해서 페이지 정보를 요청합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(로그인 성공)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 404, message = "NOT FOUND(페이지 없음)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/api/pages/{page-name}")
  public ResponseEntity<?> getPageInfo(@PathVariable("page-name") String pageName) {
    // page 정보를 반환합니다.
    FindPageInfoPayload result = memberService.getPageInfoByPageName(pageName);

    return new ResponseEntity(result, HttpStatus.OK);
  }

  @ApiOperation(value="멤버 정보 요청", notes = "AccessToken을 사용해서 페이지 정보를 요청합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(로그인 성공)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
      @ApiResponse(code = 404, message = "NOT FOUND(페이지 없음)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/api/auth/member/info")
  public ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
    // 토큰값으로 memberAddress를 가져와서 member정보를 가져와서 반환합니다.
    String memberAddress = memberService.getMemberAddress(request);
    FindMemberPayload findMemberPayload = memberService.getMemberInfo(memberAddress);

    return new ResponseEntity(findMemberPayload, HttpStatus.OK);
  }

  @ApiOperation(value="멤버 정보 수정", notes = "AccessToken을 사용해서 멤버 주소를 확인한 후 페이지를 수정합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(로그인 성공)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
      @ApiResponse(code = 404, message = "NOT FOUND(페이지 없음)"),
      @ApiResponse(code = 409, message = "CONFLICT(pageName 존재)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @PutMapping(path="/api/auth/member/info")
  public ResponseEntity<?> modifyMemberInfo(@RequestBody ModifyMemberCond memberCond, HttpServletRequest request) {
    // 토큰값으로 memberAddress를 가져와서 수정 정보를 넘겨줘서 저장합니다.
    String memberAddress = memberService.getMemberAddress(request);
    memberService.modifyMemberInfo(memberAddress, memberCond);

    return new ResponseEntity(HttpStatus.OK);
  }

  @ApiOperation(value="멤버 배경 수정", notes = "AccessToken을 사용해서 멤버 주소를 확인한 후 멤버 배경을 수정합니다.")
  @ApiResponses({
          @ApiResponse(code = 200, message = "OK(배경 수정 성공)"),
          @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
          @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
          @ApiResponse(code = 500, message = "서버에러")
  })
  @PutMapping(path="/api/auth/member/background")
  public ResponseEntity<?> modifyMemberBackgroundImage(@RequestBody String backgroundImageSrc, HttpServletRequest request) throws JsonProcessingException {
    //먼저 ObjectMapper를 생성하고, Request Body에서 받은 배경 이미지 정보를 String 형태로 변환하고 수정합니다.
    ObjectMapper objectMapper = new ObjectMapper();
    memberService.modifyMemberBackgroundImage(objectMapper.readValue(backgroundImageSrc, String.class), request);

    return new ResponseEntity(HttpStatus.OK);
  }

  @ApiOperation(value="멤버 프로필 사진 수정", notes = "AccessToken을 사용해서 멤버 주소를 확인한 후 멤버 프로필 사진을 수정합니다.")
  @ApiResponses({
          @ApiResponse(code = 200, message = "OK(프로필 사진 수정 성공)"),
          @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
          @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
          @ApiResponse(code = 500, message = "서버에러")
  })
  @PutMapping(path="/api/auth/member/profile")
  public ResponseEntity<?> modifyMemberProfileImage(@RequestBody String profileImageSrc, HttpServletRequest request) throws JsonProcessingException {
    //먼저 ObjectMapper를 생성하고, Request Body에서 받은 프로필 이미지정보를 String 형태로 변환하고 수정합니다.
    ObjectMapper objectMapper = new ObjectMapper();
    memberService.modifyMemberProfileImage(objectMapper.readValue(profileImageSrc, String.class), request);

    return new ResponseEntity(HttpStatus.OK);
  }

  @ApiOperation(value="멤버 소개 수정", notes = "AccessToken을 사용해서 멤버 주소를 확인한 후 멤버 소개를 수정합니다.")
  @ApiResponses({
          @ApiResponse(code = 200, message = "OK(멤버 소개 수정 성공)"),
          @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
          @ApiResponse(code = 401, message = "UNAUTHORIZED(권한 없음)"),
          @ApiResponse(code = 500, message = "서버에러")
  })
  @PutMapping(path="/api/auth/member/introduction")
  public ResponseEntity<?> modifyMemberIntroduction(@RequestBody String introduction, HttpServletRequest request) throws JsonProcessingException {
    //먼저 ObjectMapper를 생성하고, Request Body에서 받은 자기소개 글을 String 형태로 변환하고 수정합니다.
    ObjectMapper objectMapper = new ObjectMapper();
    memberService.modifyMemberIntroduction(objectMapper.readValue(introduction, String.class), request);

    return new ResponseEntity(HttpStatus.OK);
  }

  @ApiOperation(value="비민번호 체크", notes = "AccessToken으로 인증 후 비밀번호를 체크합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(로그인 성공)"),
      @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @PutMapping(path="/api/auth/member/password")
  public ResponseEntity<?> checkPassword(@RequestBody String password, HttpServletRequest request) {
    // 맴버에 저장해놓은 Password를 확인합니다.
    boolean status = memberService.checkPassword(password, request);

    return new ResponseEntity(status, HttpStatus.OK);
  }

}
