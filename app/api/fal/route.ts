import { NextResponse } from "next/server";
import { drawFal } from "@/lib/hafez/draw";
import { HAFEZ_SYSTEM, falPrompt } from "@/lib/hafez/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let intention = "";
  try {
    const b = await req.json();
    intention = String(b.intention ?? "").trim();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر." }, { status: 400 });
  }
  if (intention.length < 3 || intention.length > 400)
    return NextResponse.json({ error: "نیتت را کمی روشن‌تر بنویس." }, { status: 400 });

  const draw = drawFal(intention);
  const beyt = draw.ghazal.beyts[draw.shahedBeyt];

  // The ghazal is the product. Interpretation is a bonus that may be absent.
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ draw, tabir: null, tabirUnavailable: true });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 4000,
        system: [{ type: "text", text: HAFEZ_SYSTEM, cache_control: { type: "ephemeral" } }],
        messages: [{ role: "user", content: falPrompt(intention, beyt, draw.ghazal.themes) }],
      }),
    });
    if (!r.ok) {
      console.error("anthropic fal", r.status, (await r.text()).slice(0, 300));
      return NextResponse.json({ draw, tabir: null, tabirUnavailable: true });
    }
    const j = await r.json();
    const tabir = (j.content ?? []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n").trim();
    return NextResponse.json({ draw, tabir: tabir || null, tabirUnavailable: !tabir });
  } catch {
    return NextResponse.json({ draw, tabir: null, tabirUnavailable: true });
  }
}
