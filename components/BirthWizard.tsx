"use client";
import { useState } from "react";
import { jalaliToGregorian, sunSign, nearCusp, faNum, type Sign } from "@/lib/astro";

type Cal = "shamsi" | "miladi";
const J_MONTHS = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
const G_MONTHS = ["ژانویه","فوریه","مارس","آوریل","مه","ژوئن","ژوئیه","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"];

const STEPS = ["نام", "تاریخ تولد", "ساعت", "شهر"];

export default function BirthWizard() {
  const [step, setStep] = useState(0);
  const [cal, setCal] = useState<Cal>("shamsi");
  const [name, setName] = useState("");
  const [y, setY] = useState(""); const [m, setM] = useState("1"); const [d, setD] = useState("");
  const [hh, setHh] = useState(""); const [mm, setMm] = useState(""); const [unknownTime, setUnknownTime] = useState(false);
  const [city, setCity] = useState("");
  const [phase, setPhase] = useState<"form" | "calc" | "done">("form");
  const [result, setResult] = useState<{ sign: Sign; cusp: boolean; g: [number, number, number] } | null>(null);

  const canNext = [
    name.trim().length > 0,
    y.length === 4 && d !== "" && +d >= 1 && +d <= 31,
    unknownTime || (hh !== "" && mm !== ""),
    city.trim().length > 0,
  ][step];

  function submit() {
    setPhase("calc");
    const [gy, gm, gd] =
      cal === "shamsi" ? jalaliToGregorian(+y, +m, +d) : [+y, +m, +d] as [number, number, number];
    const sign = sunSign(gm, gd);
    setTimeout(() => {
      setResult({ sign, cusp: nearCusp(gm, gd), g: [gy, gm, gd] });
      setPhase("done");
    }, 2100);
  }

  /* ── calculating ── */
  if (phase === "calc")
    return (
      <Shell>
        <div className="flex flex-col items-center py-14">
          <div className="relative h-28 w-28">
            <div className="absolute inset-0 animate-spin-med rounded-full border border-dashed border-gold/50" />
            <div className="absolute inset-4 animate-spin-rev rounded-full border border-gold/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 animate-glow rounded-full bg-pale-gold halo" />
            </div>
          </div>
          <p className="mt-8 animate-fade-in text-sm text-cream/70">در حال محاسبه‌ی موقعیت آسمان…</p>
        </div>
      </Shell>
    );

  /* ── result ── */
  if (phase === "done" && result) {
    const { sign, cusp, g } = result;
    return (
      <Shell>
        <div className="animate-fade-up py-2 text-center">
          <p className="mb-1 text-xs tracking-widest text-cream/45">خورشیدِ {name.trim()}</p>
          <div className="my-5 text-7xl leading-none text-gold">{sign.glyph}</div>
          <h3 className="mb-1 text-3xl font-extrabold gold-text">{sign.fa}</h3>
          <p className="mb-5 text-xs text-cream/40">
            {faNum(g[2])} {G_MONTHS[g[1] - 1]} {faNum(g[0])} میلادی
          </p>
          <p className="mx-auto mb-6 max-w-md text-balance text-sm leading-loose text-cream/75">{sign.blurb}</p>

          <div className="mx-auto mb-6 grid max-w-sm grid-cols-2 gap-3 text-right">
            <Fact k="عنصر" v={sign.element} />
            <Fact k="حاکم" v={sign.ruler} />
          </div>

          {cusp && (
            <p className="mx-auto mb-6 max-w-md rounded-lg border border-gold/25 bg-gold/5 px-4 py-3 text-xs leading-loose text-cream/65">
              تاریخ تولدت نزدیک مرز دو برج است. مرز دقیق هر سال کمی جابه‌جا می‌شود —
              برای اطمینان به ساعت دقیق تولد نیاز است.
            </p>
          )}

          {/* locked depth — the honest paywall */}
          <div className="mx-auto mb-7 max-w-sm space-y-2">
            {["ماه — دنیای درونی‌ات", "طالع (Rising) — چهره‌ای که می‌بینند", "۱۰ سیاره در ۱۲ خانه"].map((t) => (
              <div key={t} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[.03] px-4 py-2.5">
                <span className="text-sm text-cream/50">{t}</span>
                <span className="text-xs text-gold/80">🔒 چارت کامل</span>
              </div>
            ))}
          </div>

          <a href="/sign-up" className="inline-block rounded-xl bg-gradient-to-l from-gold to-pale-gold px-8 py-3.5 text-sm font-bold text-night transition-transform hover:scale-[1.03]">
            چارت کاملم را بساز — رایگان
          </a>
          <button onClick={() => { setPhase("form"); setStep(0); }} className="mt-4 block w-full text-xs text-cream/40 hover:text-cream/70">
            از نو
          </button>
        </div>
      </Shell>
    );
  }

  /* ── form ── */
  return (
    <Shell>
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-gold" : "bg-white/10"}`} />
            <p className={`mt-2 text-center text-[11px] transition-colors ${i === step ? "text-gold" : "text-cream/35"}`}>{s}</p>
          </div>
        ))}
      </div>

      <div key={step} className="animate-fade-up">
        {step === 0 && (
          <Field label="اسمت چیست؟" hint="فقط برای اینکه فال را به نام تو بنویسیم.">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً: یاسمین" className={inputCls} autoFocus />
          </Field>
        )}

        {step === 1 && (
          <Field label="تاریخ تولدت؟" hint="اگر شمسی وارد کنی، خودمان به میلادی تبدیل می‌کنیم.">
            <div className="mb-4 flex gap-2">
              {(["shamsi", "miladi"] as Cal[]).map((c) => (
                <button key={c} onClick={() => setCal(c)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs transition-colors ${
                    cal === c ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-cream/50 hover:border-white/25"
                  }`}>
                  {c === "shamsi" ? "شمسی" : "میلادی"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input value={y} onChange={(e) => setY(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder={cal === "shamsi" ? "۱۳۷۰" : "۱۹۹۱"} inputMode="numeric" className={inputCls} />
              <select value={m} onChange={(e) => setM(e.target.value)} className={inputCls}>
                {(cal === "shamsi" ? J_MONTHS : G_MONTHS).map((n, i) => (
                  <option key={n} value={i + 1} className="bg-midnight">{n}</option>
                ))}
              </select>
              <input value={d} onChange={(e) => setD(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="روز" inputMode="numeric" className={inputCls} />
            </div>
          </Field>
        )}

        {step === 2 && (
          <Field label="ساعت تولدت؟" hint="برای طالع و خانه‌ها لازم است. ندانستنش هم اشکالی ندارد.">
            <div className="grid grid-cols-2 gap-2">
              <input value={hh} disabled={unknownTime} onChange={(e) => setHh(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="ساعت" inputMode="numeric" className={inputCls} />
              <input value={mm} disabled={unknownTime} onChange={(e) => setMm(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="دقیقه" inputMode="numeric" className={inputCls} />
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-cream/55">
              <input type="checkbox" checked={unknownTime} onChange={(e) => setUnknownTime(e.target.checked)} className="accent-[#B8862F]" />
              ساعت دقیق تولدم را نمی‌دانم
            </label>
            {unknownTime && (
              <p className="mt-3 animate-fade-in text-xs leading-loose text-cream/45">
                بدون ساعت، خورشید و بیشترِ سیارات را می‌شود محاسبه کرد — اما طالع و خانه‌ها نه.
                این را در چارتت شفاف می‌نویسیم.
              </p>
            )}
          </Field>
        )}

        {step === 3 && (
          <Field label="کجا به دنیا آمدی؟" hint="برای تنظیم منطقه‌ی زمانی و مختصات جغرافیایی.">
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="مثلاً: تهران، ایران" className={inputCls} />
          </Field>
        )}
      </div>

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="rounded-lg border border-white/12 px-5 py-3 text-sm text-cream/60 transition-colors hover:border-white/30">
            قبلی
          </button>
        )}
        <button
          onClick={() => (step === 3 ? submit() : setStep(step + 1))}
          disabled={!canNext}
          className="flex-1 rounded-lg bg-gradient-to-l from-gold to-pale-gold px-6 py-3 text-sm font-bold text-night transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-25"
        >
          {step === 3 ? "چارتم را نشانم بده ←" : "بعدی ←"}
        </button>
      </div>
      <p className="mt-4 text-center text-[11px] text-cream/30">
        اطلاعاتت روی همین دستگاه می‌ماند — هیچ‌چیز ارسال نمی‌شود.
      </p>
    </Shell>
  );
}

/* ── bits ── */
const inputCls =
  "w-full rounded-lg border border-white/12 bg-white/[.04] px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-gold/60 disabled:opacity-35";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass mx-auto w-full max-w-lg rounded-2xl p-7 shadow-2xl md:p-9">{children}</div>
  );
}

function Field({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-xl font-bold">{label}</h3>
      <p className="mb-5 text-xs leading-loose text-cream/45">{hint}</p>
      {children}
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[.03] px-4 py-3">
      <p className="mb-0.5 text-[11px] text-cream/40">{k}</p>
      <p className="text-sm font-bold text-cream/90">{v}</p>
    </div>
  );
}
