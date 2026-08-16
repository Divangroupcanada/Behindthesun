const SIGNS = [
  { fa: "حمل", g: "♈" }, { fa: "ثور", g: "♉" }, { fa: "جوزا", g: "♊" },
  { fa: "سرطان", g: "♋" }, { fa: "اسد", g: "♌" }, { fa: "سنبله", g: "♍" },
  { fa: "میزان", g: "♎" }, { fa: "عقرب", g: "♏" }, { fa: "قوس", g: "♐" },
  { fa: "جدی", g: "♑" }, { fa: "دلو", g: "♒" }, { fa: "حوت", g: "♓" },
];

export default function ZodiacWheel({ className = "" }: { className?: string }) {
  const R = 200;
  return (
    <svg viewBox="0 0 440 440" className={className} aria-hidden>
      <defs>
        <radialGradient id="zwCore">
          <stop offset="0%" stopColor="#E8C77A" stopOpacity=".55" />
          <stop offset="55%" stopColor="#B8862F" stopOpacity=".13" />
          <stop offset="100%" stopColor="#B8862F" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="220" cy="220" r="150" fill="url(#zwCore)" className="animate-glow" />

      {/* outer + inner rings */}
      <g className="origin-center animate-spin-slow">
        <circle cx="220" cy="220" r={R} fill="none" stroke="#B8862F" strokeOpacity=".38" strokeWidth="1" />
        <circle cx="220" cy="220" r={R - 34} fill="none" stroke="#B8862F" strokeOpacity=".22" strokeWidth="1" />
        {SIGNS.map((_, i) => {
          const a = (i * 30 - 90) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={220 + Math.cos(a) * (R - 34)} y1={220 + Math.sin(a) * (R - 34)}
              x2={220 + Math.cos(a) * R} y2={220 + Math.sin(a) * R}
              stroke="#B8862F" strokeOpacity=".35" strokeWidth="1"
            />
          );
        })}
        {SIGNS.map((s, i) => {
          const a = (i * 30 - 75) * (Math.PI / 180);
          const r = R - 17;
          return (
            <text
              key={s.fa}
              x={220 + Math.cos(a) * r} y={220 + Math.sin(a) * r}
              textAnchor="middle" dominantBaseline="central"
              fill="#E8C77A" fillOpacity=".85" fontSize="16"
            >
              {s.g}
            </text>
          );
        })}
      </g>

      {/* counter-rotating aspect grid */}
      <g className="origin-center animate-spin-rev">
        <circle cx="220" cy="220" r="112" fill="none" stroke="#B8862F" strokeOpacity=".18" strokeWidth="1" />
        <polygon points="220,108 316,276 124,276" fill="none" stroke="#B8862F" strokeOpacity=".28" strokeWidth="1" />
        <polygon points="220,332 124,164 316,164" fill="none" stroke="#B8862F" strokeOpacity=".18" strokeWidth="1" />
        <rect x="140" y="140" width="160" height="160" fill="none" stroke="#B8862F" strokeOpacity=".12" strokeWidth="1" transform="rotate(15 220 220)" />
      </g>
    </svg>
  );
}
