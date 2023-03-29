package com.donjo.backend.api.controller;

import com.donjo.backend.api.service.eth.EthServiceImpl;
import com.donjo.backend.db.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Api(tags = "이더리움 관련 API")
public class EthController {

  private final EthServiceImpl ethService;

  @ApiOperation(value="이더리움 가격 확인", notes = "외부 API를 사용하여 이더리움 가격을 USD로 조회합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(가입한 유저)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/api/ethprice")
  public ResponseEntity<?> checkExistingMember() throws JsonProcessingException {
    // Eth 가격 불러오기
    Double ethToUsd = ethService.getUsdToEthRate();

    return new ResponseEntity(ethToUsd, HttpStatus.OK);
  }

}
