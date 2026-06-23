import * as v from "valibot";

const validateGenericSchema = <T>(
  schema: v.GenericSchema,
  data: T,
): [boolean, v.FlatErrors<v.GenericSchema>["nested"] | null] => {
  let errors: v.FlatErrors<v.GenericSchema>["nested"];
  const result = v.safeParse(schema, data);
  if (result.issues) {
    errors = v.flatten<typeof schema>(result.issues).nested;
    return [result.success, errors];
  }
  return [result.success, null];
};

const UserSchema = v.object({
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
  fullname: v.pipe(
    v.string(),
    v.nonEmpty("Your full name is required"),
    v.minLength(2, "Your name has too few characters"),
    v.maxLength(200, "Your name is too long"),
  ),
});

export type User = v.InferInput<typeof UserSchema>;
const validateUser = (data: User) => validateGenericSchema(UserSchema, data);

const LoginSchema = v.object({
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
});

export type Login = v.InferInput<typeof LoginSchema>;
const validateLogin = (login: Login) =>
  validateGenericSchema(LoginSchema, login);

export { validateUser, validateLogin };
