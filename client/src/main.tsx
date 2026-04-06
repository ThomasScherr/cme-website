import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  loadResponsiveConfig,
  applyResponsiveConfigToRoot,
} from "./hooks/useResponsiveTokens";
import {
  loadDefaultPreset,
  applyPreset,
} from "./hooks/useDesignTokens";

// ── Initial load: check for default preset first, then responsive config ──
const defaultPreset = loadDefaultPreset();
if (defaultPreset) {
  applyPreset(defaultPreset);
}

// Always apply the responsive config (it includes desktop values + tablet/mobile overrides)
const responsiveConfig = loadResponsiveConfig();
applyResponsiveConfigToRoot(responsiveConfig);

// ── Cross-Tab Sync ──
// Disabled inside iframes – the parent StyleGuide controls tokens via pushToIframe.
// Also disabled on the /styleguide route itself – the hook manages state directly.
const isInsideIframe = window.self !== window.top;
const isStyleGuidePage = window.location.pathname === '/styleguide';

if (!isInsideIframe && !isStyleGuidePage) {
  const RESPONSIVE_KEY = 'cme-responsive-tokens';

  // Method 1: Native storage event (fires in OTHER tabs)
  window.addEventListener('storage', (event) => {
    if (event.key === RESPONSIVE_KEY && event.newValue) {
      try {
        const config = loadResponsiveConfig();
        applyResponsiveConfigToRoot(config);
      } catch { /* ignore */ }
    }
  });

  // Method 2: Same-tab custom event (only for the responsive key, not legacy keys)
  window.addEventListener('cme-token-change' as any, ((e: CustomEvent) => {
    if (e.detail?.key === RESPONSIVE_KEY) {
      const config = loadResponsiveConfig();
      applyResponsiveConfigToRoot(config);
    }
  }) as EventListener);

  // Method 3: Polling fallback (reduced frequency to 1s)
  let lastResponsiveJson = localStorage.getItem(RESPONSIVE_KEY) || '';

  setInterval(() => {
    const currentResponsive = localStorage.getItem(RESPONSIVE_KEY) || '';
    if (currentResponsive !== lastResponsiveJson) {
      lastResponsiveJson = currentResponsive;
      try {
        const config = loadResponsiveConfig();
        applyResponsiveConfigToRoot(config);
      } catch { /* ignore */ }
    }
  }, 1000);
}

// ── Render App ───────────────────────────────────────────────────────────
createRoot(document.getElementById("root")!).render(<App />);
