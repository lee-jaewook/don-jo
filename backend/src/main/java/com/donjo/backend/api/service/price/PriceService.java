package com.donjo.backend.api.service.price;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface PriceService {
  // 이더리움 가격 가져오기
  Double getUsdToMaticRate() throws JsonProcessingException;

}
