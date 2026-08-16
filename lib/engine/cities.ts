export interface City { fa: string; en: string; lat: number; lon: number; tz: string; c: string }

/** Curated set: Iran in depth, plus the diaspora hubs. No API call, no rate limit. */
export const CITIES: City[] = [
  // ── ایران ──
  { fa:"تهران", en:"Tehran", lat:35.6892, lon:51.3890, tz:"Asia/Tehran", c:"ایران" },
  { fa:"مشهد", en:"Mashhad", lat:36.2605, lon:59.6168, tz:"Asia/Tehran", c:"ایران" },
  { fa:"اصفهان", en:"Isfahan", lat:32.6546, lon:51.6680, tz:"Asia/Tehran", c:"ایران" },
  { fa:"کرج", en:"Karaj", lat:35.8400, lon:50.9391, tz:"Asia/Tehran", c:"ایران" },
  { fa:"شیراز", en:"Shiraz", lat:29.5918, lon:52.5837, tz:"Asia/Tehran", c:"ایران" },
  { fa:"تبریز", en:"Tabriz", lat:38.0800, lon:46.2919, tz:"Asia/Tehran", c:"ایران" },
  { fa:"قم", en:"Qom", lat:34.6416, lon:50.8746, tz:"Asia/Tehran", c:"ایران" },
  { fa:"اهواز", en:"Ahvaz", lat:31.3183, lon:48.6706, tz:"Asia/Tehran", c:"ایران" },
  { fa:"کرمانشاه", en:"Kermanshah", lat:34.3277, lon:47.0778, tz:"Asia/Tehran", c:"ایران" },
  { fa:"ارومیه", en:"Urmia", lat:37.5527, lon:45.0761, tz:"Asia/Tehran", c:"ایران" },
  { fa:"رشت", en:"Rasht", lat:37.2808, lon:49.5832, tz:"Asia/Tehran", c:"ایران" },
  { fa:"زاهدان", en:"Zahedan", lat:29.4963, lon:60.8629, tz:"Asia/Tehran", c:"ایران" },
  { fa:"همدان", en:"Hamadan", lat:34.7992, lon:48.5146, tz:"Asia/Tehran", c:"ایران" },
  { fa:"کرمان", en:"Kerman", lat:30.2839, lon:57.0834, tz:"Asia/Tehran", c:"ایران" },
  { fa:"یزد", en:"Yazd", lat:31.8974, lon:54.3569, tz:"Asia/Tehran", c:"ایران" },
  { fa:"اردبیل", en:"Ardabil", lat:38.2498, lon:48.2933, tz:"Asia/Tehran", c:"ایران" },
  { fa:"بندرعباس", en:"Bandar Abbas", lat:27.1865, lon:56.2808, tz:"Asia/Tehran", c:"ایران" },
  { fa:"اراک", en:"Arak", lat:34.0917, lon:49.6892, tz:"Asia/Tehran", c:"ایران" },
  { fa:"زنجان", en:"Zanjan", lat:36.6736, lon:48.4787, tz:"Asia/Tehran", c:"ایران" },
  { fa:"سنندج", en:"Sanandaj", lat:35.3219, lon:46.9862, tz:"Asia/Tehran", c:"ایران" },
  { fa:"قزوین", en:"Qazvin", lat:36.2688, lon:50.0041, tz:"Asia/Tehran", c:"ایران" },
  { fa:"خرم‌آباد", en:"Khorramabad", lat:33.4878, lon:48.3558, tz:"Asia/Tehran", c:"ایران" },
  { fa:"گرگان", en:"Gorgan", lat:36.8427, lon:54.4360, tz:"Asia/Tehran", c:"ایران" },
  { fa:"ساری", en:"Sari", lat:36.5633, lon:53.0601, tz:"Asia/Tehran", c:"ایران" },
  { fa:"بابل", en:"Babol", lat:36.5513, lon:52.6790, tz:"Asia/Tehran", c:"ایران" },
  { fa:"آمل", en:"Amol", lat:36.4696, lon:52.3507, tz:"Asia/Tehran", c:"ایران" },
  { fa:"کاشان", en:"Kashan", lat:33.9831, lon:51.4364, tz:"Asia/Tehran", c:"ایران" },
  { fa:"دزفول", en:"Dezful", lat:32.3814, lon:48.4058, tz:"Asia/Tehran", c:"ایران" },
  { fa:"نیشابور", en:"Neyshabur", lat:36.2133, lon:58.7958, tz:"Asia/Tehran", c:"ایران" },
  { fa:"سبزوار", en:"Sabzevar", lat:36.2126, lon:57.6819, tz:"Asia/Tehran", c:"ایران" },
  { fa:"بوشهر", en:"Bushehr", lat:28.9234, lon:50.8203, tz:"Asia/Tehran", c:"ایران" },
  { fa:"بجنورد", en:"Bojnurd", lat:37.4747, lon:57.3290, tz:"Asia/Tehran", c:"ایران" },
  { fa:"سمنان", en:"Semnan", lat:35.5729, lon:53.3971, tz:"Asia/Tehran", c:"ایران" },
  { fa:"ایلام", en:"Ilam", lat:33.6374, lon:46.4227, tz:"Asia/Tehran", c:"ایران" },
  { fa:"شاهرود", en:"Shahroud", lat:36.4180, lon:54.9763, tz:"Asia/Tehran", c:"ایران" },
  { fa:"مراغه", en:"Maragheh", lat:37.3925, lon:46.2381, tz:"Asia/Tehran", c:"ایران" },
  { fa:"بیرجند", en:"Birjand", lat:32.8663, lon:59.2211, tz:"Asia/Tehran", c:"ایران" },
  { fa:"یاسوج", en:"Yasuj", lat:30.6682, lon:51.5880, tz:"Asia/Tehran", c:"ایران" },
  { fa:"شهرکرد", en:"Shahrekord", lat:32.3256, lon:50.8644, tz:"Asia/Tehran", c:"ایران" },
  { fa:"خوی", en:"Khoy", lat:38.5503, lon:44.9521, tz:"Asia/Tehran", c:"ایران" },
  { fa:"ابادان", en:"Abadan", lat:30.3392, lon:48.3043, tz:"Asia/Tehran", c:"ایران" },
  { fa:"ملایر", en:"Malayer", lat:34.2969, lon:48.8236, tz:"Asia/Tehran", c:"ایران" },
  { fa:"بروجرد", en:"Borujerd", lat:33.8973, lon:48.7516, tz:"Asia/Tehran", c:"ایران" },
  { fa:"لاهیجان", en:"Lahijan", lat:37.2074, lon:50.0037, tz:"Asia/Tehran", c:"ایران" },
  { fa:"تربت حیدریه", en:"Torbat-e Heydarieh", lat:35.2740, lon:59.2194, tz:"Asia/Tehran", c:"ایران" },

  // ── کانادا ──
  { fa:"تورنتو", en:"Toronto", lat:43.6532, lon:-79.3832, tz:"America/Toronto", c:"کانادا" },
  { fa:"ونکوور", en:"Vancouver", lat:49.2827, lon:-123.1207, tz:"America/Vancouver", c:"کانادا" },
  { fa:"مونترال", en:"Montreal", lat:45.5019, lon:-73.5674, tz:"America/Toronto", c:"کانادا" },
  { fa:"کلگری", en:"Calgary", lat:51.0447, lon:-114.0719, tz:"America/Edmonton", c:"کانادا" },
  { fa:"اتاوا", en:"Ottawa", lat:45.4215, lon:-75.6972, tz:"America/Toronto", c:"کانادا" },
  { fa:"ریچموندهیل", en:"Richmond Hill", lat:43.8828, lon:-79.4403, tz:"America/Toronto", c:"کانادا" },
  { fa:"نورث ونکوور", en:"North Vancouver", lat:49.3200, lon:-123.0724, tz:"America/Vancouver", c:"کانادا" },

  // ── آمریکا ──
  { fa:"لس آنجلس", en:"Los Angeles", lat:34.0522, lon:-118.2437, tz:"America/Los_Angeles", c:"آمریکا" },
  { fa:"اروین", en:"Irvine", lat:33.6846, lon:-117.8265, tz:"America/Los_Angeles", c:"آمریکا" },
  { fa:"سن‌خوزه", en:"San Jose", lat:37.3382, lon:-121.8863, tz:"America/Los_Angeles", c:"آمریکا" },
  { fa:"سن‌دیگو", en:"San Diego", lat:32.7157, lon:-117.1611, tz:"America/Los_Angeles", c:"آمریکا" },
  { fa:"سانفرانسیسکو", en:"San Francisco", lat:37.7749, lon:-122.4194, tz:"America/Los_Angeles", c:"آمریکا" },
  { fa:"نیویورک", en:"New York", lat:40.7128, lon:-74.0060, tz:"America/New_York", c:"آمریکا" },
  { fa:"واشنگتن", en:"Washington DC", lat:38.9072, lon:-77.0369, tz:"America/New_York", c:"آمریکا" },
  { fa:"هیوستون", en:"Houston", lat:29.7604, lon:-95.3698, tz:"America/Chicago", c:"آمریکا" },
  { fa:"دالاس", en:"Dallas", lat:32.7767, lon:-96.7970, tz:"America/Chicago", c:"آمریکا" },
  { fa:"شیکاگو", en:"Chicago", lat:41.8781, lon:-87.6298, tz:"America/Chicago", c:"آمریکا" },
  { fa:"سیاتل", en:"Seattle", lat:47.6062, lon:-122.3321, tz:"America/Los_Angeles", c:"آمریکا" },
  { fa:"آتلانتا", en:"Atlanta", lat:33.7490, lon:-84.3880, tz:"America/New_York", c:"آمریکا" },
  { fa:"بوستون", en:"Boston", lat:42.3601, lon:-71.0589, tz:"America/New_York", c:"آمریکا" },
  { fa:"فینیکس", en:"Phoenix", lat:33.4484, lon:-112.0740, tz:"America/Phoenix", c:"آمریکا" },

  // ── اروپا ──
  { fa:"لندن", en:"London", lat:51.5074, lon:-0.1278, tz:"Europe/London", c:"بریتانیا" },
  { fa:"منچستر", en:"Manchester", lat:53.4808, lon:-2.2426, tz:"Europe/London", c:"بریتانیا" },
  { fa:"استکهلم", en:"Stockholm", lat:59.3293, lon:18.0686, tz:"Europe/Stockholm", c:"سوئد" },
  { fa:"گوتنبرگ", en:"Gothenburg", lat:57.7089, lon:11.9746, tz:"Europe/Stockholm", c:"سوئد" },
  { fa:"مالمو", en:"Malmö", lat:55.6050, lon:13.0038, tz:"Europe/Stockholm", c:"سوئد" },
  { fa:"برلین", en:"Berlin", lat:52.5200, lon:13.4050, tz:"Europe/Berlin", c:"آلمان" },
  { fa:"هامبورگ", en:"Hamburg", lat:53.5511, lon:9.9937, tz:"Europe/Berlin", c:"آلمان" },
  { fa:"کلن", en:"Cologne", lat:50.9375, lon:6.9603, tz:"Europe/Berlin", c:"آلمان" },
  { fa:"فرانکفورت", en:"Frankfurt", lat:50.1109, lon:8.6821, tz:"Europe/Berlin", c:"آلمان" },
  { fa:"مونیخ", en:"Munich", lat:48.1351, lon:11.5820, tz:"Europe/Berlin", c:"آلمان" },
  { fa:"پاریس", en:"Paris", lat:48.8566, lon:2.3522, tz:"Europe/Paris", c:"فرانسه" },
  { fa:"وین", en:"Vienna", lat:48.2082, lon:16.3738, tz:"Europe/Vienna", c:"اتریش" },
  { fa:"آمستردام", en:"Amsterdam", lat:52.3676, lon:4.9041, tz:"Europe/Amsterdam", c:"هلند" },
  { fa:"اسلو", en:"Oslo", lat:59.9139, lon:10.7522, tz:"Europe/Oslo", c:"نروژ" },
  { fa:"کپنهاگ", en:"Copenhagen", lat:55.6761, lon:12.5683, tz:"Europe/Copenhagen", c:"دانمارک" },
  { fa:"زوریخ", en:"Zurich", lat:47.3769, lon:8.5417, tz:"Europe/Zurich", c:"سوئیس" },
  { fa:"رم", en:"Rome", lat:41.9028, lon:12.4964, tz:"Europe/Rome", c:"ایتالیا" },
  { fa:"مادرید", en:"Madrid", lat:40.4168, lon:-3.7038, tz:"Europe/Madrid", c:"اسپانیا" },

  // ── خاورمیانه و آسیا ──
  { fa:"دبی", en:"Dubai", lat:25.2048, lon:55.2708, tz:"Asia/Dubai", c:"امارات" },
  { fa:"استانبول", en:"Istanbul", lat:41.0082, lon:28.9784, tz:"Europe/Istanbul", c:"ترکیه" },
  { fa:"آنکارا", en:"Ankara", lat:39.9334, lon:32.8597, tz:"Europe/Istanbul", c:"ترکیه" },
  { fa:"باکو", en:"Baku", lat:40.4093, lon:49.8671, tz:"Asia/Baku", c:"آذربایجان" },
  { fa:"ایروان", en:"Yerevan", lat:40.1792, lon:44.4991, tz:"Asia/Yerevan", c:"ارمنستان" },
  { fa:"تفلیس", en:"Tbilisi", lat:41.7151, lon:44.8271, tz:"Asia/Tbilisi", c:"گرجستان" },
  { fa:"کابل", en:"Kabul", lat:34.5553, lon:69.2075, tz:"Asia/Kabul", c:"افغانستان" },
  { fa:"هرات", en:"Herat", lat:34.3529, lon:62.2040, tz:"Asia/Kabul", c:"افغانستان" },
  { fa:"دوشنبه", en:"Dushanbe", lat:38.5598, lon:68.7870, tz:"Asia/Dushanbe", c:"تاجیکستان" },
  { fa:"کوالالامپور", en:"Kuala Lumpur", lat:3.1390, lon:101.6869, tz:"Asia/Kuala_Lumpur", c:"مالزی" },

  // ── اقیانوسیه ──
  { fa:"سیدنی", en:"Sydney", lat:-33.8688, lon:151.2093, tz:"Australia/Sydney", c:"استرالیا" },
  { fa:"ملبورن", en:"Melbourne", lat:-37.8136, lon:144.9631, tz:"Australia/Melbourne", c:"استرالیا" },
];

const fold = (s: string) =>
  s.toLowerCase()
   .replace(/[\u200c\u200f\s]/g, "")
   .replace(/[يى]/g, "ی").replace(/ك/g, "ک")
   .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه")
   .replace(/[‌ـ]/g, "");

export function searchCities(q: string, limit = 7): City[] {
  const n = fold(q);
  if (!n) return [];
  const starts: City[] = [], has: City[] = [];
  for (const c of CITIES) {
    const f = fold(c.fa), e = fold(c.en);
    if (f.startsWith(n) || e.startsWith(n)) starts.push(c);
    else if (f.includes(n) || e.includes(n) || fold(c.c).startsWith(n)) has.push(c);
    if (starts.length >= limit) break;
  }
  return [...starts, ...has].slice(0, limit);
}
