import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { useVideoSource } from '@/hooks/useVideoSource';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const HERO_VIDEO_WEBM = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample_d94dc755.webm';
const HERO_VIDEO_MP4 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample-compressed_8b0d5332.mp4';
const HERO_VIDEO_POSTER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero-video-poster_8c5a9e34.jpg';

// ─── Typewriter Hook (with language-aware reset) ───
function useTypewriter(lines: string[], lang: string, typingSpeed = 60, pauseBetweenLines = 400, pauseBeforeAccent = 3000) {
  const [displayedLines, setDisplayedLines] = useState<string[]>(['']);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'done'>('typing');
  const prevLangRef = useRef(lang);

  // Reset everything when language changes
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang;
      setDisplayedLines(['']);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setPhase('typing');
    }
  }, [lang]);

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

  return { displayedLines, showCursor, isDone: phase === 'done', currentLineIndex };
}

// ─── Diamond Video Component (shared between mobile & desktop) ───
function DiamondVideo({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  const videoSrc = useVideoSource(HERO_VIDEO_WEBM, HERO_VIDEO_MP4);
  return (
    <div
      className={`diamond shadow-xl shadow-cme-blue/15 ${className}`}
      style={style}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={HERO_VIDEO_POSTER}
        src={videoSrc}
      />
    </div>
  );
}

// ─── Main Hero Component ───
export default function HeroSection() {
  const { t, lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img } = useContent('home');

  const secondHeadline = useMemo(() => ({
    line1: isDE ? 'Leistungselektronik,' : 'Power Electronics,',
    line2: isDE ? 'die auch morgen noch' : 'that are still available',
    accent: isDE ? 'lieferbar ist.' : 'tomorrow.',
  }), [isDE]);

  // CMS overrides for hero headlines, falling back to i18n
  const h1 = cms('hero.headline1') || t.hero.headline1;
  const h2 = cms('hero.headline2') || t.hero.headline2;
  const h3 = cms('hero.headline3') || t.hero.headline3;
  const lines = useMemo(() => [h1, h2, h3], [h1, h2, h3]);
  const { displayedLines, showCursor, isDone, currentLineIndex } = useTypewriter(lines, lang, 55, 400, 400);

  // Simple flag: false = show first text, true = show second text
  const [showSecondText, setShowSecondText] = useState(false);
  const transitionScheduled = useRef(false);

  // Reset second text state when language changes
  useEffect(() => {
    setShowSecondText(false);
    transitionScheduled.current = false;
  }, [lang]);

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
        style={{ paddingTop: 'var(--hero-content-pad-top, var(--nav-height))', paddingBottom: 'var(--hero-content-pad-bottom, var(--space-section))' }}
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
              {cms('hero.tagline') || t.hero.tagline}
            </p>

            {/* Headline area – h1 for SEO, fixed height container to prevent layout shifts */}
            <h1 className="fluid-h1 text-cme-dark font-bold" style={{ marginBottom: 'var(--space-gap-sm)' }}>
              <AnimatePresence mode="wait">
                {!showSecondText ? (
                  /* ── First headline: typed in by cursor ── */
                  <motion.div
                    key={`first-headline-${lang}`}
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
                    key={`second-headline-${lang}`}
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
            </h1>

            <motion.p
              className="fluid-body-lg text-cme-gray max-w-xl leading-relaxed"
              style={{ marginBottom: 'var(--space-gap-md)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 10 }}
              transition={{ duration: 0.6 }}
            >
              {cms('hero.description') || t.hero.sub}
            </motion.p>
            <motion.div
              className="flex flex-wrap relative z-20"
              style={{ gap: 'var(--space-gap-xs)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 10 }}
              transition={{ duration: 0.5, delay: isDone ? 0.2 : 0 }}
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-all hover:shadow-lg hover:shadow-cme-blue/20 fluid-btn"
              >
                {cms('hero.ctaLabel') || t.hero.cta_primary}
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-cme-dark/15 text-cme-dark rounded-lg font-semibold hover:border-cme-blue hover:text-cme-blue transition-all fluid-btn"
              >
                {cms('hero.ctaSecondaryLabel') || t.hero.cta_secondary}
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Two offset diamonds – DESKTOP (lg+) */}
          <div className="hidden lg:flex relative items-center justify-end">
            <div
              className="relative"
              style={{
                width: 'var(--hero-diamond-w)',
                height: 'var(--hero-diamond-h)',
                marginTop: 'var(--hero-diamond-mt, -0.8125rem)',
                marginRight: 'var(--hero-diamond-mr, 0.3125rem)',
                marginLeft: 'var(--hero-diamond-ml, 1.75rem)',
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
                <DiamondVideo style={{ width: 'var(--hero-image-diamond)' }} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Mobile Diamond (below text, centered) ── visible on < lg */}
        <motion.div
          className="flex lg:hidden justify-center relative overflow-visible"
          style={{ marginTop: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'clamp(1rem, 3vw, 2rem)' }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Accent diamond – subtle background offset */}
          <div
            className="absolute diamond bg-cme-blue/[0.06]"
            style={{
              width: 'min(40vw, 170px)',
              top: '-8%',
              left: '50%',
              transform: 'translateX(-65%) rotate(45deg)',
              zIndex: 1,
            }}
          />
          {/* Main video diamond */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <DiamondVideo
              style={{ width: 'min(55vw, 240px)' }}
            />
          </div>
        </motion.div>
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
