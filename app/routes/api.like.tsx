import { ActionFunctionArgs, json } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  console.log("like api");
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
