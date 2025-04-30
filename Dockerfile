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




# Step 2: Serve with Nginx (정적 파일 서빙)
FROM nginx:stable-alpine

# Next.js의 정적 파일을 Nginx로 복사 (out/ 폴더)
COPY --from=build /app/out /usr/share/nginx/html

# Nginx 설정파일 복사 (필요시)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 포트 80 열기
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
