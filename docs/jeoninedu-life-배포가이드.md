# Mind Weather jeoninedu.life 배포 가이드

## 권장 공개 주소

- `mindweather.jeoninedu.life`

이유:

- 짧고 기억하기 쉽습니다.
- 브랜드명 `Mind Weather`와 자연스럽게 연결됩니다.
- 기존 `carshare.jeoninedu.life`와도 패턴이 맞습니다.

## 배포 전 확인

- DNS에 `mindweather.jeoninedu.life -> 49.247.136.147` A 레코드 추가
- 서버의 SSH host key 신뢰 정보 확인
- 서버 경로 예시: `/root/mind-weather`
- 앱 포트 예시: `30410`
- 검색엔진 차단 유지

## 로컬 준비

```bash
cd /root/mind-weather
cp .env.example .env
docker compose build
docker compose up -d
docker compose ps
docker compose logs app --tail=100
```

## nginx 설정

- 설정 파일: `deploy/nginx/mindweather.jeoninedu.life.conf`
- 프록시 대상: `127.0.0.1:30410`

## 인증서 발급

```bash
nginx -t
systemctl reload nginx
certbot --nginx -d mindweather.jeoninedu.life --non-interactive --agree-tos --register-unsafely-without-email --redirect
certbot certificates
```

## 배포 후 확인

```bash
curl -I https://mindweather.jeoninedu.life
curl -s https://mindweather.jeoninedu.life/robots.txt
docker compose ps
docker compose logs app --tail=100
```

## 현재 막힘

- 현재 DNS 레코드가 아직 없습니다.
- 현재 로컬 SSH 신뢰 정보와 서버 host key가 일치하지 않아 원격 접속이 차단됩니다.

이 두 가지가 해결되면 실제 외부 공개 배포를 진행할 수 있습니다.
