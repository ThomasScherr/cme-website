import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg';

function useTypewriter(lines: string[], typingSpeed = 60, pauseBetweenLines = 400, pauseBeforeAccent = 3000) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'done'>('typing');

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const tick = useCallback(() => {
    if (phase === 'done') return;

    if (phase === 'pause') return;

    if (currentLineIndex >= lines.length) {
      setPhase('done');
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      // Still typing current line
      setDisplayedLines(prev => {
        const updated = [...prev];
        updated[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
        return updated;
      });
      setCurrentCharIndex(prev => prev + 1);
    } else {
      // Line complete – decide what pause to use
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

  // Initialize first line
  useEffect(() => {
    setDisplayedLines(['']);
  }, []);

  return { displayedLines, showCursor, isDone: phase === 'done', currentLineIndex };
}

export default function HeroSection() {
  const { t } = useLanguage();

  const lines = [
    t.hero.headline1,
    t.hero.headline2,
    t.hero.headline3,
  ];

  const { displayedLines, showCursor, isDone, currentLineIndex } = useTypewriter(
    lines,
    55,   // typing speed (ms per char)
    400,  // pause between line 1 and 2
    3000  // 3 second pause before "Aus einer Hand."
  );

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(33,150,211,0.04),transparent_70%)]" />

      <div className="container relative z-10" style={{ paddingTop: 'var(--nav-height)', paddingBottom: 'var(--space-section)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center" style={{ gap: 'var(--space-gap-lg)' }}>
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cme-blue font-semibold tracking-[0.2em] uppercase fluid-xs" style={{ marginBottom: 'var(--space-gap-sm)' }}>
              {t.hero.tagline}
            </p>
            <div className="fluid-h1 text-cme-dark whitespace-nowrap" style={{ marginBottom: 'var(--space-gap-sm)' }}>
              {/* Line 1 */}
              <div className="min-h-[1.2em]">
                {displayedLines[0] || ''}
                {currentLineIndex === 0 && !isDone && (
                  <span
                    className="inline-block w-[3px] bg-cme-blue ml-0.5 align-baseline"
                    style={{
                      height: '0.85em',
                      opacity: showCursor ? 1 : 0,
                      transition: 'opacity 0.1s',
                    }}
                  />
                )}
              </div>
              {/* Line 2 */}
              <div className="min-h-[1.2em]">
                {displayedLines[1] || ''}
                {currentLineIndex === 1 && !isDone && (
                  <span
                    className="inline-block w-[3px] bg-cme-blue ml-0.5 align-baseline"
                    style={{
                      height: '0.85em',
                      opacity: showCursor ? 1 : 0,
                      transition: 'opacity 0.1s',
                    }}
                  />
                )}
              </div>
              {/* Line 3 – accent color */}
              <div className="min-h-[1.2em] text-cme-blue">
                {displayedLines[2] || ''}
                {currentLineIndex === 2 && !isDone && (
                  <span
                    className="inline-block w-[3px] bg-cme-blue ml-0.5 align-baseline"
                    style={{
                      height: '0.85em',
                      opacity: showCursor ? 1 : 0,
                      transition: 'opacity 0.1s',
                    }}
                  />
                )}
                {/* Blinking cursor during the 3s pause (after line 2, before line 3) */}
                {currentLineIndex === 2 && !displayedLines[2] && (
                  <span
                    className="inline-block w-[3px] bg-cme-dark ml-0.5 align-baseline"
                    style={{
                      height: '0.85em',
                      opacity: showCursor ? 1 : 0,
                      transition: 'opacity 0.1s',
                    }}
                  />
                )}
              </div>
            </div>
            <motion.p
              className="fluid-body-lg text-cme-gray max-w-xl leading-relaxed"
              style={{ marginBottom: 'var(--space-gap-md)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isDone ? 1 : 0.3 }}
              transition={{ duration: 0.6 }}
            >
              {t.hero.sub}
            </motion.p>
            <motion.div
              className="flex flex-wrap"
              style={{ gap: 'var(--space-gap-xs)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isDone ? 1 : 0 }}
              transition={{ duration: 0.5 }}
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

          {/* Right: Two offset diamonds – fluid sizing up to 4K */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              className="relative"
              style={{
                width: 'var(--hero-diamond-w)',
                height: 'var(--hero-diamond-h)',
              }}
            >
              {/* Accent diamond (behind, offset top-left) */}
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

              {/* Image diamond (main, offset bottom-right) */}
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
                  <img
                    src={HERO_IMAGE}
                    alt="CME Elektronikentwicklung und Fertigung"
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
