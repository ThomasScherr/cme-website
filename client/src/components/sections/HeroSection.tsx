import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const HERO_VIDEO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample_a6b28cee.mp4';

// ─── Typewriter Hook ───
function useTypewriter(lines: string[], typingSpeed = 60, pauseBetweenLines = 400, pauseBeforeAccent = 3000) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'done'>('typing');

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  const tick = useCallback(() => {
    if (phase === 'done' || phase === 'pause') return;
    if (currentLineIndex >= lines.length) { setPhase('done'); return; }

    const currentLine = lines[currentLineIndex];
    if (currentCharIndex < currentLine.length) {
      setDisplayedLines(prev => {
        const updated = [...prev];
        updated[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
        return updated;
      });
      setCurrentCharIndex(prev => prev + 1);
    } else {
      const isLastBeforeAccent = currentLineIndex === lines.length - 2;
      const delay = isLastBeforeAccent ? pauseBeforeAccent : pauseBetweenLines;
      setPhase('pause');
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setDisplayedLines(prev => [...prev, '']);
        setPhase('typing');
      }, delay);
    }
  }, [phase, currentLineIndex, currentCharIndex, lines, pauseBetweenLines, pauseBeforeAccent]);

  useEffect(() => {
    if (phase !== 'typing') return;
    const timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [tick, phase, typingSpeed, currentCharIndex]);

  useEffect(() => { setDisplayedLines(['']); }, []);

  return { displayedLines, showCursor, isDone: phase === 'done', currentLineIndex };
}

// ─── Main Hero Component ───
export default function HeroSection() {
  const { t, lang } = useLanguage();
  const isDE = lang === 'de';

  const secondHeadline = useMemo(() => ({
    line1: isDE ? 'Für Elektronikprodukte,' : 'For electronic products',
    line2: isDE ? 'die auch morgen noch' : 'that are still available',
    accent: isDE ? 'lieferbar sind.' : 'tomorrow.',
  }), [isDE]);

  const lines = useMemo(() => [t.hero.headline1, t.hero.headline2, t.hero.headline3], [t]);
  const { displayedLines, showCursor, isDone, currentLineIndex } = useTypewriter(lines, 55, 400, 3000);

  // Simple flag: false = show first text, true = show second text
  const [showSecondText, setShowSecondText] = useState(false);
  const transitionScheduled = useRef(false);

  // Schedule the one-time transition 3.5s after typewriter finishes
  useEffect(() => {
    if (!isDone || transitionScheduled.current) return;
    transitionScheduled.current = true;
    const timer = setTimeout(() => {
      setShowSecondText(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, [isDone]);

  // Cursor element
  const CursorEl = ({ visible, color = 'bg-cme-blue' }: { visible: boolean; color?: string }) => (
    <span
      className={`inline-block w-[3px] ${color} ml-0.5 align-baseline`}
      style={{ height: '0.85em', opacity: visible ? 1 : 0, transition: 'opacity 0.1s' }}
    />
  );

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(33,150,211,0.04),transparent_70%)]" />

      <div
        className="container relative z-10"
        style={{ paddingTop: 'var(--nav-height)', paddingBottom: 'var(--space-section)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center" style={{ gap: 'var(--space-gap-lg)' }}>
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-cme-blue font-semibold tracking-[0.2em] uppercase fluid-xs"
              style={{ marginBottom: 'var(--space-gap-sm)' }}
            >
              {t.hero.tagline}
            </p>

            {/* Headline area – fixed height container to prevent layout shifts */}
            <div className="fluid-h1 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
              <AnimatePresence mode="wait">
                {!showSecondText ? (
                  /* ── First headline: typed in by cursor ── */
                  <motion.div
                    key="first-headline"
                    exit={{
                      opacity: 0,
                      y: -16,
                      filter: 'blur(8px)',
                      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                    }}
                  >
                    <div className="min-h-[1.2em] whitespace-nowrap">
                      {displayedLines[0] || ''}
                      {currentLineIndex === 0 && !isDone && <CursorEl visible={showCursor} />}
                    </div>
                    <div className="min-h-[1.2em] whitespace-nowrap">
                      {displayedLines[1] || ''}
                      {currentLineIndex === 1 && !isDone && <CursorEl visible={showCursor} />}
                    </div>
                    <div className="min-h-[1.2em] text-cme-blue whitespace-nowrap">
                      {displayedLines[2] || ''}
                      {currentLineIndex === 2 && !isDone && <CursorEl visible={showCursor} />}
                      {currentLineIndex === 2 && !displayedLines[2] && (
                        <CursorEl visible={showCursor} color="bg-cme-dark" />
                      )}
                    </div>
                  </motion.div>
                ) : (
                  /* ── Second headline: fades in once and stays ── */
                  <motion.div
                    key="second-headline"
                    initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="min-h-[1.2em] whitespace-nowrap">{secondHeadline.line1}</div>
                    <div className="min-h-[1.2em] whitespace-nowrap">{secondHeadline.line2}</div>
                    <div className="min-h-[1.2em] text-cme-blue whitespace-nowrap">{secondHeadline.accent}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.p
              className="fluid-body-lg text-cme-gray max-w-xl leading-relaxed"
              style={{ marginBottom: 'var(--space-gap-md)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 10 }}
              transition={{ duration: 0.6 }}
            >
              {t.hero.sub}
            </motion.p>
            <motion.div
              className="flex flex-wrap"
              style={{ gap: 'var(--space-gap-xs)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 10 }}
              transition={{ duration: 0.5, delay: isDone ? 0.2 : 0 }}
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-all hover:shadow-lg hover:shadow-cme-blue/20 fluid-btn"
              >
                {t.hero.cta_primary}
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-cme-dark/15 text-cme-dark rounded-lg font-semibold hover:border-cme-blue hover:text-cme-blue transition-all fluid-btn"
              >
                {t.hero.cta_secondary}
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Two offset diamonds – only visible on lg+ screens */}
          <div className="hidden lg:flex relative items-center justify-end">
            <div
              className="relative"
              style={{
                width: 'var(--hero-diamond-w)',
                height: 'var(--hero-diamond-h)',
                marginTop: '-13px',
                marginRight: '5px',
                marginLeft: '28px',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-0 left-0"
                style={{ zIndex: 1 }}
              >
                <div
                  className="diamond bg-cme-blue/[0.07]"
                  style={{ width: 'var(--hero-accent-diamond)' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-0 right-0"
                style={{ zIndex: 2 }}
              >
                <div
                  className="diamond shadow-xl shadow-cme-blue/15"
                  style={{ width: 'var(--hero-image-diamond)' }}
                >
                  <video
                    src={HERO_VIDEO}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cme-blue/50">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
