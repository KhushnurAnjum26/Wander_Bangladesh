import { images } from '../divisionImages';
import sundarbans from '../places/sundarbans.jpg';
import rupsha from '../places/rupsha.jpg';
import sixtydome from '../places/sixtydome.jpg';

export const khulna = {
  // Basic info
  id: 'khulna',
  name: 'Khulna Division',
  tagline: 'Mangrove Wilderness, Bengal Tigers & Mosque Cities',
  description: "Khulna Division is the gateway to the Sundarbans, the world's largest mangrove forest, and to the UNESCO-listed Mosque City of Bagerhat. Tidal rivers, spotted deer, honey collectors and medieval brick architecture create a journey found nowhere else.",
  // Images & look
  heroImage: images.forest,
  cardImage: images.mosque,
  mapColor: '#4a3a18',
  tags: ['Sundarbans', 'Wildlife', 'UNESCO Heritage', 'Rivers'],
  // Quick facts
  capital: 'Khulna',
  area: '22,285 km²',
  population: '17.4 million',
  elevation: '0–12m',
  // Tourist spots (shown on the map)
  touristSpots: [
    {
      name: "Sundarbans",
      description: "The world's largest mangrove forest, home to Bengal tigers, spotted deer, dolphins and tidal waterways.",
      mapX: 118,
      mapY: 420,
      image: sundarbans,
      type: 'nature',
      details: "The Sundarbans is the world's largest mangrove forest and a UNESCO World Heritage Site, home to Bengal tigers, spotted deer, dolphins and many birds. It is explored by boat along tidal channels with a forest guide.\n\nNovember to February is the best time. Most trips start from Mongla, and forest permits and registered boats are required.",
    },
    {
      name: "Sixty Dome Mosque",
      description: "A monumental 15th-century mosque in the UNESCO-listed historic Mosque City of Bagerhat.",
      mapX: 161,
      mapY: 370,
      image: sixtydome,
      type: 'historical',
      details: "The Sixty Dome Mosque is a 15th-century brick mosque in Bagerhat, part of the UNESCO-listed Mosque City. Its large prayer hall is supported by rows of slender stone pillars and covered by many domes.\n\nVisit between November and February, ideally in the morning. It is in Bagerhat, about an hour from Khulna.",
    },
    {
      name: "Karamjal Wildlife Centre",
      description: "An accessible Sundarbans introduction with forest trails, crocodiles and deer observation areas.",
      mapX: 150,
      mapY: 392,
      image: images.forest,
      type: 'nature',
      details: "Karamjal is an easy introduction to the Sundarbans, with forest walkways, a crocodile breeding centre and deer observation areas.\n\nNovember to February is the best time. It is about 12 km from Mongla by boat, around 45 minutes. Forest permits and registered boats are required.",
    },
    {
      name: "Hiron Point",
      description: "A Sundarbans stop known for spotted deer, tidal creeks and wide mangrove views.",
      mapX: 136,
      mapY: 444,
      image: images.coast,
      type: "nature",
      details: "Hiron Point, also called Nilkamal, is a stop deep in the Sundarbans, known for spotted deer, tidal creeks and wide mangrove views. It is reached by boat as part of a Sundarbans trip.\n\nMost trips start from Mongla. Forest permits and registered boats are required, and November to February is the best time.",
    },
  ],
  // Popular areas
  popularAreas: [
    {
      name: 'Sundarbans',
      description: 'The world\'s largest mangrove forest, where spotted deer, tigers and dolphins live along tidal rivers and creeks.',
      image: sundarbans,
      highlight: 'World\'s largest mangrove forest',
      category: 'nature',
      details: "The Sundarbans is a vast mangrove forest on the coast of the Bay of Bengal, in the delta of the Ganges, Meghna and Brahmaputra rivers. It covers Khulna, Satkhira and Bagerhat districts of Bangladesh and part of West Bengal in India. About 6,016 sq km of the 10,000 sq km forest lies in Bangladesh, and it is the largest intact mangrove forest in the world and a UNESCO World Heritage Site.\n\nNovember to February is the best time. Trips usually start from Mongla and need forest permits and a registered boat.",
    },
    {
      name: 'Rupsha Khan Jahan Ali Bridge',
      description: 'A long road bridge over the Rupsha River in Khulna, beautifully lit at night.',
      image: rupsha,
      highlight: 'Rupsha River bridge at night',
      category: 'cultural',
      details: "The Khan Jahan Ali Bridge, also called the Rupsha Bridge, crosses the Rupsha River near Khulna city and connects the south-west of the country by road. At night its lights reflect on the water and make a good viewpoint from the river bank.\n\nIt is close to Khulna city, so it is easy to visit on the way in or out of the division.",
    },
    {
      name: 'Sixty Dome Mosque',
      description: 'A UNESCO-listed brick mosque in Bagerhat, built in the 15th century under Khan Jahan Ali.',
      image: sixtydome,
      highlight: 'UNESCO Mosque City of Bagerhat',
      category: 'historical',
      details: "The Sixty Dome Mosque (Shait Gombuj Masjid) in Bagerhat is the largest historic mosque in Bangladesh, built in the 15th century by Khan Jahan Ali and now part of a UNESCO World Heritage Site. Rows of brick domes sit on a long hall with many arched doorways.\n\nVisit between November and February for comfortable weather. Bagerhat is about an hour from Khulna by bus or private car, and the tomb of Khan Jahan Ali is nearby.",
    },
    {
      name: 'Mongla',
      description: 'The main launch point for Sundarbans cruises and boats to Karamjal.',
      image: images.boats,
      highlight: 'Gateway to the mangrove forest',
      category: 'adventure',
      details: "Mongla is a port town and the main starting point for Sundarbans trips. Boats to Karamjal and Harbaria leave from here, and many cruises begin at its river port.\n\nThe best months are November to February, when the weather is cooler and the forest is easier to explore. It is about 48 km from Khulna, roughly 1.5 hours by bus or private car. Forest permits and registered boats are required for the trips.",
    },
    {
      name: 'Koyra',
      description: 'A river landscape at the forest edge with community ecotourism and embankment villages.',
      image: images.countryside,
      highlight: 'Community-led Sundarbans experiences',
      category: 'cultural',
      details: "Koyra sits at the edge of the Sundarbans, with river villages, embankments and community-based tourism. A visit here is about slow river life: walking along the embankments, taking a community-led boat trip and seeing how local families live and fish beside the forest.\n\nNovember to March is the most comfortable time. You reach it by road from Khulna and then local transport. Travel time varies, so it is best to confirm locally before you go.",
    },
    {
      name: "Shilaidaha Rabindra Kuthibari",
      description: "The riverside house in Kushtia where Rabindranath Tagore stayed while managing his family estate.",
      image: images.rabindra,
      highlight: "Tagore's riverside house",
      category: "cultural",
      details: "Shilaidaha Rabindra Kuthibari is in Kumarkhali, Kushtia. Rabindranath Tagore stayed in this house while looking after his family's estate, and the surroundings are said to have inspired much of his writing.\n\nThe house is kept as a museum with a garden around it, and is a quiet stop for anyone interested in Bengali literature.",
    },
  ],
  // Routes & cost
  routes: [
    { from: 'Dhaka', to: 'Khulna', distance: '270 km', duration: '4–5 hours', costUSD: '৳700–1,600', type: 'road', notes: 'Padma Bridge provides a direct road connection' },
    { from: 'Khulna', to: 'Mongla', distance: '48 km', duration: '1.5 hours', costUSD: '৳150–1,200', type: 'road', notes: 'Regular buses and private cars available' },
    { from: 'Mongla', to: 'Karamjal', distance: '12 km', duration: '45 min', costUSD: '৳1,500–3,500', type: 'boat', notes: 'Forest permits and registered boats are required' },
  ],
  // Restaurants
  restaurants: [
    { name: 'Castle Salam', cuisine: 'Bengali & Chinese', priceRange: '$$', rating: 4.3, speciality: 'Local favourites and fish dishes', location: 'Khulna city' },
    { name: 'Bagerhat Local Eatery', cuisine: 'Traditional Bengali', priceRange: '$', rating: 4.2, speciality: 'River fish curry and seasonal bhorta', location: 'Bagerhat' },
    { name: 'Mongla Riverside Restaurant', cuisine: 'Seafood', priceRange: '$$', rating: 4.1, speciality: 'Crab curry and grilled prawns', location: 'Mongla riverfront' },
  ],
  // Activities
  activities: [
    { name: 'Sundarbans Wildlife Cruise', category: 'nature', duration: '2–3 days', costUSD: '৳12,000–25,000', difficulty: 'Easy', description: 'Cruise tidal channels with forest guides, watching deer, birds, dolphins and tiger signs.' },
    { name: 'Mangrove Creek Canoe', category: 'water', duration: '2 hours', costUSD: '৳1,500', difficulty: 'Easy', description: 'Enter narrow creeks by country boat at high tide.' },
    { name: 'Bagerhat Heritage Tour', category: 'cultural', duration: 'Half day', costUSD: '৳1,000', difficulty: 'Easy', description: "Visit the Sixty Dome Mosque, Khan Jahan Ali's tomb and historic water tanks." },
    { name: 'Birdwatching at Katka', category: 'nature', duration: '3 hours', costUSD: 'Included with cruise', difficulty: 'Moderate', description: 'Walk designated forest trails and watch kingfishers, eagles and shorebirds.' },
  ],
  // Facilities
  facilities: [
    { name: 'Mongla Forest Permit Office', type: 'information', location: 'Mongla port area', cost: 'Permit fees apply' },
    { name: 'Karamjal Visitor Washroom', type: 'washroom', location: 'Wildlife centre', cost: 'Included with entry' },
    { name: 'Sixty Dome Mosque', type: 'religious', location: 'Bagerhat', cost: 'Free' },
    { name: 'Khulna Medical College Hospital', type: 'medical', location: 'Khulna city', cost: 'Government rates', notes: '24-hour emergency services' },
  ],
};
