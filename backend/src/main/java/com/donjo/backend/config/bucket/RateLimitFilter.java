package com.donjo.backend.config.bucket;

import io.github.bucket4j.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class RateLimitFilter extends OncePerRequestFilter {

    private final Bucket bucket;

    public RateLimitFilter() {
        // 제한할 데이터 전송 속도를 나타냅니다. 1,000개의 요청을 1시간 동안 제한
        Bandwidth limit = Bandwidth.simple(1000, Duration.ofHours(1));
        this.bucket = Bucket4j.builder().addLimit(limit).build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //  "limited"로 끝나는지 확인 참이면 Rate Limiter가 적용
        if (request.getRequestURI().endsWith("limited")) {
            //  bucket에서 token을 소비하고, 소비한 후 남은 token의 수를 반환 1개의 token을 요청.
            ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
            //  token이 소비되었는지 여부를 확인합니다. 소비되었다면, 남은 token 수를 HTTP 헤더에 추가하고, 다음 필터로 요청을 전달
            if (probe.isConsumed()) {
                response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
                filterChain.doFilter(request, response);
            // token이 다시 채워지기까지 걸리는 시간을 추가
            } else {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.addHeader("X-Rate-Limit-Retry-After", String.valueOf(probe.getNanosToWaitForRefill() / 1_000_000_000));
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
