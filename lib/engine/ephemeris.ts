import * as A from "astronomy-engine";
import { norm360, place, type Placed } from "./zodiac";

export const BODIES = [
  { key: "sun", fa: "خورشید", g: "☀", body: A.Body.Sun },
  { key: "moon", fa: "ماه", g: "☾", body: A.Body.Moon },
  { key: "mercury", fa: "عطارد", g: "☿", body: A.Body.Mercury },
  { key: "venus", fa: "زهره", g: "♀", body: A.Body.Venus },
  { key: "mars", fa: "مریخ", g: "♂", body: A.Body.Mars },
  { key: "jupiter", fa: "مشتری", g: "♃", body: A.Body.Jupiter },
  { key: "saturn", fa: "زحل", g: "♄", body: A.Body.Saturn },
  { key: "uranus", fa: "اورانوس", g: "♅", body: A.Body.Uranus },
  { key: "neptune", fa: "نپتون", g: "♆", body: A.Body.Neptune },
  { key: "pluto", fa: "پلوتو", g: "♇", body: A.Body.Pluto },
] as const;

export interface BodyPosition extends Placed {
  key: string;
  fa: string;
  g: string;
  retrograde: boolean;
  speed: number; // deg/day
}

/** Geocentric apparent ecliptic longitude of a body. */
function lonAt(body: A.Body, time: A.AstroTime): number {
  if (body === A.Body.Sun) return norm360(A.SunPosition(time).elon);
  const vec = A.GeoVector(body, time, true); // aberration-corrected
  return norm360(A.Ecliptic(vec).elon);
}

/** Mean lunar node (Meeus 47.7) — the "raas" / سر و ذنب. */
function meanNodeLon(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return norm360(
    125.0445479 - 1934.1362891 * T + 0.0020754 * T * T +
    (T * T * T) / 467441 - (T * T * T * T) / 60616000
  );
}

export function julianDay(d: Date): number {
  return d.getTime() / 86400000 + 2440587.5;
}

export function bodyPositions(utc: Date): BodyPosition[] {
  const t = new A.AstroTime(utc);
  const dt = 0.5; // half-day step for speed / retrograde detection
  const tPlus = new A.AstroTime(new Date(utc.getTime() + dt * 86400000));

  const out: BodyPosition[] = BODIES.map((b) => {
    const l0 = lonAt(b.body, t);
    const l1 = lonAt(b.body, tPlus);
    let delta = l1 - l0;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const speed = delta / dt;
    return { key: b.key, fa: b.fa, g: b.g, retrograde: speed < 0, speed, ...place(l0) };
  });

  // North node — always retrograde by definition of the mean node
  const jd = julianDay(utc);
  const node = meanNodeLon(jd);
  out.push({
    key: "northNode", fa: "راس (گره شمالی)", g: "☊",
    retrograde: true, speed: -0.0529, ...place(node),
  });
  out.push({
    key: "southNode", fa: "ذنب (گره جنوبی)", g: "☋",
    retrograde: true, speed: -0.0529, ...place(node + 180),
  });

  return out;
}

/** Mean obliquity of the ecliptic, degrees (IAU 1980). */
export function obliquity(utc: Date): number {
  const T = (julianDay(utc) - 2451545.0) / 36525;
  return (
    23.439291111 - 0.0130041667 * T - 1.66667e-7 * T * T + 5.02778e-7 * T * T * T
  );
}

/** Greenwich apparent sidereal time in degrees. */
export function gastDeg(utc: Date): number {
  return norm360(A.SiderealTime(new A.AstroTime(utc)) * 15);
}
