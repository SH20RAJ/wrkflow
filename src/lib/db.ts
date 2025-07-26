import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./db/schema";

interface D1QueryResult {
  results: unknown[];
  meta: {
    changes?: number;
    duration?: number;
    last_row_id?: number;
  };
  success: boolean;
}

interface D1Response {
  result: D1QueryResult[];
  success: boolean;
}

// Create a simple HTTP-based D1 client for development
function createHttpD1Client() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID || "101bf744-d0ac-4832-b6b2-e56eabbebe31";
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !databaseId || !token) {
    throw new Error("Missing Cloudflare credentials for D1 HTTP client");
  }

  return {
    async prepare(query: string) {
      return {
        async all(params: unknown[] = []) {
          try {
            const response = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sql: query, params }),
                signal: AbortSignal.timeout(30000), // 30 second timeout
              }
            );
            
            if (!response.ok) {
              const error = await response.text();
              throw new Error(`Database query failed: ${error}`);
            }
            
            const data = await response.json() as D1Response;
            return {
              results: data.result?.[0]?.results || [],
              meta: data.result?.[0]?.meta || {},
              success: data.success
            };
          } catch (error) {
            console.error('D1 HTTP query failed:', error);
            // Return empty results instead of throwing to prevent app crashes
            return {
              results: [],
              meta: {},
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            };
          }
        },
        async run(params: unknown[] = []) {
          try {
            const response = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sql: query, params }),
                signal: AbortSignal.timeout(30000), // 30 second timeout
              }
            );
            
            if (!response.ok) {
              const error = await response.text();
              throw new Error(`Database query failed: ${error}`);
            }
            
            const data = await response.json() as D1Response;
            return {
              changes: data.result?.[0]?.meta?.changes || 0,
              duration: data.result?.[0]?.meta?.duration || 0,
              last_row_id: data.result?.[0]?.meta?.last_row_id || null,
              success: data.success
            };
          } catch (error) {
            console.error('D1 HTTP query failed:', error);
            // Return empty results instead of throwing to prevent app crashes
            return {
              changes: 0,
              duration: 0,
              last_row_id: null,
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            };
          }
        }
      };
    }
  };
}

export function getDB() {
  // Try to use Cloudflare Workers binding first (for production and wrangler dev)
  try {
    const { env } = getCloudflareContext();
    if (env?.DB) {
      console.info('Using Cloudflare Workers D1 binding');
      return drizzle(env.DB, { schema });
    }
  } catch {
    // If binding is not available, fall back to HTTP client
    console.info('Cloudflare Workers binding not available, using HTTP client');
  }
  
  // Use HTTP client for Next.js dev server
  try {
    const httpClient = createHttpD1Client();
    console.info('Using D1 HTTP client for database access');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return drizzle(httpClient as any, { schema });
  } catch (error) {
    console.error('Failed to create D1 client:', error);
    throw new Error('Database connection failed. Please check your Cloudflare credentials.');
  }
}
