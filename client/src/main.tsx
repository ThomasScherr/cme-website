import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadTokens, applyTokensToRoot, loadDiamondConfigs, applyDiamondConfigsToRoot } from "./hooks/useDesignTokens";

// Load and apply design tokens + diamond configs from LocalStorage on app start
applyTokensToRoot(loadTokens());
applyDiamondConfigsToRoot(loadDiamondConfigs());

// ── Global BroadcastChannel Listener ──────────────────────────────────────
// This listener runs on EVERY page (Home, StyleGuide, etc.) and applies
// design token / diamond config changes from other tabs in real time.
// It works independently of React hooks – pure DOM-level CSS variable updates.

if (typeof BroadcastChannel !== 'undefined') {
  const globalChannel = new BroadcastChannel('cme-design-sync');
  globalChannel.onmessage = (event) => {
    if (event.data?.type === 'token-update' && event.data.tokens) {
      applyTokensToRoot(event.data.tokens);
    }
    if (event.data?.type === 'diamond-update' && event.data.configs) {
      applyDiamondConfigsToRoot(event.data.configs);
    }
  };
  // Never close this channel – it must stay open for the lifetime of the tab
}

createRoot(document.getElementById("root")!).render(<App />);
