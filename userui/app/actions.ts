"use server";

import { cookies as getCookies } from "next/headers";
import { redirect } from "next/navigation";
// import { subjects } from "../../shared/src/auth";
//import { client, setTokens } from "./auth";

export async function auth() {
  // const cookies = await getCookies();
  // const accessToken = cookies.get("access_token");
  // const refreshToken = cookies.get("refresh_token");
  //
  // if (!accessToken) {
  //   return false;
  // }
  //
  // const verified = await client.verify(subjects, accessToken.value, {
  //   refresh: refreshToken?.value,
  // });
  //
  // if (verified.err) {
  //   return false;
  // }
  // if (verified.tokens) {
  //   await setTokens(verified.tokens.access, verified.tokens.refresh);
  // }
  //
  // return verified.subject;

  return false;
}

export async function logout() {
  const cookies = await getCookies();
  cookies.delete("access_token");
  cookies.delete("refresh_token");

  redirect("/");
}
