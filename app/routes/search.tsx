import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import * as database from "../data/fake-database";
import { useFetcher, useLoaderData } from "@remix-run/react";
import Ride from "~/components/Ride";
import { useEffect, useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const page = Number(url.searchParams.get("page")) || 1;

  let rides = database.getRidesBySearch(query, page, 4);
  let totalPages = Math.ceil(database.getRidesCountBySearch(query) / 4);
  let hasNextPage = page < totalPages;

  if (page > totalPages && page > 1)
    throw new Response("Page not found", { status: 404 });

  return { rides, page, hasNextPage, query };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Cycle TO Fun" },
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

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const [pageLoading, setPageLoading] = useState(true);

  const [rides, setRides] = useState(data.rides);
  const [page, setPage] = useState(data.page + 1);
  const [hasNextPage, setHasNextPage] = useState(data.hasNextPage);

  function loadMore() {
    fetcher.load(`?index&q=${data.query}&page=${page}`);
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

  useEffect(() => {
    setRides(data.rides);
    setPage(data.page + 1);
    setHasNextPage(data.hasNextPage);
  }, [data.rides]);

  return (
    <div className="main-container">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mt-0.5 mb-1">
          {rides.length === 0 ? "No results found for:" : "Search results for:"}
        </h1>
        <h2 className="text-2xl font-semibold mb-4">"{data.query}"</h2>
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
