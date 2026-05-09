import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
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
  Clock, Radio, MapPin, Layers, Cpu, Cog, SlidersHorizontal,
  ShieldCheck, FlaskConical, Waves, Phone, Mail, Send, Loader2,
  CheckCircle, ChevronRight, Zap, Building2, Factory, Globe2,
  FileText, Upload
} from 'lucide-react';
import { Link } from 'wouter';

/* ══════════════════════════════════════════════════════════════════
   GOOGLE ADS LANDING PAGE – /elektronikentwicklung
   Conversion-optimiert, kein allgemeiner Markenauftritt
   ══════════════════════════════════════════════════════════════════ */

const PHONE = '0231 286676960';
const PHONE_HREF = 'tel:+492312866769600';
const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB_433c645f.png';
const HERO_VIDEO_WEBM = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample_d94dc755.webm';
const HERO_VIDEO_MP4 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample-compressed_8b0d5332.mp4';
const HERO_VIDEO_POSTER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero-video-poster_8c5a9e34.jpg';

// ── FAQ Data ──
const faqs = [
  {
    question: 'Wie schnell bekomme ich eine Rückmeldung auf meine Anfrage?',
    answer: 'Innerhalb von einem Werktag (Mo–Fr) erhalten Sie eine erstes Feedback auf Ihre Anfrage.',
  },
  {
    question: 'Was kostet eine Elektronikentwicklung bei CME?',
    answer: 'Die Kosten hängen von der Komplexität ab: Ein einfaches Sensorboard liegt im niedrigen fünfstelligen Bereich, komplexe Leistungselektronik mit Funktionaler Sicherheit im sechsstelligen Bereich. Nach der kostenlosen Machbarkeitsanalyse erhalten Sie eine belastbare Kosten- und Zeitschätzung.',
  },
  {
    question: 'Können Sie bestehende Produkte redesignen oder weiterentwickeln?',
    answer: 'Ja – Redesign und Weiterentwicklung gehören zu unseren Kernleistungen. Typische Anlässe: Bauteilabkündigungen, Kostenoptimierung, Leistungssteigerung oder Anpassung an neue Normen. Wir analysieren Ihr bestehendes Design und führen das Redesign inklusive Simulation und Validierung durch.',
  },
  {
    question: 'Entwickelt CME auch für Automotive oder Medizintechnik?',
    answer: 'Ja. Wir entwickeln nach ISO 26262 (Automotive, Funktionale Sicherheit), Automotive SPICE und kennen die Anforderungen der IEC 60601 (Medizintechnik). Unsere Prozesse sind ISO 9001 zertifiziert.',
  },
  {
    question: 'Was passiert nach der Entwicklung – könnt ihr auch fertigen?',
    answer: 'Ja. CME verfügt über eine eigene EMS-Fertigung am Standort Dortmund. Vom Prototyp bis zur Serie können wir alles inhouse abbilden – ohne externe Abstimmung. Sie können aber auch einen eigenen Fertiger wählen.',
  },
  {
    question: 'Muss ein vollständiges Lastenheft vorliegen?',
    answer: 'Nein. Oft starten wir mit einer Funktionsbeschreibung, einer Skizze oder einem bestehenden Produkt. Unsere Ingenieure erarbeiten gemeinsam mit Ihnen die Anforderungen und erstellen bei Bedarf das Pflichtenheft.',
  },
];

// ── Service Data for Schema ──
const services = [
  { name: 'Hardware & Software Design', description: 'Schaltungsentwurf, PCB-Layout, Embedded Software (C/C++, RTOS) für Leistungselektronik und Antriebselektronik.' },
  { name: 'E-Motor Design', description: 'Elektromagnetische Auslegung, FEA-Simulation und Optimierung von BLDC, PMSM und Reluktanzmotoren mit Motor-CAD.' },
  { name: 'Control Design', description: 'Reglerauslegung für Motorsteuerungen (FOC, DTC), Stromversorgungen und komplexe Mehrgrößensysteme.' },
  { name: 'Simulation', description: 'Thermische Simulation, EMV-Simulation, Schaltungssimulation und CFD-Analyse für optimale Designs.' },
  { name: 'Validierung & EMV', description: 'EMV-Prüfung im eigenen Labor, Umwelttests, Qualifikation nach Automotive- und Industriestandards.' },
  { name: 'Test & Verification', description: 'Automatisierte Testkonzepte, HIL-Tests, Lebensdauertests und Serienprüfmittelentwicklung.' },
];

// ── Schemas ──
const faqSchema = buildFAQSchema(faqs);
const serviceSchemas = buildServiceSchema(services.map(s => ({ ...s, url: '/elektronikentwicklung' })));

