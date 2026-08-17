#!/usr/bin/env node
/**
 * Vorkomprimierung der Build-Artefakte (Brotli + gzip).
 *
 * Express liefert statische Dateien unkomprimiert aus. Gemessen an der
 * laufenden Instanz gingen dadurch 739 KB roh über die Leitung, wo 154 KB
 * gereicht hätten:
 *
 *   index-*.js    555 KB  ->  gzip 158 KB  ->  brotli 132 KB   (-76%)
 *   index-*.css   184 KB  ->  gzip  28 KB  ->  brotli  22 KB   (-88%)
 *
 * Statt zur Laufzeit bei jedem Abruf zu komprimieren, wird einmal beim Build
 * komprimiert. Kostet null CPU im Betrieb und erlaubt die beste Stufe
 * (Brotli 11), die man sich zur Laufzeit nie leisten würde.
 *
 * Die Dateien liegen als <name>.br und <name>.gz neben dem Original.
 * server/precompressedAssets.ts liefert sie aus, wenn der Browser sie
 * akzeptiert.
 *
 * Läuft nach "vite build" (siehe package.json).
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, dirname, extname } from "path";
import { brotliCompress, gzip, constants } from "zlib";
import { promisify } from "util";

const brotliAsync = promisify(brotliCompress);
const gzipAsync = promisify(gzip);

const DIST = join(dirname(new URL(import.meta.url).pathname), "..", "dist", "public");

/** Nur Textformate – Bilder und Videos sind bereits komprimiert. */
const COMPRESSIBLE = new Set([".js", ".mjs", ".css", ".html", ".json", ".svg", ".txt", ".xml", ".map"]);

/** Unter dieser Größe lohnt der Aufwand nicht. */
const MIN_BYTES = 1024;

function collect(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collect(full));
    } else if (COMPRESSIBLE.has(extname(entry)) && statSync(full).size >= MIN_BYTES) {
      out.push(full);
    }
  }
  return out;
}

const files = collect(DIST);
let rawTotal = 0;
let brTotal = 0;

for (const file of files) {
  const data = readFileSync(file);

  const br = await brotliAsync(data, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
      [constants.BROTLI_PARAM_SIZE_HINT]: data.length,
    },
  });
  const gz = await gzipAsync(data, { level: 9 });

  // Nur schreiben, wenn tatsächlich kleiner
  if (br.length < data.length) writeFileSync(`${file}.br`, br);
  if (gz.length < data.length) writeFileSync(`${file}.gz`, gz);

  rawTotal += data.length;
  brTotal += Math.min(br.length, data.length);
}

const kb = n => `${Math.round(n / 1024)} KB`;
console.log(
  `Vorkomprimiert: ${files.length} Dateien, ${kb(rawTotal)} -> ${kb(brTotal)} ` +
    `(-${Math.round(100 - (brTotal / rawTotal) * 100)}% mit Brotli)`
);
