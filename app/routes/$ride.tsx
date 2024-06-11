import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import * as database from "../data/fake-database";
import { useLoaderData, redirect } from "@remix-run/react";
import Ride from "~/components/Ride";

export async function loader({ params }: LoaderFunctionArgs) {
  const { ride } = params;
  if (ride === undefined) throw new Response("Ride is undefined");

  if (ride === "random") {
    const randomRide = database.getRandomRideSlug();
    return redirect(`/${randomRide}`);
  }

  const data = database.getRideBySlug(ride);
  if (!data) throw new Response("Ride not found", { status: 404 });
  return data;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let pageData;
  if (!data) {
    pageData = {
      id: 0,
      title: "random",
      description: "Search for a random ride.",
      mapUrl: "/",
      tags: "random",
      imageUrl: "randomride.jpg",
      altText: "random ride",
      slug: "random",
    };
  } else {
    pageData = data;
  }
  return [
    { title: `${pageData.title} | Cycle TO Fun` },
    {
      name: "description",
      content:
        "Browse through our collection of in and around Toronto and the GTA.",
    },
    { name: "og:url", content: "https://idontknowyet.com/" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: "Cycle TO Fun" },
    {
      name: "og:description",
      content: "TESTING TESTING TESTING",
    },
    {
      name: "og:image",
      content: "https://idontknowyet.com/images/testing.jpg",
    },
  ];
};

export default function RideBySlug() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="main-container ride-page-container">
      <div className="flex flex-col items-center">
        <Ride
          key={data.id}
          title={data.title}
          description={data.description}
          mapUrl={data.mapUrl}
          tags={data.tags}
          duration={data.duration}
          distance={data.distance}
          difficulty={data.difficulty}
          routeType={data.routeType}
          imageUrl={data.imageUrl}
          altText={data.altText}
          slug={data.slug}
        />
      </div>
    </div>
  );
}
