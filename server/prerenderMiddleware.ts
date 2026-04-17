/**
 * Pre-Rendering Middleware for SEO Crawlers
 * 
 * Detects crawler User-Agents and injects meta tags, H1, structured data,
 * and content snippets directly into the HTML before serving.
 * This allows crawlers (Sistrix, Google, Bing, ChatGPT, Perplexity) to see
 * full page content without executing JavaScript.
 */

const BASE_URL = 'https://control-motion.de';
const SITE_NAME = 'CME Control Motion Electronics GmbH';
const DEFAULT_OG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_OG_Image.jpg';

// ── Crawler detection ──
const CRAWLER_USER_AGENTS = [
  // Search engines
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'baiduspider', 'slurp',
  // SEO tools
  'sistrix', 'semrush', 'ahrefs', 'mj12bot', 'dotbot', 'rogerbot', 'screaming frog',
  // AI / LLM crawlers
  'gptbot', 'chatgpt-user', 'claudebot', 'claude-web', 'perplexitybot',
  'google-extended', 'facebookbot', 'applebot', 'applebot-extended', 'cohere-ai', 'ccbot',
  // Social media
  'twitterbot', 'linkedinbot', 'facebot', 'whatsapp', 'telegrambot', 'slackbot',
  // Generic
  'bot', 'crawler', 'spider', 'scraper',
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(bot => ua.includes(bot));
}

// ── Page data definitions ──
interface PageMeta {
  title: string;
  description: string;
  h1: string;
  keywords: string;
  content: string; // visible content snippet for crawlers
  breadcrumbs?: { name: string; url: string }[];
  schemas?: Record<string, unknown>[];
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: BASE_URL,
  logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB.png',
  description: 'Entwicklungsdienstleister und EMS-Partner für Leistungselektronik, Antriebselektronik, Mechatronik und thermisch anspruchsvolle Elektronikprojekte.',
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
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: BASE_URL,
  inLanguage: ['de', 'en'],
};

