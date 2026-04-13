import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Blog categories for organizing articles (e.g., "Leistungselektronik", "EMV", "Fertigung")
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Blog articles / Engineering Insights
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  /** URL-friendly slug */
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  /** Article title */
  title: varchar("title", { length: 500 }).notNull(),
  /** Short excerpt for previews and SEO meta description */
  excerpt: text("excerpt"),
  /** Full article content in Markdown */
  content: text("content").notNull(),
  /** Cover image URL */
  coverImage: text("coverImage"),
  /** Author name */
  author: varchar("author", { length: 255 }).default("CME Redaktion").notNull(),
  /** Publication status */
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  /** Category ID */
  categoryId: int("categoryId"),
  /** Comma-separated tags for SEO */
  tags: text("tags"),
  /** SEO meta title (optional, falls back to title) */
  metaTitle: varchar("metaTitle", { length: 255 }),
  /** SEO meta description (optional, falls back to excerpt) */
  metaDescription: text("metaDescription"),
  /** ── English translation fields (auto-generated via OpenAI) ── */
  titleEn: varchar("titleEn", { length: 500 }),
  excerptEn: text("excerptEn"),
  contentEn: text("contentEn"),
  tagsEn: text("tagsEn"),
  metaTitleEn: varchar("metaTitleEn", { length: 255 }),
  metaDescriptionEn: text("metaDescriptionEn"),
  /** Reading time in minutes (calculated on save) */
  readingTime: int("readingTime").default(5),
  /** Published date (set when status changes to published) */
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Contact form submissions
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  /** Salutation: Herr, Frau, Keine Angabe */
  salutation: varchar("salutation", { length: 50 }),
  /** Academic title (Dr., Prof., etc.) – optional */
  title: varchar("title", { length: 100 }),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  /** Track which page the submission came from */
  source: varchar("source", { length: 100 }),
  /** Whether the submission has been read/processed */
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * NDA requests – separate from general contact submissions
 * Stores minimal data needed to trigger NDA template dispatch via webhook
 */
export const ndaRequests = mysqlTable("nda_requests", {
  id: int("id").autoincrement().primaryKey(),
  /** Salutation: Herr, Frau, Keine Angabe */
  salutation: varchar("salutation", { length: 50 }).notNull(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  /** Topic context from the slider */
  topic: varchar("topic", { length: 500 }),
  /** Source page */
  source: varchar("source", { length: 100 }),
  /** Whether webhook was successfully triggered */
  webhookSent: boolean("webhookSent").default(false).notNull(),
  /** Whether the request has been processed */
  isProcessed: boolean("isProcessed").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NdaRequest = typeof ndaRequests.$inferSelect;
export type InsertNdaRequest = typeof ndaRequests.$inferInsert;

/**
 * Site stylesheet settings – singleton row (id=1)
 * Stores all customizable CSS variables as a JSON blob
 */
export const siteStyles = mysqlTable("site_styles", {
  id: int("id").autoincrement().primaryKey(),
  /** JSON blob with all style tokens */
  styles: text("styles").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteStyle = typeof siteStyles.$inferSelect;
export type InsertSiteStyle = typeof siteStyles.$inferInsert;

/**
 * Saved style presets – named configurations that can be loaded
 * Presets are never auto-overwritten; user must explicitly choose to load/delete them
 */
export const stylePresets = mysqlTable("style_presets", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  /** JSON blob with all style tokens (same structure as siteStyles.styles) */
  styles: text("styles").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StylePreset = typeof stylePresets.$inferSelect;
export type InsertStylePreset = typeof stylePresets.$inferInsert;

/**
 * CMS: Editable site content – every text, image and video on every page
 * contentKey format: "pageKey.sectionKey.fieldKey" (e.g. "home.hero.headline")
 */
export const siteContent = mysqlTable("site_content", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique content key, e.g. "home.hero.headline" */
  contentKey: varchar("contentKey", { length: 255 }).notNull().unique(),
  /** Content type: text, richtext, image, video */
  contentType: mysqlEnum("contentType", ["text", "richtext", "image", "video"]).notNull(),
  /** German value */
  valueDe: text("valueDe"),
  /** English value */
  valueEn: text("valueEn"),
  /** Updated timestamp */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;

/**
 * CMS: Media library – all uploaded assets for reuse across the site
 */
export const mediaLibrary = mysqlTable("media_library", {
  id: int("id").autoincrement().primaryKey(),
  /** CDN URL of the uploaded file */
  url: text("url").notNull(),
  /** Original filename */
  filename: varchar("filename", { length: 500 }).notNull(),
  /** MIME type (image/jpeg, video/mp4, etc.) */
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  /** File size in bytes */
  fileSize: int("fileSize").default(0).notNull(),
  /** Comma-separated tags for search/filter */
  tags: text("tags"),
  /** Alt text for accessibility */
  altText: varchar("altText", { length: 500 }),
  /** Upload timestamp */
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type MediaItem = typeof mediaLibrary.$inferSelect;
export type InsertMediaItem = typeof mediaLibrary.$inferInsert;
