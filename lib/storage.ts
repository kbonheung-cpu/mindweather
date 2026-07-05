import { ChallengeProgress, CheckinRecord } from "@/lib/types";

const HISTORY_KEY = "mind-weather.history.v1";
const LATEST_RESULT_KEY = "mind-weather.latest-result.v1";
const CHALLENGE_KEY = "mind-weather.challenge.v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function createRecordId(): string {
  return `mw-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getCheckinHistory(): CheckinRecord[] {
  const history = readJson<CheckinRecord[]>(HISTORY_KEY, []);
  return history.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function saveCheckinRecord(record: CheckinRecord): void {
  const history = getCheckinHistory();
  const nextHistory = [record, ...history].slice(0, 50);
  writeJson(HISTORY_KEY, nextHistory);
  setLatestResultId(record.id);
}

export function getCheckinRecordById(id: string): CheckinRecord | null {
  return getCheckinHistory().find((record) => record.id === id) ?? null;
}

export function setLatestResultId(id: string): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(LATEST_RESULT_KEY, id);
}

export function getLatestResultId(): string | null {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(LATEST_RESULT_KEY);
}

export function getChallengeProgress(): ChallengeProgress {
  return readJson<ChallengeProgress>(CHALLENGE_KEY, {});
}

export function saveChallengeProgress(progress: ChallengeProgress): void {
  writeJson(CHALLENGE_KEY, progress);
}
