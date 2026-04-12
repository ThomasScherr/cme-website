import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Kontakt() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t, img } = useContent('kontakt');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', subject: '', message: '' });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(form);
  };

  return (
    <Layout>
      <SubPageHero
        tagline={t('hero.tagline')}
        headline={t('hero.headline')}
        description={t('hero.description')}
        heroImage={img('hero.heroImage')}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
          <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors fluid-small">
            <Phone size={18} className="text-cme-accent" />
            {t('contact.phone')}
          </a>
          <a href={`mailto:${t('contact.email')}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors fluid-small">
            <Mail size={18} className="text-cme-accent" />
            {t('contact.email')}
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
                  {isDE ? 'Kontaktdaten' : 'Contact Details'}
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
                      <p className="font-medium text-cme-dark fluid-small">{t('contact.companyName')}</p>
                      <p className="text-gray-600 fluid-xs" style={{ marginTop: 'clamp(0.125rem, 0.05rem + 0.15vw, 0.25rem)' }}>
                        {t('contact.street')}<br />
                        {t('contact.zipCity')}<br />
                        {t('contact.country')}
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
                      <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`} className="text-gray-600 fluid-xs hover:text-cme-blue transition-colors">{t('contact.phone')}</a>
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
                      <a href={`mailto:${t('contact.emailInfo')}`} className="text-gray-600 fluid-xs hover:text-cme-blue transition-colors">{t('contact.emailInfo')}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl text-center fluid-card"
                  style={{ padding: 'var(--space-section-sm)' }}
                >
                  <CheckCircle className="text-green-500 mx-auto" style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }} />
                  <h3 className="fluid-h3 text-cme-dark">
                    {t('form.successTitle')}
                  </h3>
                  <p className="text-gray-600 fluid-body" style={{ marginTop: 'var(--space-gap-xs)' }}>
                    {t('form.successMessage')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-sm)' }}>
                  <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-sm)' }}>
                    <div>
                      <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                        {isDE ? 'Name' : 'Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small"
                        style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                        placeholder={isDE ? 'Ihr Name' : 'Your name'}
                      />
                    </div>
                    <div>
                      <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small"
                        style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                        placeholder={isDE ? 'ihre@email.de' : 'your@email.com'}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-sm)' }}>
                    <div>
                      <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                        {isDE ? 'Unternehmen' : 'Company'}
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small"
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
                        className="w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small"
                        style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                        placeholder={isDE ? '+49 ...' : '+49 ...'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                      {isDE ? 'Betreff' : 'Subject'} *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small bg-white"
                      style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                    >
                      <option value="">{isDE ? 'Bitte wählen...' : 'Please select...'}</option>
                      <option value="development">{t('form.subjectDevelopment')}</option>
                      <option value="manufacturing">{t('form.subjectManufacturing')}</option>
                      <option value="lifecycle">{t('form.subjectLifecycle')}</option>
                      <option value="general">{t('form.subjectGeneral')}</option>
                      <option value="career">{t('form.subjectCareer')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block fluid-xs font-medium text-cme-dark" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.375rem)' }}>
                      {isDE ? 'Nachricht' : 'Message'} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all fluid-small resize-none"
                      style={{ padding: 'var(--btn-py) var(--btn-px)' }}
                      placeholder={isDE ? 'Beschreiben Sie Ihr Projekt oder Ihre Anfrage...' : 'Describe your project or inquiry...'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors flex items-center gap-2 disabled:opacity-50 self-start fluid-btn"
                  >
                    {submitMutation.isPending ? (
                      <>{isDE ? 'Wird gesendet...' : 'Sending...'}</>
                    ) : (
                      <>
                        <Send size={18} />
                        {t('form.sendButton')}
                      </>
                    )}
                  </button>
                  {submitMutation.isError && (
                    <p className="text-red-500 fluid-xs">
                      {isDE ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' : 'Error sending. Please try again.'}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
