package com.donjo.backend.config;

import com.donjo.backend.config.bucket.RateLimitFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//  RateLimitFilter가 모든 URL에 적용되어, 요청 횟수를 제한하는 기능을 구현
@Configuration
public class RateLimitConfig {

    @Bean
    public FilterRegistrationBean<RateLimitFilter> rateLimitFilter() {
        FilterRegistrationBean<RateLimitFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RateLimitFilter());
        // "/*" 패턴으로 모든 URL에 대해 RateLimitFilter를 적용
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }
}
