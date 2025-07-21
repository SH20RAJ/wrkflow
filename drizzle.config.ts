import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "091539408595ba99a0ef106d42391d5b",
    databaseId: "101bf744-d0ac-4832-b6b2-e56eabbebe31",
    token: process.env.CLOUDFLARE_API_TOKEN || "",
  },
});