import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { RidesArray } from "~/types";
import { json, useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import Ride from "~/components/Ride";
import { useEffect, useState } from "react";
import { getAuthFromRequest } from "~/auth/auth";

export async function loader({ request, context }: LoaderFunctionArgs) {
  let userId = await getAuthFromRequest(request);
  const url = new URL(request.url);
  let lastRideId = Number(url.searchParams.get("lastRideId")) || null;
  console.log("lastRideId Loader", lastRideId);

  const env = context.cloudflare.env as Env;
  let queryModifier = lastRideId ? `WHERE r.id < ?` : "";

  let statement = env.DB.prepare(`
    SELECT r.*, 
           CASE 
             WHEN ul.rideId IS NOT NULL THEN 1 
             ELSE 0 
           END as rideLiked
    FROM rides r
    LEFT JOIN user_likes ul ON r.id = ul.RideID AND ul.UserID = ?
    ${queryModifier}
    ORDER BY r.id DESC
    LIMIT 5;
  `);

  if (userId && lastRideId) {
    statement = statement.bind(userId, lastRideId);
  } else if (userId && !lastRideId) {
    statement = statement.bind(userId);
  } else if (lastRideId) {
    statement = statement.bind("0", lastRideId);
  } else {
    statement = statement.bind("0");
  }

  let { results }: { results: RidesArray[] } = await statement.all();

  const rides: RidesArray[] = results.slice(0, 4);
  const hasNextPage = results.length > 4;
  lastRideId = rides.length > 0 ? rides[rides.length - 1].id : 1;
  console.log("newLastRideId Loader", lastRideId);

  if (!rides || rides.length === 0)
    throw new Response("Page not found", { status: 404 });

  return { rides, lastRideId, hasNextPage };
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const env = context.cloudflare.env as Env;
  const formData = await request.formData();
  let userId = formData.get("userId");
  let rideId = formData.get("rideId");

  // check if userId and rideId are in a row on "user_likes" table
  let { results } = await env.DB.prepare(
    "SELECT * FROM user_likes WHERE UserID = ? AND RideID = ?;"
  )
    .bind(userId, rideId)
    .all();

  if (results.length === 0) {
    let { success } = await env.DB.prepare(
      "INSERT INTO user_likes (UserID, RideID) VALUES (?,?) ON CONFLICT (UserID, RideID) DO NOTHING;"
    )
      .bind(userId, rideId)
      .run();

    if (success) {
      console.log("Like was added");
      return json({ success: true });
    } else {
      return json({ success: false });
    }
  } else {
    let { success } = await env.DB.prepare(
      "DELETE FROM user_likes WHERE UserID = ? AND RideID = ?;"
    )
      .bind(userId, rideId)
      .run();

    if (success) {
      console.log("Like was removed");
      return json({ success: true });
    } else {
      return json({ success: false });
    }
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
  const location = useLocation();
  console.log(location);

  const [rides, setRides] = useState(data.rides);
  const [lastRideId, setLastRideId] = useState(data.lastRideId);
  const [hasNextPage, setHasNextPage] = useState(data.hasNextPage);
  console.log("lastRideId Index", lastRideId);

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

    if (newData) {
      setRides((prevRides) => [...prevRides, ...newData.rides]);
      setHasNextPage(newData.hasNextPage);
      setLastRideId(newData.lastRideId);
      console.log("newLastRideId Index", newData.lastRideId);
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