// ── Page definitions for all public routes ──
const PAGES: Record<string, PageMeta> = {
  '/': {
    title: 'CME – Elektronikentwicklung & EMS-Fertigung',
    description: 'CME Control Motion Electronics – Ihr Partner für Elektronikentwicklung und EMS-Fertigung. Leistungselektronik, Antriebstechnik, Mechatronik und thermisch anspruchsvolle Projekte.',
    h1: 'Elektronikentwicklung & EMS-Fertigung aus einer Hand',
    keywords: 'Elektronikentwicklung, EMS-Fertigung, Leistungselektronik, Antriebselektronik, Mechatronik, Elektronikfertigung, SMD-Bestückung, Prototypen, Serienfertigung, CME',
    content: `CME Control Motion Electronics GmbH ist Ihr Entwicklungsdienstleister und EMS-Fertigungspartner für elektronische Produkte. 
    Wir sind spezialisiert auf Leistungselektronik, Antriebselektronik, Mechatronik und thermisch anspruchsvolle Elektronikprojekte.
    Über 60 Mitarbeiter, zertifiziert nach ISO 9001 und IATF 16949. Vom Prototyp bis zur Serie – alles aus einer Hand.
    Unsere Kernkompetenzen: Hardware- und Softwareentwicklung, E-Motor-Design, Simulation, EMV-Validierung, SMD-Bestückung, Baugruppenfertigung, Qualitätssicherung.
    Zielmärkte: Automotive, E-Mobilität, Industrieautomation, Medizintechnik, Energietechnik, Luft- und Raumfahrt.`,
    schemas: [organizationSchema, websiteSchema],
  },
  '/entwicklung': {
    title: 'Entwicklung – Elektronikentwicklung & Engineering | CME',
    description: 'Elektronikentwicklung von CME: Hardware, Software, Simulation, EMV, E-Motor-Design, Regelungstechnik. V-Modell-basierter Entwicklungsprozess.',
    h1: 'Entwicklung – Engineering Services',
    keywords: 'Elektronikentwicklung, Hardware-Entwicklung, Software-Entwicklung, Simulation, EMV, E-Motor-Design, Regelungstechnik, V-Modell',
    content: `CME bietet umfassende Entwicklungsdienstleistungen für elektronische Systeme.
    Hardware- und Softwareentwicklung, Leistungselektronik, Antriebselektronik, E-Motor-Design, Simulation und thermisches Management.
    Regelungstechnik (Control Design), EMV-gerechtes Design, Test und Verifikation nach V-Modell.
    UX & Interface Engineering, Software für digitale Systeme, KI-Entwicklung für industrielle Anwendungen.`,
  },
  '/entwicklung/hardware-software': {
    title: 'Hardware- & Softwareentwicklung | CME',
    description: 'Hardware- und Softwareentwicklung für elektronische Steuerungen. Schaltungsentwicklung, Embedded Software, FPGA-Design.',
    h1: 'Hardware- & Softwareentwicklung',
    keywords: 'Hardware-Entwicklung, Softwareentwicklung, Schaltungsentwicklung, Embedded Software, FPGA, Steuerungsentwicklung, Leiterplattendesign',
    content: `Professionelle Hardware- und Softwareentwicklung für elektronische Steuerungen und Systeme.
    Schaltungsentwicklung, Leiterplattendesign, Embedded Software, FPGA-Design, Firmware-Entwicklung.`,
  },
  '/entwicklung/simulation': {
    title: 'Simulation & Thermisches Management | CME',
    description: 'Simulation und thermisches Management für Elektronik. FEM, CFD, thermische Analyse, Leistungselektronik-Simulation.',
    h1: 'Simulation & Thermisches Management',
    keywords: 'Simulation, thermisches Management, FEM, CFD, thermische Analyse, Leistungselektronik-Simulation',
    content: `Simulation und thermisches Management für anspruchsvolle Elektronikprojekte.
    FEM-Analyse, CFD-Simulation, thermische Analyse, Leistungselektronik-Simulation.`,
  },
  '/entwicklung/test-verifikation': {
    title: 'Test & Verifikation | CME',
    description: 'Test und Verifikation nach V-Modell. Testautomatisierung, HIL-Tests, Umweltsimulation, Zuverlässigkeitstests.',
    h1: 'Test & Verifikation',
    keywords: 'Test, Verifikation, V-Modell, Testautomatisierung, HIL-Test, Umweltsimulation, Zuverlässigkeitstest',
    content: `Test und Verifikation nach V-Modell für elektronische Systeme.
    Testautomatisierung, Hardware-in-the-Loop (HIL), Umweltsimulation, Zuverlässigkeitstests.`,
  },
  '/entwicklung/ux-interface-engineering': {
    title: 'UX & Interface Engineering | CME',
    description: 'UX-Design und Interface Engineering für Bediengeräte und industrielle HMI-Systeme.',
    h1: 'UX & Interface Engineering',
    keywords: 'UX-Design, Interface Engineering, HMI, Bediengeräte, User Experience, Industriedesign',
    content: `UX-Design und Interface Engineering für Bediengeräte, HMI-Systeme und industrielle Anwendungen.`,
  },
  '/entwicklung/software-digitale-systeme': {
    title: 'Software für Digitale Systeme | CME',
    description: 'Softwareentwicklung für digitale Systeme, Embedded Systems, IoT und Cloud-Anbindung.',
    h1: 'Software für Digitale Systeme',
    keywords: 'Softwareentwicklung, digitale Systeme, Embedded Systems, IoT, Cloud, Webapplikationen',
    content: `Softwareentwicklung für digitale Systeme, Embedded Systems, IoT-Lösungen und Cloud-Anbindung.`,
  },
  '/entwicklung/e-motor-design': {
    title: 'E-Motor-Design | CME',
    description: 'E-Motor-Design und Antriebselektronik. Motorauslegung, Inverter-Design, Regelungstechnik für elektrische Antriebe.',
    h1: 'E-Motor-Design',
    keywords: 'E-Motor-Design, Antriebselektronik, Motorauslegung, Inverter, Regelungstechnik, elektrische Antriebe',
    content: `E-Motor-Design und Antriebselektronik: Motorauslegung, Inverter-Design, Regelungstechnik für elektrische Antriebe.`,
  },
  '/entwicklung/control-design': {
    title: 'Control Design – Regelungstechnik | CME',
    description: 'Regelungstechnik und Control Design für Antriebe und Leistungselektronik. Modellbasierte Entwicklung.',
    h1: 'Control Design – Regelungstechnik',
    keywords: 'Control Design, Regelungstechnik, modellbasierte Entwicklung, Antriebsregelung, Leistungselektronik',
    content: `Regelungstechnik und Control Design für Antriebe und Leistungselektronik. Modellbasierte Entwicklung nach V-Modell.`,
  },
  '/entwicklung/validierung-emv': {
    title: 'EMV-Validierung | CME',
    description: 'EMV-gerechtes Design und Validierung. EMV-Tests, CE-Konformität, Störfestigkeitsprüfung.',
    h1: 'EMV-Validierung',
    keywords: 'EMV, Validierung, EMV-Test, CE-Konformität, Störfestigkeit, elektromagnetische Verträglichkeit',
    content: `EMV-gerechtes Design und Validierung. EMV-Tests, CE-Konformität, Störfestigkeitsprüfung für elektronische Systeme.`,
  },
  '/entwicklung/ki-entwicklung': {
    title: 'KI-Entwicklung | CME',
    description: 'KI-Entwicklung für industrielle Anwendungen. Machine Learning, Computer Vision, Predictive Maintenance.',
    h1: 'KI-Entwicklung',
    keywords: 'KI-Entwicklung, Künstliche Intelligenz, Machine Learning, Computer Vision, Predictive Maintenance, Industrie',
    content: `KI-Entwicklung für industrielle Anwendungen: Machine Learning, Computer Vision, Predictive Maintenance.`,
  },
  '/fertigung': {
    title: 'EMS-Fertigung – Elektronikfertigung & Bestückung | CME',
    description: 'EMS-Fertigung von CME: SMD-Bestückung, THT, Baugruppenfertigung, Qualitätssicherung. Vom Prototyp bis zur Serie.',
    h1: 'EMS-Fertigung – Electronic Manufacturing Services',
    keywords: 'EMS-Fertigung, Elektronikfertigung, SMD-Bestückung, THT-Bestückung, Baugruppenfertigung, Prototypen, Serienfertigung',
    content: `CME bietet umfassende EMS-Fertigungsdienstleistungen.
    SMD-Bestückung, THT-Bestückung, Baugruppenfertigung, Selektivlöten, Wellenlöten, Dampfphasenlöten.
    AOI, Röntgeninspektion, Verguss, Conformal Coating, Kabelkonfektionierung.
    Vom Prototyp bis zur Serienfertigung – zertifiziert nach IPC-Standards.`,
  },
  '/fertigung/leiterplatten': {
    title: 'Leiterplattenbestückung | CME',
    description: 'Professionelle Leiterplattenbestückung: SMD, THT, Mischbestückung. Prototypen und Serienfertigung.',
    h1: 'Leiterplattenbestückung',
    keywords: 'Leiterplattenbestückung, SMD-Bestückung, THT-Bestückung, Mischbestückung, PCB-Assembly',
    content: `Professionelle Leiterplattenbestückung: SMD, THT und Mischbestückung. Prototypen und Serienfertigung.`,
  },
  '/fertigung/baugruppen': {
    title: 'Baugruppenfertigung | CME',
    description: 'Baugruppenfertigung und Systemintegration. Komplette elektronische Baugruppen aus einer Hand.',
    h1: 'Baugruppenfertigung',
    keywords: 'Baugruppenfertigung, Systemintegration, elektronische Baugruppen, Gehäusemontage',
    content: `Baugruppenfertigung und Systemintegration. Komplette elektronische Baugruppen aus einer Hand.`,
  },
  '/fertigung/qualitaet': {
    title: 'Qualitätssicherung | CME',
    description: 'Qualitätssicherung in der Elektronikfertigung. AOI, Röntgeninspektion, IPC-Standards, ISO 9001, IATF 16949.',
    h1: 'Qualitätssicherung',
    keywords: 'Qualitätssicherung, AOI, Röntgeninspektion, IPC, ISO 9001, IATF 16949, Qualitätsmanagement',
    content: `Qualitätssicherung in der Elektronikfertigung: AOI, Röntgeninspektion, IPC-Standards. Zertifiziert nach ISO 9001 und IATF 16949.`,
  },
  '/lifecycle': {
    title: 'Lifecycle Management & Reparatur | CME',
    description: 'Lifecycle Management, Obsoleszenz-Management, Redesign und Reparaturservice für elektronische Systeme.',
    h1: 'Lifecycle Management & Reparatur',
    keywords: 'Lifecycle Management, Obsoleszenz-Management, Redesign, Reparatur, Instandsetzung, Ersatzteilmanagement',
    content: `Lifecycle Management für elektronische Systeme: Obsoleszenz-Management, Redesign, Reparatur und Instandsetzung.`,
  },
  '/maerkte': {
    title: 'Zielmärkte & Branchen | CME',
    description: 'CME bedient Automotive, E-Mobilität, Industrieautomation, Medizintechnik, Energietechnik und Luft- & Raumfahrt.',
    h1: 'Zielmärkte & Branchen',
    keywords: 'Automotive, E-Mobilität, Industrieautomation, Medizintechnik, Energietechnik, Luft- und Raumfahrt',
    content: `CME bedient vielfältige Branchen: Automotive und E-Mobilität, Industrieautomation und Maschinenbau, Medizintechnik, Energietechnik, Luft- und Raumfahrt, Sicherheitstechnik.`,
  },
  '/unternehmen': {
    title: 'Über CME – Unternehmen | CME',
    description: 'CME Control Motion Electronics GmbH – Über 60 Mitarbeiter, Standort Dortmund, zertifiziert nach ISO 9001 und IATF 16949.',
    h1: 'Über CME Control Motion Electronics',
    keywords: 'CME, Unternehmen, Dortmund, ISO 9001, IATF 16949, Elektronikentwicklung, EMS-Fertigung',
    content: `CME Control Motion Electronics GmbH – Über 60 Mitarbeiter am Standort Dortmund. Zertifiziert nach ISO 9001 und IATF 16949. Entwicklung und Fertigung unter einem Dach.`,
  },
  '/kontakt': {
    title: 'Kontakt | CME',
    description: 'Kontaktieren Sie CME Control Motion Electronics. Beratungsgespräch, Projektanfrage oder NDA-Anforderung.',
    h1: 'Kontakt',
    keywords: 'Kontakt, Anfrage, Beratung, CME, Dortmund, Elektronikentwicklung',
    content: `Kontaktieren Sie CME Control Motion Electronics GmbH. Beratungsgespräch, Projektanfrage oder NDA-Anforderung. Brennaborstraße 32, 44149 Dortmund.`,
  },
  '/karriere': {
    title: 'Karriere bei CME | CME',
    description: 'Karriere bei CME Control Motion Electronics. Stellenangebote in Elektronikentwicklung und EMS-Fertigung.',
    h1: 'Karriere bei CME',
    keywords: 'Karriere, Stellenangebote, Jobs, Elektronikentwicklung, EMS-Fertigung, Dortmund',
    content: `Karriere bei CME Control Motion Electronics. Stellenangebote in Elektronikentwicklung und EMS-Fertigung am Standort Dortmund.`,
  },
  '/insights': {
    title: 'Insights – Fachartikel & Neuigkeiten | CME',
    description: 'Fachartikel, Neuigkeiten und Einblicke aus der Welt der Elektronikentwicklung und EMS-Fertigung.',
    h1: 'Insights – Fachartikel & Neuigkeiten',
    keywords: 'Fachartikel, Insights, Neuigkeiten, Elektronikentwicklung, EMS-Fertigung, Blog',
    content: `Fachartikel, Neuigkeiten und Einblicke aus der Welt der Elektronikentwicklung und EMS-Fertigung bei CME.`,
  },
  '/impressum': {
    title: 'Impressum | CME',
    description: 'Impressum der CME Control Motion Electronics GmbH.',
    h1: 'Impressum',
    keywords: 'Impressum, CME, Control Motion Electronics',
    content: `Impressum der CME Control Motion Electronics GmbH. Brennaborstraße 32, 44149 Dortmund.`,
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung | CME',
    description: 'Datenschutzerklärung der CME Control Motion Electronics GmbH.',
    h1: 'Datenschutzerklärung',
    keywords: 'Datenschutz, DSGVO, Datenschutzerklärung, CME',
    content: `Datenschutzerklärung der CME Control Motion Electronics GmbH gemäß DSGVO.`,
  },
  '/agb': {
    title: 'AGB | CME',
    description: 'Allgemeine Geschäftsbedingungen der CME Control Motion Electronics GmbH.',
    h1: 'Allgemeine Geschäftsbedingungen',
    keywords: 'AGB, Geschäftsbedingungen, CME',
    content: `Allgemeine Geschäftsbedingungen der CME Control Motion Electronics GmbH.`,
  },
};

