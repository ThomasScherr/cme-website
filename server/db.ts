import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, articles, categories, contactSubmissions } from "../drizzle/schema";
import type { InsertArticle, InsertContactSubmission, InsertCategory } from "../drizzle/schema";
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
