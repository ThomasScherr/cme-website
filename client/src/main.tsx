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

// ── Cross-Tab Sync ───────────────────────────────────────────────────────
// Method 1: Native storage event (fires in OTHER tabs when localStorage changes)
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

// Method 2: Same-tab custom event (dispatched by saveTokens/saveDiamondConfigs)
window.addEventListener('cme-token-change' as any, ((e: CustomEvent) => {
  if (e.detail?.key === 'cme-design-tokens') {
    applyTokensToRoot(loadTokens());
  }
  if (e.detail?.key === 'cme-diamond-configs') {
    applyDiamondConfigsToRoot(loadDiamondConfigs());
  }
}) as EventListener);

// Method 3: Polling fallback – checks every 300ms if localStorage changed.
// This catches cases where the storage event doesn't fire (e.g. same origin iframes,
// some browser contexts, or when both tabs share the same browsing context).
let lastTokensJson = localStorage.getItem('cme-design-tokens') || '';
let lastDiamondJson = localStorage.getItem('cme-diamond-configs') || '';

setInterval(() => {
  const currentTokensJson = localStorage.getItem('cme-design-tokens') || '';
  const currentDiamondJson = localStorage.getItem('cme-diamond-configs') || '';

  if (currentTokensJson !== lastTokensJson) {
    lastTokensJson = currentTokensJson;
    try {
      const tokens = currentTokensJson
        ? { ...DEFAULT_TOKENS, ...JSON.parse(currentTokensJson) }
        : { ...DEFAULT_TOKENS };
      applyTokensToRoot(tokens);
    } catch { /* ignore */ }
  }

  if (currentDiamondJson !== lastDiamondJson) {
    lastDiamondJson = currentDiamondJson;
    try {
      const configs = currentDiamondJson
        ? { ...DEFAULT_DIAMOND_CONFIGS, ...JSON.parse(currentDiamondJson) }
        : { ...DEFAULT_DIAMOND_CONFIGS };
      applyDiamondConfigsToRoot(configs);
    } catch { /* ignore */ }
  }
}, 300);

// ── Render App ───────────────────────────────────────────────────────────
createRoot(document.getElementById("root")!).render(<App />);
