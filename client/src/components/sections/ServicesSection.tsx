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
    <div className={`py-16 lg:py-24 ${bgClass}`}>
      <div className="container">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
          {/* Image with diamond */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${reverse ? 'lg:order-2' : ''}`}
          >
            <div className="relative mx-auto w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]">
              {/* Accent diamond behind */}
              <div className="absolute -top-4 -left-4 w-[90px] sm:w-[110px] lg:w-[130px] diamond bg-cme-blue/[0.07]" />
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
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cme-blue/10 text-cme-blue">
                {icon}
              </div>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-cme-blue">
                0{index + 1}
              </span>
            </div>
            <h3 className={`text-2xl lg:text-3xl font-bold ${textColor} mb-4`}>{title}</h3>
            <p className={`${descColor} leading-relaxed mb-6`}>{desc}</p>
            <ul className="space-y-2.5">
              {items.map((item, i) => (
                <li key={i} className={`flex items-start gap-2.5 text-sm ${itemColor}`}>
                  <CheckCircle2 size={16} className="text-cme-blue mt-0.5 flex-shrink-0" />
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
      icon: <Cpu size={20} />,
      bgClass: 'bg-white',
    },
    {
      title: t.services.mfg_title,
      desc: t.services.mfg_desc,
      items: t.services.mfg_items,
      image: IMAGES.mfg,
      icon: <Factory size={20} />,
      bgClass: 'bg-cme-light',
    },
    {
      title: t.services.lifecycle_title,
      desc: t.services.lifecycle_desc,
      items: t.services.lifecycle_items,
      image: IMAGES.lifecycle,
      icon: <RefreshCw size={20} />,
      bgClass: 'bg-cme-dark',
      darkText: true,
    },
  ];

  return (
    <section id="services">
      {/* Section header */}
      <div className="bg-white pt-20 lg:pt-28 pb-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-cme-blue mb-3">
              Services
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-cme-dark mb-4">
              {t.services.headline}
            </h2>
            <p className="text-cme-gray max-w-2xl">
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
