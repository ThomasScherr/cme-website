import { int, json, mysqlEnum, mysqlTable, text, timestamp, tinyint, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
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
 * Design Presets – persistent storage for Style Guide presets.
 * Stores the full responsive config (desktop/tablet/mobile tokens, diamonds, section heights).
 */
export const designPresets = mysqlTable("design_presets", {
  id: int("id").autoincrement().primaryKey(),
  /** Human-readable name of the preset */
  name: varchar("name", { length: 255 }).notNull(),
  /** Whether this preset is loaded on startup */
  isDefault: tinyint("isDefault").default(0).notNull(),
  /** Full responsive config as JSON (desktop, tablet, mobile tokens + diamonds + sectionHeights) */
  responsiveConfig: json("responsiveConfig").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DesignPreset = typeof designPresets.$inferSelect;
export type InsertDesignPreset = typeof designPresets.$inferInsert;
