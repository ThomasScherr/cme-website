import { eq, desc, and, sql, like, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, articles, categories, contactSubmissions, ndaRequests, siteStyles, stylePresets, siteContent, mediaLibrary, notFoundLogs, redirects } from "../drizzle/schema";
import type { InsertArticle, InsertContactSubmission, InsertNdaRequest, InsertCategory, InsertSiteStyle, InsertStylePreset, InsertSiteContent, InsertMediaItem, InsertNotFoundLog, InsertRedirect } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ── User Queries ────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── Category Queries ────────────────────────────────────────────

export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.name);
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(data: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(categories).values(data);
  return { id: Number(result[0].insertId) };
}

export async function updateCategory(id: number, data: Partial<InsertCategory>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(categories).set(data).where(eq(categories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(categories).where(eq(categories.id, id));
}

// ── Article Queries ─────────────────────────────────────────────

export async function getPublishedArticles(limit = 20, offset = 0, categoryId?: number) {
  const db = await getDb();
  if (!db) return [];

  if (categoryId) {
    return db.select().from(articles)
      .where(and(eq(articles.status, "published"), eq(articles.categoryId, categoryId)))
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);
  }

  return db.select().from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getAllArticles(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articles)
    .orderBy(desc(articles.updatedAt))
    .limit(limit)
    .offset(offset);
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createArticle(data: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  // Calculate reading time (~200 words per minute)
  const wordCount = data.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const result = await db.insert(articles).values({
    ...data,
    readingTime,
    publishedAt: data.status === "published" ? new Date() : null,
  });
  return { id: Number(result[0].insertId) };
}

export async function updateArticle(id: number, data: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  const updateSet: Record<string, unknown> = { ...data };

  // Recalculate reading time if content changed
  if (data.content) {
    const wordCount = data.content.split(/\s+/).length;
    updateSet.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  // Set publishedAt when first published
  if (data.status === "published") {
    const existing = await getArticleById(id);
    if (existing && !existing.publishedAt) {
      updateSet.publishedAt = new Date();
    }
  }

  await db.update(articles).set(updateSet).where(eq(articles.id, id));
}

export async function deleteArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(articles).where(eq(articles.id, id));
}

// ── Contact Submission Queries ──────────────────────────────────

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(contactSubmissions).values(data);
  return { id: Number(result[0].insertId) };
}

export async function getAllContactSubmissions(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function markContactAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id));
}

// ── NDA Request Queries ───────────────────────────────────────────

export async function createNdaRequest(data: InsertNdaRequest) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(ndaRequests).values(data);
  return { id: Number(result[0].insertId) };
}

export async function getAllNdaRequests(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ndaRequests)
    .orderBy(desc(ndaRequests.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function markNdaWebhookSent(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(ndaRequests).set({ webhookSent: true }).where(eq(ndaRequests.id, id));
}

export async function markNdaProcessed(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(ndaRequests).set({ isProcessed: true }).where(eq(ndaRequests.id, id));
}

// ── Site Styles Queries (Singleton) ────────────────────────────

export async function getSiteStyles() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(siteStyles).where(eq(siteStyles.id, 1)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertSiteStyles(stylesJson: string) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  // Try update first, then insert if no rows affected
  const existing = await getSiteStyles();
  if (existing) {
    await db.update(siteStyles).set({ styles: stylesJson }).where(eq(siteStyles.id, 1));
  } else {
    await db.insert(siteStyles).values({ id: 1, styles: stylesJson });
  }
}

// ── Style Presets Queries ──────────────────────────────────────

export async function getAllStylePresets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(stylePresets).orderBy(desc(stylePresets.createdAt));
}

export async function createStylePreset(data: { name: string; styles: string }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(stylePresets).values(data);
  return { id: Number(result[0].insertId) };
}

export async function deleteStylePreset(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(stylePresets).where(eq(stylePresets.id, id));
}

// ── CMS: Site Content Queries ─────────────────────────────────────────────

/** Get all content entries for a given page (prefix match on contentKey) */
export async function getContentByPage(pageKey: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent)
    .where(like(siteContent.contentKey, `${pageKey}.%`));
}

/** Get all site content (for bulk loading) */
export async function getAllContent() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent);
}

/** Get a single content entry by key */
export async function getContentByKey(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteContent)
    .where(eq(siteContent.contentKey, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/** Get multiple content entries by keys */
export async function getContentByKeys(keys: string[]) {
  const db = await getDb();
  if (!db) return [];
  if (keys.length === 0) return [];
  return db.select().from(siteContent)
    .where(inArray(siteContent.contentKey, keys));
}

/** Upsert a content entry (insert or update) */
export async function upsertContent(data: InsertSiteContent) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const existing = await getContentByKey(data.contentKey);
  if (existing) {
    // Always explicitly set valueDe/valueEn (even empty string) so deletions are persisted
    await db.update(siteContent).set({
      valueDe: data.valueDe !== undefined ? data.valueDe : existing.valueDe,
      valueEn: data.valueEn !== undefined ? data.valueEn : existing.valueEn,
      contentType: data.contentType,
    }).where(eq(siteContent.contentKey, data.contentKey));
    return { id: existing.id };
  } else {
    const result = await db.insert(siteContent).values(data);
    return { id: Number(result[0].insertId) };
  }
}

/** Bulk upsert multiple content entries */
export async function bulkUpsertContent(entries: InsertSiteContent[]) {
  for (const entry of entries) {
    await upsertContent(entry);
  }
}

/** Delete a content entry by key */
export async function deleteContent(key: string) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(siteContent).where(eq(siteContent.contentKey, key));
}

