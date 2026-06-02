"use server";

// import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import * as v from "valibot";
import environment from "../../../shared/src/environment";
import { signUp as betterAuthSignUp, signIn } from "../_lib/auth-server.ts";

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
      callbackURL: `https://${domain}/dashboard`,
    });
    if (!result?.error) {
      const signInResult = await signIn.email({
        email: data.email!,
        password: data.password!,
      });
      if (signInResult?.error) {
        console.error(signInResult.error);
      }
      state.status = "success";
    } else {
      console.error(result?.error);
      state.message = result?.error.message;
      state.status = "error";
    }
  } catch (err) {
    state.status = "error";
    state.message = "There was an error signing up";
    console.error(err);
    return state;
  }
  if (state.status === "success") redirect("/dashboard");
  return state;
}
