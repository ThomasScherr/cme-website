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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <BenefitsSection />
        <UspSection />
        <ProcessSection />
        <MarketsSection />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
