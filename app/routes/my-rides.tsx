import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { RidesArray } from "~/types";
import {
  Link,
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import Ride from "~/components/Ride";
import { useEffect, useState } from "react";
import { getAuthFromRequest } from "~/auth/auth";
import { useUser } from "~/contexts/UserContext";

export async function loader({ request, context }: LoaderFunctionArgs) {
  let userId = await getAuthFromRequest(request);

  if (!userId) {
    throw redirect("/create-account");
  }

  const url = new URL(request.url);
  let lastRideId = Number(url.searchParams.get("lastRideId")) || null;

  const env = context.cloudflare.env as Env;
  let queryModifier = lastRideId ? `AND rides.id < ?` : "";
  let statement = env.DB.prepare(
    `SELECT rides.* FROM rides 
     INNER JOIN user_likes ON rides.id = user_likes.rideID 
     WHERE user_likes.userID = ? ${queryModifier}
     ORDER BY rides.id DESC;`
  );

  if (lastRideId) {
    statement = statement.bind(userId, lastRideId);
  } else {
    statement = statement.bind(userId);
  }

  let { results }: { results: RidesArray[] } = await statement.all();

  const rides: RidesArray[] = results.slice(0, 4);
  // add rideLiked: true for each array in rides
  rides.forEach((ride) => {
    ride.rideLiked = true;
  });

  const hasNextPage = results.length > 4;
  lastRideId = rides.length > 0 ? rides[rides.length - 1].id : 1;

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
    { title: "My Rides | Cycle TO Fun" },
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

export default function MyRides() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const [pageLoading, setPageLoading] = useState(true);

  const location = useLocation();

  const [rides, setRides] = useState(data.rides);
  const [lastRideId, setLastRideId] = useState(data.lastRideId);
  const [hasNextPage, setHasNextPage] = useState(data.hasNextPage);

  const { userId, username } = useUser();

  console.log("userId", userId);
  function loadMore() {
    fetcher.load(`?index&lastRideId=${lastRideId}`);
  }

  console.log(location);

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
    }
  }, [fetcher.data]);

  return (
    <div className="main-container">
      <div className="card bg-base-200 w-auto mx-auto mb-5 max-w-[30rem]">
        <div className="card-body">
          <h2 className="card-title">Welcome, {username}!</h2>
          <p>
            Below is a list of your "liked" rides. For more information on how
            to use Cycle TO Fun, check out our{" "}
            <Link to="/about" className="link">
              About Page
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {rides.length === 0 && <div>You haven't liked any rides yet.</div>}
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
