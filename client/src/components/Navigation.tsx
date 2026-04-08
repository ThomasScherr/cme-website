import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB_433c645f.png';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navLinks = [
    { label: t.nav.development, id: 'services' },
    { label: t.nav.manufacturing, id: 'services' },
    { label: t.nav.lifecycle, id: 'services' },
    { label: t.nav.markets, id: 'markets' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex-shrink-0"
        >
          <img
            src={LOGO_URL}
            alt="CME Control Motion Electronics"
            className="h-8 lg:h-10 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-cme-dark/80 hover:text-cme-blue transition-colors"
            >
              {link.label}
            </button>
          ))}

          <div className="w-px h-5 bg-gray-300" />

          <button
            onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
            className="text-sm font-semibold text-cme-dark/60 hover:text-cme-blue transition-colors"
          >
            {t.nav.lang}
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="bg-cme-blue text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-cme-blue/90 transition-colors"
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
            className="text-sm font-semibold text-cme-dark/60"
          >
            {t.nav.lang}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-cme-dark"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-3 px-4 text-sm font-medium text-cme-dark/80 hover:text-cme-blue hover:bg-cme-blue-light rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-gray-100 my-2" />
              <button
                onClick={() => scrollTo('contact')}
                className="bg-cme-blue text-white py-2.5 rounded-lg text-sm font-semibold text-center"
              >
                {t.nav.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
