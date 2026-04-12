/**
 * Content Definitions – All pages, sections, and fields with their actual default values.
 * These defaults mirror the hardcoded content in page components so the CMS shows real values.
 */

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

// ── Types ──────────────────────────────────────────────────────────

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'richtext' | 'image' | 'video';
  defaultDe?: string;
  defaultEn?: string;
}

export interface SectionDef {
  key: string;
  label: string;
  fields: FieldDef[];
}

export interface PageDef {
  key: string;
  label: string;
  path: string;
  sections: SectionDef[];
}

// ── Helper ─────────────────────────────────────────────────────────

function featureFields(features: { de: string; en: string }[]): FieldDef[] {
  return features.map((f, i) => ({
    key: `feature.${i}`,
    label: `Feature ${i + 1}`,
    type: 'text' as const,
    defaultDe: f.de,
    defaultEn: f.en,
  }));
}

function cardFields(
  prefix: string,
  cards: { titleDe: string; titleEn: string; subtitleDe?: string; subtitleEn?: string; descDe: string; descEn: string; img?: string; href?: string }[]
): FieldDef[] {
  const fields: FieldDef[] = [];
  cards.forEach((card, i) => {
    fields.push({ key: `${prefix}.${i}.title`, label: `${prefix} ${i + 1} Titel`, type: 'text', defaultDe: card.titleDe, defaultEn: card.titleEn });
    if (card.subtitleDe) {
      fields.push({ key: `${prefix}.${i}.subtitle`, label: `${prefix} ${i + 1} Untertitel`, type: 'text', defaultDe: card.subtitleDe, defaultEn: card.subtitleEn });
    }
    fields.push({ key: `${prefix}.${i}.description`, label: `${prefix} ${i + 1} Beschreibung`, type: 'text', defaultDe: card.descDe, defaultEn: card.descEn });
    if (card.img) {
      fields.push({ key: `${prefix}.${i}.image`, label: `${prefix} ${i + 1} Bild`, type: 'image', defaultDe: card.img, defaultEn: card.img });
    }
  });
  return fields;
}

// ── Page Definitions ───────────────────────────────────────────────

