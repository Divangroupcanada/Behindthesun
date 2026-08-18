import { GHAZALS } from "./corpus";
import type { Ghazal } from "./types";

/** Stable 32-bit hash — same input, same output, on server and client alike. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Persian text varies in ways that shouldn't change the draw. */
function foldIntention(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u200c\u200f\u200e]/g, "")
    .replace(/[يى]/g, "ی").replace(/ك/g, "ک")
    .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    // strip punctuation BEFORE collapsing whitespace, or " ؟" leaves a stray space
    .replace(/[.،؛!?؟…"'«»]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export interface Draw { ghazal: Ghazal; shahedBeyt: number; dateKey: string }

/**
 * The draw is deterministic in (intention, day).
 *
 * This is a deliberate choice, not a shortcut. In the traditional practice you
 * make one نیت and take the answer you get — you don't keep drawing until a
 * ghazal flatters you. Seeding on the intention preserves that: re-asking the
 * same question today returns the same ghazal. A genuinely new question, or
 * tomorrow, returns a new one.
 */
export function drawFal(intention: string, now = new Date(), tz = "Asia/Tehran"): Draw {
  const dateKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);

  const seed = hash(`${foldIntention(intention)}|${dateKey}`);
  const ghazal = GHAZALS[seed % GHAZALS.length];
  // The شاهد بیت — the line traditionally read as carrying the answer.
  const shahedBeyt = (seed >>> 8) % ghazal.beyts.length;
  return { ghazal, shahedBeyt, dateKey };
}
