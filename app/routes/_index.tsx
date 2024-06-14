import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import * as database from "../data/fake-database";
import { useFetcher, useLoaderData } from "@remix-run/react";
import Ride from "~/components/Ride";
import { useEffect, useState } from "react";

export async function loader({ request, context }: LoaderFunctionArgs) {
  console.log(context.cloudflare.env);
  let results = await context.cloudflare.env.DB.prepare(
    "SELECT * FROM rides"
  ).first();
  console.log(results);
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;

  let rides = database.getRidesByLatest(page, 4);
  let totalPages = Math.ceil(database.getRidesCount() / 4);
  let hasNextPage = page < totalPages;

  if (page > totalPages) throw new Response("Page not found", { status: 404 });

  return { rides, page, hasNextPage, results };
}

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  return [
    ...parentMeta,
    { title: "Cycle TO Fun" },
    {
      name: "description",
      content:
        "Our mission is to make cycling in Toronto as safe, accessible, and FUN as possible. Explore our collection of cycling routes and find the perfect one for your next adventure.",
    },
    { name: "og:url", content: "https://www.cycletofun.com/" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: "Cycle TO Fun" },
    {
      name: "og:description",
      content:
        "Our mission is to make cycling in Toronto as safe, accessible, and FUN as possible. Explore our collection of cycling routes and find the perfect one for your next adventure.",
    },
    {
      name: "og:image",
      content: "https://www.cycletofun.com/img/test-img.jpg",
    },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data.results);
  const fetcher = useFetcher<typeof loader>();
  const [pageLoading, setPageLoading] = useState(true);

  const [rides, setRides] = useState(data.rides);
  const [page, setPage] = useState(data.page + 1);
  const [hasNextPage, setHasNextPage] = useState(data.hasNextPage);

  function loadMore() {
    fetcher.load(`?index&page=${page}`);
    setPage(page + 1);
  }

  // When page has loaded
  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    const newData = fetcher.data;
    if (!newData || fetcher.state === "loading") {
      return;
    }

    if (newData) {
      setRides((prevRides) => [...prevRides, ...newData.rides]);
      setHasNextPage(newData.hasNextPage);
    }
  }, [fetcher.data]);

  return (
    <div className="main-container">
      <div className="flex flex-col items-center">
        {rides.map((ride) => (
          <Ride
            key={ride.id}
            title={ride.title}
            description={ride.description}
            mapUrl={ride.mapUrl}
            tags={ride.tags}
            duration={ride.duration}
            distance={ride.distance}
            difficulty={ride.difficulty}
            routeType={ride.routeType}
            imageUrl={ride.imageUrl}
            altText={ride.altText}
            slug={ride.slug}
          />
        ))}
      </div>

      {fetcher.state === "loading" || pageLoading === true ? (
        <div className="h-12 flex items-center justify-center">
          <span className="loading loading-dots loading-md block mx-auto opacity-60"></span>
        </div>
      ) : hasNextPage === true ? (
        <div className="join flex justify-center">
          <button className="btn" onClick={loadMore}>
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
}
