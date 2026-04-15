import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

const SITE_NAME = 'CME Control Motion Electronics GmbH';
const BASE_URL = 'https://www.control-motion.de';
const DEFAULT_OG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_OG_Image.jpg';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  titleDE: string;
  titleEN: string;
  descriptionDE: string;
  descriptionEN: string;
  path: string;
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Additional JSON-LD schemas (e.g., FAQPage) */
  additionalSchemas?: Record<string, unknown>[];
  /** Override: don't append site name to title */
  rawTitle?: boolean;
  /** Meta keywords (comma-separated) */
  keywordsDE?: string;
  keywordsEN?: string;
}

/* ── Organization Schema (global, rendered once on homepage) ── */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CME Control Motion Electronics GmbH',
  url: BASE_URL,
  logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB.png',
  description:
    'Entwicklungsdienstleister und EMS-Partner für Leistungselektronik, Antriebselektronik, Mechatronik und thermisch anspruchsvolle Elektronikprojekte.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Brennaborstraße 32',
    addressLocality: 'Dortmund',
    postalCode: '44149',
    addressCountry: 'DE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@control-motion.de',
    availableLanguage: ['German', 'English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/cme-control-motion-electronics/',
  ],
};

/* ── WebSite Schema (global, rendered once on homepage) ── */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: BASE_URL,
  inLanguage: ['de', 'en'],
};

/* ── BreadcrumbList helper ── */
function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export default function SEO({
  titleDE,
  titleEN,
  descriptionDE,
  descriptionEN,
  path,
  ogImage,
  breadcrumbs,
  additionalSchemas,
  rawTitle,
  keywordsDE,
  keywordsEN,
}: SEOProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const title = isDE ? titleDE : titleEN;
  const description = isDE ? descriptionDE : descriptionEN;
  const keywords = isDE ? keywordsDE : keywordsEN;
  const fullTitle = rawTitle ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  const schemas: Record<string, unknown>[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(buildBreadcrumbSchema(breadcrumbs));
  }

  if (additionalSchemas) {
    schemas.push(...additionalSchemas);
  }

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <html lang={isDE ? 'de' : 'en'} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={isDE ? 'de_DE' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

/* ── FAQPage Schema helper ── */
export interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/* ── Service Schema helper ── */
export function buildServiceSchema(services: { name: string; description: string; url?: string }[]) {
  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'CME Control Motion Electronics GmbH',
      url: BASE_URL,
    },
    ...(service.url ? { url: `${BASE_URL}${service.url}` } : {}),
  }));
}

export { SITE_NAME, BASE_URL, DEFAULT_OG_IMAGE, buildBreadcrumbSchema };
export type { SEOProps, BreadcrumbItem };
