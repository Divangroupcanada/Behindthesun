const PLANETS = [
  { fa: "عطارد", r: 52,  size: 3.5, dur: 14, color: "#C9C2B4", from: 0 },
  { fa: "زهره",  r: 76,  size: 5,   dur: 22, color: "#E8C77A", from: 120 },
  { fa: "مریخ",  r: 100, size: 4.5, dur: 32, color: "#C4452B", from: 240 },
  { fa: "مشتری", r: 126, size: 7,   dur: 46, color: "#D8B36A", from: 60 },
  { fa: "زحل",   r: 152, size: 6,   dur: 62, color: "#A88B5C", from: 200 },
];

export default function Orbits({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* sun */}
      <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cream to-gold halo animate-glow" />
      {PLANETS.map((p) => (
        <div
          key={p.fa}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
          style={{ width: p.r * 2, height: p.r * 2 }}
        >
          <div
            className="absolute inset-0 animate-[spinSlow_linear_infinite]"
            style={{ animationDuration: `${p.dur}s`, transform: `rotate(${p.from}deg)` }}
          >
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: p.size * 2, height: p.size * 2,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
