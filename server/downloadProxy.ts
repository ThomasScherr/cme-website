/**
 * Download Proxy – redirects to Bunny CDN for file downloads and media previews.
 * Files are stored on Bunny.net CDN (ventspire-cdn.b-cdn.net/cme/downloads/).
 */
import type { Express } from "express";

const CDN_BASE = "https://ventspire-cdn.b-cdn.net/cme/downloads";

// Map of allowed download keys to their filenames and content types
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

export function registerDownloadProxy(app: Express) {
  // Force download endpoint – redirects to CDN
  app.get("/api/downloads/:key", (req, res) => {
    const key = req.params.key;
    const entry = DOWNLOAD_REGISTRY[key];

    if (!entry) {
      res.status(404).send("File not found");
      return;
    }

    const cdnUrl = `${CDN_BASE}/${entry.filename}`;
    res.redirect(302, cdnUrl);
  });

  // Inline preview endpoint – redirects to CDN
  app.get("/api/media/:key", (req, res) => {
    const key = req.params.key;
    const entry = DOWNLOAD_REGISTRY[key];

    if (!entry) {
      res.status(404).send("File not found");
      return;
    }

    const cdnUrl = `${CDN_BASE}/${entry.filename}`;
    res.redirect(302, cdnUrl);
  });
}
