"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";

type Body = { key: string; fa: string; g: string; sign: { fa: string }; house: number | null; retrograde: boolean };

export default function Interpretation({
  bodies, ascSignFa,
}: { bodies: Body[]; ascSignFa: string | null }) {
  const [open, setOpen] = useState<string | null>(null);
  const [cache, setCache] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [noKey, setNoKey] = useState(false);

  const sun = bodies.find((b) => b.key === "sun");
  const moon = bodies.find((b) => b.key === "moon");

  async function load(id: string, payload: object) {
    if (cache[id]) { setOpen(open === id ? null : id); return; }
    setBusy(id); setErr(null); setOpen(id);
    try {
      const r = await fetch("/api/interpret", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!r.ok) { if (j.needsKey) setNoKey(true); throw new Error(j.error ?? "خطا"); }
      setCache((c) => ({ ...c, [id]: j.text }));
    } catch (e: any) { setErr(e.message); }
    setBusy(null);
  }

  if (noKey)
    return (
      <div className="glass rounded-2xl p-6 text-center md:p-8">
        <Sparkles className="mx-auto mb-3 h-5 w-5 text-gold/60" />
        <p className="mb-1 font-bold">تفسیر هنوز فعال نیست</p>
        <p className="text-xs leading-loose text-cream/45">
          محاسبه‌ها کامل‌اند — بخش تفسیر به‌زودی اضافه می‌شود.
        </p>
      </div>
    );

  const key = (b: Body) => `p:${b.key}`;

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="mb-1 font-extrabold">تفسیر</h3>
      <p className="mb-6 text-xs leading-loose text-cream/45">
        روی هر جایگاه بزن تا تفسیرش را ببینی. تفسیرها بر پایه‌ی سنت طالع‌بینی نوشته می‌شوند —
        نه پیشگویی، نه ادعای علمی.
      </p>

      {sun && moon && (
        <button
          onClick={() => load("overview", {
            kind: "overview", sun: sun.sign.fa, moon: moon.sign.fa, asc: ascSignFa,
          })}
          className="mb-4 w-full rounded-xl border border-gold/30 bg-gold/[.07] p-4 text-right transition-colors hover:border-gold/60"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-pale-gold">تصویر کلی چارت</span>
            <span className="text-xs text-cream/40">
              {busy === "overview" ? "…" : open === "overview" ? "بستن" : "بخوان"}
            </span>
          </div>
          {open === "overview" && cache["overview"] && (
            <p className="mt-4 whitespace-pre-line text-right text-sm leading-loose text-cream/80">{cache["overview"]}</p>
          )}
        </button>
      )}

      <div className="space-y-2">
        {bodies.filter((b) => !b.key.endsWith("Node")).map((b) => {
          const id = key(b);
          return (
            <button key={id}
              onClick={() => load(id, {
                bodyFa: b.fa, signFa: b.sign.fa, house: b.house, retrograde: b.retrograde,
              })}
              className="w-full rounded-xl border border-white/[.08] bg-white/[.02] p-4 text-right transition-colors hover:border-white/25"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  <span className="ml-2 text-gold">{b.g}</span>
                  {b.fa} در {b.sign.fa}
                  {b.house && <span className="text-cream/40">، خانه‌ی {b.house}</span>}
                  {b.retrograde && <span className="mr-2 text-xs text-ember">℞</span>}
                </span>
                <span className="text-xs text-cream/35">
                  {busy === id ? "…" : open === id ? "بستن" : "بخوان"}
                </span>
              </div>
              {open === id && cache[id] && (
                <p className="mt-4 whitespace-pre-line text-sm leading-loose text-cream/80">{cache[id]}</p>
              )}
            </button>
          );
        })}
      </div>

      {err && <p className="mt-4 rounded-lg border border-ember/40 bg-ember/10 p-3 text-xs text-ember">{err}</p>}
    </div>
  );
}
