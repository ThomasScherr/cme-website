import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { useVideoSource } from '@/hooks/useVideoSource';
import SEO, { buildFAQSchema, buildServiceSchema } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Clock, MapPin, Layers, Cpu, Cog, Thermometer,
  ShieldCheck, Phone, Mail, Send, Loader2,
  CheckCircle, ChevronRight, Zap, Building2, Factory,
  RefreshCw, ArrowRight, Workflow
} from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

/* ══════════════════════════════════════════════════════════════════
   GOOGLE ADS LANDING PAGE – /elektronikentwicklung-muenchen
   Conversion-optimiert für Kampagne "Markterschließung München"
   ══════════════════════════════════════════════════════════════════ */

const PHONE = '0231 286676960';
const PHONE_HREF = 'tel:+492312866769600';
const LOGO_URL = 'https://ventspire-cdn.b-cdn.net/cme/logo-nav.webp';
const HERO_VIDEO_WEBM = 'https://ventspire-cdn.b-cdn.net/cme/Loop-Sample_d94dc755.webm';
const HERO_VIDEO_MP4 = 'https://ventspire-cdn.b-cdn.net/cme/Loop-Sample-compressed_8b0d5332.mp4';
const HERO_VIDEO_POSTER = 'https://ventspire-cdn.b-cdn.net/cme/hero-poster.webp';

// ── FAQ Data ──
const faqs = [
  {
    question: 'Wie funktioniert die Zusammenarbeit zwischen München und Dortmund?',
    answer: 'Kickoff und Abstimmungen finden vor Ort in München oder per Video statt. Die Entwicklung erfolgt an unserem Standort in Dortmund – mit direktem Zugang zu eigenem EMV-Labor, thermischer Simulation und EMS-Fertigung. Regelmäßige Reviews und kurze Kommunikationswege sorgen für reibungslose Projekte.',
  },
  {
    question: 'Wie schnell bekomme ich eine Rückmeldung auf meine Anfrage?',
    answer: 'Innerhalb von einem Werktag (Mo–Fr) erhalten Sie ein erstes Feedback und eine Einschätzung, ob und wie wir Ihr Projekt unterstützen können.',
  },
  {
    question: 'Was kostet eine Elektronikentwicklung bei CME?',
    answer: 'Die Kosten hängen von der Komplexität ab: Ein einfaches Sensorboard liegt im niedrigen fünfstelligen Bereich, komplexe Leistungselektronik im sechsstelligen Bereich. Nach einer kostenlosen Ersteinschätzung erhalten Sie eine belastbare Kosten- und Zeitschätzung.',
  },
  {
    question: 'Können Sie bestehende Produkte redesignen?',
    answer: 'Ja – Redesign gehört zu unseren Kernleistungen. Typische Anlässe: Bauteilabkündigungen, Kostenoptimierung, Leistungssteigerung oder Anpassung an neue Normen.',
  },
  {
    question: 'Muss ein vollständiges Lastenheft vorliegen?',
    answer: 'Nein. Oft starten wir mit einer Funktionsbeschreibung, einer Skizze oder einem bestehenden Produkt. Unsere Ingenieure erarbeiten gemeinsam mit Ihnen die Anforderungen.',
  },
  {
    question: 'Können Sie auch fertigen?',
    answer: 'Ja. CME verfügt über eine eigene EMS-Fertigung am Standort Dortmund. Vom Prototyp bis zur Serie – alles aus einer Hand. Sie können aber auch einen eigenen Fertiger wählen, wir entwickeln EMS-neutral.',
  },
];

// ── Service Data for Schema ──
const services = [
  { name: 'Leistungselektronik', description: 'Entwicklung von Wechselrichtern, DC/DC-Wandlern, Motorsteuerungen und Netzteilen mit hohen Leistungsdichten.' },
  { name: 'Thermal Management', description: 'Thermische Simulation, Entwärmungskonzepte und Validierung für Elektronik unter anspruchsvollen Bedingungen.' },
  { name: 'Hardware & Embedded Design', description: 'Schaltungsentwurf, PCB-Layout und Embedded Software für komplexe Elektronikbaugruppen.' },
  { name: 'Redesign & Obsolescence', description: 'Überarbeitung bestehender Baugruppen bei Bauteilabkündigungen, Kostenoptimierung oder neuen Anforderungen.' },
  { name: 'Industrialisierung', description: 'Fertigungsgerechtes Design, Prototypenbau und Serienüberleitung in der eigenen EMS-Fertigung.' },
];

