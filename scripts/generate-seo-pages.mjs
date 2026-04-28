#!/usr/bin/env node
/**
 * Post-Build SEO Page Generator
 * 
 * Reads the built index.html from dist/public/ and generates per-route copies
 * with route-specific SEO tags injected into the <!--SEO_BLOCK_START-->...<!--SEO_BLOCK_END--> markers.
 * 
 * This ensures that the static hosting platform (Manus) serves
 * route-specific HTML for each URL – no JavaScript execution needed.
 * 
 * Canonical URL strategy: WITHOUT trailing slash (except root /)
 * Consistent with: sitemap.xml, seoHtmlInjector.ts, trailingSlashMiddleware.ts
 * 
 * Run after: vite build
 * Output: dist/public/<route>/index.html for each known route
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const DIST_DIR = join(dirname(new URL(import.meta.url).pathname), '..', 'dist', 'public');
const BASE_URL = 'https://control-motion.de';
const SITE_NAME = 'CME Control Motion Electronics GmbH';
const DEFAULT_OG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_OG_Image.jpg';

// ─── SEO Page Data (duplicated from seoPageData.ts to avoid TS compilation) ───

const SEO_PAGES = {
  '/': {
    title: 'CME Control Motion Electronics GmbH – Elektronikentwicklung & EMS-Fertigung',
    description: 'CME Control Motion Electronics – Ihr Partner für Elektronikentwicklung & EMS-Fertigung in Dortmund. Leistungselektronik, Antriebselektronik, Mechatronik. ISO 9001 zertifiziert.',
    keywords: 'Elektronikentwicklung, EMS-Fertigung, Leistungselektronik, Antriebselektronik, Elektronikfertigung Dortmund, thermisches Management',
    enPath: '/en',
    enTitle: 'CME Control Motion Electronics – Electronics Development & EMS Manufacturing',
    enDescription: 'CME Control Motion Electronics – Your partner for electronics development & EMS manufacturing in Dortmund, Germany. Power electronics, drive electronics, mechatronics. ISO 9001 certified.',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CME Control Motion Electronics GmbH",
      "url": "https://control-motion.de",
      "logo": DEFAULT_OG_IMAGE,
      "description": "Entwicklungsdienstleister und EMS-Partner für Leistungselektronik, Antriebselektronik, Mechatronik und thermisch anspruchsvolle Elektronikprojekte.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Alter Hellweg 48",
        "addressLocality": "Dortmund",
        "postalCode": "44379",
        "addressCountry": "DE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+49-231-28667696-0",
        "contactType": "sales",
        "availableLanguage": ["German", "English"]
      },
      "sameAs": ["https://www.linkedin.com/company/cme-control-motion-electronics/"]
    },
  },
  '/entwicklung': {
    title: 'Elektronikentwicklung Dortmund | CME',
    description: 'Von der Idee zur serienreifen Elektronik: Hardware, Software, E-Motor-Design & Simulation aus einer Hand. CME Elektronikentwicklung Dortmund – Jetzt beraten lassen.',
    keywords: 'Elektronikentwicklung, Hardware-Entwicklung, Software-Entwicklung, Simulation, EMV, E-Motor-Design, Regelungstechnik, V-Modell',
    enPath: '/en/development',
    enTitle: 'Electronics Development Dortmund | CME',
    enDescription: 'From concept to series-ready electronics: hardware, software, e-motor design & simulation from a single source. CME Electronics Development Dortmund.',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Elektronikentwicklung",
      "provider": { "@type": "Organization", "name": "CME Control Motion Electronics GmbH" },
      "description": "Von der Idee zur serienreifen Elektronik: Hardware, Software, E-Motor-Design & Simulation aus einer Hand.",
      "areaServed": "DE",
      "serviceType": "Electronics Development"
    },
  },
  '/entwicklung/hardware-software': {
    title: 'Hardware- & Softwareentwicklung | CME Dortmund',
    description: 'Schaltungsentwicklung, PCB-Layout, Embedded Firmware und FPGA-Design. CME entwickelt Ihre Elektronik von der Spezifikation bis zum serienreifen Prototyp.',
    keywords: 'Hardware-Entwicklung, Softwareentwicklung, PCB-Layout, Embedded Firmware, FPGA, Schaltungsentwicklung, Prototyp',
    enPath: '/en/development/hardware-software',
    enTitle: 'Hardware & Software Development | CME Dortmund',
    enDescription: 'Circuit design, PCB layout, embedded firmware and FPGA design. CME develops your electronics from specification to series-ready prototype.',
  },
  '/entwicklung/simulation': {
    title: 'Simulation & Toolchain | CME Dortmund',
    description: 'Thermische, elektrische und EMV-Simulation mit COMSOL, PLECS, LTspice. CME simuliert Ihre Elektronik vor dem ersten Prototyp.',
    keywords: 'Simulation, thermische Simulation, EMV-Simulation, COMSOL, PLECS, LTspice, Motor-CAD, ANSYS',
    enPath: '/en/development/simulation',
    enTitle: 'Simulation & Toolchain | CME Dortmund',
    enDescription: 'Thermal, electrical and EMC simulation with COMSOL, PLECS, LTspice. CME simulates your electronics before the first prototype.',
  },
  '/entwicklung/test-verifikation': {
    title: 'Test & Verifikation | CME Dortmund',
    description: 'EMV-Prüfung, Umwelttests, Serienvalidierung nach V-Modell. CME validiert Ihre Elektronik für Zulassung und Serienfertigung.',
    keywords: 'Test, Verifikation, EMV-Prüfung, Umwelttest, Serienvalidierung, V-Modell, Zulassung',
    enPath: '/en/development/test-verification',
    enTitle: 'Test & Verification | CME Dortmund',
    enDescription: 'EMC testing, environmental tests, series validation according to V-model. CME validates your electronics for certification and series production.',
  },
  '/entwicklung/ux-interface-engineering': {
    title: 'UX & Interface Engineering | CME Dortmund',
    description: 'Benutzeroberflächen für technische Systeme: HMI-Design, Touchscreen-Interfaces, Embedded GUI. CME gestaltet intuitive Bedienkonzepte.',
    keywords: 'UX Design, Interface Engineering, HMI, Touchscreen, Embedded GUI, Bedienkonzept',
    enPath: '/en/development/ux-interface-engineering',
    enTitle: 'UX & Interface Engineering | CME Dortmund',
    enDescription: 'User interfaces for technical systems: HMI design, touchscreen interfaces, embedded GUI. CME designs intuitive operating concepts.',
  },
  '/entwicklung/software-digitale-systeme': {
    title: 'Software & Digitale Systeme | CME Dortmund',
    description: 'Applikationssoftware, IoT-Anbindung, Cloud-Integration und digitale Zwillinge. CME entwickelt Software für vernetzte Elektronikprodukte.',
    keywords: 'Software Engineering, IoT, Cloud-Integration, digitaler Zwilling, Applikationssoftware, vernetzte Systeme',
    enPath: '/en/development/software-digital-systems',
    enTitle: 'Software & Digital Systems | CME Dortmund',
    enDescription: 'Application software, IoT connectivity, cloud integration and digital twins. CME develops software for connected electronic products.',
  },
  '/entwicklung/e-motor-design': {
    title: 'E-Motor Design | CME Dortmund',
    description: 'Elektromagnetische Auslegung, Motorsteuerung und Antriebselektronik. CME entwickelt E-Motor-Systeme für industrielle Anwendungen.',
    keywords: 'E-Motor Design, Antriebselektronik, Motorsteuerung, elektromagnetische Auslegung, BLDC, PMSM',
    enPath: '/en/development/e-motor-design',
    enTitle: 'E-Motor Design | CME Dortmund',
    enDescription: 'Electromagnetic design, motor control and drive electronics. CME develops e-motor systems for industrial applications.',
  },
  '/entwicklung/control-design': {
    title: 'Control Design & Regelungstechnik | CME Dortmund',
    description: 'Regelungstechnik für Leistungselektronik und Antriebssysteme. CME entwickelt Reglerstrukturen, Zustandsschätzer und modellbasierte Algorithmen.',
    keywords: 'Control Design, Regelungstechnik, Reglerstruktur, Zustandsschätzer, modellbasiert, Leistungselektronik',
    enPath: '/en/development/control-design',
    enTitle: 'Control Design & Control Engineering | CME Dortmund',
    enDescription: 'Control engineering for power electronics and drive systems. CME develops controller structures, state estimators and model-based algorithms.',
  },
  '/entwicklung/validierung-emv': {
    title: 'Validierung & EMV | CME Dortmund',
    description: 'EMV-gerechtes Design, Störfestigkeitsprüfung und Zulassungsbegleitung. CME validiert Ihre Elektronik nach internationalen Normen.',
    keywords: 'EMV, Validierung, Störfestigkeit, Zulassung, CE, EMV-gerechtes Design, Normen',
    enPath: '/en/development/emc-validation',
    enTitle: 'Validation & EMC | CME Dortmund',
    enDescription: 'EMC-compliant design, immunity testing and certification support. CME validates your electronics according to international standards.',
  },
  '/entwicklung/ki-entwicklung': {
    title: 'KI-gestützte Entwicklung | CME Dortmund',
    description: 'KI und Machine Learning für industrielle Elektronik: Predictive Maintenance, Anomalieerkennung, Edge AI. CME integriert KI in Ihre Produkte.',
    keywords: 'KI, Machine Learning, Edge AI, Predictive Maintenance, Anomalieerkennung, industrielle KI',
    enPath: '/en/development/ai-development',
    enTitle: 'AI-Powered Development | CME Dortmund',
    enDescription: 'AI and machine learning for industrial electronics: predictive maintenance, anomaly detection, edge AI. CME integrates AI into your products.',
  },
  '/fertigung': {
    title: 'EMS-Fertigung & Elektronikfertigung Dortmund | CME',
    description: 'SMD- und THT-Bestückung, Prototypen- und Serienfertigung, Baugruppenmontage. CME EMS-Fertigung Dortmund – ISO 9001 zertifiziert.',
    keywords: 'EMS-Fertigung, Elektronikfertigung, SMD-Bestückung, THT-Bestückung, Baugruppenfertigung, Prototypenfertigung, Dortmund',
    enPath: '/en/manufacturing',
    enTitle: 'EMS Manufacturing & Electronics Production Dortmund | CME',
    enDescription: 'SMD and THT assembly, prototype and series production, assembly manufacturing. CME EMS manufacturing Dortmund – ISO 9001 certified.',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "EMS-Fertigung",
      "provider": { "@type": "Organization", "name": "CME Control Motion Electronics GmbH" },
      "description": "SMD- und THT-Bestückung, Prototypen- und Serienfertigung, Baugruppenmontage. ISO 9001 zertifiziert.",
      "areaServed": "DE",
      "serviceType": "Electronics Manufacturing Services"
    },
  },
  '/fertigung/leiterplatten': {
    title: 'Leiterplatten bestücken – SMD & THT | CME Dortmund',
    description: 'Professionelle Leiterplattenbestückung: SMD, THT, Mischbestückung. Vom Prototyp bis zur Großserie. CME Elektronikfertigung Dortmund.',
    keywords: 'Leiterplatten bestücken, SMD-Bestückung, THT-Bestückung, Mischbestückung, Prototyp, Serie',
    enPath: '/en/manufacturing/printed-circuit-boards',
    enTitle: 'PCB Assembly – SMD & THT | CME Dortmund',
    enDescription: 'Professional PCB assembly: SMD, THT, mixed assembly. From prototype to high-volume series. CME electronics manufacturing Dortmund.',
  },
  '/fertigung/baugruppen': {
    title: 'Baugruppen fertigen & Systemmontage | CME Dortmund',
    description: 'Baugruppenmontage, Verguss, Conformal Coating und Systemintegration. CME fertigt komplette elektronische Baugruppen.',
    keywords: 'Baugruppenfertigung, Systemmontage, Verguss, Conformal Coating, Systemintegration, Elektronik',
    enPath: '/en/manufacturing/assemblies',
    enTitle: 'Assembly Manufacturing & System Integration | CME Dortmund',
    enDescription: 'Assembly manufacturing, potting, conformal coating and system integration. CME produces complete electronic assemblies.',
  },
  '/fertigung/qualitaet': {
    title: 'Qualitätsmanagement & Prüftechnik | CME Dortmund',
    description: 'AOI, ICT, Funktionstest und lückenlose Traceability. CME Qualitätssicherung für elektronische Baugruppen – ISO 9001 zertifiziert.',
    keywords: 'Qualitätsmanagement, AOI, ICT, Funktionstest, Traceability, ISO 9001, Prüftechnik',
    enPath: '/en/manufacturing/quality',
    enTitle: 'Quality Management & Testing | CME Dortmund',
    enDescription: 'AOI, ICT, functional testing and full traceability. CME quality assurance for electronic assemblies – ISO 9001 certified.',
  },
  '/lifecycle': {
    title: 'Lifecycle Services & Reparatur | CME Dortmund',
    description: 'Obsoleszenzmanagement, Redesign, Ersatzteilstrategien und Reparaturservice. CME begleitet Ihre Elektronik über den gesamten Lebenszyklus.',
    keywords: 'Lifecycle Services, Reparatur, Obsoleszenzmanagement, Redesign, Ersatzteile, Elektronik-Reparatur',
    enPath: '/en/lifecycle',
    enTitle: 'Lifecycle Services & Repair | CME Dortmund',
    enDescription: 'Obsolescence management, redesign, spare parts strategies and repair service. CME supports your electronics throughout the entire lifecycle.',
  },
  '/maerkte': {
    title: 'Märkte & Anwendungen | CME Dortmund',
    description: 'Elektronikentwicklung und EMS-Fertigung für Automotive, Industrieautomation, Medizintechnik, Gebäudetechnik und Antriebstechnik.',
    keywords: 'Automotive, Industrieautomation, Medizintechnik, Gebäudetechnik, Antriebstechnik, Leistungselektronik',
    enPath: '/en/markets',
    enTitle: 'Markets & Applications | CME Dortmund',
    enDescription: 'Electronics development and EMS manufacturing for automotive, industrial automation, medical technology, building technology and drive technology.',
  },
  '/unternehmen': {
    title: 'Über CME – Elektronikentwicklung & Fertigung Dortmund',
    description: 'Seit 2008 entwickelt und fertigt CME komplexe Elektronik in Dortmund. Über 60 Mitarbeiter, ISO 9001 zertifiziert. Entwicklung und Fertigung unter einem Dach.',
    keywords: 'CME, Unternehmen, Dortmund, Elektronikentwicklung, EMS-Fertigung, ISO 9001, Team',
    enPath: '/en/company',
    enTitle: 'About CME – Electronics Development & Manufacturing Dortmund',
    enDescription: 'Since 2008, CME has been developing and manufacturing complex electronics in Dortmund. Over 60 employees, ISO 9001 certified. Development and manufacturing under one roof.',
  },
  '/kontakt': {
    title: 'Kontakt | CME Control Motion Electronics',
    description: 'Kontaktieren Sie CME für Ihre Elektronikentwicklung oder EMS-Fertigung. Alter Hellweg 48, 44379 Dortmund. Jetzt Anfrage stellen.',
    keywords: 'Kontakt, CME, Dortmund, Anfrage, Elektronikentwicklung, EMS-Fertigung',
    enPath: '/en/contact',
    enTitle: 'Contact | CME Control Motion Electronics',
    enDescription: 'Contact CME for your electronics development or EMS manufacturing. Alter Hellweg 48, 44379 Dortmund, Germany. Submit your inquiry now.',
  },
  '/karriere': {
    title: 'Karriere bei CME | Jobs in der Elektronikentwicklung',
    description: 'Karriere bei CME in Dortmund: Offene Stellen in Elektronikentwicklung, EMS-Fertigung und Projektmanagement. Jetzt bewerben.',
    keywords: 'Karriere, Jobs, Elektronikentwicklung, EMS-Fertigung, Dortmund, Stellenangebote',
    enPath: '/en/careers',
    enTitle: 'Careers at CME | Jobs in Electronics Development',
    enDescription: 'Careers at CME in Dortmund: Open positions in electronics development, EMS manufacturing and project management. Apply now.',
  },
  '/insights': {
    title: 'Insights & Fachwissen | CME Dortmund',
    description: 'Fachartikel, Technologie-Insights und Branchenwissen rund um Elektronikentwicklung, EMS-Fertigung und Leistungselektronik.',
    keywords: 'Insights, Fachartikel, Elektronikentwicklung, EMS-Fertigung, Leistungselektronik, Technologie',
    enPath: '/en/insights',
    enTitle: 'Insights & Expertise | CME Dortmund',
    enDescription: 'Technical articles, technology insights and industry knowledge about electronics development, EMS manufacturing and power electronics.',
  },
  '/impressum': {
    title: 'Impressum | CME Control Motion Electronics GmbH',
    description: 'Impressum der CME Control Motion Electronics GmbH, Alter Hellweg 48, 44379 Dortmund.',
    keywords: 'Impressum, CME, Dortmund',
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung | CME Control Motion Electronics',
    description: 'Datenschutzerklärung der CME Control Motion Electronics GmbH. Informationen zum Umgang mit Ihren personenbezogenen Daten.',
    keywords: 'Datenschutz, DSGVO, personenbezogene Daten, CME',
  },
  '/agb': {
    title: 'AGB | CME Control Motion Electronics GmbH',
    description: 'Allgemeine Geschäftsbedingungen der CME Control Motion Electronics GmbH.',
    keywords: 'AGB, Geschäftsbedingungen, CME',
  },
};

// ─── Helpers ───

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Build canonical URL: WITHOUT trailing slash (except root /)
 * Consistent with sitemap.xml, seoHtmlInjector.ts, trailingSlashMiddleware.ts
 */
