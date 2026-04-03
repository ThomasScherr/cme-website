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

// ── Cross-Tab Sync ───────────────────────────────────────────────────────
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

// Method 2: Same-tab custom event
window.addEventListener('cme-token-change' as any, ((e: CustomEvent) => {
  if (e.detail?.key === RESPONSIVE_KEY) {
    const config = loadResponsiveConfig();
    applyResponsiveConfigToRoot(config);
  }
  // Also listen for old-style token changes for backward compatibility
  if (e.detail?.key === 'cme-design-tokens' || e.detail?.key === 'cme-diamond-configs' || e.detail?.key === 'cme-section-heights') {
    const config = loadResponsiveConfig();
    applyResponsiveConfigToRoot(config);
  }
}) as EventListener);

// Method 3: Polling fallback
let lastResponsiveJson = localStorage.getItem(RESPONSIVE_KEY) || '';
let lastOldTokens = localStorage.getItem('cme-design-tokens') || '';

setInterval(() => {
  const currentResponsive = localStorage.getItem(RESPONSIVE_KEY) || '';
  const currentOldTokens = localStorage.getItem('cme-design-tokens') || '';

  if (currentResponsive !== lastResponsiveJson || currentOldTokens !== lastOldTokens) {
    lastResponsiveJson = currentResponsive;
    lastOldTokens = currentOldTokens;
    try {
      const config = loadResponsiveConfig();
      applyResponsiveConfigToRoot(config);
    } catch { /* ignore */ }
  }
}, 300);

// ── Render App ───────────────────────────────────────────────────────────
createRoot(document.getElementById("root")!).render(<App />);
