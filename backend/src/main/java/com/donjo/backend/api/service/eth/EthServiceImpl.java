package com.donjo.backend.api.service.eth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class EthServiceImpl implements EthService{

  private final Cache<String, Double> cache = Caffeine.newBuilder()
      .expireAfterWrite(30, TimeUnit.SECONDS)
      .maximumSize(1)
      .build();

  @Override
  public Double getUsdToEthRate() throws JsonProcessingException {
    Double ethPrice = cache.getIfPresent("ETH-USD");
    if (ethPrice != null) {
      return ethPrice;
    } else {
      ethPrice = fetchEthPriceFromApi();
      cache.put("ETH-USD", ethPrice);
      return ethPrice;
    }
  }

  private Double fetchEthPriceFromApi() throws JsonProcessingException {
    String url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    if (response.getStatusCode() == HttpStatus.OK) {
      JsonNode root = new ObjectMapper().readTree(response.getBody());
      Double ethPrice = root.get("USD").asDouble();
      return Math.round(1 / ethPrice * 1000000.0) / 1000000.0; // round to 6 decimal places
    } else {
      throw new RuntimeException("Failed to fetch ETH-USD price from API");
    }
  }

}
