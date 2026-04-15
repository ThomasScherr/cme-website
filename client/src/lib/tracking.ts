/**
 * Tracking Manager – DSGVO-konform
 *
 * Loads GTM (with GA4), Leadinfo, Google Ads Conversion, and Crisp Chat
 * ONLY after the user has given consent for the respective category.
 *
 * Crisp Chat has its own "chat" consent category, separate from marketing.
 *
 * Uses Google Consent Mode v2 to signal consent state to Google services.
 */

import type { ConsentState } from '@/contexts/ConsentContext';

/* ── Environment Variables ───────────────────────────────────────── */
const GTM_ID = import.meta.env.VITE_GTM_ID || '';
const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';
const LEADINFO_ID = import.meta.env.VITE_LEADINFO_ID || '';
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || '';
const CRISP_WEBSITE_ID = '86cfa046-63d8-486e-86d7-194e94ab1e7c';

/* ── State tracking ──────────────────────────────────────────────── */
let gtmLoaded = false;
let leadinfoLoaded = false;
let crispLoaded = false;

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

/* ── Load Crisp Chat (only after chat consent) ─────────────────── */
function loadCrisp() {
  if (crispLoaded || !CRISP_WEBSITE_ID) return;
  crispLoaded = true;

  (window as any).$crisp = [];
  (window as any).CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

  const script = document.createElement('script');
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  script.id = 'crisp-script';
  document.head.appendChild(script);
}

/* ── Remove Crisp when consent is revoked ────────────────────────── */
function removeCrisp() {
  // Remove Crisp script
  const crispScript = document.getElementById('crisp-script');
  if (crispScript) crispScript.remove();

  // Remove Crisp widget from DOM
  const crispWidget = document.getElementById('crisp-chatbox');
  if (crispWidget) crispWidget.remove();
  const crispClient = document.querySelector('[data-crisp-namespace]');
  if (crispClient) crispClient.remove();

  // Clean up Crisp cookies
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith('crisp-client')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }

  // Clean up global Crisp objects
  delete (window as any).$crisp;
  delete (window as any).CRISP_WEBSITE_ID;

  crispLoaded = false;
}

/* ── Main: Apply consent and load scripts accordingly ────────────── */
export function applyTracking(consent: ConsentState | null) {
  if (!consent) {
    // Consent revoked – remove non-essential scripts
    removeCrisp();
    return;
  }

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

  // Chat: load Crisp (separate consent category)
  if (consent.chat) {
    loadCrisp();
  } else {
    removeCrisp();
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
