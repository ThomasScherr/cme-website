import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Kontakt() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
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
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-cme-blue text-sm font-semibold tracking-widest uppercase">
              {isDE ? 'Kontakt' : 'Contact'}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-cme-dark mt-4 leading-tight">
              {isDE ? 'Sprechen Sie mit uns.' : 'Talk to us.'}
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              {isDE
                ? 'Ob Projektanfrage, technische Frage oder Besuch in Dortmund – wir freuen uns auf Ihre Nachricht.'
                : 'Whether project inquiry, technical question or visit in Dortmund – we look forward to your message.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-cme-dark mb-6">
                  {isDE ? 'Kontaktdaten' : 'Contact Details'}
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cme-blue-light flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-cme-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-cme-dark">CME Control Motion Electronics GmbH</p>
                      <p className="text-gray-600 text-sm mt-1">Hauert 10<br />44227 Dortmund<br />{isDE ? 'Deutschland' : 'Germany'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cme-blue-light flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-cme-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-cme-dark">{isDE ? 'Telefon' : 'Phone'}</p>
                      <a href="tel:+492319799700" className="text-gray-600 text-sm hover:text-cme-blue transition-colors">+49 231 979 970-0</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cme-blue-light flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-cme-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-cme-dark">E-Mail</p>
                      <a href="mailto:info@control-motion.de" className="text-gray-600 text-sm hover:text-cme-blue transition-colors">info@control-motion.de</a>
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
                  className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center"
                >
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-cme-dark">
                    {isDE ? 'Vielen Dank!' : 'Thank you!'}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {isDE
                      ? 'Ihre Nachricht ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
                      : 'Your message has been received. We will get back to you within 24 hours.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-cme-dark mb-1.5">
                        {isDE ? 'Name' : 'Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all text-sm"
                        placeholder={isDE ? 'Ihr Name' : 'Your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cme-dark mb-1.5">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all text-sm"
                        placeholder={isDE ? 'ihre@email.de' : 'your@email.com'}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-cme-dark mb-1.5">
                        {isDE ? 'Unternehmen' : 'Company'}
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all text-sm"
                        placeholder={isDE ? 'Ihr Unternehmen' : 'Your company'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cme-dark mb-1.5">
                        {isDE ? 'Telefon' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all text-sm"
                        placeholder={isDE ? '+49 ...' : '+49 ...'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cme-dark mb-1.5">
                      {isDE ? 'Betreff' : 'Subject'} *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">{isDE ? 'Bitte wählen...' : 'Please select...'}</option>
                      <option value="development">{isDE ? 'Entwicklungsprojekt' : 'Development Project'}</option>
                      <option value="manufacturing">{isDE ? 'Fertigungsanfrage' : 'Manufacturing Inquiry'}</option>
                      <option value="lifecycle">{isDE ? 'Lifecycle Services' : 'Lifecycle Services'}</option>
                      <option value="general">{isDE ? 'Allgemeine Anfrage' : 'General Inquiry'}</option>
                      <option value="career">{isDE ? 'Karriere / Bewerbung' : 'Career / Application'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cme-dark mb-1.5">
                      {isDE ? 'Nachricht' : 'Message'} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all text-sm resize-none"
                      placeholder={isDE ? 'Beschreiben Sie Ihr Projekt oder Ihre Anfrage...' : 'Describe your project or inquiry...'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="bg-cme-blue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitMutation.isPending ? (
                      <>{isDE ? 'Wird gesendet...' : 'Sending...'}</>
                    ) : (
                      <>
                        <Send size={18} />
                        {isDE ? 'Nachricht senden' : 'Send Message'}
                      </>
                    )}
                  </button>
                  {submitMutation.isError && (
                    <p className="text-red-500 text-sm">
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
