import { bodyPositions, obliquity, gastDeg, type BodyPosition } from "./ephemeris";
import { computeHouses, houseOf, type HouseSystem, type Houses } from "./houses";
import { findAspects, type Aspect } from "./aspects";
import { norm360, place, type Placed } from "./zodiac";
import { localToUTC, formatOffset } from "./time";

export interface BirthInput {
  year: number; month: number; day: number;  // Gregorian
  hour: number; minute: number;
  lat: number; lon: number; tz: string;
  timeKnown: boolean;
  system?: HouseSystem;
}

export interface Chart {
  utc: string;
  offset: string;
  bodies: (BodyPosition & { house: number | null })[];
  houses: Houses | null;
  ascendant: Placed | null;
  midheaven: Placed | null;
  aspects: Aspect[];
  timeKnown: boolean;
  notes: string[];
}

export function buildChart(i: BirthInput): Chart {
  // Unknown birth time → noon, and we refuse to output angles or houses.
  const h = i.timeKnown ? i.hour : 12;
  const m = i.timeKnown ? i.minute : 0;
  const { utc, offsetMinutes } = localToUTC(i.tz, i.year, i.month, i.day, h, m);

  const bodies = bodyPositions(utc);
  const notes: string[] = [];

  if (!i.timeKnown) {
    notes.push("ساعت تولد وارد نشده، پس ساعت ۱۲ ظهر محلی فرض شده است.");
    notes.push("بدون ساعت دقیق، طالع و خانه‌ها قابل محاسبه نیستند و نمایش داده نمی‌شوند.");
    notes.push("ماه تا حدود ۷ درجه در طول یک روز حرکت می‌کند، پس جایگاه آن تقریبی است.");
    return {
      utc: utc.toISOString(), offset: formatOffset(offsetMinutes),
      bodies: bodies.map((b) => ({ ...b, house: null })),
      houses: null, ascendant: null, midheaven: null,
      aspects: findAspects(bodies), timeKnown: false, notes,
    };
  }

  const eps = obliquity(utc);
  const ramc = norm360(gastDeg(utc) + i.lon);
  const system = i.system ?? "whole";
  const houses = computeHouses(ramc, eps, i.lat, system);

  if (houses.fellBack)
    notes.push("در عرض جغرافیایی این محل، سیستم پلاسیدوس تعریف نمی‌شود؛ خانه‌ها با سیستم «برج کامل» محاسبه شدند.");

  return {
    utc: utc.toISOString(),
    offset: formatOffset(offsetMinutes),
    bodies: bodies.map((b) => ({ ...b, house: houseOf(b.lon, houses.cusps) })),
    houses,
    ascendant: place(houses.asc),
    midheaven: place(houses.mc),
    aspects: findAspects(bodies),
    timeKnown: true,
    notes,
  };
}
