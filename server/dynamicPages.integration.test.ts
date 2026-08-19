import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const getArticleBySlug = vi.fn();
const getPublishedArticles = vi.fn();
const getAuthorById = vi.fn();
vi.mock("./db", () => ({
  getArticleBySlug: (...a: unknown[]) => getArticleBySlug(...a),
  getPublishedArticles: (...a: unknown[]) => getPublishedArticles(...a),
  getAuthorById: (...a: unknown[]) => getAuthorById(...a),
}));

const { dynamicPagesMiddleware } = await import("./dynamicPages");

const SHELL = `<!doctype html>
<html lang="de">
  <head>
    <title>Platzhalter</title>
    <meta name="description" content="Platzhalter" />
    <!--SEO_BLOCK_START--><!--SEO_BLOCK_END-->
  </head>
  <body><div id="root"></div></body>
</html>`;

let root: string;
let dist: string;

function fakeRes() {
  const res: Record<string, unknown> = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: "",
  };
  res.status = (c: number) => { res.statusCode = c; return res; };
  res.setHeader = (k: string, v: string) => { (res.headers as Record<string, string>)[k] = v; };
  res.removeHeader = () => {};
  res.send = (b: string) => { res.body = b; return res; };
  return res as any;
}

const artikel = {
  slug: "sic-und-gan",
  title: "SiC und GaN",
  metaTitle: "SiC und GaN | CME",
  metaDescription: "Beschreibung",
  status: "published",
  updatedAt: new Date("2026-01-01T00:00:00Z"),
};

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "dynpages-"));
  dist = path.join(root, "public");
  fs.mkdirSync(dist, { recursive: true });
  fs.writeFileSync(path.join(root, "spa-shell.html"), SHELL);
  getArticleBySlug.mockReset();
  getPublishedArticles.mockReset();
  getAuthorById.mockReset();
  getAuthorById.mockResolvedValue(null);
});

afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

