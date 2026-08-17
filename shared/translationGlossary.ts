/**
 * CME-Terminologie für maschinelle Übersetzung (DE → EN).
 *
 * Zentrale Wortliste, damit Fachbegriffe in jeder Übersetzung gleich heißen.
 * Ohne sie übersetzt das Sprachmodell dieselben Begriffe bei jedem Durchlauf
 * leicht anders – "Leiterplattenbestückung" wird mal zu "PCB assembly", mal zu
 * "circuit board population", mal zu "board stuffing".
 *
 * Diese Datei ist die einzige Stelle, an der Terminologie gepflegt wird.
 * Sie wird von contentTranslator.ts und articleTranslator.ts in den
 * System-Prompt eingehängt.
 *
 * Zielvariante ist amerikanisches Englisch (die Website setzt og:locale=en_US),
 * daher z. B. "vapor phase soldering", nicht "vapour".
 *
 * Neue Begriffe einfach in der passenden Rubrik ergänzen – kein weiterer
 * Codeeingriff nötig.
 */

export interface GlossaryEntry {
  de: string;
  en: string;
  /** Optionaler Hinweis für das Modell, wenn der Begriff mehrdeutig ist. */
  note?: string;
}

/** Begriffe, die unverändert stehen bleiben – Marken, Normen, Eigennamen. */
export const DO_NOT_TRANSLATE: string[] = [
  "CME",
  "CME Control Motion Electronics GmbH",
  "The Electronic Company",
  "Automotive Ready",
  "ISO 9001",
  "ISO 14001",
  "UL",
  "IPC-A-610",
  "IEC 60601",
  "SMD",
  "THT",
  "BGA",
  "AOI",
  "SPI",
  "MES",
  "SiC",
  "GaN",
  "FPGA",
];

export const TRANSLATION_GLOSSARY: GlossaryEntry[] = [
  // ── Unternehmen & Leistungsversprechen ──
  { de: "Entwicklungsdienstleister", en: "development service provider" },
  { de: "Fertigungspartner", en: "manufacturing partner" },
  { de: "Elektronikfertigung", en: "electronics manufacturing" },
  { de: "Elektronikentwicklung", en: "electronics development" },
  {
    de: "Elektronik Bestücker",
    en: "electronics assembly provider",
    note: "Never translate literally as 'stuffer' or 'populator'.",
  },
  { de: "aus einer Hand", en: "from a single source" },

  // ── Fachgebiete ──
  { de: "Leistungselektronik", en: "power electronics" },
  { de: "Antriebselektronik", en: "drive electronics" },
  { de: "Antriebstechnik", en: "drive technology" },
  { de: "Mechatronik", en: "mechatronics" },
  { de: "Regelungstechnik", en: "control engineering" },
  { de: "Thermisches Management", en: "thermal management" },
  { de: "Funktionale Sicherheit", en: "functional safety" },
  { de: "Eingebettete Systeme", en: "embedded systems" },
  { de: "E-Motor-Design", en: "e-motor design" },
  {
    de: "EMV",
    en: "EMC",
    note: "Elektromagnetische Verträglichkeit = electromagnetic compatibility.",
  },
  { de: "EMV-Labor", en: "EMC laboratory" },
  { de: "EMV-gerechtes Design", en: "EMC-compliant design" },

  // ── Fertigung ──
  {
    de: "Leiterplattenbestückung",
    en: "PCB assembly",
    note: "Preferred over 'circuit board assembly' for headings and meta text.",
  },
  { de: "Leiterplatte", en: "printed circuit board (PCB)" },
  { de: "SMD-Bestückung", en: "SMD assembly" },
  { de: "THT-Bestückung", en: "THT assembly" },
  { de: "Mischbestückung", en: "mixed-technology assembly" },
  { de: "Baugruppe", en: "assembly" },
  { de: "Baugruppenfertigung", en: "electronic assembly manufacturing" },
  { de: "bedrahtete Bauteile", en: "through-hole components" },
  { de: "Bauform", en: "component package" },
  { de: "Lotpastendruck", en: "solder paste printing" },
  { de: "Reflow-Löten", en: "reflow soldering" },
  {
    de: "Dampfphasenlöten",
    en: "vapor phase soldering",
    note: "US spelling – 'vapor', not 'vapour'.",
  },
  { de: "Selektivlöten", en: "selective soldering" },
  { de: "Wellenlöten", en: "wave soldering" },
  { de: "Verguss", en: "potting" },
  {
    de: "Schutzlackierung",
    en: "conformal coating",
    note: "Also used for 'Conformal Coating' in the German source – keep as 'conformal coating'.",
  },
  { de: "Kabelkonfektionierung", en: "cable assembly" },
  { de: "Gehäusemontage", en: "enclosure assembly" },
  { de: "Endmontage", en: "final assembly" },
  { de: "Crimpkontakt", en: "crimp contact" },
  { de: "Ultraschallschweißen", en: "ultrasonic welding" },

  // ── Qualität & Prozess ──
  { de: "Qualitätssicherung", en: "quality assurance" },
  { de: "Qualitätsmanagement", en: "quality management" },
  {
    de: "Rückverfolgbarkeit",
    en: "traceability",
    note: "'lückenlose Rückverfolgbarkeit' = 'end-to-end traceability'.",
  },
  { de: "Wareneingang", en: "goods receipt" },
  { de: "Prüfer", en: "inspector" },
  { de: "Hochspannungsprüfung", en: "high-voltage testing" },
  { de: "Durchgangstester", en: "continuity tester" },
  { de: "Test und Verifikation", en: "test and verification" },
  { de: "Validierung", en: "validation" },
  { de: "Serienvalidierung", en: "series validation" },

  // ── Serien & Lebenszyklus ──
  { de: "Prototypenbau", en: "prototyping" },
  { de: "Prototyp", en: "prototype" },
  { de: "Kleinserie", en: "small-batch production" },
  { de: "Serienfertigung", en: "series production" },
  { de: "Großserie", en: "high-volume production" },
  { de: "Losgröße", en: "batch size" },
  { de: "Stückzahl", en: "unit quantity" },
  { de: "Produktlebenszyklus", en: "product lifecycle" },
  { de: "Obsoleszenzmanagement", en: "obsolescence management" },
  { de: "Ersatzteilstrategie", en: "spare parts strategy" },
  { de: "Redesign", en: "redesign" },

  // ── Märkte ──
  { de: "Industrieautomation", en: "industrial automation" },
  { de: "Gebäudetechnik", en: "building technology" },
  { de: "Medizintechnik", en: "medical technology" },
  { de: "E-Mobilität", en: "e-mobility" },
];

/**
 * Baut den Glossar-Abschnitt für den System-Prompt.
 *
 * Bewusst kompakt gehalten: Eine Tabelle kostet mehr Tokens als sie nützt,
 * eine einfache Pfeilnotation reicht dem Modell.
 */
export function buildGlossaryPromptSection(): string {
  const terms = TRANSLATION_GLOSSARY.map(entry => {
    const note = entry.note ? `  (${entry.note})` : "";
    return `- ${entry.de} → ${entry.en}${note}`;
  }).join("\n");

  return `## CME Terminology (binding)

Use these established English equivalents. They are company terminology, not
suggestions – do not paraphrase them, even if another translation would read
more naturally.

${terms}

## Never translate

Leave the following untouched in the English output:

${DO_NOT_TRANSLATE.map(t => `- ${t}`).join("\n")}`;
}
