import { skyNow } from "@/lib/engine/today";
import { formatFa, faNum } from "@/lib/engine/zodiac";

export default function TodaySky() {
  const { bodies, moon } = skyNow();
  const jToday = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric", month: "long", day: "numeric",
  }).format(new Date());

  return (
    <section className="relative border-y border-white/[.07] bg-white/[.02] py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <p className="text-[11px] font-bold tracking-[.25em] text-gold/70">امروز در آسمان</p>
          <span className="text-[11px] text-cream/30">{jToday}</span>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {bodies.map((b) => (
            <div key={b.key} className="flex items-baseline gap-1.5 text-sm">
              <span className="text-base text-gold/80">{b.g}</span>
              <span className="font-semibold text-cream/85">{b.fa}</span>
              <span className="text-pale-gold">{formatFa(b)}</span>
              {b.retrograde && <span className="text-xs text-ember">℞</span>}
            </div>
          ))}
        </div>

        {/* real moon phase */}
        <div className="flex items-center justify-center gap-3 text-xs text-cream/50">
          <MoonGlyph illum={moon.illumination} waxing={moon.waxing} />
          <span>{moon.fa}</span>
          <span className="text-cream/30">·</span>
          <span>روشنایی {faNum(Math.round(moon.illumination * 100))}٪</span>
        </div>

        <p className="mt-5 text-center text-[11px] text-cream/25">
          محاسبه‌ی زنده — موقعیت ظاهری زمین‌مرکزی، مختصات دائرةالبروج
        </p>
      </div>
    </section>
  );
}

function MoonGlyph({ illum, waxing }: { illum: number; waxing: boolean }) {
  // Terminator drawn as an ellipse whose width tracks illumination.
  const r = 11;
  const k = Math.abs(1 - 2 * illum) * r;
  const sweepLit = waxing ? 0 : 1;
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      <circle cx="13" cy="13" r={r} fill="#15102A" stroke="#B8862F" strokeOpacity=".4" />
      <path
        d={`M13 2 A ${r} ${r} 0 0 ${sweepLit} 13 24 A ${k} ${r} 0 0 ${illum > 0.5 ? sweepLit : 1 - sweepLit} 13 2 Z`}
        fill="#F4E4B8"
      />
    </svg>
  );
}
