import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { env } from '@/lib/env';

// Create a singleton for the database connection
let db: ReturnType<typeof createDrizzle>;

function createDrizzle() {
    const client = createClient({
        url: env.DATABASE_URL,
        authToken: env.DATABASE_AUTH_TOKEN,
    });

    return drizzle(client);
}

// Get the database instance (creates it if it doesn't exist)
export function getDb() {
    if (!db) {
        db = createDrizzle();
    }
    return db;
}

// For direct use when you know the db is already initialized
export { db };