import { norm360 } from "./zodiac";

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const sin = (d: number) => Math.sin(d * D2R);
const cos = (d: number) => Math.cos(d * D2R);
const tan = (d: number) => Math.tan(d * D2R);
const asin = (x: number) => Math.asin(Math.max(-1, Math.min(1, x))) * R2D;
const atan2 = (y: number, x: number) => Math.atan2(y, x) * R2D;

export type HouseSystem = "whole" | "placidus";

export interface Houses {
  system: HouseSystem;
  cusps: number[];   // 12 ecliptic longitudes, index 0 = house 1
  asc: number;
  mc: number;
  fellBack: boolean; // true when Placidus was requested but is undefined here
}

/** Ecliptic longitude of the Midheaven. */
export function midheaven(ramc: number, eps: number): number {
  return norm360(atan2(sin(ramc), cos(ramc) * cos(eps)));
}

/** Ecliptic longitude of the Ascendant. */
export function ascendant(ramc: number, eps: number, lat: number): number {
  const asc = atan2(cos(ramc), -(sin(ramc) * cos(eps) + tan(lat) * sin(eps)));
  const a = norm360(asc);
  const mc = midheaven(ramc, eps);
  // ASC must lie in the semicircle following the MC in zodiacal order
  return norm360(a - mc) > 180 ? norm360(a + 180) : a;
}

/** Right ascension -> ecliptic longitude, for a point ON the ecliptic. */
function raToEclipticLon(ra: number, eps: number): number {
  return norm360(atan2(sin(ra), cos(ra) * cos(eps)));
}

/**
 * One Placidus intermediate cusp.
 * The cusp divides its semi-arc into thirds; each trial position has its own
 * ascensional difference, so we iterate until the RA stops moving.
 */
function placidusCusp(ramc: number, eps: number, lat: number, base: number, f: number): number | null {
  let ra = norm360(ramc + base);
  for (let i = 0; i < 60; i++) {
    // declination of the ecliptic point whose RA is `ra`:  tan δ = sin(RA) · tan ε
    const dec = Math.atan(sin(ra) * tan(eps)) * R2D;
    const x = tan(lat) * tan(dec);
    if (Math.abs(x) > 1) return null;      // circumpolar — Placidus undefined
    const ad = asin(x);                    // ascensional difference
    const next = norm360(ramc + base + f * ad);
    if (Math.abs(norm360(next - ra + 180) - 180) < 1e-9) return next;
    ra = next;
  }
  return ra;
}

export function computeHouses(
  ramc: number, eps: number, lat: number, system: HouseSystem
): Houses {
  const mc = midheaven(ramc, eps);
  const asc = ascendant(ramc, eps, lat);

  if (system === "whole") {
    const start = Math.floor(asc / 30) * 30;
    return {
      system: "whole",
      cusps: Array.from({ length: 12 }, (_, i) => norm360(start + i * 30)),
      asc, mc, fellBack: false,
    };
  }

  // Placidus fails at/inside the polar circles.
  if (Math.abs(lat) >= 66.0) return { ...computeHouses(ramc, eps, lat, "whole"), fellBack: true };

  const c11 = placidusCusp(ramc, eps, lat, 30, 1 / 3);
  const c12 = placidusCusp(ramc, eps, lat, 60, 2 / 3);
  const c2 = placidusCusp(ramc, eps, lat, 120, 2 / 3);
  const c3 = placidusCusp(ramc, eps, lat, 150, 1 / 3);
  if (c11 === null || c12 === null || c2 === null || c3 === null)
    return { ...computeHouses(ramc, eps, lat, "whole"), fellBack: true };

  const cusps = new Array<number>(12);
  cusps[0] = asc;
  cusps[1] = raToEclipticLon(c2, eps);
  cusps[2] = raToEclipticLon(c3, eps);
  cusps[3] = norm360(mc + 180);
  cusps[4] = norm360(raToEclipticLon(c11, eps) + 180);
  cusps[5] = norm360(raToEclipticLon(c12, eps) + 180);
  cusps[6] = norm360(asc + 180);
  cusps[7] = norm360(cusps[1] + 180);
  cusps[8] = norm360(cusps[2] + 180);
  cusps[9] = mc;
  cusps[10] = raToEclipticLon(c11, eps);
  cusps[11] = raToEclipticLon(c12, eps);

  return { system: "placidus", cusps, asc, mc, fellBack: false };
}

/** Which house (1–12) contains a given longitude. */
export function houseOf(lon: number, cusps: number[]): number {
  const L = norm360(lon);
  for (let i = 0; i < 12; i++) {
    const a = cusps[i];
    const b = cusps[(i + 1) % 12];
    const span = norm360(b - a);
    if (norm360(L - a) < span) return i + 1;
  }
  return 1;
}
