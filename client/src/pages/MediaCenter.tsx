import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ImageOff,
  FileText,

} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const BOILERPLATE_SHORT =
  'Die CME Control Motion Electronics GmbH ist Entwicklungsdienstleister und EMS-Fertigungspartner für Leistungselektronik, Antriebselektronik und Mechatronik. Von der Entwicklung bis zur Serienfertigung – alles aus einer Hand am Standort Dortmund.';

const BOILERPLATE_LONG =
  'Die CME Control Motion Electronics GmbH mit Sitz in Dortmund ist ein unabhängiger Entwicklungsdienstleister und Electronic-Manufacturing-Services-Partner (EMS). Das Unternehmen begleitet Kunden von der Konzeptphase über Hardware- und Softwareentwicklung, Simulation und Test bis zur qualifizierten Serienfertigung elektronischer Baugruppen. Schwerpunkte liegen auf Leistungselektronik, Antriebselektronik (Motor Control), Mechatronik und thermisch anspruchsvollen Projekten. Mit über 60 Mitarbeitern, einem eigenen Maschinenpark für SMD- und THT-Bestückung sowie Zertifizierungen nach ISO 9001 und IATF 16949 bietet CME durchgängige Qualität vom Prototyp bis zur Serie. Ergänzt wird das Leistungsspektrum durch Lifecycle Services inklusive Obsoleszenzmanagement und Re-Design, um die langfristige Verfügbarkeit elektronischer Produkte sicherzustellen.';

const FACTSHEET = [
  { label: 'Gegründet', value: '2008' },
  { label: 'Mitarbeiter', value: 'über 60' },
  { label: 'Standort', value: 'Dortmund (Alter Hellweg 48, 44379 Dortmund)' },
  { label: 'Zertifizierungen', value: 'ISO 9001, IATF 16949' },
  { label: 'Leistungen', value: 'Elektronikentwicklung, EMS-Fertigung, Lifecycle Services' },
  { label: 'Schwerpunkte', value: 'Leistungselektronik, Antriebselektronik, Mechatronik, thermisch anspruchsvolle Projekte' },
  { label: 'Geschäftsführung', value: 'Steffen Katzer, Matthias Markmann' },
  { label: 'Website', value: 'control-motion.de' },
];

const LOGOS = [
  {
    label: 'Logo RGB horizontal',
    description: 'Für digitale Medien',
    previewUrl: '/api/media/CME_Logo_RGB_horizontal.png',
    downloads: [
      { format: 'PNG', url: '/api/downloads/CME_Logo_RGB_horizontal.png' },
      { format: 'EPS', url: '/api/downloads/CME_Logo_RGB_horizontal.eps' },
    ],
    darkBg: false,
  },
  {
    label: 'Logo weiß horizontal',
    description: 'Für dunkle Hintergründe',
    previewUrl: '/api/media/CME_Logo_weiss_horizontal.png',
    downloads: [
      { format: 'PNG', url: '/api/downloads/CME_Logo_weiss_horizontal.png' },
    ],
    darkBg: true,
  },
  {
    label: 'Logo RGB zentriert',
    description: 'Für digitale Medien',
    previewUrl: '/api/media/CME_Logo_RGB_zentriert.png',
    downloads: [
      { format: 'PNG', url: '/api/downloads/CME_Logo_RGB_zentriert.png' },
      { format: 'EPS', url: '/api/downloads/CME_Logo_RGB_zentriert.eps' },
    ],
    darkBg: false,
  },
  {
    label: 'Logo CMYK zentriert',
    description: 'Für Printmedien',
    previewUrl: '/api/media/CME_Logo_RGB_zentriert.png',
    downloads: [
      { format: 'EPS', url: '/api/downloads/CME_Logo_CMYK_zentriert.eps' },
    ],
    darkBg: false,
  },
  {
    label: 'Logo E-Mail-Signatur',
    description: '250 px breit, für E-Mail-Signaturen',
    previewUrl: '/api/media/CME_Logo_Email_250px.png',
    downloads: [
      { format: 'PNG', url: '/api/downloads/CME_Logo_Email_250px.png' },
    ],
    darkBg: false,
  },
];

