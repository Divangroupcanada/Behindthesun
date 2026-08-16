"use client";
import { SIGNS } from "@/lib/engine/zodiac";

interface Body { key: string; g: string; fa: string; lon: number; retrograde: boolean }
interface Props { cusps: number[]; asc: number; bodies: Body[]; aspects: { a: string; b: string; key: string }[] }

const ASPECT_COLOR: Record<string, string> = {
  conjunction: "#E8C77A", opposition: "#C4452B", square: "#C4452B",
  trine: "#5BA88A", sextile: "#5BA88A",
};

export default function ChartWheel({ cusps, asc, bodies, aspects }: Props) {
  const S = 520, C = S / 2;
  const R_OUT = 244, R_SIGN = 210, R_HOUSE = 168, R_BODY = 190, R_ASPECT = 160;

  // Ascendant is pinned to the left (9 o'clock), zodiac runs counter-clockwise.
  const ang = (lon: number) => ((lon - asc) * Math.PI) / 180 + Math.PI;
  const pt = (lon: number, r: number) => [C + Math.cos(ang(lon)) * r, C - Math.sin(ang(lon)) * r];

  // Nudge apart bodies that would overlap
  const sorted = [...bodies].sort((a, b) => a.lon - b.lon);
  const shown: (Body & { draw: number })[] = [];
  sorted.forEach((b) => {
    let draw = b.lon;
    const last = shown[shown.length - 1];
    if (last && Math.abs(draw - last.draw) < 7) draw = last.draw + 7;
    shown.push({ ...b, draw });
  });
  const posOf = (k: string) => shown.find((s) => s.key === k)?.draw ?? 0;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="h-auto w-full max-w-xl">
      <defs>
        <radialGradient id="cw-core">
          <stop offset="0%" stopColor="#B8862F" stopOpacity=".16" />
          <stop offset="100%" stopColor="#B8862F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r={R_ASPECT} fill="url(#cw-core)" />

      {/* rings */}
      {[R_OUT, R_SIGN, R_HOUSE, R_ASPECT].map((r) => (
        <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="#B8862F" strokeOpacity=".28" strokeWidth="1" />
      ))}

      {/* sign sectors + glyphs */}
      {SIGNS.map((s, i) => {
        const start = i * 30;
        const [x1, y1] = pt(start, R_SIGN);
        const [x2, y2] = pt(start, R_OUT);
        const [gx, gy] = pt(start + 15, (R_SIGN + R_OUT) / 2);
        return (
          <g key={s.en}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B8862F" strokeOpacity=".3" />
            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="central" fontSize="17" fill="#E8C77A">{s.g}</text>
          </g>
        );
      })}

      {/* house cusps */}
      {cusps.map((c, i) => {
        const [x1, y1] = pt(c, R_ASPECT);
        const [x2, y2] = pt(c, R_SIGN);
        const angular = i === 0 || i === 3 || i === 6 || i === 9;
        const [nx, ny] = pt(c + 4, R_HOUSE + 12);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={angular ? "#E8C77A" : "#B8862F"}
              strokeOpacity={angular ? ".85" : ".3"}
              strokeWidth={angular ? 1.6 : 1} />
            <text x={nx} y={ny} textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#F4E4B8" fillOpacity=".45">
              {"۱۲۳۴۵۶۷۸۹".split("")[i] ?? ["۱۰","۱۱","۱۲"][i - 9]}
            </text>
          </g>
        );
      })}

      {/* aspect lines */}
      {aspects.map((a, i) => {
        const [x1, y1] = pt(posOf(a.a), R_ASPECT);
        const [x2, y2] = pt(posOf(a.b), R_ASPECT);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={ASPECT_COLOR[a.key] ?? "#B8862F"} strokeOpacity=".38"
            strokeWidth={a.key === "conjunction" ? 1.4 : 1}
            strokeDasharray={a.key === "sextile" ? "3 3" : undefined} />
        );
      })}

      {/* bodies */}
      {shown.map((b) => {
        const [x, y] = pt(b.draw, R_BODY);
        const [tx, ty] = pt(b.lon, R_ASPECT);
        return (
          <g key={b.key}>
            <line x1={tx} y1={ty} x2={x} y2={y} stroke="#E8C77A" strokeOpacity=".22" />
            <circle cx={tx} cy={ty} r="1.8" fill="#E8C77A" fillOpacity=".7" />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="15" fill="#F4E4B8">{b.g}</text>
            {b.retrograde && (
              <text x={x + 11} y={y + 8} textAnchor="middle" fontSize="8" fill="#C4452B">℞</text>
            )}
          </g>
        );
      })}

      {/* ASC / MC labels */}
      <text x={C - R_OUT + 4} y={C - 8} fontSize="11" fill="#E8C77A" fontWeight="bold">طالع</text>
      {(() => { const [x, y] = pt(cusps[9], R_OUT - 10);
        return <text x={x} y={y - 6} textAnchor="middle" fontSize="11" fill="#E8C77A" fontWeight="bold">وسط آسمان</text>; })()}
    </svg>
  );
}
