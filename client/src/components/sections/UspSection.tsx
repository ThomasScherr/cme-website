import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Combine, Radio, Thermometer, ShieldCheck, Award, Scaling } from 'lucide-react';

const CME_VIDEO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/cme_loop_v11_16cf9640.mp4';

const icons = [Combine, Radio, Thermometer, ShieldCheck, Award, Scaling];

export default function UspSection() {
  const { t } = useLanguage();

  return (
    <section className="section-pad bg-cme-light">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {t.usp.headline}
          </h2>
          <p className="fluid-body-lg text-cme-gray max-w-2xl mx-auto">
            {t.usp.sub}
          </p>
        </motion.div>

        {/* Featured video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-lg shadow-cme-blue/5"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <video
            src={CME_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-cover"
            style={{ height: 'clamp(12.5rem, 6rem + 14vw, 22.5rem)' }}
          />
        </motion.div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
          {t.usp.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-lg hover:shadow-cme-blue/5 transition-all duration-300 fluid-card"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
