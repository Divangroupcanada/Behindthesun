export const SIGNS = [
  { fa: "حمل", en: "Aries", g: "♈", el: "آتش", mode: "کاردینال", ruler: "مریخ" },
  { fa: "ثور", en: "Taurus", g: "♉", el: "خاک", mode: "ثابت", ruler: "زهره" },
  { fa: "جوزا", en: "Gemini", g: "♊", el: "باد", mode: "متغیر", ruler: "عطارد" },
  { fa: "سرطان", en: "Cancer", g: "♋", el: "آب", mode: "کاردینال", ruler: "ماه" },
  { fa: "اسد", en: "Leo", g: "♌", el: "آتش", mode: "ثابت", ruler: "خورشید" },
  { fa: "سنبله", en: "Virgo", g: "♍", el: "خاک", mode: "متغیر", ruler: "عطارد" },
  { fa: "میزان", en: "Libra", g: "♎", el: "باد", mode: "کاردینال", ruler: "زهره" },
  { fa: "عقرب", en: "Scorpio", g: "♏", el: "آب", mode: "ثابت", ruler: "پلوتو" },
  { fa: "قوس", en: "Sagittarius", g: "♐", el: "آتش", mode: "متغیر", ruler: "مشتری" },
  { fa: "جدی", en: "Capricorn", g: "♑", el: "خاک", mode: "کاردینال", ruler: "زحل" },
  { fa: "دلو", en: "Aquarius", g: "♒", el: "باد", mode: "ثابت", ruler: "اورانوس" },
  { fa: "حوت", en: "Pisces", g: "♓", el: "آب", mode: "متغیر", ruler: "نپتون" },
] as const;

export type SignInfo = (typeof SIGNS)[number];

export const norm360 = (d: number) => ((d % 360) + 360) % 360;

export interface Placed {
  lon: number;      // 0–360 ecliptic longitude
  signIndex: number;
  sign: SignInfo;
  deg: number;      // 0–29 within sign
  min: number;      // 0–59
}

export function place(lon: number): Placed {
  const L = norm360(lon);
  const signIndex = Math.floor(L / 30);
  const within = L - signIndex * 30;
  const deg = Math.floor(within);
  const min = Math.round((within - deg) * 60);
  // guard rounding to 60'
  const [d2, m2] = min === 60 ? [deg + 1, 0] : [deg, min];
  return { lon: L, signIndex, sign: SIGNS[signIndex], deg: d2, min: m2 };
}

export const faNum = (s: string | number) =>
  String(s).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

/** "۱۵° حمل ۲۳′" */
export function formatFa(p: Placed): string {
  return `${faNum(p.deg)}° ${p.sign.fa} ${faNum(String(p.min).padStart(2, "0"))}′`;
}
