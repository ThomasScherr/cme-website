import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectSeoTags } from "../seoHtmlInjector";
import { lookupSeoMeta } from "../seoPageData";
import { precompressedAssetsMiddleware, assetContentType } from "../precompressedAssets";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      // Inject per-route SEO tags into the HTML before Vite transforms it
      template = injectSeoTags(template, url);

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  const assetsDir = path.resolve(distPath, "assets");

  // Vorkomprimierte Varianten (.br/.gz) bevorzugen – MUSS vor express.static
  // stehen. Ohne das gingen 739 KB roh raus, wo 154 KB reichen.
  app.use("/assets", precompressedAssetsMiddleware(assetsDir));

  // Static assets (JS, CSS, images) with content-hash in filename: immutable long-cache
  app.use("/assets", express.static(assetsDir, {
    maxAge: '365d',
    immutable: true,
    setHeaders: (res, filePath) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      // express.static leitet den Content-Type aus der Endung ab – bei .br/.gz
      // waere das application/octet-stream. Hier den echten Typ zuruecksetzen.
      const type = assetContentType(filePath);
      if (type) res.setHeader('Content-Type', type);
    },
  }));

  // Other static files (favicon, robots.txt, etc.)
  // redirect: false prevents express.static from 301-redirecting /path to /path/
  // when a directory exists (which would conflict with trailingSlashMiddleware)
  app.use(express.static(distPath, {
    maxAge: '1h',
    redirect: false,
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
      }
    },
  }));

  // fall through to index.html if the file doesn't exist (SPA routing)
  // IMPORTANT: Inject per-route SEO tags before serving
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    let html = fs.readFileSync(indexPath, 'utf-8');

    // Inject per-route SEO tags
    html = injectSeoTags(html, req.originalUrl);

    // Return proper 404 status for unknown routes
    const { meta } = lookupSeoMeta(req.originalUrl);
    const isKnownAppRoute = req.originalUrl.startsWith('/admin') || req.originalUrl.startsWith('/api');
    if (!meta && !isKnownAppRoute) {
      res.status(404);
    }

    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    res.removeHeader('Pragma');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  });
}
