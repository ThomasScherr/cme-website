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
            ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
              aria-label="CME Control Motion Electronics"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB_5f2c0671.png"
                alt="CME Control Motion Electronics"
                className="h-10"
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="w-px h-5 bg-border mx-2" />
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
              >
                {t.nav.lang}
              </button>
              <Button
                size="sm"
                onClick={() => scrollTo('contact')}
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
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  className="text-left text-base font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0"
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
