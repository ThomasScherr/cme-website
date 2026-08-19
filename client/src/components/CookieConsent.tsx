import { useState } from 'react';
import { Link } from 'wouter';
import { useConsent } from '@/contexts/ConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Settings, X, Check, MessageCircle } from 'lucide-react';

/* ── Translations ────────────────────────────────────────────────── */
const t = {
  de: {
    bannerTitle: 'Wir respektieren Ihre Privatsphäre',
    bannerText: 'Wir verwenden Cookies und ähnliche Technologien, um die Nutzung unserer Website zu analysieren und Ihnen ein optimales Erlebnis zu bieten. Einige sind technisch notwendig, andere helfen uns, unsere Website zu verbessern.',
    acceptAll: 'Alle akzeptieren',
    necessaryOnly: 'Nur notwendige',
    acceptChat: 'Support-Chat erlauben',
    customize: 'Einstellungen',
    settingsTitle: 'Cookie-Einstellungen',
    settingsText: 'Hier können Sie auswählen, welche Kategorien von Cookies Sie zulassen möchten. Notwendige Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
    save: 'Auswahl speichern',
    necessary: 'Notwendig',
    necessaryDesc: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich (z.B. Sitzungsverwaltung, Sicherheit). Sie können nicht deaktiviert werden.',
    analytics: 'Analyse',
    analyticsDesc: 'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen (Google Analytics). Die Daten werden anonymisiert erhoben.',
    marketing: 'Marketing',
    marketingDesc: 'Diese Cookies werden verwendet, um Besuchern relevante Werbung und Informationen bereitzustellen (Google Ads, Leadinfo B2B-Analyse).',
    chat: 'Support-Chat',
    chatDesc: 'Ermöglicht den Live-Chat mit unserem Support-Team (Crisp). Dabei werden Cookies von crisp.chat gesetzt.',
    privacyLink: 'Datenschutzerklärung',
    imprintLink: 'Impressum',
    alwaysActive: 'Immer aktiv',
  },
  en: {
    bannerTitle: 'We respect your privacy',
    bannerText: 'We use cookies and similar technologies to analyze the use of our website and provide you with an optimal experience. Some are technically necessary, others help us improve our website.',
    acceptAll: 'Accept all',
    necessaryOnly: 'Necessary only',
    acceptChat: 'Allow support chat',
    customize: 'Settings',
    settingsTitle: 'Cookie Settings',
    settingsText: 'Here you can select which categories of cookies you would like to allow. Necessary cookies are required for the basic functions of the website and cannot be disabled.',
    save: 'Save selection',
    necessary: 'Necessary',
    necessaryDesc: 'These cookies are required for the basic functions of the website (e.g. session management, security). They cannot be disabled.',
    analytics: 'Analytics',
    analyticsDesc: 'These cookies help us understand how visitors use our website (Google Analytics). Data is collected anonymously.',
    marketing: 'Marketing',
    marketingDesc: 'These cookies are used to provide visitors with relevant advertising and information (Google Ads, Leadinfo B2B analysis).',
    chat: 'Support Chat',
    chatDesc: 'Enables live chat with our support team (Crisp). Cookies from crisp.chat will be set.',
    privacyLink: 'Privacy Policy',
    imprintLink: 'Imprint',
    alwaysActive: 'Always active',
  },
};

/* ── Toggle Switch ───────────────────────────────────────────────── */
function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cme-blue focus-visible:ring-offset-2
        ${checked ? 'bg-cme-blue' : 'bg-gray-300'}
        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0
          transition duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}

