import { cookies as getCookies } from "next/headers";
import * as v from "valibot";

export const subjects = v.object({
  user: v.object({
    id: v.string(),
  }),
});

export type SubjectSchema = v.InferOutput<typeof subjects>;

export async function setTokens(access: string, refresh: string) {
  const cookies = await getCookies();

  cookies.set({
    name: "access_token",
    value: access,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  });
  cookies.set({
    name: "refresh_token",
    value: refresh,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  });
}
