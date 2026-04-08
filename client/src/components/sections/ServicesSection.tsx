import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Cpu, Factory, RefreshCw, CheckCircle2 } from 'lucide-react';

const IMAGES = {
  dev: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg',
  mfg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_0425__1920px_178fc1eb.jpg',
  lifecycle: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg',
};

interface ServiceBlockProps {
  title: string;
  desc: string;
  items: readonly string[];
  image: string;
  icon: React.ReactNode;
  reverse?: boolean;
  index: number;
  bgClass?: string;
  darkText?: boolean;
}

function ServiceBlock({ title, desc, items, image, icon, reverse, index, bgClass = 'bg-white', darkText = false }: ServiceBlockProps) {
  const textColor = darkText ? 'text-white' : 'text-cme-dark';
  const descColor = darkText ? 'text-white/80' : 'text-cme-gray';
  const itemColor = darkText ? 'text-white/90' : 'text-cme-dark/80';

  return (
    <div className={`section-pad ${bgClass}`}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 'var(--space-gap-lg)' }}>
          {/* Image with diamond */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${reverse ? 'lg:order-2' : ''}`}
          >
            <div
              className="relative mx-auto"
              style={{
                width: 'clamp(15rem, 10rem + 10vw, 20rem)',
                height: 'clamp(15rem, 10rem + 10vw, 20rem)',
              }}
            >
              {/* Accent diamond behind */}
              <div
                className="absolute -top-4 -left-4 diamond bg-cme-blue/[0.07]"
                style={{ width: 'clamp(5.5rem, 3.5rem + 4vw, 8rem)' }}
              />
              {/* Main image diamond */}
              <div className="relative diamond w-full shadow-xl shadow-cme-blue/10">
                <img src={image} alt={title} />
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${reverse ? 'lg:order-1' : ''}`}
          >
            <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
              <div
                className="flex items-center justify-center rounded-lg bg-cme-blue/10 text-cme-blue"
                style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
              >
                {icon}
              </div>
              <span className="fluid-xs font-semibold tracking-[0.15em] uppercase text-cme-blue">
                0{index + 1}
              </span>
            </div>
            <h3 className={`fluid-h3 ${textColor}`} style={{ marginBottom: 'var(--space-gap-xs)' }}>{title}</h3>
            <p className={`${descColor} fluid-body-lg leading-relaxed`} style={{ marginBottom: 'var(--space-gap-sm)' }}>{desc}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.2rem + 0.5vw, 0.625rem)' }}>
              {items.map((item, i) => (
                <li key={i} className={`flex items-start fluid-small ${itemColor}`} style={{ gap: 'var(--space-gap-xs)' }}>
                  <CheckCircle2 style={{ width: 'var(--icon-size)', height: 'var(--icon-size)', flexShrink: 0, marginTop: '0.125rem' }} className="text-cme-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.dev_title,
      desc: t.services.dev_desc,
      items: t.services.dev_items,
      image: IMAGES.dev,
      icon: <Cpu style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} />,
      bgClass: 'bg-white',
    },
    {
      title: t.services.mfg_title,
      desc: t.services.mfg_desc,
      items: t.services.mfg_items,
      image: IMAGES.mfg,
      icon: <Factory style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} />,
      bgClass: 'bg-cme-light',
    },
    {
      title: t.services.lifecycle_title,
      desc: t.services.lifecycle_desc,
      items: t.services.lifecycle_items,
      image: IMAGES.lifecycle,
      icon: <RefreshCw style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} />,
      bgClass: 'bg-sky-50',
      darkText: false,
    },
  ];

  return (
    <section id="services">
      {/* Section header */}
      <div className="bg-white" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-gap-md)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="fluid-xs font-semibold tracking-[0.18em] uppercase text-cme-blue" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              Services
            </p>
            <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {t.services.headline}
            </h2>
            <p className="fluid-body-lg text-cme-gray max-w-2xl">
              {t.services.sub}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Service blocks */}
      {services.map((service, i) => (
        <ServiceBlock
          key={i}
          {...service}
          reverse={i % 2 === 1}
          index={i}
        />
      ))}
    </section>
  );
}