// ── CMS: Media Library Queries ───────────────────────────────────────────

/** Get all media items, newest first */
export async function getAllMedia(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaLibrary)
    .orderBy(desc(mediaLibrary.uploadedAt))
    .limit(limit)
    .offset(offset);
}

/** Get media items filtered by MIME type prefix (e.g. 'image/', 'video/') */
export async function getMediaByType(typePrefix: string, limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaLibrary)
    .where(like(mediaLibrary.mimeType, `${typePrefix}%`))
    .orderBy(desc(mediaLibrary.uploadedAt))
    .limit(limit);
}

/** Add a new media item */
export async function createMediaItem(data: InsertMediaItem) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(mediaLibrary).values(data);
  return { id: Number(result[0].insertId) };
}

/** Delete a media item */
export async function deleteMediaItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
}

/** Find a media item by filename and file size (for deduplication) */
export async function findMediaByFilenameAndSize(filename: string, fileSize: number) {
  const db = await getDb();
  if (!db) return null;
  const results = await db.select().from(mediaLibrary)
    .where(and(eq(mediaLibrary.filename, filename), eq(mediaLibrary.fileSize, fileSize)))
    .limit(1);
  return results[0] || null;
}

/** Search media by filename or tags */
export async function searchMedia(query: string, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaLibrary)
    .where(
      sql`${mediaLibrary.filename} LIKE ${`%${query}%`} OR ${mediaLibrary.tags} LIKE ${`%${query}%`}`
    )
    .orderBy(desc(mediaLibrary.uploadedAt))
    .limit(limit);
}

// ── 404 Not Found Log Queries ──────────────────────────────────

/** Log a 404 hit – upsert by path (increment hitCount if exists) */
export async function log404(data: { path: string; referrer?: string; userAgent?: string; ip?: string }) {
  const db = await getDb();
  if (!db) return;

  // Anonymize IP: zero last octet for IPv4, last group for IPv6
  let anonIp = data.ip || null;
  if (anonIp) {
    if (anonIp.includes('.')) {
      anonIp = anonIp.replace(/\.\d+$/, '.0');
    } else if (anonIp.includes(':')) {
      anonIp = anonIp.replace(/:[^:]+$/, ':0');
    }
  }

  // Check if path already exists
  const existing = await db.select().from(notFoundLogs)
    .where(eq(notFoundLogs.path, data.path)).limit(1);

  if (existing.length > 0) {
    // Increment hit count and update metadata
    await db.update(notFoundLogs).set({
      hitCount: sql`${notFoundLogs.hitCount} + 1`,
      referrer: data.referrer || existing[0].referrer,
      userAgent: data.userAgent || existing[0].userAgent,
      ip: anonIp || existing[0].ip,
    }).where(eq(notFoundLogs.id, existing[0].id));
  } else {
    await db.insert(notFoundLogs).values({
      path: data.path,
      referrer: data.referrer || null,
      userAgent: data.userAgent || null,
      ip: anonIp,
    });
  }
}

/** Get all 404 logs sorted by hit count (most frequent first) */
export async function getAll404Logs(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(notFoundLogs)
    .orderBy(desc(notFoundLogs.hitCount))
    .limit(limit)
    .offset(offset);
}

/** Delete a 404 log entry */
export async function delete404Log(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(notFoundLogs).where(eq(notFoundLogs.id, id));
}

/** Clear all 404 logs */
export async function clearAll404Logs() {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(notFoundLogs);
}

// ── Redirect Queries ───────────────────────────────────────────

/** Get all redirects (admin list) */
export async function getAllRedirects(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(redirects)
    .orderBy(desc(redirects.updatedAt))
    .limit(limit)
    .offset(offset);
}

/** Get all active redirects (for middleware lookup) */
export async function getActiveRedirects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(redirects)
    .where(eq(redirects.isActive, true));
}

/** Find a redirect by source path */
export async function findRedirectByPath(sourcePath: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(redirects)
    .where(and(eq(redirects.sourcePath, sourcePath), eq(redirects.isActive, true)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/** Create a new redirect */
export async function createRedirect(data: InsertRedirect) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(redirects).values(data);
  return { id: Number(result[0].insertId) };
}

/** Update a redirect */
export async function updateRedirect(id: number, data: Partial<InsertRedirect>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(redirects).set(data).where(eq(redirects.id, id));
}

/** Delete a redirect */
export async function deleteRedirect(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(redirects).where(eq(redirects.id, id));
}

/** Increment redirect hit count */
export async function incrementRedirectHitCount(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(redirects).set({
    hitCount: sql`${redirects.hitCount} + 1`,
  }).where(eq(redirects.id, id));
}

/** Create redirect from a 404 log (convenience: copies path, deletes log entry) */
export async function createRedirectFrom404(logId: number, targetUrl: string, statusCode = 301) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  const logEntry = await db.select().from(notFoundLogs)
    .where(eq(notFoundLogs.id, logId)).limit(1);
  if (logEntry.length === 0) throw new Error('404 log entry not found');

  const result = await createRedirect({
    sourcePath: logEntry[0].path,
    targetUrl,
    statusCode,
    note: `Erstellt aus 404-Log (${logEntry[0].hitCount} Aufrufe)`,
  });

  // Delete the 404 log entry since it's now handled
  await delete404Log(logId);

  return result;
}
