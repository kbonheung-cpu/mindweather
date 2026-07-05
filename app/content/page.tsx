import { AppShell } from "@/components/AppShell";
import { ContentCard } from "@/components/ContentCard";
import { contentItems } from "@/data/content";

export default function ContentPage() {
  return (
    <AppShell
      eyebrow="Recovery Library"
      title="회복 콘텐츠"
      description="짧게 따라 할 수 있는 호흡, 명상, 스트레칭, 글쓰기 루틴을 카드형으로 모았습니다."
    >
      <section className="content-grid">
        {contentItems.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </section>
    </AppShell>
  );
}
