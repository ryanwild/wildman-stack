"use server";

import {
  createAuthClient,
  RequestContext,
  ResponseContext,
} from "better-auth/react";
import { headers } from "next/headers";
import { cookies as getCookies } from "next/headers";
import config from "./auth-config.ts";
import cookie from "cookie";

const client = createAuthClient({
  ...config,
  fetchOptions: {
    ...config.fetchOptions,
    onResponse: async (context: ResponseContext) => {
      const setCookieHeader = context.response.headers.get("Set-Cookie");
      if (setCookieHeader) {
        try {
          const parsedCookie = cookie.parseSetCookie(setCookieHeader);
          if (parsedCookie.value && parsedCookie.maxAge) {
            setNextJsCookie(parsedCookie.value, parsedCookie.maxAge);
          }
        } catch (err) {
          console.error("Cannot parse cookie:", err);
          throw new Error("Cannot authenticate");
        }
      }
    },
    onRequest: async (context: RequestContext) => {
      const headersList = new Headers(await headers());
      const cookie = headersList.get("Cookie");
      if (cookie) {
        // context.headers.set("Cookie", cookie!)
        const authCookies = cookie
          .split(";")
          .map((c) => c.trim())
          .filter(
            (c) =>
              c.startsWith(`${config.advanced.cookiePrefix}.`) ||
              c.startsWith(`__Secure-${config.advanced.cookiePrefix}.`),
          )
          .join("; ");

        if (authCookies) {
          context.headers.set("Cookie", authCookies);
        }
      }
    },
  },
});
const setNextJsCookie = async (value: string, maxAge: number) => {
  const nextJsCookies = await getCookies();
  nextJsCookies.set({
    name: `__Secure-${config.advanced.cookiePrefix}.session_token`,
    value,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
};

export const { signIn, signUp, getSession } = client;
