import { useRef } from "react";

interface RideProps {
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
}

function Ride({
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
}: RideProps) {
  return (
    <div className="ride-card w-11/12 mx-auto">
      <div className="card card-compact w-auto mx-auto max-w-[30rem] bg-base-100">
        <figure className="bg-base-200 relative">
          <h2 className="ride-card-title">{title}</h2>
          <img src={imageUrl} alt={altText} />
        </figure>
        <div className="flex flex-row justify-start">
          <div className="card-actions flex flex-col justify-start pt-4">
            <a href={mapUrl} className="btn btn-primary btn-getmap">
              GET MAP
            </a>
            <button className="btn btn-outline btn-primary btn-extra">
              Share
            </button>
            <a
              role="button"
              className="hidden btn btn-outline btn-primary btn-extra"
            >
              Like
            </a>
          </div>
          <div className="card-body">
            <p>{description}</p>
            <p>
              <span className="badge badge-ghost inline-block mr-2">
                {duration}
              </span>
              <span className="badge badge-ghost inline-block mr-2">
                {distance}
              </span>
              <span className="badge badge-ghost badge-success inline-block mr-2">
                {difficulty}
              </span>
              <span className="badge badge-ghost inline-block">
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