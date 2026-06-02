"use client";

import { createAuthClient } from "better-auth/react";
import config from "./auth-config.ts";

const client = createAuthClient({
  ...config,
});
export const { signIn, signUp, useSession } = client;
