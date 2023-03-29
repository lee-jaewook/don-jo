package com.donjo.backend.api.service.eth;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface EthService {
  // 이더리움 가격 가져오기
  Double getUsdToEthRate() throws JsonProcessingException;

}
