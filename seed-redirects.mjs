/**
 * Seed script: Insert redirect rules for old/legacy URLs into the database.
 * These are URLs that Sistrix and other crawlers have indexed from the old website
 * or from URL changes during development.
 * 
 * Run with: node seed-redirects.mjs
 */

import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const redirects = [
  // Old Fertigung URLs → new paths
  { sourcePath: '/fertigung/leiterplatten-bestuecken', targetUrl: '/fertigung/leiterplatten', note: 'Alte URL von control-motion.de v1' },
  { sourcePath: '/fertigung/baugruppen-fertigen', targetUrl: '/fertigung/baugruppen', note: 'Alte URL von control-motion.de v1' },
  { sourcePath: '/fertigung/qualitaetsmanagement', targetUrl: '/fertigung/qualitaet', note: 'Alte URL von control-motion.de v1' },
  
  // Old Lifecycle URL → new path
  { sourcePath: '/lifecycle-reparatur', targetUrl: '/lifecycle', note: 'Alte URL von control-motion.de v1' },
  
  // URLs without hyphens (Sistrix crawls these from canonical without hyphens)
  { sourcePath: '/entwicklung/emotordesign', targetUrl: '/entwicklung/e-motor-design', note: 'Sistrix-Canonical ohne Bindestriche' },
  { sourcePath: '/entwicklung/controldesign', targetUrl: '/entwicklung/control-design', note: 'Sistrix-Canonical ohne Bindestriche' },
  { sourcePath: '/entwicklung/testverifikation', targetUrl: '/entwicklung/test-verifikation', note: 'Sistrix-Canonical ohne Bindestriche' },
  { sourcePath: '/entwicklung/validierungemv', targetUrl: '/entwicklung/validierung-emv', note: 'Sistrix-Canonical ohne Bindestriche' },
  { sourcePath: '/entwicklung/uxinterfaceengineering', targetUrl: '/entwicklung/ux-interface-engineering', note: 'Sistrix-Canonical ohne Bindestriche' },
  
  // Insights URL (old path)
  { sourcePath: '/insights', targetUrl: '/insights', note: 'Insights-Seite (Pfad identisch, für Crawling-Kompatibilität)' },
];

async function main() {
  // Parse DATABASE_URL
  const url = new URL(DATABASE_URL);
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: parseInt(url.port) || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: { rejectUnauthorized: true },
  });

  console.log('Connected to database');

  let inserted = 0;
  let skipped = 0;

  for (const r of redirects) {
    // Skip if /insights → /insights (same path)
    if (r.sourcePath === r.targetUrl) {
      console.log(`  SKIP (same path): ${r.sourcePath}`);
      skipped++;
      continue;
    }

    // Check if redirect already exists
    const [existing] = await connection.execute(
      'SELECT id FROM redirects WHERE sourcePath = ?',
      [r.sourcePath]
    );

    if (existing.length > 0) {
      console.log(`  EXISTS: ${r.sourcePath} → ${r.targetUrl}`);
      skipped++;
      continue;
    }

    await connection.execute(
      'INSERT INTO redirects (sourcePath, targetUrl, statusCode, isActive, hitCount, note, createdAt, updatedAt) VALUES (?, ?, 301, 1, 0, ?, NOW(), NOW())',
      [r.sourcePath, r.targetUrl, r.note]
    );
    console.log(`  ADDED: ${r.sourcePath} → ${r.targetUrl}`);
    inserted++;
  }

  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped`);
  await connection.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
