# Step 1: Build Next.js app
FROM node:18 AS build
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# Next.js 빌드
COPY . ./
ARG FRONTEND_ORIGIN
RUN FRONTEND_ORIGIN=$FRONTEND_ORIGIN npm run build


# 3단계:  next.js 실행 단계
FROM node:18-alpine AS runner

# 명령어를 실행할 디렉터리 지정
WORKDIR /app
 

# next.config.js에서 output을 standalone으로 설정하면 
# 빌드에 필요한 최소한의 파일만 ./next/standalone로 출력이 된다.
# standalone 결과물에는 public 폴더와 static 폴더 내용은 포함되지 않으므로, 따로 복사를 해준다.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
 
# 컨테이너의 수신 대기 포트를 3000으로 설정
EXPOSE 3000

# node로 애플리케이션 실행
CMD ["node", "server.js"]
