import { json, redirect } from "@remix-run/cloudflare";
import { RidesArray } from "~/components/Ride";

export async function getRides(
  env: Env,
  userId: string | null,
  lastRideId: number | null
) {
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

  if (!rides || rides.length === 0)
    throw new Response("Page not found", { status: 404 });

  return { rides, lastRideId, hasNextPage };
}

export async function getRide(
  env: Env,
  userId: string | null,
  ride: string | null
) {
  if (ride === "random") {
    let { results } = await env.DB.prepare(
      "SELECT slug FROM rides ORDER BY RANDOM() LIMIT 1;"
    ).all();
    const randomRide = results[0].slug;
    return redirect(`/${randomRide}`);
  }

  let statement = env.DB.prepare(`
    SELECT r.*, 
           CASE 
             WHEN ul.rideId IS NOT NULL THEN 1 
             ELSE 0 
           END as rideLiked
    FROM rides r
    LEFT JOIN user_likes ul ON r.id = ul.RideID AND ul.UserID = ?
    WHERE r.slug = ?;
  `);

  if (userId) {
    statement = statement.bind(userId, ride);
  } else {
    statement = statement.bind("0", ride);
  }

  let { results }: { results: RidesArray[] } = await statement.all();
  const rideData = results[0];

  if (!rideData) throw new Response("Ride not found", { status: 404 });

  return rideData;
}

export async function getSearchResults(
  env: Env,
  userId: string | null,
  lastRideId: number | null,
  query: string | null
) {
  let queryModifier = lastRideId ? `AND r.id < ?` : "";

  let statement = env.DB.prepare(`
      SELECT r.*, 
             CASE 
               WHEN ul.rideId IS NOT NULL THEN 1 
               ELSE 0 
             END as rideLiked
      FROM rides r
      LEFT JOIN user_likes ul ON r.id = ul.RideID AND ul.UserID = ?
      WHERE (REPLACE(LOWER(r.tags), ',', ' ') LIKE ? OR REPLACE(LOWER(r.tags), ',', ' ') LIKE ? OR REPLACE(LOWER(r.tags), ',', ' ') LIKE ? OR REPLACE(LOWER(r.tags), ',', ' ') = ?)
      ${queryModifier}
      ORDER BY r.id DESC
      LIMIT 5;
    `);

  if (userId && lastRideId) {
    statement = statement.bind(
      userId,
      `% ${query}`,
      `% ${query} %`,
      `${query} %`,
      `${query}`,
      lastRideId
    );
  } else if (userId && !lastRideId) {
    statement = statement.bind(
      userId,
      `% ${query}`,
      `% ${query} %`,
      `${query} %`,
      `${query}`
    );
  } else if (lastRideId) {
    statement = statement.bind(
      "0",
      `% ${query}`,
      `% ${query} %`,
      `${query} %`,
      `${query}`,
      lastRideId
    );
  } else {
    statement = statement.bind(
      "0",
      `% ${query}`,
      `% ${query} %`,
      `${query} %`,
      `${query}`
    );
  }

  let { results }: { results: RidesArray[] } = await statement.all();

  const rides: RidesArray[] = results.slice(0, 4);
  const hasNextPage = results.length > 4;
  lastRideId = rides.length > 0 ? rides[rides.length - 1].id : 1;

  if (!rides || rides.length === 0)
    throw new Response("Page not found", { status: 404 });

  return { rides, lastRideId, hasNextPage, query };
}

export async function getMyRides(
  env: Env,
  userId: string | null,
  lastRideId: number | null
) {
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

export async function likeRide(env: Env, userId: string, rideId: string) {
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
      return json({ success: true });
    } else {
      return json({ success: false });
    }
  }
}
