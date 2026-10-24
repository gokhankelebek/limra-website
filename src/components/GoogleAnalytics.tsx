import Script from "next/script";

// Google Analytics 4 (account "Limra Mediterranean", property 560646427).
// Page views: the config call sends the first one, and GA4's enhanced
// measurement records App Router navigations (browser history changes), so no
// per-route effect is needed. No form data is ever sent.
//
// One delegated listener counts the clicks that turn a visit into a meal:
// calling, directions and online ordering (Toast). It never intercepts
// navigation and covers links rendered after hydration.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-FFW895F2CY";

const CODE = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');
document.addEventListener('click',function(e){if(!(e.target instanceof Element))return;var a=e.target.closest('a[href]');if(!a)return;var u=new URL(a.href,location.href);
if(u.protocol==='tel:')gtag('event','click_to_call',{link_url:a.href});
else if(u.hostname==='order.toasttab.com'||u.pathname==='/order')gtag('event','order_online_click',{platform:'toast',link_url:a.href});
else if(u.hostname==='maps.google.com'||((u.hostname==='www.google.com'||u.hostname==='google.com')&&u.pathname.indexOf('/maps')===0))gtag('event','get_directions',{link_url:a.href});
},{capture:true,passive:true});`;

export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: CODE }} />
    </>
  );
}
