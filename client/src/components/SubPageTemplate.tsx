import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  de: string;
  en: string;
}

interface SubPageProps {
  parentHref: string;
  parentLabelDE: string;
  parentLabelEN: string;
  titleDE: string;
  titleEN: string;
  subtitleDE: string;
  subtitleEN: string;
  heroImg: string;
  introDE: string;
  introEN: string;
  features: Feature[];
  ctaDE?: string;
  ctaEN?: string;
  relatedPages?: { href: string; titleDE: string; titleEN: string; img: string }[];
}

export default function SubPageTemplate({
  parentHref,
  parentLabelDE,
  parentLabelEN,
  titleDE,
  titleEN,
  subtitleDE,
  subtitleEN,
  heroImg,
  introDE,
  introEN,
  features,
  ctaDE = 'Projekt anfragen',
  ctaEN = 'Request Project',
  relatedPages = [],
}: SubPageProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      {/* Breadcrumb + Hero */}
      <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/20">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center fluid-xs text-gray-500" style={{ gap: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)', marginBottom: 'var(--space-gap-md)' }}>
            <Link href="/" className="hover:text-cme-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={parentHref} className="hover:text-cme-blue transition-colors">
              {isDE ? parentLabelDE : parentLabelEN}
            </Link>
            <span>/</span>
            <span className="text-cme-dark font-medium">{isDE ? titleDE : titleEN}</span>
          </div>

          <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            <div>
              <Link
                href={parentHref}
                className="inline-flex items-center gap-2 text-cme-blue fluid-small font-medium hover:gap-3 transition-all"
                style={{ marginBottom: 'var(--space-gap-xs)' }}
              >
                <ArrowLeft size={16} />
                {isDE ? parentLabelDE : parentLabelEN}
              </Link>
              <h1 className="fluid-h1 text-cme-dark leading-tight">
                {isDE ? titleDE : titleEN}
              </h1>
              <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-xs)' }}>
                {isDE ? subtitleDE : subtitleEN}
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={heroImg}
                  alt={isDE ? titleDE : titleEN}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad">
        <div className="container">
          <div className="max-w-3xl">
            <p className="fluid-body-lg text-gray-700 leading-relaxed">
              {isDE ? introDE : introEN}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card"
              >
                <div className="w-2 h-2 rounded-full bg-cme-blue" style={{ marginBottom: 'var(--space-gap-xs)' }} />
                <p className="font-medium text-cme-dark fluid-body">{isDE ? feature.de : feature.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      {relatedPages.length > 0 && (
        <section className="section-pad bg-gray-50">
          <div className="container">
            <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-md)' }}>
              {isDE ? 'Weitere Leistungen' : 'Related Services'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
              {relatedPages.map((page) => (
                <Link key={page.href} href={page.href} className="group block">
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={page.img}
                        alt={isDE ? page.titleDE : page.titleEN}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center justify-between fluid-card">
                      <h3 className="font-semibold text-cme-dark fluid-body">{isDE ? page.titleDE : page.titleEN}</h3>
                      <ArrowRight size={18} className="text-cme-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Bereit für Ihr Projekt?' : 'Ready for your project?'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Sprechen Sie mit uns – wir geben ehrliches technisches Feedback und kalkulieren Ihr Projekt.'
              : 'Talk to our engineers – we provide honest technical feedback and calculate your project.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? ctaDE : ctaEN}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
