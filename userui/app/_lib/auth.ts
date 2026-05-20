import { createAuthClient } from "better-auth/react";

const client = createAuthClient({
  // these values are hardcoded to prevent any environment variables
  // leaking into client side code
  // TODO: make these values dynamic
  baseURL: "https://wildmanstack.localhost",
  basePath: "/auth",
  fetchOptions: {
    baseURL: "https://wildmanstack.localhost/auth",
  },
});
export const { signIn, signUp, useSession } = client;
