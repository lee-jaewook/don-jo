package com.donjo.backend.config.bucket;

import com.donjo.backend.api.service.member.MemberService;
import io.github.bucket4j.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class RateLimitFilter extends OncePerRequestFilter {

    private final ConcurrentHashMap<String, Bucket> buckets;
    private final MemberService memberService;

    public RateLimitFilter(MemberService memberService) {
        this.buckets = new ConcurrentHashMap<>();
        this.memberService = memberService;
    }

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.simple(10, Duration.ofHours(1));
        return Bucket4j.builder().addLimit(limit).build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().endsWith("limited")) {
            String clientId = memberService.getMemberAddress(request);
            if (clientId == null || clientId.isEmpty()) {
                response.setStatus(HttpStatus.BAD_REQUEST.value());
                return;
            }

            Bucket bucket = buckets.computeIfAbsent(clientId, k -> createNewBucket());
            ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

            log.info("접속 Address : {}", clientId);

            if (probe.isConsumed()) {
                response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
                log.info("남은 요청 수 : {}", String.valueOf(probe.getRemainingTokens()));
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.addHeader("X-Rate-Limit-Retry-After", String.valueOf(probe.getNanosToWaitForRefill() / 1_000_000_000));
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}