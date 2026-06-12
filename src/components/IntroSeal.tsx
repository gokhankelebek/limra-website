"use client";

import { useEffect, useRef } from "react";
import Medallion from "./Medallion";
import { useIntro } from "./IntroContext";

/**
 * The hero's seal slot. During the entrance it is an invisible target
 * the overlay medallion lands on; once landed, the built seal shows in
 * place. On return visits (no intro) it builds itself as usual.
 */
export default function IntroSeal({ className }: { className?: string }) {
  const { phase, registerTarget } = useIntro();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerTarget(ref.current);
    return () => registerTarget(null);
  }, [registerTarget]);

  const introActive = phase === "building" || phase === "landing";

  return (
    <div ref={ref} className={className}>
      {introActive ? (
        <Medallion variant="seal" className="h-full w-full opacity-0" />
      ) : (
        <Medallion
          variant="seal"
          animate={phase === "off"}
          className="h-full w-full text-olive"
          title="Limra meander seal"
        />
      )}
    </div>
  );
}
