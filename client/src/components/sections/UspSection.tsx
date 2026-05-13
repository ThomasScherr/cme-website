import { useLanguage } from '@/contexts/LanguageContext';
import FadeIn from '@/components/FadeIn';
import { Combine, Radio, Thermometer, ShieldCheck, Award, Scaling, Blocks, Network } from 'lucide-react';

const CME_VIDEO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/cme_loop_v11_16cf9640.mp4';

const icons = [Combine, Radio, Thermometer, ShieldCheck, Award, Scaling];

interface UspSectionProps {
  onCardClick?: (topic: string) => void;
}

export default function UspSection({ onCardClick }: UspSectionProps) {
  const { t, lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section className="section-pad bg-cme-light">
      <div className="container">
        {/* Header */}
        <FadeIn
          className="text-center"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {t.usp.headline}
          </h2>
          <p className="fluid-body-lg text-cme-gray max-w-2xl mx-auto">
            {t.usp.sub}
          </p>
        </FadeIn>

        {/* Featured video */}
        <FadeIn
          className="rounded-2xl overflow-hidden shadow-lg shadow-cme-blue/5"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <video
            aria-label="CME Fertigungshalle – Elektronikproduktion und Qualitätssicherung"
            src={CME_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full object-cover"
            style={{ height: 'clamp(12.5rem, 6rem + 14vw, 22.5rem)' }}
            width={1920}
            height={1080}
          />
        </FadeIn>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
          {t.usp.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <FadeIn
                key={i}
                delay={i * 0.08}
                className={`group relative bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-lg hover:shadow-cme-blue/5 transition-all duration-300 fluid-card ${onCardClick ? 'cursor-pointer' : ''}`}
              >
                <div
                  onClick={onCardClick ? () => onCardClick(item.title) : undefined}
                  role={onCardClick ? 'button' : undefined}
                  tabIndex={onCardClick ? 0 : undefined}
                  onKeyDown={onCardClick ? (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onCardClick(item.title);
                    }
                  } : undefined}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-cme-blue rounded-t-xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <div
                    className="flex items-center justify-center rounded-lg bg-cme-blue/10 text-cme-blue"
                    style={{
                      width: 'var(--icon-box)',
                      height: 'var(--icon-box)',
                      marginBottom: 'var(--space-gap-xs)',
                    }}
                  >
                    <Icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} />
                  </div>
                  <h4 className="fluid-h4 text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.1rem + 0.3vw, 0.5rem)' }}>{item.title}</h4>
                  <p className="fluid-small text-cme-gray leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Modular commissioning info */}
        <FadeIn
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ marginTop: 'var(--space-section-header)' }}
        >
          {/* Independent commissioning */}
          <div
            className={`relative bg-white rounded-xl border border-gray-100 p-6 sm:p-8 hover:border-cme-blue/20 hover:shadow-lg transition-all duration-300 ${onCardClick ? 'cursor-pointer' : ''}`}
            onClick={onCardClick ? () => onCardClick(isDE ? 'Unabhängig beauftragbar' : 'Independently Commissionable') : undefined}
            role={onCardClick ? 'button' : undefined}
            tabIndex={onCardClick ? 0 : undefined}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center rounded-lg bg-cme-blue/10 text-cme-blue flex-shrink-0"
                style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}>
                <Blocks style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} />
              </div>
              <div>
                <h4 className="fluid-h4 text-cme-dark font-bold" style={{ marginBottom: 'clamp(0.25rem, 0.1rem + 0.3vw, 0.5rem)' }}>
                  {isDE ? 'Unabhängig beauftragbar' : 'Independently Commissionable'}
                </h4>
                <p className="fluid-small text-cme-gray leading-relaxed">
                  {isDE
                    ? 'Entwicklung und Produktion können unabhängig voneinander beauftragt werden. Viele unserer Kunden haben eigene EMS-Partner – wir arbeiten sehr gerne und eng mit den Fertigungspartnern unserer Kunden zusammen.'
                    : 'Development and production can be commissioned independently. Many of our customers have their own EMS partners – we work closely and effectively with our customers\u2019 manufacturing partners.'}
                </p>
              </div>
            </div>
          </div>

          {/* Strong partner network */}
          <div
            className={`relative bg-white rounded-xl border border-gray-100 p-6 sm:p-8 hover:border-cme-blue/20 hover:shadow-lg transition-all duration-300 ${onCardClick ? 'cursor-pointer' : ''}`}
            onClick={onCardClick ? () => onCardClick(isDE ? 'Starkes Partnernetzwerk' : 'Strong Partner Network') : undefined}
            role={onCardClick ? 'button' : undefined}
            tabIndex={onCardClick ? 0 : undefined}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center rounded-lg bg-cme-blue/10 text-cme-blue flex-shrink-0"
                style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}>
                <Network style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} />
              </div>
              <div>
                <h4 className="fluid-h4 text-cme-dark font-bold" style={{ marginBottom: 'clamp(0.25rem, 0.1rem + 0.3vw, 0.5rem)' }}>
                  {isDE ? 'Starkes Partnernetzwerk' : 'Strong Partner Network'}
                </h4>
                <p className="fluid-small text-cme-gray leading-relaxed">
                  {isDE
                    ? 'Wir verfügen über ein bewährtes Netzwerk aus spezialisierten Partnern für Leiterplattendesign, Gehäuseentwicklung, EMV-Prüfung und Zulassung. So können wir auch komplexe, interdisziplinäre Projekte effizient abwickeln.'
                    : 'We maintain a proven network of specialized partners for PCB design, enclosure development, EMC testing and certification. This enables us to efficiently handle complex, interdisciplinary projects.'}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
