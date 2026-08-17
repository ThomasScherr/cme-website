/**
 * Shared SEO Page Data
 * 
 * Single source of truth for per-route SEO metadata.
 * Used by:
 * - prerenderMiddleware (full crawler HTML)
 * - vite.ts SPA fallback (initial <head> tag injection for browsers)
 *
 * Die englischen Pfade stehen NICHT hier, sondern in shared/routes.ts – dieselbe
 * Liste benutzt der Router. Hier stehen nur die englischen Titel und
 * Beschreibungen.
 */

import { DE_TO_EN, EN_TO_DE, normalizePath } from '@shared/routes';

export const BASE_URL = 'https://control-motion.de';
export const SITE_NAME = 'CME Control Motion Electronics GmbH';
export const DEFAULT_OG_IMAGE = 'https://ventspire-cdn.b-cdn.net/cme/oLXUMurRnSFSIHMQ.jpg';

export interface SeoPageMeta {
  title: string;
  description: string;
  keywords: string;
  /** Wird aus shared/routes.ts ergaenzt, nicht von Hand gepflegt. */
  enPath?: string;
  /** English title (for EN route initial HTML) */
  enTitle?: string;
  /** English description (for EN route initial HTML) */
  enDescription?: string;
}

/**
 * Minimal SEO metadata per route – used for injecting correct <head> tags
 * into the SPA shell HTML before React hydrates.
 * 
 * This is NOT the full crawler data (that lives in prerenderMiddleware).
 * This only contains what's needed for the initial HTML <head>.
 *
 * ACHTUNG: Diese Liste entscheidet in vite.ts auch darueber, ob eine URL
 * ueberhaupt existiert (siehe serveStatic: kein Eintrag => HTTP 404).
 * Jede neue Seite MUSS hier eingetragen werden, sonst liefert der Server
 * echten Besuchern 404, waehrend Crawler die Seite ueber die
 * prerenderMiddleware mit Status 200 sehen.
 */
