import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useUser } from "~/contexts/UserContext";

export type RidesArray = {
  id: number;
  title: string;
  description: string;
  mapUrl: string;
  tags: string;
  duration: string;
  distance: string;
  difficulty: string;
  routeType: string;
  imageUrl: string;
  altText: string;
  slug: string;
  rideLiked: boolean;
};

interface RideProps {
  rideId: number;
  title: string;
  description: string;
  mapUrl: string;
  tags: string;
  duration: string;
  distance: string;
  difficulty: string;
  routeType: string;
  imageUrl: string;
  altText: string;
  slug: string;
  rideLiked: boolean;
}

interface LikeResponse {
  success: boolean;
}

export function Ride({
  rideId,
  title,
  description,
  mapUrl,
  tags,
  duration,
  distance,
  difficulty,
  routeType,
  imageUrl,
  altText,
  slug,
  rideLiked,
}: RideProps) {
  let { userId, username } = useUser();
  const fetcher = useFetcher();
  const [rideButtonFilled, setRideButtonFilled] = useState(rideLiked);

  const lastPeriodIndex = imageUrl.lastIndexOf("."); // Find the last period in the imageUrl
  const imageUrlBase = imageUrl.slice(0, lastPeriodIndex); // Get the base URL without the extension
  const imageExtension = imageUrl.slice(lastPeriodIndex); // Get the extension, including the period

  const imageUrl1x = `${imageUrlBase}-480${imageExtension}`;
  const imageUrl2x = `${imageUrlBase}-960${imageExtension}`;
  const imageUrl3x = `${imageUrlBase}-1200${imageExtension}`;

  const handleShare = async () => {
    const navigator = window.navigator;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: `https://www.cycletofun.com/${slug}`,
        });
      } catch (error) {
        console.error("Something went wrong sharing the content", error);
      }
    } else {
      console.log("Web Share API is not supported in your browser");
    }
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      const { success } = fetcher.data as LikeResponse;
      if (success) setRideButtonFilled(!rideButtonFilled);
    }
  }, [fetcher.state]);

  return (
    <div className="ride-card w-11/12 mx-auto">
      <div className="card card-compact w-auto mx-auto max-w-[30rem] bg-base-100">
        <div
          className="ride-img-container bg-base-200 relative"
          style={{
            height: "252px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrl1x}
            srcSet={`${imageUrl1x} 480w, ${imageUrl2x} 960w, ${imageUrl3x} 1200w`}
            sizes="(min-width:480px) 30rem, 100vw "
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              mixBlendMode: "multiply",
            }}
          />
          <h2 className="ride-card-title" style={{ position: "absolute" }}>
            {title}
          </h2>
        </div>
        <div className="flex flex-row justify-start">
          <div className="card-actions flex flex-col justify-start pt-4">
            <a href={mapUrl} className="btn btn-primary btn-getmap">
              GET MAP
            </a>
            <button
              className="btn btn-outline btn-primary btn-extra"
              onClick={handleShare}
            >
              Share
            </button>
            {userId && (
              <fetcher.Form
                id={`likeForm${rideId}`}
                method="post"
                className="w-full"
              >
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="rideId" value={rideId} />
                <button
                  type="submit"
                  name="intent"
                  value="like"
                  className={`btn btn-outline btn-primary btn-extra ${
                    rideButtonFilled ? "btn-ride-liked" : ""
                  }`}
                >
                  Like
                </button>
              </fetcher.Form>
            )}
          </div>
          <div className="card-body">
            <p className="mb-3">{description}</p>
            <p>
              <span className="badge badge-ghost inline-block mr-2 mb-3">
                {duration}
              </span>
              <span className="badge badge-ghost inline-block mr-2 mb-3">
                {distance}
              </span>
              <span className="badge badge-ghost badge-success inline-block mr-2 mb-3">
                {difficulty}
              </span>
              <span className="badge badge-ghost inline-block mb-3">
                {routeType}
              </span>
            </p>
            <p className="ride-tags">{tags}</p>
          </div>
        </div>
      </div>
      <div className="divider mx-auto max-w-[30rem]"></div>
    </div>
  );
}

export default Ride;
