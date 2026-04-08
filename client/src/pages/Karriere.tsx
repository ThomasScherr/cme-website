import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Zap, Users, GraduationCap, Heart, MapPin, Clock } from 'lucide-react';

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

  return (
    <Layout>
      {/* Hero */}
      <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-cme-blue fluid-small font-semibold tracking-widest uppercase">
              {isDE ? 'Karriere' : 'Careers'}
            </span>
            <h1 className="fluid-h1 text-cme-dark leading-tight" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE ? 'Gestalten Sie die Elektronik von morgen.' : 'Shape the electronics of tomorrow.'}
            </h1>
            <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-sm)' }}>
              {isDE
                ? 'CME wächst – und sucht Ingenieure, Techniker und Spezialisten, die Elektronik nicht nur als Beruf, sondern als Berufung sehen.'
                : 'CME is growing – and looking for engineers, technicians and specialists who see electronics not just as a job, but as a calling.'}
            </p>
            <a
              href="mailto:karriere@control-motion.de"
              className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
              style={{ marginTop: 'var(--space-gap-md)' }}
            >
              {isDE ? 'Initiativbewerbung senden' : 'Send Speculative Application'}
            </a>
          </div>
        </div>
      </section>

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
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all fluid-card"
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
            {isDE ? 'Keine passende Stelle gefunden?' : 'No suitable position found?'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Wir freuen uns immer über Initiativbewerbungen von talentierten Menschen, die Elektronik lieben. Senden Sie uns Ihre Unterlagen.'
              : 'We always welcome speculative applications from talented people who love electronics. Send us your documents.'}
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
    </Layout>
  );
}
