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
  enPath?: string; // English path for hreflang
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
    streetAddress: 'Alter Hellweg 48',
    addressLocality: 'Dortmund',
    postalCode: '44379',
    addressCountry: 'DE',
  },
  telephone: '+49 231 28 66 76 96-0',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+49 231 28 66 76 96-0',
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

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CME Control Motion Electronics GmbH',
  image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB.png',
  url: BASE_URL,
  telephone: '+49 231 28 66 76 96-0',
  email: 'info@control-motion.de',
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
  priceRange: '$$$$',
  sameAs: [
    'https://www.linkedin.com/company/cme-control-motion-electronics/',
  ],
};

// ── Page definitions for all public routes ──
const PAGES: Record<string, PageMeta> = {
  '/': {
    enPath: '/en',
    title: 'CME Control Motion Electronics GmbH',
    description: 'CME Control Motion Electronics – Ihr Partner für Elektronikentwicklung & EMS-Fertigung in Dortmund. ISO 9001 zertifiziert. Über 15 Jahre Erfahrung. Jetzt Anfrage stellen.',
    h1: 'Elektronikentwicklung & EMS-Fertigung aus einer Hand',
    keywords: 'Elektronikentwicklung, EMS-Fertigung, Leistungselektronik, Antriebselektronik, Elektronikfertigung Dortmund, thermisches Management',
    content: `CME Control Motion Electronics GmbH ist Ihr Entwicklungsdienstleister und EMS-Fertigungspartner für elektronische Produkte. 
    Wir sind spezialisiert auf Leistungselektronik, Antriebselektronik, Mechatronik und thermisch anspruchsvolle Elektronikprojekte.
    Über 60 Mitarbeiter, zertifiziert nach ISO 9001 und IATF 16949. Vom Prototyp bis zur Serie – alles aus einer Hand.
    Unsere Kernkompetenzen: Hardware- und Softwareentwicklung, E-Motor-Design, Simulation, EMV-Validierung, SMD-Bestückung, Baugruppenfertigung, Qualitätssicherung.
    Zielmärkte: Automotive, E-Mobilität, Industrieautomation, Medizintechnik, Energietechnik, Luft- und Raumfahrt.`,
    schemas: [organizationSchema, websiteSchema, localBusinessSchema],
  },
  '/entwicklung': {
    enPath: '/en/development',
    title: 'Elektronikentwicklung für Leistungselektronik & Mechatronik | CME',
    description: 'CME entwickelt Hardware, Embedded Software und digitale Systeme für Leistungselektronik, Antriebselektronik, Mechatronik und thermisch anspruchsvolle Elektronikprojekte.',
    h1: 'Entwicklung – Engineering Services',
    keywords: 'Elektronikentwicklung, Hardware-Entwicklung, Software-Entwicklung, Simulation, EMV, E-Motor-Design, Regelungstechnik, V-Modell',
    content: `CME bietet umfassende Entwicklungsdienstleistungen für elektronische Systeme.
    Hardware- und Softwareentwicklung, Leistungselektronik, Antriebselektronik, E-Motor-Design, Simulation und thermisches Management.
    Regelungstechnik (Control Design), EMV-gerechtes Design, Test und Verifikation nach V-Modell.
    UX & Interface Engineering, Software für digitale Systeme, KI-Entwicklung für industrielle Anwendungen.`,
    schemas: [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Wie läuft ein Elektronikentwicklungsprojekt bei CME ab – vom Konzept bis zur Serie?', acceptedAnswer: { '@type': 'Answer', text: 'Jedes Projekt startet mit einer Machbarkeitsanalyse, in der wir Ihre Anforderungen, Normen und Zielkosten bewerten. Darauf folgen Schaltungsentwurf, Simulation und Layout – parallel dazu entwickeln wir die Embedded-Software und das Reglerdesign. Nach der Prototypenfertigung durchlaufen alle Baugruppen unsere Validierung inklusive EMV-Prüfung und Umwelttests. Anschließend begleiten wir den Serienanlauf – unabhängig davon, ob Sie die Fertigung bei CME, bei einem anderen EMS-Partner oder in Eigenregie durchführen. Sie entscheiden frei: nur Entwicklung, nur Fertigung oder beides aus einer Hand.' }},
        { '@type': 'Question', name: 'Welche Unterlagen benötigt CME für eine Entwicklungsanfrage?', acceptedAnswer: { '@type': 'Answer', text: 'Im Idealfall liegt ein Lastenheft oder eine technische Spezifikation vor – aber das ist keine Voraussetzung. Oft starten wir mit einer Funktionsbeschreibung, einer Skizze oder einem bestehenden Produkt, das weiterentwickelt werden soll. Unsere Ingenieure erarbeiten gemeinsam mit Ihnen die Anforderungen und erstellen bei Bedarf das Pflichtenheft.' }},
        { '@type': 'Question', name: 'Was kostet eine Elektronikentwicklung und wie lange dauert sie?', acceptedAnswer: { '@type': 'Answer', text: 'Die Kosten hängen von der Komplexität ab: Ein einfaches Sensorboard kann im niedrigen fünfstelligen Bereich liegen, eine komplexe Leistungselektronik mit Funktionaler Sicherheit im sechsstelligen Bereich. Typische Entwicklungszeiten reichen von 3 Monaten für überschaubare Projekte bis zu 12–18 Monaten für normkonforme Systeme mit Zulassung.' }},
        { '@type': 'Question', name: 'Kann CME auch bestehende Elektronik redesignen oder weiterentwickeln?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Redesign und Weiterentwicklung gehören zu unseren Kernleistungen. Typische Anlässe sind Bauteilabkündigungen (Obsoleszenz-Management), Kostenoptimierung, Leistungssteigerung oder die Anpassung an neue Normen.' }},
        { '@type': 'Question', name: 'Was macht CME zum Spezialisten für Leistungselektronik und thermisch anspruchsvolle Projekte?', acceptedAnswer: { '@type': 'Answer', text: 'Leistungselektronik erzeugt systembedingt hohe Verlustleistungen – das thermische Management entscheidet über Zuverlässigkeit und Lebensdauer. Bei CME ist die thermische Simulation fester Bestandteil jedes Leistungselektronik-Projekts.' }},
        { '@type': 'Question', name: 'Welche Antriebselektronik entwickelt CME – und für welche Motortypen?', acceptedAnswer: { '@type': 'Answer', text: 'Wir entwickeln kundenspezifische Antriebselektronik für bürstenlose DC-Motoren (BLDC), Permanentmagnet-Synchronmotoren (PMSM), Asynchronmotoren und Schrittmotoren. Unser Leistungsspektrum reicht von Kleinantrieben im Watt-Bereich bis zu Hochleistungsantrieben im zweistelligen Kilowatt-Bereich.' }},
        { '@type': 'Question', name: 'Bietet CME auch Embedded-Software-Entwicklung an?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Hardware und Software werden bei CME immer als Einheit gedacht. Unsere Embedded-Entwickler programmieren Mikrocontroller-Systeme (ARM Cortex, STM32, Infineon, NXP), entwickeln Echtzeit-Firmware und implementieren Kommunikationsschnittstellen wie CAN, EtherCAT, SPI und UART.' }},
        { '@type': 'Question', name: 'Wie stellt CME die EMV-Konformität und Zulassungsfähigkeit sicher?', acceptedAnswer: { '@type': 'Answer', text: 'EMV-gerechtes Design beginnt bei uns nicht erst im Test, sondern bereits im Schaltungsentwurf. Wir berücksichtigen Filterauslegung, Masseführung, Schirmung und Leiterbahnführung von Anfang an.' }},
        { '@type': 'Question', name: 'Bietet CME Elektronikentwicklung für Automotive-Projekte an?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Automotive ist eine unserer Kernbranchen. Wir entwickeln Elektronik für Pumpen und Kompressoren, HVAC-Blower und Klimaaktuatoren, Ventilsteuerungen, On-Board-Charger und DC/DC-Wandler sowie Fuel-Cell-Steuerungen. Dabei arbeiten wir nach ISO 26262 (Funktionale Sicherheit bis ASIL D) und Automotive SPICE (ASPICE).' }},
        { '@type': 'Question', name: 'Entwickelt CME Elektronik für die Medizintechnik?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, wir entwickeln Präzisionselektronik für Medizin und Life Sciences. Wir arbeiten nach den regulatorischen Anforderungen der MDR und IEC 60601.' }},
        { '@type': 'Question', name: 'Bietet CME Elektronikentwicklung für Industrieautomation und Robotik an?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, wir entwickeln Steuerungselektronik für die Fabrik der Zukunft. Dazu gehören Maschinensteuerungen, HMI- und Bedienpanels, Robotik- und Cobot-Steuerungen, Intralogistik-Lösungen für AGV/AMR sowie Safety-Systeme und SIL-Elektronik.' }},
        { '@type': 'Question', name: 'Entwickelt CME Antriebselektronik für Off-Highway, E-Mobility und mobile Maschinen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Antriebselektronik für mobile Anwendungen ist eine unserer Stärken. Wir entwickeln BLDC- und PMSM-Motorsteuerungen, FOC-Inverter und Umrichter für E-Mobility-Anwendungen.' }},
        { '@type': 'Question', name: 'Bietet CME Elektronikentwicklung für Energiesysteme und Ladeinfrastruktur an?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, wir entwickeln leistungselektronische Teilkomponenten für Energiesysteme und Ladeinfrastruktur: DC/DC- und AC/DC-Wandler, Wechselrichter-Leistungsstufen, Wallbox-Steuerungselektronik und Batteriemanagementsysteme (BMS). Die Systemintegration verantworten unsere Kunden – wir liefern die elektronischen Kernkomponenten.' }},
        { '@type': 'Question', name: 'Entwickelt CME Elektronik für Gebäudetechnik und Smart Infrastructure?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, wir entwickeln intelligente Elektronik für Gebäude, Infrastruktur und Sicherheit. Aufzugsteuerungen, HVAC-Steuerungen, Gebäudeautomation, Zutrittskontrolle, Energiemanagement und Smart Metering.' }},
        { '@type': 'Question', name: 'Für welche Branchen entwickelt CME Elektronik – und welche Normen werden abgedeckt?', acceptedAnswer: { '@type': 'Answer', text: 'CME entwickelt Elektronik für sechs Kernbranchen: Antriebstechnik, Automotive, Medizintechnik, Industrieautomation, Gebäudetechnik und Energiesysteme. Normen: ISO 26262, IEC 60601, IEC 61508, EN 61800 und Maschinenrichtlinie.' }},
        { '@type': 'Question', name: 'Warum Elektronikentwicklung in Deutschland statt Offshore – was sind die Vorteile eines deutschen Entwicklungspartners?', acceptedAnswer: { '@type': 'Answer', text: 'Ein deutscher Entwicklungspartner wie CME bietet entscheidende Vorteile: direkte Kommunikation ohne Sprachbarrieren, tiefes Verständnis europäischer Normen und Schutz Ihres geistigen Eigentums nach deutschem und EU-Recht. CME ist EMS-neutral: Sie entscheiden frei, ob wir nur entwickeln, nur fertigen oder beides übernehmen.' }},
      ],
    }],
  },
  '/entwicklung/hardware-software': {
    enPath: '/en/development/hardware-software',
    title: 'Hardware- & Softwareentwicklung | CME',
    description: 'Hardware- und Softwareentwicklung für elektronische Steuerungen. Schaltungsentwicklung, Embedded Software, FPGA-Design.',
    h1: 'Hardware- & Softwareentwicklung',
    keywords: 'Hardware-Entwicklung, Softwareentwicklung, Schaltungsentwicklung, Embedded Software, FPGA, Steuerungsentwicklung, Leiterplattendesign',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Entwicklung', url: '/entwicklung/' },
      { name: 'Hardware & Software', url: '/entwicklung/hardware-software/' },
    ],
    content: `Professionelle Hardware- und Softwareentwicklung für elektronische Steuerungen und Systeme bei CME Control Motion Electronics in Dortmund.
    Unser Leistungsspektrum umfasst die vollständige Schaltungsentwicklung von der Spezifikation bis zum serienreifen Layout. Wir entwickeln analoge und digitale Schaltungen, Mixed-Signal-Designs und Leistungselektronik-Topologien für Ihre Anwendung.
    Leiterplattendesign (PCB-Layout): Mehrlagige Leiterplatten bis 16+ Layer, HDI-Technologie, impedanzkontrolliertes Routing, thermisch optimierte Kupferflächen für Leistungselektronik. EMV-gerechtes Layout mit definierten Massekonzepten.
    Embedded Software und Firmware: Echtzeitfähige Firmware für ARM Cortex (STM32, NXP, Infineon), FPGA-Designs (Xilinx, Intel/Altera), Kommunikationsschnittstellen (CAN, EtherCAT, SPI, UART, I2C, Ethernet), Bootloader und OTA-Update-Mechanismen.
    FPGA-Design: Digitale Signalverarbeitung, Echtzeit-Regelung, schnelle Kommunikationsschnittstellen. VHDL und Verilog, Simulation und Verifikation mit Testbenches.
    Modellbasierte Entwicklung: MATLAB/Simulink für Reglerdesign und automatische Codegenerierung. Rapid Prototyping mit dSPACE und Hardware-in-the-Loop (HIL).
    Warum CME für Hardware- und Softwareentwicklung? Hardware und Software werden bei CME immer als Einheit gedacht. Unsere Ingenieure arbeiten interdisziplinär – das vermeidet Schnittstellenprobleme und verkürzt die Entwicklungszeit. Über 15 Jahre Erfahrung in anspruchsvollen Projekten der Leistungselektronik, Antriebstechnik und Medizintechnik.`,
  },
  '/entwicklung/simulation': {
    enPath: '/en/development/simulation',
    title: 'Simulation & Thermisches Management | CME',
    description: 'Simulation und thermisches Management für Elektronik. FEM, CFD, thermische Analyse, Leistungselektronik-Simulation.',
    h1: 'Simulation & Thermisches Management',
    keywords: 'Simulation, thermisches Management, FEM, CFD, thermische Analyse, Leistungselektronik-Simulation',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Entwicklung', url: '/entwicklung/' },
      { name: 'Simulation', url: '/entwicklung/simulation/' },
    ],
    content: `Simulation und thermisches Management für anspruchsvolle Elektronikprojekte bei CME Control Motion Electronics.
    Leistungselektronik erzeugt systembedingt hohe Verlustleistungen. Das thermische Management entscheidet über Zuverlässigkeit, Lebensdauer und Baugröße. Bei CME ist die thermische Simulation fester Bestandteil jedes Leistungselektronik-Projekts – nicht erst ein nachgelagerter Prüfschritt.
    Thermische Simulation (CFD und FEM): Strömungssimulation (CFD) für Kühlkonzepte mit erzwungener und natürlicher Konvektion. Finite-Elemente-Analyse (FEM) für Wärmeleitung in Leiterplatten, Kühlkörpern und Gehäusen. Transiente Analysen für Lastspiele und Worst-Case-Szenarien.
    Schaltungssimulation: SPICE-basierte Schaltungssimulation für Leistungselektronik-Topologien. Verlustleistungsberechnung für MOSFETs, IGBTs, SiC- und GaN-Halbleiter. Parametervariation und Worst-Case-Analyse für robustes Design.
    Multiphysik-Simulation: Kopplung von elektrischer, thermischer und mechanischer Simulation. Elektromagnetische Feldsimulation für EMV-Vorhersage. Vibrations- und Schockanalyse für Automotive- und Industrieanwendungen.
    Werkzeuge: COMSOL Multiphysics, ANSYS (Icepak, Motor-CAD), PLECS, LTspice, Micro-Cap, MATLAB/Simulink, MathWorks Simscape.
    Ergebnis: Optimierte Designs mit minimierten Iterationsschleifen. Die Simulation reduziert Hardware-Prototypen und verkürzt die Time-to-Market um typisch 30–40 Prozent.`,
  },
  '/entwicklung/test-verifikation': {
    enPath: '/en/development/test-verification',
    title: 'Test & Verifikation | CME',
    description: 'Test und Verifikation nach V-Modell. Testautomatisierung, HIL-Tests, Umweltsimulation, Zuverlässigkeitstests.',
    h1: 'Test & Verifikation',
    keywords: 'Test, Verifikation, V-Modell, Testautomatisierung, HIL-Test, Umweltsimulation, Zuverlässigkeitstest',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Entwicklung', url: '/entwicklung/' },
      { name: 'Test & Verifikation', url: '/entwicklung/test-verifikation/' },
    ],
    content: `Test und Verifikation nach V-Modell für elektronische Systeme bei CME Control Motion Electronics.
    Systematische Validierung auf allen Ebenen: Komponententest, Integrations- und Systemtest bis hin zur Typprüfung und Zulassung. Wir stellen sicher, dass Ihre Elektronik die spezifizierten Anforderungen unter allen Betriebsbedingungen erfüllt.
    Testautomatisierung: Automatisierte Prüfstände für Dauerlauf, Parametrierung und End-of-Line-Tests. Python- und LabVIEW-basierte Testframeworks mit reproduzierbaren Testabläufen und automatischer Protokollierung.
    Hardware-in-the-Loop (HIL): Echtzeit-Simulation der Systemumgebung für Steuergeräte-Tests. Validierung von Regelungsalgorithmen und Sicherheitsfunktionen ohne physischen Prüfling. Fehlersimulation und Grenzwertanalyse.
    Umweltsimulation: Temperaturwechseltests (-40 bis +150 Grad Celsius), Vibrations- und Schockprüfung, Feuchte-Wärme-Zyklen, Höhensimulation. Qualifikation nach Automotive (LV124), Industrie (IEC 60068) und Medizin (IEC 60601).
    EMV-Validierung: Störaussendung und Störfestigkeit nach EN 55032, EN 61000-4, CISPR 25. Pre-Compliance-Messungen im eigenen Labor, Begleitung bei akkreditierten Prüfhäusern.
    Zuverlässigkeitstests: HALT (Highly Accelerated Life Test), HASS, Burn-In, Lebensdauerprognose. Ausfallanalyse und Root-Cause-Investigation bei Feldausfällen.`,
  },
  '/entwicklung/ux-interface-engineering': {
    enPath: '/en/development/ux-interface-engineering',
    title: 'UX & Interface Engineering | CME',
    description: 'UX-Design und Interface Engineering für Bediengeräte und industrielle HMI-Systeme.',
    h1: 'UX & Interface Engineering',
    keywords: 'UX-Design, Interface Engineering, HMI, Bediengeräte, User Experience, Industriedesign',
    content: `UX-Design und Interface Engineering für Bediengeräte, HMI-Systeme und industrielle Anwendungen.`,
  },
  '/entwicklung/software-digitale-systeme': {
    enPath: '/en/development/software-digital-systems',
    title: 'Software für Digitale Systeme | CME',
    description: 'Softwareentwicklung für digitale Systeme, Embedded Systems, IoT und Cloud-Anbindung.',
    h1: 'Software für Digitale Systeme',
    keywords: 'Softwareentwicklung, digitale Systeme, Embedded Systems, IoT, Cloud, Webapplikationen',
    content: `Softwareentwicklung für digitale Systeme, Embedded Systems, IoT-Lösungen und Cloud-Anbindung.`,
  },
  '/entwicklung/e-motor-design': {
    enPath: '/en/development/e-motor-design',
    title: 'E-Motor-Design | CME',
    description: 'E-Motor-Design und Antriebselektronik. Motorauslegung, Inverter-Design, Regelungstechnik für elektrische Antriebe.',
    h1: 'E-Motor-Design',
    keywords: 'E-Motor-Design, Antriebselektronik, Motorauslegung, Inverter, Regelungstechnik, elektrische Antriebe',
    content: `E-Motor-Design und Antriebselektronik: Motorauslegung, Inverter-Design, Regelungstechnik für elektrische Antriebe.`,
  },
  '/entwicklung/control-design': {
    enPath: '/en/development/control-design',
    title: 'Control Design – Regelungstechnik | CME',
    description: 'Regelungstechnik und Control Design für Antriebe und Leistungselektronik. Modellbasierte Entwicklung.',
    h1: 'Control Design – Regelungstechnik',
    keywords: 'Control Design, Regelungstechnik, modellbasierte Entwicklung, Antriebsregelung, Leistungselektronik',
    content: `Regelungstechnik und Control Design für Antriebe und Leistungselektronik. Modellbasierte Entwicklung nach V-Modell.`,
  },
  '/entwicklung/validierung-emv': {
    enPath: '/en/development/emc-validation',
    title: 'EMV-Validierung | CME',
    description: 'EMV-gerechtes Design und Validierung. EMV-Tests, CE-Konformität, Störfestigkeitsprüfung.',
    h1: 'EMV-Validierung',
    keywords: 'EMV, Validierung, EMV-Test, CE-Konformität, Störfestigkeit, elektromagnetische Verträglichkeit',
    content: `EMV-gerechtes Design und Validierung. EMV-Tests, CE-Konformität, Störfestigkeitsprüfung für elektronische Systeme.`,
  },
  '/entwicklung/ki-entwicklung': {
    enPath: '/en/development/ai-development',
    title: 'KI-Entwicklung | CME',
    description: 'KI-Entwicklung für industrielle Anwendungen. Machine Learning, Computer Vision, Predictive Maintenance.',
    h1: 'KI-Entwicklung',
    keywords: 'KI-Entwicklung, Künstliche Intelligenz, Machine Learning, Computer Vision, Predictive Maintenance, Industrie',
    content: `KI-Entwicklung für industrielle Anwendungen: Machine Learning, Computer Vision, Predictive Maintenance.`,
  },
  '/fertigung': {
    enPath: '/en/manufacturing',
    title: 'EMS-Fertigung & Elektronikfertigung Dortmund | CME',
    description: 'Professionelle Elektronikfertigung (EMS) in Dortmund: Leiterplatten bestücken, Baugruppen fertigen, Qualitätsmanagement nach IPC. Vom Prototyp bis zur Serie.',
    h1: 'EMS-Fertigung – Electronic Manufacturing Services',
    keywords: 'EMS-Fertigung, Elektronikfertigung, SMD-Bestückung, THT-Bestückung, Baugruppenfertigung, Prototypen, Serienfertigung',
    content: `CME bietet umfassende EMS-Fertigungsdienstleistungen.
    SMD-Bestückung, THT-Bestückung, Baugruppenfertigung, Selektivlöten, Dampfphasenlöten.
    AOI, MOI, Verguss, Conformal Coating, Kabelkonfektionierung.
    Vom Prototyp bis zur Serienfertigung – zertifiziert nach IPC-Standards.`,
    schemas: [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Welche Losgrößen fertigt CME – vom Prototyp bis zur Serie?', acceptedAnswer: { '@type': 'Answer', text: 'CME fertigt flexibel vom Einzelprototyp über Kleinserien (10–500 Stück) bis hin zu Serienproduktionen mit mehreren tausend Einheiten pro Monat. Entwicklung und Fertigung unter einem Dach ermöglichen einen nahtlosen Übergang vom Prototyp zur Serie.' }},
        { '@type': 'Question', name: 'Wie läuft eine EMS-Fertigungsanfrage bei CME ab?', acceptedAnswer: { '@type': 'Answer', text: 'Sie senden Gerber-Daten, Stückliste (BOM) und Bestückungsplan. CME prüft die Fertigbarkeit (DFM-Check), kalkuliert verbindlich und liefert termingerecht. Bei Bedarf führen wir vorab ein DFM-Review durch.' }},
        { '@type': 'Question', name: 'Kann CME auch Fremdentwicklungen fertigen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, CME fertigt sowohl eigene Entwicklungen als auch Fremddesigns. Sie haben die volle Wahlfreiheit: nur Entwicklung, nur Fertigung oder beides aus einer Hand.' }},
        { '@type': 'Question', name: 'Wie schnell kann CME Prototypen fertigen?', acceptedAnswer: { '@type': 'Answer', text: 'Sind alle Bauteile verfügbar, bestücken und löten wir Prototypen innerhalb weniger Arbeitstage. Für eilige Projekte bieten wir Express-Fertigung nach Absprache.' }},
        { '@type': 'Question', name: 'Welche Fertigungsunterlagen benötigt CME für eine Kalkulation?', acceptedAnswer: { '@type': 'Answer', text: 'Gerber-Daten (oder ODB++), Stückliste (BOM) mit Herstellerteilenummern, Bestückungsplan (Pick-and-Place-Daten) und gewünschte Stückzahl. Zusätzlich hilfreich: Angaben zu Verguss, Schutzlackierung oder Funktionstest.' }},
        { '@type': 'Question', name: 'Welche Bestückungstechnologien bietet CME an?', acceptedAnswer: { '@type': 'Answer', text: 'SMD-Bestückung bis 01005 und 0,4 mm Pitch (BGA, QFN, LGA), THT-Bestückung, Selektivlöten, Dampfphasenlöten und Handbestückung. Jeder Lötprozess wird durch 100 %-AOI abgesichert.' }},
        { '@type': 'Question', name: 'Wie stellt CME die Qualität in der Elektronikfertigung sicher?', acceptedAnswer: { '@type': 'Answer', text: '100 %-AOI nach jedem Lötprozess, MOI durch IPC-zertifizierte Prüfer, End-of-Line-Funktionstest und lückenlose Rückverfolgbarkeit über MES. Zertifiziert nach ISO 9001 und ISO 14001, Fertigung nach IPC-A-610 und IPC J-STD-001.' }},
        { '@type': 'Question', name: 'Bietet CME auch Verguss und Schutzlackierung an?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Verguss mit PU, Epoxid oder Silikon sowie selektive Schutzlackierung (Conformal Coating) per Sprühen oder Fluten mit UV-Prüfung. Schutz vor Feuchtigkeit, Vibration und Chemikalien.' }},
        { '@type': 'Question', name: 'Was bedeutet Traceability bei CME?', acceptedAnswer: { '@type': 'Answer', text: 'Vollständige Rückverfolgbarkeit jeder Baugruppe vom Wareneingang bis zum Versand. Alle Fertigungsgeräte sind in einer zentralen MES-Datenbank vernetzt. Chargen-, Serien- und Bauteil-Tracing ist exportfähig.' }},
        { '@type': 'Question', name: 'Führt CME auch Funktionstests durch?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, End-of-Line-Funktionstests für 100 %-Prüfung aller Serieneinheiten. Manuelle Prüfung oder Nadelbett-Adapter (ICT) je nach Anforderung.' }},
        { '@type': 'Question', name: 'Was ist ein DFM-Review?', acceptedAnswer: { '@type': 'Answer', text: 'Design for Manufacturing – CME prüft Ihr Layout auf Fertigbarkeit bereits in der Entwicklungsphase. Direkte Rückkopplung zwischen Entwicklung und Fertigung am gleichen Standort reduziert Iterationsschleifen und Kosten.' }},
        { '@type': 'Question', name: 'Übernimmt CME auch die Bauteilbeschaffung?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, CME übernimmt die komplette Bauteilbeschaffung mit bewährten Distributoren. Alternativ können Bauteile beigestellt werden. Bei Obsoleszenz unterstützen wir proaktiv bei der Suche nach Alternativtypen.' }},
        { '@type': 'Question', name: 'Bietet CME auch Kabelkonfektionierung und Endmontage an?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, kundenspezifische Kabelkonfektionierung und komplette Endmontage inkl. Gehäusemontage, Verschraubung, Beschriftung und Verpackung – alles aus einer Hand.' }},
        { '@type': 'Question', name: 'Kann CME auch thermisch anspruchsvolle Baugruppen fertigen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, thermisch anspruchsvolle Baugruppen sind eine Spezialität. Dampfphasenlöten für voidarme Lötverbindungen, Verguss mit thermisch leitfähigen Materialien und Verarbeitung von SiC, GaN, IGBT.' }},
        { '@type': 'Question', name: 'Wie geht CME mit Bauteilabkündigungen um?', acceptedAnswer: { '@type': 'Answer', text: 'CME überwacht die Bauteilbverfügbarkeit proaktiv. Bei Abkündigungen informieren wir frühzeitig und bewerten die Auswirkungen eines Bauteilwechsels auf Schaltung, Layout und Fertigung – inklusive Simulation und Validierung.' }},
        { '@type': 'Question', name: 'Wo befindet sich die CME-Fertigung?', acceptedAnswer: { '@type': 'Answer', text: 'Die gesamte Fertigung befindet sich am CME-Standort in Dortmund, Deutschland. Vorteile: kurze Kommunikationswege, IP-Schutz nach EU-Recht, keine Zollproblematik innerhalb der EU, Entwicklung und Fertigung an einem Standort.' }},
      ],
    }],
  },
  '/fertigung/leiterplatten': {
    enPath: '/en/manufacturing/printed-circuit-boards',
    title: 'Leiterplattenbestückung | CME',
    description: 'Professionelle Leiterplattenbestückung: SMD, THT, Mischbestückung. Prototypen und Serienfertigung.',
    h1: 'Leiterplattenbestückung',
    keywords: 'Leiterplattenbestückung, SMD-Bestückung, THT-Bestückung, Mischbestückung, PCB-Assembly',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Fertigung', url: '/fertigung/' },
      { name: 'Leiterplattenbestückung', url: '/fertigung/leiterplatten/' },
    ],
    content: `Professionelle Leiterplattenbestückung bei CME Control Motion Electronics in Dortmund: SMD, THT und Mischbestückung vom Prototyp bis zur Großserie.
    SMD-Bestückung: Hochgeschwindigkeits-Bestückungsautomaten für alle gängigen Bauformen von 01005 bis BGA mit 0,4 mm Pitch. Lotpastendruck mit 100-Prozent-SPI-Kontrolle. Reflow-Löten und Dampfphasenlöten für bleifreie und bleihaltige Prozesse.
    THT-Bestückung: Manuelle und maschinelle Bestückung bedrahteter Bauteile. Selektivlöten für gemischte Baugruppen. Wellenlöten für hohe Stückzahlen.
    Mischbestückung: Kombination von SMD und THT auf einer Baugruppe. Optimierte Fertigungsreihenfolge für minimale thermische Belastung.
    Qualitätssicherung: 100-Prozent-AOI (Automatische Optische Inspektion) nach jedem Lötprozess. MOI (Manuelle Optische Inspektion) durch IPC-A-610-zertifizierte Prüfer. Lückenlose Rückverfolgbarkeit über MES-System.
    Flexible Losgrößen: Einzelstück-Prototypen, Kleinserien ab 10 Stück, Serienproduktion mit mehreren tausend Einheiten pro Monat. Express-Fertigung bei Bauteilbereitschaft innerhalb weniger Arbeitstage.`,
  },
  '/fertigung/baugruppen': {
    enPath: '/en/manufacturing/assemblies',
    title: 'Baugruppenfertigung | CME',
    description: 'Baugruppenfertigung und Systemintegration. Komplette elektronische Baugruppen aus einer Hand.',
    h1: 'Baugruppenfertigung',
    keywords: 'Baugruppenfertigung, Systemintegration, elektronische Baugruppen, Gehäusemontage',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Fertigung', url: '/fertigung/' },
      { name: 'Baugruppenfertigung', url: '/fertigung/baugruppen/' },
    ],
    content: `Baugruppenfertigung und Systemintegration bei CME Control Motion Electronics – komplette elektronische Baugruppen aus einer Hand.
    Von der bestückten Leiterplatte zur fertigen Baugruppe: CME übernimmt alle Schritte nach der Leiterplattenbestückung. Gehäusemontage, Verkabelung, Verguss, Schutzlackierung und Endmontage.
    Verguss und Schutzlackierung: Verguss mit PU, Epoxid oder Silikon für Schutz gegen Feuchtigkeit, Vibration und Chemikalien. Conformal Coating (Schutzlack) per Sprühen oder selektivem Auftrag mit UV-Inspektion.
    Kabelkonfektionierung: Kundenspezifische Kabelbäume und Steckverbindungen. Crimpkontakte, Lötverbindungen und Ultraschallschweißen. Prüfung mit Durchgangstester und Hochspannungsprüfung.
    Endmontage: Komplette Gerätemontage inklusive Gehäuse, Bedienelemente, Displays und Beschriftung. Funktionstest und Verpackung nach Kundenspezifikation.
    Traceability: Jede Baugruppe ist lückenlos rückverfolgbar vom Wareneingang bis zum Versand. Alle Fertigungsgeräte sind in einer zentralen MES-Datenbank vernetzt.`,
  },
  '/fertigung/qualitaet': {
    enPath: '/en/manufacturing/quality',
    title: 'Qualitätssicherung | CME',
    description: 'Qualitätssicherung in der Elektronikfertigung. AOI, MOI, IPC-Standards, ISO 9001, ISO 14001.',
    h1: 'Qualitätssicherung',
    keywords: 'Qualitätssicherung, AOI, MOI, IPC, ISO 9001, ISO 14001, Qualitätsmanagement',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Fertigung', url: '/fertigung/' },
      { name: 'Qualitätssicherung', url: '/fertigung/qualitaet/' },
    ],
    content: `Qualitätssicherung in der Elektronikfertigung bei CME Control Motion Electronics – zertifiziert nach ISO 9001 und ISO 14001.
    Automatische Optische Inspektion (AOI): 100-Prozent-Prüfung nach jedem Lötprozess. Erkennung von Lötfehlern, fehlenden oder verdrehten Bauteilen, Brücken und kalten Lötstellen. Statistische Auswertung für kontinuierliche Prozessverbesserung.
    Manuelle Optische Inspektion (MOI): Prüfung durch IPC-A-610-zertifizierte Inspektoren. Bewertung nach IPC-A-610 Klasse 2 und Klasse 3. Dokumentation mit Mikroskop-Aufnahmen.
    Lotpasteninspektion (SPI): 3D-Vermessung des Lotpastendrucks vor der Bestückung. Volumen-, Höhen- und Positionskontrolle jedes Pads.
    Funktionstest: End-of-Line-Prüfung aller Serieneinheiten. Kundenspezifische Testadapter und Prüfprogramme. In-Circuit-Test (ICT) und Flying-Probe-Test.
    Zertifizierungen: ISO 9001:2015 (Qualitätsmanagement), ISO 14001:2015 (Umweltmanagement). Fertigung nach IPC-A-610 und IPC J-STD-001. IATF 16949 für Automotive-Projekte.
    Traceability: Lückenlose Rückverfolgbarkeit jeder Baugruppe. Chargen-Tracking, Serien-Tracking und Bauteil-Tracking. MES-gestützte Dokumentation aller Fertigungsschritte.`,
  },
  '/fertigung/smd-bestueckung': {
    enPath: '/en/manufacturing/smd-assembly',
    title: 'SMD-Bestückung Deutschland – Elektronik Bestücker aus NRW | CME',
    description: 'SMD-Bestückung in Deutschland: Ihr Elektronik Bestücker aus NRW. Hochpräzise Leiterplattenbestückung vom Prototyp bis zur Großserie – CME Control Motion Electronics Dortmund.',
    h1: 'SMD-Bestückung Deutschland – Elektronik Bestücker aus NRW',
    keywords: 'SMD-Bestückung, Elektronik Bestücker Deutschland, Leiterplattenbestückung NRW, EMS-Dienstleister, Dampfphasenlöten, Leistungselektronik Bestückung',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Fertigung', url: '/fertigung/' },
      { name: 'SMD-Bestückung', url: '/fertigung/smd-bestueckung/' },
    ],
    content: `Hochpräzise SMD-Bestückung vom Prototyp bis zur Großserie bei CME Control Motion Electronics – Ihr Elektronik Bestücker in Deutschland mit Standort Dortmund, Nordrhein-Westfalen.
    CME ist ein EMS-Dienstleister (Electronic Manufacturing Services) mit eigener Elektronikentwicklung. Das bedeutet: Entwicklung und Fertigung unter einem Dach. Direkte Rückkopplung zwischen Layout-Ingenieur und Fertigungslinie – keine Schnittstellenverluste, keine Iterationsschleifen zwischen verschiedenen Unternehmen.
    SMD-Bauformen und Technologien: Bestückung aller gängigen SMD-Packages von 01005 (0,4 x 0,2 mm) bis zu großen BGA mit über 1000 Balls. QFN, DFN, LGA, CSP, SOP, MELF – bis 0,4 mm Pitch. Hochstrom-Packages für Leistungselektronik: SiC-MOSFETs, GaN-HEMTs, IGBT-Module, Leistungsdioden.
    Lötverfahren: Reflow-Löten (Konvektion) für Standard-SMD. Dampfphasenlöten (Vapor Phase) für Leistungselektronik – gleichmäßige Wärmeübertragung, minimale Voids unter Thermal Pads, kein Überhitzen empfindlicher Bauteile. Selektivlöten für gemischte SMD/THT-Baugruppen.
    Qualitätssicherung: Lotpasteninspektion (SPI) vor der Bestückung – 3D-Volumenmessung jedes Pads. 100-Prozent-AOI nach jedem Lötprozess. Manuelle Optische Inspektion (MOI) durch IPC-A-610-zertifizierte Prüfer. Zertifiziert nach ISO 9001:2015.
    Warum CME als Elektronik Bestücker wählen? Über 15 Jahre Erfahrung in der Bestückung thermisch anspruchsvoller Baugruppen. Spezialisierung auf Leistungselektronik, Antriebselektronik und Mechatronik. Standort Deutschland (NRW) – kurze Wege, IP-Schutz nach EU-Recht, keine Zollproblematik. EMS-neutral: Sie entscheiden, ob CME nur fertigt, nur entwickelt oder beides übernimmt.
    Flexible Losgrößen: Prototypen ab 1 Stück mit Express-Option. Kleinserien von 10 bis 500 Stück. Serienproduktion mit mehreren tausend Baugruppen pro Monat. Skalierung ohne Lieferantenwechsel.`,
    schemas: [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Was kostet SMD-Bestückung bei CME?', acceptedAnswer: { '@type': 'Answer', text: 'Die Kosten hängen von Stückzahl, Bauteilanzahl und Komplexität ab. Für eine verbindliche Kalkulation benötigen wir Gerber-Daten, Stückliste (BOM) und gewünschte Stückzahl. Prototypen starten im niedrigen dreistelligen Bereich pro Baugruppe, Serienpreise sinken mit steigender Stückzahl deutlich.' }},
        { '@type': 'Question', name: 'Wie schnell kann CME SMD-Baugruppen bestücken?', acceptedAnswer: { '@type': 'Answer', text: 'Bei Bauteilbereitschaft bestücken wir Prototypen innerhalb von 3–5 Arbeitstagen. Express-Fertigung nach Absprache möglich. Serienaufträge werden nach vereinbartem Lieferplan termingerecht abgewickelt.' }},
        { '@type': 'Question', name: 'Welche minimale Baugröße kann CME bestücken?', acceptedAnswer: { '@type': 'Answer', text: 'Wir bestücken SMD-Bauteile ab Baugröße 01005 (0,4 x 0,2 mm) und BGA mit 0,4 mm Pitch. Für Leistungselektronik verarbeiten wir SiC- und GaN-Packages mit Dampfphasenlöten.' }},
        { '@type': 'Question', name: 'Was ist der Vorteil von Dampfphasenlöten gegenüber Reflow?', acceptedAnswer: { '@type': 'Answer', text: 'Dampfphasenlöten (Vapor Phase) bietet eine gleichmäßigere Wärmeübertragung als konventionelles Reflow-Löten. Die maximale Temperatur ist physikalisch begrenzt (Siedepunkt des Mediums), was Überhitzung verhindert. Besonders vorteilhaft bei Leistungselektronik: minimale Voids unter Thermal Pads für optimale Wärmeableitung.' }},
      ],
    }],
  },
  '/fertigung/prototypen': {
    enPath: '/en/manufacturing/prototypes',
    title: 'Elektronik-Prototypen fertigen lassen – Express aus Dortmund | CME',
    description: 'Elektronik-Prototypen fertigen lassen: Express-Bestückung ab Einzelstück in Dortmund. Serienidentischer Prozess, DFM-Feedback und nahtloser Übergang zur Serie.',
    h1: 'Elektronik-Prototypen fertigen lassen – Express aus Dortmund',
    keywords: 'Elektronik Prototypen fertigen lassen, Express-Prototypenfertigung, Prototypenbestückung, DFM, Vorserie, Leistungselektronik Prototypen',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Fertigung', url: '/fertigung/' },
      { name: 'Prototypen', url: '/fertigung/prototypen/' },
    ],
    content: `Express-Prototypenfertigung ab Einzelstück mit serienidentischem Prozess bei CME Control Motion Electronics in Dortmund.
    Warum Prototypen bei CME fertigen lassen? Bei CME durchlaufen Prototypen denselben Fertigungsprozess wie die spätere Serie: gleiche Maschinen, gleiche Lötprofile, gleiche Qualitätsprüfung. Das bedeutet: Ihre Prototypen sind serienrepräsentativ – keine bösen Überraschungen beim Serienanlauf.
    DFM-Feedback vor Fertigung: Bevor wir bestücken, prüfen unsere Fertigungsingenieure Ihre Unterlagen auf Fertigbarkeit (Design for Manufacturing). Typische Rückmeldungen: Pad-Geometrien, Lötstoppmaske, Bauteilabstände, Thermal-Relief-Gestaltung. Bei CME-eigenen Entwicklungen erfolgt dieses Feedback bereits während des Layouts – ein entscheidender Vorteil der integrierten Entwicklung und Fertigung.
    Leistungselektronik-Prototypen: Besondere Expertise bei thermisch anspruchsvollen Prototypen. SiC-MOSFETs, GaN-HEMTs und IGBT-Module mit Dampfphasenlöten für minimale Voids. Thermische Vermessung und Validierung am Prototyp.
    Turnaround: Bei Bauteilbereitschaft bestücken wir Prototypen innerhalb von 3–5 Arbeitstagen. Express-Option nach Absprache. Bauteilbeschaffung übernehmen wir bei Bedarf.
    Vom Prototyp zur Serie: Nahtloser Übergang ohne Lieferantenwechsel. Keine erneute Einrichtung, keine neuen Freigabeschleifen. Skalierung von 1 Stück auf tausende pro Monat am gleichen Standort.
    Fertigungsunterlagen: Gerber-Daten (oder ODB++), Stückliste (BOM) mit Herstellerteilenummern, Bestückungsplan (Pick-and-Place-Daten). Bei unvollständigen Unterlagen unterstützen wir bei der Aufbereitung.`,
    schemas: [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Wie schnell kann CME Elektronik-Prototypen fertigen?', acceptedAnswer: { '@type': 'Answer', text: 'Bei Bauteilbereitschaft bestücken und löten wir Prototypen innerhalb von 3–5 Arbeitstagen. Express-Fertigung nach Absprache möglich. Die Bauteilbeschaffung kann zusätzliche Zeit in Anspruch nehmen.' }},
        { '@type': 'Question', name: 'Was kostet ein Elektronik-Prototyp bei CME?', acceptedAnswer: { '@type': 'Answer', text: 'Die Kosten hängen von Bauteilanzahl, Komplexität und Lötverfahren ab. Einfache Prototypen starten im niedrigen dreistelligen Bereich. Für eine verbindliche Kalkulation senden Sie uns Gerber-Daten und Stückliste.' }},
        { '@type': 'Question', name: 'Sind CME-Prototypen serienidentisch?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Prototypen durchlaufen bei CME denselben Fertigungsprozess wie die spätere Serie: gleiche Bestückungsautomaten, gleiche Lötprofile, gleiche AOI-Prüfung. Das stellt sicher, dass Ihre Prototypen die Serie repräsentieren.' }},
      ],
    }],
  },
  '/lifecycle': {
    enPath: '/en/lifecycle',
    title: 'Lifecycle & Obsolescence Management | CME',
    description: 'Obsolescence Management & Elektronik-Lifecycle: CME sichert Ihre Produktion auch wenn Bauteile abgekündigt werden. Langzeitverfügbarkeit für Industrie & Automotive.',
    h1: 'Lifecycle Management & Reparatur',
    keywords: 'Lifecycle Management, Obsoleszenz-Management, Redesign, Reparatur, Instandsetzung, Ersatzteilmanagement',
    content: `Lifecycle Management für elektronische Systeme: Obsoleszenz-Management, Redesign, Reparatur und Instandsetzung.`,
  },
  '/maerkte': {
    enPath: '/en/markets',
    title: 'Zielmärkte & Branchen | CME',
    description: 'CME bedient Automotive, E-Mobilität, Industrieautomation, Medizintechnik, Energietechnik und Luft- & Raumfahrt.',
    h1: 'Zielmärkte & Branchen',
    keywords: 'Automotive, E-Mobilität, Industrieautomation, Medizintechnik, Energietechnik, Luft- und Raumfahrt',
    content: `CME bedient vielfältige Branchen: Automotive und E-Mobilität, Industrieautomation und Maschinenbau, Medizintechnik, Energietechnik, Luft- und Raumfahrt, Sicherheitstechnik.`,
  },
  '/unternehmen': {
    enPath: '/en/company',
    title: 'Über CME – Unternehmen | CME',
    description: 'CME Control Motion Electronics GmbH – Über 60 Mitarbeiter, Standort Dortmund, zertifiziert nach ISO 9001 und IATF 16949.',
    h1: 'Über CME Control Motion Electronics',
    keywords: 'CME, Unternehmen, Dortmund, ISO 9001, IATF 16949, Elektronikentwicklung, EMS-Fertigung',
    content: `CME Control Motion Electronics GmbH – Über 60 Mitarbeiter am Standort Dortmund. Zertifiziert nach ISO 9001 und IATF 16949. Entwicklung und Fertigung unter einem Dach.`,
  },
  '/kontakt': {
    enPath: '/en/contact',
    title: 'Kontakt & Anfahrt | CME Dortmund',
    description: 'Kontakt zu CME Control Motion Electronics in Dortmund. Elektronikentwicklung & EMS-Fertigung – Beratung, Projektanfrage oder Besuch vor Ort. Antwort innerhalb 24\u00a0h.',
    h1: 'Kontakt',
    keywords: 'Kontakt, Anfrage, Beratung, CME, Dortmund, Elektronikentwicklung',
    content: `Kontaktieren Sie CME Control Motion Electronics GmbH. Beratungsgespräch, Projektanfrage oder NDA-Anforderung. Alter Hellweg 48, 44379 Dortmund.`,
  },
  '/karriere': {
    enPath: '/en/careers',
    title: 'Karriere bei CME | CME',
    description: 'Karriere bei CME Control Motion Electronics. Stellenangebote in Elektronikentwicklung und EMS-Fertigung.',
    h1: 'Karriere bei CME',
    keywords: 'Karriere, Stellenangebote, Jobs, Elektronikentwicklung, EMS-Fertigung, Dortmund',
    content: `Karriere bei CME Control Motion Electronics. Stellenangebote in Elektronikentwicklung und EMS-Fertigung am Standort Dortmund.`,
  },
  '/insights': {
    enPath: '/en/insights',
    title: 'Engineering Insights – Fachartikel von Matthias Markmann | CME',
    description: 'Fachartikel und Engineering Insights von Matthias Markmann (Dipl.-Ing.) zu Leistungselektronik, Thermal Management, Simulation und Obsoleszenzmanagement.',
    h1: 'Engineering Insights',
    keywords: 'Fachartikel, Engineering Insights, Matthias Markmann, Leistungselektronik, Thermal Management, Simulation, Obsoleszenzmanagement',
    breadcrumbs: [
      { name: 'Startseite', url: '/' },
      { name: 'Engineering Insights', url: '/insights/' },
    ],
    content: `Engineering Insights – Fachartikel und technische Einblicke von Matthias Markmann, Dipl.-Ing. (FH) und Geschäftsführer der CME Control Motion Electronics GmbH.
    Matthias Markmann teilt hier sein Expertenwissen aus über 15 Jahren Praxis in der Entwicklung und Fertigung von Leistungselektronik, Antriebstechnik und thermisch anspruchsvollen Systemen.
    Schwerpunktthemen: Thermal Management in der Leistungselektronik – Simulation, Auslegung und Validierung von Kühlkonzepten. Obsoleszenzmanagement – Strategien für Langzeitverfügbarkeit elektronischer Baugruppen. Entwicklungsmethodik – V-Modell, modellbasierte Entwicklung, Hardware-Software-Co-Design. Fertigungstechnologie – Dampfphasenlöten, SiC/GaN-Verarbeitung, Qualitätssicherung.
    Über den Autor: Matthias Markmann ist Gesellschafter und Geschäftsführer der CME Control Motion Electronics GmbH in Dortmund. Als Diplom-Ingenieur (FH) der Elektrotechnik verantwortet er die technische Strategie und Projektleitung komplexer Elektronikprojekte für Automotive, Industrieautomation, Medizintechnik und Energietechnik.`,
    schemas: [{
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Matthias Markmann',
      jobTitle: 'Geschäftsführer',
      honorificPrefix: 'Dipl.-Ing. (FH)',
      url: 'https://control-motion.de/unternehmen/',
      worksFor: {
        '@type': 'Organization',
        name: 'CME Control Motion Electronics GmbH',
        url: 'https://control-motion.de/',
      },
      knowsAbout: ['Elektronikentwicklung', 'Leistungselektronik', 'Thermal Management', 'Simulation', 'Obsoleszenzmanagement', 'Antriebselektronik', 'EMS-Fertigung', 'Mechatronik'],
      address: { '@type': 'PostalAddress', addressLocality: 'Dortmund', addressCountry: 'DE' },
    }],
  },
  '/impressum': {
    title: 'Impressum | CME',
    description: 'Impressum der CME Control Motion Electronics GmbH.',
    h1: 'Impressum',
    keywords: 'Impressum, CME, Control Motion Electronics',
    content: `Impressum der CME Control Motion Electronics GmbH. Alter Hellweg 48, 44379 Dortmund.`,
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

function generate404Html(path: string): string {
  const isEN = path.startsWith('/en/');
  const title = isEN ? 'Page Not Found | CME' : 'Seite nicht gefunden | CME';
  const h1 = isEN ? 'Page Not Found' : 'Seite nicht gefunden';
  const desc = isEN
    ? 'The requested page was not found. Use the navigation or return to the homepage.'
    : 'Die angeforderte Seite wurde nicht gefunden. Nutzen Sie die Navigation oder kehren Sie zur Startseite zur\u00fcck.';
  return `<!DOCTYPE html>
<html lang="${isEN ? 'en' : 'de'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta name="robots" content="noindex, nofollow">
</head>
<body>
    <header><nav>
      <a href="/">Startseite</a>
      <a href="/entwicklung">Entwicklung</a>
      <a href="/fertigung">Fertigung</a>
      <a href="/kontakt">Kontakt</a>
    </nav></header>
    <main><h1>${h1}</h1><p>${desc}</p></main>
    <footer><p>&copy; ${new Date().getFullYear()} ${escapeHtml(SITE_NAME)}.</p></footer>
</body>
</html>`;
}

function generateCrawlerHtml(path: string, page: PageMeta, isEnglish = false, dePath?: string): string {
  // Trailing slash for all URLs (except root which already has it)
  const trailingPath = path === '/' ? '/' : path + '/';
  const canonicalUrl = `${BASE_URL}${trailingPath}`;
  const ogImage = DEFAULT_OG_IMAGE;
  // For hreflang: always resolve both DE and EN URLs correctly
  const deTrailing = isEnglish && dePath ? (dePath === '/' ? '/' : dePath + '/') : trailingPath;
  const deUrl = `${BASE_URL}${deTrailing}`;
  const enUrl = page.enPath ? `${BASE_URL}${page.enPath}/` : '';

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
<html lang="${isEnglish ? 'en' : 'de'}">
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
    <meta property="og:locale" content="${isEnglish ? 'en_US' : 'de_DE'}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${ogImage}">
    
    <!-- Date metadata for AI citation -->
    <meta property="article:published_time" content="2024-03-01T00:00:00+01:00">
    <meta property="article:modified_time" content="${new Date().toISOString().split('T')[0]}T00:00:00+02:00">
    
    <!-- hreflang -->
    <link rel="alternate" hreflang="de" href="${deUrl}">
    ${enUrl ? `<link rel="alternate" hreflang="en" href="${enUrl}">` : ''}
    <link rel="alternate" hreflang="x-default" href="${deUrl}">
    
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
        Alter Hellweg 48, 44379 Dortmund, Deutschland<br>
        Telefon: +49 231 28 66 76 96-0<br>
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
    // Exact matches
    const LEGACY_REDIRECTS: Record<string, string> = {
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten': '/fertigung/leiterplatten',
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht': '/fertigung/leiterplatten',
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen': '/fertigung/baugruppen',
      '/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm': '/fertigung/qualitaet',
      '/smd-fragen-entwurf': '/fertigung',

      // Sistrix canonical fixes: non-hyphenated variants -> canonical hyphenated URLs
      '/entwicklung/testverifikation': '/entwicklung/test-verifikation',
      '/entwicklung/uxinterfaceengineering': '/entwicklung/ux-interface-engineering',
      '/entwicklung/validierungemv': '/entwicklung/validierung-emv',
      '/entwicklung/emotordesign': '/entwicklung/e-motor-design',
      '/entwicklung/controldesign': '/entwicklung/control-design',
      '/entwicklung/kientwicklung': '/entwicklung/ki-entwicklung',

      '/datenschutzerklaerung': '/datenschutz',
      '/jobs': '/karriere',
      '/ueber-uns': '/unternehmen',
      '/en/jobs': '/en/careers',
    };
    // Wildcard prefix rewrites
    const PREFIX_REWRITES: [string, string][] = [
      ['/elektronikentwicklung', '/entwicklung'],
      ['/elektronikfertigung', '/fertigung'],
      ['/en/electronics-development', '/en/development'],
      ['/en/electronics-manufacturing', '/en/manufacturing'],
    ];

    // 1. Exact match
    const legacyTarget = LEGACY_REDIRECTS[normalizedPath];
    if (legacyTarget) {
      console.log(`[Prerender] 301 legacy redirect: ${normalizedPath} → ${legacyTarget} (crawler: ${userAgent.substring(0, 50)})`);
      res.redirect(301, legacyTarget);
      return;
    }
    // 2. Wildcard prefix match
    for (const [oldPrefix, newPrefix] of PREFIX_REWRITES) {
      if (normalizedPath === oldPrefix || normalizedPath.startsWith(oldPrefix + '/')) {
        const remainder = normalizedPath.slice(oldPrefix.length);
        const target = newPrefix + remainder;
        console.log(`[Prerender] 301 prefix redirect: ${normalizedPath} → ${target} (crawler: ${userAgent.substring(0, 50)})`);
        res.redirect(301, target);
        return;
      }
    }

    let page = PAGES[normalizedPath];
    let servePath = normalizedPath;

    // If not found as a DE page, check if it's an EN path
    if (!page && (normalizedPath === '/en' || normalizedPath.startsWith('/en/'))) {
      // Build reverse lookup: enPath -> dePath
      for (const [dePath, pageMeta] of Object.entries(PAGES)) {
        if (pageMeta.enPath && pageMeta.enPath.replace(/\/$/, '') === normalizedPath) {
          page = pageMeta;
          servePath = dePath;
          break;
        }
      }
    }

    if (!page) {
      // Unknown page – serve a proper 404 response for crawlers
      console.log(`[Prerender] 404 for crawler: ${normalizedPath} (${userAgent.substring(0, 50)})`);
      res.status(404);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Prerendered', 'true');
      res.send(generate404Html(normalizedPath));
      return;
    }

    // Serve pre-rendered HTML
    const isEnglish = normalizedPath === '/en' || normalizedPath.startsWith('/en/');
    console.log(`[Prerender] Serving pre-rendered HTML for ${normalizedPath}${isEnglish ? ' (EN)' : ''} to crawler: ${userAgent.substring(0, 80)}`);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Prerendered', 'true');
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    res.send(generateCrawlerHtml(isEnglish ? normalizedPath : servePath, page, isEnglish, isEnglish ? servePath : undefined));
  };
}
