package com.donjo.backend.api.service.eth;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface EthService {
  Double getUsdToEthRate() throws JsonProcessingException;

}
