"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { SafetyNotice } from "@/components/SafetyNotice";
import { WeatherCard } from "@/components/WeatherCard";
import { generateAiRecommendation } from "@/lib/ai";
import { ENERGY_OPTIONS, SLEEP_OPTIONS, WEATHER_OPTIONS } from "@/lib/constants";
import { createRecordId, saveCheckinRecord } from "@/lib/storage";
import { CheckinInput } from "@/lib/types";

const initialForm: CheckinInput = {
  nickname: "",
  country: "",
  language: "",
  weather: "cloudy",
  stressScore: 5,
  sleepStatus: "okay",
  energyStatus: "medium",
  note: "",
};

export default function CheckinPage() {
  const router = useRouter();
  const [form, setForm] = useState<CheckinInput>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const recommendation = generateAiRecommendation(form);
    const record = {
      ...form,
      id: createRecordId(),
      createdAt: new Date().toISOString(),
      recommendation,
    };

    saveCheckinRecord(record);
    router.push(`/result?id=${record.id}`);
  };

  return (
    <AppShell
      eyebrow="Daily Check-In"
      title="오늘의 마음날씨 체크"
      description="지금의 감정과 컨디션을 부드럽게 기록해 보세요. 이 입력을 바탕으로 Mind Reset Coach가 회복 루틴을 추천합니다."
    >
      <form className="card form-grid" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            className="input"
            placeholder="예: Luna"
            required
            value={form.nickname}
            onChange={(event) => setForm({ ...form, nickname: event.target.value })}
          />
        </div>

        <div className="mini-grid">
          <div className="input-group">
            <label htmlFor="country">국가</label>
            <input
              id="country"
              className="input"
              placeholder="예: Korea"
              required
              value={form.country}
              onChange={(event) => setForm({ ...form, country: event.target.value })}
            />
          </div>

          <div className="input-group">
            <label htmlFor="language">언어</label>
            <input
              id="language"
              className="input"
              placeholder="예: Korean"
              required
              value={form.language}
              onChange={(event) => setForm({ ...form, language: event.target.value })}
            />
          </div>
        </div>

        <div className="input-group">
          <label>오늘의 마음날씨 선택</label>
          <div className="weather-grid">
            {WEATHER_OPTIONS.map((option) => (
              <WeatherCard
                key={option.value}
                option={option}
                selected={form.weather === option.value}
                onSelect={(weather) => setForm({ ...form, weather })}
              />
            ))}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="stressScore">스트레스 점수: {form.stressScore}</label>
          <input
            id="stressScore"
            className="input"
            type="range"
            min={1}
            max={10}
            value={form.stressScore}
            onChange={(event) => setForm({ ...form, stressScore: Number(event.target.value) })}
          />
        </div>

        <div className="mini-grid">
          <div className="input-group">
            <label htmlFor="sleepStatus">수면 상태</label>
            <select
              id="sleepStatus"
              className="select"
              value={form.sleepStatus}
              onChange={(event) =>
                setForm({ ...form, sleepStatus: event.target.value as CheckinInput["sleepStatus"] })
              }
            >
              {SLEEP_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="energyStatus">에너지 상태</label>
            <select
              id="energyStatus"
              className="select"
              value={form.energyStatus}
              onChange={(event) =>
                setForm({ ...form, energyStatus: event.target.value as CheckinInput["energyStatus"] })
              }
            >
              {ENERGY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="note">오늘의 한 줄 메모</label>
          <textarea
            id="note"
            className="textarea"
            placeholder="예: 자꾸 생각이 많아지고 어깨가 무거워요."
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
          />
        </div>

        <SafetyNotice />

        <div className="button-row">
          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? "추천 생성 중..." : "AI 회복 루틴 보기"}
          </button>
        </div>
      </form>
    </AppShell>
  );
}
