import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageSquareText,
  Lightbulb,
  Cpu,
  ShieldCheck,
  Factory,
  LifeBuoy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STEP_ICONS: LucideIcon[] = [
  MessageSquareText,
  Lightbulb,
  Cpu,
  ShieldCheck,
  Factory,
  LifeBuoy,
];

export default function ProcessSection() {
  const { t, lang } = useLanguage();
  const isDE = lang === 'de';
  const containerRef = useRef<HTMLDivElement>(null);

  /* Track scroll progress through the timeline container */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });

  /* Smooth spring for the progress line */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  /* Line height driven by scroll */
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50/40">
      {/* Subtle decorative blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cme-blue/[0.03] rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-cme-blue/[0.02] rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
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

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Background line (gray track) */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Animated progress line (blue, fills on scroll) */}
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-0.5 bg-gradient-to-b from-cme-blue to-cme-blue/60 origin-top"
            style={{ height: lineHeight }}
          />

          {t.process.steps.map((step: { num: string; title: string; desc: string }, i: number) => {
            const isLeft = i % 2 === 0;
            const Icon = STEP_ICONS[i] || Cpu;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative flex items-start md:gap-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{
                  gap: 'var(--space-gap-sm)',
                  marginBottom: i < t.process.steps.length - 1 ? 'clamp(2rem, 1.5rem + 1.5vw, 3.5rem)' : '0',
                }}
              >
                {/* Center node with icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="rounded-full bg-white border-2 border-cme-blue shadow-md shadow-cme-blue/10 flex items-center justify-center"
                    style={{
                      width: 'var(--icon-box)',
                      height: 'var(--icon-box)',
                    }}
                  >
                    <Icon
                      className="text-cme-blue"
                      style={{
                        width: 'calc(var(--icon-box) * 0.45)',
                        height: 'calc(var(--icon-box) * 0.45)',
                      }}
                      strokeWidth={1.8}
                    />
                  </motion.div>
                </div>

                {/* Spacer for mobile */}
                <div className="w-12 flex-shrink-0 md:hidden" />

                {/* Card */}
                <div className={`flex-1 md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-cme-blue/30 hover:shadow-lg hover:shadow-cme-blue/5 transition-all duration-300 group">
                    {/* Step label */}
                    <span className="inline-block fluid-xs font-bold text-cme-blue/50 uppercase tracking-widest mb-1">
                      Schritt {step.num}
                    </span>
                    <h4 className="fluid-h4 text-cme-dark font-bold" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                      {step.title}
                    </h4>
                    <p className="fluid-small text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Hidden spacer for desktop */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
          style={{ marginTop: 'var(--space-section-header)' }}
        >
          <p className="fluid-body text-gray-500 max-w-xl mx-auto" style={{ marginBottom: 'var(--space-gap-sm)' }}>
            {isDE
              ? 'Jeder Prozessschritt ist einzeln oder als Gesamtpaket beauftragbar \u2013 abgestimmt auf Ihren Projektstand.'
              : 'Every process step can be commissioned individually or as a complete package \u2013 tailored to your project stage.'}
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors duration-200"
            style={{ fontSize: 'var(--fs-body)' }}
          >
            {isDE ? 'Prozessschritt besprechen' : 'Discuss your process step'}
            <ArrowRight style={{ width: '1.1em', height: '1.1em' }} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
