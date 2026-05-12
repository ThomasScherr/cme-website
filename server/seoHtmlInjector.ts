/**
 * SEO HTML Injector
 * 
 * Replaces generic SEO placeholder tags in the SPA shell (index.html) with
 * route-specific hreflang, OG image, and locale tags.
 * 
 * IMPORTANT: On Manus hosting, the platform serves the root index.html for ALL
 * SPA routes, bypassing the Express server for HTML delivery. Express only handles
 * /api/ routes. This means:
 * 
 * - This injector works LOCALLY (dev server) but NOT in production for HTML pages
 * - The generate-seo-pages.mjs creates per-route HTML files, but the platform ignores them
 * - React Helmet (Layer 2) is the ONLY reliable way to set page-specific SEO tags
 * 
 * Therefore, this injector only sets NON-TEXT tags (hreflang, og:image, locale, etc.)
 * that are the same or similar across pages. All text-based tags (title, description,
 * og:title, og:description, twitter:title, twitter:description) are set exclusively
 * by React Helmet after JS hydration.
 * 
 * Tags handled here (static/structural):
 * - hreflang (de, en, x-default)
 * - og:type, og:image, og:site_name, og:locale
 * - twitter:card, twitter:image
 * - robots noindex for 404 pages
 * - html lang attribute for EN routes
 * 
 * Tags handled by React Helmet (page-specific text):
 * - <title>
 * - <meta name="description">
 * - <meta property="og:title">
 * - <meta property="og:description">
 * - <meta name="twitter:title">
 * - <meta name="twitter:description">
 * - <meta property="og:url">
 * 
 * Tags handled by Manus platform:
 * - <link rel="canonical">
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
 * Only structural/non-text tags – no title, description, or text-based OG/twitter tags.
 */
function buildSeoBlock(
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
    <!-- Text-based SEO tags set by React Helmet after JS hydration -->
    <!-- Canonical injected by Manus hosting platform -->
    ${hreflangTags}
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="${locale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />
    <!--SEO_BLOCK_END-->`;
}

/**
 * Build the SEO <head> block for a 404 page.
 * Only adds robots noindex – title/description set by React Helmet.
 */
function build404Block(): string {
  return `<!--SEO_BLOCK_START-->
    <meta name="robots" content="noindex, follow" />
    <!--SEO_BLOCK_END-->`;
}

/**
 * Inject route-specific SEO tags into the SPA shell HTML.
 * 
 * Expects index.html to contain:
 *   <!--SEO_BLOCK_START--> ... <!--SEO_BLOCK_END-->
 * 
 * Everything between those markers is replaced with per-route structural tags.
 */
export function injectSeoTags(html: string, requestPath: string): string {
  const { meta, isEnglish, dePath } = lookupSeoMeta(requestPath);

  let seoBlock: string;

  if (!meta) {
    // Unknown route – 404 tags
    seoBlock = build404Block();
  } else {
    const locale = isEnglish ? 'en_US' : 'de_DE';
    const deUrl = `${BASE_URL}${dePath === '/' ? '/' : dePath + '/'}`;
    const enUrl = meta.enPath ? `${BASE_URL}${meta.enPath}/` : '';
    seoBlock = buildSeoBlock(deUrl, enUrl, locale);
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
