# Mind Weather MVP

Mind Weather(마음날씨)는 사용자가 매일 자신의 마음날씨와 스트레스 상태를 체크하고, AI 스타일의 회복 루틴을 추천받을 수 있는 셀프케어 웹앱 MVP입니다.

## 기술 스택

- Next.js App Router
- TypeScript
- localStorage 기반 저장
- Mock AI 추천 함수

## 설치 및 실행

```bash
cd mind-weather
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 앱을 확인할 수 있습니다.

## jeoninedu.life 배포 준비

- Docker 기반 배포 파일 포함
- nginx 설정 샘플 포함
- 배포 문서: `docs/jeoninedu-life-배포가이드.md`
- 도메인 후보 메모: `docs/도메인-후보-메모.md`

기본 권장 공개 주소는 `mindweather.jeoninedu.life`입니다.

## 주요 기능

- 홈 화면에서 체크인, AI 추천, 콘텐츠, 챌린지, 기록, 세계 마음지도 이동
- 마음날씨 체크 입력
  - 닉네임, 국가, 언어
  - 오늘의 마음날씨
  - 스트레스 점수 1~10
  - 수면 상태, 에너지 상태
  - 오늘의 한 줄 메모
- `generateAiRecommendation()` 기반 Mock AI 추천 결과
- 위기 표현 감지 시 일반 추천 대신 안전 안내 표시
- 콘텐츠 카드형 라이브러리
- 7-Day Mind Reset 체크리스트
- localStorage 기반 기록 저장/조회
- 샘플 데이터 기반 세계 마음지도

## 파일 구조

```text
mind-weather/
  app/
    page.tsx
    checkin/page.tsx
    result/page.tsx
    content/page.tsx
    challenge/page.tsx
    history/page.tsx
    global-map/page.tsx
  components/
    AppShell.tsx
    WeatherCard.tsx
    ContentCard.tsx
    SafetyNotice.tsx
  data/
    content.ts
    challenge.ts
    globalMap.ts
  lib/
    ai.ts
    constants.ts
    storage.ts
    types.ts
```

## 데이터와 확장 포인트

- `lib/storage.ts`
  - 현재는 localStorage 저장소를 사용합니다.
  - 추후 Supabase, Firebase 어댑터로 교체하기 쉽도록 저장 로직을 분리했습니다.
- `lib/ai.ts`
  - 현재는 규칙 기반 mock 추천을 반환합니다.
  - 추후 OpenAI API 호출 로직으로 `generateAiRecommendation()` 내부를 교체할 수 있습니다.
- `data/globalMap.ts`
  - 샘플 세계 마음지도 데이터를 별도 파일로 분리했습니다.

## 안전 설계

- 모든 화면 하단에 셀프케어 앱 안내 문구를 표시합니다.
- 메모에 아래 표현이 포함되면 일반 추천 대신 안전 안내를 우선 노출합니다.
  - `자해`
  - `자살`
  - `죽고 싶다`
  - `극단적 선택`
  - `harm myself`
  - `suicide`
- 앱은 질병 진단, 약물 추천, 치료 확정을 하지 않도록 문구를 제한했습니다.

## 추후 개선 아이디어

- Supabase/Firebase 연동으로 계정 기반 기록 동기화
- OpenAI API를 활용한 더 섬세한 개인화 추천
- 국가/언어 선택에 따른 다국어 UI 전환
- 실제 사용자 집계 기반 세계 마음지도
- 콘텐츠 영상 플레이어 및 즐겨찾기 기능
- 푸시 알림 기반 일일 체크인 리마인더
