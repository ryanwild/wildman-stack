import { integer, pgSchema, varchar } from "drizzle-orm/pg-core";
import environment from "../../../shared/src/environment.ts";

const { DB_NAME } = environment();
export const dbSchema = pgSchema(DB_NAME);
export const usersTable = dbSchema.table("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
});
