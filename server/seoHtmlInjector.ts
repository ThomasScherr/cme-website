/**
 * SEO HTML Injector
 * 
 * Replaces generic SEO placeholder tags in the SPA shell (index.html) with
 * route-specific title, description, hreflang, and OG tags.
 * 
 * This runs BEFORE the HTML is sent to the browser, so the initial HTML
 * already contains correct per-route SEO metadata – no JavaScript needed.
 * 
 * NOTE: Canonical tags are NOT injected here because the Manus hosting platform
 * automatically injects a correct per-route canonical tag. Adding one here would
 * create duplicates (Sistrix: "Mehr als ein Canonical-Tag gefunden").
 * 
 * Strategy: index.html contains marker comments:
 *   <!--SEO_BLOCK_START--> ... <!--SEO_BLOCK_END-->
 * This injector replaces everything between those markers with per-route tags.
 */

import { lookupSeoMeta, BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from './seoPageData';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Build the SEO <head> block for a known route.
 * NOTE: No <link rel="canonical"> – the hosting platform injects it automatically.
 * NOTE: No og:url – React Helmet sets it correctly per route after hydration.
 */
function buildSeoBlock(
  title: string,
  description: string,
  keywords: string,
  deUrl: string,
  enUrl: string,
  locale: string,
): string {
  let hreflangTags = `<link rel="alternate" hreflang="de" href="${deUrl}" />`;
  if (enUrl) {
    hreflangTags += `\n    <link rel="alternate" hreflang="en" href="${enUrl}" />`;
  }
  hreflangTags += `\n    <link rel="alternate" hreflang="x-default" href="${deUrl}" />`;

  return `<!--SEO_BLOCK_START-->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <!-- meta keywords removed: Google ignores them -->
    <!-- canonical: injected by Manus hosting platform -->
    ${hreflangTags}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <!-- og:url: set by React Helmet per route -->
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="${locale}" />
    <!--SEO_BLOCK_END-->`;
}

/**
 * Build the SEO <head> block for a 404 page.
 */
function build404Block(): string {
  const title = 'Seite nicht gefunden | CME Control Motion Electronics';
  const description = 'Die angeforderte Seite wurde nicht gefunden. Besuchen Sie unsere Startseite für Elektronikentwicklung und EMS-Fertigung.';

  return `<!--SEO_BLOCK_START-->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="noindex, follow" />
    <!-- canonical: injected by Manus hosting platform -->
    <!--SEO_BLOCK_END-->`;
}

/**
 * Inject route-specific SEO tags into the SPA shell HTML.
 * 
 * Expects index.html to contain:
 *   <!--SEO_BLOCK_START--> ... <!--SEO_BLOCK_END-->
 * 
 * Everything between those markers is replaced with per-route tags.
 */
export function injectSeoTags(html: string, requestPath: string): string {
  const { meta, isEnglish, dePath } = lookupSeoMeta(requestPath);

  let seoBlock: string;

  if (!meta) {
    // Unknown route – 404 tags
    seoBlock = build404Block();
  } else {
    const title = isEnglish && meta.enTitle ? meta.enTitle : meta.title;
    const description = isEnglish && meta.enDescription ? meta.enDescription : meta.description;
    const locale = isEnglish ? 'en_US' : 'de_DE';
    const deUrl = `${BASE_URL}${dePath === '/' ? '/' : dePath + '/'}`;
    const enUrl = meta.enPath ? `${BASE_URL}${meta.enPath}/` : '';

    seoBlock = buildSeoBlock(title, description, meta.keywords, deUrl, enUrl, locale);
  }

  // Replace the marker block
  const startMarker = '<!--SEO_BLOCK_START-->';
  const endMarker = '<!--SEO_BLOCK_END-->';
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    // Markers not found – cannot inject, return as-is
    console.warn('[SEO Injector] Markers not found in HTML template');
    return html;
  }

  let result = html.substring(0, startIdx) + seoBlock + html.substring(endIdx + endMarker.length);

  // For EN routes, also set <html lang="en">
  if (meta && isEnglish) {
    result = result.replace('<html lang="de">', '<html lang="en">');
  }

  return result;
}
