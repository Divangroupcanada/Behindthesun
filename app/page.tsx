import Link from "next/link";
import { Sparkles, Circle, BookOpen, Hash, Check, MapPin, ShieldCheck, Eye } from "lucide-react";

/* ── Persian digit helper ───────────────────────────── */
const fa = (s: string | number) =>
  String(s).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

/* ── Data ───────────────────────────────────────────── */
const doors = [
  {
    icon: <Circle className="h-5 w-5 text-gold" />,
    title: "چارت تولد",
    body: "نقشه‌ی کامل آسمان لحظه‌ی تولدت — همه‌ی سیارات، خانه‌ها و زوایا. سیستم خانه‌ی پلاسیدوس.",
    meta: `${fa(3)} دقیقه · تاریخ، ساعت و شهر تولد`,
    href: "/astrology/birth-chart",
  },
  {
    icon: <BookOpen className="h-5 w-5 text-gold" />,
    title: "فال حافظ",
    body: "غزلی از دیوان حافظ، با متن اصل و تفسیر. نه ترجمه‌ی ماشینی — نسخه‌ی قزوینی-غنی.",
    meta: `${fa(90)} ثانیه · فقط یک نیت`,
    href: "/hafez",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-gold" />,
    title: "فال تاروت",
    body: "کارتی از دسته‌ی رایدر-ویت-اسمیت، با تاریخچه، نمادشناسی و پرسش‌هایی برای تأمل.",
    meta: `${fa(2)} دقیقه · بدون نیاز به اطلاعات`,
    href: "/tarot/daily",
  },
  {
    icon: <Hash className="h-5 w-5 text-gold" />,
    title: "عدد مسیر زندگی",
    body: "عددت بر پایه‌ی تقلیل فیثاغورثی، همراه با تفسیر کلاسیک و توضیح روش محاسبه.",
    meta: `${fa(60)} ثانیه · فقط تاریخ تولد`,
    href: "/numerology/life-path",
  },
];

const sky = [
  { p: "خورشید", s: "اسد" },
  { p: "ماه", s: "میزان" },
  { p: "عطارد", s: "اسد" },
  { p: "زهره", s: "میزان" },
  { p: "مریخ", s: "سرطان" },
  { p: "مشتری", s: "اسد" },
];

const promises = [
  { icon: <Eye className="h-4 w-4" />, t: "محاسبه را نشان می‌دهیم", d: "هر عدد و هر درجه، با روش و منبعش." },
  { icon: <BookOpen className="h-4 w-4" />, t: "متن اصل، نه بازنویسی", d: "غزل‌های حافظ از نسخه‌ی قزوینی-غنی." },
  { icon: <ShieldCheck className="h-4 w-4" />, t: "داده‌ات فروخته نمی‌شود", d: "بدون شماره تلفن، بدون فروش اطلاعات." },
  { icon: <Check className="h-4 w-4" />, t: "تأمل، نه پیشگویی", d: "ابزار خودشناسی‌ست، نه ادعای آینده." },
];

