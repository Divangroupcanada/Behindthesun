import { norm360 } from "./zodiac";

export const ASPECTS = [
  { key: "conjunction", fa: "مقارنه", g: "☌", angle: 0,   orb: 8, kind: "major" },
  { key: "opposition",  fa: "مقابله", g: "☍", angle: 180, orb: 8, kind: "major" },
  { key: "trine",       fa: "تثلیث", g: "△", angle: 120, orb: 7, kind: "major" },
  { key: "square",      fa: "تربیع", g: "□", angle: 90,  orb: 7, kind: "major" },
  { key: "sextile",     fa: "تسدیس", g: "⚹", angle: 60,  orb: 5, kind: "major" },
] as const;

/** Luminaries get a wider orb, the outer bodies a tighter one. */
const ORB_FACTOR: Record<string, number> = {
  sun: 1.25, moon: 1.25,
  mercury: 1, venus: 1, mars: 1, jupiter: 1, saturn: 1,
  uranus: 0.8, neptune: 0.8, pluto: 0.8,
  northNode: 0.6, southNode: 0.6,
};

export interface Aspect {
  a: string; b: string;
  aFa: string; bFa: string;
  key: string; fa: string; g: string;
  exactAngle: number; orb: number; applying: boolean;
}

export function findAspects(
  bodies: { key: string; fa: string; lon: number; speed: number }[]
): Aspect[] {
  const out: Aspect[] = [];
  const usable = bodies.filter((b) => b.key !== "southNode");

  for (let i = 0; i < usable.length; i++) {
    for (let j = i + 1; j < usable.length; j++) {
      const A = usable[i], B = usable[j];
      let sep = Math.abs(norm360(A.lon - B.lon));
      if (sep > 180) sep = 360 - sep;

      for (const asp of ASPECTS) {
        const allowed = asp.orb * ((ORB_FACTOR[A.key] ?? 1) + (ORB_FACTOR[B.key] ?? 1)) / 2;
        const orb = Math.abs(sep - asp.angle);
        if (orb > allowed) continue;

        // applying when the separation is still closing
        const relSpeed = A.speed - B.speed;
        const sign = norm360(B.lon - A.lon) < 180 ? 1 : -1;
        const applying = sep > asp.angle ? relSpeed * sign > 0 : relSpeed * sign < 0;

        out.push({
          a: A.key, b: B.key, aFa: A.fa, bFa: B.fa,
          key: asp.key, fa: asp.fa, g: asp.g,
          exactAngle: asp.angle, orb: Math.round(orb * 100) / 100, applying,
        });
        break; // one aspect per pair — the tightest match wins
      }
    }
  }
  return out.sort((x, y) => x.orb - y.orb);
}
