import SEO from '@/components/SEO';
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
  const { t: cms, img, vid } = useContent('kontakt');

  // Hero video from CMS
  const heroVideoWebm = vid('hero.heroVideoWebm');
  const heroVideoMp4 = vid('hero.heroVideoMp4');
  const heroVideoPoster = img('hero.heroVideoPoster');
  const heroVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const heroVideo = (heroVideoWebm || heroVideoMp4)
    ? { webm: heroVideoWebm || undefined, mp4: heroVideoMp4 || undefined, poster: heroVideoPoster || undefined, playback: (heroVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : undefined;

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

  // Honeypot fields (invisible to users, bots auto-fill them)
  const [honeypot, setHoneypot] = useState('');
  const [ndaHoneypot, setNdaHoneypot] = useState('');

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
      website: honeypot || undefined,
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
      website: ndaHoneypot || undefined,
    });
  };

  const inputClass = "w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small";
  const selectClass = "w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small bg-white appearance-none cursor-pointer";

  return (
    <Layout>
      <SEO
        titleDE='Kontakt'
        titleEN='Contact'
        descriptionDE='Kontaktieren Sie CME für Ihre Elektronikprojekte – Beratung, Angebot und technische Klärung.'
        descriptionEN='Contact CME for your electronics projects – consultation, quotation and technical clarification.'
        path='/kontakt'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Kontakt',url:'/kontakt'}]}
      />
      <SubPageHero
        tagline={cms('hero.tagline')}
        headline={cms('hero.headline')}
        description={cms('hero.description')}
        heroImage={img('hero.heroImage')}
        heroVideo={heroVideo}
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
                      <p className="text-gray-600 fluid-small" style={{ marginTop: 'var(--space-gap-xs)' }}>
                        {cms('form.successMessage')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="grid grid-cols-2 gap-x-4 gap-y-5"
                    >
                      {/* Honeypot field for spam protection */}
                      <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />

                      {/* Salutation */}
                      <div className="col-span-2 relative">
                        <label htmlFor="salutation" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Anrede' : 'Salutation'} <span className="text-red-500">*</span></label>
                        <select
                          id="salutation"
                          value={form.salutation}
                          onChange={(e) => setForm({ ...form, salutation: e.target.value })}
                          className={selectClass}
                          required
                        >
                          <option value="" disabled>{isDE ? 'Bitte wählen' : 'Please select'}</option>
                          {SALUTATION_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{isDE ? opt.labelDe : opt.labelEn}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 mt-2.5 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Titel' : 'Title'}</label>
                        <input
                          type="text"
                          id="title"
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          className={inputClass}
                          placeholder={isDE ? 'z.B. Dr.' : 'e.g. Dr.'}
                        />
                      </div>

                      {/* Spacer on large screens */}
                      <div className="hidden sm:block"></div>

                      {/* First Name */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Vorname' : 'First Name'} <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Nachname' : 'Last Name'} <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1.5 fluid-small">E-Mail <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          id="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Company */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="company" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Firma' : 'Company'}</label>
                        <input
                          type="text"
                          id="company"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      {/* Phone */}
                      <div className="col-span-2">
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Telefon' : 'Phone'}</label>
                        <input
                          type="tel"
                          id="phone"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      {/* Subject */}
                      <div className="col-span-2">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Betreff' : 'Subject'}</label>
                        <input
                          type="text"
                          id="subject"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      {/* Message */}
                      <div className="col-span-2">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Ihre Nachricht' : 'Your Message'} <span className="text-red-500">*</span></label>
                        <textarea
                          id="message"
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className={inputClass}
                          required
                        ></textarea>
                      </div>

                      {/* Privacy Consent */}
                      <div className="col-span-2">
                        <label className="flex items-start gap-2 cursor-pointer fluid-xs text-gray-600">
                          <input
                            type="checkbox"
                            checked={privacyConsent}
                            onChange={(e) => setPrivacyConsent(e.target.checked)}
                            className="mt-1 flex-shrink-0 w-4 h-4 text-cme-blue bg-gray-100 border-gray-300 rounded focus:ring-cme-blue focus:ring-2 cursor-pointer"
                            required
                          />
                          <span dangerouslySetInnerHTML={{ __html: cms('form.privacyConsent') as string }} />
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="col-span-2">
                        <button
                          type="submit"
                          disabled={submitMutation.isPending}
                          className="btn btn-primary w-full flex items-center justify-center gap-2"
                        >
                          {submitMutation.isPending ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> {isDE ? 'Wird gesendet...' : 'Sending...'}</>
                          ) : (
                            <><Send className="w-5 h-5" /> {isDE ? 'Nachricht senden' : 'Send Message'}</>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )
                ) : (
                  /* ── NDA Request Form ── */
                  ndaSubmitted ? (
                    <motion.div
                      key="nda-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-2xl text-center fluid-card"
                      style={{ padding: 'var(--space-section-sm)' }}
                    >
                      <CheckCircle className="text-green-500 mx-auto" style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }} />
                      <h3 className="fluid-h3 text-cme-dark">
                        {cms('ndaForm.successTitle')}
                      </h3>
                      <p className="text-gray-600 fluid-small" style={{ marginTop: 'var(--space-gap-xs)' }}>
                        {cms('ndaForm.successMessage')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="nda-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleNdaSubmit}
                      className="grid grid-cols-2 gap-x-4 gap-y-5"
                    >
                      {/* Honeypot field for spam protection */}
                      <input type="text" name="website" value={ndaHoneypot} onChange={(e) => setNdaHoneypot(e.target.value)} style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />

                      <div className="col-span-2">
                        <p className="fluid-small text-gray-600">{cms('ndaForm.description')}</p>
                      </div>

                      {/* Salutation */}
                      <div className="col-span-2 relative">
                        <label htmlFor="nda-salutation" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Anrede' : 'Salutation'} <span className="text-red-500">*</span></label>
                        <select
                          id="nda-salutation"
                          value={ndaForm.salutation}
                          onChange={(e) => setNdaForm({ ...ndaForm, salutation: e.target.value })}
                          className={selectClass}
                          required
                        >
                          <option value="" disabled>{isDE ? 'Bitte wählen' : 'Please select'}</option>
                          {SALUTATION_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{isDE ? opt.labelDe : opt.labelEn}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 mt-2.5 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>

                      {/* First Name */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="nda-firstName" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Vorname' : 'First Name'} <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="nda-firstName"
                          value={ndaForm.firstName}
                          onChange={(e) => setNdaForm({ ...ndaForm, firstName: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="nda-lastName" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Nachname' : 'Last Name'} <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="nda-lastName"
                          value={ndaForm.lastName}
                          onChange={(e) => setNdaForm({ ...ndaForm, lastName: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Company */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="nda-company" className="block text-gray-700 font-medium mb-1.5 fluid-small">{isDE ? 'Firma' : 'Company'} <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="nda-company"
                          value={ndaForm.company}
                          onChange={(e) => setNdaForm({ ...ndaForm, company: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="nda-email" className="block text-gray-700 font-medium mb-1.5 fluid-small">E-Mail <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          id="nda-email"
                          value={ndaForm.email}
                          onChange={(e) => setNdaForm({ ...ndaForm, email: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Privacy Consent */}
                      <div className="col-span-2">
                        <label className="flex items-start gap-2 cursor-pointer fluid-xs text-gray-600">
                          <input
                            type="checkbox"
                            checked={ndaPrivacyConsent}
                            onChange={(e) => setNdaPrivacyConsent(e.target.checked)}
                            className="mt-1 flex-shrink-0 w-4 h-4 text-cme-blue bg-gray-100 border-gray-300 rounded focus:ring-cme-blue focus:ring-2 cursor-pointer"
                            required
                          />
                          <span dangerouslySetInnerHTML={{ __html: cms('ndaForm.privacyConsent') as string }} />
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="col-span-2">
                        <button
                          type="submit"
                          disabled={ndaMutation.isPending}
                          className="btn btn-primary w-full flex items-center justify-center gap-2"
                        >
                          {ndaMutation.isPending ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> {isDE ? 'NDA anfordern...' : 'Requesting NDA...'}</>
                          ) : (
                            <><Send className="w-5 h-5" /> {isDE ? 'NDA anfordern' : 'Request NDA'}</>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
