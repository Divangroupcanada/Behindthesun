import { NextResponse } from "next/server";
import { SYSTEM, placementPrompt, overviewPrompt } from "@/lib/interpret/prompt";
import { createAdminClient, supabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-sonnet-5";

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key)
    return NextResponse.json({ error: "تفسیر هنوز فعال نیست.", needsKey: true }, { status: 503 });

  let userPrompt: string, cacheKey: string, meta: Record<string, unknown>;
  try {
    const b = await req.json();
    if (b.kind === "overview") {
      if (!b.sun || !b.moon) throw new Error();
      userPrompt = overviewPrompt(b.sun, b.moon, b.asc ?? null);
      cacheKey = `o:${b.sun}:${b.moon}:${b.asc ?? "-"}`;
      meta = { kind: "overview" };
    } else {
      if (!b.bodyFa || !b.signFa) throw new Error();
      userPrompt = placementPrompt(b);
      cacheKey = `p:${b.bodyFa}:${b.signFa}:${b.house ?? "-"}:${b.retrograde ? "R" : "D"}`;
      meta = {
        kind: "placement", body_key: b.bodyFa, sign_fa: b.signFa,
        house: b.house ?? null, retrograde: Boolean(b.retrograde),
      };
    }
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر." }, { status: 400 });
  }

  // Placement text is identical for every user with that placement, so it is
  // cached globally. This is what keeps the model bill flat as traffic grows.
  const db = supabaseConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createAdminClient() : null;

  if (db) {
    const { data } = await db.from("interpretations").select("text").eq("cache_key", cacheKey).maybeSingle();
    if (data?.text) return NextResponse.json({ text: data.text, cached: true });
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
        // This model reasons before answering and that reasoning is billed
        // against the same budget — 900 truncated the output mid-sentence.
        max_tokens: 4000,
        // System prompt is byte-identical on every call, so cache it.
        system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!r.ok) {
      console.error("anthropic", r.status, (await r.text()).slice(0, 400));
      return NextResponse.json({ error: "تفسیر در دسترس نیست." }, { status: 502 });
    }

    const j = await r.json();
    const text = (j.content ?? [])
      .filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n").trim();
    if (!text) return NextResponse.json({ error: "پاسخی دریافت نشد." }, { status: 502 });

    if (db) {
      await db.from("interpretations")
        .upsert({ cache_key: cacheKey, text, model: MODEL, ...meta }, { onConflict: "cache_key" });
    }
    return NextResponse.json({ text, cached: false });
  } catch {
    return NextResponse.json({ error: "ارتباط برقرار نشد." }, { status: 502 });
  }
}