/* ── Page ───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-9">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="relative h-6 w-6 rounded-full border-[1.5px] border-ink">
                <div className="absolute right-[5px] top-[6px] h-[11px] w-[11px] rounded-full bg-gold" />
              </div>
              <span className="text-xl font-bold tracking-tight">پشت خورشید</span>
            </Link>
            <div className="hidden gap-7 text-sm text-ink-muted md:flex">
              <Link href="/astrology" className="transition-colors hover:text-ink">طالع‌بینی</Link>
              <Link href="/hafez" className="transition-colors hover:text-ink">فال حافظ</Link>
              <Link href="/tarot" className="transition-colors hover:text-ink">تاروت</Link>
              <Link href="/numerology" className="transition-colors hover:text-ink">اعداد</Link>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/sign-in" className="hidden text-sm text-ink-muted hover:text-ink md:block">ورود</Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              شروع کن
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-20 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-paper-2 px-3.5 py-1.5 text-xs text-ink-muted">
          <MapPin className="h-3 w-3 text-gold" />
          <span>ساخته‌شده در تورنتو — برای فارسی‌زبانان سراسر جهان</span>
        </div>

        <h1 className="mb-6 text-balance text-4xl font-extrabold leading-[1.35] tracking-tight md:text-6xl md:leading-[1.25]">
          طالع‌بینی، تاروت و <span className="text-gold">فال حافظ</span>
          <br />
          — این‌بار درست.
        </h1>

        <p className="mx-auto mb-9 max-w-2xl text-balance text-lg leading-relaxed text-ink-muted">
          چارت تولد واقعی. غزل اصل حافظ. دسته‌ی کامل تاروت.
          همه به فارسی — با منبع مشخص و محاسبه‌ای که خودت می‌توانی بررسی کنی.
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/astrology/birth-chart"
            className="rounded-lg bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
          >
            چارت تولدت را رایگان بگیر ←
          </Link>
          <Link
            href="/hafez"
            className="rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink-muted"
          >
            یک فال حافظ بگیر
          </Link>
        </div>

        <p className="text-sm text-ink-muted">
          پلن رایگان همیشگی · بدون کارت بانکی · بدون شماره تلفن
        </p>
      </section>

      {/* Today's sky — engagement loop */}
      <section className="border-y border-border bg-white py-7">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-ink-muted">
            امروز در آسمان
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {sky.map((x) => (
              <div key={x.p} className="flex items-baseline gap-1.5 text-sm">
                <span className="font-semibold">{x.p}</span>
                <span className="text-ink-muted">در</span>
                <span className="text-gold">{x.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four doors */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">چهار سنّت</p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              هرچه لازم داری — هیچ‌چیز ساختگی.
            </h2>
            <p className="text-balance text-base text-ink-muted">
              هر فال نشان می‌دهد از کدام سنّت آمده و با چه روشی محاسبه شده است.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {doors.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="group rounded-xl border border-border bg-paper p-6 transition-colors hover:border-ink-muted"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-paper-2">
                    {d.icon}
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    رایگان
                  </span>
                </div>
                <h3 className="mb-1.5 text-lg font-bold">{d.title}</h3>
                <p className="mb-4 text-sm leading-loose text-ink-muted">{d.body}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-muted">{d.meta}</span>
                  <span className="text-sm font-semibold text-ink transition-transform group-hover:-translate-x-0.5">
                    شروع ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">چطور کار می‌کند</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { n: 1, t: "اطلاعاتت را وارد کن", d: "تاریخ، ساعت و شهر تولد. برای فال حافظ فقط یک نیت کافی‌ست." },
              { n: 2, t: "محاسبه انجام می‌شود", d: "با داده‌های نجومی واقعی — نه متن آماده‌ی از پیش نوشته‌شده." },
              { n: 3, t: "با منبع می‌خوانی", d: "هر بخش می‌گوید از کجا آمده و چگونه به دست آمده است." },
            ].map((s) => (
              <div key={s.n}>
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold text-sm font-bold text-gold">
                  {fa(s.n)}
                </div>
                <h3 className="mb-2 text-base font-bold">{s.t}</h3>
                <p className="text-sm leading-loose text-ink-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">قول ما</p>
            <h2 className="text-3xl font-bold tracking-tight">چرا پشت خورشید</h2>
          </div>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {promises.map((p) => (
              <div key={p.t} className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-paper-2 text-gold">
                  {p.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold">{p.t}</h3>
                  <p className="text-sm leading-loose text-ink-muted">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl md:leading-tight">
            با چارت تولد رایگانت شروع کن.
          </h2>
          <p className="mb-8 text-balance text-base leading-relaxed text-white/70">
            بدون کارت. بدون شماره تلفن. فقط طالع‌بینی واقعی، آن‌طور که باید باشد.
          </p>
          <Link
            href="/astrology/birth-chart"
            className="inline-block rounded-lg bg-white px-8 py-4 text-sm font-bold text-ink transition-colors hover:bg-white/90"
          >
            چارت رایگانم را بگیر ←
          </Link>
          <p className="mt-5 text-sm text-white/50">
            رایگان همیشگی · رونمایی در شب یلدا {fa(1405)}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] py-10 text-sm text-white/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full border border-white/40" />
              <span>پشت خورشید · ساخته‌شده در تورنتو</span>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="/about" className="hover:text-white/80">درباره‌ی ما</Link>
              <Link href="/privacy" className="hover:text-white/80">حریم خصوصی</Link>
              <Link href="/terms" className="hover:text-white/80">شرایط استفاده</Link>
              <Link href="/contact" className="hover:text-white/80">تماس</Link>
            </div>
          </div>
          <p className="mt-7 border-t border-white/10 pt-6 text-xs leading-loose text-white/35">
            پشت خورشید ابزاری برای تأمل و خودشناسی‌ست. محتوای این سایت جایگزین
            مشاوره‌ی پزشکی، روان‌شناختی، حقوقی یا مالی نیست.
          </p>
        </div>
      </footer>
    </div>
  );
}
