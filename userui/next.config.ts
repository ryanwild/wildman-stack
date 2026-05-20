import type { NextConfig } from "next";
import environment from "../shared/src/environment";

const { DOMAIN } = environment();
// const { NEXT_ALLOWED_DEV_ORIGIN } = process.env;
// const allowedDevOrigins = NEXT_ALLOWED_DEV_ORIGIN
//   ? [NEXT_ALLOWED_DEV_ORIGIN]
//   : undefined;

const nextConfig: NextConfig = {
  allowedDevOrigins: [DOMAIN],
  rewrites: async () => {
    return [{ source: "/health", destination: "/api/health" }];
  },
};

export default nextConfig;
