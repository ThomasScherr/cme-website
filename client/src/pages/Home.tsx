// CME Control Motion Electronics – Home Page
// Design Philosophy: Techno-Industrial Precision
// Sections: Hero, Stats, Services (3 pillars), Benefits, USPs, Process, Markets, Contact, Footer

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import UspSection from '@/components/sections/UspSection';
import ProcessSection from '@/components/sections/ProcessSection';
import MarketsSection from '@/components/sections/MarketsSection';
import TrustSection from '@/components/sections/TrustSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import ContactSlider from '@/components/ContactSlider';
import { useState } from 'react';

export default function Home() {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const [sliderSource, setSliderSource] = useState('homepage');

  const openSlider = (topic: string, source?: string) => {
    setSliderTopic(topic);
    setSliderSource(source || 'homepage');
    setSliderOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection onCardClick={(topic) => openSlider(topic, 'homepage-services')} />
        <BenefitsSection onCardClick={(topic) => openSlider(topic, 'homepage-benefits')} />
        <UspSection onCardClick={(topic) => openSlider(topic, 'homepage-usp')} />
        <ProcessSection onCardClick={(topic) => openSlider(topic, 'homepage-process')} />
        <MarketsSection onCardClick={(topic) => openSlider(topic, 'homepage-markets')} />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />

      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={sliderSource}
      />
    </div>
  );
}
