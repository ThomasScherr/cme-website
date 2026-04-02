import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  loadTokens,
  applyTokensToRoot,
  loadDiamondConfigs,
  applyDiamondConfigsToRoot,
  DEFAULT_TOKENS,
  DEFAULT_DIAMOND_CONFIGS,
} from "./hooks/useDesignTokens";

// ── Initial load from LocalStorage ───────────────────────────────────────
applyTokensToRoot(loadTokens());
applyDiamondConfigsToRoot(loadDiamondConfigs());

// ── Cross-Tab Sync (global, outside React) ───────────────────────────────
// The native 'storage' event fires in OTHER tabs when localStorage changes.
// This is the most reliable cross-tab sync mechanism.
window.addEventListener('storage', (event) => {
  if (event.key === 'cme-design-tokens' && event.newValue) {
    try {
      const tokens = { ...DEFAULT_TOKENS, ...JSON.parse(event.newValue) };
      applyTokensToRoot(tokens);
    } catch { /* ignore */ }
  }
  if (event.key === 'cme-diamond-configs' && event.newValue) {
    try {
      const configs = { ...DEFAULT_DIAMOND_CONFIGS, ...JSON.parse(event.newValue) };
      applyDiamondConfigsToRoot(configs);
    } catch { /* ignore */ }
  }
});

// ── Same-tab reactivity (for non-React parts of the page) ───────────────
// Custom event dispatched by saveTokens/saveDiamondConfigs for same-tab updates.
window.addEventListener('cme-token-change' as any, ((e: CustomEvent) => {
  if (e.detail?.key === 'cme-design-tokens') {
    applyTokensToRoot(loadTokens());
  }
  if (e.detail?.key === 'cme-diamond-configs') {
    applyDiamondConfigsToRoot(loadDiamondConfigs());
  }
}) as EventListener);

// ── Render App ───────────────────────────────────────────────────────────
createRoot(document.getElementById("root")!).render(<App />);
