import { drawFal } from "../lib/hafez/draw";
let fail = 0;
const ok = (c: boolean, m: string) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

const day = new Date("2026-08-18T10:00:00Z");
const next = new Date("2026-08-19T10:00:00Z");

const a = drawFal("آیا این کار را شروع کنم؟", day);
const b = drawFal("آیا این کار را شروع کنم؟", day);
ok(a.ghazal.n === b.ghazal.n && a.shahedBeyt === b.shahedBeyt, "same intention + same day => identical draw");

const c = drawFal("آيا اين كار را شروع كنم؟", day);   // Arabic ي/ك variants
ok(a.ghazal.n === c.ghazal.n, "Arabic letter variants normalise to the same draw");

const d = drawFal("  آیا این کار را   شروع کنم ؟ ", day);
ok(a.ghazal.n === d.ghazal.n, "whitespace and punctuation do not change the draw");

const e = drawFal("آیا این کار را شروع کنم؟", next);
ok(a.ghazal.n !== e.ghazal.n || a.shahedBeyt !== e.shahedBeyt, "next day gives a different draw");

// distribution sanity — no ghazal should dominate
const counts = new Map<number, number>();
for (let i = 0; i < 4000; i++) {
  const r = drawFal(`سوال شماره ${i}`, day);
  counts.set(r.ghazal.n, (counts.get(r.ghazal.n) ?? 0) + 1);
}
const vals = [...counts.values()];
const expected = 4000 / 8;
const worst = Math.max(...vals.map((v) => Math.abs(v - expected) / expected));
ok(counts.size === 8, `all 8 ghazals reachable (got ${counts.size})`);
ok(worst < 0.2, `distribution within 20% of uniform (worst ${(worst * 100).toFixed(1)}%)`);

console.log(fail === 0 ? "\nALL HAFEZ TESTS PASSED" : `\n${fail} FAILURES`);
