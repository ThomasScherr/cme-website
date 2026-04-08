import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-cme-dark">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t.process.headline}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
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
                className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-cme-dark border-2 border-cme-blue flex items-center justify-center">
                    <span className="text-cme-blue font-bold text-sm">{step.num}</span>
                  </div>
                </div>

                {/* Spacer for mobile */}
                <div className="w-12 flex-shrink-0 md:hidden" />

                {/* Card */}
                <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 hover:border-cme-blue/30 hover:bg-white/[0.06] transition-all duration-300">
                    <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
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
