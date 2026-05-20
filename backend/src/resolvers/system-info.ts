import environment from "../../../shared/src/environment.ts";
import { databaseAvailable } from "../db/query.ts";

const { BACKEND_DEBUG } = environment();

export type SystemInfo = {
  uptimeInSeconds: number;
  ready: boolean;
};

const systemInfo = async (): Promise<SystemInfo> => {
  const uptimeInSeconds = BACKEND_DEBUG ? Math.floor(process.uptime()) : 0;
  const ready = await databaseAvailable();
  return {
    uptimeInSeconds,
    ready,
  };
};

export default systemInfo;
