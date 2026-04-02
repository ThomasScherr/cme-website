import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadTokens, applyTokensToRoot, loadDiamondConfigs, applyDiamondConfigsToRoot } from "./hooks/useDesignTokens";

// ── Initial load from LocalStorage ───────────────────────────────────────
applyTokensToRoot(loadTokens());
applyDiamondConfigsToRoot(loadDiamondConfigs());

// ── Cross-Tab Sync: BroadcastChannel ─────────────────────────────────────
// This listener runs on EVERY page and applies changes from other tabs live.
// It is independent of React – pure DOM-level CSS variable updates.
try {
  const globalChannel = new BroadcastChannel('cme-design-sync');
  globalChannel.addEventListener('message', (event) => {
    if (event.data?.type === 'token-update' && event.data.tokens) {
      applyTokensToRoot(event.data.tokens);
    }
    if (event.data?.type === 'diamond-update' && event.data.configs) {
      applyDiamondConfigsToRoot(event.data.configs);
    }
  });
} catch {
  // BroadcastChannel not supported – fall through to storage event
}

// ── Cross-Tab Sync: Fallback via localStorage 'storage' event ────────────
// The 'storage' event fires in OTHER tabs when localStorage changes.
// This is a reliable fallback that works in all browsers.
window.addEventListener('storage', (event) => {
  if (event.key === 'cme-design-tokens' && event.newValue) {
    try {
      const tokens = JSON.parse(event.newValue);
      applyTokensToRoot({ ...loadTokens(), ...tokens });
    } catch { /* ignore parse errors */ }
  }
  if (event.key === 'cme-diamond-configs' && event.newValue) {
    try {
      const configs = JSON.parse(event.newValue);
      applyDiamondConfigsToRoot({ ...loadDiamondConfigs(), ...configs });
    } catch { /* ignore parse errors */ }
  }
});

// ── Render App ───────────────────────────────────────────────────────────
createRoot(document.getElementById("root")!).render(<App />);
