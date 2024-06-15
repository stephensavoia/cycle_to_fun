import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  return [
    ...parentMeta,
    { title: "About | Cycle TO Fun" },
    {
      name: "description",
      content:
        "Our mission is to make cycling in Toronto as safe, accessible, and FUN as possible. Explore our collection of cycling routes and find the perfect one for your next adventure.",
    },
    { name: "og:url", content: "https://www.cycletofun.com/about" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: "About | Cycle TO Fun" },
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

export default function About() {
  return (
    <div className="main-container max-w-[480px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About</h1>

      <section className="mb-6">
        <p>
          Our mission is to make cycling in Toronto as safe, accessible, and FUN
          as possible. Explore our collection of cycling routes and find the
          perfect one for your next adventure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">How to Use Cycle TO Fun</h2>
        <p>
          Find a ride by scrolling our home page, using the search bar, or
          clicking "Random Ride". Each ride has a "Get Map" button that links to
          a Google Map.
        </p>
        <img
          src="/img/how-to-use-cycle-to-fun.png"
          alt="Diagram showing how to read ride information"
          className="mt-3"
        />
        <ol className="list-decimal list-outside space-y-2 mt-2 ml-4">
          <li>
            Click "GET MAP" to get the Google Map directions for the ride.
          </li>
          <li>
            Click "Share" to send a link with ride information to a friend.
          </li>
          <li>
            There are 3 different ride difficulty ratings: <em>easy</em>,{" "}
            <em>moderate</em>, or <em>difficult</em>. This indicates the
            physical fitness level required for the ride. Check the distance and
            elevation change on the ride's Google Map for more details.
          </li>
          <li>
            There are 4 different ride infrastructure types: <em>trails</em>,{" "}
            <em>cycle</em> <em>tracks</em>, <em>bike lanes</em>, or{" "}
            <em>side streets</em>. Rides may feature multiple types of
            infrastructure. Only the most prevelant infrastructure type is
            listed. Check the ride's Google Map for full details.
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">How to Use Google Maps</h2>
        <p></p>
        <img
          src="/img/how-to-use-google-maps.png"
          alt="Diagram showing how to use Google Maps"
          className="mt-3"
        />
        <ol className="list-decimal list-outside space-y-2 mt-2 ml-4">
          <li>
            Click "Preview" to view the cycling route in Google Maps. It's
            always a good idea to preview your route before you begin your ride.
          </li>
          <li>
            Once you arrive at the location of the ride's starting point, you
            will notice that the "Preview" button has changed to a "Start"
            button. Select the "Start" button to open the route in Google Map's
            navigation.
          </li>
          <li>
            Each ride map includes several checkpoints to ensure that Google
            Maps doesn't auto-redirect you away from the original route. If you
            accidently pass a checkpoint, and find Google Maps is telling you to
            go backwards, just delete that checkpoint by selecting "Remove stop"
            from the menu.
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Advice for Cycling in Toronto
        </h2>
        <p></p>
        <p className="mt-3">
          In addition to the technical information provided above, we offer the
          following general advice for utilizing our cycling routes:
        </p>
        <ol className="list-decimal list-outside space-y-2 mt-2 ml-4">
          <li>
            Always preview your ride's map before leaving your home. Ensure you
            are familiar with the streets and turns you will encounter during
            your ride.
          </li>
          <li>
            When making a left, use a{" "}
            <a
              className="link"
              href="https://www.thestar.com/autos/what-s-the-proper-way-to-make-a-left-turn-on-your-bike/article_a29b8338-b478-5465-80b4-dab8b5dc795b.html"
              aria-label="The Star article on two-stage turns"
            >
              two-stage turn
            </a>
            . This means to make a left turn by crossing at an intersection,
            alongside pedestrians. All of the cycling routes on Cycle TO FUN are
            designed to accommodate two-stage left turns at major intersections.
          </li>
          <li>
            When following one of our cycling routes, never do anything that
            makes you feel unsafe. If traffic feels too intense or a hill is too
            steep, do not hesitate to walk your bike on the sidewalk for part of
            the route.
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-l font-bold">
              How challenging are "moderate" and "difficult" rides?
            </div>
            <div className="collapse-content">
              <p>
                As a rule of thumb, you can think of a "moderate" ride as being
                strenuous for someone who cycles casually and a "difficult" ride
                as being strenuous for someone who cycles regularly.
              </p>
              <p className="mt-3">
                Your best bet is to view the ride's Google Map and make a
                judgement based on the ride's distance and elevation change.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-l font-bold">
              What are the differences between "cycle tracks", "bike lanes", and
              "trails"?
            </div>
            <div className="collapse-content">
              <p>
                Cycle tracks are bike lanes that are separated from vehicle
                traffic by parked cars, planters or some other physical object.
                Bike lanes are painted on the road, with no barrier between
                cylcists and vehicle traffic. Trails are completely separated
                from vehicle traffic.
              </p>
              <p className="mt-3">
                More information can be found at{" "}
                <a
                  className="link"
                  href="https://www.toronto.ca/services-payments/streets-parking-transportation/cycling-in-toronto/torontos-cycling-infrastructure/"
                >
                  www.toronto.ca
                </a>
                .
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-l font-bold">
              How can I suggest a cycling route?
            </div>
            <div className="collapse-content">
              <p>
                If you would like to suggest the cycling route, please email
                your idea to{" "}
                <a className="link" href="mailto:cycletofun@gmail.com">
                  cycletofun@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-l font-bold">
              What tech stack was used to make Cycle TO Fun?
            </div>
            <div className="collapse-content">
              <p>
                Cycle TO Fun was made with Cloudflare D1, Prisma, Remix, and
                DiasyUI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
