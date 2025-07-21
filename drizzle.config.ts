import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "091539408595ba99a0ef106d42391d5b",
    // Use development database for local development, production for production
    databaseId: process.env.NODE_ENV === "production" 
      ? process.env.CLOUDFLARE_D1_DATABASE_ID_PROD || "101bf744-d0ac-4832-b6b2-e56eabbebe31"
      : process.env.CLOUDFLARE_D1_DATABASE_ID_DEV || "3f5e54bf-b024-43ac-9061-cd14bb018101",
    token: process.env.CLOUDFLARE_API_TOKEN || "",
  },
});