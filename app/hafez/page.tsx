import Link from "next/link";
import Starfield from "@/components/Starfield";
import FalHafez from "@/components/FalHafez";

export const metadata = {
  title: "فال حافظ — پشت خورشید",
  description: "غزلی از دیوان حافظ با متن اصل و تعبیر. نیتت را بنویس و دیوان را بگشا.",
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-night text-cream">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#2B1B3D_0%,#15102A_38%,#0E0816_72%)]" />
      <nav className="sticky top-0 z-50 border-b border-white/[.07] bg-night/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-7 w-7 rounded-full border border-gold/70">
              <div className="absolute right-[6px] top-[7px] h-3 w-3 rounded-full bg-gold halo" />
            </div>
            <span className="text-lg font-extrabold">پشت خورشید</span>
          </Link>
          <Link href="/" className="text-sm text-cream/50 hover:text-gold">→ بازگشت</Link>
        </div>
      </nav>

      <main className="relative px-6 py-16">
        <Starfield count={50} />
        <div className="relative mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold tracking-[.25em] text-gold/70">رایگان</p>
            <h1 className="mb-4 text-3xl font-extrabold md:text-4xl">فال حافظ</h1>
            <p className="mx-auto max-w-md text-balance text-sm leading-loose text-cream/55">
              نیتی در دل کن و بنویس. غزلی گشوده می‌شود و بیت شاهدت مشخص می‌گردد.
              فال حافظ پیشگویی نیست — آینه‌ای است برای دیدن پرسش خودت.
            </p>
          </div>
          <FalHafez />
        </div>
      </main>
    </div>
  );
}
