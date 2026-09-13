import { ImageResponse } from "next/og";
import {
  D_SEAL_MEDALLION,
  D_MONOGRAM_L,
  SEAL_CX,
  SEAL_CY,
  RING_R,
} from "@/components/Medallion";
import { GIVEAWAY } from "@/data/giveaway.config";

export const runtime = "edge";
export const alt = "Limra Mediterranean Grand Opening Giveaway: win an iPhone 17 Pro Max";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OLIVE = "#2D5B14";
const CREAM = "#FEEBCB";
const TERRACOTTA = "#A44D14";

const EYEBROW = "GRAND OPENING GIVEAWAY";
const HEADLINE = "Win an iPhone 17 Pro Max";
const DATES = `${GIVEAWAY.opensLabelShort} · ${GIVEAWAY.closesLabelLong} · HOLLY SPRINGS, NC`.toUpperCase();
const FOOT = "NO PURCHASE NECESSARY · LIMRA MEDITERRANEAN";
const TEXT = EYEBROW + HEADLINE + DATES + FOOT;

// Same approach as the site's root OG image: Marcellus fetched per render,
// with a graceful fallback to the default face if the fetch fails.
async function loadMarcellus(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Marcellus&text=${encodeURIComponent(TEXT)}`
      )
    ).text();
    const resource = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!resource) return null;
    const res = await fetch(resource[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const marcellus = await loadMarcellus();
  const font = marcellus ? "Marcellus" : undefined;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: CREAM,
          gap: 28,
          fontFamily: font,
        }}
      >
        <svg viewBox="0 0 92 92" width={150} height={150} fill={OLIVE}>
          <circle cx="46" cy="46" r={RING_R} fill="none" stroke={OLIVE} strokeWidth="1" />
          <g transform={`translate(${46 - SEAL_CX} ${46 - SEAL_CY})`}>
            <path fillRule="nonzero" d={D_SEAL_MEDALLION} />
            <path fillRule="nonzero" d={D_MONOGRAM_L} />
          </g>
        </svg>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 9, color: TERRACOTTA }}>
          {EYEBROW}
        </div>
        <div style={{ display: "flex", fontSize: 72, color: OLIVE, letterSpacing: 1 }}>
          {HEADLINE}
        </div>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: OLIVE, opacity: 0.75 }}>
          {DATES}
        </div>
        <div style={{ display: "flex", fontSize: 16, letterSpacing: 5, color: TERRACOTTA, marginTop: 10 }}>
          {FOOT}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: marcellus
        ? [{ name: "Marcellus", data: marcellus, style: "normal" as const }]
        : undefined,
    }
  );
}
