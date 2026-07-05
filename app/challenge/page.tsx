"use client";

import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { challengeDays } from "@/data/challenge";
import { getChallengeProgress, saveChallengeProgress } from "@/lib/storage";
import { ChallengeProgress } from "@/lib/types";
import { useBrowserSnapshot } from "@/lib/useBrowserSnapshot";

export default function ChallengePage() {
  const storedProgress = useBrowserSnapshot<ChallengeProgress>(getChallengeProgress, () => ({}));
  const [localProgress, setLocalProgress] = useState<ChallengeProgress | null>(null);
  const progress = localProgress ?? storedProgress;
  const completedCount = challengeDays.filter((mission) => progress[String(mission.day)]).length;

  const completionRate = Math.round((completedCount / challengeDays.length) * 100);

  const toggleMission = (day: number) => {
    const nextProgress = {
      ...progress,
      [String(day)]: !progress[String(day)],
    };

    setLocalProgress(nextProgress);
    saveChallengeProgress(nextProgress);
  };

  return (
    <AppShell
      eyebrow="7-Day Mind Reset"
      title="7일 리셋 챌린지"
      description="매일 하나의 작은 회복 미션을 체크하며 나만의 회복 리듬을 만들어 보세요."
    >
      <section className="card progress-wrap">
        <div className="split-row">
          <h2>진행 현황</h2>
          <span className="chip">
            {completedCount}/{challengeDays.length} 완료
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completionRate}%` }} />
        </div>
        <p className="muted-text">현재 달성률 {completionRate}%</p>
      </section>

      <section className="challenge-grid">
        {challengeDays.map((mission) => (
          <article className="card" key={mission.day}>
            <div className="checkbox-row">
              <div>
                <p className="eyebrow">Day {mission.day}</p>
                <h2>{mission.title}</h2>
              </div>
              <input
                className="challenge-check"
                type="checkbox"
                checked={Boolean(progress[String(mission.day)])}
                onChange={() => toggleMission(mission.day)}
                aria-label={`${mission.title} 완료 체크`}
              />
            </div>
            <p className="card-copy">{mission.description}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
