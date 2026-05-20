"use server";

import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import * as v from "valibot";
import environment from "../../../shared/src/environment";
import { signUp as betterAuthSignUp } from "../_lib/auth";

const SignUpFormSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email"),
    v.email("The email is badly formatted"),
    v.maxLength(200, "Your email is too long"),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter a valid password"),
    v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    v.regex(/[A-Z]/, "Your password must contain an uppercase letter."),
    v.regex(/[0-9]/, "Your password must contain a number."),
    v.minLength(12, "Password has too few characters"),
    v.maxLength(300, "Password is too long"),
  ),
  username: v.pipe(
    v.string(),
    v.nonEmpty("Username is required"),
    v.minLength(4, "Username has too few characters"),
    v.maxLength(200, "Username is too long"),
  ),
});

export type SignUpFormState = {
  status: "error" | "success";
  message?: string;
  data?: {
    username?: string;
    email?: string;
    password?: string;
  };
  validation?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function signUp(_initialState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    username: formData.get("username")?.toString(),
  };
  const state: SignUpFormState = { status: "error", data };
  const valid = v.safeParse(SignUpFormSchema, data);
  const { DOMAIN: domain } = environment();

  if (!valid.success) {
    state.validation = v.flatten(valid.issues).nested;
    state.message = "Could not sign you up";
    return state;
  }

  try {
    const result = await betterAuthSignUp.email({
      email: data.email!,
      password: data.password!,
      name: data.username!,
    });
    console.log(result, domain);
    // const response = await fetch(`https://${domain}/auth/api/auth/register`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // state = (await response.json()) as SignUpFormState;
    // if (!response.ok) {
    //   console.error("Signup error:", response.status, response.statusText);
    //   if (response.status === 409) {
    //     const headers = await getHeaders();
    //     const IP = headers.get("x-forwarded-for");
    //     console.error("Attempted to Sign Up existing user, from IP:", IP);
    //   }
    //   state.status = "error";
    //   return state;
    // }
  } catch (err) {
    state.status = "error";
    console.error(err);
  }
  if (state.status === "success") redirect("/login");
  return state;
}
