import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Combine, Radio, Thermometer, ShieldCheck, Award, Scaling } from 'lucide-react';

const THERMO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg';

const icons = [Combine, Radio, Thermometer, ShieldCheck, Award, Scaling];

export default function UspSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-cme-light">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-cme-dark mb-4">
            {t.usp.headline}
          </h2>
          <p className="text-cme-gray max-w-2xl mx-auto">
            {t.usp.sub}
          </p>
        </motion.div>

        {/* Featured image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-2xl overflow-hidden shadow-lg shadow-cme-blue/5"
        >
          <img
            src={THERMO_IMAGE}
            alt="Thermische Simulation"
            className="w-full h-[200px] sm:h-[280px] lg:h-[360px] object-cover"
          />
        </motion.div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.usp.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white p-6 rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-lg hover:shadow-cme-blue/5 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-cme-blue rounded-t-xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-cme-blue/10 text-cme-blue mb-4">
                  <Icon size={20} />
                </div>
                <h4 className="text-base font-semibold text-cme-dark mb-2">{item.title}</h4>
                <p className="text-sm text-cme-gray leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
