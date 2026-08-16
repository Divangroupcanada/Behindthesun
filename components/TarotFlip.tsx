"use client";
import { useState } from "react";

const CARDS = [
  { n: "ستاره", g: "✧", r: "امید، الهام، تجدید ایمان پس از دوره‌ای سخت." },
  { n: "ماه",   g: "☾", r: "ابهام، رؤیا، چیزی که هنوز کامل دیده نمی‌شود." },
  { n: "خورشید",g: "☀", r: "روشنی، شادی بی‌پرده، دیده‌شدن آن‌طور که هستی." },
  { n: "چرخ",   g: "◉", r: "چرخش بخت. آنچه ثابت به نظر می‌رسید، در حرکت است." },
];

export default function TarotFlip() {
  const [i, setI] = useState<number | null>(null);
  const card = i === null ? null : CARDS[i];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-7 flex gap-3">
        {CARDS.map((c, idx) => {
          const open = i === idx;
          return (
            <button
              key={c.n}
              onClick={() => setI(open ? null : idx)}
              aria-label={`کارت ${idx + 1}`}
              className={`group relative h-40 w-[6.5rem] rounded-xl transition-all duration-500 [transform-style:preserve-3d] md:h-52 md:w-32 ${
                open ? "[transform:rotateY(180deg)]" : "hover:-translate-y-2"
              }`}
            >
              {/* back */}
              <span className="absolute inset-0 flex items-center justify-center rounded-xl border border-gold/35 bg-gradient-to-br from-velvet to-night [backface-visibility:hidden]">
                <span className="text-2xl text-gold/45">✦</span>
              </span>
              {/* face */}
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-gold/60 bg-gradient-to-br from-midnight to-velvet [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="text-4xl text-pale-gold">{c.g}</span>
                <span className="text-sm font-bold text-cream">{c.n}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="min-h-[3.5rem] max-w-md text-balance text-center text-sm leading-loose text-cream/65">
        {card ? card.r : "یک کارت را انتخاب کن تا برگردد."}
      </p>
    </div>
  );
}
