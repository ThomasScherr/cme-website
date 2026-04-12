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
