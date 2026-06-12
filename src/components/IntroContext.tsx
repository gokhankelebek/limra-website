"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Medallion from "./Medallion";

/**
 * Cinematic entrance. On a first visit to the home page (per session),
 * the page holds (html.intro-pending, set pre-paint by an inline script
 * in the root layout) while the medallion builds itself alone on a
 * cream field. It then glides into the hero's seal slot (FLIP) as the
 * overlay clears and the page rises. Click anywhere to skip.
 */

type Phase = "off" | "building" | "landing" | "done";

const IntroCtx = createContext<{
  phase: Phase;
  registerTarget: (el: HTMLElement | null) => void;
}>({ phase: "off", registerTarget: () => {} });

export const useIntro = () => useContext(IntroCtx);

const BUILD_MS = 2900; // medallion build + a held breath
const LAND_MS = 900; // glide into the hero slot

export default function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("off");
  const targetRef = useRef<HTMLElement | null>(null);
  const medRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const finishedRef = useRef(false);

  const registerTarget = useCallback((el: HTMLElement | null) => {
    targetRef.current = el;
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem("limra-intro", "1");
    } catch {}
    document.documentElement.classList.remove("intro-pending");
    setPhase("done");
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("intro-pending")) return;
    setPhase("building");

    const landTimer = setTimeout(() => {
      const med = medRef.current;
      const target = targetRef.current;
      const overlay = overlayRef.current;
      if (!med || !target || !overlay) {
        finish();
        return;
      }
      const o = med.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const dx = t.left + t.width / 2 - (o.left + o.width / 2);
      const dy = t.top + t.height / 2 - (o.top + o.height / 2);
      const scale = t.width / o.width;

      med.style.transition = `transform ${LAND_MS - 50}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      med.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      overlay.style.transition = "background-color 0.7s ease";
      overlay.style.backgroundColor = "transparent";

      // the page rises while the seal is still landing
      document.documentElement.classList.remove("intro-pending");
      setPhase("landing");
      setTimeout(finish, LAND_MS);
    }, BUILD_MS);

    return () => clearTimeout(landTimer);
  }, [finish]);

  const overlayActive = phase === "building" || phase === "landing";

  return (
    <IntroCtx.Provider value={{ phase, registerTarget }}>
      {overlayActive && (
        <div
          ref={overlayRef}
          onClick={finish}
          aria-hidden
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
          style={{ pointerEvents: phase === "landing" ? "none" : "auto" }}
        >
          <div ref={medRef} className="h-44 w-44 lg:h-52 lg:w-52">
            <Medallion
              animate
              variant="seal"
              className="h-full w-full text-olive"
            />
          </div>
        </div>
      )}
      {children}
    </IntroCtx.Provider>
  );
}
