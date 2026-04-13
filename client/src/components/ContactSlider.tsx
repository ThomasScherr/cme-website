import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const GF_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/cms/media/1776035923976-ac815377bcb7b679.jpg';

interface ContactSliderProps {
  isOpen: boolean;
  onClose: () => void;
  /** The topic/title of the clicked card – used to personalize the message */
  topic: string;
  /** Optional page context for the source field */
  pageSource?: string;
}

export default function ContactSlider({ isOpen, onClose, topic, pageSource }: ContactSliderProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Pre-fill subject with topic when slider opens
  useEffect(() => {
    if (isOpen && topic) {
      setForm(prev => ({
        ...prev,
        subject: isDE ? `Anfrage: ${topic}` : `Inquiry: ${topic}`,
      }));
      setSubmitted(false);
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

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      company: form.company || undefined,
      phone: form.phone || undefined,
      message: form.subject ? `[${form.subject}]\n\n${form.message}` : form.message,
      source: pageSource || 'contact-slider',
    });
  }, [form, submitMutation, pageSource]);

  const updateField = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

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
            {/* Close button – floating top right */}
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
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h4 className="text-2xl font-semibold text-cme-dark mb-3">
                    {isDE ? 'Vielen Dank für Ihre Anfrage!' : 'Thank you for your inquiry!'}
                  </h4>
                  <p className="text-base text-gray-600 max-w-sm leading-relaxed">
                    {isDE
                      ? 'Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.'
                      : 'We have received your message and will get back to you within 24 hours.'}
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
                    {/* GF Photo – prominent */}
                    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md mb-6">
                      <img
                        src={GF_IMAGE}
                        alt={isDE ? 'Geschäftsführung CME' : 'CME Management'}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Customer-centric headline */}
                    <h3 className="text-xl font-bold text-cme-dark leading-snug mb-2">
                      {isDE
                        ? <>Lassen Sie uns über <span className="text-cme-blue">{topic}</span> sprechen.</>
                        : <>Let's talk about <span className="text-cme-blue">{topic}</span>.</>
                      }
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {isDE
                        ? 'Beschreiben Sie uns kurz Ihr Projekt – wir prüfen die Machbarkeit und melden uns persönlich bei Ihnen.'
                        : 'Briefly describe your project – we will evaluate feasibility and get back to you personally.'}
                    </p>
                  </div>

                  {/* Form area */}
                  <div className="px-8 pb-8 pt-2">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {isDE ? 'Vorname' : 'First name'} <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.firstName}
                            onChange={updateField('firstName')}
                            placeholder={isDE ? 'Max' : 'John'}
                            className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {isDE ? 'Nachname' : 'Last name'} <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.lastName}
                            onChange={updateField('lastName')}
                            placeholder={isDE ? 'Mustermann' : 'Doe'}
                            className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isDE ? 'Geschäftliche E-Mail' : 'Work email'} <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={updateField('email')}
                          placeholder={isDE ? 'max@firma.de' : 'john@company.com'}
                          className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all"
                        />
                      </div>

                      {/* Company + Phone row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {isDE ? 'Unternehmen' : 'Company'} <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.company}
                            onChange={updateField('company')}
                            placeholder={isDE ? 'Firma GmbH' : 'Company Inc.'}
                            className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {isDE ? 'Telefon' : 'Phone'} <span className="text-gray-400 font-normal text-xs">({isDE ? 'optional' : 'optional'})</span>
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={updateField('phone')}
                            placeholder="+49 ..."
                            className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Subject (pre-filled, read-only look) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isDE ? 'Betreff' : 'Subject'}
                        </label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={updateField('subject')}
                          className="w-full h-11 rounded-lg border border-gray-300 bg-gray-50 px-3.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 outline-none transition-all"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isDE ? 'Projektbeschreibung' : 'Project description'} <span className="text-gray-400 font-normal text-xs">({isDE ? 'optional' : 'optional'})</span>
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

                      {/* Submit button – prominent */}
                      <button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="w-full flex items-center justify-center gap-2.5 bg-cme-blue text-white rounded-lg h-12 font-semibold text-base hover:bg-cme-blue/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                      >
                        {submitMutation.isPending ? (
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

                      {submitMutation.isError && (
                        <p className="text-red-500 text-sm text-center">
                          {isDE
                            ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
                            : 'Error sending. Please try again.'}
                        </p>
                      )}

                      <p className="text-xs text-gray-400 text-center leading-relaxed">
                        {isDE
                          ? <>Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="underline hover:text-gray-600 transition-colors">Datenschutzerklärung</a> zu.</>
                          : <>By submitting, you agree to our <a href="/datenschutz" className="underline hover:text-gray-600 transition-colors">privacy policy</a>.</>
                        }
                      </p>
                    </form>
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
