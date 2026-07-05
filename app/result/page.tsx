"use client";

import Link from "next/link";

import { AppShell } from "@/components/AppShell";
import { SafetyNotice } from "@/components/SafetyNotice";
import { WEATHER_LABELS } from "@/lib/constants";
import { getCheckinRecordById, getLatestResultId } from "@/lib/storage";
import { CheckinRecord } from "@/lib/types";
import { useBrowserSnapshot } from "@/lib/useBrowserSnapshot";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ResultPage() {
  const record = useBrowserSnapshot<CheckinRecord | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") ?? getLatestResultId();
    return id ? getCheckinRecordById(id) : null;
  }, () => null);

  return (
    <AppShell
      eyebrow="AI Recommendation"
      title="Mind Reset Coach 결과"
      description="오늘의 체크인을 바탕으로 회복에 집중할 수 있는 짧고 안전한 셀프케어 루틴을 정리했습니다."
    >
      {!record ? (
        <section className="card empty-state stack">
          <h2>아직 불러올 체크인 결과가 없어요.</h2>
          <p className="muted-text">먼저 오늘의 마음날씨를 기록하면 추천 결과를 바로 볼 수 있습니다.</p>
          <Link className="action-button" href="/checkin">
            체크인하러 가기
          </Link>
        </section>
      ) : (
        <>
          <section className="card stack">
            <div className="split-row">
              <span className="coach-badge">Mind Reset Coach</span>
              <span className="kicker">{formatDate(record.createdAt)}</span>
            </div>
            <div className="pill-row">
              <span className="stat-pill">{record.nickname}</span>
              <span className="stat-pill">{WEATHER_LABELS[record.weather]}</span>
              <span className="stat-pill">스트레스 {record.stressScore}/10</span>
            </div>
            <p className="card-copy">{record.recommendation.summary}</p>
            {record.note ? (
              <div className="card">
                <p className="kicker">오늘의 메모</p>
                <p className="card-copy">{record.note}</p>
              </div>
            ) : null}
          </section>

          <section className="result-grid">
            <article className="card">
              <h2>현재 스트레스 특징</h2>
              <p className="card-copy">{record.recommendation.stressPattern}</p>
            </article>

            <article className="card">
              <h2>추천 회복 루틴 3가지</h2>
              <ol className="list-clean">
                {record.recommendation.routines.map((routine) => (
                  <li key={routine}>{routine}</li>
                ))}
              </ol>
            </article>

            <article className="card">
              <h2>3분 실천 가이드</h2>
              <ol className="list-clean">
                {record.recommendation.guide.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>

            <article className="card">
              <h2>오늘의 메시지</h2>
              <p className="card-copy">{record.recommendation.encouragement}</p>
            </article>
          </section>

          {record.recommendation.isCrisis ? (
            <section className="stack">
              <SafetyNotice />
              <div className="card">
                <h2>지금 필요한 안내</h2>
                <p className="card-copy">
                  일반 추천 대신 안전을 최우선으로 두는 안내를 제공했습니다. 혼자 견디기보다 주변 사람과
                  전문 지원에 바로 연결해 주세요.
                </p>
              </div>
            </section>
          ) : null}

          <div className="button-row">
            <Link className="primary-button" href="/checkin">
              다시 체크하기
            </Link>
            <Link className="secondary-button" href="/history">
              나의 기록 보기
            </Link>
          </div>
        </>
      )}
    </AppShell>
  );
}
