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
import SEO, { organizationSchema, websiteSchema, localBusinessSchema, buildFAQSchema, buildServiceSchema } from '@/components/SEO';

const homeFaqsDE = buildFAQSchema([
  {
    question: 'Was bietet CME als Entwicklungsdienstleister?',
    answer: 'CME bietet ganzheitliche Elektronikentwicklung von der Konzeptphase bis zur Serienreife: Hardware- und Softwareentwicklung, Leistungselektronik, Antriebselektronik, E-Motor-Design, Simulation, EMV-Validierung und Test nach V-Modell.',
  },
  {
    question: 'Welche EMS-Fertigungsleistungen bietet CME?',
    answer: 'CME fertigt elektronische Baugruppen vom Prototyp bis zur Serie: SMD- und THT-Bestückung, Selektivlöten, Dampfphasenlöten, AOI und Röntgeninspektion, Verguss, Conformal Coating und Kabelkonfektionierung – alles nach IPC-Standards.',
  },
  {
    question: 'Für welche Branchen arbeitet CME?',
    answer: 'CME bedient Automotive und E-Mobilität, Industrieautomation, Medizintechnik, Energietechnik, Luft- und Raumfahrt sowie Sicherheitstechnik. Das Unternehmen ist IATF 16949 zertifiziert für Automotive-Projekte.',
  },
  {
    question: 'Wo befindet sich CME?',
    answer: 'CME Control Motion Electronics GmbH hat seinen Sitz in Dortmund, Deutschland. Von dort werden Kunden in ganz Europa betreut.',
  },
  {
    question: 'Kann CME sowohl Prototypen als auch Serienproduktion übernehmen?',
    answer: 'Ja, CME bietet flexible Losgrößen vom Einzelprototyp bis zur Serienfertigung. Entwicklung und Fertigung unter einem Dach ermöglichen einen nahtlosen Übergang vom Prototyp zur Serie.',
  },
]);

const homeServicesSchema = buildServiceSchema([
  { name: 'Elektronikentwicklung', description: 'Hardware- und Softwareentwicklung für Leistungselektronik, Antriebselektronik und Mechatronik', url: '/entwicklung' },
  { name: 'EMS-Fertigung', description: 'Elektronikfertigung vom Prototyp bis zur Serie: SMD-Bestückung, Baugruppenfertigung, Qualitätssicherung', url: '/fertigung' },
  { name: 'Lifecycle Management', description: 'Obsoleszenz-Management, Redesign, Reparatur und Ersatzteilmanagement', url: '/lifecycle' },
]);

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
      <SEO
        titleDE='CME Control Motion Electronics GmbH'
        titleEN='CME Control Motion Electronics GmbH'
        descriptionDE='CME Control Motion Electronics – Ihr Partner für Elektronikentwicklung & EMS-Fertigung in Dortmund. ISO 9001 zertifiziert. Über 15 Jahre Erfahrung. Jetzt Anfrage stellen.'
        descriptionEN='CME Control Motion Electronics – Your partner for electronics development & EMS manufacturing in Dortmund. ISO 9001 certified. Over 15 years of experience.'
        keywordsDE='Elektronikentwicklung, EMS-Fertigung, Leistungselektronik, Antriebselektronik, Elektronikfertigung Dortmund, thermisches Management'
        keywordsEN='electronics development, EMS manufacturing, power electronics, drive electronics, PCB assembly Dortmund, thermal management'
        path='/'
        enPath='/en/'
        additionalSchemas={[organizationSchema, websiteSchema, localBusinessSchema, homeFaqsDE, ...homeServicesSchema]}
        rawTitle
      />
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
