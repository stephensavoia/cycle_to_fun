import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import * as database from "~/data/fake-database";
import { useLoaderData, redirect } from "@remix-run/react";
import Ride from "~/components/Ride";

export async function loader({ context }: LoaderFunctionArgs) {
  const data = context.cloudflare.env.DB;

  return data;
}

export default function RideBySlug() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <div className="main-container ride-page-container">CHECK CONSOLE</div>
  );
}
