//import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
//import environment from "../../../shared/src/environment";

export async function login() {
  //const { DOMAIN: domain } = environment();
  //const cookies = await getCookies();
  //const accessToken = cookies.get("access_token");
  //const refreshToken = cookies.get("refresh_token");
  //const host = `https://${domain}`;

  //   const verified = await client.verify(subjects, accessToken.value, {
  //     refresh: refreshToken?.value,
  //   });
  //   if (!verified.err && verified.tokens) {
  //     await setTokens(verified.tokens.access, verified.tokens.refresh);
  //     redirect("/");
  //   }
  // }
  //
  // const { url } = await client.authorize(
  //   `${protocol}://${host}/api/callback`,
  //   "code",
  // );
  // console.log(">>>>>>>>> url:", url);
  const url = "/";
  redirect(url);
}
