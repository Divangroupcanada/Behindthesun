const PHASES = [
  { n: "نو", p: 0 }, { n: "هلال", p: 0.15 }, { n: "تربیع اول", p: 0.35 },
  { n: "احدب", p: 0.6 }, { n: "بدر", p: 1 }, { n: "تربیع آخر", p: 0.35 },
];

export default function MoonPhases() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-7 gap-y-6" aria-hidden>
      {PHASES.map((m, i) => (
        <div key={m.n + i} className="flex flex-col items-center gap-2.5">
          <div
            className="relative h-11 w-11 animate-float overflow-hidden rounded-full border border-gold/25 bg-night"
            style={{ animationDelay: `${i * 0.45}s` }}
          >
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cream to-pale-gold"
              style={{ clipPath: `inset(0 ${(1 - m.p) * 100}% 0 0)` }}
            />
          </div>
          <span className="text-[11px] text-cream/45">{m.n}</span>
        </div>
      ))}
    </div>
  );
}
