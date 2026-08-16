import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Behind the Sun — A thoughtful home for the world's oldest questions",
  description:
    "Astrology, tarot, Persian poetry, and numerology. Real charts, real verses, real sources. Reflection, not prophecy.",
  keywords: [
    "astrology",
    "tarot",
    "hafez",
    "numerology",
    "birth chart",
    "fal e hafez",
    "persian poetry",
    "natal chart",
  ],
  authors: [{ name: "Raz" }],
  openGraph: {
    title: "Behind the Sun — A thoughtful home for the world's oldest questions",
    description:
      "Astrology, tarot, Persian poetry, and numerology. Sources cited, math shown, privacy first.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
