// CME Website – Navigation Component
// Design Philosophy: Techno-Industrial Precision
// Sticky header with transparent-to-white transition, mobile hamburger menu, language switcher

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  target: string;
}

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: t.nav.development, target: 'services' },
    { label: t.nav.manufacturing, target: 'services' },
    { label: t.nav.lifecycle, target: 'services' },
    { label: t.nav.markets, target: 'markets' },
    { label: t.nav.contact, target: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-white/97 backdrop-blur-sm shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div style={{ maxWidth: 'min(1600px, 90vw)', margin: '0 auto', paddingLeft: 'clamp(1rem, 2vw + 0.5rem, 4rem)', paddingRight: 'clamp(1rem, 2vw + 0.5rem, 4rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'clamp(56px, 6vw, 80px)' }}>
            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
              aria-label="CME Control Motion Electronics"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB_433c645f.png"
                alt="CME Control Motion Electronics"
                style={{ height: 'var(--cme-logo-height, 40px)', width: 'auto' }}
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center" style={{ gap: 'clamp(0.75rem, 2vw, 2.5rem)' }}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="w-px h-5 bg-border mx-2" />
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                {t.nav.lang}
              </button>
              <Button
                size="sm"
                onClick={() => scrollTo('contact')}
                style={{ fontSize: 'var(--text-sm)', padding: 'clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.9rem, 1.8vw, 1.5rem)' }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 ml-2"
              >
                {t.nav.contact}
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
              >
                {t.nav.lang}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-border shadow-lg"
          >
            <div style={{ maxWidth: 'min(1600px, 90vw)', margin: '0 auto', paddingLeft: 'clamp(1rem, 2vw + 0.5rem, 4rem)', paddingRight: 'clamp(1rem, 2vw + 0.5rem, 4rem)', paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  style={{ fontSize: 'var(--text-base)', fontWeight: 500 }}
                  className="text-left text-foreground hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0"
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                onClick={() => scrollTo('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 self-start"
              >
                {t.nav.contact}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
