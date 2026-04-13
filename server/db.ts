import { eq, desc, and, sql, like, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, articles, categories, contactSubmissions, ndaRequests, siteStyles, stylePresets, siteContent, mediaLibrary } from "../drizzle/schema";
import type { InsertArticle, InsertContactSubmission, InsertNdaRequest, InsertCategory, InsertSiteStyle, InsertStylePreset, InsertSiteContent, InsertMediaItem } from "../drizzle/schema";
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
    await db.update(siteContent).set({
      valueDe: data.valueDe,
      valueEn: data.valueEn,
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
