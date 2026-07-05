interface SafetyNoticeProps {
  compact?: boolean;
}

export function SafetyNotice({ compact = false }: SafetyNoticeProps) {
  return (
    <div className={`safety-notice ${compact ? "compact" : ""}`}>
      <p className="safety-title">Safety Notice</p>
      <p>
        Mind Weather는 의료 진단이나 치료를 제공하지 않으며, 위기 상황에서는 전문가 또는 긴급 지원을
        이용해야 합니다.
      </p>
    </div>
  );
}
