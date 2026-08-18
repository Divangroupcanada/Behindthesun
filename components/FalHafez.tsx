"use client";
import { useState } from "react";
import { faNum } from "@/lib/engine/zodiac";

export default function FalHafez() {
  const [intention, setIntention] = useState("");
  const [phase, setPhase] = useState<"ask" | "opening" | "done">("ask");
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState("");

  async function open() {
    setPhase("opening"); setErr("");
    const started = Date.now();
    try {
      const r = await fetch("/api/fal", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intention }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "خطا");
      // let the "opening the book" beat land
      const wait = Math.max(0, 2200 - (Date.now() - started));
      setTimeout(() => { setRes(j); setPhase("done"); }, wait);
    } catch (e: any) { setErr(e.message); setPhase("ask"); }
  }

  if (phase === "opening")
    return (
      <div className="glass mx-auto flex max-w-lg flex-col items-center rounded-2xl p-12">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-spin-med rounded-full border border-dashed border-gold/40" />
          <div className="absolute inset-0 flex items-center justify-center text-3xl text-gold/70">۞</div>
        </div>
        <p className="mt-7 animate-fade-in text-sm text-cream/60">دیوان گشوده می‌شود…</p>
      </div>
    );

  if (phase === "done" && res) {
    const { draw, tabir, tabirUnavailable } = res;
    const g = draw.ghazal;
    return (
      <div className="animate-fade-up space-y-6">
        <div className="glass rounded-2xl p-7 md:p-10">
          <div className="mb-7 flex items-center justify-between text-xs text-cream/40">
            <span>غزل شماره‌ی {faNum(g.n)}</span>
            <span>دیوان حافظ</span>
          </div>

          <div className="space-y-4">
            {g.beyts.map((b: any, i: number) => {
              const shahed = i === draw.shahedBeyt;
              return (
                <div key={i}
                  className={`grid gap-x-6 gap-y-1 rounded-lg px-4 py-3 text-center sm:grid-cols-2 ${
                    shahed ? "border border-gold/35 bg-gold/[.07]" : ""
                  }`}>
                  <p className={`text-[15px] leading-loose ${shahed ? "text-pale-gold" : "text-cream/80"}`}>{b.m1}</p>
                  <p className={`text-[15px] leading-loose ${shahed ? "text-pale-gold" : "text-cream/80"}`}>{b.m2}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[11px] text-cream/35">بیت طلایی، بیت شاهد توست</p>

          {!g.verified && (
            <p className="mt-6 rounded-lg border border-white/10 bg-white/[.03] p-3 text-center text-[11px] leading-loose text-cream/40">
              این متن هنوز حرف‌به‌حرف با نسخه‌ی چاپی قزوینی‌-غنی مقابله نشده است.
              پیش از انتشار نهایی مقابله می‌شود.
            </p>
          )}
        </div>

        <div className="glass rounded-2xl p-7 md:p-10">
          <p className="mb-2 text-[11px] tracking-widest text-gold/70">نیت تو</p>
          <p className="mb-7 border-r-2 border-gold/40 pr-4 text-sm leading-loose text-cream/70">{intention}</p>

          <p className="mb-3 text-[11px] tracking-widest text-gold/70">تعبیر</p>
          {tabirUnavailable ? (
            <p className="text-sm leading-loose text-cream/45">
              تعبیر خودکار در دسترس نیست — اما غزل و بیت شاهدت کامل است.
              فال حافظ در اصل همین است: بیت را بخوان و خودت در نسبت با نیتت ببین.
            </p>
          ) : (
            <p className="whitespace-pre-line text-sm leading-loose text-cream/85">{tabir}</p>
          )}
        </div>

        <p className="text-center text-xs leading-loose text-cream/35">
          تا فردا، همین نیت همین غزل را می‌آورد.
          <br />
          در سنت فال، یک نیت یک پاسخ دارد — تا وقتی جوابی که می‌خواهی بیاید، دوباره نمی‌گیرند.
        </p>

        <button onClick={() => { setRes(null); setIntention(""); setPhase("ask"); }}
          className="mx-auto block text-sm text-cream/40 hover:text-cream/70">نیت تازه</button>
      </div>
    );
  }

  return (
    <div className="glass mx-auto w-full max-w-lg rounded-2xl p-7 md:p-9">
      <h3 className="mb-1.5 text-xl font-bold">نیتت را بنویس</h3>
      <p className="mb-6 text-xs leading-loose text-cream/45">
        یک جمله. هرچه روشن‌تر بنویسی، تعبیر دقیق‌تر می‌شود.
        نیت جایی نمی‌رود جز همین صفحه.
      </p>
      <textarea
        value={intention}
        onChange={(e) => setIntention(e.target.value.slice(0, 400))}
        rows={3}
        placeholder="مثلاً: در این تصمیمی که پیش رو دارم، چه چیزی را نمی‌بینم؟"
        className="w-full resize-none rounded-lg border border-white/12 bg-white/[.04] px-4 py-3 text-sm leading-loose text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-gold/60"
      />
      <p className="mt-2 text-left text-[11px] text-cream/25">{faNum(intention.length)}/{faNum(400)}</p>

      {err && <p className="mt-4 rounded-lg border border-ember/40 bg-ember/10 p-3 text-xs text-ember">{err}</p>}

      <button onClick={open} disabled={intention.trim().length < 3}
        className="mt-6 w-full rounded-lg bg-gradient-to-l from-gold to-pale-gold px-6 py-3.5 text-sm font-bold text-night transition-all hover:brightness-110 disabled:opacity-25">
        دیوان را بگشا ←
      </button>
    </div>
  );
}
