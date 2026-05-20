import { drizzle } from "drizzle-orm/node-postgres";
import environment from "../../../shared/src/environment.ts";
import * as schema from "./schema.ts";

const { DB_URL, BACKEND_DEBUG } = environment();

const database = () =>
  drizzle({ connection: DB_URL, logger: BACKEND_DEBUG, schema });

export { database };
export default database;
