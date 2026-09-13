import { NextResponse } from "next/server";
import { GIVEAWAY } from "@/data/giveaway.config";

// /g/enter -> the entry form. The table tents point here so the form can be
// swapped later without reprinting: change giveaway.config.ts, or set
// NEXT_PUBLIC_GIVEAWAY_FORM_URL in Vercel (a redeploy applies it).
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const target = GIVEAWAY.formUrl;
  return NextResponse.redirect(new URL(target, req.url), {
    status: 307,
    headers: {
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
