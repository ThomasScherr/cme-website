import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const SALUTATION_OPTIONS = [
  { value: 'Herr', labelDe: 'Herr', labelEn: 'Mr.' },
  { value: 'Frau', labelDe: 'Frau', labelEn: 'Ms.' },
  { value: 'Keine Angabe', labelDe: 'Keine Angabe', labelEn: 'Prefer not to say' },
];

export default function Kontakt() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img } = useContent('kontakt');

  const [mode, setMode] = useState<'contact' | 'nda'>('contact');
  const [submitted, setSubmitted] = useState(false);
  const [ndaSubmitted, setNdaSubmitted] = useState(false);

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

  const [ndaForm, setNdaForm] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
  });

  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [ndaPrivacyConsent, setNdaPrivacyConsent] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => toast.error(err.message || (isDE ? 'Fehler beim Senden.' : 'Error sending.')),
  });

  const ndaMutation = trpc.nda.submit.useMutation({
    onSuccess: () => {
      setNdaSubmitted(true);
      setNdaForm({ salutation: '', firstName: '', lastName: '', company: '', email: '' });
    },
    onError: (err) => toast.error(err.message || (isDE ? 'Fehler beim Senden.' : 'Error sending.')),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.salutation) {
      toast.error(isDE ? 'Bitte wählen Sie eine Anrede.' : 'Please select a salutation.');
      return;
    }
    if (!privacyConsent) {
      toast.error(isDE ? 'Bitte akzeptieren Sie die Datenschutzerklärung.' : 'Please accept the privacy policy.');
      return;
    }
    submitMutation.mutate({
      salutation: form.salutation,
      title: form.title || undefined,
      name: `${form.firstName} ${form.lastName}`.trim(),
      company: form.company || undefined,
      email: form.email,
      phone: form.phone || undefined,
      message: form.subject ? `[${form.subject}] ${form.message}` : form.message,
      source: 'kontakt',
      privacyConsent: true as const,
    });
  };

  const handleNdaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaForm.salutation) {
      toast.error(isDE ? 'Bitte wählen Sie eine Anrede.' : 'Please select a salutation.');
      return;
    }
    if (!ndaPrivacyConsent) {
      toast.error(isDE ? 'Bitte akzeptieren Sie die Datenschutzerklärung.' : 'Please accept the privacy policy.');
      return;
    }
    ndaMutation.mutate({
      salutation: ndaForm.salutation,
      firstName: ndaForm.firstName,
      lastName: ndaForm.lastName,
      company: ndaForm.company,
      email: ndaForm.email,
      source: 'kontakt',
      privacyConsent: true as const,
    });
  };

  const inputClass = "w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small";
  const selectClass = "w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small bg-white appearance-none cursor-pointer";

  return (
    <Layout>
      <SubPageHero
        tagline={cms('hero.tagline')}
        headline={cms('hero.headline')}
        description={cms('hero.description')}
        heroImage={img('hero.heroImage')}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
          <a href={`tel:${cms('hero.phone').replace(/\s/g, '')}`} className="flex items-center gap-2 text-cme-dark/80 hover:text-cme-blue transition-colors fluid-small">
            <Phone size={18} className="text-cme-blue" />
            {cms('hero.phone')}
          </a>
          <a href={`mailto:${cms('hero.email')}`} className="flex items-center gap-2 text-cme-dark/80 hover:text-cme-blue transition-colors fluid-small">
            <Mail size={18} className="text-cme-blue" />
            {cms('hero.email')}
          </a>
        </div>
      </SubPageHero>

      {/* Contact Info + Form */}
      <section className="section-pad">
        <div className="container">
          <div className="grid lg:grid-cols-5" style={{ gap: 'var(--space-gap-lg)' }}>
            {/* Contact Info */}
            <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-md)' }}>
              <div>
                <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                  {cms('contactInfo.sectionTitle')}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-sm)' }}>
                  <div className="flex" style={{ gap: 'var(--space-gap-xs)' }}>
                    <div
                      className="rounded-lg bg-cme-blue-light flex items-center justify-center flex-shrink-0"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <MapPin style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-cme-dark fluid-small">{cms('contactInfo.companyName')}</p>
                      <p className="text-gray-600 fluid-xs" style={{ marginTop: 'clamp(0.125rem, 0.05rem + 0.15vw, 0.25rem)' }}>
                        {cms('contactInfo.street')}<br />
                        {cms('contactInfo.city')}<br />
                        {cms('contactInfo.country')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)' }}>
                    <div
                      className="rounded-lg bg-cme-blue-light flex items-center justify-center flex-shrink-0"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <Phone style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-cme-dark fluid-small">{isDE ? 'Telefon' : 'Phone'}</p>
                      <a href={`tel:${cms('contactInfo.phone').replace(/\s/g, '')}`} className="text-gray-600 fluid-xs hover:text-cme-blue transition-colors">{cms('contactInfo.phone')}</a>
                    </div>
                  </div>
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)' }}>
                    <div
                      className="rounded-lg bg-cme-blue-light flex items-center justify-center flex-shrink-0"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <Mail style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-cme-dark fluid-small">E-Mail</p>
                      <a href={`mailto:${cms('contactInfo.email')}`} className="text-gray-600 fluid-xs hover:text-cme-blue transition-colors">{cms('contactInfo.email')}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              {/* NDA Toggle Button */}
              <button
                type="button"
                onClick={() => { setMode(mode === 'nda' ? 'contact' : 'nda'); setNdaSubmitted(false); }}
                className="group flex items-center gap-2 mb-6 px-4 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-cme-blue/30 hover:bg-cme-blue/5 transition-all duration-200 fluid-small text-cme-dark"
              >
                <ShieldCheck className="w-4 h-4 text-cme-blue" />
                <span>
                  {mode === 'nda'
                    ? (isDE ? 'Zurück zum Kontaktformular' : 'Back to contact form')
                    : (isDE ? 'Sie möchten vorab ein NDA vereinbaren?' : 'Would you like to arrange an NDA first?')}
                </span>
              </button>

              <AnimatePresence mode="wait">
                {mode === 'contact' ? (
                  /* ── Standard Contact Form ── */
                  submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-2xl text-center fluid-card"
                      style={{ padding: 'var(--space-section-sm)' }}
                    >
                      <CheckCircle className="text-green-500 mx-auto" style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }} />
                      <h3 className="fluid-h3 text-cme-dark">
                        {cms('form.successTitle')}
                      </h3>
                      <p className="text-gray-600 fluid-body" style={{ marginTop: 'var(--space-gap-xs)' }}>
                        {cms('form.successMessage')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-sm)' }}
                    >
                      {/* Salutation + Title */}
                      <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-sm)' }}>
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Anrede' : 'Salutation'} *
                          </label>
                          <div className="relative">
                            <select
                              required
                              value={form.salutation}
                              onChange={(e) => setForm({ ...form, salutation: e.target.value })}
                              className={selectClass}
                              style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            >
                              <option value="" disabled>{isDE ? 'Bitte wählen...' : 'Please select...'}</option>
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
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Titel (optional)' : 'Title (optional)'}
                          </label>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className={inputClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            placeholder={isDE ? 'z.B. Dr., Prof.' : 'e.g. Dr., Prof.'}
                          />
                        </div>
                      </div>

                      {/* Name row */}
                      <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-sm)' }}>
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Vorname' : 'First name'} *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className={inputClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            placeholder={isDE ? 'Ihr Vorname' : 'Your first name'}
                          />
                        </div>
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Nachname' : 'Last name'} *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            className={inputClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            placeholder={isDE ? 'Ihr Nachname' : 'Your last name'}
                          />
                        </div>
                      </div>

                      {/* Company + Phone */}
                      <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-sm)' }}>
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Unternehmen' : 'Company'}
                          </label>
                          <input
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className={inputClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            placeholder={isDE ? 'Ihr Unternehmen' : 'Your company'}
                          />
                        </div>
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Telefon' : 'Phone'}
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className={inputClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            placeholder="+49 ..."
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputClass}
                          style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                          placeholder={isDE ? 'ihre@email.de' : 'your@email.com'}
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                          {isDE ? 'Betreff' : 'Subject'} *
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className={selectClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                          >
                            <option value="">{isDE ? 'Bitte wählen...' : 'Please select...'}</option>
                            <option value="development">{cms('form.subjectDev')}</option>
                            <option value="manufacturing">{cms('form.subjectMfg')}</option>
                            <option value="lifecycle">{cms('form.subjectLifecycle')}</option>
                            <option value="general">{cms('form.subjectGeneral')}</option>
                            <option value="career">{cms('form.subjectCareer')}</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                          {isDE ? 'Nachricht' : 'Message'} *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className={`${inputClass} resize-none`}
                          style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                          placeholder={isDE ? 'Beschreiben Sie Ihr Vorhaben in groben Zügen...' : 'Describe your project in broad terms...'}
                        />
                      </div>

                      {/* Privacy consent checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-cme-blue focus:ring-cme-blue/20 cursor-pointer shrink-0"
                        />
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {isDE
                            ? <>Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">Datenschutzerklärung</a> zu. <span className="text-red-400">*</span></>
                            : <>I agree to the processing of my data in accordance with the <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">privacy policy</a>. <span className="text-red-400">*</span></>
                          }
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={submitMutation.isPending || !privacyConsent}
                        className="bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors flex items-center gap-2 disabled:opacity-50 self-start fluid-btn"
                      >
                        {submitMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send size={18} />
                        )}
                        {cms('form.submitLabel')}
                      </button>
                      {submitMutation.isError && (
                        <p className="text-red-500 fluid-xs">
                          {isDE ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' : 'Error sending. Please try again.'}
                        </p>
                      )}
                    </motion.form>
                  )
                ) : (
                  /* ── NDA Form ── */
                  <motion.div
                    key="nda-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ndaSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                        <h3 className="fluid-h3 text-cme-dark mb-2">
                          {isDE ? 'NDA-Vorlage angefordert' : 'NDA Template Requested'}
                        </h3>
                        <p className="fluid-body text-gray-500 max-w-sm">
                          {isDE
                            ? 'Wir senden Ihnen unsere NDA-Vorlage kurzfristig per E-Mail zu.'
                            : 'We will send you our NDA template by email shortly.'}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleNdaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-sm)' }}>
                        <div className="bg-cme-blue/5 border border-cme-blue/10 rounded-lg p-4 mb-2">
                          <p className="fluid-small text-cme-dark leading-relaxed">
                            <ShieldCheck className="w-4 h-4 text-cme-blue inline mr-2 -mt-0.5" />
                            {isDE
                              ? 'Vertraulichkeit ist uns wichtig. Fordern Sie hier unsere NDA-Vorlage an – wir senden sie Ihnen umgehend zu.'
                              : 'Confidentiality matters to us. Request our NDA template here – we will send it to you promptly.'}
                          </p>
                        </div>

                        {/* Salutation */}
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Anrede' : 'Salutation'} *
                          </label>
                          <div className="relative">
                            <select
                              required
                              value={ndaForm.salutation}
                              onChange={(e) => setNdaForm({ ...ndaForm, salutation: e.target.value })}
                              className={selectClass}
                              style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            >
                              <option value="" disabled>{isDE ? 'Bitte wählen...' : 'Please select...'}</option>
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
                        <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-sm)' }}>
                          <div>
                            <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                              {isDE ? 'Vorname' : 'First name'} *
                            </label>
                            <input
                              type="text"
                              required
                              value={ndaForm.firstName}
                              onChange={(e) => setNdaForm({ ...ndaForm, firstName: e.target.value })}
                              className={inputClass}
                              style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                              placeholder={isDE ? 'Ihr Vorname' : 'Your first name'}
                            />
                          </div>
                          <div>
                            <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                              {isDE ? 'Nachname' : 'Last name'} *
                            </label>
                            <input
                              type="text"
                              required
                              value={ndaForm.lastName}
                              onChange={(e) => setNdaForm({ ...ndaForm, lastName: e.target.value })}
                              className={inputClass}
                              style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                              placeholder={isDE ? 'Ihr Nachname' : 'Your last name'}
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Firma' : 'Company'} *
                          </label>
                          <input
                            type="text"
                            required
                            value={ndaForm.company}
                            onChange={(e) => setNdaForm({ ...ndaForm, company: e.target.value })}
                            className={inputClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            placeholder={isDE ? 'Ihr Unternehmen' : 'Your company'}
                          />
                        </div>

                        {/* Business Email */}
                        <div>
                          <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                            {isDE ? 'Geschäftliche E-Mail' : 'Business email'} *
                          </label>
                          <input
                            type="email"
                            required
                            value={ndaForm.email}
                            onChange={(e) => setNdaForm({ ...ndaForm, email: e.target.value })}
                            className={inputClass}
                            style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                            placeholder={isDE ? 'ihre@firma.de' : 'your@company.com'}
                          />
                        </div>

                        {/* Privacy consent checkbox */}
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={ndaPrivacyConsent}
                            onChange={(e) => setNdaPrivacyConsent(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-cme-blue focus:ring-cme-blue/20 cursor-pointer shrink-0"
                          />
                          <span className="text-sm text-gray-600 leading-relaxed">
                            {isDE
                              ? <>Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">Datenschutzerklärung</a> zu. <span className="text-red-400">*</span></>
                              : <>I agree to the processing of my data in accordance with the <a href="/datenschutz" target="_blank" className="text-cme-blue underline hover:text-cme-dark transition-colors">privacy policy</a>. <span className="text-red-400">*</span></>
                            }
                          </span>
                        </label>

                        <button
                          type="submit"
                          disabled={ndaMutation.isPending || !ndaPrivacyConsent}
                          className="bg-cme-dark text-white rounded-lg font-semibold hover:bg-cme-dark/90 transition-colors flex items-center gap-2 disabled:opacity-50 self-start fluid-btn"
                        >
                          {ndaMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <ShieldCheck size={18} />
                          )}
                          {isDE ? 'NDA Vorlage anfordern' : 'Request NDA Template'}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
