import { sql } from "drizzle-orm";
import { getDb } from "./db";

/**
 * Run startup migrations – creates tables that may not exist yet.
 * Safe to call multiple times (uses IF NOT EXISTS).
 */
export async function runStartupMigrations() {
  const db = await getDb();
  if (!db) {
    console.log('[Migrations] No database connection, skipping migrations');
    return;
  }

  console.log('[Migrations] Running startup migrations...');

  // Create job_postings table if it doesn't exist
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS job_postings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titleDe VARCHAR(500) NOT NULL,
      titleEn VARCHAR(500),
      descriptionDe TEXT NOT NULL,
      descriptionEn TEXT,
      employmentType VARCHAR(100),
      department VARCHAR(255),
      location VARCHAR(255) DEFAULT 'Dortmund',
      softgardenUrl TEXT,
      status ENUM('draft','published') NOT NULL DEFAULT 'draft',
      sortOrder INT NOT NULL DEFAULT 0,
      publishedAt TIMESTAMP NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log('[Migrations] Startup migrations complete');
}
