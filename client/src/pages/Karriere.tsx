import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, Users, GraduationCap, Heart, MapPin, Clock } from 'lucide-react';
import SEO from '@/components/SEO';

const benefits = [
  { icon: Zap, titleDE: 'Spannende Projekte', titleEN: 'Exciting Projects', descDE: 'Arbeiten Sie an Elektronik für Automotive, Medizintechnik und Industrie.', descEN: 'Work on electronics for automotive, medical technology and industry.' },
  { icon: Users, titleDE: 'Starkes Team', titleEN: 'Strong Team', descDE: 'Ein engagiertes Team mit Leidenschaft für Elektronik.', descEN: 'A dedicated team with a passion for electronics.' },
  { icon: GraduationCap, titleDE: 'Weiterbildung', titleEN: 'Training', descDE: 'Individuelle Weiterbildungsmöglichkeiten und Konferenzbesuche.', descEN: 'Individual training opportunities and conference visits.' },
  { icon: Heart, titleDE: 'Work-Life-Balance', titleEN: 'Work-Life Balance', descDE: 'Flexible Arbeitszeiten und Homeoffice-Möglichkeiten.', descEN: 'Flexible working hours and home office options.' },
  { icon: MapPin, titleDE: 'Standort Dortmund', titleEN: 'Location Dortmund', descDE: 'Modernes Büro im Technologiepark Dortmund mit guter Anbindung.', descEN: 'Modern office in Dortmund Technology Park with good connections.' },
  { icon: Clock, titleDE: 'Langfristige Perspektive', titleEN: 'Long-term Perspective', descDE: 'Inhabergeführtes Unternehmen mit stabiler Wachstumsstrategie.', descEN: 'Owner-managed company with stable growth strategy.' },
];

export default function Karriere() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('karriere');

  // Hero video from CMS
  const heroVideoWebm = vid('hero.heroVideoWebm');
  const heroVideoMp4 = vid('hero.heroVideoMp4');
  const heroVideoPoster = img('hero.heroVideoPoster');
  const heroVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const heroVideo = (heroVideoWebm || heroVideoMp4)
    ? { webm: heroVideoWebm || undefined, mp4: heroVideoMp4 || undefined, poster: heroVideoPoster || undefined, playback: (heroVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : undefined;

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  return (
    <Layout>
      <SEO
        titleDE='Karriere in der Elektronikbranche Dortmund'
        titleEN='Careers in Electronics Industry Dortmund'
        descriptionDE='Karriere bei CME in Dortmund: Offene Stellen in Elektronikentwicklung, Leistungselektronik, EMS-Fertigung und Qualitätsmanagement. Jetzt bewerben.'
        descriptionEN='Careers at CME in Dortmund: open positions in electronics development, power electronics, EMS manufacturing and quality management. Apply now.'
        path='/karriere'
        enPath='/en/careers'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Karriere',url:'/karriere'}]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Karriere' : 'Careers')}
        headline={cms('hero.headline') || (isDE ? 'Gestalten Sie die Elektronik von morgen.' : 'Shape the electronics of tomorrow.')}
        description={cms('hero.description') || (isDE
          ? 'CME wächst – und sucht Ingenieure, Techniker und Spezialisten, die Elektronik nicht nur als Beruf, sondern als Berufung sehen.'
          : 'CME is growing – and looking for engineers, technicians and specialists who see electronics not just as a job, but as a calling.')}
        cta={{ label: isDE ? 'Initiativbewerbung senden' : 'Send Speculative Application', href: 'mailto:karriere@control-motion.de' }}
        heroImage={img('hero.heroImage')}
        heroVideo={heroVideo}
      />

      {/* Benefits */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
            {isDE ? 'Was CME als Arbeitgeber bietet' : 'What CME offers as an employer'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-cme-blue/20 transition-all fluid-card cursor-pointer"
                onClick={() => openSlider(isDE ? benefit.titleDE : benefit.titleEN)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? benefit.titleDE : benefit.titleEN); } }}
              >
                <div
                  className="rounded-xl bg-cme-blue-light flex items-center justify-center"
                  style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }}
                >
                  <benefit.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                </div>
                <h3 className="font-bold text-cme-dark fluid-body" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                  {isDE ? benefit.titleDE : benefit.titleEN}
                </h3>
                <p className="text-gray-600 fluid-small leading-relaxed">{isDE ? benefit.descDE : benefit.descEN}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-gray-50">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Kein Standardjob. Echte Projekte. Echte Verantwortung.' : 'Not a standard job. Real projects. Real responsibility.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Wenn Sie Elektronik nicht nur entwickeln, sondern bis zur Serie begleiten wollen – melden Sie sich.'
              : 'If you want to develop electronics and see them through to production – get in touch.'}
          </p>
          <a
            href="mailto:karriere@control-motion.de"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'karriere@control-motion.de' : 'karriere@control-motion.de'}
          </a>
        </div>
      </section>

      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`karriere – ${sliderTopic}`}
      />
    </Layout>
  );
}
