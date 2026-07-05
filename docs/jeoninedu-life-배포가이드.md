# Mind Weather jeoninedu.life 배포 가이드

> **2026-07-05 갱신**: 실제 배포는 **jeonin-hub 서버 + systemd + Cloudflare tunnel** 방식으로 완료됨.
> 아래 문서는 그 실제 구성을 반영한다. (구 버전의 단일 VPS `49.247.136.147` + docker compose + nginx/certbot 방식은 더 이상 사용하지 않음.)
> 서버 접속 정보·비번 등 민감 정보는 repo에 없는 `.ai_context.md`(gitignore) 참고.

## 공개 주소

- `mindweather.jeoninedu.life`

## 배포 아키텍처 (현재)

- **서버**: jeonin-hub (멀티테넌트 공용, `ssh jeonin-hub`)
- **코드 경로**: `/opt/apps/mindweather`
- **실행**: systemd 유닛 `mindweather.service` → `npm start` (Next.js), 내부 포트 **30410**
- **공개 노출**: Cloudflare tunnel 이 `mindweather.jeoninedu.life` → `127.0.0.1:30410` 프록시. **nginx/certbot 미사용** (TLS는 Cloudflare가 처리).
- **DB 없음**: localStorage 기반 앱. 서버 DB/데이터 마이그레이션 불필요.

## 최초 배포 (완료된 절차)

```bash
# 1) 코드 배치
ssh jeonin-hub 'git clone git@github.com:kbonheung-cpu/mindweather.git /opt/apps/mindweather'

# 2) 빌드
ssh jeonin-hub 'cd /opt/apps/mindweather && npm ci && NODE_ENV=production npm run build'

# 3) .env 생성 (권한 600)
#    PORT=30410 / NODE_ENV=production / SITE_URL=https://mindweather.jeoninedu.life / TZ=Asia/Seoul

# 4) systemd 유닛 /etc/systemd/system/mindweather.service 설치 후:
ssh jeonin-hub 'sudo systemctl daemon-reload && sudo systemctl enable --now mindweather'
```

systemd 유닛은 서버 내 `degree-10000.service`(같은 Next.js 앱) 패턴을 따른다:
`User=jeonin_admin`, `WorkingDirectory=/opt/apps/mindweather`, `EnvironmentFile=.../.env`,
`ExecStart=/usr/local/bin/npm start`, `Restart=always`.

## 재배포 (코드 업데이트)

```bash
ssh jeonin-hub 'cd /opt/apps/mindweather && git pull && npm ci && NODE_ENV=production npm run build'
ssh jeonin-hub 'sudo systemctl restart mindweather'
```

## 배포 후 확인

```bash
ssh jeonin-hub 'systemctl is-active mindweather && systemctl is-enabled mindweather'
ssh jeonin-hub 'ss -tlnp | grep 30410'
ssh jeonin-hub 'curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:30410/'   # 200
# 외부(Cloudflare tunnel 연결 후):
curl -I https://mindweather.jeoninedu.life
curl -s https://mindweather.jeoninedu.life/robots.txt
```

## 사용자 담당 (범위 밖)

- Cloudflare tunnel + 서브도메인 `mindweather.jeoninedu.life` → `127.0.0.1:30410` 연결/관리.

## 대안 경로 (현재 미사용, 참고용 유지)

- `docker-compose.yml`, `Dockerfile` — 컨테이너 배포용. 현재는 systemd 직접 실행이라 미사용.

> 구 버전에 있던 `deploy/nginx/*.conf`(단일 VPS nginx 리버스 프록시 + certbot 샘플)는 제거했다.
> jeonin-hub는 Cloudflare tunnel로 직접 `127.0.0.1:30410`을 노출하므로 host nginx/certbot이 필요 없다.
