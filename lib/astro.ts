/* ── Jalali (Shamsi) → Gregorian ───────────────────── */
const div = (a: number, b: number) => ~~(a / b);

export function jalaliToGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  jy += 1595;
  let days =
    -355668 + 365 * jy + div(jy, 33) * 8 + div((jy % 33) + 3, 4) + jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  let gy = 400 * div(days, 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * div(--days, 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * div(days, 1461);
  days %= 1461;
  if (days > 365) {
    gy += div(days - 1, 365);
    days = (days - 1) % 365;
  }
  let gd = days + 1;
  const leap = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
  const ml = [0, 31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gm = 0;
  for (gm = 0; gm < 13 && gd > ml[gm]; gm++) gd -= ml[gm];
  return [gy, gm, gd];
}

/* ── Sun sign ──────────────────────────────────────── */
export type Sign = {
  fa: string; en: string; glyph: string;
  element: string; ruler: string; blurb: string;
};

const SIGNS: (Sign & { from: [number, number] })[] = [
  { from: [1, 20],  fa: "دلو",   en: "Aquarius",   glyph: "♒", element: "باد",  ruler: "اورانوس", blurb: "مستقل، آینده‌نگر و کمی خارج از قاعده. جمع را دوست دارد اما در آن حل نمی‌شود." },
  { from: [2, 19],  fa: "حوت",   en: "Pisces",     glyph: "♓", element: "آب",   ruler: "نپتون",   blurb: "مرزهایش نرم است. حس می‌کند پیش از آنکه بفهمد، و همین هم قدرت اوست هم زخمش." },
  { from: [3, 21],  fa: "حمل",   en: "Aries",      glyph: "♈", element: "آتش",  ruler: "مریخ",    blurb: "اول حرکت می‌کند، بعد فکر می‌کند. شروع‌کننده‌ی مادرزاد، صبور در ادامه دادن نه." },
  { from: [4, 20],  fa: "ثور",   en: "Taurus",     glyph: "♉", element: "خاک",  ruler: "زهره",    blurb: "دیر تکان می‌خورد، اما وقتی جا افتاد، ریشه می‌دواند. لذت را جدی می‌گیرد." },
  { from: [5, 21],  fa: "جوزا",  en: "Gemini",     glyph: "♊", element: "باد",  ruler: "عطارد",   blurb: "ذهنش همیشه دو جا هست. کنجکاوی‌اش بی‌پایان است، حوصله‌اش نه." },
  { from: [6, 21],  fa: "سرطان", en: "Cancer",     glyph: "♋", element: "آب",   ruler: "ماه",     blurb: "حافظه‌ی عاطفی قوی. مراقب دیگران است، اما دیر اجازه می‌دهد مراقبش باشند." },
  { from: [7, 23],  fa: "اسد",   en: "Leo",        glyph: "♌", element: "آتش",  ruler: "خورشید",  blurb: "دیده‌شدن برایش غذاست، نه غرور. وقتی می‌درخشد، دیگران را هم گرم می‌کند." },
  { from: [8, 23],  fa: "سنبله", en: "Virgo",      glyph: "♍", element: "خاک",  ruler: "عطارد",   blurb: "جزئیات را می‌بیند که بقیه رد می‌شوند. سخت‌گیرترین منتقدش، خودش است." },
  { from: [9, 23],  fa: "میزان", en: "Libra",      glyph: "♎", element: "باد",  ruler: "زهره",    blurb: "دنبال تعادل است — گاهی تا حدی که تصمیم گرفتن سخت می‌شود. زیبایی برایش اخلاق است." },
  { from: [10, 23], fa: "عقرب",  en: "Scorpio",    glyph: "♏", element: "آب",   ruler: "پلوتو",   blurb: "سطح را قبول ندارد. یا تا ته می‌رود یا اصلاً وارد نمی‌شود." },
  { from: [11, 22], fa: "قوس",   en: "Sagittarius",glyph: "♐", element: "آتش",  ruler: "مشتری",   blurb: "معنا را در حرکت پیدا می‌کند. راستگوییِ بی‌ملاحظه، مهربانیِ بی‌ادعا." },
  { from: [12, 22], fa: "جدی",   en: "Capricorn",  glyph: "♑", element: "خاک",  ruler: "زحل",     blurb: "بلندمدت فکر می‌کند. زود پیر می‌شود و دیر جوان — معمولاً به همین ترتیب." },
];

export function sunSign(month: number, day: number): Sign {
  let found = SIGNS[SIGNS.length - 1]; // جدی wraps the year
  for (const s of SIGNS) {
    const [m, d] = s.from;
    if (month > m || (month === m && day >= d)) found = s;
  }
  if (month === 1 && day < 20) found = SIGNS[SIGNS.length - 1];
  const { from, ...rest } = found;
  return rest;
}

/** True when the date sits within ~1 day of a cusp — we say so instead of guessing. */
export function nearCusp(month: number, day: number): boolean {
  return SIGNS.some((s) => s.from[0] === month && Math.abs(day - s.from[1]) <= 1);
}

export const faNum = (s: string | number) =>
  String(s).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
