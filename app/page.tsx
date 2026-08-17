import Link from "next/link";
import { Circle, BookOpen, Sparkles, Hash, Eye, ShieldCheck, Check, MapPin } from "lucide-react";
import Starfield from "@/components/Starfield";
import ZodiacWheel from "@/components/ZodiacWheel";
import Orbits from "@/components/Orbits";
import Reveal from "@/components/Reveal";
import BirthWizard from "@/components/BirthWizard";
import TarotFlip from "@/components/TarotFlip";
import TodaySky from "@/components/TodaySky";
import { faNum } from "@/lib/astro";

export const revalidate = 1800;

const DOORS = [
  { icon: Circle, t: "چارت تولد", d: "نقشه‌ی کامل آسمان لحظه‌ی تولدت — همه‌ی سیارات، خانه‌ها و زوایا.", m: `${faNum(3)} دقیقه`, href: "/astrology/birth-chart" },
  { icon: BookOpen, t: "فال حافظ", d: "غزلی از دیوان حافظ با متن اصل و تفسیر — نسخه‌ی قزوینی‌-غنی.", m: `${faNum(90)} ثانیه`, href: "/hafez" },
  { icon: Sparkles, t: "فال تاروت", d: "کارتی از دسته‌ی رایدر-ویت-اسمیت، با نمادشناسی و پرسش‌های تأمل.", m: `${faNum(2)} دقیقه`, href: "/tarot/daily" },
  { icon: Hash, t: "عدد مسیر زندگی", d: "عددت بر پایه‌ی تقلیل فیثاغورثی، با توضیح کاملِ روش محاسبه.", m: `${faNum(60)} ثانیه`, href: "/numerology/life-path" },
];

