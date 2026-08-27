export const LOGO = "/dmc-logo.png";

export const NAV = [
  { label: "Collection", href: "#collection" },
  { label: "Featured", href: "#featured" },
  { label: "Journey", href: "#journey" },
  { label: "Collector", href: "#collector" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

export const HERO_IMG =
  "https://images.unsplash.com/photo-1587750059638-e7e8c43b99fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const CAR_IMAGES = [
  "https://images.unsplash.com/photo-1564730466532-c2c8db9ca7b7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1469388062863-8702b8cbe4f3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1521405566890-bc4a73601e4b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1726151400659-82daf90cb2fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1693171926389-1244c06b5ce2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1777714220814-3e4854ce2d1e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1780645331677-9c9910ac7bd9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1623878404933-bc0076fea912?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1532751203793-812308a10d8e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.pexels.com/photos/37958112/pexels-photo-37958112.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.unsplash.com/photo-1662715087620-835d3cd0f507?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1513178532803-0d3db9cf7696?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1786564796013-9d2d610a53a5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1730302551882-99cb98b4adc4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1761723820634-f243f30bf6fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1768313990480-45ab56f2a96d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
];

export const BIKE_IMAGES = [
  "https://images.unsplash.com/photo-1517812766428-076d4f379316?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1658397232100-343177fe408e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1616581932361-f3aa7f297944?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  "https://images.unsplash.com/photo-1478340168842-7e6b25ed6510?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
];

export const STEERING_IMG =
  "https://images.unsplash.com/photo-1613771750144-9f2177c60fb0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

export const carImage = (car, i) => {
  if (car.image_url && car.image_url.length > 0) return car.image_url;
  if ((car.vehicle_type || "CAR") === "BIKE")
    return BIKE_IMAGES[i % BIKE_IMAGES.length];
  return CAR_IMAGES[i % CAR_IMAGES.length];
};

export const STATS = [
  { value: 30, suffix: "+", label: "Years of Heritage" },
  { value: 25, suffix: "", label: "Classic Automobiles" },
  { value: 50, suffix: "+", label: "Shows & Events" },
  { value: 1996, suffix: "", label: "The Journey Begins", raw: true },
];

export const JOURNEY = [
  {
    tag: "1996",
    title: "The Beginning",
    body: "The first classic enters the garage and begins a lifelong journey into automotive preservation.",
  },
  {
    tag: "2000",
    title: "First Major Show",
    body: "The collection begins participating in organised classic-car events across South India.",
  },
  {
    tag: "2005",
    title: "The Collection Grows",
    body: "More significant automobiles — pre-war tourers, Italian classics and American icons — join the register.",
  },
  {
    tag: "2010",
    title: "National Recognition",
    body: "Classic-car participation expands to rallies and heritage drives, earning the collection wider recognition.",
  },
  {
    tag: "2020",
    title: "Seafront Heritage Drive",
    body: "Autocar India documents the 1964 Volkswagen Beetle in the Chennai–Pondy Heritage Drive along the Puducherry beachfront.",
  },
  {
    tag: "2026",
    title: "Preserving the Legacy",
    body: "25 classics, 50+ shows and a growing digital archive that keeps every story alive.",
  },
];

export const SHOWS = [
  {
    year: "01 / Archive",
    title: "Classic Car Shows",
    body: "A structured record for exhibitions, concours appearances and enthusiast gatherings.",
  },
  {
    year: "02 / Archive",
    title: "Recognition",
    body: "Space for awards, certificates, judging results and notable milestones.",
  },
  {
    year: "03 / Archive",
    title: "Road & Community",
    body: "Stories from drives, communities and the people who keep automotive heritage moving.",
  },
];

export const CONTACT = {
  collector: "Duraimohan V",
  role: "Founder & Collector",
  phone: "+91 9444009900",
  phoneRaw: "+919444009900",
  email: "Chevy.dm@gmail.com",
  altEmail: "MD@duraimohanclassics.com",
  coords: "12.700071, 79.969365",
  maps: "https://www.google.com/maps?q=12.700071,79.969365",
  mapEmbed: "https://www.google.com/maps?q=12.700071,79.969365&z=15&output=embed",
};