export const SEO_PAGES: Record<string, SeoPageMeta> = {
  '/': {
    title: 'Elektronikentwicklung & EMS-Fertigung in Dortmund NRW | CME GmbH',
    description: 'CME ist Ihr Entwicklungsdienstleister und EMS-Fertigungspartner für Leistungselektronik, Antriebselektronik und Mechatronik. ISO 9001 zertifiziert am Standort Dortmund NRW.',
    keywords: 'Elektronikentwicklung, EMS-Fertigung, Leistungselektronik, Antriebselektronik, Elektronikfertigung Dortmund, thermisches Management',
    enTitle: 'CME Control Motion Electronics GmbH',
    enDescription: 'CME is your partner for electronics development and EMS manufacturing in Dortmund: power electronics, drive electronics and mechatronics.',
  },
  '/elektronikentwicklung': {
    title: 'Elektronikentwicklung Dortmund | CME',
    description: 'CME entwickelt Leistungselektronik, Antriebselektronik und Embedded Systeme in Dortmund. Eigenes EMV-Labor. Direkt zur Serienfertigung. Jetzt Projekt anfragen.',
    keywords: 'Elektronikentwicklung, Leistungselektronik, Antriebselektronik, Embedded Systeme, EMV, Dortmund, EMS, Elektronik Bestücker',
  },
  '/elektronikentwicklung-muenchen': {
    title: 'Elektronikentwicklung München | Leistungselektronik & Thermal Management | CME',
    description: 'CME entwickelt Leistungselektronik, Antriebselektronik und thermisch anspruchsvolle Baugruppen für Unternehmen im Raum München. Eigene EMS-Fertigung. Jetzt Projekt besprechen.',
    keywords: 'Elektronikentwicklung München, Leistungselektronik München, Entwicklungsdienstleister München, EMS München, Thermal Management, Antriebselektronik, externe Elektronikentwicklung',
  },
  '/entwicklung': {
    title: 'Elektronikentwicklung Leistungselektronik | CME',
    description: 'CME entwickelt Hardware, Software und digitale Systeme für Leistungselektronik, Antriebselektronik, Mechatronik und thermische Projekte.',
    keywords: 'Elektronikentwicklung, Hardware-Entwicklung, Software-Entwicklung, Simulation, EMV, E-Motor-Design, Bare-Die-Design, Keramiksubstrate, LoRaWAN, Zigbee, Regelungstechnik, V-Modell',
    enTitle: 'Electronics Development Dortmund | CME',
    enDescription: 'From concept to series-ready electronics: hardware, software, e-motor design & simulation from a single source. CME Electronics Development Dortmund.',
  },
  '/entwicklung/hardware-software': {
    title: 'Hardware- & Softwareentwicklung | CME Dortmund',
    description: 'Schaltungsentwicklung, PCB-Layout, Embedded Firmware und FPGA-Design. CME entwickelt Ihre Elektronik von der Spezifikation bis zum serienreifen Prototyp.',
    keywords: 'Hardware-Entwicklung, Softwareentwicklung, PCB-Layout, Bare-Die-Design, Keramiksubstrate, LoRaWAN, Zigbee, Embedded Firmware, FPGA, Schaltungsentwicklung',
    enTitle: 'Hardware & Software Development | CME Dortmund',
    enDescription: 'Circuit design, PCB layout, embedded firmware and FPGA design. CME develops your electronics from specification to series-ready prototype.',
  },
  '/entwicklung/simulation': {
    title: 'Simulation & Toolchain | CME Dortmund',
    description: 'Thermische, elektrische und EMV-Simulation mit COMSOL, PLECS, LTspice. CME simuliert Ihre Elektronik vor dem ersten Prototyp.',
    keywords: 'Simulation, thermische Simulation, EMV-Simulation, COMSOL, PLECS, LTspice, Motor-CAD, ANSYS',
    enTitle: 'Simulation & Toolchain Engineering | CME',
    enDescription: 'Thermal, electrical and EMC simulation with COMSOL, PLECS, LTspice. CME simulates your electronics before the first prototype.',
  },
  '/entwicklung/test-verifikation': {
    title: 'Test & Verifikation | CME Dortmund',
    description: 'EMV-Prüfung, Umwelttests, Serienvalidierung nach V-Modell. CME validiert Ihre Elektronik für Zulassung und Serienfertigung.',
    keywords: 'Test, Verifikation, EMV-Prüfung, Umwelttest, Serienvalidierung, V-Modell, Zulassung',
    enTitle: 'Test & Verification | CME Dortmund',
    enDescription: 'EMC testing, environmental tests, series validation according to V-model. CME validates your electronics for certification and series production.',
  },
  '/entwicklung/ux-interface-engineering': {
    title: 'UX & Interface Engineering | CME Dortmund',
    description: 'Benutzeroberflächen für technische Systeme: HMI-Design, Touchscreen-Interfaces, Embedded GUI. CME gestaltet intuitive Bedienkonzepte.',
    keywords: 'UX Design, Interface Engineering, HMI, Touchscreen, Embedded GUI, Bedienkonzept',
    enTitle: 'UX & Interface Design | CME Dortmund',
    enDescription: 'User interfaces for technical systems: HMI design, touchscreen interfaces, embedded GUI. CME designs intuitive operating concepts.',
  },
  '/entwicklung/software-digitale-systeme': {
    title: 'Software & Digitale Systeme | CME Dortmund',
    description: 'Applikationssoftware, IoT-Anbindung, Cloud-Integration und digitale Zwillinge. CME entwickelt Software für vernetzte Elektronikprodukte.',
    keywords: 'Software Engineering, IoT, Cloud-Integration, digitaler Zwilling, Applikationssoftware, vernetzte Systeme',
    enTitle: 'Software & Digital Systems | CME Dortmund',
    enDescription: 'Application software, IoT connectivity, cloud integration and digital twins. CME develops software for connected electronic products.',
  },
  '/entwicklung/e-motor-design': {
    title: 'E-Motor Design | CME Dortmund',
    description: 'Elektromagnetische Auslegung, Motorsteuerung und Antriebselektronik. CME entwickelt E-Motor-Systeme für industrielle Anwendungen.',
    keywords: 'E-Motor Design, Antriebselektronik, Motorsteuerung, elektromagnetische Auslegung, BLDC, PMSM',
    enTitle: 'Electric Motor Design | CME Dortmund',
    enDescription: 'Electromagnetic design, motor control and drive electronics. CME develops e-motor systems for industrial applications.',
  },
  '/entwicklung/control-design': {
    title: 'Control Design & Regelungstechnik | CME Dortmund',
    description: 'Regelungstechnik für Leistungselektronik und Antriebssysteme. CME entwickelt Reglerstrukturen, Zustandsschätzer und modellbasierte Algorithmen.',
    keywords: 'Control Design, Regelungstechnik, Reglerstruktur, Zustandsschätzer, modellbasiert, Leistungselektronik',
    enTitle: 'Control Design & Control Engineering | CME Dortmund',
    enDescription: 'Control engineering for power electronics and drive systems. CME develops controller structures, state estimators and model-based algorithms.',
  },
  '/entwicklung/validierung-emv': {
    title: 'Validierung & EMV | CME Dortmund',
    description: 'EMV-gerechtes Design, Störfestigkeitsprüfung und Zulassungsbegleitung. CME validiert Ihre Elektronik nach internationalen Normen.',
    keywords: 'EMV, Validierung, Störfestigkeit, Zulassung, CE, EMV-gerechtes Design, Normen',
    enTitle: 'Validation & EMC | CME Dortmund',
    enDescription: 'EMC-compliant design, immunity testing and certification support. CME validates your electronics according to international standards.',
  },
  '/entwicklung/ki-entwicklung': {
    title: 'KI-gestützte Entwicklung | CME Dortmund',
    description: 'KI und Machine Learning für industrielle Elektronik: Predictive Maintenance, Anomalieerkennung, Edge AI. CME integriert KI in Ihre Produkte.',
    keywords: 'KI, Machine Learning, Edge AI, Predictive Maintenance, Anomalieerkennung, industrielle KI',
    enTitle: 'AI-Powered Development | CME Dortmund',
    enDescription: 'AI and machine learning for industrial electronics: predictive maintenance, anomaly detection, edge AI. CME integrates AI into your products.',
  },
  '/fertigung': {
    title: 'EMS-Fertigung & Elektronikfertigung Dortmund | CME',
    description: 'SMD- und THT-Bestückung, Prototypen- und Serienfertigung, Baugruppenmontage. CME EMS-Fertigung Dortmund – ISO 9001 zertifiziert.',
    keywords: 'EMS-Fertigung, Elektronikfertigung, SMD-Bestückung, THT-Bestückung, Baugruppenfertigung, Prototypenfertigung, Dortmund',
    enTitle: 'EMS Manufacturing & Electronics Production Dortmund | CME',
    enDescription: 'SMD and THT assembly, prototype and series production, assembly manufacturing. CME EMS manufacturing Dortmund – ISO 9001 certified.',
  },
  '/fertigung/leiterplatten': {
    title: 'Leiterplatten bestücken – SMD & THT | CME Dortmund',
    description: 'Professionelle Leiterplattenbestückung: SMD, THT, Mischbestückung. Vom Prototyp bis zur Großserie. CME Elektronikfertigung Dortmund.',
    keywords: 'Leiterplatten bestücken, SMD-Bestückung, THT-Bestückung, Mischbestückung, Prototyp, Serie',
    enTitle: 'PCB Assembly – SMD & THT | CME Dortmund',
    enDescription: 'Professional PCB assembly: SMD, THT, mixed assembly. From prototype to high-volume series. CME electronics manufacturing Dortmund.',
  },
  '/fertigung/baugruppen': {
    title: 'Baugruppen fertigen & Systemmontage | CME Dortmund',
    description: 'Baugruppenmontage, Verguss, Conformal Coating und Systemintegration. CME fertigt komplette elektronische Baugruppen.',
    keywords: 'Baugruppenfertigung, Systemmontage, Verguss, Conformal Coating, Systemintegration, Elektronik',
    enTitle: 'Assembly Manufacturing & System Integration | CME Dortmund',
    enDescription: 'Assembly manufacturing, potting, conformal coating and system integration. CME produces complete electronic assemblies.',
  },
  '/fertigung/qualitaet': {
    title: 'Qualitätsmanagement & Prüftechnik | CME Dortmund',
    description: 'AOI, ICT, Funktionstest und lückenlose Traceability. CME Qualitätssicherung für elektronische Baugruppen – ISO 9001 zertifiziert.',
    keywords: 'Qualitätsmanagement, AOI, ICT, Funktionstest, Traceability, ISO 9001, Prüftechnik',
    enTitle: 'Quality Management & Testing | CME Dortmund',
    enDescription: 'AOI, ICT, functional testing and full traceability. CME quality assurance for electronic assemblies – ISO 9001 certified.',
  },
  '/fertigung/smd-bestueckung': {
    title: 'SMD-Bestückung Deutschland | EMS NRW | CME',
    description: 'SMD-Bestückung in Deutschland: Ihr Elektronik Bestücker aus NRW. Hochpräzise Leiterplattenbestückung vom Prototyp bis zur Großserie – CME Dortmund.',
    keywords: 'SMD-Bestückung, Elektronik Bestücker Deutschland, Leiterplattenbestückung, EMS-Dienstleister NRW, Dampfphasenlöten, Leistungselektronik Bestückung',
    enTitle: 'SMD Assembly Germany | EMS NRW | CME',
    enDescription: 'SMD assembly in Germany: Your electronics manufacturer from NRW. High-precision PCB assembly from prototype to high-volume series – CME Dortmund.',
  },
  '/fertigung/prototypen': {
    title: 'Elektronik-Prototypen Express | CME Dortmund',
    description: 'Elektronik-Prototypen fertigen lassen: Express-Bestückung ab Einzelstück in Dortmund. Serienidentischer Prozess, DFM-Feedback und nahtloser Übergang zur Serie.',
    keywords: 'Elektronik Prototypen fertigen lassen, Express-Prototypenfertigung, Prototypenbestückung, DFM, Vorserie, Leistungselektronik Prototypen',
    enTitle: 'Electronics Prototypes Express | CME Dortmund',
    enDescription: 'Electronics prototype manufacturing: Express assembly from single units in Dortmund. Series-identical process, DFM feedback and seamless transition to series.',
  },
  '/lifecycle': {
    title: 'Lifecycle Services & Reparatur | CME Dortmund',
    description: 'Obsoleszenzmanagement, Redesign, Ersatzteilstrategien und Reparaturservice. CME begleitet Ihre Elektronik über den gesamten Lebenszyklus.',
    keywords: 'Lifecycle Services, Reparatur, Obsoleszenzmanagement, Redesign, Ersatzteile, Elektronik-Reparatur',
    enTitle: 'Lifecycle Services & Repair | CME Dortmund',
    enDescription: 'Obsolescence management, redesign, spare parts strategies and repair service. CME supports your electronics throughout the entire lifecycle.',
  },
  '/maerkte': {
    title: 'Märkte & Anwendungen | CME Dortmund',
    description: 'Elektronikentwicklung und EMS-Fertigung für Automotive, Industrieautomation, Medizintechnik, Gebäudetechnik und Antriebstechnik.',
    keywords: 'Automotive, Industrieautomation, Medizintechnik, Gebäudetechnik, Antriebstechnik, Leistungselektronik',
    enTitle: 'Markets & Applications | CME Dortmund',
    enDescription: 'Electronics development and EMS manufacturing for automotive, industrial automation, medical technology, building technology and drive technology.',
  },
  '/unternehmen': {
    title: 'Über CME – Elektronikentwicklung & Fertigung Dortmund',
    description: 'Seit 2008 entwickelt und fertigt CME komplexe Elektronik in Dortmund. Über 60 Mitarbeiter, ISO 9001 zertifiziert. Entwicklung und Fertigung unter einem Dach.',
    keywords: 'CME, Unternehmen, Dortmund, Elektronikentwicklung, EMS-Fertigung, ISO 9001, Team',
    enTitle: 'About CME – Electronics Development & Manufacturing Dortmund',
    enDescription: 'Since 2008, CME develops and manufactures complex electronics in Dortmund. 60+ employees, ISO 9001. Development and manufacturing under one roof.',
  },
  '/kontakt': {
    title: 'Kontakt | CME Control Motion Electronics',
    description: 'Kontaktieren Sie CME für Ihre Elektronikentwicklung oder EMS-Fertigung. Alter Hellweg 48, 44379 Dortmund. Jetzt Anfrage stellen.',
    keywords: 'Kontakt, CME, Dortmund, Anfrage, Elektronikentwicklung, EMS-Fertigung',
    enTitle: 'Contact | CME Control Motion Electronics',
    enDescription: 'Contact CME for your electronics development or EMS manufacturing. Alter Hellweg 48, 44379 Dortmund, Germany. Submit your inquiry now.',
  },
  '/karriere': {
    title: 'Karriere bei CME | Jobs in der Elektronikentwicklung',
    description: 'Karriere bei CME in Dortmund: Offene Stellen in Elektronikentwicklung, EMS-Fertigung und Projektmanagement. Jetzt bewerben.',
    keywords: 'Karriere, Jobs, Elektronikentwicklung, EMS-Fertigung, Dortmund, Stellenangebote',
    enTitle: 'Careers at CME | Jobs in Electronics Development',
    enDescription: 'Careers at CME in Dortmund: Open positions in electronics development, EMS manufacturing and project management. Apply now.',
  },
  '/insights': {
    title: 'Insights & Fachwissen | CME Dortmund',
    description: 'Fachartikel, Technologie-Insights und Branchenwissen rund um Elektronikentwicklung, EMS-Fertigung und Leistungselektronik.',
    keywords: 'Insights, Fachartikel, Elektronikentwicklung, EMS-Fertigung, Leistungselektronik, Technologie',
    enTitle: 'Insights & Expertise | CME Dortmund',
    enDescription: 'Technical articles, technology insights and industry knowledge about electronics development, EMS manufacturing and power electronics.',
  },
  '/impressum': {
    title: 'Impressum | CME Control Motion Electronics GmbH',
    description: 'Impressum der CME Control Motion Electronics GmbH, Alter Hellweg 48, 44379 Dortmund.',
    keywords: 'Impressum, CME, Dortmund',
    enTitle: 'Legal Notice | CME Control Motion Electronics GmbH',
    enDescription: 'Legal notice of CME Control Motion Electronics GmbH in Dortmund. Information per § 5 TMG, trade register and contact details.',
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung | CME Control Motion Electronics',
    description: 'Datenschutzerklärung der CME Control Motion Electronics GmbH. Informationen zum Umgang mit Ihren personenbezogenen Daten.',
    keywords: 'Datenschutz, DSGVO, personenbezogene Daten, CME',
    enTitle: 'Privacy Policy | CME Control Motion Electronics',
    enDescription: 'Privacy policy of CME Control Motion Electronics GmbH in accordance with GDPR. Information on data processing, cookies and your rights.',
  },
  '/agb': {
    title: 'AGB | CME Control Motion Electronics GmbH',
    description: 'Allgemeine Geschäftsbedingungen der CME Control Motion Electronics GmbH.',
    keywords: 'AGB, Geschäftsbedingungen, CME',
    enTitle: 'Terms and Conditions | CME Control Motion Electronics GmbH',
    enDescription: 'General terms and conditions of CME Control Motion Electronics GmbH for electronics development and EMS manufacturing services.',
  },
  '/media-center': {
    title: 'Media-Center | CME Control Motion Electronics',
    description: 'Presse- und Materialbereich der CME Control Motion Electronics GmbH. Logos, Pressefotos, Boilerplate-Texte, Factsheet und Designvorgaben zum Download.',
    keywords: 'Media Center, Presse, Logos, Download, CME, Pressefotos, Boilerplate',
  },
};

// Englische Pfade aus der gemeinsamen Zuordnung nachtragen, damit sie nur an
// einer Stelle gepflegt werden.
for (const [dePath, meta] of Object.entries(SEO_PAGES)) {
  const enPath = DE_TO_EN[dePath];
  if (enPath) meta.enPath = enPath;
}

/**
 * Look up SEO metadata for a given path (DE or EN).
 * Returns the metadata and whether it's an EN path.
 */
export function lookupSeoMeta(path: string): { meta: SeoPageMeta | null; isEnglish: boolean; dePath: string } {
  const normalized = normalizePath(path);

  // Direct DE lookup
  const deMeta = SEO_PAGES[normalized];
  if (deMeta) {
    return { meta: deMeta, isEnglish: false, dePath: normalized };
  }

  // EN reverse lookup
  const dePathFromEn = EN_TO_DE[normalized];
  if (dePathFromEn) {
    return { meta: SEO_PAGES[dePathFromEn], isEnglish: true, dePath: dePathFromEn };
  }

  return { meta: null, isEnglish: false, dePath: normalized };
}
