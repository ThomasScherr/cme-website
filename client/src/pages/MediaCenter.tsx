import { Download, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

const DOWNLOADS = [
  {
    label: 'Logo RGB horizontal',
    description: 'Für digitale Medien (PNG)',
    previewUrl: '/manus-storage/CME_Logo_RGB_R_f491fb76.png',
    downloadUrl: '/manus-storage/CME_Logo_RGB_R_f491fb76.png',
    filename: 'CME_Logo_RGB_R.png',
    hasPreview: true,
  },
  {
    label: 'Logo RGB horizontal',
    description: 'Vektordatei (EPS)',
    previewUrl: '/manus-storage/CME_Logo_RGB_R_f491fb76.png',
    downloadUrl: '/manus-storage/CME_Logo_RGB_R_f5eaab72.eps',
    filename: 'CME_Logo_RGB_R.eps',
    hasPreview: true,
  },
  {
    label: 'Logo CMYK horizontal',
    description: 'Für Druckmedien, weiße Schrift (PNG)',
    previewUrl: '/manus-storage/CME_Logo_CMYK_R_5eca81b3.png',
    downloadUrl: '/manus-storage/CME_Logo_CMYK_R_5eca81b3.png',
    filename: 'CME_Logo_CMYK_R.png',
    hasPreview: true,
    darkBg: true,
  },
  {
    label: 'Logo RGB zentriert',
    description: 'Für digitale Medien (PNG)',
    previewUrl: '/manus-storage/CME_Logo_RGB_C_7c6c92fe.png',
    downloadUrl: '/manus-storage/CME_Logo_RGB_C_7c6c92fe.png',
    filename: 'CME_Logo_RGB_C.png',
    hasPreview: true,
  },
  {
    label: 'Logo RGB zentriert',
    description: 'Vektordatei (EPS)',
    previewUrl: '/manus-storage/CME_Logo_RGB_C_7c6c92fe.png',
    downloadUrl: '/manus-storage/CME_Logo_RGB_C_6f72d7ef.eps',
    filename: 'CME_Logo_RGB_C.eps',
    hasPreview: true,
  },
  {
    label: 'Logo CMYK zentriert',
    description: 'Vektordatei (EPS)',
    previewUrl: '/manus-storage/CME_Logo_RGB_C_7c6c92fe.png',
    downloadUrl: '/manus-storage/CME_Logo_CMYK_C_81cdc5d5.eps',
    filename: 'CME_Logo_CMYK_C.eps',
    hasPreview: true,
  },
  {
    label: 'Teamfoto',
    description: 'v.l.: Steffen Katzer, Matthias Markmann',
    previewUrl: '/manus-storage/CME_Teamfoto_Katzer_Markmann_395b2cb7.png',
    downloadUrl: '/manus-storage/CME_Teamfoto_Katzer_Markmann_395b2cb7.png',
    filename: 'CME_Teamfoto_Katzer_Markmann.png',
    hasPreview: true,
  },
];

export default function MediaCenter() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <img
            src="/manus-storage/CME_Logo_RGB_R_f491fb76.png"
            alt="CME Control Motion Electronics"
            className="h-10"
          />
          <span className="text-sm text-gray-500 font-medium">Media Center</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Section 1: Mitgliederprofil */}
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#0094c9] uppercase tracking-wider mb-2">
              Mitgliederprofil Gesundheitswirtschaft Südwestfalen
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              CME Control Motion Electronics GmbH
            </h1>
            <p className="text-xl text-[#0094c9] font-medium mb-6">
              Leistungselektronik, die auch morgen noch lieferbar ist.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              Leistungselektronik &amp; Mechatronik
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              Simulation &amp; Systemarchitektur
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              Electronic Manufacturing Services (EMS)
            </span>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Die CME Control Motion Electronics GmbH ist ein erfahrener Entwicklungsdienstleister und Fertigungspartner für anspruchsvolle elektronische Systeme. Von der ersten Idee bis zur stabilen Serienfertigung bietet CME umfassende Expertise in den Bereichen Hardware, Software, Simulation, UX/UI und Design-for-Manufacturing aus einer Hand.
            </p>
            <p>
              Insbesondere für die Gesundheitswirtschaft und Medizintechnik entwickelt CME robuste, langlebige und qualitätskritische Lösungen. Ein besonderer Fokus liegt auf der Leistungselektronik, Antriebselektronik (Motor Control) sowie thermisch anspruchsvollen Projekten. Durch den konsequenten Einsatz von elektrischer und thermischer Simulation werden Schwachstellen frühzeitig identifiziert, Entwicklungsrisiken minimiert und eine hohe Zuverlässigkeit im späteren Serieneinsatz garantiert.
            </p>
            <p>
              CME zeichnet sich durch eine hohe Flexibilität im Entwicklungs- und Produktionsmodell aus: Kunden haben die freie Wahl, ob CME sowohl entwickelt als auch im hauseigenen EMS produziert, oder ob die Serienfertigung bei einem Partner der Wahl stattfindet. In jedem Fall begleitet CME den Serienanlauf und sichert mit strukturierten, auditierbaren Prozessen höchste Qualitätsstandards (zertifiziert nach ISO 9001 &amp; 14001). Ergänzt wird das Portfolio durch umfassende Lifecycle Services, einschließlich Obsoleszenzmanagement und Re-Design, um die langfristige Verfügbarkeit wichtiger Medizintechnik-Baugruppen sicherzustellen.
            </p>
          </div>
        </section>

        {/* Section 2: Kontakt */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b border-gray-200">
            Kontakt
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Steffen Katzer */}
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="font-bold text-gray-900 text-lg">Steffen Katzer</p>
              <p className="text-gray-600 text-sm mb-3">Dipl.-Ing. (FH) – Gesellschafter / Geschäftsführer</p>
              <a
                href="mailto:s.katzer@control-motion.de"
                className="flex items-center gap-2 text-[#0094c9] hover:underline text-sm"
              >
                <Mail className="w-4 h-4" />
                s.katzer@control-motion.de
              </a>
            </div>
            {/* Matthias Markmann */}
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="font-bold text-gray-900 text-lg">Matthias Markmann</p>
              <p className="text-gray-600 text-sm mb-3">Dipl.-Ing. (FH) – Gesellschafter / Geschäftsführer</p>
              <a
                href="mailto:m.markmann@control-motion.de"
                className="flex items-center gap-2 text-[#0094c9] hover:underline text-sm"
              >
                <Mail className="w-4 h-4" />
                m.markmann@control-motion.de
              </a>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#0094c9]" />
              <a href="tel:+4923128667696-0" className="hover:text-[#0094c9]">
                +49 231 28 66 76 96-0
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#0094c9]" />
              <span>Alter Hellweg 48, 44379 Dortmund</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#0094c9]" />
              <a
                href="https://control-motion.de"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0094c9] flex items-center gap-1"
              >
                control-motion.de
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Section 3: Downloads */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b border-gray-200">
            Downloads
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOWNLOADS.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Preview */}
                {item.hasPreview && (
                  <div
                    className={`h-36 flex items-center justify-center p-4 ${
                      item.darkBg ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <img
                      src={item.previewUrl}
                      alt={item.label}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                {/* Info + Download */}
                <div className="p-4">
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs mb-3">{item.description}</p>
                  <a
                    href={item.downloadUrl}
                    download={item.filename}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0094c9] text-white text-sm font-medium rounded-lg hover:bg-[#007aa8] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-400">
            Diese Seite ist nicht öffentlich verlinkt. Sie dient als Übergabedokument für Presse, Partner und Verbände.
          </p>
        </div>
      </footer>
    </div>
  );
}
