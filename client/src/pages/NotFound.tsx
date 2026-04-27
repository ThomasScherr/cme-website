import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { lang } = useLanguage();
  const isDE = lang === "de";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>{isDE ? "Seite nicht gefunden" : "Page Not Found"} | CME</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={
            isDE
              ? "Die angeforderte Seite wurde nicht gefunden. Nutzen Sie die Navigation oder kehren Sie zur Startseite zurück."
              : "The requested page was not found. Use the navigation or return to the homepage."
          }
        />
      </Helmet>

      <Navigation />

      <main className="flex-1 flex items-center justify-center py-20 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          {/* Large 404 number */}
          <div className="relative mb-8">
            <span className="text-[10rem] md:text-[14rem] font-bold leading-none text-slate-100 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 md:w-20 md:h-20 text-[#009FE3] opacity-60" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {isDE ? "Seite nicht gefunden" : "Page Not Found"}
          </h1>

          <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-md mx-auto">
            {isDE
              ? "Die angeforderte Seite existiert leider nicht. Möglicherweise wurde sie verschoben oder gelöscht."
              : "Sorry, the page you are looking for doesn't exist. It may have been moved or deleted."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/")}
              className="bg-[#009FE3] hover:bg-[#0080b8] text-white px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-base"
            >
              <Home className="w-4 h-4 mr-2" />
              {isDE ? "Zur Startseite" : "Go Home"}
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-lg transition-all duration-200 text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isDE ? "Zurück" : "Go Back"}
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-14 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">
              {isDE ? "Beliebte Seiten:" : "Popular pages:"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/entwicklung", label: isDE ? "Entwicklung" : "Development" },
                { href: "/fertigung", label: isDE ? "Fertigung" : "Manufacturing" },
                { href: "/kontakt", label: isDE ? "Kontakt" : "Contact" },
                { href: "/maerkte", label: isDE ? "Märkte" : "Markets" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => setLocation(link.href)}
                  className="text-sm text-[#009FE3] hover:text-[#0080b8] hover:underline transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
