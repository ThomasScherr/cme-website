import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';

const vp = { once: true, margin: '-80px' as const };

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', message: '', privacy: false,
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success('Ihre Anfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen.');
      setFormData({ name: '', company: '', email: '', phone: '', message: '', privacy: false });
    },
    onError: (err) => toast.error(err.message || 'Fehler beim Senden. Bitte versuchen Sie es erneut.'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast.error('Bitte akzeptieren Sie die Datenschutzerklärung.');
      return;
    }
    submitMutation.mutate({
      name: formData.name,
      company: formData.company || undefined,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
      source: 'homepage',
    });
  };

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
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)' }}
          >
            <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-xs)' }}>
              <Input
                placeholder={t.contact.name + ' *'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="fluid-small"
              />
              <Input
                placeholder={t.contact.company}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="fluid-small"
              />
            </div>
            <div className="grid sm:grid-cols-2" style={{ gap: 'var(--space-gap-xs)' }}>
              <Input
                type="email"
                placeholder={t.contact.email + ' *'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="fluid-small"
              />
              <Input
                type="tel"
                placeholder={t.contact.phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="fluid-small"
              />
            </div>
            <Textarea
              placeholder={t.contact.message + ' *'}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              required
              className="resize-none fluid-small"
            />
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                className="mt-1 accent-cme-blue"
                required
              />
              <label htmlFor="privacy" className="fluid-xs text-gray-500 cursor-pointer leading-relaxed">
                {t.contact.privacy}
              </label>
            </div>
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
