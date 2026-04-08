import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Calendar, FolderCheck, Shield, MapPin } from 'lucide-react';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { icon: Calendar, value: 15, suffix: '+', label: t.stats.years },
    { icon: FolderCheck, value: 500, suffix: '+', label: t.stats.projects },
    { icon: Shield, value: 0, suffix: '', label: t.stats.standards, displayValue: t.stats.standards_val },
    { icon: MapPin, value: 0, suffix: '', label: t.stats.location, displayValue: t.stats.location_val },
  ];

  return (
    <section className="section-pad-sm bg-cme-light border-y border-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-md)' }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="inline-flex items-center justify-center rounded-xl bg-cme-blue/10 text-cme-blue"
                  style={{
                    width: 'var(--icon-box)',
                    height: 'var(--icon-box)',
                    marginBottom: 'var(--space-gap-xs)',
                  }}
                >
                  <Icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} />
                </div>
                <div className="fluid-h2 text-cme-dark mb-1">
                  {stat.displayValue ? (
                    stat.displayValue
                  ) : (
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="fluid-small text-cme-gray">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
