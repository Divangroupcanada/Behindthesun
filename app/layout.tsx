import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "پشت خورشید — طالع‌بینی، تاروت، فال حافظ و اعداد",
  description:
    "چارت تولد واقعی، غزل اصل حافظ، و فال تاروت — به فارسی، با منبع و محاسبه‌ی قابل بررسی. ساخته‌شده در تورنتو برای فارسی‌زبانان سراسر جهان.",
  keywords: [
    "طالع بینی فارسی", "فال حافظ", "چارت تولد", "فال تاروت",
    "اعداد شناسی", "هوروسکوپ فارسی", "آسترولوژی",
  ],
  openGraph: {
    title: "پشت خورشید — طالع‌بینی، تاروت، فال حافظ و اعداد",
    description:
      "چارت تولد واقعی، غزل اصل حافظ، و فال تاروت — به فارسی، با منبع و محاسبه‌ی قابل بررسی.",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
