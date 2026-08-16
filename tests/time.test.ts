import { localToUTC, formatOffset } from "../lib/engine/time";
let fail = 0;
const ok = (c: boolean, m: string) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

// Iran's DST history is discontinuous — these four years bracket three real regime changes.
const cases: [number, number, number, string][] = [
  [1979, 7, 270, "DST era (1977–80)"],
  [1990, 7, 210, "post-revolution suspension (1981–90)"],
  [1995, 7, 270, "DST reinstated (1991–2005)"],
  [2006, 7, 210, "brief suspension (2006–07)"],
  [2015, 7, 270, "DST again (2008–22)"],
  [2026, 7, 210, "abolished for good (2023–)"],
];
for (const [y, mo, expect, label] of cases) {
  const r = localToUTC("Asia/Tehran", y, mo, 1, 12, 0);
  ok(r.offsetMinutes === expect, `Tehran ${y}-0${mo}-01 12:00 => ${formatOffset(expect)} — ${label} (got ${formatOffset(r.offsetMinutes)})`);
}

// Winter is always standard time regardless of era
ok(localToUTC("Asia/Tehran", 1995, 1, 15, 12, 0).offsetMinutes === 210, "Tehran winter 1995 => +03:30");

// Diaspora hubs
ok(localToUTC("America/Toronto", 1995, 7, 1, 12, 0).offsetMinutes === -240, "Toronto July 1995 => −04:00 (EDT)");
ok(localToUTC("America/Toronto", 1995, 1, 15, 12, 0).offsetMinutes === -300, "Toronto Jan 1995 => −05:00 (EST)");
ok(localToUTC("America/Los_Angeles", 1988, 7, 1, 12, 0).offsetMinutes === -420, "Los Angeles July 1988 => −07:00 (PDT)");
ok(localToUTC("Europe/Stockholm", 2001, 7, 1, 12, 0).offsetMinutes === 120, "Stockholm July 2001 => +02:00 (CEST)");

// Round-trip: the UTC instant must map back to the same wall clock
const r = localToUTC("Asia/Tehran", 1995, 7, 1, 12, 0);
ok(r.utc.toISOString() === "1995-07-01T07:30:00.000Z", `round-trip UTC (got ${r.utc.toISOString()})`);

console.log(fail === 0 ? "\nALL TIME TESTS PASSED" : `\n${fail} FAILURES`);
