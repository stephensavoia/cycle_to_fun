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
};

let rides = [
  {
    id: 8,
    title: "St. Lawrence Market to Woodbine Beach Park",
    description:
      "Ride from St. Lawrence Market, along Commissioner St. and the Lakeshore, to Woodbine Beach Park for a delightful picnic. Make sure to use the Lakeshore Recreational Trail (north side of Lakeshore Blvd) until Leslie.",
    mapUrl: "https://maps.app.goo.gl/jc1rMPQMG29i9u9EA",
    tags: "St Lawrence Market, Woodbine Beach, Lakeshore, Commissioners, food, picnic, Bike Share, Toronto, Beaches, East End",
    duration: "25min",
    distance: "7km",
    difficulty: "Easy",
    routeType: "Cycle Tracks",
    imageUrl: "/img/st-lawrence-market.jpg",
    altText: "St. Lawrence Market",
    slug: "st-lawrence-market-to-woodbine-beach",
  },
  {
    id: 7,
    title: "Casa Loma to Distillery District",
    description:
      "Enjoy an easy, downhill ride from Casa Loma, through the University of Toronto, along College and Sherbourne Streets, and ending at the Distillery District for a refreshing beer.",
    mapUrl: "https://maps.app.goo.gl/Uo9DvztkUBjh7iBG6",
    tags: "Casa Loma, Distillery, U of T, Corktown, Bike Share, Toronto",
    duration: "30min",
    distance: "7km",
    difficulty: "Easy",
    routeType: "Bike Lanes",
    imageUrl: "/img/distillery-district.jpg",
    altText: "Distillery District",
    slug: "casa-loma-to-distillery-district",
  },
  {
    id: 6,
    title: "Messini to Woodbine Beach Park",
    description:
      "Grab a gyro from Messini Authentic Gyros and head down to Woodbine Beach Park. Despite what Google Maps suggests, you can ride directly from Knox Ave to the Lakeshore bike trail via a short connecting path, avoiding any backtracking.",
    mapUrl: "https://maps.app.goo.gl/K4kGwUr4arJV5nqV6",
    tags: "Mesini Authentic Gyros, Woodbine Beach, Lakeshore, food, picnic, Bike Share, Toronto, Beaches, East End",
    duration: "25min",
    distance: "7km",
    difficulty: "Easy",
    routeType: "Bike Lanes",
    imageUrl: "/img/woodbine-beach-park.jpg",
    altText: "Woodbine Beach",
    slug: "messini-to-woodbine-beach",
  },
  {
    id: 5,
    title: "James Gardens to Tom's Dairy Freeze",
    description:
      "Start your bike ride at the beautiful James Gardens, and enjoy the scenic route as you make your way to Tom's Dairy Freeze for some delicious soft-serve ice cream. This hilly journey will give you a great workout, allowing you to enjoy your treat guilt-free.",
    mapUrl: "https://maps.app.goo.gl/M8uL7WSxN9vdxk7GA",
    tags: "James Gardens, Tom's Dairy Freeze, food, ice cream, Toronto, West End, Etobicoke",
    duration: "30min",
    distance: "9km",
    difficulty: "Moderate",
    routeType: "Trails",
    imageUrl: "/img/toms-dairy-freeze.jpg",
    altText: "Tom's Dairy Freeze ice cream stand",
    slug: "james-gardens-to-toms-dairy-freeze",
  },
  {
    id: 4,
    title: "Lalibela Cuisine to PlanB",
    description:
      "Ride from Lalibela Cuisine on Danforth to PlanB in Etobicoke. Make sure to stop at some of the shops and attractions on Bloor Street West so tht you can work up an appetite between these two delicious African restauruants.",
    mapUrl: "https://maps.app.goo.gl/G9uAVqyJE78fYveVA",
    tags: "Lalibela Cuisine, PlanB, Bloor, Danforth, food, Bike Share, Toronto, East End, Etobicoke",
    duration: "1h",
    distance: "15km",
    difficulty: "Moderate",
    routeType: "Cycle Tracks",
    imageUrl: "/img/planb.jpg",
    altText: "PlanB restaurant front entrance",
    slug: "lalibela-cuisine-to-planb",
  },
  {
    id: 3,
    title: "Sorauren Market to Trinity Bellwoods",
    description:
      "Shop for local food products at the Sorauren Market before heading to another great Toronto park: Trinity Bellwoods. Pick up some craft beer at the Bellwoods Brewery bottle shop and enjoy it in the park as part of the city's Alcohol in Parks Program. (Market hours: Monday, 3-7pm)",
    mapUrl: "https://maps.app.goo.gl/zGhmd1UNbVVVFvTL9",
    tags: "Sorauren Market, Trinity Bellwoods, food, picnic, Bike Share, Toronto, West End",
    duration: "15min",
    distance: "4km",
    difficulty: "Easy",
    routeType: "Side Streets",
    imageUrl: "/img/sorauren-market.jpg",
    altText: "Sorauren Market vendors",
    slug: "sorauren-market-to-trinity-bellwoods",
  },
  {
    id: 2,
    title: "Dufferin Mall to Eaton Centre",
    description:
      "Ride from Dufferin Grove Park, along Harbord, and through the University of Toronto campus to the Eaton Centre. Enter the Eaton Centre from the Trinity Square entrance to avoid the crowds and appreciate the beauty of the square.",
    mapUrl: "https://maps.app.goo.gl/xw4YAEXfpBEQPyDM6",
    tags: "Dufferin Mall, Eaton Centre, Harbord, U of T, shopping, Bike Share, Toronto",
    duration: "20 minutes",
    distance: "6 km",
    difficulty: "Easy",
    routeType: "Bike Lanes",
    imageUrl: "/img/eaton-centre.jpg",
    altText: "Toronto Eaton Centre Trinity Square entrance",
    slug: "dufferin-mall-to-eaton-centre",
  },
  {
    id: 1,
    title: "High Park to Cheese Boutique",
    description:
      "Ride through High Park, along the lake, and up to Cheese Boutique for some fresh, gourmet foods. Before heading back to High Park, stop for a picnic by the lake with all of your delicious finds.",
    mapUrl: "https://maps.app.goo.gl/evjGPi3CVH9zMWPm8",
    tags: "High Park, Cheese Boutique, Lake Ontario, food, picnic, Bike Share, Toronto, West End",
    duration: "20min",
    distance: "5km",
    difficulty: "Easy",
    routeType: "Trails",
    imageUrl: "/img/cheese-boutique.jpg",
    altText: "Cheese Boutique storefront",
    slug: "high-park-to-cheese-boutique",
  },
];

