package com.donjo.backend.api.controller;

import com.donjo.backend.api.service.price.PriceServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Api(tags = "암호화폐 시세 조회 관련 API")
public class PriceController {

  private final PriceServiceImpl ethService;

  @ApiOperation(value="폴리곤 가격 확인", notes = "외부 API를 사용하여 폴리곤 가격을 USD로 조회합니다.")
  @ApiResponses({
      @ApiResponse(code = 200, message = "OK(가입한 유저)"),
      @ApiResponse(code = 500, message = "서버에러")
  })
  @GetMapping(path="/api/matic/price")
  public ResponseEntity<?> getPolygonPrice() throws JsonProcessingException {
    // MATIC 가격 불러오기
    Double ethToUsd = ethService.getUsdToMaticRate();

    return new ResponseEntity(ethToUsd, HttpStatus.OK);
  }
}
