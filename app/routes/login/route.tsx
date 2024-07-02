import { json, type ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Form, Link, useActionData } from "@remix-run/react";

import { setAuthOnResponse, redirectIfLoggedInLoader } from "~/auth/auth";
import { validate } from "./validate";
import { login } from "./queries";

export const meta = () => {
  return [{ title: "Create an Account | Cycle TO Fun" }];
};

export const loader = redirectIfLoggedInLoader;

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.cloudflare.env as Env;
  let formData = await request.formData();

  let email = String(formData.get("email") || "");
  let password = String(formData.get("password") || "");

  let errors = await validate(email, password);
  if (errors) {
    return json({ ok: false, errors }, 400);
  }

  let userid = await login(env, email, password);

  if (!userid) {
    return json(
      { ok: false, errors: { password: "Invalid email or password" } },
      400
    );
  } else {
    return setAuthOnResponse(redirect("/"), userid);
  }
}

// Had to add this because typescript is too stupid to understand what a "?" means
type ActionResult = {
  errors?: {
    username?: string;
    email?: string;
    password?: string;
  };
};

export default function CreateAccount() {
  let actionResult = useActionData<ActionResult>();

  return (
    <div className="main-container max-w-[480px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
      <Form method="post">
        <label
          htmlFor="email"
          className="input input-bordered flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            autoFocus
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-describedby="email-error"
            placeholder="Email"
            required
          />
        </label>
        <span
          id="email-error"
          className="label label-text-alt pt-1 pb-4 text-error"
        >
          {actionResult?.errors?.email && actionResult.errors.email}
        </span>
        <label
          htmlFor="password"
          className="input input-bordered flex items-center gap-2"
        >
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
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-describedby="password-error"
            placeholder="Password"
            required
          />
        </label>
        <span
          id="password-error"
          className="label label-text-alt pt-1 pb-4 text-error"
        >
          {actionResult?.errors?.password && actionResult.errors.password}
        </span>
        <button type="submit" className="btn btn-primary btn-account w-full">
          LOG IN
        </button>
        <div className="opacity-80 mt-3">
          Don't have an account?{" "}
          <Link className="link mt-1" to="/create-account">
            Create Account
          </Link>
        </div>
      </Form>
    </div>
  );
}
