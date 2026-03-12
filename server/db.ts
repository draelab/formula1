import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, apiCache } from "../drizzle/schema";
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

// ─── API Cache ────────────────────────────────────────────────────────────────

// In-memory layer for fast reads (populated from DB on miss)
const memCache = new Map<string, { data: any; cachedAt: string }>();

export async function cacheSet(key: string, data: any): Promise<void> {
  const cachedAt = new Date().toISOString();
  memCache.set(key, { data, cachedAt });

  const db = await getDb();
  if (!db) return;

  try {
    const json = JSON.stringify(data);
    await db.insert(apiCache).values({ key, data: json, cachedAt: new Date() })
      .onDuplicateKeyUpdate({ set: { data: json, cachedAt: new Date() } });
  } catch (err) {
    console.warn("[Cache] Failed to write to DB:", err);
  }
}

export async function cacheGet(key: string): Promise<any | null> {
  // Try in-memory first
  const mem = memCache.get(key);
  if (mem) return { ...mem.data, updatedAt: mem.cachedAt, fromCache: true };

  // Fall back to DB
  const db = await getDb();
  if (!db) return null;

  try {
    const rows = await db.select().from(apiCache).where(eq(apiCache.key, key)).limit(1);
    if (rows.length === 0) return null;

    const parsed = JSON.parse(rows[0].data);
    const cachedAt = rows[0].cachedAt.toISOString();
    // Populate in-memory cache for next time
    memCache.set(key, { data: parsed, cachedAt });
    return { ...parsed, updatedAt: cachedAt, fromCache: true };
  } catch (err) {
    console.warn("[Cache] Failed to read from DB:", err);
    return null;
  }
}