/* ── Settings Modal ──────────────────────────────────────────────── */
function SettingsModal() {
  const { lang } = useLanguage();
  const labels = t[lang] || t.de;
  const { acceptCustom, closeSettings } = useConsent();

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [chat, setChat] = useState(false);

  const handleSave = () => {
    acceptCustom(analytics, marketing, chat);
  };

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeSettings} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cme-blue" />
            <h2 className="fluid-body-lg font-semibold text-gray-900">{labels.settingsTitle}</h2>
          </div>
          <button
            onClick={closeSettings}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="fluid-small text-gray-600 leading-relaxed">{labels.settingsText}</p>

          {/* Necessary */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-gray-900">{labels.necessary}</h3>
              <span className="fluid-xs font-medium text-cme-blue bg-cme-blue/10 px-2 py-0.5 rounded-full">
                {labels.alwaysActive}
              </span>
            </div>
            <p className="fluid-small text-gray-500 leading-relaxed">{labels.necessaryDesc}</p>
          </div>

          {/* Support Chat */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cme-blue" />
                <h3 className="font-medium text-gray-900">{labels.chat}</h3>
              </div>
              <Toggle checked={chat} onChange={setChat} />
            </div>
            <p className="fluid-small text-gray-500 leading-relaxed">{labels.chatDesc}</p>
          </div>

          {/* Analytics */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-gray-900">{labels.analytics}</h3>
              <Toggle checked={analytics} onChange={setAnalytics} />
            </div>
            <p className="fluid-small text-gray-500 leading-relaxed">{labels.analyticsDesc}</p>
          </div>

          {/* Marketing */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-gray-900">{labels.marketing}</h3>
              <Toggle checked={marketing} onChange={setMarketing} />
            </div>
            <p className="fluid-small text-gray-500 leading-relaxed">{labels.marketingDesc}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSave}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cme-blue text-white font-medium rounded-lg hover:bg-cme-blue/90 transition-colors fluid-small"
          >
            <Check className="w-4 h-4" />
            {labels.save}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Banner ───────────────────────────────────────────────────────── */
function ConsentBanner() {
  const { lang } = useLanguage();
  const labels = t[lang] || t.de;
  const { acceptAll, acceptNecessaryOnly, acceptChatOnly, openSettings } = useConsent();

  return (
    // data-consent-banner: Marke fuer scripts/prerender.ts. Der Banner haengt an
    // localStorage und darf nie im vorgerenderten HTML stehen - sonst laeuft der
    // Server-Aufbau gegen den Browser-Aufbau und die Knoepfe reagieren nicht mehr.
    <div data-consent-banner className="fixed bottom-0 left-0 right-0 z-[10000] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-cme-blue/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cme-blue" />
            </div>
            <div>
              <h2 className="fluid-body font-semibold text-gray-900 mb-1">{labels.bannerTitle}</h2>
              <p className="fluid-small text-gray-600 leading-relaxed">{labels.bannerText}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-4 fluid-xs text-gray-500">
            <Link href="/datenschutz" className="underline hover:text-cme-blue transition-colors">
              {labels.privacyLink}
            </Link>
            <Link href="/impressum" className="underline hover:text-cme-blue transition-colors">
              {labels.imprintLink}
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 px-5 py-2.5 bg-cme-blue text-white font-medium rounded-lg hover:bg-cme-blue/90 transition-colors fluid-small"
            >
              {labels.acceptAll}
            </button>
            <button
              onClick={acceptChatOnly}
              className="flex-1 px-5 py-2.5 bg-emerald-50 text-emerald-700 font-medium rounded-lg hover:bg-emerald-100 transition-colors fluid-small inline-flex items-center justify-center gap-1.5 border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4" />
              {labels.acceptChat}
            </button>
            <button
              onClick={acceptNecessaryOnly}
              className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors fluid-small"
            >
              {labels.necessaryOnly}
            </button>
            <button
              onClick={openSettings}
              className="flex-1 px-5 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors fluid-small inline-flex items-center justify-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              {labels.customize}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function CookieConsent() {
  const { showBanner, showSettings } = useConsent();

  return (
    <>
      {showBanner && !showSettings && <ConsentBanner />}
      {showSettings && <SettingsModal />}
    </>
  );
}
