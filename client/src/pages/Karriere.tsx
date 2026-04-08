import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Zap, Users, GraduationCap, Heart, MapPin, Clock } from 'lucide-react';

const benefits = [
  { icon: Zap, titleDE: 'Spannende Projekte', titleEN: 'Exciting Projects', descDE: 'Arbeiten Sie an Elektronik für Automotive, Medizintechnik und Industrie.', descEN: 'Work on electronics for automotive, medical technology and industry.' },
  { icon: Users, titleDE: 'Starkes Team', titleEN: 'Strong Team', descDE: 'Über 120 Kolleginnen und Kollegen mit Leidenschaft für Elektronik.', descEN: 'Over 120 colleagues with a passion for electronics.' },
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
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-cme-blue text-sm font-semibold tracking-widest uppercase">
              {isDE ? 'Karriere' : 'Careers'}
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-cme-dark mt-4 leading-tight">
              {isDE ? 'Gestalten Sie die Elektronik von morgen.' : 'Shape the electronics of tomorrow.'}
            </h1>
            <p className="text-lg text-gray-600 mt-6">
              {isDE
                ? 'CME wächst – und sucht Ingenieure, Techniker und Spezialisten, die Elektronik nicht nur als Beruf, sondern als Berufung sehen.'
                : 'CME is growing – and looking for engineers, technicians and specialists who see electronics not just as a job, but as a calling.'}
            </p>
            <a
              href="mailto:karriere@control-motion.de"
              className="inline-block bg-cme-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors mt-8"
            >
              {isDE ? 'Initiativbewerbung senden' : 'Send Speculative Application'}
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <h2 className="text-3xl font-bold text-cme-dark text-center mb-12">
            {isDE ? 'Was CME als Arbeitgeber bietet' : 'What CME offers as an employer'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-cme-blue-light flex items-center justify-center mb-4">
                  <benefit.icon size={20} className="text-cme-blue" />
                </div>
                <h3 className="font-bold text-cme-dark mb-2">{isDE ? benefit.titleDE : benefit.titleEN}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{isDE ? benefit.descDE : benefit.descEN}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-cme-dark">
            {isDE ? 'Keine passende Stelle gefunden?' : 'No suitable position found?'}
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            {isDE
              ? 'Wir freuen uns immer über Initiativbewerbungen von talentierten Menschen, die Elektronik lieben. Senden Sie uns Ihre Unterlagen.'
              : 'We always welcome speculative applications from talented people who love electronics. Send us your documents.'}
          </p>
          <a
            href="mailto:karriere@control-motion.de"
            className="inline-block bg-cme-blue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors mt-8"
          >
            {isDE ? 'karriere@control-motion.de' : 'karriere@control-motion.de'}
          </a>
        </div>
      </section>
    </Layout>
  );
}
