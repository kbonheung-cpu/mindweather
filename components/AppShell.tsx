import Link from "next/link";
import { ReactNode } from "react";

interface AppShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AppShell({ eyebrow, title, description, children }: AppShellProps) {
  return (
    <div className="shell">
      <header className="shell-header">
        <Link className="brand-link" href="/">
          <span className="brand-mark">MW</span>
          <div>
            <p className="brand-name">Mind Weather</p>
            <p className="brand-subtitle">마음날씨</p>
          </div>
        </Link>
        <nav className="nav-pills" aria-label="Primary">
          <Link href="/content">콘텐츠</Link>
          <Link href="/challenge">챌린지</Link>
          <Link href="/history">기록</Link>
        </nav>
      </header>

      <section className="hero-card">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="page-title">{title}</h1>
        <p className="page-copy">{description}</p>
      </section>

      <main className="page-stack">{children}</main>
    </div>
  );
}