function buildCanonicalUrl(path) {
  if (path === '/') return `${BASE_URL}/`;
  return `${BASE_URL}${path}`;
}

/**
 * Build the SEO block for a given route.
 */
function buildSeoBlock({ title, description, keywords, canonicalUrl, deUrl, enUrl, locale, jsonLd }) {
  let hreflangTags = `<link rel="alternate" hreflang="de" href="${deUrl}" />`;
  if (enUrl) {
    hreflangTags += `\n    <link rel="alternate" hreflang="en" href="${enUrl}" />`;
  }
  hreflangTags += `\n    <link rel="alternate" hreflang="x-default" href="${deUrl}" />`;

  let jsonLdTag = '';
  if (jsonLd) {
    jsonLdTag = `\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  }

  return `<!--SEO_BLOCK_START-->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    ${hreflangTags}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="${locale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />${jsonLdTag}
    <!--SEO_BLOCK_END-->`;
}

/**
 * Inject SEO block into the HTML template.
 */
function injectSeoBlock(html, seoBlock, isEnglish) {
  const startMarker = '<!--SEO_BLOCK_START-->';
  const endMarker = '<!--SEO_BLOCK_END-->';
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error('ERROR: SEO_BLOCK markers not found in index.html');
    process.exit(1);
  }

  let result = html.substring(0, startIdx) + seoBlock + html.substring(endIdx + endMarker.length);

  // Set html lang for EN routes
  if (isEnglish) {
    result = result.replace('<html lang="de">', '<html lang="en">');
  }

  return result;
}

/**
 * Write an index.html file for a given route path.
 */
function writeRouteHtml(routePath, html) {
  let targetDir;
  if (routePath === '/') {
    targetDir = DIST_DIR;
  } else {
    // /entwicklung -> dist/public/entwicklung/
    targetDir = join(DIST_DIR, routePath.slice(1));
  }

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = join(targetDir, 'index.html');
  writeFileSync(targetFile, html, 'utf-8');
  return targetFile;
}

// ─── Main ───

console.log('Generating per-route SEO pages...\n');

const templateHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');
let generated = 0;

// Build EN reverse map
const enReverseMap = {};
for (const [dePath, meta] of Object.entries(SEO_PAGES)) {
  if (meta.enPath) {
    enReverseMap[meta.enPath] = dePath;
  }
}

// Generate DE pages
for (const [dePath, meta] of Object.entries(SEO_PAGES)) {
  const canonicalUrl = buildCanonicalUrl(dePath);
  const deUrl = buildCanonicalUrl(dePath);
  const enUrl = meta.enPath ? buildCanonicalUrl(meta.enPath) : '';

  const seoBlock = buildSeoBlock({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    canonicalUrl,
    deUrl,
    enUrl,
    locale: 'de_DE',
    jsonLd: meta.jsonLd || null,
  });

  const html = injectSeoBlock(templateHtml, seoBlock, false);
  const file = writeRouteHtml(dePath, html);
  console.log(`  DE: ${dePath} -> ${file}`);
  generated++;
}

// Generate EN pages
for (const [enPath, dePath] of Object.entries(enReverseMap)) {
  const meta = SEO_PAGES[dePath];
  const enTitle = meta.enTitle || meta.title;
  const enDescription = meta.enDescription || meta.description;
  const canonicalUrl = buildCanonicalUrl(enPath);
  const deUrl = buildCanonicalUrl(dePath);
  const enUrl = buildCanonicalUrl(enPath);

  const seoBlock = buildSeoBlock({
    title: enTitle,
    description: enDescription,
    keywords: meta.keywords,
    canonicalUrl,
    deUrl,
    enUrl,
    locale: 'en_US',
    jsonLd: meta.jsonLd || null,
  });

  const html = injectSeoBlock(templateHtml, seoBlock, true);
  const file = writeRouteHtml(enPath, html);
  console.log(`  EN: ${enPath} -> ${file}`);
  generated++;
}

console.log(`\nGenerated ${generated} route-specific HTML files.`);
