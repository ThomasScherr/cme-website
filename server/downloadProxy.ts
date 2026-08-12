/**
 * Download Proxy – serves stored files under /api/downloads/:key and /api/media/:key
 * Files are served directly from the local filesystem (client/public/assets/downloads/).
 * No dependency on Manus Forge API or any external storage.
 */
import type { Express } from "express";
import path from "path";
import fs from "fs";

// Map of allowed download keys to their local filenames and content types
const DOWNLOAD_REGISTRY: Record<string, { filename: string; contentType: string }> = {
  // Logos
  'CME_Logo_RGB_horizontal.png': { filename: 'CME_Logo_RGB_horizontal.png', contentType: 'image/png' },
  'CME_Logo_RGB_horizontal.eps': { filename: 'CME_Logo_RGB_horizontal.eps', contentType: 'application/postscript' },
  'CME_Logo_weiss_horizontal.png': { filename: 'CME_Logo_weiss_horizontal.png', contentType: 'image/png' },
  'CME_Logo_RGB_zentriert.png': { filename: 'CME_Logo_RGB_zentriert.png', contentType: 'image/png' },
  'CME_Logo_RGB_zentriert.eps': { filename: 'CME_Logo_RGB_zentriert.eps', contentType: 'application/postscript' },
  'CME_Logo_CMYK_zentriert.eps': { filename: 'CME_Logo_CMYK_zentriert.eps', contentType: 'application/postscript' },
  'CME_Logo_Email_250px.png': { filename: 'CME_Logo_Email_250px.png', contentType: 'image/png' },
  // Photos
  'CME_Geschaeftsfuehrung_Katzer_Markmann.png': { filename: 'CME_Geschaeftsfuehrung_Katzer_Markmann.png', contentType: 'image/png' },
  'ThomasScherr_Portrait.jpg': { filename: 'ThomasScherr_Portrait.jpg', contentType: 'image/jpeg' },
  // Publications
  'CME_Mitgliedsprofil_Brancheninitiative.pdf': { filename: 'CME_Mitgliedsprofil_Brancheninitiative.pdf', contentType: 'application/pdf' },
  'CME_Mitgliedsprofil_Brancheninitiative.docx': { filename: 'CME_Mitgliedsprofil_Brancheninitiative.docx', contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  // Company Presentations
  '2026-CMECompanyPresentationDE.pdf': { filename: '2026-CMECompanyPresentationDE.pdf', contentType: 'application/pdf' },
  '2026-CMECompanyPresentationEN.pdf': { filename: '2026-CMECompanyPresentationEN.pdf', contentType: 'application/pdf' },
};

// Resolve the downloads directory (works in both dev and production)
function getDownloadsDir(): string {
  // In production (Docker), files are at /app/dist/public/assets/downloads/
  // In development, files are at client/public/assets/downloads/
  const prodPath = path.resolve(process.cwd(), "dist/public/assets/downloads");
  const devPath = path.resolve(process.cwd(), "client/public/assets/downloads");
  if (fs.existsSync(prodPath)) return prodPath;
  return devPath;
}

export function registerDownloadProxy(app: Express) {
  // Force download endpoint
  app.get("/api/downloads/:key", (req, res) => {
    const key = req.params.key;
    const entry = DOWNLOAD_REGISTRY[key];

    if (!entry) {
      res.status(404).send("File not found");
      return;
    }

    const filePath = path.join(getDownloadsDir(), entry.filename);

    if (!fs.existsSync(filePath)) {
      console.error("[DownloadProxy] File not found on disk:", filePath);
      res.status(404).send("File not found on server");
      return;
    }

    res.set("Content-Type", entry.contentType);
    res.set("Content-Disposition", `attachment; filename="${entry.filename}"`);
    res.set("Cache-Control", "public, max-age=86400");
    res.sendFile(filePath);
  });

  // Inline preview endpoint (no forced download)
  app.get("/api/media/:key", (req, res) => {
    const key = req.params.key;
    const entry = DOWNLOAD_REGISTRY[key];

    if (!entry) {
      res.status(404).send("File not found");
      return;
    }

    const filePath = path.join(getDownloadsDir(), entry.filename);

    if (!fs.existsSync(filePath)) {
      console.error("[MediaProxy] File not found on disk:", filePath);
      res.status(404).send("File not found on server");
      return;
    }

    res.set("Content-Type", entry.contentType);
    res.set("Content-Disposition", `inline; filename="${entry.filename}"`);
    res.set("Cache-Control", "public, max-age=86400");
    res.sendFile(filePath);
  });
}