export const PAGES: PageDef[] = [
  // ═══════════════════════════════════════════════════════════════
  // STARTSEITE
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'home',
    label: 'Startseite',
    path: '/',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'videoWebm', label: 'Video (WebM)', type: 'video', defaultDe: `${CDN}/Loop-Sample_d94dc755.webm`, defaultEn: `${CDN}/Loop-Sample_d94dc755.webm` },
          { key: 'videoMp4', label: 'Video (MP4)', type: 'video', defaultDe: `${CDN}/Loop-Sample-compressed_8b0d5332.mp4`, defaultEn: `${CDN}/Loop-Sample-compressed_8b0d5332.mp4` },
          { key: 'videoPoster', label: 'Video-Poster', type: 'image', defaultDe: `${CDN}/hero-video-poster_8c5a9e34.jpg`, defaultEn: `${CDN}/hero-video-poster_8c5a9e34.jpg` },
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'the electronic company', defaultEn: 'the electronic company' },
          { key: 'headline1', label: 'Überschrift Zeile 1', type: 'text', defaultDe: 'Elektronikentwicklung.', defaultEn: 'Electronics Development.' },
          { key: 'headline2', label: 'Überschrift Zeile 2', type: 'text', defaultDe: 'Elektronikfertigung.', defaultEn: 'Electronics Manufacturing.' },
          { key: 'headline3', label: 'Überschrift Zeile 3 (Akzent)', type: 'text', defaultDe: 'Aus einer Hand.', defaultEn: 'From a Single Source.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'Vom ersten Entwurf bis zur Serie – für Leistungselektronik, Antriebstechnik und thermisch anspruchsvolle Projekte.', defaultEn: 'From first concept to series production – for power electronics, drive technology, and thermally demanding projects.' },
          { key: 'ctaLabel', label: 'CTA Button', type: 'text', defaultDe: 'Machbarkeit prüfen lassen', defaultEn: 'Get a feasibility check' },
          { key: 'ctaSecondaryLabel', label: 'Sekundärer Button', type: 'text', defaultDe: 'Leistungen im Überblick', defaultEn: 'View our services' },
        ],
      },
      {
        key: 'stats',
        label: 'Statistiken / Trust-Leiste',
        fields: [
          { key: '0.headline', label: 'Stat 1 Headline', type: 'text', defaultDe: 'Entwicklung & EMS', defaultEn: 'Development & EMS' },
          { key: '0.sub', label: 'Stat 1 Subtext', type: 'text', defaultDe: 'Von der Schaltung bis Serienfertigung', defaultEn: 'From circuit design to series production' },
          { key: '1.headline', label: 'Stat 2 Headline', type: 'text', defaultDe: 'Modular beauftragbar', defaultEn: 'Modular commissioning' },
          { key: '1.sub', label: 'Stat 2 Subtext', type: 'text', defaultDe: 'Entwicklung, Validierung, Simulation, Tests, Electronic Manufacturing Services', defaultEn: 'Development, validation, simulation, testing, electronic manufacturing services' },
          { key: '2.headline', label: 'Stat 3 Headline', type: 'text', defaultDe: 'Design for Manufacturing', defaultEn: 'Design for Manufacturing' },
          { key: '2.sub', label: 'Stat 3 Subtext', type: 'text', defaultDe: 'Produzierbare Designs – mit Übergabe an den Serienfertiger oder Produktion durch uns', defaultEn: 'Producible designs – handover to your manufacturer or production by us' },
          { key: '3.headline', label: 'Stat 4 Headline', type: 'text', defaultDe: 'ISO 9001 & 14001, UL, SPICE, ...', defaultEn: 'ISO 9001 & 14001, UL, SPICE, ...' },
          { key: '3.sub', label: 'Stat 4 Subtext', type: 'text', defaultDe: 'Qualitätsgesicherte Prozesse', defaultEn: 'Quality-assured processes' },
        ],
      },
      {
        key: 'services',
        label: 'Leistungen (3 Säulen)',
        fields: [
          { key: '0.title', label: 'Säule 1 Titel', type: 'text', defaultDe: 'Elektronikentwicklung', defaultEn: 'Electronics Development' },
          { key: '0.description', label: 'Säule 1 Beschreibung', type: 'text', defaultDe: 'Von der Systemarchitektur über Hardware- und Softwareentwicklung bis zur Simulation und EMV-Qualifikation – wir entwickeln Elektronik, die funktioniert.', defaultEn: 'From system architecture through hardware and software development to simulation and EMC qualification – we develop electronics that work.' },
          { key: '0.image', label: 'Säule 1 Bild', type: 'image', defaultDe: `${CDN}/JK_2392__1920px_af02a6b7.jpg`, defaultEn: `${CDN}/JK_2392__1920px_af02a6b7.jpg` },
          { key: '1.title', label: 'Säule 2 Titel', type: 'text', defaultDe: 'Elektronikfertigung (EMS)', defaultEn: 'Electronics Manufacturing (EMS)' },
          { key: '1.description', label: 'Säule 2 Beschreibung', type: 'text', defaultDe: 'SMD- und THT-Bestückung, Baugruppenmontage und Qualitätsprüfung – von der Nullserie bis zur Serienproduktion, ISO-zertifiziert und Made in Dortmund.', defaultEn: 'SMD and THT assembly, module integration and quality inspection – from prototype to series production, ISO-certified and Made in Dortmund.' },
          { key: '1.image', label: 'Säule 2 Bild', type: 'image', defaultDe: `${CDN}/JK_0425__1920px_178fc1eb.jpg`, defaultEn: `${CDN}/JK_0425__1920px_178fc1eb.jpg` },
          { key: '2.title', label: 'Säule 3 Titel', type: 'text', defaultDe: 'Lifecycle & Obsolescence', defaultEn: 'Lifecycle & Obsolescence' },
          { key: '2.description', label: 'Säule 3 Beschreibung', type: 'text', defaultDe: 'Wir sichern den Lebenszyklus Ihrer Elektronikprodukte – von der Obsolescence-Analyse bis zum Redesign und After-Sales-Service.', defaultEn: 'We secure the lifecycle of your electronic products – from obsolescence analysis to redesign and after-sales service.' },
          { key: '2.image', label: 'Säule 3 Bild', type: 'image', defaultDe: `${CDN}/JK_2055__1920px_00c91d17.jpg`, defaultEn: `${CDN}/JK_2055__1920px_00c91d17.jpg` },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ENTWICKLUNG (Hub)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'entwicklung',
    label: 'Entwicklung',
    path: '/entwicklung',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_2392__1920px_af02a6b7.jpg`, defaultEn: `${CDN}/JK_2392__1920px_af02a6b7.jpg` },
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'Elektronikentwicklung', defaultEn: 'Electronics Development' },
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'Von der Idee zur serienreifen Elektronik.', defaultEn: 'From idea to series-ready electronics.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'Wir entwickeln Elektronik, die funktioniert – von der Systemarchitektur über Hardware, Software und Simulation bis zur Qualifikation. Mit Fokus auf Leistungselektronik, Antriebstechnik, E-Motor-Design und thermisch anspruchsvolle Projekte.', defaultEn: 'We develop electronics that work – from system architecture through hardware, software and simulation to qualification. With focus on power electronics, drive technology, e-motor design and thermally demanding projects.' },
        ],
      },
      {
        key: 'competencies',
        label: 'Kompetenzfelder (6 Karten)',
        fields: cardFields('card', [
          { titleDe: 'Hard & Software Design', titleEn: 'Hard & Software Design', subtitleDe: 'Embedded Microcontroller Systeme', subtitleEn: 'Embedded Microcontroller Systems', descDe: 'Hardware-Entwicklung, Schaltungsdesign, Embedded Software und Echtzeitsysteme.', descEn: 'Hardware development, circuit design, embedded software and real-time systems.' },
          { titleDe: 'E-Motor Design', titleEn: 'E-Motor Design', subtitleDe: 'PM-Motor-Design – Laminatkonstruktion und -layout', subtitleEn: 'PM Motor Design – Lamination Construction and Layout', descDe: 'Auslegung permanentmagneterregter Motoren, FEA-basiertes Motordesign mit Motor-CAD/ANSYS.', descEn: 'Design of permanent magnet motors, FEA-based motor design with Motor-CAD/ANSYS.' },
          { titleDe: 'Control Design', titleEn: 'Control Design', subtitleDe: 'Modellbasiertes Reglerdesign · MIL, SIL, HIL', subtitleEn: 'Model-Based Controller Design · MIL, SIL, HIL', descDe: 'Entwicklung und Verifikation von Regelalgorithmen entlang des V-Modells.', descEn: 'Development and verification of control algorithms along the V-model.' },
          { titleDe: 'Simulation', titleEn: 'Simulation', subtitleDe: 'Elektrische, System- und thermische Simulation', subtitleEn: 'Electrical, System and Thermal Simulation', descDe: 'Risikominimierung vor dem Prototypenbau durch MATLAB, COMSOL und SPICE.', descEn: 'Risk minimization before prototype construction using MATLAB, COMSOL and SPICE.' },
          { titleDe: 'Validierung & EMV', titleEn: 'Validation & EMC', subtitleDe: 'Absicherung unter realen Einsatzbedingungen', subtitleEn: 'Validation Under Real Operating Conditions', descDe: 'Leitungsgebundene EMV-Prüfung in eigener Schirmkabine, Umwelt- und Lebensdauertests.', descEn: 'Conducted EMC testing in our own shielded chamber, environmental and lifetime tests.' },
          { titleDe: 'Test & Verification', titleEn: 'Test & Verification', subtitleDe: 'Funktions-, Umwelt- und Lebenszyklustests', subtitleEn: 'Functional, Environmental and Lifecycle Tests', descDe: 'Testautomatisierung und automatische Datenanalyse.', descEn: 'Test automation and automatic data analysis.' },
        ]),
      },
      {
        key: 'coreCompetencies',
        label: 'Kernkompetenzen (16 Punkte)',
        fields: featureFields([
          { de: 'Leistungselektronik (SiC, GaN, IGBT, MOSFET)', en: 'Power Electronics (SiC, GaN, IGBT, MOSFET)' },
          { de: 'Antriebselektronik & Motor Control (FOC, BLDC/PMSM)', en: 'Drive Electronics & Motor Control (FOC, BLDC/PMSM)' },
          { de: 'E-Motor-Design & -Auslegung (FEA, Motor-CAD)', en: 'E-Motor Design & Engineering (FEA, Motor-CAD)' },
          { de: 'Umrichter: Automotive, Ladetechnik, Photovoltaik', en: 'Inverters: Automotive, Charging, Photovoltaics' },
          { de: 'Stromversorgungen: DC/DC, AC/DC, BMS', en: 'Power Supplies: DC/DC, AC/DC, BMS' },
          { de: 'Thermisches Management & Verlustleistungssimulation', en: 'Thermal Management & Power Loss Simulation' },
          { de: 'System-, Antriebs-, Schaltungs- & Thermosimulation', en: 'System, Drive, Circuit & Thermal Simulation' },
          { de: 'EMV-Design, Filterauslegung & Qualifikation', en: 'EMC Design, Filter Layout & Qualification' },
          { de: 'Funktionale Sicherheit (ISO 26262, FuSi)', en: 'Functional Safety (ISO 26262, FuSi)' },
          { de: 'Automotive SPICE (ASPICE)', en: 'Automotive SPICE (ASPICE)' },
          { de: 'Embedded Systems: Firmware, RTOS (C/C++)', en: 'Embedded Systems: Firmware, RTOS (C/C++)' },
          { de: 'Kommunikationsprotokolle: CAN, LIN, SPI, EtherCAT', en: 'Communication Protocols: CAN, LIN, SPI, EtherCAT' },
          { de: 'Sensorik & Signalverarbeitung', en: 'Sensor Technology & Signal Processing' },
          { de: 'Robuste Elektronik für hohe Temperaturen & raue Umgebungen', en: 'Robust Electronics for High Temperatures & Harsh Environments' },
          { de: 'Redesign & Produktoptimierung', en: 'Redesign & Product Optimization' },
          { de: 'UX & Interface Engineering', en: 'UX & Interface Engineering' },
        ]),
      },
      {
        key: 'cta',
        label: 'CTA-Bereich',
        fields: [
          { key: 'headline', label: 'CTA Überschrift', type: 'text', defaultDe: 'Technische Machbarkeit klären – bevor es teuer wird.', defaultEn: 'Clarify technical feasibility – before it gets expensive.' },
          { key: 'description', label: 'CTA Beschreibung', type: 'text', defaultDe: 'Senden Sie uns Ihr Lastenheft oder Ihre Projektskizze. Wir bewerten Aufwand, Risiken und den schnellsten Weg zur Serie.', defaultEn: 'Send us your specification or project outline. We assess effort, risks and the fastest path to series production.' },
          { key: 'buttonLabel', label: 'CTA Button', type: 'text', defaultDe: 'Lastenheft einreichen', defaultEn: 'Submit specification' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ENTWICKLUNG – Unterseiten (SubPageTemplate)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'entwicklung.hardwaresoftware',
    label: 'Entwicklung: Hardware & Software',
    path: '/entwicklung/hardware-software',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_2392__1920px_af02a6b7.jpg`, defaultEn: `${CDN}/JK_2392__1920px_af02a6b7.jpg` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Hard & Software Design', defaultEn: 'Hard & Software Design' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Systemarchitektur, Schaltungsentwicklung, Embedded Software – von der Spezifikation bis zur serienreifen Lösung.', defaultEn: 'System architecture, circuit design, embedded software – from specification to series-ready solution.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'CME entwickelt Hardware und Software als integrierte Einheit. Unsere Ingenieure beherrschen den gesamten Entwicklungsprozess – von der Systemarchitektur und Anforderungsanalyse über analoge und digitale Schaltungsentwicklung bis zur Embedded-Firmware. Durch die enge Verzahnung von Hardware- und Softwareentwicklung fließen Fertigungsanforderungen frühzeitig in die Entwicklungsphase ein – das spart Zeit und Kosten beim Serienübergang.', defaultEn: 'CME develops hardware and software as an integrated unit. Our engineers master the entire development process – from system architecture and requirements analysis through analog and digital circuit design to embedded firmware. Through the close integration of hardware and software development, manufacturing requirements flow into the development phase early – saving time and costs in series transition.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'Systemarchitektur & Anforderungsmanagement', en: 'System Architecture & Requirements Management' },
          { de: 'Analoge & digitale Schaltungsentwicklung', en: 'Analog & Digital Circuit Design' },
          { de: 'Leistungselektronik (SiC, GaN, IGBT)', en: 'Power Electronics (SiC, GaN, IGBT)' },
          { de: 'Antriebselektronik & Motor Control', en: 'Drive Electronics & Motor Control' },
          { de: 'Multi-Layer PCB-Layout', en: 'Multi-Layer PCB Layout' },
          { de: 'Embedded C/C++ Firmware', en: 'Embedded C/C++ Firmware' },
          { de: 'Kommunikationsschnittstellen (CAN, LIN, SPI, Ethernet)', en: 'Communication Interfaces (CAN, LIN, SPI, Ethernet)' },
          { de: 'Funktionale Sicherheit (ISO 26262)', en: 'Functional Safety (ISO 26262)' },
        ]),
      },
    ],
  },
  {
    key: 'entwicklung.emotordesign',
    label: 'Entwicklung: E-Motor Design',
    path: '/entwicklung/e-motor-design',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_1736__1920px_e713f7ca.jpg`, defaultEn: `${CDN}/JK_1736__1920px_e713f7ca.jpg` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'E-Motor Design', defaultEn: 'E-Motor Design' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Auslegung, Berechnung und Optimierung elektrischer Motoren – vom Konzept bis zur serienreifen Lösung.', defaultEn: 'Design, calculation and optimization of electric motors – from concept to series-ready solution.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'CME wählt den richtigen Elektromotor für Ihre Anwendung und optimiert das Design nach Ihren Vorgaben. Unsere Experten berechnen und simulieren Magnetkreise, Blechschnitte und thermische Belastungen – für Motoren mit besonders hohem Wirkungsgrad, auch unter rauen Umgebungsbedingungen und bei hohen Temperaturen. Durch die enge Integration von E-Motor-Design, Leistungselektronik und Regelungstechnik entstehen optimal aufeinander abgestimmte Antriebssysteme.', defaultEn: 'CME selects the right electric motor for your application and optimizes the design according to your specifications. Our experts calculate and simulate magnetic circuits, lamination cuts and thermal loads – for motors with particularly high efficiency, even under harsh environmental conditions and at high temperatures. Through the close integration of e-motor design, power electronics and control engineering, optimally coordinated drive systems are created.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'Auslegung & Design von EC-, DC- und Synchronmaschinen', en: 'Design of EC, DC and synchronous machines' },
          { de: 'Geometrie-Design des Magnetkreises (Rotor & Stator)', en: 'Magnetic circuit geometry design (rotor & stator)' },
          { de: 'Blechschnitt-Konstruktion', en: 'Lamination construction' },
          { de: 'Auslegung für Hochtemperaturanwendungen', en: 'Design for high-temperature applications' },
          { de: 'Elektromagnetische FEM-Simulation (Motor-CAD / ANSYS)', en: 'Electromagnetic FEM simulation (Motor-CAD / ANSYS)' },
          { de: 'Analytische Berechnung & Optimierung', en: 'Analytical calculation & optimization' },
          { de: 'Applikationsspezifische Motorauswahl', en: 'Application-specific motor selection' },
          { de: 'Integration mit Leistungselektronik & Regelung', en: 'Integration with power electronics & control' },
          { de: 'Ansteuerstrategien für EC-Antriebe (Effizienz, Geräusch, Robustheit)', en: 'Drive strategies for EC motors (efficiency, noise, robustness)' },
        ]),
      },
    ],
  },
  {
    key: 'entwicklung.controldesign',
    label: 'Entwicklung: Control Design',
    path: '/entwicklung/control-design',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_2885__1920px_ecd3ed1e.jpg`, defaultEn: `${CDN}/JK_2885__1920px_ecd3ed1e.jpg` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Control Design', defaultEn: 'Control Design' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Modellbasiertes Reglerdesign – Entwicklung und Verifikation von Regelalgorithmen entlang des V-Modells.', defaultEn: 'Model-based controller design – development and verification of control algorithms along the V-model.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'CME entwickelt Regelungskonzepte für anspruchsvolle Antriebssysteme und Leistungselektronik. Von der modellbasierten Funktionsentwicklung über MIL/SIL/HIL-Simulation bis zum Rapid-Control-Prototyping – wir verifizieren Regelalgorithmen systematisch entlang des V-Modells, bevor sie in die Serienapplikation überführt werden. Unsere Erfahrung umfasst sensorlose Regelungsverfahren, FOC-Algorithmen und applikationsspezifische Regleranpassungen.', defaultEn: 'CME develops control concepts for demanding drive systems and power electronics. From model-based function development through MIL/SIL/HIL simulation to rapid control prototyping – we systematically verify control algorithms along the V-model before transferring them to series applications. Our experience includes sensorless control methods, FOC algorithms and application-specific controller adaptations.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'Modellbasierte Funktionsentwicklung nach V-Modell', en: 'Model-based function development according to V-model' },
          { de: 'MIL-, SIL- und HIL-Simulation', en: 'MIL, SIL and HIL simulation' },
          { de: 'Rapid-Control-Prototyping', en: 'Rapid control prototyping' },
          { de: 'Sensorlose Regelungsverfahren', en: 'Sensorless control methods' },
          { de: 'FOC-Algorithmen für BLDC/PMSM', en: 'FOC algorithms for BLDC/PMSM' },
          { de: 'Transiente Zeitbereichsanalysen', en: 'Transient time-domain analyses' },
          { de: 'Kundenspezifische Reglermodelle', en: 'Customer-specific controller models' },
          { de: 'Worst-Case-Simulationen', en: 'Worst-case simulations' },
          { de: 'Integration Motor/Elektronik/Regelung', en: 'Integration motor/electronics/control' },
        ]),
      },
    ],
  },
  {
    key: 'entwicklung.simulation',
    label: 'Entwicklung: Simulation',
    path: '/entwicklung/simulation',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image' },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Simulation', defaultEn: 'Simulation' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Elektrische, System- und thermische Simulation', defaultEn: 'Electrical, System and Thermal Simulation' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'Risikominimierung vor dem Prototypenbau durch MATLAB, COMSOL und SPICE.', defaultEn: 'Risk minimization before prototype construction using MATLAB, COMSOL and SPICE.' },
        ],
      },
    ],
  },
  {
    key: 'entwicklung.testverifikation',
    label: 'Entwicklung: Test & Verification',
    path: '/entwicklung/test-verifikation',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_2885__1920px_ecd3ed1e.jpg`, defaultEn: `${CDN}/JK_2885__1920px_ecd3ed1e.jpg` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Test & Verification', defaultEn: 'Test & Verification' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'EMV-Tests, Umwelttests und funktionale Verifikation – in unserer eigenen Testinfrastruktur am Standort Dortmund.', defaultEn: 'EMC tests, environmental tests and functional verification – in our own test infrastructure in Dortmund.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'Qualität beginnt bei der Verifikation. CME verfügt über eine eigene Testinfrastruktur am Standort Dortmund – von der EMV-Vorkammer über Klimaschränke bis zum automatisierten Funktionstest. Wir testen Ihre Elektronik nach den relevanten Normen und Standards, bevor sie in die Serie geht. So stellen wir sicher, dass Ihr Produkt nicht nur funktioniert, sondern auch die Zulassungsanforderungen erfüllt.', defaultEn: 'Quality starts with verification. CME has its own test infrastructure at the Dortmund site – from EMC pre-compliance chambers through climate chambers to automated functional testing. We test your electronics according to relevant norms and standards before series production. This ensures your product not only works, but also meets certification requirements.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'EMV-Vorabprüfung (eigene Vorkammer)', en: 'EMC Pre-Compliance (own chamber)' },
          { de: 'EMV-Qualifikation nach Automotive & Industrienormen', en: 'EMC Qualification per Automotive & Industrial Standards' },
          { de: 'Klimatests & Umwelttests', en: 'Climate & Environmental Tests' },
          { de: 'Vibrations- & Schocktests', en: 'Vibration & Shock Tests' },
          { de: 'Automatisierter Funktionstest (EOL)', en: 'Automated Functional Test (EOL)' },
          { de: 'In-Circuit-Test (ICT)', en: 'In-Circuit Test (ICT)' },
          { de: 'Hochspannungsprüfung & Isolationstest', en: 'High Voltage & Insulation Test' },
          { de: 'Lebensdauertests & HALT/HASS', en: 'Lifetime Tests & HALT/HASS' },
          { de: 'Testkonzeptentwicklung & Prüfmittelbau', en: 'Test Concept Development & Fixture Design' },
        ]),
      },
    ],
  },
  {
    key: 'entwicklung.validierungemv',
    label: 'Entwicklung: Validierung & EMV',
    path: '/entwicklung/validierung-emv',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_2885__1920px_ecd3ed1e.jpg`, defaultEn: `${CDN}/JK_2885__1920px_ecd3ed1e.jpg` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Validierung & EMV', defaultEn: 'Validation & EMC' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Absicherung unter realen Einsatzbedingungen – leitungsgebundene EMV-Prüfung in eigener Schirmkabine, Umwelt- und Lebensdauertests.', defaultEn: 'Validation under real operating conditions – conducted EMC testing in our own shielded chamber, environmental and lifetime tests.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'CME validiert Ihre Elektronik unter realen Einsatzbedingungen – in unserem eigenen EMV-Messbereich mit Schirmkabine für leitungsgebundene Prüfungen. Wir identifizieren EMV-Schwachstellen frühzeitig im Entwicklungsprozess und beheben sie, bevor sie in der Serienfertigung zum Problem werden. Ergänzt wird die EMV-Qualifikation durch Umweltsimulationen, Klimatests und Lebensdauerprüfungen auf individuell konzipierten Prüfständen.', defaultEn: 'CME validates your electronics under real operating conditions – in our own EMC measurement facility with shielded chamber for conducted tests. We identify EMC weaknesses early in the development process and fix them before they become problems in series production. EMC qualification is complemented by environmental simulations, climate tests and lifetime tests on individually designed test benches.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'Leitungsgebundene EMV-Prüfung (eigene Schirmkabine)', en: 'Conducted EMC testing (own shielded chamber)' },
          { de: 'EMV-Pre-Compliance-Messungen', en: 'EMC pre-compliance measurements' },
          { de: 'EMV-gerechtes Design & Entstörung', en: 'EMC-compliant design & filtering' },
          { de: 'Klimaprüfungen & Umweltsimulation', en: 'Climate tests & environmental simulation' },
          { de: 'Vibrations- & Schockprüfungen', en: 'Vibration & shock tests' },
          { de: 'Lebensdauer- & Belastungstests', en: 'Lifetime & stress tests' },
          { de: 'Individuelle Prüfstände & Testkonzepte', en: 'Custom test benches & test concepts' },
          { de: 'Automatische Datenerfassung & -analyse', en: 'Automatic data acquisition & analysis' },
          { de: 'Prüfberichte & Dokumentation', en: 'Test reports & documentation' },
        ]),
      },
    ],
  },
  {
    key: 'entwicklung.kientwicklung',
    label: 'Entwicklung: KI-gestützte Entwicklung',
    path: '/entwicklung/ki-entwicklung',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_2392__1920px_af02a6b7.jpg`, defaultEn: `${CDN}/JK_2392__1920px_af02a6b7.jpg` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'KI-gestützte Entwicklung', defaultEn: 'AI-Powered Development' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Datengetriebene Methoden für Leistungselektronik, Antriebssysteme und Embedded-Anwendungen – vom Algorithmus bis zur Inferenz auf dem Zielsystem.', defaultEn: 'Data-driven methods for power electronics, drive systems and embedded applications – from algorithm to inference on the target system.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'KI ist kein Selbstzweck – sie löst konkrete Probleme in der Elektronikentwicklung. CME setzt Machine-Learning-Methoden dort ein, wo klassische Regelungs- oder Analyseansätze an ihre Grenzen stoßen: bei der Erkennung von Mustern in Sensordaten, bei der Optimierung nichtlinearer Regelstrecken und bei der vorausschauenden Wartung komplexer Systeme. Entscheidend ist dabei nicht die Modellkomplexität, sondern die Fähigkeit, trainierte Modelle auf ressourcenbeschränkter Embedded-Hardware zuverlässig auszuführen – in Echtzeit, bei begrenztem Speicher und unter industriellen Umgebungsbedingungen.', defaultEn: 'AI is not an end in itself – it solves concrete problems in electronics development. CME applies machine learning methods where classical control or analysis approaches reach their limits: detecting patterns in sensor data, optimizing nonlinear control systems, and enabling predictive maintenance of complex systems. What matters is not model complexity, but the ability to reliably run trained models on resource-constrained embedded hardware – in real time, with limited memory, and under industrial environmental conditions.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'Prädiktive Regelung – Modellprädiktive Ansätze (MPC) für nichtlineare Antriebssysteme und Leistungswandler', en: 'Predictive control – Model predictive approaches (MPC) for nonlinear drive systems and power converters' },
          { de: 'Anomalieerkennung & Predictive Maintenance – Erkennung von Degradation bei Antrieben, Netzteilen oder Leistungsmodulen auf Basis von Betriebsdaten', en: 'Anomaly detection & predictive maintenance – Detection of degradation in drives, power supplies or power modules based on operational data' },
          { de: 'Visuelle Qualitätskontrolle – Bildverarbeitung und Objekterkennung für Lötstellen, Bestückung und Oberflächeninspektion in der Elektronikfertigung', en: 'Visual quality control – Image processing and object detection for solder joints, component placement and surface inspection in electronics manufacturing' },
          { de: 'Edge-Inferenz auf Embedded-Zielen – Deployment trainierter Modelle auf MCUs mit Fokus auf Latenz, Speicherbedarf und Energieverbrauch', en: 'Edge inference on embedded targets – Deployment of trained models on MCUs with focus on latency, memory footprint and power consumption' },
          { de: 'Datenaufbereitung & Feature Engineering – Aufbereitung von Rohdaten aus Prüfständen, Feldtests und Serienfertigung für reproduzierbare Trainingspipelines', en: 'Data preparation & feature engineering – Processing raw data from test benches, field tests and series production for reproducible training pipelines' },
          { de: 'TinyML & Modellkomprimierung – Quantisierung, Pruning und Destillation für den Einsatz auf Cortex-M-Klasse-Prozessoren und vergleichbaren Plattformen', en: 'TinyML & model compression – Quantization, pruning and distillation for deployment on Cortex-M class processors and comparable platforms' },
          { de: 'Modell-Lifecycle & Versionierung – Nachvollziehbare Modellversionen, Testabdeckung und Dokumentation für regulierte Branchen', en: 'Model lifecycle & versioning – Traceable model versions, test coverage and documentation for regulated industries' },
          { de: 'Integration in bestehende Systeme – Einbettung von KI-Funktionen in vorhandene Firmware-, RTOS- oder SPS-Architekturen ohne Systembruch', en: 'Integration into existing systems – Embedding AI functions into existing firmware, RTOS or PLC architectures without system disruption' },
        ]),
      },
    ],
  },
  // Simulation, UX/Interface, Software/Digitale Systeme – custom pages without SubPageTemplate
  {
    key: 'entwicklung.uxinterfaceengineering',
    label: 'Entwicklung: UX & Interface Engineering',
    path: '/entwicklung/ux-interface-engineering',
    sections: [
      { key: 'hero', label: 'Hero-Bereich', fields: [{ key: 'image', label: 'Hero-Bild', type: 'image' }] },
      { key: 'content', label: 'Seiteninhalt', fields: [
        { key: 'title', label: 'Titel', type: 'text', defaultDe: 'UX & Interface Engineering', defaultEn: 'UX & Interface Engineering' },
        { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Benutzeroberflächen für Embedded-Systeme und industrielle Anwendungen', defaultEn: 'User interfaces for embedded systems and industrial applications' },
      ] },
    ],
  },
  {
    key: 'entwicklung.softwaredigitalesysteme',
    label: 'Entwicklung: Software & Digitale Systeme',
    path: '/entwicklung/software-digitale-systeme',
    sections: [
      { key: 'hero', label: 'Hero-Bereich', fields: [{ key: 'image', label: 'Hero-Bild', type: 'image' }] },
      { key: 'content', label: 'Seiteninhalt', fields: [
        { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Software & Digitale Systeme', defaultEn: 'Software & Digital Systems' },
        { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Embedded Software und digitale Systemarchitekturen', defaultEn: 'Embedded software and digital system architectures' },
      ] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // FERTIGUNG (Hub)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'fertigung',
    label: 'Fertigung',
    path: '/fertigung',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'videoWebm', label: 'Hero-Video (WebM)', type: 'video', defaultDe: `${CDN}/leiterplatten-hero_9526f6fb.webm`, defaultEn: `${CDN}/leiterplatten-hero_9526f6fb.webm` },
          { key: 'videoMp4', label: 'Hero-Video (MP4)', type: 'video', defaultDe: `${CDN}/leiterplatten-hero_f10b49bd.mp4`, defaultEn: `${CDN}/leiterplatten-hero_f10b49bd.mp4` },
          { key: 'videoPoster', label: 'Video-Poster', type: 'image', defaultDe: `${CDN}/leiterplatten-hero-poster_168ab542.jpg`, defaultEn: `${CDN}/leiterplatten-hero-poster_168ab542.jpg` },
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'Elektronikfertigung (EMS)', defaultEn: 'Electronics Manufacturing (EMS)' },
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'Vom Prototyp zur Serie. Made in Dortmund.', defaultEn: 'From prototype to series. Made in Dortmund.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'ISO-zertifizierte Elektronikfertigung mit eigener SMD- und THT-Linie. Prototypen, Kleinserien und Serienproduktion – alles aus einer Hand.', defaultEn: 'ISO-certified electronics manufacturing with own SMD and THT lines. Prototypes, small series and series production – all from a single source.' },
        ],
      },
      {
        key: 'subpages',
        label: 'Unterseiten-Karten (3 Karten)',
        fields: cardFields('card', [
          { titleDe: 'Leiterplatten bestücken', titleEn: 'PCB Assembly', descDe: 'SMD- und THT-Bestückung auf modernsten Fertigungslinien – vom Prototyp bis zur Großserie.', descEn: 'SMD and THT assembly on state-of-the-art production lines – from prototype to high-volume series.', img: `${CDN}/JK_1148__1920px_1cc154ec.jpg` },
          { titleDe: 'Baugruppen fertigen', titleEn: 'Module Assembly', descDe: 'Komplette Baugruppenmontage inkl. Verguss, Schutzlackierung, Kabelkonfektionierung und Endmontage.', descEn: 'Complete module assembly including potting, conformal coating, cable assembly and final assembly.', img: `${CDN}/JK_1736__1920px_e713f7ca.jpg` },
          { titleDe: 'Qualitätsmanagement', titleEn: 'Quality Management', descDe: 'ISO 9001 & 14001 zertifiziert. AOI, MOI, und lückenlose Rückverfolgbarkeit durch datenbankgestützte Prozesse.', descEn: 'ISO 9001 & 14001 certified. AOI, MOI, and complete traceability through database-driven processes.', img: `${CDN}/JK_2055__1920px_00c91d17.jpg` },
        ]),
      },
      {
        key: 'capabilities',
        label: 'Fertigungskapazitäten (8 Punkte)',
        fields: featureFields([
          { de: 'SMD-Bestückung', en: 'SMD Assembly' },
          { de: 'THT-Bestückung & Selektivlöten', en: 'THT Assembly & Selective Soldering' },
          { de: 'AOI & MOI', en: 'AOI & MOI' },
          { de: 'Verguss & Schutzlackierung', en: 'Potting & Conformal Coating' },
          { de: 'Kabelkonfektionierung', en: 'Cable Assembly' },
          { de: 'Funktionstest & ICT', en: 'Functional Test & ICT' },
          { de: 'Traceability & MES', en: 'Traceability & MES' },
          { de: 'Design for Manufacturing', en: 'Design for Manufacturing' },
        ]),
      },
      {
        key: 'cta',
        label: 'CTA-Bereich',
        fields: [
          { key: 'headline', label: 'CTA Überschrift', type: 'text', defaultDe: 'Serienfertigung beginnt mit einer belastbaren Kalkulation.', defaultEn: 'Series production starts with a reliable quote.' },
          { key: 'description', label: 'CTA Beschreibung', type: 'text', defaultDe: 'Stückzahl, Technologie, Zeitplan – senden Sie uns die Eckdaten. Wir kalkulieren verbindlich.', defaultEn: 'Volume, technology, timeline – send us the key data. We provide a binding quote.' },
          { key: 'buttonLabel', label: 'CTA Button', type: 'text', defaultDe: 'Fertigungsanfrage stellen', defaultEn: 'Submit manufacturing inquiry' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // FERTIGUNG – Unterseiten
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'fertigung.leiterplatten',
    label: 'Fertigung: Leiterplatten bestücken',
    path: '/fertigung/leiterplatten',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'videoWebm', label: 'Hero-Video (WebM)', type: 'video', defaultDe: `${CDN}/leiterplatten-hero_9526f6fb.webm`, defaultEn: `${CDN}/leiterplatten-hero_9526f6fb.webm` },
          { key: 'videoMp4', label: 'Hero-Video (MP4)', type: 'video', defaultDe: `${CDN}/leiterplatten-hero_f10b49bd.mp4`, defaultEn: `${CDN}/leiterplatten-hero_f10b49bd.mp4` },
          { key: 'videoPoster', label: 'Video-Poster', type: 'image', defaultDe: `${CDN}/leiterplatten-hero-poster_168ab542.jpg`, defaultEn: `${CDN}/leiterplatten-hero-poster_168ab542.jpg` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Leiterplatten bestücken', defaultEn: 'PCB Assembly' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'SMD- und THT-Bestückung auf modernsten Fertigungslinien – vom Prototyp bis zur Großserie.', defaultEn: 'SMD and THT assembly on state-of-the-art production lines – from prototype to high-volume series.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'Die Leiterplattenbestückung ist das Herzstück unserer EMS-Fertigung. Mit modernsten SMD-Bestückungsautomaten und THT-Lötanlagen fertigen wir Ihre Elektronik in höchster Qualität. Ob einzelne Prototypen für die Entwicklungsvalidierung oder Serienproduktion mit mehreren tausend Stück pro Monat – unsere Fertigungslinien sind flexibel konfigurierbar und auf schnelle Rüstwechsel optimiert.', defaultEn: 'PCB assembly is the heart of our EMS manufacturing. With state-of-the-art SMD placement machines and THT soldering systems, we manufacture your electronics in the highest quality. Whether individual prototypes for development validation or series production with several thousand units per month – our production lines are flexibly configurable and optimized for quick changeovers.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'SMD-Bestückung', en: 'SMD Assembly' },
          { de: 'THT-Bestückung & Wellenlöten', en: 'THT Assembly & Wave Soldering' },
          { de: 'Selektivlöten für Mixed-Technology', en: 'Selective Soldering for Mixed Technology' },
          { de: 'Reflow-Löten (bleihaltig & bleifrei)', en: 'Reflow Soldering (leaded & lead-free)' },
          { de: 'Dampfphasenlöten für Leistungselektronik', en: 'Vapor Phase Soldering for Power Electronics' },
          { de: 'Pastendruck mit SPI-Kontrolle', en: 'Paste Printing with SPI Control' },
          { de: 'Schnelle Prototypenfertigung', en: 'Fast Prototype Production' },
          { de: 'Flexible Losgrößen', en: 'Flexible Lot Sizes' },
          { de: 'NPI-Prozess (New Product Introduction)', en: 'NPI Process (New Product Introduction)' },
        ]),
      },
    ],
  },
  {
    key: 'fertigung.baugruppen',
    label: 'Fertigung: Baugruppen fertigen',
    path: '/fertigung/baugruppen',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/baugruppen-hero_b99b1505.webp`, defaultEn: `${CDN}/baugruppen-hero_b99b1505.webp` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Baugruppen fertigen', defaultEn: 'Module Assembly' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'Komplette Baugruppenmontage inkl. Verguss, Schutzlackierung, Kabelkonfektionierung und Endmontage.', defaultEn: 'Complete module assembly including potting, conformal coating, cable assembly and final assembly.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'Elektronik ist mehr als eine bestückte Leiterplatte. CME bietet die komplette Baugruppenfertigung aus einer Hand – von der bestückten PCB über Verguss und Schutzlackierung bis zur Endmontage im Gehäuse. Unsere Mitarbeiter sind in der Verarbeitung anspruchsvoller Materialien und Prozesse geschult, insbesondere für Leistungselektronik und thermisch belastete Baugruppen.', defaultEn: 'Electronics is more than a populated PCB. CME offers complete module assembly from a single source – from populated PCB through potting and conformal coating to final assembly in the housing. Our staff is trained in processing demanding materials and processes, especially for power electronics and thermally stressed assemblies.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'Verguss (PU, Epoxid, Silikon)', en: 'Potting (PU, Epoxy, Silicone)' },
          { de: 'Schutzlackierung (Conformal Coating)', en: 'Conformal Coating' },
          { de: 'Kabelkonfektionierung & Kabelbäume', en: 'Cable Assembly & Wire Harnesses' },
          { de: 'Gehäusemontage & Endmontage', en: 'Housing Assembly & Final Assembly' },
          { de: 'Pressfit-Technologie', en: 'Press-Fit Technology' },
          { de: 'Wärmeleitpaste & Thermal Interface Materials', en: 'Thermal Paste & Thermal Interface Materials' },
          { de: 'Laserbeschriftung & Kennzeichnung', en: 'Laser Marking & Labeling' },
          { de: 'Verpackung & Versandlogistik', en: 'Packaging & Shipping Logistics' },
          { de: 'Arbeitsplatzspezifische Montageanleitungen', en: 'Workstation-Specific Assembly Instructions' },
        ]),
      },
    ],
  },
  {
    key: 'fertigung.qualitaet',
    label: 'Fertigung: Qualitätsmanagement',
    path: '/fertigung/qualitaet',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/microscope-inspection_a3967815.png`, defaultEn: `${CDN}/microscope-inspection_a3967815.png` },
        ],
      },
      {
        key: 'content',
        label: 'Seiteninhalt',
        fields: [
          { key: 'title', label: 'Titel', type: 'text', defaultDe: 'Qualitätsmanagement', defaultEn: 'Quality Management' },
          { key: 'subtitle', label: 'Untertitel', type: 'text', defaultDe: 'ISO 9001 & 14001 zertifiziert. AOI, lückenlose Rückverfolgbarkeit und datenbankgestützte Traceability.', defaultEn: 'ISO 9001 & 14001 certified. AOI, complete traceability and database-driven tracking systems.' },
          { key: 'intro', label: 'Einleitung', type: 'richtext', defaultDe: 'Qualität ist bei CME kein nachgelagerter Prüfschritt, sondern integraler Bestandteil jedes Fertigungsprozesses. Unser Qualitätsmanagementsystem ist nach ISO 9001 und ISO 14001 zertifiziert. Jede Baugruppe durchläuft automatisierte optische Inspektion (AOI). Unsere datenbankgestützte Traceability mit vernetzten Fertigungsgeräten gewährleistet maximale Rückverfolgbarkeit – vom Wareneingang über jeden Fertigungsschritt bis zum Versand.', defaultEn: 'Quality at CME is not a downstream inspection step, but an integral part of every manufacturing process. Our quality management system is ISO 9001 and ISO 14001 certified. Every assembly undergoes automated optical inspection (AOI). Our database-driven traceability with connected manufacturing equipment ensures maximum traceability – from incoming goods through every production step to shipping.' },
        ],
      },
      {
        key: 'features',
        label: 'Feature-Cards',
        fields: featureFields([
          { de: 'ISO 9001:2015 zertifiziert', en: 'ISO 9001:2015 Certified' },
          { de: 'ISO 14001:2015 zertifiziert', en: 'ISO 14001:2015 Certified' },
          { de: 'Automatische Optische Inspektion (AOI)', en: 'Automated Optical Inspection (AOI)' },
          { de: 'Solder Paste Inspection (SPI)', en: 'Solder Paste Inspection (SPI)' },
          { de: 'In-Circuit-Test (ICT)', en: 'In-Circuit Test (ICT)' },
          { de: 'Datenbankgestützte Traceability mit vernetzten Geräten', en: 'Database-Driven Traceability with Connected Equipment' },
          { de: 'Wareneingangskontrolle & IPC-Prüfung', en: 'Incoming Goods Inspection & IPC Testing' },
          { de: 'Qualitätsprüfung nach IPC-Standards', en: 'Quality Inspection per IPC Standards' },
        ]),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'lifecycle',
    label: 'Lifecycle',
    path: '/lifecycle',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'videoWebm', label: 'Hero-Video (WebM)', type: 'video', defaultDe: `${CDN}/Loop-Sample_d94dc755.webm`, defaultEn: `${CDN}/Loop-Sample_d94dc755.webm` },
          { key: 'videoMp4', label: 'Hero-Video (MP4)', type: 'video', defaultDe: `${CDN}/Loop-Sample-compressed_8b0d5332.mp4`, defaultEn: `${CDN}/Loop-Sample-compressed_8b0d5332.mp4` },
          { key: 'videoPoster', label: 'Video-Poster', type: 'image', defaultDe: `${CDN}/hero-video-poster_8c5a9e34.jpg`, defaultEn: `${CDN}/hero-video-poster_8c5a9e34.jpg` },
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'Lifecycle Services', defaultEn: 'Lifecycle Services' },
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'Wir begleiten Ihr Produkt. Über den gesamten Lebenszyklus.', defaultEn: 'We support your product. Throughout the entire lifecycle.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'Elektronik lebt länger als die Bauteile, aus denen sie besteht. CME sichert die Verfügbarkeit Ihrer Produkte durch proaktives Obsolescence Management, Redesign-Services und langfristige Ersatzteilversorgung.', defaultEn: 'Electronics outlive the components they are made of. CME ensures the availability of your products through proactive obsolescence management, redesign services and long-term spare parts supply.' },
        ],
      },
      {
        key: 'services',
        label: 'Lifecycle-Services (4 Karten)',
        fields: cardFields('card', [
          { titleDe: 'Obsolescence Management', titleEn: 'Obsolescence Management', descDe: 'Datenbankgestützte Überwachung Ihrer Bauteilversorgung mit automatisierten Prozessen zur frühzeitigen Problemerkennung.', descEn: 'Database-driven monitoring of your component supply with automated processes for early problem detection.' },
          { titleDe: 'Redesign & Re-Engineering', titleEn: 'Redesign & Re-Engineering', descDe: 'Wenn ein Redesign unvermeidbar ist: Wir überarbeiten Ihre Elektronik unter Berücksichtigung der bestehenden Zulassungen und minimieren den Requalifizierungsaufwand.', descEn: 'When redesign is unavoidable: We rework your electronics considering existing certifications and minimize requalification effort.' },
          { titleDe: 'Ersatzteilversorgung', titleEn: 'Spare Parts Supply', descDe: 'Langfristige Ersatzteilversorgung für Ihre Serienprodukte. Wir lagern Bauteile und Baugruppen und liefern auf Abruf.', descEn: 'Long-term spare parts supply for your series products. We store components and assemblies and deliver on demand.' },
          { titleDe: 'Reparatur & Service', titleEn: 'Repair & Service', descDe: 'Professionelle Reparatur und Instandsetzung geschäftskritischer elektronischer Baugruppen.', descEn: 'Professional repair and refurbishment of business-critical electronic assemblies.' },
        ]),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÄRKTE
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'maerkte',
    label: 'Märkte',
    path: '/maerkte',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'videoWebm', label: 'Hero-Video (WebM)', type: 'video', defaultDe: `${CDN}/Loop-Sample_d94dc755.webm`, defaultEn: `${CDN}/Loop-Sample_d94dc755.webm` },
          { key: 'videoMp4', label: 'Hero-Video (MP4)', type: 'video', defaultDe: `${CDN}/Loop-Sample-compressed_8b0d5332.mp4`, defaultEn: `${CDN}/Loop-Sample-compressed_8b0d5332.mp4` },
          { key: 'videoPoster', label: 'Video-Poster', type: 'image', defaultDe: `${CDN}/hero-video-poster_8c5a9e34.jpg`, defaultEn: `${CDN}/hero-video-poster_8c5a9e34.jpg` },
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'Branchen & Anwendungsfelder', defaultEn: 'Industries & Applications' },
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'Branchenspezifische Elektroniklösungen.', defaultEn: 'Industry-specific electronics solutions.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'Wir denken nicht in Technologien – wir denken in Ihren Systemherausforderungen. CME entwickelt und fertigt Elektronik für sechs Branchen, in denen Leistungsdichte, Zuverlässigkeit und Serienfähigkeit entscheidend sind.', defaultEn: 'We don\'t think in technologies – we think in your system challenges. CME develops and manufactures electronics for six industries where power density, reliability and series readiness are decisive.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // UNTERNEHMEN
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'unternehmen',
    label: 'Unternehmen',
    path: '/unternehmen',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'image', label: 'Hero-Bild', type: 'image', defaultDe: `${CDN}/JK_0425__1920px_178fc1eb.jpg`, defaultEn: `${CDN}/JK_0425__1920px_178fc1eb.jpg` },
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'Über CME', defaultEn: 'About CME' },
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'The Electronic Company.', defaultEn: 'The Electronic Company.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'CME Control Motion Electronics ist ein inhabergeführter Entwicklungsdienstleister und EMS-Partner mit Sitz in Dortmund. Seit 2008 entwickeln und fertigen wir elektronische Baugruppen und Systeme für anspruchsvolle Branchen.', defaultEn: 'CME Control Motion Electronics is an owner-managed development service provider and EMS partner based in Dortmund. Since 2008, we have been developing and manufacturing electronic assemblies and systems for demanding industries.' },
        ],
      },
      {
        key: 'stats',
        label: 'Kennzahlen',
        fields: [
          { key: '0.value', label: 'Stat 1 Wert', type: 'text', defaultDe: '2008', defaultEn: '2008' },
          { key: '0.label', label: 'Stat 1 Label', type: 'text', defaultDe: 'Gegründet', defaultEn: 'Founded' },
          { key: '1.value', label: 'Stat 2 Wert', type: 'text', defaultDe: 'Dortmund', defaultEn: 'Dortmund' },
          { key: '1.label', label: 'Stat 2 Label', type: 'text', defaultDe: 'Standort', defaultEn: 'Location' },
          { key: '2.value', label: 'Stat 3 Wert', type: 'text', defaultDe: 'ISO 9001', defaultEn: 'ISO 9001' },
          { key: '2.label', label: 'Stat 3 Label', type: 'text', defaultDe: 'Zertifiziert', defaultEn: 'Certified' },
          { key: '3.value', label: 'Stat 4 Wert', type: 'text', defaultDe: 'Inhabergeführt', defaultEn: 'Owner-managed' },
          { key: '3.label', label: 'Stat 4 Label', type: 'text', defaultDe: 'Unternehmen', defaultEn: 'Company' },
        ],
      },
      {
        key: 'story',
        label: 'Unsere Geschichte',
        fields: [
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'Unsere Geschichte', defaultEn: 'Our Story' },
          { key: 'paragraph1', label: 'Absatz 1', type: 'richtext', defaultDe: 'CME wurde 2008 in Dortmund gegründet – mit der Vision, Elektronikentwicklung und -fertigung unter einem Dach zu vereinen. Was als Ingenieurbüro begann, ist heute ein etablierter Entwicklungsdienstleister und EMS-Partner mit eigener Fertigungsstätte.', defaultEn: 'CME was founded in 2008 in Dortmund – with the vision of uniting electronics development and manufacturing under one roof. What started as an engineering office is today an established development service provider and EMS partner with its own manufacturing facility.' },
          { key: 'paragraph2', label: 'Absatz 2', type: 'richtext', defaultDe: 'Unser Fokus auf Leistungselektronik, Antriebstechnik und thermisch anspruchsvolle Projekte hat uns zum bevorzugten Partner für Unternehmen gemacht, die mehr als Standard-EMS suchen. Wir verstehen nicht nur die Fertigung, sondern auch die Entwicklung – und genau das macht den Unterschied.', defaultEn: 'Our focus on power electronics, drive technology and thermally demanding projects has made us the preferred partner for companies looking for more than standard EMS. We understand not only manufacturing, but also development – and that makes all the difference.' },
          { key: 'image', label: 'Team-Bild', type: 'image', defaultDe: `${CDN}/JK_2392__1920px_af02a6b7.jpg`, defaultEn: `${CDN}/JK_2392__1920px_af02a6b7.jpg` },
        ],
      },
      {
        key: 'values',
        label: 'Werte (3 Karten)',
        fields: cardFields('card', [
          { titleDe: 'Technische Exzellenz', titleEn: 'Technical Excellence', descDe: 'Wir lösen die schwierigen Probleme. Leistungselektronik, thermische Herausforderungen, EMV-kritische Designs – das ist unser Spielfeld.', descEn: 'We solve the difficult problems. Power electronics, thermal challenges, EMC-critical designs – that is our playing field.' },
          { titleDe: 'Partnerschaftlichkeit', titleEn: 'Partnership', descDe: 'Wir denken in langfristigen Partnerschaften, nicht in Einzelprojekten. Unser Erfolg misst sich am Erfolg unserer Kunden.', descEn: 'We think in long-term partnerships, not individual projects. Our success is measured by the success of our customers.' },
          { titleDe: 'Alles aus einer Hand', titleEn: 'All from one source', descDe: 'Entwicklung und Fertigung unter einem Dach. Kurze Wege, schnelle Entscheidungen, nahtlose Übergänge.', descEn: 'Development and manufacturing under one roof. Short paths, fast decisions, seamless transitions.' },
        ]),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KONTAKT
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'kontakt',
    label: 'Kontakt',
    path: '/kontakt',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'Kontakt', defaultEn: 'Contact' },
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'Direkter Draht zu unseren Experten.', defaultEn: 'Direct line to our experts.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'Projektanfrage, technische Rückfrage oder Besuch in Dortmund – wir antworten persönlich.', defaultEn: 'Project inquiry, technical question or visit in Dortmund – we respond personally.' },
          { key: 'phone', label: 'Telefon (Hero)', type: 'text', defaultDe: '+49 231 28 66 76 96-0', defaultEn: '+49 231 28 66 76 96-0' },
          { key: 'email', label: 'E-Mail (Hero)', type: 'text', defaultDe: 'sales@control-motion.de', defaultEn: 'sales@control-motion.de' },
        ],
      },
      {
        key: 'contactInfo',
        label: 'Kontaktdaten',
        fields: [
          { key: 'sectionTitle', label: 'Abschnittstitel', type: 'text', defaultDe: 'Kontaktdaten', defaultEn: 'Contact Details' },
          { key: 'companyName', label: 'Firmenname', type: 'text', defaultDe: 'CME Control Motion Electronics GmbH', defaultEn: 'CME Control Motion Electronics GmbH' },
          { key: 'street', label: 'Straße', type: 'text', defaultDe: 'Alter Hellweg 48', defaultEn: 'Alter Hellweg 48' },
          { key: 'city', label: 'PLZ & Stadt', type: 'text', defaultDe: '44379 Dortmund', defaultEn: '44379 Dortmund' },
          { key: 'country', label: 'Land', type: 'text', defaultDe: 'Deutschland', defaultEn: 'Germany' },
          { key: 'phone', label: 'Telefon', type: 'text', defaultDe: '+49 231 28 66 76 96-0', defaultEn: '+49 231 28 66 76 96-0' },
          { key: 'email', label: 'E-Mail', type: 'text', defaultDe: 'info@control-motion.de', defaultEn: 'info@control-motion.de' },
        ],
      },
      {
        key: 'form',
        label: 'Kontaktformular',
        fields: [
          { key: 'subjectDev', label: 'Betreff-Option 1', type: 'text', defaultDe: 'Entwicklungsprojekt', defaultEn: 'Development Project' },
          { key: 'subjectMfg', label: 'Betreff-Option 2', type: 'text', defaultDe: 'Fertigungsanfrage', defaultEn: 'Manufacturing Inquiry' },
          { key: 'subjectLifecycle', label: 'Betreff-Option 3', type: 'text', defaultDe: 'Lifecycle Services', defaultEn: 'Lifecycle Services' },
          { key: 'subjectGeneral', label: 'Betreff-Option 4', type: 'text', defaultDe: 'Allgemeine Anfrage', defaultEn: 'General Inquiry' },
          { key: 'subjectCareer', label: 'Betreff-Option 5', type: 'text', defaultDe: 'Karriere / Bewerbung', defaultEn: 'Career / Application' },
          { key: 'successTitle', label: 'Erfolg-Titel', type: 'text', defaultDe: 'Vielen Dank!', defaultEn: 'Thank you!' },
          { key: 'successMessage', label: 'Erfolg-Nachricht', type: 'text', defaultDe: 'Ihre Nachricht ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei Ihnen.', defaultEn: 'Your message has been received. We will get back to you within 24 hours.' },
          { key: 'submitLabel', label: 'Senden-Button', type: 'text', defaultDe: 'Nachricht senden', defaultEn: 'Send Message' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KARRIERE
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'karriere',
    label: 'Karriere',
    path: '/karriere',
    sections: [
      {
        key: 'hero',
        label: 'Hero-Bereich',
        fields: [
          { key: 'tagline', label: 'Tagline', type: 'text', defaultDe: 'Karriere', defaultEn: 'Careers' },
          { key: 'headline', label: 'Überschrift', type: 'text', defaultDe: 'Gestalten Sie die Elektronik von morgen.', defaultEn: 'Shape the electronics of tomorrow.' },
          { key: 'description', label: 'Beschreibung', type: 'text', defaultDe: 'CME wächst – und sucht Ingenieure, Techniker und Spezialisten, die Elektronik nicht nur als Beruf, sondern als Berufung sehen.', defaultEn: 'CME is growing – and looking for engineers, technicians and specialists who see electronics not just as a job, but as a calling.' },
        ],
      },
      {
        key: 'benefits',
        label: 'Benefits (6 Karten)',
        fields: cardFields('card', [
          { titleDe: 'Spannende Projekte', titleEn: 'Exciting Projects', descDe: 'Arbeiten Sie an Elektronik für Automotive, Medizintechnik und Industrie.', descEn: 'Work on electronics for automotive, medical technology and industry.' },
          { titleDe: 'Starkes Team', titleEn: 'Strong Team', descDe: 'Ein engagiertes Team mit Leidenschaft für Elektronik.', descEn: 'A dedicated team with a passion for electronics.' },
          { titleDe: 'Weiterbildung', titleEn: 'Training', descDe: 'Individuelle Weiterbildungsmöglichkeiten und Konferenzbesuche.', descEn: 'Individual training opportunities and conference visits.' },
          { titleDe: 'Work-Life-Balance', titleEn: 'Work-Life Balance', descDe: 'Flexible Arbeitszeiten und Homeoffice-Möglichkeiten.', descEn: 'Flexible working hours and home office options.' },
          { titleDe: 'Standort Dortmund', titleEn: 'Location Dortmund', descDe: 'Modernes Büro im Technologiepark Dortmund mit guter Anbindung.', descEn: 'Modern office in Dortmund Technology Park with good connections.' },
          { titleDe: 'Langfristige Perspektive', titleEn: 'Long-term Perspective', descDe: 'Inhabergeführtes Unternehmen mit stabiler Wachstumsstrategie.', descEn: 'Owner-managed company with stable growth strategy.' },
        ]),
      },
    ],
  },
];
