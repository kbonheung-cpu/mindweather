import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // 검색엔진·AI 크롤러 색인 전면 차단. robots.txt(app/robots.ts)는 준수 봇에만
  // 유효하지만, X-Robots-Tag 응답 헤더는 페이지가 실제로 fetch돼도 색인/아카이브를 막는다.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
