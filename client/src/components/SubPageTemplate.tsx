import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  de: string;
  en: string;
  icon?: LucideIcon;
}

interface HeroVideo {
  webm?: string;
  mp4?: string;
  poster?: string;
}

interface SubPageProps {
  /** CMS page key, e.g. 'entwicklung.controldesign' */
  pageKey?: string;
  parentHref: string;
  parentLabelDE: string;
  parentLabelEN: string;
  titleDE: string;
  titleEN: string;
  subtitleDE: string;
  subtitleEN: string;
  heroImg?: string;
  heroVideo?: HeroVideo;
  introDE: string;
  introEN: string;
  features: Feature[];
  ctaDE?: string;
  ctaEN?: string;
}

export default function SubPageTemplate({
  pageKey,
  parentHref,
  parentLabelDE,
  parentLabelEN,
  titleDE,
  titleEN,
  subtitleDE,
  subtitleEN,
  heroImg,
  heroVideo,
  introDE,
  introEN,
  features,
  ctaDE = 'Anforderungen senden',
  ctaEN = 'Send requirements',
}: SubPageProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  // CMS integration: load CMS content with fallback to hardcoded props
  const { t, img } = useContent(pageKey || '__none__');

  // Resolve values: CMS overrides props when pageKey is set
  const title = pageKey ? (t('content.title') || (isDE ? titleDE : titleEN)) : (isDE ? titleDE : titleEN);
  const subtitle = pageKey ? (t('content.subtitle') || (isDE ? subtitleDE : subtitleEN)) : (isDE ? subtitleDE : subtitleEN);
  const intro = pageKey ? (t('content.intro') || (isDE ? introDE : introEN)) : (isDE ? introDE : introEN);
  const heroImage = pageKey ? img('hero.heroImage', heroImg || '') : heroImg;
  const contentImage = pageKey ? img('content.contentImage', heroImg || '') : heroImg;

  return (
    <Layout>
      <SubPageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: isDE ? parentLabelDE : parentLabelEN, href: parentHref },
          { label: title },
        ]}
        backLink={{
          label: isDE ? parentLabelDE : parentLabelEN,
          href: parentHref,
        }}
        headline={title}
        description={subtitle}
        heroImage={heroImage}
        heroImageAlt={title}
        heroVideo={heroVideo}
      />

      {/* Content */}
      <section className="section-pad">
        <div className="container">
          {/* Intro: Diamond image left + Text right */}
          <div className="grid lg:grid-cols-[auto_1fr] items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            {/* Small diamond with content image */}
            <div className="relative flex items-center justify-center" style={{ marginLeft: '35px', marginRight: '20px' }}>
              <div
                className="relative overflow-hidden shadow-lg"
                style={{
                  width: 'clamp(10rem, 7rem + 7vw, 16rem)',
                  height: 'clamp(10rem, 7rem + 7vw, 16rem)',
                  transform: 'rotate(45deg)',
                  borderRadius: 'clamp(0.5rem, 0.3rem + 0.4vw, 1rem)',
                }}
              >
                <img
                  src={contentImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transform: 'rotate(-45deg) scale(1.42)' }}
                />
              </div>
              {/* Accent diamond behind */}
              <div
                className="absolute -z-10 bg-cme-blue/8"
                style={{
                  width: 'clamp(12rem, 9rem + 8vw, 19rem)',
                  height: 'clamp(12rem, 9rem + 8vw, 19rem)',
                  transform: 'rotate(45deg) translate(6%, 6%)',
                  borderRadius: 'clamp(0.5rem, 0.3rem + 0.4vw, 1rem)',
                }}
              />
            </div>
            {/* Text on the right */}
            <div>
              <p className="fluid-body-lg text-gray-700 leading-relaxed">
                {intro}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card"
                >
                  {Icon ? (
                    <div
                      className="w-14 h-14 rounded-xl bg-cme-blue/10 flex items-center justify-center"
                      style={{ marginBottom: 'var(--space-gap-xs)' }}
                    >
                      <Icon size={28} className="text-cme-blue" strokeWidth={1.5} />
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-cme-blue" style={{ marginBottom: 'var(--space-gap-xs)' }} />
                  )}
                  <p className="font-medium text-cme-dark fluid-body">{pageKey ? (t(`features.feature.${i}`) || (isDE ? feature.de : feature.en)) : (isDE ? feature.de : feature.en)}</p>
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
            {isDE ? 'Machbarkeit klären – bevor Kosten entstehen.' : 'Clarify feasibility – before costs arise.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Senden Sie uns Ihre Anforderungen. Wir prüfen Machbarkeit, Risiken und Zeitrahmen – und sagen ehrlich, was geht.'
              : 'Send us your requirements. We evaluate feasibility, risks and timeline – and tell you honestly what works.'}
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