describe("dynamicPagesMiddleware", () => {
  it("rendert einen veroeffentlichten Artikel und legt ihn ab", async () => {
    getArticleBySlug.mockResolvedValue(artikel);
    const render = vi.fn().mockResolvedValue({ html: "<article><h1>SiC und GaN</h1></article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });

    const res = fakeRes();
    const next = vi.fn();
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("<h1>SiC und GaN</h1>");
    expect(res.body).toContain("<title>SiC und GaN | CME</title>");
    expect(res.body).toContain('rel="canonical" href="https://control-motion.de/insights/sic-und-gan/"');
    expect(res.body).not.toContain("Platzhalter");
    // Abgelegt fuer den naechsten Abruf
    expect(fs.existsSync(path.join(root, "article-cache", "insights", "sic-und-gan", "index.html"))).toBe(true);
  });

  it("rendert beim zweiten Abruf nicht erneut", async () => {
    getArticleBySlug.mockResolvedValue(artikel);
    const render = vi.fn().mockResolvedValue({ html: "<article>x</article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });

    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), vi.fn());
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), vi.fn());

    expect(render).toHaveBeenCalledTimes(1);
  });

  it("rendert neu, wenn der Artikel neuer ist als die abgelegte Fassung", async () => {
    getArticleBySlug.mockResolvedValue(artikel);
    const render = vi.fn().mockResolvedValue({ html: "<article>alt</article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), vi.fn());

    getArticleBySlug.mockResolvedValue({ ...artikel, updatedAt: new Date(Date.now() + 60_000) });
    render.mockResolvedValue({ html: "<article>neu</article>", lang: "de" });
    const res = fakeRes();
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, res, vi.fn());

    expect(render).toHaveBeenCalledTimes(2);
    expect(res.body).toContain("neu");
  });

  it("liefert die englische Fassung unter /en/insights/<slug>", async () => {
    getArticleBySlug.mockResolvedValue({ ...artikel, metaTitleEn: "SiC and GaN | CME", metaDescriptionEn: "Description" });
    const render = vi.fn().mockResolvedValue({ html: "<article>en</article>", lang: "en" });
    const mw = dynamicPagesMiddleware(dist, { render });

    const res = fakeRes();
    await mw({ method: "GET", originalUrl: "/en/insights/sic-und-gan/" } as any, res, vi.fn());

    expect(res.body).toContain("<title>SiC and GaN | CME</title>");
    expect(res.body).toContain('<html lang="en"');
    expect(res.body).toContain('rel="canonical" href="https://control-motion.de/en/insights/sic-und-gan/"');
  });

  it("reicht Entwuerfe weiter – die bekommen dann eine echte 404", async () => {
    getArticleBySlug.mockResolvedValue({ ...artikel, status: "draft" });
    const render = vi.fn();
    const mw = dynamicPagesMiddleware(dist, { render });

    const next = vi.fn();
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), next);

    expect(next).toHaveBeenCalled();
    expect(render).not.toHaveBeenCalled();
  });

  it("gibt das Autorenprofil an den Renderer weiter", async () => {
    const autor = { id: 1, name: "Matthias Markmann", updatedAt: new Date("2026-01-01T00:00:00Z") };
    getArticleBySlug.mockResolvedValue({ ...artikel, authorId: 1 });
    getAuthorById.mockResolvedValue(autor);
    const render = vi.fn().mockResolvedValue({ html: "<article>x</article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });

    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), vi.fn());

    expect(getAuthorById).toHaveBeenCalledWith(1);
    expect(render).toHaveBeenCalledWith("/insights/sic-und-gan", {
      article: { slug: "sic-und-gan", data: { ...artikel, authorId: 1 } },
      author: { id: 1, data: autor },
    });
  });

  it("fragt keinen Autor ab, wenn der Artikel keinen hat", async () => {
    getArticleBySlug.mockResolvedValue(artikel);
    const render = vi.fn().mockResolvedValue({ html: "<article>x</article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });

    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), vi.fn());

    expect(getAuthorById).not.toHaveBeenCalled();
    expect(render.mock.calls[0][1]).not.toHaveProperty("author");
  });

  it("rendert die Seite auch, wenn die Autorenabfrage ausfaellt", async () => {
    getArticleBySlug.mockResolvedValue({ ...artikel, authorId: 1 });
    getAuthorById.mockRejectedValue(new Error("Datenbank weg"));
    const render = vi.fn().mockResolvedValue({ html: "<article>x</article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });

    const res = fakeRes();
    const next = vi.fn();
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(render.mock.calls[0][1]).not.toHaveProperty("author");
  });

  it("rendert neu, wenn nur das Autorenprofil geaendert wurde", async () => {
    getArticleBySlug.mockResolvedValue({ ...artikel, authorId: 1 });
    getAuthorById.mockResolvedValue({ id: 1, name: "Matthias Markmann", updatedAt: new Date("2026-01-01T00:00:00Z") });
    const render = vi.fn().mockResolvedValue({ html: "<article>ohne Foto</article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), vi.fn());

    getAuthorById.mockResolvedValue({ id: 1, name: "Matthias Markmann", updatedAt: new Date(Date.now() + 60_000) });
    render.mockResolvedValue({ html: "<article>mit Foto</article>", lang: "de" });
    const res = fakeRes();
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, res, vi.fn());

    expect(render).toHaveBeenCalledTimes(2);
    expect(res.body).toContain("mit Foto");
  });

  it("reicht unbekannte Slugs weiter", async () => {
    getArticleBySlug.mockResolvedValue(null);
    const mw = dynamicPagesMiddleware(dist, { render: vi.fn() });
    const next = vi.fn();
    await mw({ method: "GET", originalUrl: "/insights/gibtsnicht/" } as any, fakeRes(), next);
    expect(next).toHaveBeenCalled();
  });

  it("liefert bei Datenbankausfall die zuletzt abgelegte Fassung", async () => {
    getArticleBySlug.mockResolvedValue(artikel);
    const render = vi.fn().mockResolvedValue({ html: "<article>gespeichert</article>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, fakeRes(), vi.fn());

    getArticleBySlug.mockRejectedValue(new Error("Datenbank nicht erreichbar"));
    const res = fakeRes();
    const next = vi.fn();
    await mw({ method: "GET", originalUrl: "/insights/sic-und-gan/" } as any, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.body).toContain("gespeichert");
  });

  it("rendert die Uebersicht mit der Artikelliste", async () => {
    getPublishedArticles.mockResolvedValue([artikel]);
    const render = vi.fn().mockResolvedValue({ html: "<main>Liste</main>", lang: "de" });
    const mw = dynamicPagesMiddleware(dist, { render });

    const res = fakeRes();
    await mw({ method: "GET", originalUrl: "/insights/" } as any, res, vi.fn());

    expect(render).toHaveBeenCalledWith("/insights", { articleList: [artikel] });
    expect(res.body).toContain("<main>Liste</main>");
    expect(res.body).toContain("<title>Insights &amp; Fachwissen | CME Dortmund</title>");
  });

  it("fasst andere Seiten nicht an", async () => {
    const mw = dynamicPagesMiddleware(dist, { render: vi.fn() });
    const next = vi.fn();
    await mw({ method: "GET", originalUrl: "/fertigung/leiterplatten/" } as any, fakeRes(), next);
    expect(next).toHaveBeenCalled();
  });
});
