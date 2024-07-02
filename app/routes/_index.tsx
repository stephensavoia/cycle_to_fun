import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/cloudflare";

import { json, useFetcher, useLoaderData } from "@remix-run/react";
import { Ride } from "~/components/Ride";
import { useEffect, useState } from "react";
import { getAuthFromRequest } from "~/auth/auth";
import { getRides, likeRide } from "../queries/queries";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const userId = await getAuthFromRequest(request);
  const url = new URL(request.url);
  const lastRideIdUrl = Number(url.searchParams.get("lastRideId")) || null;
  const env = context.cloudflare.env as Env;

  const { rides, lastRideId, hasNextPage } = await getRides(
    env,
    userId,
    lastRideIdUrl
  );

  return { rides, lastRideId, hasNextPage };
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const env = context.cloudflare.env as Env;
  const formData = await request.formData();
  let userId = String(formData.get("userId"));
  let rideId = String(formData.get("rideId"));

  if (!userId || !rideId) {
    return json({ success: false });
  } else {
    return likeRide(env, userId, rideId);
  }
};

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
      content: "https://www.cycletofun.com/img/og-image.jpg",
    },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const [pageLoading, setPageLoading] = useState(true);
  const [rides, setRides] = useState(data.rides);
  const [lastRideId, setLastRideId] = useState(data.lastRideId);
  const [hasNextPage, setHasNextPage] = useState(data.hasNextPage);

  function loadMore() {
    fetcher.load(`?index&lastRideId=${lastRideId}`);
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

    if (
      newData &&
      !newData.rides.some((newRide) =>
        rides.some((ride) => ride.id === newRide.id)
      )
    ) {
      setRides((prevRides) => [...prevRides, ...newData.rides]);
      // Ryan Florance's suggestion, on a forum, is make the above just newData.rides
      // and make the loader give all data, not just the new data
      // but what if there are hudnreds of rides? would that make it slow
      setHasNextPage(newData.hasNextPage);
      setLastRideId(newData.lastRideId);
    }
  }, [fetcher.data]);

  return (
    <div className="main-container">
      <div className="flex flex-col items-center">
        {rides.map((ride) => (
          <Ride
            rideId={ride.id}
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
            rideLiked={ride.rideLiked}
          />
        ))}
      </div>

      {(fetcher.state === "loading" && hasNextPage === true) ||
      pageLoading === true ? (
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
