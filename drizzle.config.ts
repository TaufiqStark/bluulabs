import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ["public"], // IMPORTANT: Ignore Supabase internal schemas (auth, storage, etc) to prevent introspection crashes
} satisfies Config;
