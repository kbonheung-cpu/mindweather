import { WEATHER_LABELS } from "@/lib/constants";
import { AiRecommendation, CheckinInput, WeatherKey } from "@/lib/types";

const CRISIS_PATTERN =
  /(자해|자살|죽고 싶|극단적 선택|해치고 싶|harm myself|suicide|kill myself|self-harm)/i;

const ROUTINE_LIBRARY: Record<WeatherKey, string[]> = {
  sunny: ["3분 호흡 명상", "짧은 감사 메모 쓰기", "가벼운 산책 또는 햇빛 쬐기"],
  cloudy: ["3분 호흡 명상", "목·어깨 이완 스트레칭", "오늘 내려놓고 싶은 생각 1가지 적기"],
  rainy: ["5분 바디 스캔 명상", "따뜻한 물 한 잔과 천천히 호흡하기", "감정 글쓰기 5문장"],
  foggy: ["천천히 눈 감고 10번 복식호흡", "오늘 꼭 필요한 일 1가지 정리", "짧은 물 마시기 휴식"],
  stormy: ["호흡 카운트 3분", "빠르게 걷기 5분", "감정을 안전하게 적고 멈추기"],
  anxious: ["4-6 호흡 3분", "발바닥 감각 집중하기", "걱정 한 줄 쓰고 오늘 가능한 일 1가지 정하기"],
  angry: ["목·어깨 이완 스트레칭", "손 힘 빼기와 턱 이완", "분노를 자극한 상황을 사실만 3줄 적기"],
  numb: ["햇빛 또는 창가에서 3분 머물기", "느린 전신 스트레칭", "아주 작은 할 일 1가지 실행하기"],
  exhausted: ["3분 호흡 명상", "목·어깨 이완 스트레칭", "잠들기 전 수면 루틴 준비하기"],
};

function uniqueRoutines(routines: string[]): string[] {
  return Array.from(new Set(routines)).slice(0, 3);
}

export function detectCrisisExpression(note: string): boolean {
  return CRISIS_PATTERN.test(note.trim());
}

function buildStressPattern(input: CheckinInput): string {
  if (input.stressScore >= 8) {
    return "지금은 긴장 강도가 높은 편입니다. 문제를 더 분석하기보다 호흡과 몸의 과부하를 먼저 낮추는 접근이 잘 맞습니다.";
  }

  if (input.energyStatus === "low" || input.sleepStatus === "bad") {
    return "피로와 회복 부족이 스트레스 체감에 영향을 주고 있어 보여요. 속도를 줄이고 회복 리듬을 다시 세우는 것이 우선입니다.";
  }

  if (input.stressScore >= 5) {
    return "스트레스가 서서히 쌓인 날로 보입니다. 짧은 리셋 루틴만으로도 마음의 밀도를 충분히 낮출 수 있습니다.";
  }

  return "전반적으로 감당 가능한 범위의 긴장으로 보여요. 지금의 균형을 유지하는 짧은 셀프케어가 도움이 됩니다.";
}

function buildSummary(input: CheckinInput): string {
  const weatherLabel = WEATHER_LABELS[input.weather];
  const sleepLine =
    input.sleepStatus === "bad"
      ? "수면 회복이 부족해 마음과 몸이 예민해졌을 수 있습니다."
      : input.sleepStatus === "good"
        ? "기본 회복력은 어느 정도 유지되고 있습니다."
        : "회복이 완전히 채워지지는 않은 상태로 보여요.";
  const energyLine =
    input.energyStatus === "low"
      ? "에너지가 낮아 작은 일도 더 크게 느껴질 수 있어요."
      : input.energyStatus === "high"
        ? "움직일 힘은 남아 있어 짧은 행동 루틴이 잘 맞습니다."
        : "무리하지 않는 선에서 천천히 리듬을 잡아보면 좋겠습니다.";

  return `오늘의 마음날씨는 ${weatherLabel}에 가깝습니다. ${sleepLine} ${energyLine}`;
}

function buildGuide(input: CheckinInput): string[] {
  if (input.stressScore >= 8) {
    return [
      "1분 동안 들숨 4초, 날숨 6초로 호흡해 보세요.",
      "다음 1분은 목과 어깨에 들어간 힘을 천천히 풀어 주세요.",
      "마지막 1분은 지금 가장 필요한 한 가지 회복 행동을 정해 바로 실행해 보세요.",
    ];
  }

  if (input.weather === "angry" || input.weather === "stormy") {
    return [
      "30초 동안 턱과 주먹의 힘을 의식적으로 풀어 주세요.",
      "1분 동안 제자리 걷기나 가벼운 스트레칭으로 열감을 빼 주세요.",
      "마지막 90초는 감정을 설명하지 말고 사실만 짧게 적어 보세요.",
    ];
  }

  return [
    "첫 1분은 호흡이나 명상으로 속도를 늦춰 주세요.",
    "다음 1분은 몸의 긴장을 풀거나 물 한 잔을 천천히 마셔 보세요.",
    "마지막 1분은 오늘 나를 가장 가볍게 해줄 행동 하나를 바로 시작해 보세요.",
  ];
}

function buildEncouragement(input: CheckinInput): string {
  if (input.stressScore >= 8 || input.energyStatus === "low") {
    return "완벽하지 않아도 괜찮습니다. 오늘은 회복하는 것만으로도 충분합니다.";
  }

  if (input.weather === "sunny") {
    return "좋은 흐름이 있는 날일수록 작은 돌봄이 내일의 안정감을 더 길게 이어줍니다.";
  }

  return "지금의 마음을 알아차린 것만으로도 이미 중요한 회복을 시작한 셈입니다.";
}

function buildRoutines(input: CheckinInput): string[] {
  const routines = [...ROUTINE_LIBRARY[input.weather]];

  if (input.stressScore >= 8) {
    routines.unshift("3분 호흡 명상");
  }

  if (input.energyStatus === "low") {
    routines.push("잠들기 전 수면 루틴 준비하기");
  }

  if (input.sleepStatus === "bad") {
    routines.push("따뜻한 조명 아래 수면 전 5분 정리");
  }

  return uniqueRoutines(routines);
}

export function generateAiRecommendation(input: CheckinInput): AiRecommendation {
  if (detectCrisisExpression(input.note)) {
    return {
      summary: "입력한 메모에서 즉각적인 안전 지원이 필요한 표현이 감지되었습니다.",
      stressPattern:
        "지금은 일반적인 셀프케어 추천보다 혼자 버티지 않고 사람과 지원체계에 바로 연결되는 것이 더 중요합니다.",
      routines: [
        "가까운 사람이나 보호자에게 지금 상태를 바로 알리기",
        "혼자 있지 않고 더 안전한 장소로 이동하기",
        "지역 긴급 지원 또는 위기 상담 창구에 즉시 연락하기",
      ],
      guide: [
        "지금 이 순간 믿을 수 있는 사람에게 전화나 메시지를 보내세요.",
        "위험한 물건이나 혼자 있는 환경에서 잠시 벗어나 주세요.",
        "지역 응급실, 긴급전화, 자살예방 상담 등 즉시 연결 가능한 지원을 이용하세요.",
      ],
      encouragement:
        "당신의 안전이 가장 중요합니다. 혼자 감당하지 말고 지금 바로 도움을 요청해 주세요.",
      isCrisis: true,
    };
  }

  return {
    summary: buildSummary(input),
    stressPattern: buildStressPattern(input),
    routines: buildRoutines(input),
    guide: buildGuide(input),
    encouragement: buildEncouragement(input),
  };
}
