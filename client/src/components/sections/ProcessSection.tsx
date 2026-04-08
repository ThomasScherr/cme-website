import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="section-pad bg-cme-dark">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <h2 className="fluid-h2 text-white" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {t.process.headline}
          </h2>
          <p className="fluid-body-lg text-white/80 max-w-2xl mx-auto">
            {t.process.sub}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-white/10" />

          {t.process.steps.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start md:gap-0 mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ gap: 'var(--space-gap-sm)' }}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="rounded-full bg-cme-dark border-2 border-cme-blue flex items-center justify-center"
                    style={{
                      width: 'var(--icon-box)',
                      height: 'var(--icon-box)',
                    }}
                  >
                    <span className="text-cme-blue font-bold fluid-small">{step.num}</span>
                  </div>
                </div>

                {/* Spacer for mobile */}
                <div className="w-12 flex-shrink-0 md:hidden" />

                {/* Card */}
                <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl hover:border-cme-blue/30 hover:bg-white/[0.06] transition-all duration-300 fluid-card">
                    <h4 className="fluid-h4 text-white" style={{ marginBottom: 'clamp(0.25rem, 0.1rem + 0.3vw, 0.5rem)' }}>{step.title}</h4>
                    <p className="fluid-small text-white/80 leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Hidden spacer for desktop */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
