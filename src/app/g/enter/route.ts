import { NextResponse } from "next/server";

// /g/enter -> the entry form. The table tents point here so the form can be
// swapped later without reprinting: set NEXT_PUBLIC_GIVEAWAY_FORM_URL in
// Vercel (a redeploy applies it). Until it exists, guests land on the
// how-to-enter section instead of a dead link.
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const target =
    process.env.NEXT_PUBLIC_GIVEAWAY_FORM_URL || "/giveaway#how-to-enter";
  return NextResponse.redirect(new URL(target, req.url), {
    status: 307,
    headers: {
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
