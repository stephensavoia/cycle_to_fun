import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { json, useLoaderData } from "@remix-run/react";
import { getAuthFromRequest } from "~/auth/auth";
import { Ride, RidesArray } from "~/components/Ride";
import { getRide, likeRide } from "~/queries/queries";

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const userId = await getAuthFromRequest(request);
  const env = context.cloudflare.env as Env;
  const { ride } = params;
  if (ride === undefined) throw new Response("Ride is undefined");
  const rideData = await getRide(env, userId, ride);
  return rideData;
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
    : "https://www.cycletofun.com/img/og-image.jpg";

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

export default function RideBySlug() {
  const data = useLoaderData<RidesArray>();

  return (
    <div className="main-container ride-page-container">
      <div className="flex flex-col items-center">
        <Ride
          key={data.id}
          rideId={data.id}
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
          rideLiked={data.rideLiked}
        />
      </div>
    </div>
  );
}