// Helper function

function getPaginatedRides(
  rides: RidesArray[],
  page: number,
  pageSize: number
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  //order rides by id
  const orderedRides = rides.sort((a, b) => b.id - a.id);
  return orderedRides.slice(start, end);
}

function filterRidesBySearch(search: string) {
  let searchTerms = search.toLowerCase().split(" ");
  let filteredRides = rides.filter((ride) => {
    let tags = ride.tags.replace(/,/g, "").split(" ");
    return tags.some((tag) => searchTerms.includes(tag.toLowerCase()));
  });
  let orderedRides = filteredRides.sort((a, b) => b.id - a.id);
  return orderedRides;
}

// Database query functions

export function getRidesCount() {
  return rides.length;
}

export function getRidesByLatest(page: number, pageSize: number) {
  return getPaginatedRides(rides, page, pageSize);
}

export function getRandomRideSlug() {
  return rides[Math.floor(Math.random() * rides.length)].slug;
}

export function getRideBySlug(slug: string) {
  return rides.find((ride) => ride.slug === slug);
}

export function getRidesBySearch(
  search: string,
  page: number,
  pageSize: number
) {
  let filteredRides = filterRidesBySearch(search);
  return getPaginatedRides(filteredRides, page, pageSize);
}

export function getRidesCountBySearch(search: string) {
  let filteredRides = filterRidesBySearch(search);
  return filteredRides.length;
}
