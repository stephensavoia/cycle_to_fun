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

export const meta: MetaFunction<typeof loader> = ({ matches, data }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  const metaTitle = data?.title ? data?.title : "Search | Cycle TO Fun";
  const metaDescription = data?.description
    ? data?.description
    : "Our mission is to make cycling in Toronto as safe, accessible, and FUN as possible. Explore our collection of cycling routes and find the perfect one for your next adventure.";
  const metaUrl = data?.slug
    ? `https://www.cycletofun.com/${data?.slug}`
    : "https://www.cycletofun.com/";
  const metaImg = data?.imageUrl
    ? `https://www.cycletofun.com${data?.imageUrl}`
    : "https://www.cycletofun.com/img/test-img.jpg";

  return [
    ...parentMeta,
    { title: metaTitle },
    { name: "description", content: metaDescription },
    { name: "og:url", content: metaUrl },
    { name: "og:type", content: "website" },
    { name: "og:title", content: metaTitle },
    { name: "og:description", content: metaDescription },
    { name: "og:image", content: metaImg },
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
