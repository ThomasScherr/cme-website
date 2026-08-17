import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { findPrerenderedPage } from "./prerenderedPages";

let dist: string;

beforeAll(() => {
  dist = fs.mkdtempSync(path.join(os.tmpdir(), "prerender-test-"));
  fs.writeFileSync(path.join(dist, "index.html"), "start");
  fs.mkdirSync(path.join(dist, "fertigung", "leiterplatten"), { recursive: true });
  fs.writeFileSync(path.join(dist, "fertigung", "leiterplatten", "index.html"), "lp");
  fs.mkdirSync(path.join(dist, "en", "manufacturing"), { recursive: true });
  fs.writeFileSync(path.join(dist, "en", "manufacturing", "index.html"), "mf");
  fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *");
  // Datei ausserhalb des Ausgabeverzeichnisses – darf nie erreichbar sein
  fs.writeFileSync(path.join(dist, "..", "geheim.html"), "geheim");
});

afterAll(() => {
  fs.rmSync(dist, { recursive: true, force: true });
  fs.rmSync(path.join(dist, "..", "geheim.html"), { force: true });
});

describe("findPrerenderedPage", () => {
  it("findet die Startseite", () => {
    expect(findPrerenderedPage(dist, "/")).toBe(path.join(dist, "index.html"));
  });

  it("findet Unterseiten mit und ohne abschliessenden Schraegstrich", () => {
    const expected = path.join(dist, "fertigung", "leiterplatten", "index.html");
    expect(findPrerenderedPage(dist, "/fertigung/leiterplatten/")).toBe(expected);
    expect(findPrerenderedPage(dist, "/fertigung/leiterplatten")).toBe(expected);
  });

  it("findet englische Seiten", () => {
    expect(findPrerenderedPage(dist, "/en/manufacturing/")).toBe(
      path.join(dist, "en", "manufacturing", "index.html")
    );
  });

  it("ignoriert Abfrage und Anker", () => {
    const expected = path.join(dist, "fertigung", "leiterplatten", "index.html");
    expect(findPrerenderedPage(dist, "/fertigung/leiterplatten/?utm_source=x")).toBe(expected);
    expect(findPrerenderedPage(dist, "/fertigung/leiterplatten/#unten")).toBe(expected);
  });

  it("liefert null fuer unbekannte Pfade", () => {
    expect(findPrerenderedPage(dist, "/gibtsnicht/")).toBeNull();
    expect(findPrerenderedPage(dist, "/admin/login/")).toBeNull();
  });

  it("liefert null fuer Dateien ohne index.html darunter", () => {
    expect(findPrerenderedPage(dist, "/robots.txt")).toBeNull();
  });

  it("bricht nicht aus dem Ausgabeverzeichnis aus", () => {
    for (const attack of [
      "/../geheim.html",
      "/../../etc/passwd",
      "/fertigung/../../geheim.html",
      "/%2e%2e/geheim.html",
      "/..%2f..%2fetc/passwd",
    ]) {
      expect(findPrerenderedPage(dist, attack), attack).toBeNull();
    }
  });

  it("kommt mit kaputter Prozentkodierung zurecht", () => {
    expect(findPrerenderedPage(dist, "/%E0%A4%A")).toBeNull();
  });
});
