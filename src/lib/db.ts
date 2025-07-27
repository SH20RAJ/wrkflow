import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./db/schema";

export function getDB() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!authToken) {
    throw new Error("DATABASE_AUTH_TOKEN is not set");
  }

  const client = createClient({
    url,
    authToken,
  });

  return drizzle(client, { schema });
}
