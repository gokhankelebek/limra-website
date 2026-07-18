import { ImageResponse } from "next/og";
import {
  D_SEAL_MEDALLION,
  D_MONOGRAM_L,
  SEAL_CX,
  SEAL_CY,
  RING_R,
} from "@/components/Medallion";
import {
  D_L,
  D_I,
  D_M,
  D_R,
  D_A,
  ORIGIN_X,
  ORIGIN_Y,
} from "@/components/Wordmark";

export const runtime = "edge";
export const alt = "Limra Mediterranean Restaurant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OLIVE = "#2D5B14";
const CREAM = "#FEEBCB";
const TERRACOTTA = "#A44D14";

const TAGLINE_TOP = "MEDITERRANEAN RESTAURANT";
const TAGLINE_BOTTOM = "HOLLY SPRINGS, NC · OPENING SUMMER 2026";
const TAGLINE = TAGLINE_TOP + TAGLINE_BOTTOM;

// Roman caps for the tagline — fetched per render on the edge; if the fetch
// fails the line still renders in the default face rather than 500ing.
async function loadMarcellus(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Marcellus&text=${encodeURIComponent(
          TAGLINE
        )}`
      )
    ).text();
    const resource = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
    );
    if (!resource) return null;
    const res = await fetch(resource[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

// Wordmark and seal built entirely from the official brand vectors.
export default async function OpenGraphImage() {
  const marcellus = await loadMarcellus();
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
          gap: 48,
        }}
      >
        <svg
          viewBox="0 0 92 92"
          width={230}
          height={230}
          fill={OLIVE}
        >
          <circle
            cx="46"
            cy="46"
            r={RING_R}
            fill="none"
            stroke={OLIVE}
            strokeWidth="1"
          />
          <g transform={`translate(${46 - SEAL_CX} ${46 - SEAL_CY})`}>
            <path fillRule="nonzero" d={D_SEAL_MEDALLION} />
            <path fillRule="nonzero" d={D_MONOGRAM_L} />
          </g>
        </svg>
        <svg viewBox="0 0 133.4 46.5" width={500} height={174} fill={OLIVE}>
          <g transform={`translate(${-ORIGIN_X} ${-ORIGIN_Y})`}>
            <path fillRule="nonzero" d={D_L} />
            <path fillRule="nonzero" d={D_I} />
            <path fillRule="nonzero" d={D_M} />
            <path fillRule="nonzero" d={D_R} />
            <path fillRule="nonzero" d={D_A} />
          </g>
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            fontFamily: marcellus ? "Marcellus" : undefined,
            color: TERRACOTTA,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 8 }}>
            {TAGLINE_TOP}
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 6 }}>
            {TAGLINE_BOTTOM}
          </div>
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
