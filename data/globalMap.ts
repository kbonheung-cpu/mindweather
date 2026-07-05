import { GlobalMoodPoint } from "@/lib/types";

export const globalMoodData: GlobalMoodPoint[] = [
  { label: "Calm", percentage: 32, tone: "mint", description: "호흡과 휴식에 안정감을 느끼는 흐름" },
  { label: "Tired", percentage: 24, tone: "peach", description: "피로가 누적되어 회복이 필요한 상태" },
  { label: "Anxious", percentage: 18, tone: "blue", description: "예측하기 어려운 하루로 긴장이 올라온 상태" },
  { label: "Stressed", percentage: 16, tone: "rose", description: "업무와 일상 압박이 크게 느껴지는 상태" },
  { label: "Hopeful", percentage: 10, tone: "gold", description: "변화를 기대하며 다시 시작할 힘이 남아 있는 상태" },
];
