"use client";

import { useState } from "react";

import { ContentItem } from "@/lib/types";

interface ContentCardProps {
  item: ContentItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const [message, setMessage] = useState("");

  const handleRun = () => {
    if (!item.videoUrl) {
      setMessage("영상 연결은 곧 추가될 예정입니다.");
      return;
    }

    window.open(item.videoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="card content-card">
      <div className="content-head">
        <h3>{item.title}</h3>
        <span className="chip">{item.duration}</span>
      </div>
      <p className="card-copy">{item.description}</p>
      <div className="meta-row">
        <span className="meta-label">videoUrl</span>
        <span className="meta-value">{item.videoUrl || "추후 연결 예정"}</span>
      </div>
      <button type="button" className="secondary-button" onClick={handleRun}>
        실행하기
      </button>
      {message ? <p className="inline-message">{message}</p> : null}
    </article>
  );
}
