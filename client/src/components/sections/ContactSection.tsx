import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { MapPin, Phone, Mail, Send, Loader2, ShieldCheck, CheckCircle } from 'lucide-react';
import { localizeHref } from '@/lib/localizedRouting';

const vp = { once: true, margin: '-80px' as const };

const SALUTATION_OPTIONS = [
  { value: 'Herr', labelDe: 'Herr', labelEn: 'Mr.' },
  { value: 'Frau', labelDe: 'Frau', labelEn: 'Ms.' },
  { value: 'Keine Angabe', labelDe: 'Keine Angabe', labelEn: 'Prefer not to say' },
];

export default function ContactSection() {
  const { t, lang } = useLanguage();
  const isDE = lang === 'de';

  const [mode, setMode] = useState<'contact' | 'nda'>('contact');
  const [submitted, setSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Standard contact form
  const [formData, setFormData] = useState({
    salutation: '',
    title: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  });

  // NDA form
  const [ndaForm, setNdaForm] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
  });

  const [ndaPrivacyConsent, setNdaPrivacyConsent] = useState(false);

  // Honeypot fields (invisible to users, bots auto-fill them)
  const [honeypot, setHoneypot] = useState('');
  const [ndaHoneypot, setNdaHoneypot] = useState('');

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setContactSubmitted(true);
      setFormData({
        salutation: '', title: '', firstName: '', lastName: '',
        company: '', email: '', phone: '', message: '', privacy: false,
      });
    },
    onError: (err) => toast.error(err.message || (isDE ? 'Fehler beim Senden.' : 'Error sending.')),
  });

  const ndaMutation = trpc.nda.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setNdaForm({ salutation: '', firstName: '', lastName: '', company: '', email: '' });
    },
    onError: (err) => toast.error(err.message || (isDE ? 'Fehler beim Senden.' : 'Error sending.')),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.salutation) {
      toast.error(isDE ? 'Bitte wählen Sie eine Anrede.' : 'Please select a salutation.');
      return;
    }
    if (!formData.privacy) {
      toast.error(isDE ? 'Bitte akzeptieren Sie die Datenschutzerklärung.' : 'Please accept the privacy policy.');
      return;
    }
    submitMutation.mutate({
      salutation: formData.salutation,
      title: formData.title || undefined,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      company: formData.company || undefined,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
      source: 'homepage',
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
      source: 'homepage',
      privacyConsent: true as const,
      website: ndaHoneypot || undefined,
    });
  };

  const selectClass = "w-full h-11 rounded-md border border-input bg-background px-3.5 py-2.5 text-base text-foreground shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all appearance-none cursor-pointer fluid-small";

  return (
    <section id="contact" className="section-pad bg-gray-50">
      <div className="container max-w-6xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <p className="fluid-xs font-semibold text-cme-blue uppercase tracking-[0.18em]" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            Kontakt
          </p>
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {t.contact.headline}
          </h2>
          <p className="fluid-body-lg text-gray-500 max-w-xl">
            {t.contact.sub}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2" style={{ gap: 'var(--space-gap-lg)' }}>
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            {/* NDA Toggle Button */}
            <button
              type="button"
              onClick={() => { setMode(mode === 'nda' ? 'contact' : 'nda'); setSubmitted(false); setContactSubmitted(false); }}
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
                contactSubmitted ? (
                  /* ── Contact Success Confirmation ── */
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                      <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h3 className="fluid-h3 text-cme-dark mb-3">
                      {isDE ? 'Vielen Dank für Ihre Anfrage!' : 'Thank you for your inquiry!'}
                    </h3>
                    <p className="fluid-body text-gray-500 max-w-sm leading-relaxed">
                      {isDE
                        ? 'Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.'
                        : 'We have received your message and will get back to you as soon as possible.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactSubmitted(false)}
                      className="mt-8 px-8 py-3 rounded-lg bg-cme-blue text-white font-semibold hover:bg-cme-blue/90 transition-colors fluid-small"
                    >
                      {isDE ? 'Neue Nachricht senden' : 'Send another message'}
                    </button>
                  </motion.div>
                ) : (
                /* ── Standard Contact Form ── */
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)' }}
                >
                  {/* Salutation + Title row */}
                  <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-xs)' }}>
                    <div className="relative">
                      <select
                        required
                        value={formData.salutation}
                        onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                        className={selectClass}
                        aria-label={isDE ? 'Anrede' : 'Salutation'}
                      >
                        <option value="" disabled>{isDE ? 'Anrede *' : 'Salutation *'}</option>
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
                    <Input
                      placeholder={isDE ? 'Titel (optional, z.B. Dr.)' : 'Title (optional, e.g. Dr.)'}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="fluid-small h-11 py-2.5"
                    />
                  </div>

                  {/* Name row */}
                  <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-xs)' }}>
                    <Input
                      placeholder={(isDE ? 'Vorname' : 'First name') + ' *'}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="fluid-small h-11 py-2.5"
                    />
                    <Input
                      placeholder={(isDE ? 'Nachname' : 'Last name') + ' *'}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="fluid-small h-11 py-2.5"
                    />
                  </div>

                  {/* Company */}
                  <Input
                    placeholder={t.contact.company}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="fluid-small h-11 py-2.5"
                  />

                  {/* Email + Phone row */}
                  <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-xs)' }}>
                    <Input
                      type="email"
                      placeholder={t.contact.email + ' *'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="fluid-small h-11 py-2.5"
                    />
                    <Input
                      type="tel"
                      placeholder={t.contact.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="fluid-small h-11 py-2.5"
                    />
                  </div>

                  <Textarea
                    placeholder={t.contact.message + ' *'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    className="resize-none fluid-small"
                  />
                  {/* Honeypot field – invisible to users, bots auto-fill it */}
                  <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      type="text"
                      id="contact-website"
                      name="website"
                      autoComplete="off"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacy}
                      onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-cme-blue focus:ring-cme-blue/20 cursor-pointer shrink-0"
                      required
                    />
                    <span className="fluid-small text-gray-600 leading-relaxed">
                      {isDE
                        ? <>Ich stimme der Verarbeitung meiner Daten gemäß der <a href={localizeHref("/datenschutz", lang)} target="_blank" rel="noopener noreferrer" className="text-cme-blue underline hover:text-cme-dark transition-colors">Datenschutzerklärung</a> zu. <span className="text-red-400">*</span></>
                        : <>I agree to the processing of my data in accordance with the <a href={localizeHref("/datenschutz", lang)} target="_blank" rel="noopener noreferrer" className="text-cme-blue underline hover:text-cme-dark transition-colors">privacy policy</a>. <span className="text-red-400">*</span></>
                      }
                    </span>
                  </label>
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="bg-cme-blue hover:bg-cme-blue/90 text-white shadow-md self-start fluid-btn"
                  >
                    {submitMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Send size={16} className="mr-2" />
                    )}
                    {t.contact.submit}
                  </Button>
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
                  {submitted ? (
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
                    <form onSubmit={handleNdaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)' }}>
                      <div className="bg-cme-blue/5 border border-cme-blue/10 rounded-lg p-4 mb-2">
                        <p className="fluid-small text-cme-dark leading-relaxed">
                          <ShieldCheck className="w-4 h-4 text-cme-blue inline mr-2 -mt-0.5" />
                          {isDE
                            ? 'Vertraulichkeit ist uns wichtig. Fordern Sie hier unsere NDA-Vorlage an – wir senden sie Ihnen umgehend zu.'
                            : 'Confidentiality matters to us. Request our NDA template here – we will send it to you promptly.'}
                        </p>
                      </div>

                      {/* Salutation */}
                      <div className="relative">
                        <select
                          required
                          value={ndaForm.salutation}
                          onChange={(e) => setNdaForm({ ...ndaForm, salutation: e.target.value })}
                          className={selectClass}
                          aria-label={isDE ? 'Anrede' : 'Salutation'}
                        >
                          <option value="" disabled>{isDE ? 'Anrede *' : 'Salutation *'}</option>
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

                      {/* Name row */}
                      <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-xs)' }}>
                        <Input
                          placeholder={(isDE ? 'Vorname' : 'First name') + ' *'}
                          value={ndaForm.firstName}
                          onChange={(e) => setNdaForm({ ...ndaForm, firstName: e.target.value })}
                          required
                          className="fluid-small h-11 py-2.5"
                        />
                        <Input
                          placeholder={(isDE ? 'Nachname' : 'Last name') + ' *'}
                          value={ndaForm.lastName}
                          onChange={(e) => setNdaForm({ ...ndaForm, lastName: e.target.value })}
                          required
                          className="fluid-small h-11 py-2.5"
                        />
                      </div>

                      {/* Company */}
                      <Input
                        placeholder={(isDE ? 'Firma' : 'Company') + ' *'}
                        value={ndaForm.company}
                        onChange={(e) => setNdaForm({ ...ndaForm, company: e.target.value })}
                        required
                        className="fluid-small h-11 py-2.5"
                      />

                      {/* Business Email */}
                      <Input
                        type="email"
                        placeholder={(isDE ? 'Geschäftliche E-Mail' : 'Business email') + ' *'}
                        value={ndaForm.email}
                        onChange={(e) => setNdaForm({ ...ndaForm, email: e.target.value })}
                        required
                        className="fluid-small h-11 py-2.5"
                      />

                      {/* Honeypot field – invisible to users, bots auto-fill it */}
                      <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
                        <label htmlFor="nda-website">Website</label>
                        <input
                          type="text"
                          id="nda-website"
                          name="website"
                          autoComplete="off"
                          tabIndex={-1}
                          value={ndaHoneypot}
                          onChange={(e) => setNdaHoneypot(e.target.value)}
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
                        <span className="fluid-small text-gray-600 leading-relaxed">
                          {isDE
                            ? <>Ich stimme der Verarbeitung meiner Daten gemäß der <a href={localizeHref("/datenschutz", lang)} target="_blank" rel="noopener noreferrer" className="text-cme-blue underline hover:text-cme-dark transition-colors">Datenschutzerklärung</a> zu. <span className="text-red-400">*</span></>
                            : <>I agree to the processing of my data in accordance with the <a href={localizeHref("/datenschutz", lang)} target="_blank" rel="noopener noreferrer" className="text-cme-blue underline hover:text-cme-dark transition-colors">privacy policy</a>. <span className="text-red-400">*</span></>
                          }
                        </span>
                      </label>

                      <Button
                        type="submit"
                        disabled={ndaMutation.isPending || !ndaPrivacyConsent}
                        className="bg-cme-dark hover:bg-cme-dark/90 text-white shadow-md self-start fluid-btn"
                      >
                        {ndaMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <ShieldCheck size={16} className="mr-2" />
                        )}
                        {isDE ? 'NDA Vorlage anfordern' : 'Request NDA Template'}
                      </Button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-md)' }}
          >
            <div>
              <h3 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {t.contact.address_title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)' }}>
                <div className="flex items-start gap-3">
                  <MapPin style={{ width: 'var(--icon-size)', height: 'var(--icon-size)', flexShrink: 0, marginTop: '0.125rem' }} className="text-cme-blue" />
                  <div>
                    <p className="fluid-small font-semibold text-cme-dark">CME Control Motion Electronics GmbH</p>
                    <p className="fluid-small text-gray-500">Alter Hellweg 48</p>
                    <p className="fluid-small text-gray-500">44379 Dortmund, Germany</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone style={{ width: 'var(--icon-size)', height: 'var(--icon-size)', flexShrink: 0 }} className="text-cme-blue" />
                  <a href="tel:+4923128667696" className="fluid-small text-cme-dark hover:text-cme-blue transition-colors">
                    +49 231 28 66 76 96-0
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail style={{ width: 'var(--icon-size)', height: 'var(--icon-size)', flexShrink: 0 }} className="text-cme-blue" />
                  <a href="mailto:info@control-motion.de" className="fluid-small text-cme-dark hover:text-cme-blue transition-colors">
                    info@control-motion.de
                  </a>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="border-t border-gray-200" style={{ paddingTop: 'var(--space-gap-sm)' }}>
              <p className="fluid-xs uppercase tracking-wider text-gray-500" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                Zertifizierungen
              </p>
              <div className="flex flex-wrap gap-2">
                {['ISO 9001', 'ISO 14001', 'UL Wiring Harness'].map((cert) => (
                  <span
                    key={cert}
                    className="fluid-xs font-semibold px-3 py-1.5 border border-gray-200 rounded text-gray-600"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
