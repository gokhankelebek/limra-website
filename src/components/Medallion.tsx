import type { CSSProperties } from "react";

type MedallionProps = {
  className?: string;
  /** stroke color — defaults to currentColor so it inherits text color */
  color?: string;
  /** play the draw-in animation */
  animate?: boolean;
  title?: string;
};

/**
 * Limra meander seal — a brand-aligned geometric medallion echoing the
 * circular Greek-key (fret) logo from the Susujeek brand book.
 *
 * NOTE: this is a faithful placeholder built from the brand's motif language
 * (octagonal meander + central monogram). Swap in the official vector logo
 * (LIMRA_seal.svg) from Susujeek once supplied — see /public/brand.
 */
export default function Medallion({
  className,
  color = "currentColor",
  animate = false,
  title = "Limra seal",
}: MedallionProps) {
  // One Greek-key (fret) spoke, pointing up from the center. Rotated 8×45°.
  const spoke =
    "M86 70 L86 40 L114 40 L114 64 L96 64 L96 50 L106 50 L106 58";

  const ringStyle = (len: number, delay: number): CSSProperties =>
    animate
      ? ({ ["--ring-len" as string]: String(len), animationDelay: `${delay}s` })
      : {};

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke={color}
      strokeWidth={3.4}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <title>{title}</title>

      {/* outer ring */}
      <circle
        cx="100"
        cy="100"
        r="94"
        strokeWidth={1.4}
        className={animate ? "seal-ring" : undefined}
        style={ringStyle(591, 0.1)}
      />

      {/* eight radial fret spokes */}
      <g className={animate ? "anim-fade delay-3" : undefined}>
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d={spoke}
            transform={`rotate(${i * 45} 100 100)`}
          />
        ))}
      </g>

      {/* inner ring */}
      <circle
        cx="100"
        cy="100"
        r="34"
        strokeWidth={1.4}
        className={animate ? "seal-ring" : undefined}
        style={ringStyle(214, 0.4)}
      />

      {/* central monogram L */}
      <g
        className={animate ? "anim-fade delay-4" : undefined}
        strokeWidth={3.6}
      >
        <path d="M92 84 L92 116 L110 116" />
      </g>
    </svg>
  );
}
