import { betterAuth } from "better-auth";
import { Pool } from "pg";
import environment from "../../../shared/src/environment.ts";

const { DOMAIN, DB_URL } = environment();
const database = new Pool({
  connectionString: DB_URL,
});
export const auth = betterAuth({
  appName: "Wildman Stack Auth",
  database,
  trustedOrigins: [`https://${DOMAIN}`],
  emailAndPassword: {
    enabled: true,
  },
  telemetry: {
    enabled: false,
  },
  debug: true,
});
