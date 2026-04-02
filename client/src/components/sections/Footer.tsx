// CME Website – Footer
// Design Philosophy: Techno-Industrial Precision
// Dark footer with white logo, navigation links, certifications

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_CMYK_white_73598305.svg"
              alt="CME Control Motion Electronics"
              className="h-10 mb-5"
            />
            <p className="text-sm text-background/55 max-w-xs leading-relaxed">
              Entwicklung und Fertigung elektronischer Produkte – mit technischer Tiefe und Serienblick.
              Made in Dortmund.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {['ISO 9001', 'ISO 14001'].map((cert) => (
                <span key={cert} className="text-xs px-2 py-1 border border-background/20 text-background/40">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-background/35 mb-5">
              Leistungen
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors text-left">
                  {t.footer.dev}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors text-left">
                  {t.footer.mfg}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors text-left">
                  {t.footer.lifecycle}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('markets')} className="hover:text-primary transition-colors text-left">
                  Märkte & Branchen
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-background/35 mb-5">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li>Alter Hellweg 48</li>
              <li>44379 Dortmund</li>
              <li>
                <a href="tel:+4923128667696" className="hover:text-primary transition-colors">
                  +49 231 28 66 76 96-0
                </a>
              </li>
              <li>
                <a href="mailto:info@control-motion.de" className="hover:text-primary transition-colors">
                  info@control-motion.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/35">{t.footer.copyright}</p>
          <div className="flex gap-6 text-xs text-background/35">
            <a href="#" className="hover:text-primary transition-colors">{t.footer.imprint}</a>
            <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-primary transition-colors">{t.footer.agb}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
