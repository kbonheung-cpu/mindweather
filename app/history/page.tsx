"use client";

import Link from "next/link";

import { AppShell } from "@/components/AppShell";
import { WEATHER_LABELS } from "@/lib/constants";
import { getCheckinHistory } from "@/lib/storage";
import { useBrowserSnapshot } from "@/lib/useBrowserSnapshot";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function HistoryPage() {
  const history = useBrowserSnapshot(getCheckinHistory, () => []);

  return (
    <AppShell
      eyebrow="My History"
      title="나의 기록"
      description="localStorage에 저장된 지난 체크인 기록과 추천 루틴을 한눈에 확인할 수 있습니다."
    >
      {history.length === 0 ? (
        <section className="card empty-state stack">
          <h2>저장된 기록이 아직 없어요.</h2>
          <p className="muted-text">첫 체크인을 남기면 이곳에 날짜, 마음날씨, 메모, 추천 루틴이 쌓입니다.</p>
          <Link className="action-button" href="/checkin">
            첫 기록 만들기
          </Link>
        </section>
      ) : (
        <section className="history-list">
          {history.map((record) => (
            <article className="card stack" key={record.id}>
              <div className="split-row">
                <h2>{formatDate(record.createdAt)}</h2>
                <span className="chip">{WEATHER_LABELS[record.weather]}</span>
              </div>
              <p className="history-meta">스트레스 점수 {record.stressScore}/10</p>
              <div>
                <p className="kicker">추천 루틴</p>
                <p className="card-copy">{record.recommendation.routines.join(", ")}</p>
              </div>
              <div>
                <p className="kicker">메모</p>
                <p className="card-copy">{record.note || "메모 없음"}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </AppShell>
  );
}
