"use client";
import { useState } from "react";
import ChartWheel from "./ChartWheel";
import Interpretation from "./Interpretation";
import { searchCities, type City } from "@/lib/engine/cities";
import { formatFa, faNum, place } from "@/lib/engine/zodiac";

const J_MONTHS = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
const G_MONTHS = ["ژانویه","فوریه","مارس","آوریل","مه","ژوئن","ژوئیه","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"];
const STEPS = ["تاریخ", "ساعت", "محل", "سیستم"];

const input = "w-full rounded-lg border border-white/12 bg-white/[.04] px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-gold/60 disabled:opacity-35";

export default function ChartBuilder() {
  const [step, setStep] = useState(0);
  const [cal, setCal] = useState<"shamsi" | "miladi">("shamsi");
  const [y, setY] = useState(""); const [mo, setMo] = useState("1"); const [d, setD] = useState("");
  const [hh, setHh] = useState(""); const [mm, setMm] = useState(""); const [known, setKnown] = useState(true);
  const [q, setQ] = useState(""); const [city, setCity] = useState<City | null>(null);
  const [system, setSystem] = useState<"whole" | "placidus">("whole");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState<any>(null);

  const hits = q && !city ? searchCities(q) : [];
  const canNext = [
    y.length === 4 && d !== "" && +d >= 1 && +d <= 31,
    !known || (hh !== "" && mm !== ""),
    !!city, true,
  ][step];

  async function run() {
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/chart", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calendar: cal, year: +y, month: +mo, day: +d,
          hour: known ? +hh : 0, minute: known ? +mm : 0, timeKnown: known,
          lat: city!.lat, lon: city!.lon, tz: city!.tz, system,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "خطا");
      setData(j);
    } catch (e: any) { setErr(e.message || "محاسبه انجام نشد."); }
    setBusy(false);
  }

  /* ── result ── */
  if (data) {
    const c = data.chart;
    return (
      <div className="animate-fade-up space-y-8">
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
            <ChartWheel cusps={c.houses?.cusps ?? []} asc={c.houses?.asc ?? 0}
              bodies={c.bodies} aspects={c.aspects} />
            <div className="w-full flex-1 space-y-4">
              {c.ascendant && (
                <div className="grid grid-cols-2 gap-3">
                  <Box k="طالع" v={formatFa(c.ascendant)} />
                  <Box k="وسط آسمان" v={formatFa(c.midheaven)} />
                </div>
              )}
              <div className="rounded-xl border border-white/10 bg-white/[.03] p-4 text-xs leading-loose text-cream/50">
                <p>زمان جهانی: <span dir="ltr" className="text-cream/75">{c.utc.replace("T"," ").replace(".000Z"," UTC")}</span></p>
                <p>اختلاف با گرینویچ در آن تاریخ: <span dir="ltr" className="text-cream/75">{c.offset}</span></p>
                <p>سیستم خانه: {c.houses?.system === "placidus" ? "پلاسیدوس" : "برج کامل"}</p>
              </div>
              {c.notes.length > 0 && (
                <ul className="space-y-2 rounded-xl border border-gold/20 bg-gold/[.05] p-4 text-xs leading-loose text-cream/65">
                  {c.notes.map((n: string, i: number) => <li key={i}>• {n}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <h3 className="mb-5 font-extrabold">جایگاه سیارات</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10 text-xs text-cream/40">
                <th className="py-2 text-right font-normal">سیاره</th>
                <th className="py-2 text-right font-normal">جایگاه</th>
                <th className="py-2 text-right font-normal">خانه</th>
                <th className="py-2 text-right font-normal">حرکت</th>
              </tr></thead>
              <tbody>
                {c.bodies.map((b: any) => (
                  <tr key={b.key} className="border-b border-white/[.05]">
                    <td className="py-2.5"><span className="ml-2 text-gold">{b.g}</span>{b.fa}</td>
                    <td className="py-2.5 text-cream/80">{formatFa(b)}</td>
                    <td className="py-2.5 text-cream/50">{b.house ? faNum(b.house) : "—"}</td>
                    <td className="py-2.5 text-xs">{b.retrograde
                      ? <span className="text-ember">رجعی ℞</span>
                      : <span className="text-cream/35">مستقیم</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <h3 className="mb-1 font-extrabold">زوایا</h3>
          <p className="mb-5 text-xs text-cream/40">
            {faNum(c.aspects.length)} زاویه‌ی اصلی. «اربه» یعنی چقدر با زاویه‌ی دقیق فاصله دارد — هرچه کمتر، قوی‌تر.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {c.aspects.map((a: any, i: number) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-white/[.07] bg-white/[.02] px-3.5 py-2.5 text-sm">
                <span>{a.aFa} <span className="mx-1.5 text-gold">{a.g}</span> {a.bFa}</span>
                <span className="text-xs text-cream/40">{faNum(a.orb.toFixed(1))}°</span>
              </div>
            ))}
          </div>
        </div>

        <Interpretation bodies={c.bodies} ascSignFa={c.ascendant?.sign.fa ?? null} />

        <button onClick={() => { setData(null); setStep(0); }}
          className="mx-auto block text-sm text-cream/40 hover:text-cream/70">چارت دیگری بساز</button>
      </div>
    );
  }

  /* ── form ── */
  return (
    <div className="glass mx-auto w-full max-w-lg rounded-2xl p-7 md:p-9">
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-gold" : "bg-white/10"}`} />
            <p className={`mt-2 text-center text-[11px] ${i === step ? "text-gold" : "text-cream/35"}`}>{s}</p>
          </div>
        ))}
      </div>

      <div key={step} className="animate-fade-up">
        {step === 0 && (
          <>
            <h3 className="mb-1.5 text-xl font-bold">تاریخ تولدت؟</h3>
            <p className="mb-5 text-xs leading-loose text-cream/45">شمسی وارد کنی، خودمان تبدیل می‌کنیم.</p>
            <div className="mb-4 flex gap-2">
              {(["shamsi","miladi"] as const).map((k) => (
                <button key={k} onClick={() => setCal(k)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs transition-colors ${cal===k?"border-gold bg-gold/10 text-gold":"border-white/10 text-cream/50"}`}>
                  {k==="shamsi"?"شمسی":"میلادی"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input value={y} onChange={(e)=>setY(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder={cal==="shamsi"?"۱۳۷۰":"۱۹۹۱"} inputMode="numeric" className={input} />
              <select value={mo} onChange={(e)=>setMo(e.target.value)} className={input}>
                {(cal==="shamsi"?J_MONTHS:G_MONTHS).map((n,i)=><option key={n} value={i+1} className="bg-midnight">{n}</option>)}
              </select>
              <input value={d} onChange={(e)=>setD(e.target.value.replace(/\D/g,"").slice(0,2))} placeholder="روز" inputMode="numeric" className={input} />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="mb-1.5 text-xl font-bold">ساعت تولدت؟</h3>
            <p className="mb-5 text-xs leading-loose text-cream/45">ساعت محلی همان شهر — تفاوت ساعت تابستانی را خودمان حساب می‌کنیم.</p>
            <div className="grid grid-cols-2 gap-2">
              <input value={hh} disabled={!known} onChange={(e)=>setHh(e.target.value.replace(/\D/g,"").slice(0,2))} placeholder="ساعت (۰-۲۳)" inputMode="numeric" className={input} />
              <input value={mm} disabled={!known} onChange={(e)=>setMm(e.target.value.replace(/\D/g,"").slice(0,2))} placeholder="دقیقه" inputMode="numeric" className={input} />
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-cream/55">
              <input type="checkbox" checked={!known} onChange={(e)=>setKnown(!e.target.checked)} className="accent-[#B8862F]" />
              ساعت دقیق تولدم را نمی‌دانم
            </label>
            {!known && (
              <p className="mt-3 animate-fade-in rounded-lg border border-gold/20 bg-gold/[.05] p-3 text-xs leading-loose text-cream/60">
                بدون ساعت، طالع و خانه‌ها را محاسبه نمی‌کنیم — حدس زدنشان بی‌معناست.
                سیارات را می‌دهیم، با این توضیح که ماه ممکن است تا ۷ درجه خطا داشته باشد.
              </p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="mb-1.5 text-xl font-bold">کجا به دنیا آمدی؟</h3>
            <p className="mb-5 text-xs leading-loose text-cream/45">برای مختصات جغرافیایی و منطقه‌ی زمانی.</p>
            <input value={city ? `${city.fa}، ${city.c}` : q}
              onChange={(e)=>{ setCity(null); setQ(e.target.value); }}
              placeholder="مثلاً: تهران" className={input} />
            {hits.length > 0 && (
              <div className="mt-2 overflow-hidden rounded-lg border border-white/10">
                {hits.map((h) => (
                  <button key={h.en} onClick={()=>{ setCity(h); setQ(""); }}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-right text-sm transition-colors hover:bg-white/[.06]">
                    <span>{h.fa} <span className="text-cream/35">— {h.c}</span></span>
                    <span dir="ltr" className="text-[11px] text-cream/30">{h.tz}</span>
                  </button>
                ))}
              </div>
            )}
            {q && !city && hits.length === 0 && (
              <p className="mt-3 text-xs text-cream/45">شهر پیدا نشد. نزدیک‌ترین شهر بزرگ را انتخاب کن.</p>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="mb-1.5 text-xl font-bold">سیستم خانه</h3>
            <p className="mb-5 text-xs leading-loose text-cream/45">اگر مطمئن نیستی، «برج کامل» را بگذار — قدیمی‌ترین سیستم است.</p>
            <div className="space-y-2">
              {[
                { k:"whole", t:"برج کامل (Whole Sign)", d:"هر خانه یک برج کامل. سیستم هلنیستی، ساده و پایدار." },
                { k:"placidus", t:"پلاسیدوس (Placidus)", d:"تقسیم بر پایه‌ی زمان. رایج‌ترین سیستم مدرن غربی." },
              ].map((o) => (
                <button key={o.k} onClick={()=>setSystem(o.k as any)}
                  className={`w-full rounded-xl border p-4 text-right transition-colors ${system===o.k?"border-gold bg-gold/[.08]":"border-white/10 hover:border-white/25"}`}>
                  <p className="mb-1 text-sm font-bold">{o.t}</p>
                  <p className="text-xs leading-loose text-cream/45">{o.d}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {err && <p className="mt-5 rounded-lg border border-ember/40 bg-ember/10 p-3 text-xs text-ember">{err}</p>}

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button onClick={()=>setStep(step-1)} className="rounded-lg border border-white/12 px-5 py-3 text-sm text-cream/60 hover:border-white/30">قبلی</button>
        )}
        <button onClick={()=>(step===3?run():setStep(step+1))} disabled={!canNext||busy}
          className="flex-1 rounded-lg bg-gradient-to-l from-gold to-pale-gold px-6 py-3 text-sm font-bold text-night transition-all hover:brightness-110 disabled:opacity-25">
          {busy ? "در حال محاسبه…" : step===3 ? "چارتم را بساز ←" : "بعدی ←"}
        </button>
      </div>
    </div>
  );
}

function Box({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-gold/25 bg-gold/[.06] p-4">
      <p className="mb-1 text-[11px] text-cream/45">{k}</p>
      <p className="font-bold text-pale-gold">{v}</p>
    </div>
  );
}
