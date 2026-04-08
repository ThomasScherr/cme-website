import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  MessageSquareText,
  Lightbulb,
  Cpu,
  ShieldCheck,
  Factory,
  LifeBuoy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* Icon per step index – flat design, white on blue accent */
const STEP_ICONS: LucideIcon[] = [
  MessageSquareText, // 01 Anfrage & Analyse
  Lightbulb,         // 02 Konzept & Planung
  Cpu,               // 03 Entwicklung & Prototyp
  ShieldCheck,       // 04 Qualifikation & Test
  Factory,           // 05 Serienfertigung
  LifeBuoy,          // 06 After-Sales & Lifecycle
];

const vp = { once: true, margin: '-60px' as const };

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50/40">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cme-blue/[0.03] rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-cme-blue/[0.02] rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <p className="fluid-xs font-semibold text-cme-blue uppercase tracking-[0.18em]" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            Prozess
          </p>
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {t.process.headline}
          </h2>
          <p className="fluid-body-lg text-gray-500 max-w-2xl">
            {t.process.sub}
          </p>
        </motion.div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
          {t.process.steps.map((step: { num: string; title: string; desc: string }, i: number) => {
            const Icon = STEP_ICONS[i] || Cpu;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative bg-white border border-gray-200 rounded-xl hover:border-cme-blue/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-cme-blue to-cme-blue/60 w-0 group-hover:w-full transition-all duration-500" />

                <div className="p-6 sm:p-7">
                  {/* Icon + Step number row */}
                  <div className="flex items-center gap-4" style={{ marginBottom: 'clamp(0.75rem, 0.5rem + 0.5vw, 1.25rem)' }}>
                    <div
                      className="flex-shrink-0 rounded-xl bg-cme-blue/10 flex items-center justify-center group-hover:bg-cme-blue/15 transition-colors"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <Icon className="text-cme-blue" style={{ width: 'calc(var(--icon-box) * 0.5)', height: 'calc(var(--icon-box) * 0.5)' }} strokeWidth={1.5} />
                    </div>
                    <span className="fluid-xs font-bold text-cme-blue/50 uppercase tracking-widest">
                      Schritt {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="fluid-h4 text-cme-dark font-bold" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="fluid-small text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
