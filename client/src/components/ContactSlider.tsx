import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';
const GF_IMAGE = `${CDN}/K5A0004_retouch_b2db17ab.jpg`;

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
        subject: isDE ? `Anfrage zu: ${topic}` : `Inquiry about: ${topic}`,
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
      // Prevent body scroll
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

  const inputClass = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-cme-blue focus:ring-1 focus:ring-cme-blue/30 outline-none transition-colors';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';

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
            className="fixed top-0 right-0 h-full w-full sm:w-[28rem] md:w-[32rem] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-cme-dark">
                {isDE ? 'Anfrage senden' : 'Send Inquiry'}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-cme-dark mb-2">
                    {isDE ? 'Vielen Dank!' : 'Thank you!'}
                  </h4>
                  <p className="text-gray-600 text-sm max-w-xs">
                    {isDE
                      ? 'Ihre Anfrage ist bei uns eingegangen. Wir melden uns zeitnah bei Ihnen.'
                      : 'Your inquiry has been received. We will get back to you shortly.'}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 rounded-lg bg-cme-blue text-white text-sm font-medium hover:bg-cme-blue/90 transition-colors"
                  >
                    {isDE ? 'Schließen' : 'Close'}
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* GF Image + personalized text */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <img
                        src={GF_IMAGE}
                        alt={isDE ? 'Geschäftsführung CME' : 'CME Management'}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {isDE
                          ? <>Ihre Fragen zu <strong className="text-cme-dark">{topic}</strong> beantworten wir Ihnen gerne persönlich.</>
                          : <>We are happy to answer your questions about <strong className="text-cme-dark">{topic}</strong> personally.</>
                        }
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {isDE
                          ? 'Geschäftsführung – CME Control Motion Electronics GmbH'
                          : 'Management – CME Control Motion Electronics GmbH'}
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>
                          {isDE ? 'Vorname' : 'First Name'} *
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
                          {isDE ? 'Nachname' : 'Last Name'} *
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
                        {isDE ? 'E-Mail-Adresse' : 'Email Address'} *
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
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>
                          {isDE ? 'Firma' : 'Company'} *
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
                          {isDE ? 'Telefon' : 'Phone'} <span className="text-gray-400 font-normal">({isDE ? 'optional' : 'optional'})</span>
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
                        className={inputClass}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>
                        {isDE ? 'Nachricht / Notizen' : 'Message / Notes'} <span className="text-gray-400 font-normal">({isDE ? 'optional' : 'optional'})</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={updateField('message')}
                        rows={3}
                        placeholder={isDE ? 'Beschreiben Sie kurz Ihr Anliegen...' : 'Briefly describe your request...'}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="w-full flex items-center justify-center gap-2 bg-cme-blue text-white rounded-lg py-3 font-semibold text-sm hover:bg-cme-blue/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {isDE ? 'Wird gesendet...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {isDE ? 'Anfrage senden' : 'Send Inquiry'}
                        </>
                      )}
                    </button>

                    {submitMutation.isError && (
                      <p className="text-red-500 text-xs text-center">
                        {isDE
                          ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
                          : 'Error sending. Please try again.'}
                      </p>
                    )}

                    <p className="text-xs text-gray-400 text-center">
                      {isDE
                        ? 'Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.'
                        : 'By submitting, you agree to our privacy policy.'}
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
