import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { redirectWithClearedCookie } from "~/auth/auth";

export async function loader({ request, context }: LoaderFunctionArgs) {
  return redirectWithClearedCookie();
}

export default function MyRides() {
  return null;
}
