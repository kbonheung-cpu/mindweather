import { EnergyStatus, SleepStatus, WeatherOption } from "@/lib/types";

export const WEATHER_OPTIONS: WeatherOption[] = [
  { value: "sunny", emoji: "☀️", label: "맑음", tone: "gold" },
  { value: "cloudy", emoji: "☁️", label: "흐림", tone: "mist" },
  { value: "rainy", emoji: "🌧️", label: "비", tone: "rain" },
  { value: "foggy", emoji: "🌫️", label: "안개", tone: "fog" },
  { value: "stormy", emoji: "⛈️", label: "폭풍", tone: "storm" },
  { value: "anxious", emoji: "😟", label: "불안", tone: "rose" },
  { value: "angry", emoji: "😡", label: "분노", tone: "ember" },
  { value: "numb", emoji: "😶‍🌫️", label: "무기력", tone: "sage" },
  { value: "exhausted", emoji: "😮‍💨", label: "지침", tone: "lavender" },
];

export const SLEEP_OPTIONS: Array<{ value: SleepStatus; label: string }> = [
  { value: "good", label: "좋음" },
  { value: "okay", label: "보통" },
  { value: "bad", label: "나쁨" },
];

export const ENERGY_OPTIONS: Array<{ value: EnergyStatus; label: string }> = [
  { value: "high", label: "높음" },
  { value: "medium", label: "보통" },
  { value: "low", label: "낮음" },
];

export const WEATHER_LABELS = Object.fromEntries(
  WEATHER_OPTIONS.map((option) => [option.value, `${option.emoji} ${option.label}`]),
) as Record<WeatherOption["value"], string>;
