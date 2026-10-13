import { images } from '../divisionImages';
import puthia from '../places/puthia.jpg';
import varendra from '../places/varendra.jpg';
import padmabank from '../places/padmabank.jpg';
import kamaruzzaman from '../places/kamaruzzaman.jpg';

export const rajshahi = {
  // Basic info
  id: 'rajshahi',
  name: 'Rajshahi Division',
  tagline: 'Ancient Universities, Temple Cities & Mango Country',
  description: "Rajshahi Division holds some of Bangladesh's richest archaeological and architectural treasures. Paharpur's Buddhist monastery, Puthia's temple complex, the Varendra Museum and the mango orchards along the Padma tell stories stretching back more than a thousand years.",
  // Images & look
  heroImage: puthia,
  cardImage: images.countryside,
  mapColor: '#4a2865',
  tags: ['Archaeology', 'Temples', 'Mangoes', 'Silk', 'History'],
  // Quick facts
  capital: 'Rajshahi',
  area: '18,174 km²',
  population: '20.4 million',
  elevation: '18–40m',
  // Tourist spots (shown on the map)
  touristSpots: [
    {
      name: "Puthia Temple Complex",
      description: "One of Bangladesh's finest groups of historic Hindu temples, with tall spired temples and detailed terracotta carvings beside a calm pond.",
      mapX: 128,
      mapY: 246,
      image: puthia,
      type: 'cultural',
      details: "The Puthia Temple Complex is one of the finest groups of historic Hindu temples in Bangladesh, built around the old Puthia Raj estate. The temples are known for their detailed terracotta carvings, and the tall spired temples reflected in the pond beside them are among the most photographed sights in the region.\n\nWinter, from November to February, is the best time for a slow walk around the complex. It is about 32 km from Rajshahi city, roughly 45 minutes by bus on the Dhaka–Rajshahi highway.",
    },
    {
      name: "Varendra Research Museum",
      description: "One of the country's oldest museums, known for sculptures, inscriptions, manuscripts and archaeological finds from northern Bengal.",
      mapX: 104,
      mapY: 229,
      image: varendra,
      type: 'historical',
      details: "The Varendra Research Museum in Rajshahi city is one of the oldest museums in Bangladesh. It keeps stone and metal sculptures, inscriptions, coins, manuscripts and archaeological finds from the Varendra region of northern Bengal, in a white building with arched windows and a green garden.\n\nIt fits well into a day in Rajshahi city, along with the Padma riverbank. Opening days and hours can change, so check locally before you go.",
    },
    {
      name: "Padma River Bank",
      description: "A popular place in Rajshahi city to enjoy beautiful sunsets, fresh air and peaceful riverside views.",
      mapX: 92,
      mapY: 238,
      image: padmabank,
      type: 'nature',
      details: "The Padma River bank in Rajshahi city is a popular place to enjoy beautiful sunsets, fresh air and peaceful riverside views. Families and friends gather here in the evening to walk along the water and watch the sun go down over the wide river.\n\nLate afternoon to sunset is the best time, and October to March is the most comfortable season. It is in the city itself, so it is easy to reach by rickshaw.",
    },
    {
      name: "Shaheed A. H. M. Kamaruzzaman Central Park & Zoo",
      description: "Recreation and nature: a popular park with green spaces, trees and a zoo, great for families and friends to relax together.",
      mapX: 92,
      mapY: 221,
      image: kamaruzzaman,
      type: 'nature',
      details: "Shaheed A. H. M. Kamaruzzaman Central Park and Zoo in Rajshahi city is a popular place for recreation and nature. The park has green open spaces, shady trees and a zoo, and it is a great place for families and friends to relax and spend time together.\n\nThe cooler months, from October to March, are the most pleasant, and mornings or late afternoons are best for walking. Entry rules and ticket prices can change, so check locally.",
    },
  ],
  // Popular areas
  popularAreas: [
    {
      name: 'Puthia Temple Complex',
      description: "One of Bangladesh's finest groups of historic Hindu temples, with tall spired temples and detailed terracotta carvings beside a calm pond.",
      image: puthia,
      highlight: 'Terracotta temple group',
      category: 'cultural',
      details: "The Puthia Temple Complex is one of the finest groups of historic Hindu temples in Bangladesh, built around the old Puthia Raj estate. The temples are known for their detailed terracotta carvings, and the tall spired temples reflected in the pond beside them are among the most photographed sights in the region.\n\nWinter, from November to February, is the best time for a slow walk around the complex. It is about 32 km from Rajshahi city, roughly 45 minutes by bus on the Dhaka–Rajshahi highway.",
    },
    {
      name: 'Padma River Bank',
      description: 'A popular place in Rajshahi city to enjoy beautiful sunsets, fresh air and peaceful riverside views.',
      image: padmabank,
      highlight: 'Padma sunsets',
      category: 'nature',
      details: "The Padma River bank in Rajshahi city is a popular place to enjoy beautiful sunsets, fresh air and peaceful riverside views. Families and friends gather here in the evening to walk along the water and watch the sun go down over the wide river.\n\nLate afternoon to sunset is the best time, and October to March is the most comfortable season. It is in the city itself, so it is easy to reach by rickshaw.",
    },
    {
      name: 'Varendra Research Museum',
      description: "One of the country's oldest museums, known for sculptures, inscriptions, manuscripts and archaeological finds from northern Bengal.",
      image: varendra,
      highlight: 'Oldest museum in the region',
      category: 'historical',
      details: "The Varendra Research Museum in Rajshahi city is one of the oldest museums in Bangladesh. It keeps stone and metal sculptures, inscriptions, coins, manuscripts and archaeological finds from the Varendra region of northern Bengal, in a white building with arched windows and a green garden.\n\nIt fits well into a day in Rajshahi city, along with the Padma riverbank. Opening days and hours can change, so check locally before you go.",
    },
  ],
  // Routes & cost
  routes: [
    { from: 'Dhaka', to: 'Rajshahi', distance: '245 km', duration: '5–6 hours', costUSD: '৳700–1,500', type: 'road', notes: 'Train and domestic flights are also available' },
    { from: 'Rajshahi', to: 'Puthia', distance: '32 km', duration: '45 min', costUSD: '৳80–800', type: 'road', notes: 'Direct buses use the Dhaka–Rajshahi Highway' },
    { from: 'Rajshahi', to: 'Paharpur', distance: '110 km', duration: '2.5 hours', costUSD: '৳250–2,500', type: 'road', notes: 'Best combined with a longer day trip' },
  ],
  // Restaurants
  restaurants: [
    { name: 'Nanking Darbar Hall', cuisine: 'Bengali & Mughlai', priceRange: '$$', rating: 4.3, speciality: 'Mutton kacchi and local dishes', location: 'Rajshahi city' },
    { name: 'Padma Garden Food Court', cuisine: 'Bengali Street Food', priceRange: '$', rating: 4.2, speciality: 'Fuchka, grilled fish and tea', location: 'Padma riverfront' },
    { name: 'Puthia Local Kitchen', cuisine: 'Traditional Bengali', priceRange: '$', rating: 4.1, speciality: 'Seasonal vegetables and freshwater fish', location: 'Puthia' },
  ],
  // Activities
  activities: [
    { name: 'Puthia Temple Walk', category: 'cultural', duration: '3 hours', costUSD: '৳800', difficulty: 'Easy', description: 'Explore terracotta temples, palace grounds and historic ponds with a local guide.' },
    { name: 'Paharpur Archaeology Tour', category: 'cultural', duration: '3 hours', costUSD: '৳500', difficulty: 'Easy', description: 'Study the great monastery plan, terracotta plaques and site museum.' },
    { name: 'Mango Orchard Visit', category: 'nature', duration: '2 hours', costUSD: '৳600', difficulty: 'Easy', description: 'Visit during May and June for orchard walks and tastings of famous local varieties.' },
    { name: 'Padma River Sunset', category: 'water', duration: '1.5 hours', costUSD: '৳400', difficulty: 'Easy', description: 'Take a small boat from the embankment as the sun drops over the wide Padma.' },
  ],
  // Facilities
  facilities: [
    { name: 'Rajshahi Tourism Information Desk', type: 'information', location: 'Rajshahi city', cost: 'Free' },
    { name: 'Paharpur Museum Washroom', type: 'washroom', location: 'Archaeological site', cost: 'Included with entry' },
    { name: 'Shah Makhdum Dargah', type: 'religious', location: 'Rajshahi city', cost: 'Free' },
    { name: 'Rajshahi Medical College Hospital', type: 'medical', location: 'Rajshahi city', cost: 'Government rates', notes: '24-hour emergency services' },
  ],
};
