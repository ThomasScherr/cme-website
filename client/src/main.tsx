import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadTokens, applyTokensToRoot, loadDiamondConfigs, applyDiamondConfigsToRoot } from "./hooks/useDesignTokens";

// Load and apply design tokens + diamond configs from LocalStorage on app start
applyTokensToRoot(loadTokens());
applyDiamondConfigsToRoot(loadDiamondConfigs());

createRoot(document.getElementById("root")!).render(<App />);
