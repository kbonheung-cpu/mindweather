export type WeatherKey =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "foggy"
  | "stormy"
  | "anxious"
  | "angry"
  | "numb"
  | "exhausted";

export type SleepStatus = "good" | "okay" | "bad";
export type EnergyStatus = "high" | "medium" | "low";

export interface WeatherOption {
  value: WeatherKey;
  emoji: string;
  label: string;
  tone: string;
}

export interface CheckinInput {
  nickname: string;
  country: string;
  language: string;
  weather: WeatherKey;
  stressScore: number;
  sleepStatus: SleepStatus;
  energyStatus: EnergyStatus;
  note: string;
}

export interface AiRecommendation {
  summary: string;
  stressPattern: string;
  routines: string[];
  guide: string[];
  encouragement: string;
  isCrisis?: boolean;
}

export interface CheckinRecord extends CheckinInput {
  id: string;
  createdAt: string;
  recommendation: AiRecommendation;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
}

export interface ChallengeDay {
  day: number;
  title: string;
  description: string;
}

export type ChallengeProgress = Record<string, boolean>;

export interface GlobalMoodPoint {
  label: string;
  percentage: number;
  tone: string;
  description: string;
}
