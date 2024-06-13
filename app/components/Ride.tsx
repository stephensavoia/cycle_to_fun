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

  return (
    <div className="ride-card w-11/12 mx-auto">
      <div className="card card-compact w-auto mx-auto max-w-[30rem] bg-base-100">
        <figure
          className="bg-base-200 relative"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            height: "252px",
          }}
        >
          <h2 className="ride-card-title">{title}</h2>
        </figure>
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
            <a
              role="button"
              className="hidden btn btn-outline btn-primary btn-extra"
            >
              Like
            </a>
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
