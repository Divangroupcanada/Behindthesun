import { NextResponse } from "next/server";
import { SYSTEM, placementPrompt, overviewPrompt } from "@/lib/interpret/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-sonnet-5";

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key)
    return NextResponse.json(
      { error: "تفسیر هنوز فعال نیست.", needsKey: true },
      { status: 503 }
    );

  let userPrompt: string;
  try {
    const b = await req.json();
    if (b.kind === "overview") {
      if (!b.sun || !b.moon) throw new Error();
      userPrompt = overviewPrompt(b.sun, b.moon, b.asc ?? null);
    } else {
      if (!b.bodyFa || !b.signFa) throw new Error();
      userPrompt = placementPrompt(b);
    }
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر." }, { status: 400 });
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 900,
        temperature: 0.7,
        system: SYSTEM,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("anthropic error", r.status, detail.slice(0, 400));
      return NextResponse.json({ error: "تفسیر در دسترس نیست." }, { status: 502 });
    }

    const j = await r.json();
    const text = (j.content ?? [])
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.text)
      .join("\n")
      .trim();

    if (!text) return NextResponse.json({ error: "پاسخی دریافت نشد." }, { status: 502 });
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "ارتباط برقرار نشد." }, { status: 502 });
  }
}
