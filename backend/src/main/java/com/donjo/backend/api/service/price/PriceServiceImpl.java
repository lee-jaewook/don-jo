package com.donjo.backend.api.service.price;

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
public class PriceServiceImpl implements PriceService {
  // Caffeine이라는 캐시 라이브러리를 사용하여, 문자열(String)을 키(Key)로, Double 형태의 값을 값(Value)으로 갖는 캐시(Cache) 객체를 생성하는 코드입니다.
  private final Cache<String, Double> cache = Caffeine.newBuilder()
      .expireAfterWrite(30, TimeUnit.SECONDS)
      .maximumSize(1)
      .build();

  @Override
  public Double getUsdToMaticRate() throws JsonProcessingException {
    // 키(Key)에 해당하는 값을 캐시에서 찾습니다.
    Double ethPrice = cache.getIfPresent("MATIC-USD");
    // 하지만, 캐시에 해당 키에 대한 값이 없다면, fetchEthPriceFromApi()를 호출하여 이더리움 가격 정보를 API를 통해 가져옵니다
    if (ethPrice != null) {
      return ethPrice;
    } else {
      ethPrice = fetchMaticPriceFromApi();
      cache.put("MATIC-USD", ethPrice);
      return ethPrice;
    }
  }

  private Double fetchMaticPriceFromApi() throws JsonProcessingException {
    // 외부 API에 HTTP GET 요청을 보내고, 응답(Response)을 ResponseEntity<String> 객체로 받습니다.
    String url = "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD";
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    // ObjectMapper 객체를 이용하여 response.getBody()에서 Json 형태로 받아온 이더리움 가격 정보를 파싱합니다.
    if (response.getStatusCode() == HttpStatus.OK) {
      JsonNode root = new ObjectMapper().readTree(response.getBody());
      Double maticPrice = root.get("USD").asDouble();
      // 6자리 소수점 이하를 반올림한 뒤, 해당 값을 반환합니다
      return Math.round(1 / maticPrice * 1000000.0) / 1000000.0; // round to 6 decimal places
    } else {
      throw new RuntimeException("Failed to fetch ETH-USD price from API");
    }
  }

}
