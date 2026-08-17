import { describe, it, expect, vi } from "vitest";
import { precompressedAssetsMiddleware, assetContentType } from "./precompressedAssets";

const ASSETS = "/app/dist/public/assets";
const vorhanden = (...pfade: string[]) => (p: string) => pfade.includes(p);

function req(url: string, accept = "", method = "GET") {
  return { url, path: url.split("?")[0], method, headers: { "accept-encoding": accept } } as any;
}
function res() {
  const r: any = { headers: {} as Record<string, string> };
  r.setHeader = vi.fn((k: string, v: string) => { r.headers[k] = v; });
  return r;
}

describe("precompressedAssetsMiddleware", () => {
  it("nimmt Brotli, wenn der Browser es akzeptiert und die Datei existiert", () => {
    const mw = precompressedAssetsMiddleware(ASSETS, vorhanden(`${ASSETS}/index.js.br`, `${ASSETS}/index.js.gz`));
    const q = req("/index.js", "gzip, deflate, br"); const s = res(); const next = vi.fn();
    mw(q, s, next);
    expect(s.headers["Content-Encoding"]).toBe("br");
    expect(s.headers["Content-Type"]).toBe("application/javascript; charset=utf-8");
    expect(s.headers["Vary"]).toBe("Accept-Encoding");
    expect(q.url).toBe("/index.js.br");
    expect(next).toHaveBeenCalled();
  });

  it("faellt auf gzip zurueck, wenn keine .br-Datei da ist", () => {
    const mw = precompressedAssetsMiddleware(ASSETS, vorhanden(`${ASSETS}/index.js.gz`));
    const q = req("/index.js", "gzip, br"); const s = res();
    mw(q, s, vi.fn());
    expect(s.headers["Content-Encoding"]).toBe("gzip");
    expect(q.url).toBe("/index.js.gz");
  });

  it("liefert das Original, wenn der Browser nichts akzeptiert", () => {
    const mw = precompressedAssetsMiddleware(ASSETS, vorhanden(`${ASSETS}/index.js.br`));
    const q = req("/index.js", ""); const s = res();
    mw(q, s, vi.fn());
    expect(s.headers["Content-Encoding"]).toBeUndefined();
    expect(s.headers["Content-Type"]).toBe("application/javascript; charset=utf-8");
    expect(q.url).toBe("/index.js");
  });

  it("laesst Bilder und Videos unangetastet", () => {
    const mw = precompressedAssetsMiddleware(ASSETS, () => true);
    const q = req("/hero.webp", "br"); const s = res(); const next = vi.fn();
    mw(q, s, next);
    expect(s.setHeader).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("wehrt Pfad-Traversal ab", () => {
    const mw = precompressedAssetsMiddleware(ASSETS, () => true);
    const q = req("/../../etc/passwd.js", "br"); const s = res();
    mw(q, s, vi.fn());
    expect(s.headers["Content-Encoding"]).toBeUndefined();
  });

  it("erhaelt die Query-Zeichenkette beim Umschreiben", () => {
    const mw = precompressedAssetsMiddleware(ASSETS, vorhanden(`${ASSETS}/index.css.br`));
    const q = req("/index.css?v=2", "br"); const s = res();
    mw(q, s, vi.fn());
    expect(q.url).toBe("/index.css.br?v=2");
  });

  it("ermittelt den Typ hinter der Kompressionsendung", () => {
    expect(assetContentType("/x/index.css.br")).toBe("text/css; charset=utf-8");
    expect(assetContentType("/x/index.js.gz")).toBe("application/javascript; charset=utf-8");
    expect(assetContentType("/x/bild.webp")).toBeUndefined();
  });
});
