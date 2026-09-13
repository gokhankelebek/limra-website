import { NextResponse } from "next/server";

// Giveaway short link for the printed QR codes: /g -> /giveaway.
// A route handler rather than a next.config redirect so the response can
// carry X-Robots-Tag: noindex (config `headers()` never attach to redirects),
// and 307 rather than a permanent code so a scanner's browser never caches
// a destination we may want to change. Same pattern as /go.
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return NextResponse.redirect(new URL("/giveaway", req.url), {
    status: 307,
    headers: {
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
