/**
 * Download Proxy – serves stored files under /api/downloads/:key
 * This provides a neutral, first-party URL without any third-party branding.
 * Files are fetched from S3 via the Forge presigned URL mechanism and streamed to the client.
 */
import type { Express } from "express";
import { ENV } from "./_core/env";

// Map of allowed download keys to their S3 storage keys and friendly filenames
const DOWNLOAD_REGISTRY: Record<string, { storageKey: string; filename: string; contentType: string }> = {
  // Logos
  'CME_Logo_RGB_horizontal.png': { storageKey: 'CME_Logo_RGB_R_f491fb76.png', filename: 'CME_Logo_RGB_horizontal.png', contentType: 'image/png' },
  'CME_Logo_RGB_horizontal.eps': { storageKey: 'CME_Logo_RGB_R_f5eaab72.eps', filename: 'CME_Logo_RGB_horizontal.eps', contentType: 'application/postscript' },
  'CME_Logo_weiss_horizontal.png': { storageKey: 'CME_Logo_CMYK_R_5eca81b3.png', filename: 'CME_Logo_weiss_horizontal.png', contentType: 'image/png' },
  'CME_Logo_RGB_zentriert.png': { storageKey: 'CME_Logo_RGB_C_7c6c92fe.png', filename: 'CME_Logo_RGB_zentriert.png', contentType: 'image/png' },
  'CME_Logo_RGB_zentriert.eps': { storageKey: 'CME_Logo_RGB_C_6f72d7ef.eps', filename: 'CME_Logo_RGB_zentriert.eps', contentType: 'application/postscript' },
  'CME_Logo_CMYK_zentriert.eps': { storageKey: 'CME_Logo_CMYK_C_81cdc5d5.eps', filename: 'CME_Logo_CMYK_zentriert.eps', contentType: 'application/postscript' },
  // Photos
  'CME_Geschaeftsfuehrung_Katzer_Markmann.png': { storageKey: 'CME_Teamfoto_Katzer_Markmann_395b2cb7.png', filename: 'CME_Geschaeftsfuehrung_Katzer_Markmann.png', contentType: 'image/png' },
  'ThomasScherr_Portrait.jpg': { storageKey: 'ThomasPortraitSW_Email_Square_5ed94205.jpg', filename: 'ThomasScherr_Portrait.jpg', contentType: 'image/jpeg' },
  // Publications
  'CME_Mitgliedsprofil_Brancheninitiative.pdf': { storageKey: 'CME_Mitgliedsprofil_Brancheninitiative_f392958f.pdf', filename: 'CME_Mitgliedsprofil_Brancheninitiative.pdf', contentType: 'application/pdf' },
  'CME_Mitgliedsprofil_Brancheninitiative.docx': { storageKey: 'CME_Mitgliedsprofil_Brancheninitiative_6c8fce2d.docx', filename: 'CME_Mitgliedsprofil_Brancheninitiative.docx', contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  // Company Presentations
  '2026-CMECompanyPresentationDE.pdf': { storageKey: '2026-CMECompanyPresentationDE_e9b54f32.pdf', filename: '2026-CMECompanyPresentationDE.pdf', contentType: 'application/pdf' },
  '2026-CMECompanyPresentationEN.pdf': { storageKey: '2026-CMECompanyPresentationEN_bf43d36e.pdf', filename: '2026-CMECompanyPresentationEN.pdf', contentType: 'application/pdf' },
};

export function registerDownloadProxy(app: Express) {
  app.get("/api/downloads/:key", async (req, res) => {
    const key = req.params.key;
    const entry = DOWNLOAD_REGISTRY[key];

    if (!entry) {
      res.status(404).send("File not found");
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage not configured");
      return;
    }

    try {
      // Get presigned URL from Forge
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", entry.storageKey);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL");
        return;
      }

      // Fetch the file and stream to client
      const fileResp = await fetch(url);
      if (!fileResp.ok || !fileResp.body) {
        res.status(502).send("Failed to fetch file");
        return;
      }

      res.set("Content-Type", entry.contentType);
      res.set("Content-Disposition", `attachment; filename="${entry.filename}"`);
      res.set("Cache-Control", "public, max-age=86400");

      const arrayBuffer = await fileResp.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (err) {
      console.error("[DownloadProxy] failed:", err);
      res.status(502).send("Download error");
    }
  });

  // Preview endpoint (inline display, no forced download)
  app.get("/api/media/:key", async (req, res) => {
    const key = req.params.key;
    const entry = DOWNLOAD_REGISTRY[key];

    if (!entry) {
      res.status(404).send("File not found");
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage not configured");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", entry.storageKey);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL");
        return;
      }

      res.set("Cache-Control", "public, max-age=86400");
      res.redirect(307, url);
    } catch (err) {
      console.error("[MediaProxy] failed:", err);
      res.status(502).send("Media proxy error");
    }
  });
}