const PHOTOS = [
  {
    label: 'Geschäftsführung',
    description: 'v.l.: Steffen Katzer, Matthias Markmann',
    previewUrl: '/api/media/CME_Geschaeftsfuehrung_Katzer_Markmann.png',
    downloadUrl: '/api/downloads/CME_Geschaeftsfuehrung_Katzer_Markmann.png',
    available: true,
  },
  {
    label: 'Standort / Gebäude',
    description: 'Außenansicht CME Dortmund',
    previewUrl: '',
    downloadUrl: '#',
    available: false,
  },
  {
    label: 'Produktion / Fertigung',
    description: 'SMD-Bestückung und Fertigungslinie',
    previewUrl: '',
    downloadUrl: '#',
    available: false,
  },
  {
    label: 'Produkte',
    description: 'Elektronische Baugruppen und Systeme',
    previewUrl: '',
    downloadUrl: '#',
    available: false,
  },
];

const COLORS = [
  { name: 'CME-Blau (Primär)', hex: '#0080C8', textWhite: true },
  { name: 'CME-Blau Dunkel (Hover)', hex: '#005A9E', textWhite: true },
  { name: 'Überschriften', hex: '#1A1A2A', textWhite: true },
  { name: 'Fließtext', hex: '#3A3A4A', textWhite: true },
  { name: 'Sekundärtext', hex: '#6A6A7A', textWhite: true },
  { name: 'Helle Flächen', hex: '#F3F7FB', textWhite: false },
  { name: 'Trennlinien', hex: '#DDE6F0', textWhite: false },
];

const PUBLICATIONS = [
  {
    title: 'CME Company Presentation 2026 (Deutsch)',
    date: '2026',
    downloads: [
      { format: 'PDF', url: '/api/downloads/2026-CMECompanyPresentationDE.pdf' },
    ],
  },
  {
    title: 'CME Company Presentation 2026 (English)',
    date: '2026',
    downloads: [
      { format: 'PDF', url: '/api/downloads/2026-CMECompanyPresentationEN.pdf' },
    ],
  },
  {
    title: 'Mitgliedsprofil CME – Brancheninitiative Gesundheitswirtschaft Südwestfalen e.V.',
    date: '2026',
    downloads: [
      { format: 'PDF', url: '/api/downloads/CME_Mitgliedsprofil_Brancheninitiative.pdf' },
      { format: 'Word', url: '/api/downloads/CME_Mitgliedsprofil_Brancheninitiative.docx' },
    ],
  },
];

/* ─────────────────────────────────────────────
   SUB-NAVIGATION DATA
   ───────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: 'kontakt', label: 'Presse-Kontakt' },
  { id: 'profil', label: 'Unternehmensprofil' },
  { id: 'eckdaten', label: 'Eckdaten' },
  { id: 'logos', label: 'Logos' },
  { id: 'bilder', label: 'Bilddatenbank' },
  { id: 'design', label: 'Design' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'nutzung', label: 'Nutzung' },
];

/* ─────────────────────────────────────────────
   HELPER: Copy-to-Clipboard Button
   ───────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-[#DDE6F0] text-[#3A3A4A] hover:bg-[#F3F7FB] transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          Kopiert
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Text kopieren
        </>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   HELPER: Sticky Sub-Navigation with Scroll-Spy
   ───────────────────────────────────────────── */