// ── HTML generation ──
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateCrawlerHtml(path: string, page: PageMeta): string {
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImage = DEFAULT_OG_IMAGE;

  const schemasHtml = (page.schemas || [])
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ');

  // Build breadcrumb schema
  const breadcrumbSchema = page.breadcrumbs
    ? `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: page.breadcrumbs.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
      })}</script>`
    : '';

  // Format content paragraphs
  const contentParagraphs = page.content
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => `      <p>${escapeHtml(line)}</p>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="keywords" content="${escapeHtml(page.keywords)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:locale" content="de_DE">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${ogImage}">
    
    <!-- Structured Data -->
    ${schemasHtml}
    ${breadcrumbSchema}
</head>
<body>
    <header>
      <nav>
        <a href="/">Startseite</a>
        <a href="/entwicklung">Entwicklung</a>
        <a href="/fertigung">Fertigung</a>
        <a href="/lifecycle">Lifecycle</a>
        <a href="/maerkte">Märkte</a>
        <a href="/unternehmen">Unternehmen</a>
        <a href="/kontakt">Kontakt</a>
        <a href="/karriere">Karriere</a>
        <a href="/insights">Insights</a>
      </nav>
    </header>
    <main>
      <h1>${escapeHtml(page.h1)}</h1>
      <article>
${contentParagraphs}
      </article>
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(SITE_NAME)}. Alle Rechte vorbehalten.</p>
      <nav>
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
        <a href="/agb">AGB</a>
      </nav>
      <address>
        Brennaborstraße 32, 44149 Dortmund, Deutschland<br>
        Telefon: +49 231 97676-0<br>
        E-Mail: <a href="mailto:info@control-motion.de">info@control-motion.de</a>
      </address>
    </footer>
</body>
</html>`;
}

