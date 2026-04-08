import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB_433c645f.png';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

function useNavItems() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const items: NavItem[] = [
    {
      label: isDE ? 'Entwicklung' : 'Development',
      href: '/entwicklung',
      dropdown: [
        { label: isDE ? 'Übersicht' : 'Overview', href: '/entwicklung' },
        { label: isDE ? 'Hardware & Software' : 'Hardware & Software', href: '/entwicklung/hardware-software' },
        { label: isDE ? 'Simulation' : 'Simulation', href: '/entwicklung/simulation' },
        { label: isDE ? 'Test & Verifikation' : 'Test & Verification', href: '/entwicklung/test-verifikation' },
      ],
    },
    {
      label: isDE ? 'Fertigung' : 'Manufacturing',
      href: '/fertigung',
      dropdown: [
        { label: isDE ? 'Übersicht' : 'Overview', href: '/fertigung' },
        { label: isDE ? 'Leiterplatten bestücken' : 'PCB Assembly', href: '/fertigung/leiterplatten' },
        { label: isDE ? 'Baugruppen fertigen' : 'Module Assembly', href: '/fertigung/baugruppen' },
        { label: isDE ? 'Qualitätsmanagement' : 'Quality Management', href: '/fertigung/qualitaet' },
      ],
    },
    {
      label: isDE ? 'Lifecycle Services' : 'Lifecycle Services',
      href: '/lifecycle',
    },
    {
      label: isDE ? 'Märkte' : 'Markets',
      href: '/maerkte',
    },
    {
      label: isDE ? 'Insights' : 'Insights',
      href: '/insights',
    },
    {
      label: isDE ? 'Kontakt' : 'Contact',
      href: '/kontakt',
    },
  ];

  return items;
}

function DropdownMenu({ items, isOpen, onClose }: { items: DropdownItem[]; isOpen: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[220px]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:text-cme-blue hover:bg-cme-blue-light/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navigation() {
  const { lang, setLang } = useLanguage();
  const navItems = useNavItems();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isHome = location === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location]);

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-20 lg:h-28">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src={LOGO_URL}
            alt="CME Control Motion Electronics"
            className="h-12 lg:h-20 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <button
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onClick={() => toggleDropdown(item.label)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive(item.href)
                      ? 'text-cme-blue'
                      : 'text-cme-dark/80 hover:text-cme-blue'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg block ${
                    isActive(item.href)
                      ? 'text-cme-blue'
                      : 'text-cme-dark/80 hover:text-cme-blue'
                  }`}
                >
                  {item.label}
                </Link>
              )}

              {item.dropdown && (
                <div
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <DropdownMenu
                    items={item.dropdown}
                    isOpen={openDropdown === item.label}
                    onClose={() => setOpenDropdown(null)}
                  />
                </div>
              )}
            </div>
          ))}

          <div className="w-px h-5 bg-gray-300 mx-2" />

          <button
            onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
            className="text-sm font-semibold text-cme-dark/60 hover:text-cme-blue transition-colors px-2"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>

          <Link
            href="/kontakt"
            className="bg-cme-blue text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-cme-blue/90 transition-colors ml-2"
          >
            {lang === 'de' ? 'Kontakt' : 'Contact'}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
            className="text-sm font-semibold text-cme-dark/60"
          >
            {lang === 'de' ? 'EN' : 'DE'}
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
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className={`flex items-center justify-between w-full py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'text-cme-blue bg-cme-blue-light/50'
                            : 'text-cme-dark/80 hover:text-cme-blue hover:bg-cme-blue-light/30'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-1 flex flex-col gap-0.5">
                              {item.dropdown.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className={`py-2.5 px-4 text-sm rounded-lg transition-colors block ${
                                    location === sub.href
                                      ? 'text-cme-blue font-medium'
                                      : 'text-gray-600 hover:text-cme-blue hover:bg-cme-blue-light/30'
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'text-cme-blue bg-cme-blue-light/50'
                          : 'text-cme-dark/80 hover:text-cme-blue hover:bg-cme-blue-light/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-100 my-2" />
              <Link
                href="/kontakt"
                className="bg-cme-blue text-white py-2.5 rounded-lg text-sm font-semibold text-center block"
              >
                {lang === 'de' ? 'Kontakt' : 'Contact'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
