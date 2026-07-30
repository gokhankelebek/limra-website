import { NextResponse } from "next/server";

// The repointable QR endpoint. Print ONE code for https://limramedi.com/go
// and repoint it here whenever you like — the printed sticker never changes.
//
// Change the destination either way:
//   • edit DEFAULT_TARGET below, commit, deploy, or
//   • set QR_GO_TARGET in Vercel (e.g. "/catering") — no code edit needed,
//     though Vercel still redeploys when an env var changes.
//
// For truly no-deploy switching (the owners flipping it from a dashboard),
// move the target into Supabase or Vercel Edge Config — ask and I'll wire it.
//
// ── Change this one line whenever you want ──
const DEFAULT_TARGET = "/"; // "/catering" | "/menu" | "/order"
// ────────────────────────────────────────────

const TARGET = process.env.QR_GO_TARGET || DEFAULT_TARGET;

// Never prerender or cache: the whole point is that it can change.
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  // One log line per scan → rough scan counts in the Vercel logs, so the
  // owners can see whether the table tents or the window decal are working.
  const ua = req.headers.get("user-agent") ?? "";
  const ref = req.headers.get("referer") ?? "";
  console.log(
    `[go] ${new Date().toISOString()} -> ${TARGET} ua="${ua}" ref="${ref}"`
  );

  return NextResponse.redirect(new URL(TARGET, req.url), {
    // 307, never 301 — a permanent redirect gets cached in the scanner's
    // browser and can strand them on the old page for months.
    status: 307,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
