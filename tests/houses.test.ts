import { computeHouses, midheaven, ascendant } from "../lib/engine/houses";
import { norm360 } from "../lib/engine/zodiac";

const eps = 23.4392911;
let fail = 0;
const ok = (c: boolean, m: string) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };

// 1. Equator, RAMC=0 -> MC 0° Aries, ASC 0° Cancer (classic textbook case)
ok(Math.abs(midheaven(0, eps) - 0) < 1e-6, `equator MC=0  (got ${midheaven(0,eps).toFixed(4)})`);
ok(Math.abs(ascendant(0, eps, 0) - 90) < 1e-6, `equator ASC=90 (got ${ascendant(0,eps,0).toFixed(4)})`);

// 2. London 51.5°N, RAMC=0 -> ASC ≈ 26.6° Cancer (116.6°), published tables agree
const aL = ascendant(0, eps, 51.5);
ok(Math.abs(aL - 116.57) < 0.2, `London ASC≈116.57 (got ${aL.toFixed(3)})`);

// 3. Placidus structural checks across many latitudes / sidereal times
let ordFail = 0, oppFail = 0;
for (const lat of [-55,-40,-20,0,15,30,35.7,45,51.5,60,64]) {
  for (let ramc = 0; ramc < 360; ramc += 7) {
    const h = computeHouses(ramc, eps, lat, "placidus");
    if (h.fellBack) continue;
    // cusps must advance monotonically in zodiacal order
    let acc = 0;
    for (let i = 0; i < 12; i++) {
      const step = norm360(h.cusps[(i+1)%12] - h.cusps[i]);
      if (step < 0.01 || step > 180) ordFail++;
      acc += step;
    }
    if (Math.abs(acc - 360) > 0.01) ordFail++;
    // opposite cusps exactly 180° apart
    for (let i = 0; i < 6; i++) {
      const d = norm360(h.cusps[i+6] - h.cusps[i]);
      if (Math.abs(d - 180) > 1e-6) oppFail++;
    }
    // cusp1 === ASC, cusp10 === MC
    if (Math.abs(norm360(h.cusps[0]-h.asc)) > 1e-9) ordFail++;
    if (Math.abs(norm360(h.cusps[9]-h.mc)) > 1e-9) ordFail++;
  }
}
ok(ordFail === 0, `Placidus cusp ordering across 11 lats x 52 RAMCs (${ordFail} violations)`);
ok(oppFail === 0, `Placidus opposite cusps 180° apart (${oppFail} violations)`);

// 4. Polar fallback
const polar = computeHouses(45, eps, 70, "placidus");
ok(polar.system === "whole" && polar.fellBack, "polar latitude falls back to Whole Sign");

// 5. Whole sign: house 1 always starts at the ASC's sign boundary
const w = computeHouses(123, eps, 35.7, "whole");
ok(w.cusps[0] % 30 === 0 && Math.floor(w.asc/30) === w.cusps[0]/30, "whole-sign cusp 1 = ASC sign start");

console.log(fail === 0 ? "\nALL HOUSE TESTS PASSED" : `\n${fail} FAILURES`);
