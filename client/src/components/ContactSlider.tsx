import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const GF_IMAGE = 'https://ventspire-cdn.b-cdn.net/cme/cms/media/1776035923976-ac815377bcb7b679.jpg';

const SALUTATION_OPTIONS = [
  { value: 'Herr', labelDe: 'Herr', labelEn: 'Mr.' },
  { value: 'Frau', labelDe: 'Frau', labelEn: 'Ms.' },
  { value: 'Keine Angabe', labelDe: 'Keine Angabe', labelEn: 'Prefer not to say' },
];

interface ContactSliderProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  pageSource?: string;
}

export default function ContactSlider({ isOpen, onClose, topic, pageSource }: ContactSliderProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const [mode, setMode] = useState<'contact' | 'nda'>('contact');
  const [submitted, setSubmitted] = useState(false);

  // Standard contact form state
  const [form, setForm] = useState({
    salutation: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  // NDA form state
  const [ndaForm, setNdaForm] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
  });

  // Privacy consent state
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [ndaPrivacyConsent, setNdaPrivacyConsent] = useState(false);

  // Honeypot fields (invisible to users, bots auto-fill them)
  const [honeypot, setHoneypot] = useState('');
  const [ndaHoneypot, setNdaHoneypot] = useState('');

  // Pre-fill subject with topic when slider opens
  useEffect(() => {
    if (isOpen && topic) {
      setForm(prev => ({
        ...prev,
        subject: isDE ? `Anfrage: ${topic}` : `Inquiry: ${topic}`,
      }));
      setSubmitted(false);
      setMode('contact');
      setPrivacyConsent(false);
      setNdaPrivacyConsent(false);
    }
  }, [isOpen, topic, isDE]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const ndaMutation = trpc.nda.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate({
      salutation: form.salutation || undefined,
      title: form.title || undefined,
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      company: form.company || undefined,
      phone: form.phone || undefined,
      message: form.subject ? `[${form.subject}]\n\n${form.message}` : form.message,
      source: pageSource || 'contact-slider',
      privacyConsent: true as const,
      website: honeypot || undefined,
    });
  }, [form, contactMutation, pageSource, honeypot]);

  const handleNdaSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    ndaMutation.mutate({
      salutation: ndaForm.salutation,
      firstName: ndaForm.firstName,
      lastName: ndaForm.lastName,
      company: ndaForm.company,
      email: ndaForm.email,
      topic: topic || undefined,
      source: pageSource || 'contact-slider-nda',
      privacyConsent: true as const,
      website: ndaHoneypot || undefined,
    });
  }, [ndaForm, ndaMutation, topic, pageSource, ndaHoneypot]);

  const updateField = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const updateNdaField = (field: keyof typeof ndaForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setNdaForm(prev => ({ ...prev, [field]: e.target.value }));

  const inputClass = "w-full h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all";
  const selectClass = "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-base text-gray-900 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all appearance-none cursor-pointer";
  const labelClass = "block fluid-small font-medium text-gray-700 mb-1.5";

  const isPending = mode === 'nda' ? ndaMutation.isPending : contactMutation.isPending;
  const isError = mode === 'nda' ? ndaMutation.isError : contactMutation.isError;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Slider panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[30rem] md:w-[34rem] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-gray-100 transition-colors text-gray-500 shadow-sm"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2} />
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center px-8 py-20"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${mode === 'nda' ? 'bg-blue-50' : 'bg-green-50'}`}>
                    {mode === 'nda' ? (
                      <ShieldCheck className="text-cme-blue" size={32} />
                    ) : (
                      <CheckCircle className="text-green-500" size={32} />
                    )}
                  </div>
                  <h4 className="text-2xl font-semibold text-cme-dark mb-3">
                    {mode === 'nda'
                      ? (isDE ? 'NDA-Anfrage erhalten!' : 'NDA request received!')
                      : (isDE ? 'Vielen Dank für Ihre Anfrage!' : 'Thank you for your inquiry!')
                    }
                  </h4>
                  <p className="text-base text-gray-600 max-w-sm leading-relaxed">
                    {mode === 'nda'
                      ? (isDE
                          ? 'Wir senden Ihnen unsere NDA-Vorlage schnellstmöglich per E-Mail zu.'
                          : 'We will send you our NDA template via email as soon as possible.')
                      : (isDE
                          ? 'Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.'
                          : 'We have received your message and will get back to you within 24 hours.')
                    }
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-8 py-3 rounded-lg bg-cme-blue text-white font-semibold hover:bg-cme-blue/90 transition-colors"
                  >
                    {isDE ? 'Schließen' : 'Close'}
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Hero area with GF image */}
                  <div className="relative bg-gradient-to-b from-gray-50 to-white px-8 pt-8 pb-6">
                    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md mb-6">
                      <img loading="lazy"
                        src={GF_IMAGE}
                        alt={isDE ? 'Geschäftsführung CME' : 'CME Management'}
                        className="w-full h-full object-cover object-top"
                        width={800}
                        height={450}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-cme-dark leading-snug mb-2">
                      {isDE
                        ? <>Lassen Sie uns über <span className="text-cme-blue">„{topic}“</span> sprechen.</>
                        : <>Let's talk about <span className="text-cme-blue">“{topic}”</span>.</>
                      }
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {isDE
                        ? 'Beschreiben Sie uns Ihr Vorhaben in groben Zügen. Wir nehmen kurzfristig Kontakt zur Terminvereinbarung mit Ihnen auf.'
                        : 'Describe your project in broad terms. We will contact you shortly to schedule a meeting.'}
                    </p>

                    {/* NDA Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setMode(mode === 'nda' ? 'contact' : 'nda')}
                      className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border fluid-small font-medium transition-all ${
                        mode === 'nda'
                          ? 'border-cme-blue bg-cme-blue/5 text-cme-blue'
                          : 'border-gray-300 bg-white text-gray-600 hover:border-cme-blue hover:text-cme-blue'
                      }`}
                    >
                      <ShieldCheck size={16} />
                      {isDE
                        ? (mode === 'nda' ? 'Zurück zum Kontaktformular' : 'Sie möchten vorab ein NDA vereinbaren?')
                        : (mode === 'nda' ? 'Back to contact form' : 'Would you like to sign an NDA first?')
                      }
                    </button>
                  </div>

                  {/* Form area */}
                  <div className="px-8 pb-8 pt-2">
                    <AnimatePresence mode="wait">
                      {mode === 'nda' ? (
                        /* ── NDA Form ────────────────────────────── */
                        <motion.form
                          key="nda-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onSubmit={handleNdaSubmit}
                          className="space-y-5"
                        >
                          <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-4 mb-1">
                            <p className="fluid-small text-blue-800 leading-relaxed">
                              {isDE
                                ? 'Wir senden Ihnen unsere NDA-Vorlage per E-Mail zu. Bitte geben Sie Ihre geschäftlichen Kontaktdaten an.'
                                : 'We will send you our NDA template via email. Please provide your business contact details.'}
                            </p>
                          </div>

                          {/* Salutation */}
                          <div>
                            <label className={labelClass}>
                              {isDE ? 'Anrede' : 'Salutation'} <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={ndaForm.salutation}
                                onChange={updateNdaField('salutation')}
                                className={selectClass}
                              >
                                <option value="" disabled>{isDE ? 'Bitte wählen' : 'Please select'}</option>
                                {SALUTATION_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>
                                    {isDE ? opt.labelDe : opt.labelEn}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                              </div>
                            </div>
                          </div>

                          {/* Name row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Vorname' : 'First name'} <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={ndaForm.firstName}
                                onChange={updateNdaField('firstName')}
                                placeholder={isDE ? 'Max' : 'John'}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Nachname' : 'Last name'} <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={ndaForm.lastName}
                                onChange={updateNdaField('lastName')}
                                placeholder={isDE ? 'Mustermann' : 'Doe'}
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {/* Company */}
                          <div>
                            <label className={labelClass}>
                              {isDE ? 'Unternehmen' : 'Company'} <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={ndaForm.company}
                              onChange={updateNdaField('company')}
                              placeholder={isDE ? 'Firma GmbH' : 'Company Inc.'}
                              className={inputClass}
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label className={labelClass}>
                              {isDE ? 'Geschäftliche E-Mail' : 'Work email'} <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={ndaForm.email}
                              onChange={updateNdaField('email')}
                              placeholder={isDE ? 'max@firma.de' : 'john@company.com'}
                              className={inputClass}
                            />
                          </div>

                          {/* Privacy consent checkbox */}
                          {/* Honeypot field – invisible to users, bots auto-fill it */}
                          <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
                            <label htmlFor="slider-nda-website">Website</label>
                            <input
                              type="text"
                              id="slider-nda-website"
                              name="website"
                              autoComplete="off"
                              tabIndex={-1}
                              value={ndaHoneypot}
                              onChange={(e) => setNdaHoneypot(e.target.value)}
                            />
                          </div>
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              required
                              checked={ndaPrivacyConsent}
                              onChange={(e) => setNdaPrivacyConsent(e.target.checked)}
                              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-cme-blue focus:ring-cme-blue/20 cursor-pointer shrink-0"
                            />
                            <span className="fluid-small text-gray-600 leading-relaxed">
                              {isDE
                                ? <>Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">Datenschutzerklärung</a> zu. <span className="text-red-400">*</span></>
                                : <>I agree to the processing of my data in accordance with the <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">privacy policy</a>. <span className="text-red-400">*</span></>
                              }
                            </span>
                          </label>

                          {/* NDA Submit button */}
                          <button
                            type="submit"
                            disabled={isPending || !ndaPrivacyConsent}
                            className="w-full flex items-center justify-center gap-2.5 bg-cme-dark text-white rounded-lg h-12 font-semibold text-base hover:bg-cme-dark/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                          >
                            {isPending ? (
                              <>
                                <Loader2 size={18} className="animate-spin" />
                                {isDE ? 'Wird gesendet...' : 'Sending...'}
                              </>
                            ) : (
                              <>
                                <ShieldCheck size={18} />
                                {isDE ? 'NDA Vorlage anfordern' : 'Request NDA template'}
                              </>
                            )}
                          </button>

                          {isError && (
                            <p className="text-red-500 fluid-small text-center">
                              {isDE
                                ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
                                : 'Error sending. Please try again.'}
                            </p>
                          )}
                        </motion.form>
                      ) : (
                        /* ── Standard Contact Form ────────────────── */
                        <motion.form
                          key="contact-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onSubmit={handleContactSubmit}
                          className="space-y-5"
                        >
                          {/* Salutation + Title row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Anrede' : 'Salutation'} <span className="text-red-400">*</span>
                              </label>
                              <div className="relative">
                                <select
                                  required
                                  value={form.salutation}
                                  onChange={updateField('salutation')}
                                  className={selectClass}
                                >
                                  <option value="" disabled>{isDE ? 'Bitte wählen' : 'Please select'}</option>
                                  {SALUTATION_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                      {isDE ? opt.labelDe : opt.labelEn}
                                    </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Titel' : 'Title'} <span className="text-gray-400 font-normal fluid-xs">({isDE ? 'optional' : 'optional'})</span>
                              </label>
                              <input
                                type="text"
                                value={form.title}
                                onChange={updateField('title')}
                                placeholder={isDE ? 'z.B. Dr., Prof.' : 'e.g. Dr., Prof.'}
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {/* Name row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Vorname' : 'First name'} <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={form.firstName}
                                onChange={updateField('firstName')}
                                placeholder={isDE ? 'Max' : 'John'}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Nachname' : 'Last name'} <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={form.lastName}
                                onChange={updateField('lastName')}
                                placeholder={isDE ? 'Mustermann' : 'Doe'}
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label className={labelClass}>
                              {isDE ? 'Geschäftliche E-Mail' : 'Work email'} <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={form.email}
                              onChange={updateField('email')}
                              placeholder={isDE ? 'max@firma.de' : 'john@company.com'}
                              className={inputClass}
                            />
                          </div>

                          {/* Company + Phone row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Unternehmen' : 'Company'} <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={form.company}
                                onChange={updateField('company')}
                                placeholder={isDE ? 'Firma GmbH' : 'Company Inc.'}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>
                                {isDE ? 'Telefon' : 'Phone'} <span className="text-gray-400 font-normal fluid-xs">({isDE ? 'optional' : 'optional'})</span>
                              </label>
                              <input
                                type="tel"
                                value={form.phone}
                                onChange={updateField('phone')}
                                placeholder="+49 ..."
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {/* Subject (pre-filled) */}
                          <div>
                            <label className={labelClass}>
                              {isDE ? 'Betreff' : 'Subject'}
                            </label>
                            <input
                              type="text"
                              value={form.subject}
                              onChange={updateField('subject')}
                              className={`${inputClass} bg-gray-50`}
                            />
                          </div>

                          {/* Message */}
                          <div>
                            <label className={labelClass}>
                              {isDE ? 'Projektbeschreibung' : 'Project description'} <span className="text-gray-400 font-normal fluid-xs">({isDE ? 'optional' : 'optional'})</span>
                            </label>
                            <textarea
                              value={form.message}
                              onChange={updateField('message')}
                              rows={3}
                              placeholder={isDE
                                ? 'z.B. Stückzahlen, Anforderungen, Zeitrahmen...'
                                : 'e.g. quantities, requirements, timeline...'}
                              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all resize-none"
                            />
                          </div>

                          {/* Honeypot field – invisible to users, bots auto-fill it */}
                          <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
                            <label htmlFor="slider-contact-website">Website</label>
                            <input
                              type="text"
                              id="slider-contact-website"
                              name="website"
                              autoComplete="off"
                              tabIndex={-1}
                              value={honeypot}
                              onChange={(e) => setHoneypot(e.target.value)}
                            />
                          </div>
                          {/* Privacy consent checkbox */}
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              required
                              checked={privacyConsent}
                              onChange={(e) => setPrivacyConsent(e.target.checked)}
                              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-cme-blue focus:ring-cme-blue/20 cursor-pointer shrink-0"
                            />
                            <span className="fluid-small text-gray-600 leading-relaxed">
                              {isDE
                                ? <>Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">Datenschutzerklärung</a> zu. <span className="text-red-400">*</span></>
                                : <>I agree to the processing of my data in accordance with the <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">privacy policy</a>. <span className="text-red-400">*</span></>
                              }
                            </span>
                          </label>

                          {/* Submit button */}
                          <button
                            type="submit"
                            disabled={isPending || !privacyConsent}
                            className="w-full flex items-center justify-center gap-2.5 bg-cme-blue text-white rounded-lg h-12 font-semibold text-base hover:bg-cme-blue/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                          >
                            {isPending ? (
                              <>
                                <Loader2 size={18} className="animate-spin" />
                                {isDE ? 'Wird gesendet...' : 'Sending...'}
                              </>
                            ) : (
                              <>
                                {isDE ? 'Anfrage absenden' : 'Submit inquiry'}
                                <ArrowRight size={18} />
                              </>
                            )}
                          </button>

                          {isError && (
                            <p className="text-red-500 fluid-small text-center">
                              {isDE
                                ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
                                : 'Error sending. Please try again.'}
                            </p>
                          )}
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