const PROMISES = [
  { i: Eye, t: "محاسبه را نشان می‌دهیم", d: "هر درجه و هر عدد، همراه با روش و منبعش." },
  { i: BookOpen, t: "متن اصل، نه بازنویسی", d: "غزل‌های حافظ از نسخه‌ی قزوینی-غنی، بی‌دست‌کاری." },
  { i: ShieldCheck, t: "داده‌ات فروخته نمی‌شود", d: "بدون شماره تلفن، بدون فروش اطلاعات، هیچ‌وقت." },
  { i: Check, t: "تأمل، نه پیشگویی", d: "ابزار خودشناسی‌ست — ادعای دانستن آینده نداریم." },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-night text-cream">
      {/* ambient wash */}
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#2B1B3D_0%,#15102A_38%,#0E0816_72%)]" />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[.07] bg-night/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="relative h-7 w-7 rounded-full border border-gold/70">
              <div className="absolute right-[6px] top-[7px] h-3 w-3 rounded-full bg-gold halo" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">پشت خورشید</span>
          </Link>
          <div className="hidden gap-7 text-sm text-cream/55 md:flex">
            {[["طالع‌بینی","/astrology"],["فال حافظ","/hafez"],["تاروت","/tarot"],["اعداد","/numerology"]].map(([t,h]) => (
              <Link key={h} href={h} className="transition-colors hover:text-gold">{t}</Link>
            ))}
          </div>
          <Link href="/sign-up" className="shrink-0 rounded-lg bg-gradient-to-l from-gold to-pale-gold px-4 py-2 text-sm font-bold text-night transition-transform hover:scale-105">
            شروع کن
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="relative">
        <Starfield count={110} />
        <div className="pointer-events-none absolute left-1/2 top-4 w-[min(115vw,900px)] -translate-x-1/2 opacity-[.4]">
          <ZodiacWheel className="h-auto w-full" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-24 text-center md:pt-32">
          <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-gold/25 bg-gold/[.07] px-4 py-1.5 text-xs text-pale-gold backdrop-blur">
            <MapPin className="h-3 w-3" />
            ساخته‌شده در تورنتو — برای فارسی‌زبانان سراسر جهان
          </div>

          <h1 className="mb-7 animate-fade-up text-balance text-4xl font-extrabold leading-[1.35] tracking-tight md:text-6xl md:leading-[1.25]">
            آسمانِ لحظه‌ای که
            <br />
            <span className="gold-text">به دنیا آمدی</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl animate-fade-up text-balance text-base leading-loose text-cream/65 md:text-lg" style={{ animationDelay: ".12s" }}>
            چارت واقعی، غزل اصل حافظ، دسته‌ی کامل تاروت — همه به فارسی،
            با منبع مشخص و محاسبه‌ای که خودت می‌توانی بررسی کنی.
          </p>

          <div className="animate-fade-up" style={{ animationDelay: ".24s" }}>
            <a href="#wizard" className="inline-block rounded-xl bg-gradient-to-l from-gold to-pale-gold px-9 py-4 text-sm font-bold text-night shadow-lg transition-transform hover:scale-[1.04]">
              چارت تولدت را رایگان ببین ←
            </a>
            <p className="mt-5 text-xs text-cream/40">بدون کارت بانکی · بدون شماره تلفن · {faNum(60)} ثانیه</p>
          </div>
        </div>
      </header>

      <TodaySky />

      {/* ── WIZARD ── */}
      <section id="wizard" className="relative scroll-mt-20 py-24">
        <Starfield count={45} />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold tracking-[.25em] text-gold/70">همین حالا امتحان کن</p>
            <h2 className="mb-4 text-balance text-3xl font-extrabold md:text-4xl">خورشیدت کجاست؟</h2>
            <p className="mx-auto max-w-lg text-balance text-sm leading-loose text-cream/55">
              چهار سؤال. تبدیل شمسی به میلادی خودکار است.
              محاسبه روی همین دستگاه انجام می‌شود — هیچ اطلاعاتی ارسال نمی‌کنیم.
            </p>
          </Reveal>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <Reveal delay={100}><BirthWizard /></Reveal>
            <Reveal delay={220} className="hidden lg:block">
              <Orbits className="h-[360px] w-[360px]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOUR DOORS ── */}
      <section className="relative border-y border-white/[.07] bg-white/[.015] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold tracking-[.25em] text-gold/70">چهار سنّت</p>
            <h2 className="mb-4 text-balance text-3xl font-extrabold md:text-4xl">هرچه لازم داری — هیچ‌چیز ساختگی</h2>
            <p className="mx-auto max-w-lg text-balance text-sm leading-loose text-cream/55">
              هر فال نشان می‌دهد از کدام سنّت آمده و با چه روشی محاسبه شده است.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {DOORS.map((d, i) => {
              const Icon = d.icon;
              return (
                <Reveal key={d.t} delay={i * 90}>
                  <Link href={d.href} className="group relative block overflow-hidden rounded-2xl border border-white/[.09] bg-white/[.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45">
                    <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-5 flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/[.07] transition-transform duration-500 group-hover:scale-110">
                          <Icon className="h-5 w-5 text-gold" />
                        </div>
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-0.5 text-[11px] font-bold text-emerald-300">رایگان</span>
                      </div>
                      <h3 className="mb-2 text-xl font-extrabold">{d.t}</h3>
                      <p className="mb-5 text-sm leading-loose text-cream/55">{d.d}</p>
                      <div className="flex items-center justify-between border-t border-white/[.07] pt-4">
                        <span className="text-xs text-cream/35">{d.m}</span>
                        <span className="text-sm font-bold text-gold transition-transform group-hover:-translate-x-1">شروع ←</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TAROT ── */}
      <section className="relative py-24">
        <Starfield count={35} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="mb-3 text-[11px] font-bold tracking-[.25em] text-gold/70">فال تاروت</p>
            <h2 className="mb-10 text-balance text-3xl font-extrabold md:text-4xl">نیت کن، یک کارت بردار</h2>
          </Reveal>
          <Reveal delay={120}><TarotFlip /></Reveal>
        </div>
      </section>

      {/* ── PROMISES ── */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold tracking-[.25em] text-gold/70">قول ما</p>
            <h2 className="text-balance text-3xl font-extrabold md:text-4xl">چرا پشت خورشید</h2>
          </Reveal>
          <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
            {PROMISES.map((p, i) => {
              const Icon = p.i;
              return (
                <Reveal key={p.t} delay={i * 80}>
                  <div className="flex gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/[.07]">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <h3 className="mb-1.5 font-extrabold">{p.t}</h3>
                      <p className="text-sm leading-loose text-cream/55">{p.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-white/[.07] py-28">
        <Starfield count={60} />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-gold/[.09] blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="mb-5 text-balance text-3xl font-extrabold leading-tight md:text-5xl md:leading-tight">
              چارتت همین‌جا منتظر است.
            </h2>
            <p className="mb-9 text-balance leading-loose text-cream/60">
              بدون کارت. بدون شماره تلفن. فقط طالع‌بینی واقعی، آن‌طور که باید باشد.
            </p>
            <a href="#wizard" className="inline-block rounded-xl bg-gradient-to-l from-gold to-pale-gold px-10 py-4 text-sm font-bold text-night shadow-xl transition-transform hover:scale-105">
              شروع کن — رایگان
            </a>
            <p className="mt-6 text-xs text-cream/35">رونمایی کامل در شب یلدا {faNum(1405)}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t border-white/[.07] bg-night py-12 text-sm text-cream/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full border border-gold/50" />
              <span>پشت خورشید · ساخته‌شده در تورنتو</span>
            </div>
            <div className="flex flex-wrap gap-6">
              {[["درباره‌ی ما","/about"],["حریم خصوصی","/privacy"],["شرایط استفاده","/terms"],["تماس","/contact"]].map(([t,h]) => (
                <Link key={h} href={h} className="transition-colors hover:text-gold">{t}</Link>
              ))}
            </div>
          </div>
          <p className="mt-8 border-t border-white/[.07] pt-6 text-xs leading-loose text-cream/25">
            پشت خورشید ابزاری برای تأمل و خودشناسی‌ست. محتوای این سایت جایگزین
            مشاوره‌ی پزشکی، روان‌شناختی، حقوقی یا مالی نیست.
          </p>
        </div>
      </footer>
    </div>
  );
}
