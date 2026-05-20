import { defineConfig } from "drizzle-kit";
import environment from "../shared/src/environment.ts";

const { DB_USE_SSL, DB_URL } = environment();

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
    ssl: DB_USE_SSL,
  },
});
