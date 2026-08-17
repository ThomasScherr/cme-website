/**
 * Vite-Konfiguration für den SSR-Build (Vorrendern).
 *
 * Übernimmt Plugins, Alias-Auflösung und Wurzelverzeichnis aus der
 * Hauptkonfiguration, ersetzt den build-Abschnitt aber vollständig.
 *
 * Wichtig: mergeConfig würde manualChunks aus der Hauptkonfiguration
 * beibehalten. Die Aufteilung ist für den Browser gedacht und scheitert im
 * SSR-Build an den externalisierten Abhängigkeiten
 * ("react cannot be included in manualChunks").
 *
 * Aufruf: npx vite build --config vite.config.ssr.ts
 * Ergebnis: dist/server-entry/entry-server.js
 */
import { defineConfig } from "vite";
import path from "path";
import baseConfig from "./vite.config";

const base = baseConfig as Record<string, any>;

export default defineConfig({
  plugins: base.plugins,
  resolve: base.resolve,
  root: base.root,
  envDir: base.envDir,
  esbuild: base.esbuild,
  build: {
    ssr: path.resolve(import.meta.dirname, "client", "src", "entry-server.tsx"),
    outDir: path.resolve(import.meta.dirname, "dist", "server-entry"),
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: false,
    rollupOptions: {
      output: { entryFileNames: "entry-server.js" },
    },
  },
});
