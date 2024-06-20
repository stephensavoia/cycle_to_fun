import { json, type ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

import { Label, Input } from "~/components/forms/input";
import { Button } from "~/components/forms/button";

import { validate } from "./validate";
import { createAccount, cookie } from "~/auth/auth";

export const meta = () => {
  return [{ title: "Create an Account | Cycle TO Fun" }];
};

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();

  let username = String(formData.get("username") || "");
  let email = String(formData.get("email") || "");
  let password = String(formData.get("password") || "");

  let errors = await validate(username, email, password);
  if (errors) {
    return json({ ok: false, errors }, 400);
  }

  let user = await createAccount(username, email, password);

  return redirect("/", {
    headers: {
      "Set-Cookie": await cookie.serialize(user.id),
    },
  });
}

export default function CreateAccount() {
  let actionResult = useActionData<typeof action>();

  return (
    <div className="main-container max-w-[480px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
      <Form method="post">
        <Label htmlFor="username" className="grow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <Input
            autoFocus
            id="username"
            name="username"
            type="username"
            autoComplete="username"
            placeholder="Username"
            required
          />
        </Label>
        <span
          id="usernameError"
          className="label label-text-alt pt-1 pb-4 text-error"
        >
          {actionResult?.errors?.username && actionResult.errors.username}
        </span>
        <Label htmlFor="email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <Input
            autoFocus
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
          />
        </Label>
        <span
          id="emailError"
          className="label label-text-alt pt-1 pb-4 text-error"
        >
          {actionResult?.errors?.email && actionResult.errors.email}
        </span>
        <Label htmlFor="password">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-describedby="password-error"
            placeholder="Password"
            required
          />
        </Label>
        <span
          id="passwordError"
          className="label label-text-alt pt-1 pb-4 text-error"
        >
          {actionResult?.errors?.password && actionResult.errors.password}
        </span>
        <Button type="submit">CREATE ACCOUNT</Button>
        <div className="opacity-80 mt-3">
          Already have an account?{" "}
          <Link className="link mt-1" to="/login">
            Log in
          </Link>
          .
        </div>
      </Form>
    </div>
  );
}
