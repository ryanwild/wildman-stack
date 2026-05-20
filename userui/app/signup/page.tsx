"use client";

import { Pencil2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  TextField,
  Callout,
} from "@radix-ui/themes";
import Form from "next/form";
import { Label } from "radix-ui";
import { useActionState } from "react";
import { signUp, SignUpFormState } from "./action";
import InputError from "../_components/input-error";

const initialState: SignUpFormState = {
  status: "success",
};

export default function SignUp() {
  const [state, formAction, pending] = useActionState(signUp, initialState);
  return (
    <Container size="1" pt="8">
      <Form action={formAction}>
        <Flex gap="4" direction="column" justify="between" display="flex">
          <Heading as="h1" align="center">
            Sign Up
          </Heading>
          <Label.Root className="LabelRoot" htmlFor="register-email">
            Email
          </Label.Root>
          <TextField.Root
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            defaultValue={state?.data?.email}
          />
          <InputError inputError={state?.validation?.email} />
          <Label.Root className="LabelRoot" htmlFor="register-username">
            Username
          </Label.Root>
          <TextField.Root
            id="register-username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Usesrname"
            defaultValue={state.data?.username}
          />
          <InputError inputError={state?.validation?.username} />
          <Label.Root className="LabelRoot" htmlFor="register-password">
            Password
          </Label.Root>
          <TextField.Root
            id="register-password"
            name="password"
            type="password"
            placeholder="Password"
            defaultValue={state.data?.password}
          />
          <InputError inputError={state?.validation?.password} />
          <Box width="100%" pt="2">
            <Button type="submit" loading={pending}>
              <Pencil2Icon /> Sign Up
            </Button>
          </Box>
          {state?.message && (
            <Callout.Root color="blue" size="1">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{state.message}</Callout.Text>
            </Callout.Root>
          )}
        </Flex>
      </Form>
    </Container>
  );
}
