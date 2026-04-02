// CME Website – Contact Section
// Design Philosophy: Techno-Industrial Precision
// Contact form and company info side by side

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { MapPin, Phone, Mail } from 'lucide-react';

const viewport = { once: true, margin: '-80px' };

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
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

  return (
    <section id="contact" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Kontakt</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">{t.contact.headline}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{t.contact.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form – wider column */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder={t.contact.name + ' *'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-border/60 focus:border-primary"
              />
              <Input
                placeholder={t.contact.company}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="border-border/60 focus:border-primary"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder={t.contact.email + ' *'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-border/60 focus:border-primary"
              />
              <Input
                type="tel"
                placeholder={t.contact.phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-border/60 focus:border-primary"
              />
            </div>
            <Textarea
              placeholder={t.contact.message + ' *'}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              required
              className="border-border/60 focus:border-primary resize-none"
            />
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                className="mt-1 accent-primary"
                required
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                {t.contact.privacy}
              </label>
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
            >
              {t.contact.submit}
            </Button>
          </motion.form>

          {/* Contact Info – narrower column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl mb-6 font-bold">{t.contact.address_title}</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">CME Control Motion Electronics GmbH</p>
                    <p className="text-sm text-muted-foreground">Alter Hellweg 48</p>
                    <p className="text-sm text-muted-foreground">44379 Dortmund, Germany</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary flex-shrink-0" />
                  <a href="tel:+4923128667696" className="text-sm hover:text-primary transition-colors">
                    +49 231 28 66 76 96-0
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <a href="mailto:info@control-motion.de" className="text-sm hover:text-primary transition-colors">
                    info@control-motion.de
                  </a>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="border-t border-border pt-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Zertifizierungen</p>
              <div className="flex flex-wrap gap-2">
                {['ISO 9001', 'ISO 14001', 'ISO 26262', 'IATF 16949'].map((cert) => (
                  <span
                    key={cert}
                    className="text-xs font-medium px-3 py-1.5 border border-border text-muted-foreground"
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
