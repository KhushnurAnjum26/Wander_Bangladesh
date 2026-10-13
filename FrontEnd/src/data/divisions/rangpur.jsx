import { images } from '../divisionImages';
import tajhat from '../places/tajhat.jpg';
import vinnyajagat from '../places/vinnyajagat.jpg';
import carmichael from '../places/carmichael.jpg';
import chikli from '../places/chikli.jpg';

export const rangpur = {
  // Basic info
  id: 'rangpur',
  name: 'Rangpur Division',
  tagline: 'Royal Palaces, River Plains & Northern Heritage',
  description: "Rangpur Division is a landscape of broad rivers, winter fields, archaeological sites and remarkable architecture. Tajhat Palace, Kantajew Temple and the Teesta Barrage anchor journeys through Bangladesh's far north.",
  // Images & look
  heroImage: images.countryside,
  cardImage: images.heritage,
  mapColor: '#2d5a3c',
  tags: ['Palaces', 'Temples', 'River Landscapes', 'Rural Culture'],
  // Quick facts
  capital: 'Rangpur',
  area: '16,185 km²',
  population: '17.6 million',
  elevation: '30–42m',
  // Tourist spots (shown on the map)
  touristSpots: [
    {
      name: "Tajhat Palace",
      description: "One of the most famous historical landmarks in Rangpur, known for its beautiful architecture and grand staircase. Today it is a museum of the region's history and heritage.",
      mapX: 122,
      mapY: 102,
      image: tajhat,
      type: 'historical',
      details: "Tajhat Palace is one of the most famous historical landmarks in Rangpur, Bangladesh. It is known for its beautiful architecture, grand staircase and impressive design. Today the palace serves as a museum where visitors can learn about the region's history and cultural heritage.\n\nOctober to March is the most comfortable time, and the gardens look best in the cooler months. It is in Rangpur city and easy to reach by rickshaw or local transport. Opening days and ticket prices can change, so check locally.",
    },
    {
      name: "Vinnya Jagat Amusement Park",
      description: "A popular amusement park near Rangpur city with rides, entertainment facilities and attractions for all ages.",
      mapX: 138,
      mapY: 113,
      image: vinnyajagat,
      type: 'adventure',
      details: "Vinnya Jagat is a popular amusement park near Rangpur city. It offers various rides, entertainment facilities and attractions for visitors of different ages, and it is an enjoyable destination for families and friends who want to spend quality time together during holidays.\n\nHolidays are the busiest days, so a weekday visit is quieter. Ticket prices and ride timings can change, so check locally before you go.",
    },
    {
      name: "Carmichael College",
      description: "One of the oldest and most renowned educational institutions in northern Bangladesh, known for its historic architecture and spacious campus.",
      mapX: 108,
      mapY: 96,
      image: carmichael,
      type: 'historical',
      details: "Carmichael College is one of the oldest and most renowned educational institutions in northern Bangladesh. Established in 1916, it is famous for its historic architecture, spacious campus and contribution to education. The college has played an important role in developing generations of students and remains a significant part of Rangpur's educational heritage.\n\nIt is in Rangpur city, so it is easy to combine with a visit to Tajhat Palace. It is a working college, so visiting hours can vary and it is best to check locally.",
    },
    {
      name: "Chikli Water Park",
      description: "A popular recreation spot in Rangpur with scenic water views and a relaxing atmosphere for walks, photos and family time.",
      mapX: 135,
      mapY: 91,
      image: chikli,
      type: 'nature',
      details: "Chikli Water Park is a popular recreational destination in Rangpur. It is known for its scenic surroundings, water views and relaxing atmosphere. Visitors often come here to walk around, enjoy nature, take photographs and spend leisure time with family and friends.\n\nLate afternoon is a pleasant time for a visit. Entry rules and ticket prices can change, so check locally.",
    },
  ],
  // Popular areas
  popularAreas: [
    {
      name: 'Tajhat Palace',
      description: "One of the most famous historical landmarks in Rangpur, known for its beautiful architecture, grand staircase and impressive design.",
      image: tajhat,
      highlight: 'Grand staircase and regional museum',
      category: 'historical',
      details: "Tajhat Palace is one of the most famous historical landmarks in Rangpur, Bangladesh. It is known for its beautiful architecture, grand staircase and impressive design. Today the palace serves as a museum where visitors can learn about the region's history and cultural heritage.\n\nOctober to March is the most comfortable time, and the gardens look best in the cooler months. It is in Rangpur city and easy to reach by rickshaw or local transport. Opening days and ticket prices can change, so check locally.",
    },
    {
      name: 'Vinnya Jagat Amusement Park',
      description: 'A popular amusement park near Rangpur city with rides, entertainment facilities and attractions for all ages.',
      image: vinnyajagat,
      highlight: 'Rides and family fun',
      category: 'adventure',
      details: "Vinnya Jagat is a popular amusement park near Rangpur city. It offers various rides, entertainment facilities and attractions for visitors of different ages, and it is an enjoyable destination for families and friends who want to spend quality time together during holidays.\n\nHolidays are the busiest days, so a weekday visit is quieter. Ticket prices and ride timings can change, so check locally before you go.",
    },
    {
      name: 'Carmichael College',
      description: 'One of the oldest and most renowned educational institutions in northern Bangladesh, known for its historic architecture and spacious campus.',
      image: carmichael,
      highlight: 'Historic campus since 1916',
      category: 'historical',
      details: "Carmichael College is one of the oldest and most renowned educational institutions in northern Bangladesh. Established in 1916, it is famous for its historic architecture, spacious campus and contribution to education. The college has played an important role in developing generations of students and remains a significant part of Rangpur's educational heritage.\n\nIt is in Rangpur city, so it is easy to combine with a visit to Tajhat Palace. It is a working college, so visiting hours can vary and it is best to check locally.",
    },
  ],
  // Routes & cost
  routes: [
    { from: 'Dhaka', to: 'Rangpur', distance: '300 km', duration: '6–7 hours', costUSD: '৳800–1,600', type: 'road', notes: 'Frequent coaches cross the Jamuna Bridge' },
    { from: 'Rangpur', to: 'Kantajew Temple', distance: '95 km', duration: '2 hours', costUSD: '৳200–2,000', type: 'road', notes: 'Travel via Dinajpur; combine with Ramsagar' },
    { from: 'Rangpur', to: 'Teesta Barrage', distance: '75 km', duration: '1.5 hours', costUSD: '৳180–1,500', type: 'road', notes: 'Best visited in clear winter weather' },
  ],
  // Restaurants
  restaurants: [
    { name: 'Rangpur Local Dining', cuisine: 'Northern Bengali', priceRange: '$', rating: 4.2, speciality: 'Rice, vegetables and local curries', location: 'Rangpur city' },
    { name: 'Dinajpur Local Eatery', cuisine: 'Bengali', priceRange: '$$', rating: 4.2, speciality: 'Kataribhog rice and freshwater fish', location: 'Dinajpur' },
    { name: 'Tajhat Area Café', cuisine: 'Café & Snacks', priceRange: '$', rating: 4.0, speciality: 'Tea, pitha and local sweets', location: 'Near Tajhat Palace' },
  ],
  // Activities
  activities: [
    { name: 'Tajhat Palace Tour', category: 'cultural', duration: '2 hours', costUSD: '৳200', difficulty: 'Easy', description: "Tour the palace museum and learn about the region's zamindar history." },
    { name: 'Kantajew Terracotta Study', category: 'cultural', duration: '2 hours', costUSD: '৳500', difficulty: 'Easy', description: "Explore the temple's carved terracotta panels with a guide." },
    { name: 'Teesta Birdwatching', category: 'nature', duration: '3 hours', costUSD: '৳700', difficulty: 'Easy', description: 'Look for winter waterbirds along river chars and irrigation channels.' },
    { name: 'Village Bicycle Tour', category: 'adventure', duration: '3 hours', costUSD: '৳800', difficulty: 'Moderate', description: 'Ride through mustard fields, bamboo villages and local markets.' },
  ],
  // Facilities
  facilities: [
    { name: 'Tajhat Palace Visitor Desk', type: 'information', location: 'Palace entrance', cost: 'Included with entry' },
    { name: 'Kantajew Temple Washroom', type: 'washroom', location: 'Visitor area', cost: '৳10' },
    { name: 'Rangpur Central Mosque', type: 'religious', location: 'Rangpur city', cost: 'Free' },
    { name: 'Rangpur Medical College Hospital', type: 'medical', location: 'Rangpur city', cost: 'Government rates', notes: '24-hour emergency services' },
  ],
};
