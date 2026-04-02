// CME Website – Contact Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { MapPin, Phone, Mail } from 'lucide-react';

const vp = { once: true, margin: '-80px' };

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', message: '', privacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast.error('Bitte akzeptieren Sie die Datenschutzerklärung.');
      return;
    }
    toast.success('Ihre Anfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen.');
    setFormData({ name: '', company: '', email: '', phone: '', message: '', privacy: false });
  };

  const sectionPad = 'clamp(3rem, 5vw + 1rem, 9rem)';
  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  return (
    <section
      id="contact"
      style={{ paddingTop: sectionPad, paddingBottom: sectionPad, background: 'oklch(0.97 0.001 240)' }}
    >
      <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'clamp(2rem, 4vw, 5rem)' }}
        >
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'oklch(0.62 0.14 230)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Kontakt
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.contact.headline}</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'oklch(0.45 0.01 240)', maxWidth: 'clamp(280px, 40vw, 700px)' }}>{t.contact.sub}</p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2rem, 5vw, 6rem)',
          }}
        >
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
              <Input
                placeholder={t.contact.name + ' *'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ fontSize: 'var(--text-sm)' }}
              />
              <Input
                placeholder={t.contact.company}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
              <Input
                type="email"
                placeholder={t.contact.email + ' *'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ fontSize: 'var(--text-sm)' }}
              />
              <Input
                type="tel"
                placeholder={t.contact.phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
            <Textarea
              placeholder={t.contact.message + ' *'}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              required
              className="resize-none"
              style={{ fontSize: 'var(--text-sm)' }}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="privacy"
                checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                className="mt-1 accent-primary"
                required
              />
              <label htmlFor="privacy" style={{ fontSize: 'var(--text-xs)', color: 'oklch(0.45 0.01 240)', cursor: 'pointer', lineHeight: 1.55 }}>
                {t.contact.privacy}
              </label>
            </div>
            <Button
              type="submit"
              style={{
                background: 'oklch(0.62 0.14 230)',
                color: '#fff',
                fontSize: 'var(--text-sm)',
                padding: 'clamp(0.6rem, 1vw, 0.9rem) clamp(1.5rem, 3vw, 2.5rem)',
                alignSelf: 'flex-start',
              }}
              className="hover:bg-primary/90 shadow-md transition-all"
            >
              {t.contact.submit}
            </Button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 3rem)' }}
          >
            <div>
              <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'clamp(1rem, 2vw, 1.75rem)' }}>{t.contact.address_title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={18} style={{ color: 'oklch(0.62 0.14 230)', marginTop: '0.1rem', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>CME Control Motion Electronics GmbH</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'oklch(0.45 0.01 240)' }}>Alter Hellweg 48</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'oklch(0.45 0.01 240)' }}>44379 Dortmund, Germany</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={18} style={{ color: 'oklch(0.62 0.14 230)', flexShrink: 0 }} />
                  <a href="tel:+4923128667696" style={{ fontSize: 'var(--text-sm)', color: 'oklch(0.25 0.01 240)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'oklch(0.62 0.14 230)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'oklch(0.25 0.01 240)')}>
                    +49 231 28 66 76 96-0
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} style={{ color: 'oklch(0.62 0.14 230)', flexShrink: 0 }} />
                  <a href="mailto:info@control-motion.de" style={{ fontSize: 'var(--text-sm)', color: 'oklch(0.25 0.01 240)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'oklch(0.62 0.14 230)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'oklch(0.25 0.01 240)')}>
                    info@control-motion.de
                  </a>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div style={{ borderTop: '1px solid oklch(0.88 0.005 240)', paddingTop: 'clamp(1rem, 2vw, 1.75rem)' }}>
              <p style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'oklch(0.55 0.01 240)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                Zertifizierungen
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['ISO 9001', 'ISO 14001', 'ISO 26262', 'IATF 16949'].map((cert) => (
                  <span
                    key={cert}
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      padding: '0.3em 0.75em',
                      border: '1px solid oklch(0.88 0.005 240)',
                      color: 'oklch(0.45 0.01 240)',
                    }}
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
