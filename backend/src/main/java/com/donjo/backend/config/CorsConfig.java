package com.donjo.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addExposedHeader("accessToken");
        config.addExposedHeader("refreshToken");
        config.addExposedHeader("access_token");
        config.addExposedHeader("X-Rate-Limit-Retry-After"); // 요청 횟수 초과시 다음 요청까지 대기 시간 (초)
        config.addExposedHeader("X-Rate-Limit-Remaining"); // 남은 요청 횟수
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