export default function LandingElektronikentwicklung() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO
        titleDE="Elektronikentwicklung Dortmund | Leistungselektronik & Embedded | CME"
        titleEN="Electronics Development Dortmund | Power Electronics & Embedded | CME"
        descriptionDE="CME entwickelt Leistungselektronik, Antriebselektronik und Embedded Systeme in Dortmund. Eigenes EMV-Labor. Direkt zur Serienfertigung. Jetzt Projekt anfragen."
        descriptionEN="CME develops power electronics, motor drives and embedded systems in Dortmund Germany. In-house EMC lab. Direct path to series production."
        path="/elektronikentwicklung"
        rawTitle
        additionalSchemas={[faqSchema, ...serviceSchemas]}
        keywordsDE="Elektronikentwicklung, Leistungselektronik, Antriebselektronik, Embedded Systeme, EMV, Dortmund, EMS"
        keywordsEN="electronics development, power electronics, motor drives, embedded systems, EMC, Dortmund, EMS"
      />

      {/* ── HEADER (reduced) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" style={{ height: 'var(--nav-height)' }}>
          <Link href="/">
            <img src={LOGO_URL} alt="CME Control Motion Electronics" className="w-auto" style={{ height: 'var(--nav-logo)' }} />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/unternehmen" className="hidden sm:inline-flex text-sm font-medium text-gray-600 hover:text-cme-blue transition-colors">
              Über CME
            </Link>
            <a href={PHONE_HREF} className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-cme-blue transition-colors">
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <a href="#anfrage" className="inline-flex items-center gap-2 px-4 py-2.5 bg-cme-blue text-white font-semibold rounded-lg hover:bg-cme-blue/90 transition-colors text-sm">
              Projekt besprechen
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
                  Elektronikentwicklung · Dortmund
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Ihr Entwicklungspartner für Leistungselektronik — von der Schaltung bis zur Serienfertigung.
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                  CME entwickelt Hardware, Embedded Software und Antriebselektronik für Industrie, Automotive und E-Mobility. Mit eigenem EMV-Labor, thermischer Simulation und direktem Weg zur Fertigung.
                </p>
                <a href="#anfrage" className="inline-flex items-center gap-2 px-6 py-3.5 bg-cme-blue text-white font-bold rounded-lg hover:bg-cme-blue/90 transition-all shadow-lg shadow-cme-blue/20 text-base">
                  Projekt besprechen
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
                {/* Accent diamond behind */}
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
                {/* Main diamond with video */}
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
                  >
                    <source src={HERO_VIDEO_WEBM} type="video/webm" />
                    <source src={HERO_VIDEO_MP4} type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Clock, text: 'Erste Rückmeldung in 1 Werktag' },
                { icon: Radio, text: 'Eigenes EMV-Labor' },
                { icon: MapPin, text: 'Dortmund, Deutschland' },
                { icon: Layers, text: 'Entwicklung + EMS aus einer Hand' },
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

        {/* ══════════ 2. PROBLEM → LÖSUNG ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
              Sie suchen einen Entwicklungspartner, der technisch mitdenkt — nicht nur koordiniert.
            </h2>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
              {[
                { title: 'Zu wenig interne Ressourcen', desc: 'Keine Kapazität für komplexe Leistungselektronik — Projekte bleiben liegen oder verzögern sich.' },
                { title: 'Prototyp ≠ Serienreife', desc: 'EMV und Qualifikation als häufigster Engpass — der Prototyp funktioniert, aber die Zulassung scheitert.' },
                { title: 'Zu viele Schnittstellen', desc: 'Hardware, Software, EMV und Fertiger koordinieren kostet Zeit und erhöht das Fehlerrisiko.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm mb-4">{i + 1}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-cme-blue/5 border-l-4 border-cme-blue rounded-r-xl p-6">
              <p className="text-lg font-semibold text-cme-blue">
                CME liefert alles aus einer Hand: Entwicklung, Test, EMV und Serienfertigung — ohne externe Abstimmung.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════ 3. LEISTUNGEN ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Was wir entwickeln
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Unsere Ingenieure decken die gesamte Wertschöpfungskette ab — von der ersten Idee bis zum serienreifen Produkt.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Cpu, title: 'Hardware & Software Design', desc: 'Schaltungsentwurf, PCB-Layout und Embedded Software (C/C++, RTOS) für Leistungselektronik und Antriebssysteme.' },
                { icon: Cog, title: 'E-Motor Design', desc: 'Elektromagnetische Auslegung, FEA-Simulation und Optimierung von BLDC, PMSM und Reluktanzmotoren.' },
                { icon: SlidersHorizontal, title: 'Control Design', desc: 'Reglerauslegung für Motorsteuerungen (FOC, DTC), Stromversorgungen und Mehrgrößensysteme.' },
                { icon: Waves, title: 'Simulation', desc: 'Thermische Simulation, EMV-Simulation, Schaltungssimulation und CFD-Analyse für optimale Designs.' },
                { icon: ShieldCheck, title: 'Validierung & EMV', desc: 'EMV-Prüfung im eigenen Labor, Umwelttests, Qualifikation nach Automotive- und Industriestandards.' },
                { icon: FlaskConical, title: 'Test & Verification', desc: 'Automatisierte Testkonzepte, HIL-Tests, Lebensdauertests und Serienprüfmittelentwicklung.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-cme-blue/30 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-cme-blue/10 flex items-center justify-center mb-4 group-hover:bg-cme-blue/20 transition-colors">
                    <Icon className="w-6 h-6 text-cme-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 4. KERNKOMPETENZEN ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
              Technologische Tiefe — unsere Kernkompetenzen
            </h2>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto">
              {[
                'Leistungselektronik (SiC, GaN, IGBT, MOSFET)',
                'Antriebselektronik & Motor Control (FOC, BLDC/PMSM)',
                'E-Motor-Design & -Auslegung (FEA, Motor-CAD)',
                'Stromversorgungen: DC/DC, AC/DC, BMS',
                'Umrichter: Automotive, Ladetechnik, PV',
                'Thermisches Management & Verlustleistungssimulation',
                'EMV-Design & Qualifikation',
                'Funktionale Sicherheit (ISO 26262)',
                'Automotive SPICE',
                'Embedded Systems RTOS (C/C++)',
                'CAN, LIN, SPI, EtherCAT',
                'Robuste Elektronik für raue Umgebungen',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100">
                  <Zap className="w-5 h-5 text-cme-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 5. PROZESS ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Vom Briefing zum serienreifen Produkt — in 4 Schritten
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Unser bewährter Prozess bringt Ihr Projekt effizient vom Konzept zur Serie.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Briefing & Machbarkeit', desc: 'Rückmeldung innerhalb von 1 Werktag (Mo–Fr), kostenlos. Wir bewerten Ihre Anforderungen und geben eine erste Einschätzung.' },
                { step: '2', title: 'Konzept & Angebot', desc: 'Technisches Konzept, Zeitplan und transparentes Angebot mit klaren Meilensteinen.' },
                { step: '3', title: 'Entwicklung & Prototyp', desc: 'Hardware, Software und Simulation parallel. Prototypenfertigung in eigener Produktion.' },
                { step: '4', title: 'Test, Qualifikation & Serie', desc: 'EMV, Umwelttests, Zulassung und Serienanlauf — alles aus einer Hand.' },
              ].map(({ step, title, desc }, i) => (
                <div key={i} className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-cme-blue text-white flex items-center justify-center font-bold text-lg mb-4">
                    {step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 6. WARUM CME ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
              Warum CME?
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {[
                { icon: Zap, title: 'Technische Tiefe statt Koordination', desc: 'Unsere Ingenieure entwickeln selbst — kein Outsourcing, kein Durchreichen an Subunternehmer.' },
                { icon: Radio, title: 'Eigenes EMV-Labor in Dortmund', desc: 'Schnelle Iterationen ohne externe Labortermine. Pre-Compliance und Debugging direkt vor Ort.' },
                { icon: Factory, title: 'Vom Prototyp direkt zur Serie', desc: 'Eigene EMS-Fertigung am Standort. Kein Lieferantenwechsel, keine Übergabeverluste.' },
                { icon: Globe2, title: 'Standort Deutschland — kurze Wege', desc: 'Kein Offshore-Risiko. Persönliche Ansprechpartner. Kommunikation auf Augenhöhe.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-cme-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-cme-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 7. ANFRAGEFORMULAR ══════════ */}
        <section id="anfrage" className="py-16 sm:py-20 lg:py-24 bg-gray-50 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-3">
              Projekt besprechen — kostenlos und unverbindlich
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Beschreiben Sie Ihr Vorhaben. Wir melden uns innerhalb von 1 Werktag (Mo–Fr).
            </p>

            <ContactForm />
          </div>
        </section>

        {/* ══════════ 8. FAQ ══════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-10">
              Häufige Fragen
            </h2>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-xl px-6 data-[state=open]:border-cme-blue/30 data-[state=open]:shadow-sm transition-all">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* ══════════ 9. FOOTER (reduziert) ══════════ */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href={PHONE_HREF} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
              <a href="mailto:info@control-motion.de" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@control-motion.de
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} CME Control Motion Electronics GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Contact Form Component ── */
function ContactForm() {
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
    onSuccess: () => setSubmitted(true),
    onError: (err) => toast.error(err.message || 'Fehler beim Senden. Bitte versuchen Sie es erneut.'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast.error('Bitte akzeptieren Sie die Datenschutzerklärung.');
      return;
    }
    submitMutation.mutate({
      salutation: 'Keine Angabe',
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      company: formData.company || undefined,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
      source: 'landing-elektronikentwicklung',
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
          placeholder="Beschreiben Sie kurz Ihr Vorhaben: Welche Funktion soll die Elektronik erfüllen? Welche Stückzahlen sind geplant?"
          rows={5}
          className="resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy-landing"
          checked={formData.privacy}
          onChange={(e) => setFormData(p => ({ ...p, privacy: e.target.checked }))}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-cme-blue focus:ring-cme-blue"
        />
        <label htmlFor="privacy-landing" className="text-sm text-gray-600">
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
