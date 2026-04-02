import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadTokens, applyTokensToRoot } from "./hooks/useDesignTokens";

// Load and apply design tokens from LocalStorage on app start
applyTokensToRoot(loadTokens());

createRoot(document.getElementById("root")!).render(<App />);
