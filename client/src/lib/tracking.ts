/**
 * Tracking Manager – DSGVO-konform
 *
 * Loads GTM (with GA4), Leadinfo, and Google Ads Conversion
 * ONLY after the user has given consent for the respective category.
 *
 * Uses Google Consent Mode v2 to signal consent state to Google services.
 */

import type { ConsentState } from '@/contexts/ConsentContext';

/* ── Environment Variables ───────────────────────────────────────── */
const GTM_ID = import.meta.env.VITE_GTM_ID || '';
const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';
const LEADINFO_ID = import.meta.env.VITE_LEADINFO_ID || '';
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || '';

/* ── State tracking ──────────────────────────────────────────────── */
let gtmLoaded = false;
let leadinfoLoaded = false;

/* ── Helpers ─────────────────────────────────────────────────────── */
function injectScript(src: string, id?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (id) script.id = id;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

function injectInlineScript(code: string, id?: string) {
  if (id && document.getElementById(id)) return;
  const script = document.createElement('script');
  if (id) script.id = id;
  script.textContent = code;
  document.head.appendChild(script);
}

/* ── Google Consent Mode v2 (default denied) ─────────────────────── */
export function initConsentModeDefaults() {
  // gtag must exist before GTM loads
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;

  // Set default consent to denied for all categories
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',   // necessary cookies
    personalization_storage: 'denied',
    security_storage: 'granted',        // necessary
    wait_for_update: 500,
  });

  // Region-specific: EU requires explicit consent
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: ['EU', 'EEA', 'CH', 'GB'],
  });
}

/* ── Update Consent Mode based on user choice ────────────────────── */
function updateConsentMode(consent: ConsentState) {
  const gtag = (window as any).gtag;
  if (!gtag) return;

  gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  });
}

/* ── Load GTM (includes GA4 + Google Ads via GTM container) ──────── */
async function loadGTM() {
  if (gtmLoaded || !GTM_ID) return;
  gtmLoaded = true;

  // GTM snippet
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  await injectScript(
    `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`,
    'gtm-script'
  );

  // Also load gtag.js for GA4 direct measurement (fallback if GTM doesn't fire GA4)
  if (GA4_ID) {
    await injectScript(
      `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`,
      'ga4-script'
    );
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('js', new Date());
      gtag('config', GA4_ID, {
        anonymize_ip: true,
        send_page_view: true,
      });
    }
  }

  // Google Ads config (if present)
  if (GOOGLE_ADS_ID) {
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('config', GOOGLE_ADS_ID);
    }
  }
}

/* ── Load Leadinfo ───────────────────────────────────────────────── */
function loadLeadinfo() {
  if (leadinfoLoaded || !LEADINFO_ID) return;
  leadinfoLoaded = true;

  const code = `
    (function(l,e,a,d,i,n,f,o){
      if(!l[i]){
        l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];
        l.GlobalLeadinfoNamespace.push(i);
        l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};
        l[i].t=l[i].t||n;
        o=e.createElement(a);f=e.getElementsByTagName(a)[0];
        o.async=1;o.src=d;f.parentNode.insertBefore(o,f);
      }
    })(window,document,"script","https://cdn.leadinfo.net/ping.js","leadinfo","${LEADINFO_ID}");
  `;
  injectInlineScript(code, 'leadinfo-script');
}

/* ── Main: Apply consent and load scripts accordingly ────────────── */
export function applyTracking(consent: ConsentState | null) {
  if (!consent) return;

  // Always update consent mode first
  updateConsentMode(consent);

  // Analytics: load GTM + GA4
  if (consent.analytics) {
    loadGTM();
  }

  // Marketing: load Leadinfo + ensure Google Ads via GTM
  if (consent.marketing) {
    loadLeadinfo();
    // Google Ads is loaded via GTM, but ensure GTM is loaded
    if (!gtmLoaded) {
      loadGTM();
    }
  }
}

/* ── SPA Page View Tracking ──────────────────────────────────────── */
export function trackPageView(url: string) {
  const gtag = (window as any).gtag;
  if (gtag && GA4_ID) {
    gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.origin + url,
    });
  }
}
