import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath, toEnPath } from '@shared/routes';

const SITE_NAME = 'CME';
const BASE_URL = 'https://control-motion.de';
const DEFAULT_OG_IMAGE = 'https://ventspire-cdn.b-cdn.net/cme/oLXUMurRnSFSIHMQ.jpg';

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
  /** English path equivalent for hreflang (e.g., '/en/development'). If omitted, only hreflang="de" + x-default are set. */
  enPath?: string;
}

/**
 * Feste Kennungen fuer die Entitaeten. Damit verweisen Organisation, Standort
 * und Artikel aufeinander, statt dass jede Seite ein eigenes, unverbundenes
 * Unternehmen beschreibt – genau das braucht ein KI-System, um Aussagen
 * derselben Firma zuzuordnen.
 */
const ORG_ID = `${BASE_URL}#organisation`;
const STANDORT_ID = `${BASE_URL}#standort-dortmund`;

/** Wird bundesweit geliefert – die Kunden sitzen nicht nur in NRW. */
const AREA_SERVED = [{ '@type': 'Country', name: 'Deutschland' }];

/** "Über 60 Mitarbeiter" – als Untergrenze, nicht als genaue Zahl. */
const MITARBEITER = { '@type': 'QuantitativeValue', minValue: 60 };

/* ── Organization Schema (global, rendered once on homepage) ── */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'CME Control Motion Electronics GmbH',
  legalName: 'CME Control Motion Electronics GmbH',
  url: BASE_URL,
  logo: 'https://ventspire-cdn.b-cdn.net/cme/CME_rechts_Logo_RGB_433c645f.png',
  description:
    'Entwicklungsdienstleister und EMS-Partner für Leistungselektronik, Antriebselektronik, Mechatronik und thermisch anspruchsvolle Elektronikprojekte.',
  foundingDate: '2008',
  numberOfEmployees: MITARBEITER,
  areaServed: AREA_SERVED,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alter Hellweg 48',
    addressLocality: 'Dortmund',
    postalCode: '44379',
    addressRegion: 'NRW',
    addressCountry: 'DE',
  },
  telephone: '+49 231 28 66 76 96-0',
  email: 'info@control-motion.de',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+49 231 28 66 76 96-0',
    email: 'info@control-motion.de',
    availableLanguage: ['German', 'English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/cme-control-motion-electronics/',
  ],
};

/**
 * LocalBusiness – der Standort Dortmund.
 *
 * Steht auf der Startseite UND auf der Kontaktseite: Letztere ist das Ziel
 * lokaler Suchanfragen, dort fehlte das Signal bisher ganz.
 *
 * priceRange ist entfallen. '$$$$' sagt bei einem Entwicklungsdienstleister
 * nichts aus und schreckt eher ab, als dass es hilft.
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': STANDORT_ID,
  parentOrganization: { '@id': ORG_ID },
  name: 'CME Control Motion Electronics GmbH',
  legalName: 'CME Control Motion Electronics GmbH',
  image: 'https://ventspire-cdn.b-cdn.net/cme/CME_rechts_Logo_RGB_433c645f.png',
  url: BASE_URL,
  telephone: '+49 231 28 66 76 96-0',
  email: 'info@control-motion.de',
  foundingDate: '2008',
  numberOfEmployees: MITARBEITER,
  areaServed: AREA_SERVED,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alter Hellweg 48',
    addressLocality: 'Dortmund',
    postalCode: '44379',
    addressRegion: 'NRW',
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.4918,
    longitude: 7.3726,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
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
  enPath,
}: SEOProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const title = isDE ? titleDE : titleEN;
  const description = isDE ? descriptionDE : descriptionEN;
  const keywords = isDE ? keywordsDE : keywordsEN;
  // Sieben Seiten tragen den Markennamen bereits im Titel. Das Suffix wurde
  // trotzdem angehaengt, im Suchergebnis stand dann "... | CME | CME".
  const endetAufMarke = new RegExp(`\\|\\s*${SITE_NAME}\\b[^|]*$`, 'i').test(title);
  const fullTitle = rawTitle || endetAufMarke ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path === '/' ? '/' : path + '/'}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  // Der englische Pfad kommt aus shared/routes.ts. Die Eigenschaft enPath
  // bleibt als Ausnahme möglich, wird aber nicht mehr gebraucht – so steht die
  // Zuordnung nur noch an einer Stelle.
  const enHref = enPath ?? toEnPath(path);

  const schemas: Record<string, unknown>[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    // Auf englischen Seiten müssen auch die Breadcrumb-URLs englisch sein,
    // sonst zeigen die strukturierten Daten auf die deutsche Fassung.
    schemas.push(
      buildBreadcrumbSchema(
        breadcrumbs.map(item => ({ ...item, url: localizePath(item.url, lang) }))
      )
    );
  }

  if (additionalSchemas) {
    schemas.push(...additionalSchemas);
  }

  return (
    <>
    {/* Strukturierte Daten stehen bewusst NICHT im Helmet.
        Helmet schreibt erst nach dem Hydratisieren ins Dokument – im
        vorgerenderten HTML fehlten die Angaben damit vollstaendig, also genau
        dort, wo Crawler ohne JavaScript sie lesen. Als <script> im Koerper
        sind sie fuer Google gleichwertig und stehen sofort im Quelltext. */}
    {schemas.map((schema, i) => (
      <script
        key={i}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ))}
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {/* meta keywords removed: Google ignores them, Sistrix flags as outdated */}
      {/* canonical removed: Hosting platform injects correct per-route canonical */}
      <meta name="robots" content="index, follow" />
      <html lang={isDE ? 'de' : 'en'} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="de" href={canonicalUrl} />
      {enHref && <link rel="alternate" hrefLang="en" href={`${BASE_URL}${enHref}/`} />}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="CME Control Motion Electronics GmbH" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {/* og:url removed: Hosting platform handles canonical URL */}
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={isDE ? 'de_DE' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

    </Helmet>
    </>
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
