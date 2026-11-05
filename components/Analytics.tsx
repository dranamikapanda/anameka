"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { env } from "@/lib/env";

const KEY = "cookie-consent-v1";
type Choice = "granted" | "denied";

export function openCookieSettings() { window.dispatchEvent(new Event("open-cookie-settings")); }

/** Google Consent Mode v2: defaults to denied; GTM only loads after the visitor opts in. */
export function Analytics() {
  const path = usePathname();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    if (saved === "granted" || saved === "denied") setChoice(saved); else setShow(true);
    const open = () => setShow(true);
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  const decide = (c: Choice) => {
    try { localStorage.setItem(KEY, c); } catch {}
    setChoice(c); setShow(false);
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    function gtag(..._a: unknown[]) { window.dataLayer!.push(arguments); }
    gtag("consent", "update", { analytics_storage: c, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  };

  if (path.startsWith("/admin")) return null;

  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">{`
        window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
        gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
      `}</Script>
      {choice === "granted" && env.gtmId && (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${env.gtmId}');
        `}</Script>
      )}
      {choice === "granted" && !env.gtmId && env.ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${env.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`gtag('js',new Date());gtag('config','${env.ga4Id}');`}</Script>
        </>
      )}
      {show && (
        <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-gold/30 bg-ivory p-5 shadow-soft sm:inset-x-6">
          <p className="text-sm leading-relaxed text-charcoal/85">
            We use essential cookies to run this site. With your permission we also use analytics cookies to understand how the site is used.{" "}
            <a href="/cookie-policy" className="text-plum underline decoration-gold underline-offset-2">Cookie policy</a>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-plum !py-2 text-sm" onClick={() => decide("granted")}>Accept analytics</button>
            <button className="btn-ghost !py-2 text-sm" onClick={() => decide("denied")}>Essential only</button>
          </div>
        </div>
      )}
    </>
  );
}
