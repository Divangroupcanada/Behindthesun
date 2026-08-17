import * as A from "astronomy-engine";
import { bodyPositions } from "./ephemeris";
import { place, norm360, type Placed } from "./zodiac";

export interface SkyBody extends Placed { key: string; fa: string; g: string; retrograde: boolean }

export interface MoonNow {
  /** 0–360 elongation from the Sun */
  phaseAngle: number;
  illumination: number;   // 0–1
  fa: string;             // Persian phase name
  waxing: boolean;
}

const PHASES: [number, string][] = [
  [0, "ماه نو"], [45, "هلال نو"], [90, "تربیع اول"], [135, "احدب فزاینده"],
  [180, "بدر"], [225, "احدب کاهنده"], [270, "تربیع آخر"], [315, "هلال کهنه"],
];

export function moonNow(at: Date): MoonNow {
  const t = new A.AstroTime(at);
  const phase = A.MoonPhase(t);                    // 0=new, 90=first quarter, 180=full
  const illum = A.Illumination(A.Body.Moon, t).phase_fraction;
  let name = PHASES[0][1];
  for (const [deg, fa] of PHASES) if (phase >= deg - 22.5) name = fa;
  if (phase >= 337.5) name = "ماه نو";
  return { phaseAngle: phase, illumination: illum, fa: name, waxing: phase < 180 };
}

/** Everything the homepage strip needs, computed fresh. */
export function skyNow(at = new Date()) {
  const bodies = bodyPositions(at) as SkyBody[];
  const visible = bodies.filter((b) =>
    ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"].includes(b.key)
  );
  return { bodies: visible, moon: moonNow(at), at: at.toISOString() };
}

/** Next ingress (sign change) for a body — "خورشید تا ۲۲ مرداد در اسد است". */
export function daysToNextSign(key: string, from = new Date()): number | null {
  const start = bodyPositions(from).find((b) => b.key === key);
  if (!start) return null;
  const target = (start.signIndex + 1) * 30;
  for (let d = 1; d <= 400; d++) {
    const at = new Date(from.getTime() + d * 86400000);
    const p = bodyPositions(at).find((b) => b.key === key)!;
    if (p.signIndex !== start.signIndex && norm360(p.lon - target) < 180) return d;
  }
  return null;
}
