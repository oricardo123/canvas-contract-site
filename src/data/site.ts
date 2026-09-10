export const contact = {
  email: "carlos@canvascontract.com",
  salesEmail: "sales@canvascontract.com",
  ukPhone: "+44 (0)7773 888815",
  ukPhoneHref: "+447773888815",
  ptPhone: "+351 914 827020",
  ptPhoneHref: "+351914827020",
  tradingAddress: ["Rua do Comercio 106", "Seroa, 4595-590", "Portugal"],
  vatNumber: "515968366",
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
    name: "The Norman",
    location: "Tel Aviv, Israel",
    scope: "Bedroom, restaurant and public-area furniture",
    website: "https://www.thenorman.com/",
    images: [
      {
        src: "/assets/projects/norman-restaurant-supplied-2026-09-10.jpg",
        alt: "Upholstered dining chairs and round tables beside tall windows at The Norman",
        width: 1600,
        height: 775,
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

export interface ProjectRecord {
  name: string;
  location: string;
  scope: string;
  website?: string;
  websiteLabel?: string;
}

export const projectArchive: ProjectRecord[] = [
  { name: "The Norman Hotel", location: "Tel Aviv", scope: "Bedrooms, restaurants and public areas", website: "https://www.thenorman.com/" },
  { name: "Sir Adam", location: "Amsterdam", scope: "Restaurant", website: "https://www.sirhotels.com/en/adam/" },
  { name: "The Arts Club Hotel", location: "London", scope: "Bedrooms, restaurants and public areas", website: "https://www.theartsclub.co.uk/hotel/" },
  { name: "St. Regis Hotel", location: "Venice", scope: "Deluxe suites, restaurant and public areas", website: "https://www.marriott.com/en-us/hotels/vcexr-the-st-regis-venice/overview/" },
  { name: "Hotel Bristol", location: "Warsaw", scope: "Restaurants and public areas", website: "https://www.marriott.com/en-us/hotels/wawlc-hotel-bristol-a-luxury-collection-hotel-warsaw/overview/" },
  { name: "The Duchess", location: "Amsterdam", scope: "Restaurant and bar", website: "https://the-duchess.com/" },
  { name: "Villa Belrose", location: "St Tropez", scope: "Restaurant", website: "https://www.althoffcollection.com/en/althoff-villa-belrose" },
  { name: "Bluebird", location: "London", scope: "Restaurant and bar", website: "https://bluebird-restaurant.co.uk/" },
  { name: "Maison Bréguet", location: "Paris", scope: "Bedrooms, restaurants and public areas", website: "https://en.maisonbreguet.com/" },
  { name: "Le Bilboquet", location: "Dallas", scope: "Restaurant", website: "https://lebilboquetdallas.com/" },
  { name: "Sartoria", location: "London", scope: "Restaurant and bar", website: "https://sartoria-restaurant.co.uk/" },
  { name: "Cascais Miragem", location: "Cascais", scope: "Bedrooms, restaurants and public areas", website: "https://www.cascaismirage.com/" },
  { name: "Al Dana Resort", location: "Bahrain", scope: "Bedrooms", website: "https://all.accor.com/hotel/3600/index.en.shtml" },
  { name: "La Petite Maison", location: "Hong Kong", scope: "Restaurant and bar", website: "https://lpmrestaurants.com/hongkong/" },
  { name: "La Petite Maison", location: "Miami", scope: "Restaurant and bar", website: "https://lpmrestaurants.com/miami/" },
  { name: "La Petite Maison", location: "London", scope: "Restaurant and bar", website: "https://lpmrestaurants.com/london/" },
  { name: "La Petite Maison", location: "Dubai", scope: "Restaurant and bar", website: "https://lpmrestaurants.com/dubai/" },
  { name: "Millennium Gloucester Hotel", location: "Kensington", scope: "Restaurant and bar", website: "https://www.millenniumhotels.com/en/destinations/europe/united-kingdom/london/millennium-gloucester-hotel-london-kensington/" },
  { name: "Tamarind", location: "Mayfair", scope: "Restaurant and bar", website: "https://www.tamarindrestaurant.com/" },
  { name: "Coq d’Argent", location: "London", scope: "Restaurant and bar", website: "https://coqdargent.co.uk/" },
  { name: "Launceston Place", location: "Kensington", scope: "Restaurant and bar" },
  { name: "Orrery", location: "Marylebone", scope: "Restaurant and bar", website: "https://orrery-restaurant.co.uk/by-pierre-minotti/" },
  { name: "Radici", location: "Islington", scope: "Restaurant and bar" },
  { name: "Tamarind Kitchen", location: "London", scope: "Restaurant and bar", website: "https://tamarindkitchen.co.uk/" },
  { name: "Bluebird Café BBC", location: "Shepherd’s Bush", scope: "Café, restaurant and bar", website: "https://televisioncentre.com/news/bluebird-flies-into-white-city/", websiteLabel: "venue information" },
  { name: "Coppa Club", location: "Cobham", scope: "Restaurant and bar", website: "https://www.coppaclub.co.uk/cobham" },
  { name: "Herbert Samuel", location: "Jerusalem", scope: "Restaurant and bar", website: "https://herbertsamuel.com/en/herbert-samuel-jerusalem-hotel/" },
  { name: "Bar des Prés", location: "London", scope: "Restaurant and bar", website: "https://www.bardespres.com/london-restaurant/" },
  { name: "Four Seasons", location: "Park Lane", scope: "Restaurant and bar", website: "https://www.fourseasons.com/london/" },
  { name: "Harleyford Manor", location: "Marlow", scope: "Bedrooms, lounge, dining and leisure", website: "https://harleyford.co.uk/" },
];
