import Link from "next/link";

import { AppShell } from "@/components/AppShell";

export default function HomePage() {
  return (
    <AppShell
      eyebrow="Wellness Self-Care"
      title="오늘의 마음날씨를 확인하고, 나에게 맞는 회복 루틴을 만나보세요."
      description="Mind Weather는 매일의 감정 흐름과 스트레스 상태를 가볍게 체크하고, Mind Reset Coach가 맞춤형 회복 루틴을 제안하는 셀프케어 앱입니다."
    >
      <section className="card stack">
        <span className="coach-badge">Mind Reset Coach</span>
        <div className="action-grid">
          <Link className="action-button" href="/checkin">
            오늘의 마음날씨 체크하기
          </Link>
          <Link className="secondary-button" href="/checkin">
            AI 회복 루틴 받기
          </Link>
          <Link className="secondary-button" href="/challenge">
            7일 리셋 챌린지 보기
          </Link>
          <Link className="secondary-button" href="/history">
            나의 기록 보기
          </Link>
          <Link className="secondary-button" href="/global-map">
            세계 마음지도 보기
          </Link>
          <Link className="secondary-button" href="/content">
            회복 콘텐츠 보기
          </Link>
        </div>
      </section>

      <section className="mini-grid">
        <article className="card">
          <p className="eyebrow">How It Works</p>
          <h2>1분 체크인</h2>
          <p className="card-copy">닉네임, 마음날씨, 스트레스 점수만으로도 빠르게 오늘의 상태를 기록할 수 있습니다.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Global Feature</p>
          <h2>세계 마음지도</h2>
          <p className="card-copy">샘플 데이터로 오늘의 글로벌 감정 흐름을 미리 보는 MVP 버전입니다.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Reset Challenge</p>
          <h2>7-Day Mind Reset</h2>
          <p className="card-copy">7일 동안 작은 미션을 이어가며 나만의 회복 리듬을 찾도록 돕습니다.</p>
        </article>
      </section>

      <section className="card stack">
        <h2>이 앱은 이렇게 설계했어요</h2>
        <div className="pill-row">
          <span className="stat-pill">모바일 최적화</span>
          <span className="stat-pill">localStorage 저장</span>
          <span className="stat-pill">Mock AI 추천</span>
          <span className="stat-pill">향후 Supabase/Firebase 확장 가능</span>
        </div>
      </section>
    </AppShell>
  );
}