// ── Express middleware ──
export function prerenderMiddleware() {
  return (req: any, res: any, next: any) => {
    // Only intercept GET requests
    if (req.method !== 'GET') return next();

    // Skip API, assets, Vite internals
    const path = req.path;
    if (
      path.startsWith('/api/') ||
      path.startsWith('/@') ||
      path.startsWith('/src/') ||
      path.startsWith('/node_modules/') ||
      path.includes('.') || // static files (js, css, images, etc.)
      path === '/favicon.ico'
    ) {
      return next();
    }

    // Check User-Agent
    const userAgent = req.headers['user-agent'] || '';
    if (!isCrawler(userAgent)) return next();

    // Find page data
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');

    // ── Legacy URL redirects for crawlers ──
    const LEGACY_REDIRECTS: Record<string, string> = {
      '/elektronikentwicklung': '/entwicklung',
      '/elektronikentwicklung/hardware-software': '/entwicklung/hardware-software',
      '/elektronikentwicklung/simulation': '/entwicklung/simulation',
      '/elektronikentwicklung/test-verifikation': '/entwicklung/test-verifikation',
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten': '/fertigung/leiterplatten',
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht': '/fertigung/leiterplatten',
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen': '/fertigung/baugruppen',
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm': '/fertigung/qualitaet',
      '/smd-fragen-entwurf': '/fertigung',
      '/datenschutzerklaerung': '/datenschutz',
      '/jobs': '/karriere',
      '/en/electronics-manufacturing': '/en/manufacturing',
      '/en/electronics-manufacturing/assembling-printed-circuit-boards': '/en/manufacturing/printed-circuit-boards',
      '/en/electronics-manufacturing/electronic-assemblies': '/en/manufacturing/assemblies',
      '/en/electronics-manufacturing/qa-qm': '/en/manufacturing/quality',
      '/en/electronics-development': '/en/development',
      '/en/electronics-development/hardware-software': '/en/development/hardware-software',
      '/en/electronics-development/simulation': '/en/development/simulation',
      '/en/electronics-development/test-verification': '/en/development/test-verification',
      '/en/jobs': '/en/careers',
    };
    const legacyTarget = LEGACY_REDIRECTS[normalizedPath];
    if (legacyTarget) {
      console.log(`[Prerender] 301 legacy redirect: ${normalizedPath} → ${legacyTarget} (crawler: ${userAgent.substring(0, 50)})`);
      res.redirect(301, legacyTarget);
      return;
    }

    const page = PAGES[normalizedPath];

    if (!page) {
      // Unknown page – let the SPA handle it (404 page)
      return next();
    }

    // Serve pre-rendered HTML
    console.log(`[Prerender] Serving pre-rendered HTML for ${normalizedPath} to crawler: ${userAgent.substring(0, 80)}`);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Prerendered', 'true');
    res.send(generateCrawlerHtml(normalizedPath, page));
  };
}
