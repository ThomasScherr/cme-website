import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import {
  ArrowRight,
  CircuitBoard,
  Boxes,
  ShieldCheck,
  Cpu,
  Wrench,
  Eye,
  Paintbrush,
  Cable,
  FlaskConical,
  Database,
  PenTool,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';
const HERO_VIDEO = {
  webm: `${CDN}/leiterplatten-hero_9526f6fb.webm`,
  mp4: `${CDN}/leiterplatten-hero_f10b49bd.mp4`,
  poster: `${CDN}/leiterplatten-hero-poster_168ab542.jpg`,
};

const subpages = [
  {
    icon: CircuitBoard,
    titleDE: 'Leiterplatten bestücken',
    titleEN: 'PCB Assembly',
    descDE: 'SMD- und THT-Bestückung auf modernsten Fertigungslinien – vom Prototyp bis zur Großserie.',
    descEN: 'SMD and THT assembly on state-of-the-art production lines – from prototype to high-volume series.',
    href: '/fertigung/leiterplatten',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg',
  },
  {
    icon: Boxes,
    titleDE: 'Baugruppen fertigen',
    titleEN: 'Module Assembly',
    descDE: 'Komplette Baugruppenmontage inkl. Verguss, Schutzlackierung, Kabelkonfektionierung und Endmontage.',
    descEN: 'Complete module assembly including potting, conformal coating, cable assembly and final assembly.',
    href: '/fertigung/baugruppen',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg',
  },
  {
    icon: ShieldCheck,
    titleDE: 'Qualitätsmanagement',
    titleEN: 'Quality Management',
    descDE: 'ISO 9001 & 14001 zertifiziert. AOI, MOI, und lückenlose Rückverfolgbarkeit durch datenbankgestützte Prozesse.',
    descEN: 'ISO 9001 & 14001 certified. AOI, MOI, and complete traceability through database-driven processes.',
    href: '/fertigung/qualitaet',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg',
  },
];

const capabilities = [
  { de: 'SMD-Bestückung', en: 'SMD Assembly', icon: Cpu },
  { de: 'THT-Bestückung & Selektivlöten', en: 'THT Assembly & Selective Soldering', icon: Wrench },
  { de: 'AOI & MOI', en: 'AOI & MOI', icon: Eye },
  { de: 'Verguss & Schutzlackierung', en: 'Potting & Conformal Coating', icon: Paintbrush },
  { de: 'Kabelkonfektionierung', en: 'Cable Assembly', icon: Cable },
  { de: 'Funktionstest & ICT', en: 'Functional Test & ICT', icon: FlaskConical },
  { de: 'Traceability & MES', en: 'Traceability & MES', icon: Database },
  { de: 'Design for Manufacturing', en: 'Design for Manufacturing', icon: PenTool },
];

export default function Fertigung() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('fertigung');

  // Hero video: CMS overrides hardcoded default
  const cmsVideoWebm = vid('hero.heroVideoWebm');
  const cmsVideoMp4 = vid('hero.heroVideoMp4');
  const cmsVideoPoster = img('hero.heroVideoPoster');
  const cmsVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const effectiveHeroVideo = (cmsVideoWebm || cmsVideoMp4)
    ? { webm: cmsVideoWebm || undefined, mp4: cmsVideoMp4 || undefined, poster: cmsVideoPoster || undefined, playback: (cmsVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : HERO_VIDEO;

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  return (
    <Layout>
      <SEO
        titleDE='Elektronikfertigung & EMS'
        titleEN='Electronics Manufacturing & EMS'
        descriptionDE='EMS-Dienstleister für Leiterplattenbestückung, Baugruppenfertigung und Qualitätssicherung – von Prototypen bis Serienproduktion.'
        descriptionEN='EMS provider for PCB assembly, module manufacturing and quality assurance – from prototypes to series production.'
        path='/fertigung'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Elektronikfertigung',url:'/fertigung'}]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Elektronikfertigung (EMS)' : 'Electronics Manufacturing (EMS)')}
        headline={cms('hero.headline') || (isDE ? 'Vom Prototyp zur Serie. Made in Dortmund.' : 'From prototype to series. Made in Dortmund.')}
        description={cms('hero.description') || (isDE
          ? 'ISO-zertifizierte Elektronikfertigung mit eigener SMD- und THT-Linie. Prototypen, Kleinserien und Serienproduktion – alles aus einer Hand.'
          : 'ISO-certified electronics manufacturing with own SMD and THT lines. Prototypes, small series and series production – all from a single source.')}
        cta={{ label: isDE ? 'Angebot anfragen' : 'Request Quote', href: '/kontakt' }}
        heroVideo={effectiveHeroVideo}
        heroImageAlt="Elektronikfertigung"
      />

      {/* Subpages Grid */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Unsere Fertigungsleistungen' : 'Our Manufacturing Services'}
          </h2>
          <p className="text-gray-600 text-center fluid-body-lg max-w-2xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Von der Leiterplattenbestückung über die Baugruppenmontage bis zur Qualitätssicherung – alles unter einem Dach.'
              : 'From PCB assembly through module integration to quality assurance – all under one roof.'}
          </p>

          <div className="grid md:grid-cols-3" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {subpages.map((page, i) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={page.href} className="group block">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={page.img}
                        alt={isDE ? page.titleDE : page.titleEN}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="fluid-card">
                      <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                        <div
                          className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                          style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                        >
                          <page.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                        </div>
                        <h3 className="fluid-h4 text-cme-dark">
                          {isDE ? page.titleDE : page.titleEN}
                        </h3>
                      </div>
                      <p className="text-gray-600 fluid-small leading-relaxed">
                        {isDE ? page.descDE : page.descEN}
                      </p>
                      <div className="flex items-center text-cme-blue font-semibold fluid-small group-hover:gap-3 transition-all" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-xs)' }}>
                        {isDE ? 'Mehr erfahren' : 'Learn more'}
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Fertigungskapazitäten' : 'Manufacturing Capabilities'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card cursor-pointer"
                  onClick={() => openSlider(isDE ? item.de : item.en)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? item.de : item.en); } }}
                >
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)' }}>
                    <div
                      className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <Icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                    <p className="font-medium text-cme-dark fluid-small">{isDE ? item.de : item.en}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Serienfertigung beginnt mit einer belastbaren Kalkulation.' : 'Series production starts with a reliable quote.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Stückzahl, Technologie, Zeitplan – senden Sie uns die Eckdaten. Wir kalkulieren verbindlich.'
              : 'Volume, technology, timeline – send us the key data. We provide a binding quote.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Fertigungsanfrage stellen' : 'Submit manufacturing inquiry'}
          </Link>
        </div>
      </section>

      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`fertigung – ${sliderTopic}`}
      />
    </Layout>
  );
}
