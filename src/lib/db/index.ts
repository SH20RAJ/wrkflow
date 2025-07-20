import { drizzle } from 'drizzle-orm/d1';

// Type for Cloudflare environment
interface CloudflareEnv {
  DB: D1Database;
}

// For Cloudflare Workers environment with OpenNext
export function createDb(binding: D1Database): ReturnType<typeof drizzle> {
  return drizzle(binding);
}

// Global database instance (lazy-loaded)
let dbInstance: ReturnType<typeof drizzle> | null = null;

// Access D1 Database through Cloudflare Workers binding
function getD1Binding(): D1Database {
  // In Cloudflare Workers environment, bindings should be available on the global scope
  if (typeof globalThis !== 'undefined') {
    const env = (globalThis as unknown as CloudflareEnv);
    if (env.DB) {
      return env.DB;
    }
  }
  
  // Check process.env as fallback
  if (typeof process !== 'undefined' && process.env) {
    const env = process.env as unknown as CloudflareEnv;
    if (env.DB) {
      return env.DB;
    }
  }
  
  throw new Error('D1 Database binding not found. Ensure you are running in Cloudflare Workers environment with proper D1 binding.');
}

// Lazy-loaded database instance getter
export function getDb(): ReturnType<typeof drizzle> {
  if (!dbInstance) {
    try {
      const binding = getD1Binding();
      dbInstance = createDb(binding);
    } catch (error) {
      // During build time, we might not have the binding, so we'll throw a more specific error
      throw new Error(`Database not available: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  return dbInstance;
}

// Export a getter function instead of a direct instance to avoid initialization during build
export const db = {
  get instance() {
    return getDb();
  }
};