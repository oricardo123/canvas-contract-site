export const contact = {
  email: "carlos@canvascontract.com",
  salesEmail: "sales@canvascontract.com",
  ukPhone: "+44 (0)7773 888815",
  ukPhoneHref: "+447773888815",
  ptPhone: "+351 914 827020",
  ptPhoneHref: "+351914827020",
  tradingAddress: ["303 Raleigh House", "Dolphin Square", "London", "SW1V 3NP"],
  registeredOffice: ["114–116 Curtain Road", "London", "EC2A 3AH"],
  companyNumber: "7922364",
};

export interface WorkImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface WorkProject {
  slug: string;
  name: string;
  location: string;
  scope: string;
  website: string;
  images: WorkImage[];
  variant: "standard" | "wide" | "tall";
}

export const featuredProjects: WorkProject[] = [
  {
    slug: "the-norman-tel-aviv",
    name: "The Norman Hotel",
    location: "Tel Aviv, Israel",
    scope: "Bedroom, restaurant and public-area furniture",
    website: "https://www.thenorman.com/",
    images: [
      {
        src: "/assets/projects/norman-atrium-email-2025.jpg",
        alt: "Dining table and lounge chairs in the light-filled atrium at The Norman Hotel",
        width: 1200,
        height: 801,
      },
      {
        src: "/assets/projects/norman-bar-dining-email-2025.jpg",
        alt: "Orange bar stools and dining chairs beside the marble-topped bar at The Norman Hotel",
        width: 1600,
        height: 1067,
      },
      {
        src: "/assets/projects/norman-library-seating-email-2025.jpg",
        alt: "Green upholstered bar stools and cream lounge chairs at The Norman Hotel",
        width: 1600,
        height: 1067,
      },
    ],
    variant: "wide",
  },
  {
    slug: "st-regis-venice",
    name: "The St. Regis Venice",
    location: "Venice, Italy",
    scope: "Bedroom and public-area furniture",
    website: "https://www.marriott.com/en-us/hotels/vcexr-the-st-regis-venice/overview/",
    images: [
      {
        src: "/assets/projects/st-regis-hotel-venice-01-bedroom.jpg",
        alt: "Guest suite interior at The St. Regis Venice",
        width: 2880,
        height: 1639,
      },
      {
        src: "/assets/projects/st-regis-hotel-venice-02-public-area.jpg",
        alt: "Public lounge interior at The St. Regis Venice",
        width: 2880,
        height: 1641,
      },
    ],
    variant: "standard",
  },
  {
    slug: "arts-club-london",
    name: "The Arts Club",
    location: "London, UK",
    scope: "Penthouse and restaurant furniture",
    website: "https://www.theartsclub.co.uk/",
    images: [
      {
        src: "/assets/projects/arts-club-hotel-london-01-penthouse.jpg",
        alt: "Penthouse living room at The Arts Club in London",
        width: 2133,
        height: 1128,
      },
      {
        src: "/assets/projects/arts-club-hotel-london-02-restaurant.jpg",
        alt: "Restaurant interior at The Arts Club in London",
        width: 4755,
        height: 2537,
      },
    ],
    variant: "standard",
  },
  {
    slug: "the-duchess-amsterdam",
    name: "The Duchess",
    location: "Amsterdam, Netherlands",
    scope: "Restaurant furniture and custom seating",
    website: "https://the-duchess.com/",
    images: [
      {
        src: "/assets/projects/the-duchess-amsterdam-restaurant.jpg",
        alt: "Restaurant interior at The Duchess in Amsterdam",
        width: 2501,
        height: 1326,
      },
    ],
    variant: "wide",
  },
  {
    slug: "maison-breguet-paris",
    name: "Maison Bréguet",
    location: "Paris, France",
    scope: "Bedroom, restaurant and public-area furniture",
    website: "https://en.maisonbreguet.com/",
    images: [
      {
        src: "/assets/projects/maison-breguet-paris-public-area.jpg",
        alt: "Public seating area at Maison Bréguet in Paris",
        width: 1540,
        height: 944,
      },
    ],
    variant: "standard",
  },
  {
    slug: "sartoria-london",
    name: "Sartoria",
    location: "London, UK",
    scope: "Restaurant furniture",
    website: "https://sartoria-restaurant.co.uk/",
    images: [
      {
        src: "/assets/projects/sartoria-london-restaurant.jpg",
        alt: "Restaurant and bar interior at Sartoria in London",
        width: 1992,
        height: 1016,
      },
    ],
    variant: "wide",
  },
];

export const projectArchive = [
  { name: "The Norman Hotel", location: "Tel Aviv", scope: "Bedrooms, restaurants and public areas" },
  { name: "Sir Adam", location: "Amsterdam", scope: "Restaurant" },
  { name: "The Arts Club Hotel", location: "London", scope: "Bedrooms, restaurants and public areas" },
  { name: "St. Regis Hotel", location: "Venice", scope: "Deluxe suites, restaurant and public areas" },
  { name: "Hotel Bristol", location: "Warsaw", scope: "Restaurants and public areas" },
  { name: "The Duchess", location: "Amsterdam", scope: "Restaurant and bar" },
  { name: "Villa Belrose", location: "St Tropez", scope: "Restaurant" },
  { name: "Bluebird", location: "London", scope: "Restaurant and bar" },
  { name: "Maison Bréguet", location: "Paris", scope: "Bedrooms, restaurants and public areas" },
  { name: "Le Bilboquet", location: "Dallas", scope: "Restaurant" },
  { name: "Sartoria", location: "London", scope: "Restaurant and bar" },
  { name: "Cascais Miragem", location: "Cascais", scope: "Bedrooms, restaurants and public areas" },
  { name: "Al Dana Resort", location: "Bahrain", scope: "Bedrooms" },
  { name: "La Petite Maison", location: "Hong Kong", scope: "Restaurant and bar" },
  { name: "La Petite Maison", location: "Miami", scope: "Restaurant and bar" },
  { name: "La Petite Maison", location: "London", scope: "Restaurant and bar" },
  { name: "La Petite Maison", location: "Dubai", scope: "Restaurant and bar" },
  { name: "Millennium Gloucester Hotel", location: "Kensington", scope: "Restaurant and bar" },
  { name: "Tamarind", location: "Mayfair", scope: "Restaurant and bar" },
  { name: "Coq d’Argent", location: "London", scope: "Restaurant and bar" },
  { name: "Launceston Place", location: "Kensington", scope: "Restaurant and bar" },
  { name: "Orrery", location: "Marylebone", scope: "Restaurant and bar" },
  { name: "Radici", location: "Islington", scope: "Restaurant and bar" },
  { name: "Tamarind Kitchen", location: "London", scope: "Restaurant and bar" },
  { name: "Bluebird Café BBC", location: "Shepherd’s Bush", scope: "Café, restaurant and bar" },
  { name: "Coppa Club", location: "Cobham", scope: "Restaurant and bar" },
  { name: "Herbert Samuel", location: "Jerusalem", scope: "Restaurant and bar" },
  { name: "Bar des Prés", location: "London", scope: "Restaurant and bar" },
  { name: "Four Seasons", location: "Park Lane", scope: "Restaurant and bar" },
  { name: "Harleyford Manor", location: "Marlow", scope: "Bedrooms, lounge, dining and leisure" },
];
