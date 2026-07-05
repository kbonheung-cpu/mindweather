import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { SafetyNotice } from "@/components/SafetyNotice";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Mind Weather",
  description: "Daily stress self-care with mood check-ins and recovery routines.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${fraunces.variable} ${manrope.variable}`}>
        <div className="background-orb orb-one" />
        <div className="background-orb orb-two" />
        <div className="app-frame">
          {children}
          <footer className="site-footer">
            <SafetyNotice compact />
          </footer>
        </div>
      </body>
    </html>
  );
}
