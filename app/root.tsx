import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import stylesheet from "~/tailwind.css?url";
import React, { useRef } from "react";
import { getAuthFromRequest } from "./auth/auth";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { UserProvider } from "~/contexts/UserContext";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.ico" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Varela+Round&display=swap",
    rel: "stylesheet",
  },
];

export async function loader({ request, context }: LoaderFunctionArgs) {
  let auth = await getAuthFromRequest(request);
  if (auth) {
    const env = context.cloudflare.env as Env;
    let { results } = await env.DB.prepare(
      "SELECT UserID, Username FROM users WHERE UserID = ?;"
    )
      .bind(auth)
      .all();
    return results[0];
  } else {
    return null;
  }
}

export const meta: MetaFunction = () => {
  return [
    {
      name: "msapplication-TileColor",
      content: "#2b5797",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ];
};

export type NavbarProps = {
  mobileSearchInput: React.RefObject<HTMLInputElement>;
  desktopSearchInput: React.RefObject<HTMLInputElement>;
  drawerMenu: React.RefObject<HTMLInputElement>;
};

export type FooterProps = {
  mobileSearchInput: React.RefObject<HTMLInputElement>;
  desktopSearchInput: React.RefObject<HTMLInputElement>;
  drawerMenu: React.RefObject<HTMLInputElement>;
};

export function Layout({ children }: { children: React.ReactNode }) {
  const mobileSearchInput = useRef<HTMLInputElement | null>(null);
  const desktopSearchInput = useRef<HTMLInputElement | null>(null);
  const drawerMenu = useRef<HTMLInputElement | null>(null);

  let userData = useLoaderData<typeof loader>();
  const userContextValue = {
    userId: userData ? String(userData.UserID) : null,
    username: userData ? String(userData.Username) : null,
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2e60c5" />
      </head>
      <body>
        <UserProvider value={userContextValue}>
          <Navbar
            mobileSearchInput={mobileSearchInput}
            desktopSearchInput={desktopSearchInput}
            drawerMenu={drawerMenu}
          />
          {children}
          <Footer
            mobileSearchInput={mobileSearchInput}
            desktopSearchInput={desktopSearchInput}
            drawerMenu={drawerMenu}
          />
        </UserProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet key="hello" />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorHeading = "An error occurred";
  let errorMessage = "Opps! Something went wrong. Please try again later.";

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        errorHeading = "404 - Page Not Found";
        errorMessage =
          "Oops! Looks like you tried to visit a page that doesn't exist.";
        break;
    }
  }

  return (
    <div className="max-w-[480px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{errorHeading}</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
