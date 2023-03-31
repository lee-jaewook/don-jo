package com.donjo.backend.config.jwt;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
public class JwtFilter extends GenericFilterBean {

   private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
   public static final String ACCESS_HEADER = "accessToken";
   public static final String REFRESH_HEADER = "refreshToken";
   private TokenProvider tokenProvider;
   public JwtFilter(TokenProvider tokenProvider) {
      this.tokenProvider = tokenProvider;
   }

   @Override
   public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//      logger.debug("Jwt filter start ");
      //  JWT 토큰을 추출하고, 추출한 토큰이 유효한지 검증
      HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
      String jwt = resolveToken(httpServletRequest);
      String requestURI = httpServletRequest.getRequestURI();
      log.info("====================================================");
      log.info("요청 IP ADDRESS : {}", servletRequest.getRemoteAddr());
      log.info("요청 URI : {}", requestURI);

      if (StringUtils.hasText(jwt)){
         if(tokenProvider.validateToken(jwt)){ // 토큰이 유효하다면
            Authentication authentication = tokenProvider.getAuthentication(jwt); // Authentication 객체(권한 정보들)를 가져온다.
            SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContext에 set한다.
            logger.info("MEMBER ADDRESS IN TOKEN : '{}'", authentication.getName());
            logger.info("JWT 토큰이 유효합니다.");
         } else {
            // 토큰 재발급 요청 메소드 차후 개선
            logger.info("JWT 토큰이 유효하지 않습니다.");
         }
      }
      filterChain.doFilter(servletRequest, servletResponse);
   }

   private String resolveToken(HttpServletRequest request) { // request header에서 token 정보를 가져옴
      String bearerToken = request.getHeader(ACCESS_HEADER);
//      System.out.println(bearerToken);

      if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
         return bearerToken.substring(7);
      }

      return null;
   }
}
