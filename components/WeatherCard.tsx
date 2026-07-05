"use client";

import { WeatherOption } from "@/lib/types";

interface WeatherCardProps {
  option: WeatherOption;
  selected: boolean;
  onSelect: (value: WeatherOption["value"]) => void;
}

export function WeatherCard({ option, selected, onSelect }: WeatherCardProps) {
  return (
    <button
      type="button"
      className={`weather-card tone-${option.tone} ${selected ? "selected" : ""}`}
      onClick={() => onSelect(option.value)}
    >
      <span className="weather-emoji">{option.emoji}</span>
      <span className="weather-label">{option.label}</span>
    </button>
  );
}
