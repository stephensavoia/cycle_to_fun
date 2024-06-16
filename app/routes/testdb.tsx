import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import * as database from "~/data/fake-database";
import { useLoaderData, redirect, json } from "@remix-run/react";
import Ride from "~/components/Ride";

interface Env {
  DB: D1Database;
}

export async function loader({ context }: LoaderFunctionArgs) {
  let env = context.cloudflare.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM rides LIMIT 5").all();

  return json(results);
}

export default function RideBySlug() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <div className="main-container ride-page-container">CHECK CONSOLE</div>
  );
}