// ── Schemas ──
const faqSchema = buildFAQSchema(faqs);
const serviceSchemas = buildServiceSchema(services.map(s => ({ ...s, url: '/elektronikentwicklung-muenchen' })));

// ── UTM Parameter extraction ──
function useUtmParams() {
  const [utm, setUtm] = useState({ source: '', medium: '', campaign: '', term: '', content: '' });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
      term: params.get('utm_term') || '',
      content: params.get('utm_content') || '',
    });
  }, []);
  return utm;
}

export default function LandingMuenchen() {
  const heroVideoSrc = useVideoSource(HERO_VIDEO_WEBM, HERO_VIDEO_MP4);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO
        titleDE="Elektronikentwicklung München | Leistungselektronik & Thermal Management | CME"
        titleEN="Electronics Development Munich | Power Electronics & Thermal Management | CME"
        descriptionDE="CME entwickelt Leistungselektronik, Antriebselektronik und thermisch anspruchsvolle Baugruppen für Unternehmen im Raum München. Eigene EMS-Fertigung. Jetzt Projekt besprechen."
        descriptionEN="CME develops power electronics, motor drives and thermally demanding assemblies for companies in the Munich area. In-house EMS manufacturing."
        path="/elektronikentwicklung-muenchen"
        rawTitle
        additionalSchemas={[faqSchema, ...serviceSchemas]}
        keywordsDE="Elektronikentwicklung München, Leistungselektronik München, Entwicklungsdienstleister München, EMS München, Thermal Management, Antriebselektronik"
        keywordsEN="electronics development Munich, power electronics Munich, development partner Munich, EMS, thermal management"
      />

      {/* ── HEADER (reduced, conversion-focused) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" style={{ height: 'var(--nav-height)' }}>
          <Link href="/">
            <img src={LOGO_URL} alt="CME Control Motion Electronics" className="w-auto" style={{ height: 'var(--nav-logo)' }} width={200} height={40} />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href={PHONE_HREF} className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-cme-blue transition-colors">
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <a href="#anfrage" className="inline-flex items-center gap-2 px-4 py-2.5 bg-cme-blue text-white font-semibold rounded-lg hover:bg-cme-blue/90 transition-colors text-sm">
              Entwicklungsbedarf besprechen
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* ══════════ 1. HERO ══════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cme-blue-light py-16 sm:py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
              {/* Left: Text */}
              <div>
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-cme-blue uppercase mb-4">
                  Elektronikentwicklung · Raum München
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Ihr Entwicklungspartner für anspruchsvolle Elektronik&shy;projekte im Raum München.
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                  Wenn interne Kapazitäten fehlen, spezielles Know-how benötigt wird oder Projekte schneller zur Serienreife geführt werden müssen – CME übernimmt Ihre Elektronikentwicklung. Mit eigener Fertigung.
                </p>
                <a href="#anfrage" className="inline-flex items-center gap-2 px-6 py-3.5 bg-cme-blue text-white font-bold rounded-lg hover:bg-cme-blue/90 transition-all shadow-lg shadow-cme-blue/20 text-base">
                  Entwicklungsbedarf besprechen
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>

              {/* Right: Diamond Video */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:flex relative items-center justify-center"
              >
                <div
                  className="absolute diamond bg-cme-blue/[0.07]"
                  style={{
                    width: 'clamp(420px, 33vw, 630px)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) translate(8%, 8%)',
                    zIndex: 1,
                  }}
                />
                <div
                  className="diamond shadow-xl shadow-cme-blue/15 relative"
                  style={{ width: 'clamp(360px, 30vw, 570px)', zIndex: 2 }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={HERO_VIDEO_POSTER}
                    src={heroVideoSrc}
                    width={1920}
                    height={1080}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Clock, text: 'Erste Rückmeldung in 1 Werktag' },
                { icon: MapPin, text: 'Persönliche Präsenz in München' },
                { icon: Layers, text: 'Entwicklung + Fertigung aus einer Hand' },
                { icon: ShieldCheck, text: 'ISO 9001 & 14001 zertifiziert' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-cme-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-cme-blue" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 2. TYPISCHE PROJEKTSITUATIONEN ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Typische Projektsituationen, in denen wir unterstützen
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Wir arbeiten mit Unternehmen, die einen erfahrenen Partner für klar definierte Elektronikprojekte suchen.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Building2,
                  title: 'Kapazitätsengpass',
                  desc: 'Ihre Entwicklungsabteilung ist ausgelastet, aber neue Projekte warten. Wir übernehmen abgegrenzte Arbeitspakete oder vollständige Entwicklungen.',
                },
                {
                  icon: Thermometer,
                  title: 'Anspruchsvolle Entwicklung',
                  desc: 'Hohe Leistungsdichten, begrenzter Bauraum, thermische Herausforderungen – wir bringen das Spezialwissen mit, das intern fehlt.',
                },
                {
                  icon: RefreshCw,
                  title: 'Redesign & Obsolescence',
                  desc: 'Bauteilabkündigungen oder neue Anforderungen erfordern eine Überarbeitung bestehender Baugruppen. Wir führen das Redesign durch.',
                },
                {
                  icon: Factory,
                  title: 'Prototyp zur Serie',
                  desc: 'Ihr Prototyp funktioniert, aber der Weg zur Serienfertigung fehlt. Wir industrialisieren und fertigen in unserer eigenen EMS-Linie.',
                },
                {
                  icon: Cpu,
                  title: 'Spezielles Know-how',
                  desc: 'Leistungselektronik, Motorsteuerungen, EMV-Qualifikation – Kompetenzen, die nicht in jedem Unternehmen vorhanden sind.',
                },
                {
                  icon: Workflow,
                  title: 'Schneller zur Serienreife',
                  desc: 'Termindruck bei neuen Produktgenerationen. Wir beschleunigen die Entwicklung durch parallele Arbeitsstränge und eigene Fertigung.',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-cme-blue/20 hover:bg-cme-blue-light/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-cme-blue/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cme-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 3. KOMPETENZFELDER ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Unsere Kompetenzfelder
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Schwerpunkte, in denen wir besondere Erfahrung und nachweisbare Ergebnisse mitbringen.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: 'Leistungselektronik', desc: 'Wechselrichter, DC/DC-Wandler, Motorsteuerungen und Netzteile – auch bei hohen Leistungsdichten und begrenztem Bauraum.' },
                { icon: Thermometer, title: 'Thermal Management', desc: 'Thermische Simulation, Entwärmungskonzepte und Validierung. Wir lösen thermische Herausforderungen systematisch.' },
                { icon: Cpu, title: 'Hardware & Embedded', desc: 'Schaltungsentwurf, PCB-Layout, FPGA und Embedded Software (C/C++, RTOS) für komplexe Elektronikbaugruppen.' },
                { icon: Cog, title: 'Antriebselektronik', desc: 'Motorsteuerungen (FOC, DTC), Leistungsendstufen und Regelungstechnik für BLDC, PMSM und Reluktanzmotoren.' },
                { icon: ShieldCheck, title: 'EMV & Validierung', desc: 'EMV-Prüfung, Umwelttests und Qualifikation nach Automotive- und Industriestandards im eigenen Labor.' },
                { icon: Factory, title: 'EMS-Fertigung', desc: 'Eigene SMD- und THT-Bestückung, Baugruppenmontage und Qualitätsprüfung – vom Prototyp bis zur Serie.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-cme-blue/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cme-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 4. SO ARBEITEN WIR ZUSAMMEN ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              So arbeiten wir zusammen
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Transparente Zusammenarbeit zwischen München und unserem Entwicklungs- und Fertigungsstandort in Dortmund.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Erstgespräch', desc: 'Wir klären Ihren Bedarf – vor Ort in München, per Video oder Telefon. Kostenlos und unverbindlich.' },
                { step: '02', title: 'Konzept & Angebot', desc: 'Sie erhalten eine belastbare Einschätzung zu Machbarkeit, Zeitrahmen und Kosten.' },
                { step: '03', title: 'Entwicklung', desc: 'Unser Team in Dortmund entwickelt Ihre Elektronik – mit regelmäßigen Reviews und kurzen Abstimmungswegen.' },
                { step: '04', title: 'Fertigung & Übergabe', desc: 'Prototypen und Serie aus unserer eigenen EMS-Linie. Oder Übergabe an Ihren Fertiger – Sie entscheiden.' },
              ].map(({ step, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-cme-blue text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-cme-blue-light/50 border border-cme-blue/10 text-center">
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                <strong>Persönliche Präsenz:</strong> Unser Team ist regelmäßig in München vor Ort – für Kickoffs, Reviews und persönliche Gespräche.
                Alle vier bis sechs Wochen gebündelte München-Termine für Interessenten und Bestandskunden.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════ 5. BRANCHEN ══════════ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Branchen, die wir bedienen
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Industrieelektronik & Automatisierung',
                'Leistungselektronik',
                'Medizintechnik',
                'Automotive & Mobilität',
                'Energie & Ladeinfrastruktur',
                'Maschinenbau',
                'Luft- und Raumfahrt',
              ].map((b, i) => (
                <span key={i} className="px-4 py-2.5 bg-white rounded-full border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 6. FAQ ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Häufige Fragen
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-xl px-5 data-[state=open]:border-cme-blue/30">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-cme-blue py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ══════════ 7. KONTAKTFORMULAR ══════════ */}
        <section id="anfrage" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: CTA text */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                  Entwicklungsbedarf besprechen
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Beschreiben Sie kurz Ihr Vorhaben – wir melden uns innerhalb eines Werktags mit einer ersten Einschätzung.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Kostenlose Ersteinschätzung</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">NDA auf Anfrage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Rückmeldung in 1 Werktag</span>
                  </div>
                </div>
                <div className="space-y-3 text-gray-400">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a href={PHONE_HREF} className="hover:text-white transition-colors">{PHONE}</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:info@control-motion.de" className="hover:text-white transition-colors">info@control-motion.de</a>
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <MunichContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER (minimal) ── */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={LOGO_URL} alt="CME" className="h-6 w-auto opacity-60" width={120} height={24} />
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/impressum" className="hover:text-gray-300">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gray-300">Datenschutz</Link>
            <Link href="/" className="hover:text-gray-300">control-motion.de</Link>
          </div>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} CME Control Motion Electronics GmbH
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Munich Campaign Contact Form ── */
function MunichContactForm() {
  const utm = useUtmParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      // Google Ads Conversion Tracking
      const gtag = (window as any).gtag;
      const adsId = import.meta.env.VITE_GOOGLE_ADS_ID;
      if (gtag && adsId) {
        gtag('event', 'conversion', {
          send_to: `${adsId}/MucLead`,
          value: 1.0,
          currency: 'EUR',
        });
      }
    },
    onError: (err) => toast.error(err.message || 'Fehler beim Senden. Bitte versuchen Sie es erneut.'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast.error('Bitte akzeptieren Sie die Datenschutzerklärung.');
      return;
    }
    // Build source string with UTM parameters for campaign tracking
    const utmParts = [
      'landing-muenchen',
      utm.source && `src:${utm.source}`,
      utm.medium && `med:${utm.medium}`,
      utm.campaign && `cmp:${utm.campaign}`,
      utm.term && `term:${utm.term}`,
      utm.content && `cnt:${utm.content}`,
    ].filter(Boolean).join('|');

    submitMutation.mutate({
      salutation: 'Keine Angabe',
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      company: formData.company || undefined,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
      source: utmParts,
      privacyConsent: true as const,
      website: honeypot || undefined,
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Anfrage erhalten!</h3>
        <p className="text-gray-600">Wir melden uns innerhalb von 1 Werktag (Mo–Fr) bei Ihnen.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Vorname *</label>
          <Input
            required
            value={formData.firstName}
            onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
            placeholder="Max"
            className="h-11"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nachname *</label>
          <Input
            required
            value={formData.lastName}
            onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
            placeholder="Mustermann"
            className="h-11"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Unternehmen *</label>
        <Input
          required
          value={formData.company}
          onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
          placeholder="Firma GmbH"
          className="h-11"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">E-Mail *</label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
            placeholder="max@firma.de"
            className="h-11"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon (optional)</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
            placeholder="+49 ..."
            className="h-11"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Projektbeschreibung *</label>
        <Textarea
          required
          value={formData.message}
          onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
          placeholder="Beschreiben Sie kurz Ihr Vorhaben: Welche Funktion soll die Elektronik erfüllen? Welche Herausforderungen bestehen?"
          rows={5}
          className="resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy-muenchen"
          checked={formData.privacy}
          onChange={(e) => setFormData(p => ({ ...p, privacy: e.target.checked }))}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-cme-blue focus:ring-cme-blue"
        />
        <label htmlFor="privacy-muenchen" className="text-sm text-gray-600">
          Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
          <Link href="/datenschutz" className="text-cme-blue underline">Datenschutzerklärung</Link> zu. *
        </label>
      </div>

      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full h-12 bg-cme-blue hover:bg-cme-blue/90 text-white font-bold text-base rounded-lg shadow-lg shadow-cme-blue/20"
      >
        {submitMutation.isPending ? (
          <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Wird gesendet...</>
        ) : (
          <><Send className="w-5 h-5 mr-2" /> Anfrage senden</>
        )}
      </Button>

      <div className="text-center pt-2 space-y-2">
        <p className="text-sm text-gray-500">
          Oder direkt anrufen:{' '}
          <a href={PHONE_HREF} className="font-semibold text-cme-blue hover:underline">{PHONE}</a>
        </p>
        <p className="text-xs text-gray-400">Kein Spam. NDA auf Anfrage.</p>
      </div>
    </form>
  );
}