function SubNavigation({ activeId }: { activeId: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll the active button into view HORIZONTALLY only (no vertical page scroll)
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector(`[data-nav-id="${activeId}"]`) as HTMLElement | null;
    if (activeBtn) {
      const container = scrollRef.current;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const containerWidth = container.clientWidth;
      const scrollLeft = btnLeft - containerWidth / 2 + btnWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeId]);

  return (
    <div className="sticky z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE6F0] shadow-sm" style={{ top: 'var(--nav-height)' }}>
      <div
        ref={scrollRef}
        className="max-w-[75rem] mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2.5"
        style={{ scrollbarWidth: 'none' }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            data-nav-id={item.id}
            onClick={() => handleClick(item.id)}
            className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-md transition-colors shrink-0 ${
              activeId === item.id
                ? 'bg-[#0080C8] text-white'
                : 'text-[#3A3A4A] hover:bg-[#F3F7FB] hover:text-[#0080C8]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOOK: Scroll-Spy
   ───────────────────────────────────────────── */

function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, boolean>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleSections.set(id, entry.isIntersecting);
          });
          for (const sectionId of ids) {
            if (visibleSections.get(sectionId)) {
              setActiveId(sectionId);
              break;
            }
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => { observers.forEach((obs) => obs.disconnect()); };
  }, [ids]);

  return activeId;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

export default function MediaCenter() {
  const sectionIds = NAV_ITEMS.map((item) => item.id);
  const activeId = useScrollSpy(sectionIds);

  // scroll-margin accounts for main nav + sub-nav height
  const smt = 'scroll-mt-[calc(var(--nav-height)+3.5rem)]';

  return (
    <Layout>
      <SEO
        titleDE="Media-Center | CME Control Motion Electronics"
        titleEN="Media Center | CME Control Motion Electronics"
        descriptionDE="Presse- und Materialbereich der CME Control Motion Electronics GmbH. Logos, Pressefotos, Boilerplate-Texte, Factsheet und Designvorgaben zum Download."
        descriptionEN="Press and media resources of CME Control Motion Electronics GmbH. Logos, press photos, boilerplate texts, factsheet and design guidelines for download."
        path="/media-center"
      />

      {/* Hero with nav offset */}
      <div className="bg-[#F3F7FB] border-b border-[#DDE6F0]" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="max-w-[50rem] mx-auto px-6 py-16 md:py-20">
          <h1 className="text-[var(--fs-h2)] font-bold text-[#1A1A2A] mb-3">
            Media-Center
          </h1>
          <p className="text-[var(--fs-body-lg)] text-[#0080C8] font-medium mb-6">
            Presse- und Materialbereich der CME Control Motion Electronics GmbH
          </p>
          <p className="text-[var(--fs-body)] text-[#3A3A4A] max-w-3xl leading-relaxed">
            Hier finden Presse, Branchenverbände und Partner Unternehmensinformationen,
            druckfähiges Bildmaterial, Logos und freigegebene Texte zur Verwendung.
            Bei Fragen wenden Sie sich bitte an unseren Pressekontakt.
          </p>
        </div>
      </div>

      {/* Sticky Sub-Navigation */}
      <SubNavigation activeId={activeId} />

      {/* ═══════════════════════════════════════════
          SECTIONS
          ═══════════════════════════════════════════ */}

      {/* 1. PRESSE-KONTAKT – white bg */}
      <section id="kontakt" className={`${smt} py-16 md:py-20 bg-white`}>
        <div className="max-w-[50rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Presse-Kontakt
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8">Ihr Ansprechpartner für Presseanfragen</p>
          <div className="bg-[#F3F7FB] border border-[#DDE6F0] rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <img
                src="/api/media/ThomasScherr_Portrait.jpg"
                alt="Thomas Scherr"
                className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-[#DDE6F0]"
              />
              <div>
                <p className="font-bold text-[#1A1A2A] text-lg">Thomas Scherr</p>
                <p className="text-[#6A6A7A] text-sm">Marketing & Business Development</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-[var(--fs-body)] text-[#3A3A4A]">
              <a href="mailto:t.scherr@control-motion.de" className="flex items-center gap-3 hover:text-[#0080C8] transition-colors">
                <Mail className="w-5 h-5 text-[#0080C8] shrink-0" />
                t.scherr@control-motion.de
              </a>
              <a href="tel:+4915141932777" className="flex items-center gap-3 hover:text-[#0080C8] transition-colors">
                <Phone className="w-5 h-5 text-[#0080C8] shrink-0" />
                +49 151 41932777
              </a>
              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="w-5 h-5 text-[#0080C8] shrink-0 mt-0.5" />
                <span>Alter Hellweg 48, 44379 Dortmund</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNTERNEHMENSPROFIL – light bg */}
      <section id="profil" className={`${smt} py-16 md:py-20 bg-[#F3F7FB]`}>
        <div className="max-w-[50rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Unternehmensprofil
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8">Freigegebene Texte zur Verwendung in Publikationen</p>

          <div className="mb-8">
            <h3 className="text-[var(--fs-body-lg)] font-semibold text-[#1A1A2A] mb-3">Kurzfassung</h3>
            <div className="bg-white border border-[#DDE6F0] rounded-lg p-5">
              <p className="text-[var(--fs-body)] text-[#3A3A4A] leading-relaxed mb-4">{BOILERPLATE_SHORT}</p>
              <CopyButton text={BOILERPLATE_SHORT} />
            </div>
          </div>

          <div>
            <h3 className="text-[var(--fs-body-lg)] font-semibold text-[#1A1A2A] mb-3">Langfassung</h3>
            <div className="bg-white border border-[#DDE6F0] rounded-lg p-5">
              <p className="text-[var(--fs-body)] text-[#3A3A4A] leading-relaxed mb-4">{BOILERPLATE_LONG}</p>
              <CopyButton text={BOILERPLATE_LONG} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ECKDATEN / FACTSHEET – white bg */}
      <section id="eckdaten" className={`${smt} py-16 md:py-20 bg-white`}>
        <div className="max-w-[50rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Unternehmen auf einen Blick
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8">Kompakte Eckdaten für Ihre Berichterstattung</p>
          <div className="overflow-x-auto rounded-lg border border-[#DDE6F0]">
            <table className="w-full text-[var(--fs-body)] text-left">
              <tbody>
                {FACTSHEET.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#F3F7FB]' : 'bg-white'}>
                    <td className="px-5 py-3.5 font-semibold text-[#1A1A2A] whitespace-nowrap w-48">{row.label}</td>
                    <td className="px-5 py-3.5 text-[#3A3A4A]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. LOGOS – light bg */}
      <section id="logos" className={`${smt} py-16 md:py-20 bg-[#F3F7FB]`}>
        <div className="max-w-[75rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Logos zum Download
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8 max-w-[50rem]">
            Bitte beachten Sie die Schutzzone um das Logo. Das Logo darf nicht verzerrt, eingefärbt oder in seiner Proportion verändert werden.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LOGOS.map((logo, idx) => (
              <div key={idx} className="border border-[#DDE6F0] rounded-xl overflow-hidden bg-white">
                <div className={`h-32 md:h-36 flex items-center justify-center p-5 ${logo.darkBg ? 'bg-[#1A1A2A]' : 'bg-[#F3F7FB]'}`}>
                  <img src={logo.previewUrl} alt={logo.label} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[#1A1A2A] text-sm mb-1">{logo.label}</p>
                  <p className="text-xs text-[#6A6A7A] mb-3">{logo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {logo.downloads.map((dl) => (
                      <a
                        key={dl.format}
                        href={dl.url}
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0080C8] text-white text-xs font-medium rounded-md hover:bg-[#005A9E] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {dl.format}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BILDDATENBANK – white bg */}
      <section id="bilder" className={`${smt} py-16 md:py-20 bg-white`}>
        <div className="max-w-[75rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Bilddatenbank
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8 max-w-[50rem]">
            Pressefotos in Web- und Druckauflösung. Quellenangabe bei Verwendung: &bdquo;Foto: CME Control Motion Electronics GmbH&ldquo;.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PHOTOS.map((photo, idx) => (
              <div key={idx} className="border border-[#DDE6F0] rounded-xl overflow-hidden bg-white">
                {photo.available ? (
                  <div className="aspect-[4/3] bg-[#F3F7FB] flex items-center justify-center p-4">
                    <img src={photo.previewUrl} alt={photo.label} className="max-h-full max-w-full object-contain rounded" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-[#F3F7FB] flex flex-col items-center justify-center gap-2 p-4">
                    <ImageOff className="w-8 h-8 text-[#6A6A7A]/40" />
                    <span className="text-xs text-[#6A6A7A] font-medium">Bildmaterial folgt</span>
                  </div>
                )}
                <div className="p-4">
                  <p className="font-semibold text-[#1A1A2A] text-sm mb-1">{photo.label}</p>
                  <p className="text-xs text-[#6A6A7A] mb-3">{photo.description}</p>
                  {photo.available ? (
                    <a
                      href={photo.downloadUrl}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0080C8] text-white text-xs font-medium rounded-md hover:bg-[#005A9E] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-[#6A6A7A] text-xs font-medium rounded-md cursor-not-allowed">
                      <Download className="w-3.5 h-3.5" />
                      Noch nicht verfügbar
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FARB- & DESIGNVORGABEN – light bg */}
      <section id="design" className={`${smt} py-16 md:py-20 bg-[#F3F7FB]`}>
        <div className="max-w-[75rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Farb- &amp; Designvorgaben
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8 max-w-[50rem]">Corporate-Design-Richtlinien für konsistente Darstellung</p>

          {/* Color Swatches */}
          <div className="mb-10">
            <h3 className="text-[var(--fs-body-lg)] font-semibold text-[#1A1A2A] mb-4">Farbpalette</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {COLORS.map((color) => (
                <div key={color.hex} className="border border-[#DDE6F0] rounded-lg overflow-hidden bg-white">
                  <div className="h-20 flex items-end justify-start p-3" style={{ backgroundColor: color.hex }}>
                    <span className={`text-xs font-mono font-medium ${color.textWhite ? 'text-white' : 'text-[#1A1A2A]'}`}>
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-[#3A3A4A]">{color.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="mb-10">
            <h3 className="text-[var(--fs-body-lg)] font-semibold text-[#1A1A2A] mb-3">Hausschrift</h3>
            <div className="bg-white border border-[#DDE6F0] rounded-lg p-5">
              <p className="text-[var(--fs-body)] text-[#3A3A4A] mb-2">
                <strong>Roboto</strong> – in allen Schnitten (Light, Regular, Medium, Bold)
              </p>
              <p className="text-sm text-[#6A6A7A]">
                Frei verfügbar über Google Fonts. Verwendung für Überschriften, Fließtext und UI-Elemente.
              </p>
            </div>
          </div>

          {/* Do's & Don'ts */}
          <div>
            <h3 className="text-[var(--fs-body-lg)] font-semibold text-[#1A1A2A] mb-3">Do&apos;s &amp; Don&apos;ts</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <p className="font-semibold text-green-800 mb-2 text-sm">Do&apos;s</p>
                <ul className="text-sm text-green-900 space-y-1.5 list-disc list-inside">
                  <li>Logo mit ausreichend Schutzzone verwenden</li>
                  <li>Auf hellem Hintergrund das RGB-Logo nutzen</li>
                  <li>Auf dunklem Hintergrund die weiße Variante nutzen</li>
                  <li>Roboto als Hausschrift beibehalten</li>
                  <li>CME-Blau #0080C8 als Primärfarbe einsetzen</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <p className="font-semibold text-red-800 mb-2 text-sm">Don&apos;ts</p>
                <ul className="text-sm text-red-900 space-y-1.5 list-disc list-inside">
                  <li>Logo nicht verzerren oder stauchen</li>
                  <li>Logo nicht einfärben oder mit Effekten versehen</li>
                  <li>Keine abweichenden Schriftarten verwenden</li>
                  <li>Keine Condensed-Schriften für Überschriften</li>
                  <li>Keine Serifenschriften als Schmuckschrift</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERÖFFENTLICHUNGEN & DOWNLOADS – white bg */}
      <section id="downloads" className={`${smt} py-16 md:py-20 bg-white`}>
        <div className="max-w-[75rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Veröffentlichungen &amp; Downloads
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8 max-w-[50rem]">
            Freigegebene Pressetexte und Veröffentlichungen stehen hier als Download bereit.
          </p>
          <div className="overflow-x-auto rounded-lg border border-[#DDE6F0]">
            <table className="w-full text-[var(--fs-body)] text-left">
              <thead className="bg-[#F3F7FB]">
                <tr>
                  <th className="px-5 py-3 font-semibold text-[#1A1A2A]">Titel</th>
                  <th className="px-5 py-3 font-semibold text-[#1A1A2A] w-24">Datum</th>
                  <th className="px-5 py-3 font-semibold text-[#1A1A2A] w-48 text-right">Download</th>
                </tr>
              </thead>
              <tbody>
                {PUBLICATIONS.map((pub, idx) => (
                  <tr key={idx} className="border-t border-[#DDE6F0]">
                    <td className="px-5 py-4 text-[#3A3A4A]">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0080C8] shrink-0" />
                        {pub.title}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#6A6A7A]">{pub.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        {pub.downloads.map((dl) => (
                          <a
                            key={dl.format}
                            href={dl.url}
                            download
                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              dl.url === '#'
                                ? 'bg-gray-100 text-[#6A6A7A] cursor-not-allowed'
                                : 'bg-[#0080C8] text-white hover:bg-[#005A9E]'
                            }`}
                            onClick={dl.url === '#' ? (e) => e.preventDefault() : undefined}
                          >
                            <Download className="w-3.5 h-3.5" />
                            {dl.format}
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. NUTZUNGSBEDINGUNGEN – light bg */}
      <section id="nutzung" className={`${smt} py-16 md:py-20 bg-[#F3F7FB]`}>
        <div className="max-w-[50rem] mx-auto px-6">
          <h2 className="text-[var(--fs-h3)] font-bold text-[#0080C8] mb-2">
            Nutzungsbedingungen
          </h2>
          <p className="text-[var(--fs-body)] text-[#6A6A7A] mb-8">Hinweise zur Verwendung des bereitgestellten Materials</p>
          <div className="bg-white border border-[#DDE6F0] rounded-lg p-5 md:p-6">
            <p className="text-[var(--fs-body)] text-[#3A3A4A] leading-relaxed mb-4">
              Das bereitgestellte Material (Logos, Fotos, Texte) darf für redaktionelle und
              partnerschaftliche Zwecke verwendet werden. Eine kommerzielle Nutzung außerhalb
              dieses Rahmens bedarf der vorherigen schriftlichen Zustimmung.
            </p>
            <p className="text-[var(--fs-body)] text-[#3A3A4A] leading-relaxed mb-4">
              Gewünschte Quellenangabe bei Bildverwendung:
            </p>
            <p className="text-[var(--fs-body)] font-medium text-[#1A1A2A] bg-[#F3F7FB] border border-[#DDE6F0] rounded px-4 py-2 inline-block mb-4">
              Foto/Quelle: CME Control Motion Electronics GmbH
            </p>
            <p className="text-[var(--fs-body)] text-[#3A3A4A] leading-relaxed">
              Bei Fragen zur Verwendung wenden Sie sich bitte an unseren{' '}
              <a href="#kontakt" className="text-[#0080C8] hover:underline font-medium">
                Presse-Kontakt
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="border-t border-[#DDE6F0] bg-white">
        <div className="max-w-[50rem] mx-auto px-6 py-6 text-center">
          <p className="text-xs text-[#6A6A7A]">
            Diese Seite dient als Materialbereich für Presse, Partner und Verbände.
          </p>
        </div>
      </div>
    </Layout>
  );
}
