# 가져올 이미지를 정의
FROM klakegg/hugo:ext AS builder

# 경로 설정하기
WORKDIR /app

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# 사이트를 빌드한다.
RUN hugo

# Nginx 이미지를 가져온다.
FROM nginx:alpine

# 빌드한 사이트를 복사한다.
COPY --from=builder /app/public /usr/share/nginx/html

# 80번 포트 노출
EXPOSE 80

# Nginx를 실행한다.
CMD ["nginx", "-g", "daemon off;"]
