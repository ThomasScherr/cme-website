import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FaqItem {
  question: string;
  questionEN?: string;
  answer: string;
  answerEN?: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Was bietet CME als Entwicklungsdienstleister?',
    questionEN: 'What does CME offer as a development service provider?',
    answer: 'CME bietet ganzheitliche Elektronikentwicklung von der Konzeptphase bis zur Serienreife: Hardware- und Softwareentwicklung, Leistungselektronik, Antriebselektronik, E-Motor-Design, Simulation, EMV-Validierung und Test nach V-Modell.',
    answerEN: 'CME offers comprehensive electronics development from concept to series production: hardware and software development, power electronics, drive electronics, e-motor design, simulation, EMC validation, and testing according to the V-model.',
  },
  {
    question: 'Welche EMS-Fertigungsleistungen bietet CME?',
    questionEN: 'What EMS manufacturing services does CME offer?',
    answer: 'CME fertigt elektronische Baugruppen vom Prototyp bis zur Serie: SMD- und THT-Bestückung, Selektivlöten, Dampfphasenlöten, AOI-Inspektion, Verguss, Conformal Coating und Kabelkonfektionierung – alles nach IPC-Standards.',
    answerEN: 'CME manufactures electronic assemblies from prototype to series: SMD and THT assembly, selective soldering, vapor phase soldering, AOI inspection, potting, conformal coating, and cable assembly – all according to IPC standards.',
  },
  {
    question: 'Für welche Branchen arbeitet CME?',
    questionEN: 'Which industries does CME serve?',
    answer: 'CME bedient Automotive und E-Mobilität, Industrieautomation, Medizintechnik, Gebäudetechnik, Antriebstechnik sowie Smart Devices. Das Unternehmen arbeitet nach Automotive Ready Standards für Automotive-Projekte.',
    answerEN: 'CME serves automotive and e-mobility, industrial automation, medical technology, building technology, drive technology, and smart devices. The company works according to Automotive Ready Standards for automotive projects.',
  },
  {
    question: 'Was unterscheidet CME von anderen EMS-Dienstleistern?',
    questionEN: 'What distinguishes CME from other EMS providers?',
    answer: 'CME vereint Entwicklung und Fertigung unter einem Dach. Das bedeutet: kürzere Iterationszyklen, nahtlose Übergabe vom Prototyp zur Serie und ein Ansprechpartner für das gesamte Projekt – von der Schaltungsentwicklung bis zur Serienlieferung.',
    answerEN: 'CME combines development and manufacturing under one roof. This means: shorter iteration cycles, seamless transition from prototype to series, and a single point of contact for the entire project – from circuit design to series delivery.',
  },
  {
    question: 'Kann CME sowohl Prototypen als auch Serienproduktion übernehmen?',
    questionEN: 'Can CME handle both prototypes and series production?',
    answer: 'Ja, CME bietet flexible Losgrößen vom Einzelprototyp bis zur Serienfertigung. Entwicklung und Fertigung unter einem Dach ermöglichen einen nahtlosen Übergang vom Prototyp zur Serie ohne Informationsverlust.',
    answerEN: 'Yes, CME offers flexible batch sizes from single prototypes to series production. Development and manufacturing under one roof enable a seamless transition from prototype to series without information loss.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-[var(--space-section)] bg-white">
      <div className="container max-w-4xl">
        <FadeIn>
          <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-gap-md)' }}>
            {isDE ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-cme-accent/50"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="fluid-body font-medium text-cme-dark pr-4">
                    {isDE ? faq.question : (faq.questionEN || faq.question)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cme-accent flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 pt-1">
                    <p className="fluid-small text-gray-600 leading-relaxed">
                      {isDE ? faq.answer : (faq.answerEN || faq.answer)}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
