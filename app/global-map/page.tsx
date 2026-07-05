import { AppShell } from "@/components/AppShell";
import { globalMoodData } from "@/data/globalMap";

export default function GlobalMapPage() {
  return (
    <AppShell
      eyebrow="Global Mind Map"
      title="오늘의 세계 마음지도"
      description="1차 MVP에서는 실제 집계 대신 샘플 데이터를 사용합니다. 나중에 실제 사용자 데이터와 연결할 수 있도록 구조를 분리해 두었습니다."
    >
      <section className="card stack">
        <span className="coach-badge">세계 마음지도</span>
        <div className="bar-list">
          {globalMoodData.map((item) => (
            <div key={item.label} className="stack">
              <div className="bar-row">
                <strong>{item.label}</strong>
                <span className="chip">{item.percentage}%</span>
              </div>
              <div className="bar-track">
                <div className={`bar-fill ${item.tone}`} style={{ width: `${item.percentage}%` }} />
              </div>
              <p className="muted-text">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
