"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

// Meta (Facebook/Instagram) Pixel. Standard PageView only; no form data is
// ever sent. The base code fires the first PageView; App Router navigations
// don't reload the page, so later route changes fire their own.
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "928335230352027";

type Fbq = (...args: unknown[]) => void;

const BASE_CODE = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    (window as unknown as { fbq?: Fbq }).fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: BASE_CODE }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
