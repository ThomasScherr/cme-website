import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import PasswordGate from "./components/PasswordGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { StyleProvider } from "./contexts/StyleContext";
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

const Lifecycle = lazy(() => import("./pages/Lifecycle"));
const Maerkte = lazy(() => import("./pages/Maerkte"));
const Unternehmen = lazy(() => import("./pages/Unternehmen"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Karriere = lazy(() => import("./pages/Karriere"));

const Impressum = lazy(() => import("./pages/legal/Impressum"));
const Datenschutz = lazy(() => import("./pages/legal/Datenschutz"));
const AGB = lazy(() => import("./pages/legal/AGB"));

const Insights = lazy(() => import("./pages/Insights"));
const InsightArticle = lazy(() => import("./pages/InsightArticle"));
const InsightsAdmin = lazy(() => import("./pages/admin/InsightsAdmin"));
const StylesheetEditor = lazy(() => import("./pages/admin/StylesheetEditor"));
const InsightPreview = lazy(() => import("./pages/admin/InsightPreview"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cme-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Home */}
        <Route path="/" component={Home} />

        {/* Entwicklung */}
        <Route path="/entwicklung" component={Entwicklung} />
        <Route path="/entwicklung/hardware-software" component={HardwareSoftware} />
        <Route path="/entwicklung/simulation" component={Simulation} />
        <Route path="/entwicklung/test-verifikation" component={TestVerifikation} />
        <Route path="/entwicklung/ux-interface-engineering" component={UxInterfaceEngineering} />
        <Route path="/entwicklung/software-digitale-systeme" component={SoftwareDigitaleSysteme} />
        <Route path="/entwicklung/e-motor-design" component={EMotorDesign} />
        <Route path="/entwicklung/control-design" component={ControlDesign} />
        <Route path="/entwicklung/validierung-emv" component={ValidierungEmv} />
        <Route path="/entwicklung/ki-entwicklung" component={KiEntwicklung} />

        {/* Fertigung */}
        <Route path="/fertigung" component={Fertigung} />
        <Route path="/fertigung/leiterplatten" component={Leiterplatten} />
        <Route path="/fertigung/baugruppen" component={Baugruppen} />
        <Route path="/fertigung/qualitaet" component={Qualitaet} />

        {/* Weitere Hauptseiten */}
        <Route path="/lifecycle" component={Lifecycle} />
        <Route path="/maerkte" component={Maerkte} />
        <Route path="/unternehmen" component={Unternehmen} />
        <Route path="/kontakt" component={Kontakt} />
        <Route path="/karriere" component={Karriere} />

        {/* Blog / Insights */}
        <Route path="/insights" component={Insights} />
        <Route path="/insights/:slug" component={InsightArticle} />
        <Route path="/admin/insights" component={InsightsAdmin} />
        <Route path="/admin/insights/preview/:id" component={InsightPreview} />
        <Route path="/admin/styles" component={StylesheetEditor} />

        {/* Rechtliches */}
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/agb" component={AGB} />

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
      <PasswordGate>
        <ThemeProvider defaultTheme="light">
          <LanguageProvider>
            <StyleProvider>
              <TooltipProvider>
                <Toaster />
                <Router />
              </TooltipProvider>
            </StyleProvider>
          </LanguageProvider>
        </ThemeProvider>
      </PasswordGate>
    </ErrorBoundary>
  );
}

export default App;
