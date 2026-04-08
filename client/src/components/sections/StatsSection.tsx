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
    { icon: Calendar, value: 25, suffix: '+', label: t.stats.years },
    { icon: FolderCheck, value: 500, suffix: '+', label: t.stats.projects },
    { icon: Shield, value: 0, suffix: '', label: t.stats.standards, displayValue: t.stats.standards_val },
    { icon: MapPin, value: 0, suffix: '', label: t.stats.location, displayValue: t.stats.location_val },
  ];

  return (
    <section className="py-16 bg-cme-light border-y border-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cme-blue/10 text-cme-blue mb-4">
                  <Icon size={22} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-cme-dark mb-1">
                  {stat.displayValue ? (
                    stat.displayValue
                  ) : (
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-sm text-cme-gray">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
