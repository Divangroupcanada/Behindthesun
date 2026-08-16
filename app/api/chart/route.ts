import { NextResponse } from "next/server";
import { buildChart } from "@/lib/engine/chart";
import { jalaliToGregorian } from "@/lib/astro";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const cal = b.calendar === "shamsi" ? "shamsi" : "miladi";
    const [y, mo, d] =
      cal === "shamsi"
        ? jalaliToGregorian(Number(b.year), Number(b.month), Number(b.day))
        : [Number(b.year), Number(b.month), Number(b.day)];

    if (!y || y < 1800 || y > 2200 || mo < 1 || mo > 12 || d < 1 || d > 31)
      return NextResponse.json({ error: "تاریخ نامعتبر است." }, { status: 400 });
    if (typeof b.lat !== "number" || typeof b.lon !== "number" || !b.tz)
      return NextResponse.json({ error: "محل تولد مشخص نیست." }, { status: 400 });

    const chart = buildChart({
      year: y, month: mo, day: d,
      hour: Number(b.hour) || 0, minute: Number(b.minute) || 0,
      lat: b.lat, lon: b.lon, tz: b.tz,
      timeKnown: Boolean(b.timeKnown),
      system: b.system === "placidus" ? "placidus" : "whole",
    });

    return NextResponse.json({ chart, gregorian: [y, mo, d] });
  } catch {
    return NextResponse.json({ error: "محاسبه انجام نشد." }, { status: 500 });
  }
}
