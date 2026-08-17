import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { lazy, Suspense, type ComponentType, type ReactElement } from "react";
import { DE_TO_EN, DYNAMIC_ROUTE_PAIRS } from "@shared/routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ConsentProvider } from "./contexts/ConsentContext";
import CookieConsent from "./components/CookieConsent";
import TrackingProvider from "./components/TrackingProvider";
import { LanguageProvider } from "./contexts/LanguageContext";
import { StyleProvider } from "./contexts/StyleContext";
import LegacyRedirects from "./components/LegacyRedirects";
import Home from "./pages/Home";

// Lazy-load pages for better performance
const Entwicklung = lazy(() => import("./pages/Entwicklung"));
const HardwareSoftware = lazy(() => import("./pages/entwicklung/HardwareSoftware"));
const Simulation = lazy(() => import("./pages/entwicklung/Simulation"));
const TestVerifikation = lazy(() => import("./pages/entwicklung/TestVerifikation"));
const UxInterfaceEngineering = lazy(() => import("./pages/entwicklung/UxInterfaceEngineering"));
const SoftwareDigitaleSysteme = lazy(() => import("./pages/entwicklung/SoftwareDigitaleSysteme"));
const EMotorDesign = lazy(() => import("./pages/entwicklung/EMotorDesign"));
const ControlDesign = lazy(() => import("./pages/entwicklung/ControlDesign"));
const ValidierungEmv = lazy(() => import("./pages/entwicklung/ValidierungEmv"));
const KiEntwicklung = lazy(() => import("./pages/entwicklung/KiEntwicklung"));

const Fertigung = lazy(() => import("./pages/Fertigung"));
const Leiterplatten = lazy(() => import("./pages/fertigung/Leiterplatten"));
const Baugruppen = lazy(() => import("./pages/fertigung/Baugruppen"));
const Qualitaet = lazy(() => import("./pages/fertigung/Qualitaet"));
const SmdBestueckung = lazy(() => import("./pages/fertigung/SmdBestueckung"));
const Prototypen = lazy(() => import("./pages/fertigung/Prototypen"));

const Lifecycle = lazy(() => import("./pages/Lifecycle"));
const Maerkte = lazy(() => import("./pages/Maerkte"));
const Unternehmen = lazy(() => import("./pages/Unternehmen"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Karriere = lazy(() => import("./pages/Karriere"));

const Impressum = lazy(() => import("./pages/legal/Impressum"));
const Datenschutz = lazy(() => import("./pages/legal/Datenschutz"));
const AGB = lazy(() => import("./pages/legal/AGB"));

const LandingElektronikentwicklung = lazy(() => import("./pages/LandingElektronikentwicklung"));
const Insights = lazy(() => import("./pages/Insights"));
const LandingMuenchen = lazy(() => import("./pages/LandingMuenchen"));
const InsightArticle = lazy(() => import("./pages/InsightArticle"));
const InsightsAdmin = lazy(() => import("./pages/admin/InsightsAdmin"));
const StylesheetEditor = lazy(() => import("./pages/admin/StylesheetEditor"));
const InsightPreview = lazy(() => import("./pages/admin/InsightPreview"));
const ContentManager = lazy(() => import("./pages/admin/ContentManager"));
const AuthorsAdmin = lazy(() => import("./pages/admin/AuthorsAdmin"));
const MediaCenter = lazy(() => import("./pages/MediaCenter"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const JobsAdmin = lazy(() => import("./pages/admin/JobsAdmin"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cme-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * Zweisprachige Seiten. Der deutsche Pfad steht hier, der englische kommt aus
 * shared/routes.ts – dieselbe Zuordnung, die auch die SEO-Daten und der
 * Sprachumschalter benutzen. Beide Pfade zeigen auf dieselbe Komponente; die
 * Sprache ergibt sich aus der URL (siehe LanguageContext).
 */
const BILINGUAL_ROUTES: Array<[string, ComponentType<any>]> = [
  ["/", Home],

  ["/entwicklung", Entwicklung],
  ["/entwicklung/hardware-software", HardwareSoftware],
  ["/entwicklung/simulation", Simulation],
  ["/entwicklung/test-verifikation", TestVerifikation],
  ["/entwicklung/ux-interface-engineering", UxInterfaceEngineering],
  ["/entwicklung/software-digitale-systeme", SoftwareDigitaleSysteme],
  ["/entwicklung/e-motor-design", EMotorDesign],
  ["/entwicklung/control-design", ControlDesign],
  ["/entwicklung/validierung-emv", ValidierungEmv],
  ["/entwicklung/ki-entwicklung", KiEntwicklung],

  ["/fertigung", Fertigung],
  ["/fertigung/smd-bestueckung", SmdBestueckung],
  ["/fertigung/prototypen", Prototypen],
  ["/fertigung/leiterplatten", Leiterplatten],
  ["/fertigung/baugruppen", Baugruppen],
  ["/fertigung/qualitaet", Qualitaet],

  ["/lifecycle", Lifecycle],
  ["/maerkte", Maerkte],
  ["/unternehmen", Unternehmen],
  ["/kontakt", Kontakt],
  ["/karriere", Karriere],

  ["/insights", Insights],
  ["/insights/:slug", InsightArticle],

  ["/impressum", Impressum],
  ["/datenschutz", Datenschutz],
  ["/agb", AGB],
];

/** Nur deutsch – lokale Landingpages und der Pressebereich. */
const GERMAN_ONLY_ROUTES: Array<[string, ComponentType<any>]> = [
  ["/elektronikentwicklung", LandingElektronikentwicklung],
  ["/elektronikentwicklung-muenchen", LandingMuenchen],
  ["/media-center", MediaCenter],
];

const ADMIN_ROUTES: Array<[string, ComponentType<any>]> = [
  ["/admin/login", AdminLogin],
  ["/admin/insights", InsightsAdmin],
  ["/admin/insights/preview/:id", InsightPreview],
  ["/admin/styles", StylesheetEditor],
  ["/admin/content", ContentManager],
  ["/admin/authors", AuthorsAdmin],
  ["/admin/jobs", JobsAdmin],
];

/** Deutscher Pfad plus englische Entsprechung, sofern es eine gibt. */
function bilingualRoutes(): ReactElement[] {
  const out: ReactElement[] = [];
  for (const [dePath, component] of BILINGUAL_ROUTES) {
    out.push(<Route key={dePath} path={dePath} component={component} />);
    const enPath = enPathFor(dePath);
    if (enPath) out.push(<Route key={enPath} path={enPath} component={component} />);
  }
  return out;
}

function enPathFor(dePath: string): string | null {
  const mapped = DE_TO_EN[dePath];
  if (mapped) return mapped;
  const dynamic = DYNAMIC_ROUTE_PAIRS.find(p => p.de === dePath);
  return dynamic ? dynamic.en : null;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {bilingualRoutes()}

        {GERMAN_ONLY_ROUTES.map(([path, component]) => (
          <Route key={path} path={path} component={component} />
        ))}

        {ADMIN_ROUTES.map(([path, component]) => (
          <Route key={path} path={path} component={component} />
        ))}

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <LanguageProvider>
            <StyleProvider>
              <ConsentProvider>
              <TooltipProvider>
                <Toaster />
                <TrackingProvider />
                <CookieConsent />
                <LegacyRedirects />
                <Router />
              </TooltipProvider>
            </ConsentProvider>
            </StyleProvider>
          </LanguageProvider>
        </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
