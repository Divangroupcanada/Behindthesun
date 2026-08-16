/**
 * Wall-clock time in a named zone -> UTC instant.
 * Uses the IANA database via Intl, so historical rules are handled correctly —
 * including Iran's DST, which ran from 1978 until it was abolished in 2022.
 */
export function zoneOffsetMinutes(tz: string, at: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const p = dtf.formatToParts(at);
  const g = (t: string) => Number(p.find((x) => x.type === t)!.value);
  const asIfUTC = Date.UTC(g("year"), g("month") - 1, g("day"), g("hour") % 24, g("minute"), g("second"));
  return (asIfUTC - at.getTime()) / 60000;
}

export function localToUTC(
  tz: string, y: number, mo: number, d: number, h: number, mi: number
): { utc: Date; offsetMinutes: number } {
  const naive = Date.UTC(y, mo - 1, d, h, mi, 0);
  let off = zoneOffsetMinutes(tz, new Date(naive));
  let utc = new Date(naive - off * 60000);
  // one refinement pin-points the value across a DST boundary
  off = zoneOffsetMinutes(tz, utc);
  utc = new Date(naive - off * 60000);
  return { utc, offsetMinutes: off };
}

export function formatOffset(min: number): string {
  const s = min < 0 ? "−" : "+";
  const a = Math.abs(min);
  return `${s}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}
