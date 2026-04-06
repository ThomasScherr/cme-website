import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, designPresets, InsertDesignPreset } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
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

// ── Design Preset Queries ────────────────────────────────────────────────

export async function getAllPresets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(designPresets).orderBy(designPresets.createdAt);
}

export async function getPresetById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(designPresets).where(eq(designPresets.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPreset(data: { name: string; responsiveConfig: unknown; isDefault?: number }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  // If this preset should be default, unset all others first
  if (data.isDefault) {
    await db.update(designPresets).set({ isDefault: 0 });
  }

  const result = await db.insert(designPresets).values({
    name: data.name,
    responsiveConfig: data.responsiveConfig,
    isDefault: data.isDefault ?? 0,
  });

  return { id: Number(result[0].insertId) };
}

export async function updatePreset(id: number, data: { name?: string; responsiveConfig?: unknown; isDefault?: number }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  // If setting as default, unset all others first
  if (data.isDefault) {
    await db.update(designPresets).set({ isDefault: 0 });
  }

  const updateSet: Record<string, unknown> = {};
  if (data.name !== undefined) updateSet.name = data.name;
  if (data.responsiveConfig !== undefined) updateSet.responsiveConfig = data.responsiveConfig;
  if (data.isDefault !== undefined) updateSet.isDefault = data.isDefault;

  if (Object.keys(updateSet).length > 0) {
    await db.update(designPresets).set(updateSet).where(eq(designPresets.id, id));
  }
}

export async function deletePreset(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.delete(designPresets).where(eq(designPresets.id, id));
}

export async function setPresetAsDefault(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  // Unset all defaults
  await db.update(designPresets).set({ isDefault: 0 });
  // Set the chosen one
  await db.update(designPresets).set({ isDefault: 1 }).where(eq(designPresets.id, id));
}

export async function clearPresetDefault(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  await db.update(designPresets).set({ isDefault: 0 }).where(eq(designPresets.id, id));
}
