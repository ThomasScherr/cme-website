// CME Website – Process Section
// Design: Interactive vertical timeline with animated connectors, hover-expandable cards,
// glowing active indicators, and a flowing visual process narrative.

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

/* ── SVG Icons for each step ── */
const StepIcons: Record<string, React.ReactNode> = {
  '01': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v6" /><path d="M8 11h6" />
    </svg>
  ),
  '02': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  '03': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  '04': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  '05': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /><path d="M17 12h.01" /><path d="M7 12h.01" />
    </svg>
  ),
  '06': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" />
    </svg>
  ),
};

/* ── Animated connector line between steps ── */
function ConnectorLine({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center" style={{ position: 'absolute', left: '50%', top: '100%', transform: 'translateX(-50%)', height: '60px', zIndex: 0 }}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        style={{
          width: '2px',
          height: '100%',
          background: 'linear-gradient(to bottom, var(--cme-color-primary), rgba(0,180,216,0.2))',
          transformOrigin: 'top',
        }}
      />
    </div>
  );
}

/* ── Single process step card ── */
function ProcessStep({
  step,
  index,
  total,
  isActive,
  onActivate,
}: {
  step: { num: string; title: string; desc: string };
  index: number;
  total: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '0',
        minHeight: '140px',
        marginBottom: index < total - 1 ? '0' : '0',
      }}
    >
      {/* Left content area */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 'clamp(1rem, 3vw, 2.5rem)' }}>
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={onActivate}
            onClick={onActivate}
            style={{
              maxWidth: '400px',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <StepCard step={step} isActive={isActive} align="right" />
          </motion.div>
        ) : (
          <div />
        )}
      </div>

      {/* Center timeline spine */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
        {/* Vertical line above */}
        {index > 0 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              width: '2px',
              flexGrow: 1,
              background: 'linear-gradient(to bottom, rgba(0,180,216,0.15), var(--cme-color-primary))',
              transformOrigin: 'top',
            }}
          />
        )}
        {index === 0 && <div style={{ flexGrow: 1 }} />}

        {/* Node circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 200 }}
          onMouseEnter={onActivate}
          onClick={onActivate}
          style={{
            position: 'relative',
            width: 'clamp(48px, 5vw, 64px)',
            height: 'clamp(48px, 5vw, 64px)',
            borderRadius: '50%',
            background: isActive
              ? 'linear-gradient(135deg, var(--cme-color-primary), #00b4d8)'
              : 'rgba(255,255,255,0.06)',
            border: isActive ? '2px solid var(--cme-color-primary)' : '2px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isActive
              ? '0 0 30px rgba(33,150,211,0.35), 0 0 60px rgba(0,180,216,0.15)'
              : 'none',
            flexShrink: 0,
            zIndex: 2,
          }}
        >
          <div style={{
            width: 'clamp(22px, 2.5vw, 30px)',
            height: 'clamp(22px, 2.5vw, 30px)',
            color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
            transition: 'color 0.3s ease',
          }}>
            {StepIcons[step.num] || <span style={{ fontSize: 'var(--cme-font-size-sm)', fontWeight: 700 }}>{step.num}</span>}
          </div>

          {/* Pulse ring when active */}
          {isActive && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                border: '1px solid var(--cme-color-primary)',
              }}
            />
          )}
        </motion.div>

        {/* Vertical line below */}
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              width: '2px',
              flexGrow: 1,
              background: 'linear-gradient(to bottom, var(--cme-color-primary), rgba(0,180,216,0.15))',
              transformOrigin: 'top',
              minHeight: '40px',
            }}
          />
        )}
        {index === total - 1 && <div style={{ flexGrow: 1 }} />}
      </div>

      {/* Right content area */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 'clamp(1rem, 3vw, 2.5rem)' }}>
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={onActivate}
            onClick={onActivate}
            style={{
              maxWidth: '400px',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <StepCard step={step} isActive={isActive} align="left" />
          </motion.div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

/* ── Mobile process step (single column) ── */
function MobileProcessStep({
  step,
  index,
  total,
  isActive,
  onActivate,
}: {
  step: { num: string; title: string; desc: string };
  index: number;
  total: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} style={{ display: 'flex', gap: 'clamp(0.75rem, 3vw, 1.5rem)', position: 'relative' }}>
      {/* Left timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48px', flexShrink: 0 }}>
        {index > 0 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.3 }}
            style={{ width: '2px', height: '20px', background: 'linear-gradient(to bottom, rgba(0,180,216,0.15), var(--cme-color-primary))', transformOrigin: 'top' }}
          />
        )}
        {index === 0 && <div style={{ height: '20px' }} />}

        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          onClick={onActivate}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: isActive ? 'linear-gradient(135deg, var(--cme-color-primary), #00b4d8)' : 'rgba(255,255,255,0.06)',
            border: isActive ? '2px solid var(--cme-color-primary)' : '2px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isActive ? '0 0 20px rgba(33,150,211,0.3)' : 'none',
            flexShrink: 0,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ width: '20px', height: '20px', color: isActive ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'color 0.3s ease' }}>
            {StepIcons[step.num]}
          </div>
          {isActive && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: '-3px', borderRadius: '50%', border: '1px solid var(--cme-color-primary)' }}
            />
          )}
        </motion.div>

        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{ width: '2px', flexGrow: 1, minHeight: '30px', background: 'linear-gradient(to bottom, var(--cme-color-primary), rgba(0,180,216,0.15))', transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.15 }}
        onClick={onActivate}
        style={{ flex: 1, paddingBottom: index < total - 1 ? 'clamp(1rem, 3vw, 2rem)' : '0', cursor: 'pointer' }}
      >
        <StepCard step={step} isActive={isActive} align="left" />
      </motion.div>
    </div>
  );
}

/* ── Step card content ── */
function StepCard({
  step,
  isActive,
  align,
}: {
  step: { num: string; title: string; desc: string };
  isActive: boolean;
  align: 'left' | 'right';
}) {
  return (
    <div
      style={{
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        borderRadius: '12px',
        background: isActive
          ? 'linear-gradient(135deg, rgba(33,150,211,0.12), rgba(0,180,216,0.06))'
          : 'rgba(255,255,255,0.02)',
        border: isActive
          ? '1px solid rgba(33,150,211,0.3)'
          : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: align,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.5rem',
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
      }}>
        <span style={{
          fontSize: 'var(--cme-font-size-xs)',
          fontWeight: 700,
          color: isActive ? 'var(--cme-color-primary)' : 'rgba(255,255,255,0.25)',
          fontFamily: 'var(--cme-font-family)',
          letterSpacing: '0.1em',
          transition: 'color 0.3s ease',
        }}>
          {step.num}
        </span>
        <div style={{
          height: '1px',
          flex: 1,
          background: isActive
            ? 'linear-gradient(to right, var(--cme-color-primary), transparent)'
            : 'rgba(255,255,255,0.06)',
          transition: 'background 0.3s ease',
        }} />
      </div>

      <h4 style={{
        fontSize: 'var(--cme-font-size-lg)',
        fontWeight: 700,
        color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
        marginBottom: '0.5rem',
        transition: 'color 0.3s ease',
        lineHeight: 1.3,
      }}>
        {step.title}
      </h4>

      <motion.div
        initial={false}
        animate={{
          height: isActive ? 'auto' : '0',
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{
          fontSize: 'var(--cme-font-size-sm)',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.65,
        }}>
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

/* ── Progress bar at the top ── */
function ProgressBar({ activeIndex, total }: { activeIndex: number; total: number }) {
  const progress = ((activeIndex + 1) / total) * 100;
  return (
    <div style={{
      width: '100%',
      height: '3px',
      background: 'rgba(255,255,255,0.06)',
      borderRadius: '2px',
      marginBottom: 'clamp(2rem, 4vw, 4rem)',
      overflow: 'hidden',
    }}>
      <motion.div
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          height: '100%',
          background: 'linear-gradient(to right, var(--cme-color-primary), #00b4d8)',
          borderRadius: '2px',
        }}
      />
    </div>
  );
}

/* ── Main section ── */
export default function ProcessSection() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  const steps = t.process.steps;

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        paddingTop: 'var(--cme-section-process-pt, 80px)',
        paddingBottom: 'var(--cme-section-process-pb, 80px)',
        background: 'var(--cme-color-dark)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(33,150,211,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,180,216,0.03) 0%, transparent 40%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}
        >
          <p style={{
            fontSize: 'var(--cme-font-size-xs)',
            fontWeight: 500,
            color: 'var(--cme-color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom: '0.75rem',
          }}>
            Prozess
          </p>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>{t.process.headline}</h2>
          <p style={{
            fontSize: 'var(--cme-font-size-lg)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {t.process.sub}
          </p>
        </motion.div>

        {/* Progress bar */}
        <ProgressBar activeIndex={activeStep} total={steps.length} />

        {/* Desktop timeline (alternating left/right) */}
        <div className="hidden md:block">
          {steps.map((step, i) => (
            <ProcessStep
              key={i}
              step={step}
              index={i}
              total={steps.length}
              isActive={activeStep === i}
              onActivate={() => setActiveStep(i)}
            />
          ))}
        </div>

        {/* Mobile timeline (single column) */}
        <div className="md:hidden">
          {steps.map((step, i) => (
            <MobileProcessStep
              key={i}
              step={step}
              index={i}
              total={steps.length}
              isActive={activeStep === i}
              onActivate={() => setActiveStep(i)}
            />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(2rem, 4vw, 4rem)',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{
            fontSize: 'var(--cme-font-size-sm)',
            color: 'rgba(255,255,255,0.35)',
            fontStyle: 'italic',
          }}>
            Klicken oder hovern Sie über die Schritte, um Details zu sehen
          </p>
        </motion.div>
      </div>
    </section>
  );
}
