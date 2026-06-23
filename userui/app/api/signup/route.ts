"use server";

import type { NextRequest } from "next/server";
import { authServer } from "../../../lib/auth-server";
import { validateUser } from "../../../lib/validation.ts";
import { isAPIError } from "better-auth/api";
import { headers as appHeaders } from "next/headers";

export type SignUpFormState = {
  message?: string;
  data?: {
    fullname?: string;
    email?: string;
    password?: string;
  };
  validation?: {
    fullname?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function POST(req: NextRequest) {
  const jsonData = await req.json();
  const data = {
    email: jsonData?.email ?? "",
    password: jsonData?.password ?? "",
    fullname: jsonData?.fullname ?? "",
  };
  const state: SignUpFormState = { data };
  const [valid, validationErrors] = validateUser(data);
  if (!valid) {
    state.validation = validationErrors as SignUpFormState["validation"];
    state.message = "Could not sign you up";
    return Response.json(state, { status: 422 });
  }
  try {
    const {
      response: { user },
    } = await authServer.api.signUpEmail({
      returnHeaders: true,
      body: {
        email: data.email!,
        password: data.password!,
        name: data.fullname!,
      },
    });
    const responseHeaders = new Headers();
    if (user) {
      const { headers } = await authServer.api.signInEmail({
        returnHeaders: true,
        body: {
          email: user.email,
          password: data.password,
        },
        headers: await appHeaders(),
      });
      const responseCookies = headers.getSetCookie();
      responseCookies?.forEach((c) => {
        responseHeaders.set("set-cookie", c);
      });
    } else {
      throw new Error("User object not returned");
    }
    return Response.json(state, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    if (isAPIError(error)) {
      state.message = "There was an error signing up";
    } else {
      state.message = "There was an unknown error signing up";
    }
    console.error(error);
    return Response.json(state, { status: 500 });
  }
}
