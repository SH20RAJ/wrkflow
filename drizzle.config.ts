import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts", 
  out: "./drizzle",
  dbCredentials: {
    url: "libsql://wrkflow-sh20raj.aws-us-east-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTI3Mjc1MTksImlkIjoiMWFjYzdmODYtYmFmZC00MGExLTg3NWQtNjY0YjM0OGI0OGRmIiwicmlkIjoiYTlmNzdjNzItZjUwZi00ZGE1LTk4MjktODU4YzljMjYzYTY4In0.qNpq1NZAarxHBPo0JWYTITHgyW2mFOncimCAYWIOst_RGlCMbqRJMz-piKh2l5u84fVoS12xmsgqWrGwigYdAg",
  },
});