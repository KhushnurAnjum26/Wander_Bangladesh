/**
 * @typedef {'dhaka'|'chattogram'|'sylhet'|'khulna'|'rajshahi'|'rangpur'|'mymensingh'|'barishal'} DivisionId
 * @typedef {'nature'|'cultural'|'historical'|'adventure'|'wellness'} AttractionType
 * @typedef {'adventure'|'cultural'|'nature'|'water'|'wellness'} ActivityCategory
 *
 * @typedef {Object} TouristSpot
 * @property {string} name
 * @property {string} description
 * @property {number} mapX
 * @property {number} mapY
 * @property {string} image
 * @property {AttractionType} type
 *
 * @typedef {Object} PopularArea
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {string} highlight
 *
 * @typedef {Object} Route
 * @property {string} from
 * @property {string} to
 * @property {string} distance
 * @property {string} duration
 * @property {string} costUSD
 * @property {'road'|'air'|'boat'} type
 * @property {string} notes
 *
 * @typedef {Object} Restaurant
 * @property {string} name
 * @property {string} cuisine
 * @property {'$'|'$$'|'$$$'} priceRange
 * @property {number} rating
 * @property {string} speciality
 * @property {string} location
 *
 * @typedef {Object} Activity
 * @property {string} name
 * @property {ActivityCategory} category
 * @property {string} duration
 * @property {string} costUSD
 * @property {'Easy'|'Moderate'|'Hard'} difficulty
 * @property {string} description
 * @property {string} icon
 *
 * @typedef {Object} Facility
 * @property {string} name
 * @property {'washroom'|'religious'|'medical'|'information'|'wellness'} type
 * @property {string} location
 * @property {string} cost
 * @property {string} [notes]
 *
 * @typedef {Object} Division
 * @property {DivisionId} id
 * @property {string} name
 * @property {string} tagline
 * @property {string} description
 * @property {string} heroImage
 * @property {string} cardImage
 * @property {string} mapColor
 * @property {string[]} tags
 * @property {string} capital
 * @property {string} area
 * @property {string} population
 * @property {string} elevation
 * @property {TouristSpot[]} touristSpots
 * @property {PopularArea[]} popularAreas
 * @property {Route[]} routes
 * @property {Restaurant[]} restaurants
 * @property {Activity[]} activities
 * @property {Facility[]} facilities
 */

const images = {
  countryside: 'https://images.unsplash.com/photo-1577624060070-ca1afe89ddad?w=1600&h=900&fit=crop&auto=format',
  hills: 'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?w=1600&h=900&fit=crop&auto=format',
  coast: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=1600&h=900&fit=crop&auto=format',
  heritage: 'https://images.unsplash.com/photo-1564034503-e7c9edcb420c?w=1600&h=900&fit=crop&auto=format',
  boats: 'https://images.unsplash.com/photo-1714418903796-addc2facacd3?w=1600&h=900&fit=crop&auto=format',
  wetlands: 'https://images.unsplash.com/photo-1599074914978-2946b69e5a4a?w=1600&h=900&fit=crop&auto=format',
  lake: 'https://images.unsplash.com/photo-1549300461-11c5b94e8855?w=1600&h=900&fit=crop&auto=format',
  dhaka: 'https://images.unsplash.com/photo-1706640254398-3b04782e8c76?w=1600&h=900&fit=crop&auto=format',
  mosque: 'https://images.unsplash.com/photo-1667069254957-bf6961fd3fb5?w=1600&h=900&fit=crop&auto=format',
  tea: 'https://images.unsplash.com/photo-1706444326115-6a659b5cfda5?w=1600&h=900&fit=crop&auto=format',
  forest: 'https://images.unsplash.com/photo-1781967204168-ec8e3d68c16f?w=1600&h=900&fit=crop&auto=format',
};

/** @type {Division[]} */
export const divisions = [
  {
    id: 'dhaka',
    name: 'Dhaka Division',
    tagline: 'Living History, River Stories & A Capital in Motion',
    description: 'Dhaka Division brings together the energy of Bangladesh\'s capital with the quiet heritage towns and river landscapes around it. Mughal forts, pink palaces, centuries-old mosques, textile traditions and the historic streets of Sonargaon reveal layer after layer of Bengal\'s story.',
    heroImage: images.dhaka,
    cardImage: images.heritage,
    mapColor: '#6b3825',
    tags: ['Urban', 'History', 'Cuisine', 'River Life', 'Art'],
    capital: 'Dhaka',
    area: '20,594 km²',
    population: '44.2 million',
    elevation: '2–13m',
    touristSpots: [
      { name: 'Lalbagh Fort', description: 'A 17th-century Mughal fort complex with gardens, a mosque, audience halls and the tomb of Pari Bibi.', mapX: 260, mapY: 205, image: images.heritage, type: 'historical' },
      { name: 'Ahsan Manzil', description: 'The iconic pink palace on the Buriganga River, once home to Dhaka\'s Nawab family and now a museum.', mapX: 275, mapY: 218, image: images.dhaka, type: 'historical' },
      { name: 'Panam City, Sonargaon', description: 'A hauntingly beautiful street of merchant mansions in Bengal\'s former medieval capital.', mapX: 300, mapY: 230, image: images.heritage, type: 'cultural' },
    ],
    popularAreas: [
      { name: 'Old Dhaka', description: 'A dense maze of Mughal landmarks, spice markets, river ghats and legendary food streets.', image: images.dhaka, highlight: 'Best for heritage walks and Bengali street food' },
      { name: 'Sonargaon', description: 'Bangladesh\'s historic capital, home to Panam City, folk art museums and riverside villages.', image: images.heritage, highlight: 'Folk arts, architecture and day trips' },
      { name: 'Savar', description: 'A green suburban area known for the National Martyrs\' Memorial and Jahangirnagar University lakes.', image: images.lake, highlight: 'National history and seasonal birdwatching' },
    ],
    routes: [
      { from: 'Hazrat Shahjalal Airport', to: 'Dhaka City Centre', distance: '17 km', duration: '45–90 min', costUSD: '৳500–1,200', type: 'road', notes: 'Travel time varies significantly with traffic' },
      { from: 'Dhaka', to: 'Sonargaon', distance: '30 km', duration: '1–1.5 hours', costUSD: '৳150–1,000', type: 'road', notes: 'Use the Dhaka–Chattogram Highway via Kanchpur' },
      { from: 'Sadarghat', to: 'Buriganga River', distance: 'Local', duration: '1 hour', costUSD: '৳300–800', type: 'boat', notes: 'Hire a registered wooden boat from the terminal area' },
    ],
    restaurants: [
      { name: 'Nirob Hotel', cuisine: 'Traditional Bengali', priceRange: '$', rating: 4.5, speciality: 'Bharta platters, dal and river fish curry', location: 'Nazira Bazar, Old Dhaka' },
      { name: 'Star Kabab', cuisine: 'Bangladeshi Grill', priceRange: '$$', rating: 4.6, speciality: 'Beef kebab, kacchi biryani and firni', location: 'Dhanmondi' },
      { name: 'Haji Biriyani', cuisine: 'Old Dhaka Biryani', priceRange: '$', rating: 4.7, speciality: 'Traditional mutton biryani', location: 'Nazira Bazar' },
    ],
    activities: [
      { name: 'Old Dhaka Heritage Walk', category: 'cultural', duration: '4 hours', costUSD: '৳1,500', difficulty: 'Easy', description: 'Walk through Shankhari Bazaar, Armenian Church, Ahsan Manzil and the Buriganga riverfront.', icon: '🚶' },
      { name: 'Buriganga Boat Ride', category: 'water', duration: '1 hour', costUSD: '৳500', difficulty: 'Easy', description: 'See Dhaka\'s working river life from a traditional wooden boat.', icon: '🛶' },
      { name: 'Bengali Food Tour', category: 'cultural', duration: '3 hours', costUSD: '৳2,000', difficulty: 'Easy', description: 'Taste biryani, kebabs, bakarkhani, sweets and seasonal drinks with a local guide.', icon: '🍛' },
      { name: 'National Museum Tour', category: 'cultural', duration: '2 hours', costUSD: '৳100', difficulty: 'Easy', description: 'Explore Bangladesh\'s archaeology, art, language movement and independence history.', icon: '🏛️' },
    ],
    facilities: [
      { name: 'Bangladesh Tourism Board Desk', type: 'information', location: 'Agargaon, Dhaka', cost: 'Free', notes: 'Travel information and official guidance' },
      { name: 'Ahsan Manzil Visitor Toilets', type: 'washroom', location: 'Museum compound', cost: 'Included with entry' },
      { name: 'Baitul Mukarram National Mosque', type: 'religious', location: 'Paltan', cost: 'Free' },
      { name: 'Dhaka Medical College Hospital', type: 'medical', location: 'Bakshibazar', cost: 'Government rates', notes: '24-hour emergency services' },
    ],
  },
  {
    id: 'chattogram',
    name: 'Chattogram Division',
    tagline: 'Endless Beaches, Cloud Hills & Indigenous Culture',
    description: 'Chattogram Division stretches from Bangladesh\'s great port city to the world\'s longest natural sea beach and the forested hills of the southeast. Cox\'s Bazar, Bandarban, Rangamati and the coral waters around Saint Martin\'s Island make this the country\'s adventure capital.',
    heroImage: images.hills,
    cardImage: images.coast,
    mapColor: '#2a5438',
    tags: ['Sea Beach', 'Hill Tracts', 'Adventure', 'Islands', 'Indigenous Culture'],
    capital: 'Chattogram',
    area: '33,771 km²',
    population: '33.2 million',
    elevation: '0–1,052m',
    touristSpots: [
      { name: 'Cox\'s Bazar Sea Beach', description: 'A sweeping sandy coastline running for more than 120 kilometres along the Bay of Bengal.', mapX: 370, mapY: 310, image: images.coast, type: 'nature' },
      { name: 'Bandarban Hills', description: 'Cloud-covered peaks, waterfalls and diverse Indigenous communities in Bangladesh\'s highest terrain.', mapX: 365, mapY: 255, image: images.hills, type: 'adventure' },
      { name: 'Kaptai Lake', description: 'A vast blue reservoir surrounded by forested hills and the cultural landscapes of Rangamati.', mapX: 350, mapY: 225, image: images.lake, type: 'wellness' },
    ],
    popularAreas: [
      { name: 'Cox\'s Bazar', description: 'Bangladesh\'s best-known beach town with seafood, surf, sunsets and easy coastal excursions.', image: images.coast, highlight: 'Sunset walks on the world\'s longest natural beach' },
      { name: 'Bandarban', description: 'A hill town and gateway to Nilgiri, Chimbuk, Boga Lake and remote trekking routes.', image: images.hills, highlight: 'Mountain viewpoints and Indigenous culture' },
      { name: 'Rangamati', description: 'A relaxed lakeside town surrounded by green hills and Chakma cultural heritage.', image: images.lake, highlight: 'Kaptai Lake cruises and hanging bridge' },
    ],
    routes: [
      { from: 'Dhaka', to: 'Chattogram', distance: '264 km', duration: '5–7 hours', costUSD: '৳700–1,800', type: 'road', notes: 'Frequent air-conditioned coaches operate daily' },
      { from: 'Dhaka', to: 'Cox\'s Bazar', distance: '390 km', duration: '1 hour', costUSD: '৳4,500–9,000', type: 'air', notes: 'Direct flights operate throughout the week' },
      { from: 'Chattogram', to: 'Rangamati', distance: '77 km', duration: '2–3 hours', costUSD: '৳250–2,000', type: 'road', notes: 'Carry identification for Hill Tracts checkpoints' },
    ],
    restaurants: [
      { name: 'Mezzan Haile Aiyun', cuisine: 'Chattogram Mezban', priceRange: '$$', rating: 4.7, speciality: 'Spicy mezbani beef and kala bhuna', location: 'Chattogram city' },
      { name: 'Poushee Restaurant', cuisine: 'Bengali Seafood', priceRange: '$$', rating: 4.6, speciality: 'Coral fish, rupchanda fry and bhorta', location: 'Cox\'s Bazar' },
      { name: 'Green Hill Restaurant', cuisine: 'Hill Tracts & Bengali', priceRange: '$', rating: 4.4, speciality: 'Bamboo chicken and seasonal vegetables', location: 'Bandarban town' },
    ],
    activities: [
      { name: 'Cox\'s Bazar Beach Cycling', category: 'adventure', duration: '2 hours', costUSD: '৳500', difficulty: 'Easy', description: 'Cycle the firm shoreline during the cooler morning or sunset hours.', icon: '🚲' },
      { name: 'Kaptai Lake Cruise', category: 'water', duration: 'Half day', costUSD: '৳2,500–5,000', difficulty: 'Easy', description: 'Cruise to lakeside villages, Shuvolong waterfall and quiet forest coves.', icon: '🚤' },
      { name: 'Bandarban Ridge Trek', category: 'adventure', duration: 'Full day', costUSD: '৳3,000', difficulty: 'Hard', description: 'Trek with a registered local guide through steep forested hill routes.', icon: '🥾' },
      { name: 'Indigenous Craft Visit', category: 'cultural', duration: '2 hours', costUSD: '৳800', difficulty: 'Easy', description: 'Meet local artisans and learn about handloom textiles and bamboo craft.', icon: '🧺' },
    ],
    facilities: [
      { name: 'Cox\'s Bazar Tourist Police', type: 'information', location: 'Laboni Beach', cost: 'Free', notes: 'Visitor assistance and safety support' },
      { name: 'Laboni Beach Public Washroom', type: 'washroom', location: 'Beach access road', cost: '৳20' },
      { name: 'Anderkilla Shahi Jame Mosque', type: 'religious', location: 'Chattogram city', cost: 'Free' },
      { name: 'Cox\'s Bazar District Hospital', type: 'medical', location: 'Cox\'s Bazar town', cost: 'Government rates' },
    ],
  },
  {
    id: 'sylhet',
    name: 'Sylhet Division',
    tagline: 'Tea Gardens, Stone Rivers & Sacred Landscapes',
    description: 'Sylhet is a lush region of rolling tea estates, rain-fed forests, clear rivers and haor wetlands. Its landscapes shift from the green carpets of Srimangal to the stone beds of Jaflong and the freshwater swamp forest of Ratargul.',
    heroImage: images.tea,
    cardImage: images.wetlands,
    mapColor: '#1a4a3c',
    tags: ['Tea Gardens', 'Wetlands', 'Nature', 'Spiritual Heritage'],
    capital: 'Sylhet',
    area: '12,596 km²',
    population: '12.6 million',
    elevation: '3–335m',
    touristSpots: [
      { name: 'Ratargul Swamp Forest', description: 'Bangladesh\'s only freshwater swamp forest, best explored by small wooden boat during monsoon.', mapX: 395, mapY: 125, image: images.wetlands, type: 'nature' },
      { name: 'Jaflong', description: 'A scenic river valley beneath the Khasi hills, known for clear water, stone beds and tea gardens.', mapX: 420, mapY: 105, image: images.lake, type: 'nature' },
      { name: 'Srimangal Tea Gardens', description: 'Endless green tea estates, forest trails and village landscapes in Bangladesh\'s tea capital.', mapX: 350, mapY: 150, image: images.tea, type: 'wellness' },
    ],
    popularAreas: [
      { name: 'Srimangal', description: 'A peaceful tea town with plantation stays, cycling routes and easy access to Lawachara forest.', image: images.tea, highlight: 'Tea tasting and plantation cycling' },
      { name: 'Jaflong', description: 'A border valley where mountain streams flow around smooth stones and Khasi villages.', image: images.lake, highlight: 'Clear rivers and Khasi cultural visits' },
      { name: 'Sunamganj Haors', description: 'A vast seasonal wetland world of fishing villages, migratory birds and open horizons.', image: images.wetlands, highlight: 'Monsoon houseboat journeys' },
    ],
    routes: [
      { from: 'Dhaka', to: 'Sylhet', distance: '240 km', duration: '5–6 hours', costUSD: '৳700–1,500', type: 'road', notes: 'Train and air services are also available' },
      { from: 'Sylhet', to: 'Jaflong', distance: '56 km', duration: '2 hours', costUSD: '৳150–1,800', type: 'road', notes: 'Scenic road toward the Meghalaya foothills' },
      { from: 'Sylhet', to: 'Ratargul', distance: '26 km', duration: '1.5 hours', costUSD: '৳1,200–2,000', type: 'boat', notes: 'Road transfer followed by a local boat' },
    ],
    restaurants: [
      { name: 'Panshi Restaurant', cuisine: 'Sylheti Bengali', priceRange: '$', rating: 4.6, speciality: 'Seven-layer tea, beef curry and bhorta', location: 'Sylhet city' },
      { name: 'Kutum Bari', cuisine: 'Traditional Bengali', priceRange: '$$', rating: 4.5, speciality: 'Shatkora beef and fresh fish curry', location: 'Zindabazar, Sylhet' },
      { name: 'Tea Resort Café', cuisine: 'Café & Local', priceRange: '$$', rating: 4.4, speciality: 'Estate tea and pitha platters', location: 'Srimangal' },
    ],
    activities: [
      { name: 'Tea Estate Cycling', category: 'adventure', duration: '3 hours', costUSD: '৳1,000', difficulty: 'Moderate', description: 'Cycle quiet estate roads between tea gardens and workers\' villages.', icon: '🚲' },
      { name: 'Ratargul Boat Tour', category: 'water', duration: '2 hours', costUSD: '৳1,200', difficulty: 'Easy', description: 'Paddle beneath submerged trees in the monsoon-fed swamp forest.', icon: '🛶' },
      { name: 'Lawachara Forest Walk', category: 'nature', duration: '3 hours', costUSD: '৳800', difficulty: 'Easy', description: 'Walk with a guide in search of hoolock gibbons, birds and tropical plants.', icon: '🌿' },
      { name: 'Seven-Layer Tea Tasting', category: 'cultural', duration: '1 hour', costUSD: '৳150', difficulty: 'Easy', description: 'Taste Srimangal\'s famous layered tea and learn its local story.', icon: '🍵' },
    ],
    facilities: [
      { name: 'Sylhet Tourist Information Centre', type: 'information', location: 'Sylhet city', cost: 'Free' },
      { name: 'Ratargul Boat Ghat Washroom', type: 'washroom', location: 'Ratargul entry point', cost: '৳20' },
      { name: 'Hazrat Shah Jalal Mazar', type: 'religious', location: 'Sylhet city', cost: 'Free' },
      { name: 'Sylhet MAG Osmani Medical College', type: 'medical', location: 'Sylhet city', cost: 'Government rates' },
    ],
  },
  {
    id: 'khulna',
    name: 'Khulna Division',
    tagline: 'Mangrove Wilderness, Bengal Tigers & Mosque Cities',
    description: 'Khulna Division is the gateway to the Sundarbans, the world\'s largest mangrove forest, and to the UNESCO-listed Mosque City of Bagerhat. Tidal rivers, spotted deer, honey collectors and medieval brick architecture create a journey found nowhere else.',
    heroImage: images.forest,
    cardImage: images.mosque,
    mapColor: '#4a3a18',
    tags: ['Sundarbans', 'Wildlife', 'UNESCO Heritage', 'Rivers'],
    capital: 'Khulna',
    area: '22,285 km²',
    population: '17.4 million',
    elevation: '0–12m',
    touristSpots: [
      { name: 'Sundarbans', description: 'The world\'s largest mangrove forest, home to Bengal tigers, spotted deer, dolphins and tidal waterways.', mapX: 150, mapY: 305, image: images.forest, type: 'nature' },
      { name: 'Sixty Dome Mosque', description: 'A monumental 15th-century mosque in the UNESCO-listed historic Mosque City of Bagerhat.', mapX: 180, mapY: 260, image: images.mosque, type: 'historical' },
      { name: 'Karamjal Wildlife Centre', description: 'An accessible Sundarbans introduction with forest trails, crocodiles and deer observation areas.', mapX: 165, mapY: 290, image: images.wetlands, type: 'nature' },
    ],
    popularAreas: [
      { name: 'Mongla', description: 'The main launch point for Sundarbans cruises and boats to Karamjal.', image: images.boats, highlight: 'Gateway to the mangrove forest' },
      { name: 'Bagerhat', description: 'A quiet heritage city filled with medieval mosques, tombs and freshwater tanks.', image: images.mosque, highlight: 'UNESCO Mosque City' },
      { name: 'Koyra', description: 'A remote river landscape at the forest edge with community ecotourism and embankment villages.', image: images.wetlands, highlight: 'Community-led Sundarbans experiences' },
    ],
    routes: [
      { from: 'Dhaka', to: 'Khulna', distance: '271 km', duration: '4–5 hours', costUSD: '৳700–1,600', type: 'road', notes: 'Padma Bridge provides a direct road connection' },
      { from: 'Khulna', to: 'Mongla', distance: '48 km', duration: '1.5 hours', costUSD: '৳150–1,200', type: 'road', notes: 'Regular buses and private cars available' },
      { from: 'Mongla', to: 'Karamjal', distance: '12 km', duration: '45 min', costUSD: '৳1,500–3,500', type: 'boat', notes: 'Forest permits and registered boats are required' },
    ],
    restaurants: [
      { name: 'Citylight Café', cuisine: 'Bengali & Seafood', priceRange: '$$', rating: 4.5, speciality: 'Chingri malai curry and bhetki fry', location: 'Khulna city' },
      { name: 'Bagerhat Heritage Kitchen', cuisine: 'Traditional Bengali', priceRange: '$', rating: 4.4, speciality: 'River fish curry and seasonal bhorta', location: 'Bagerhat' },
      { name: 'Mongla Riverside Restaurant', cuisine: 'Seafood', priceRange: '$$', rating: 4.3, speciality: 'Crab curry and grilled prawns', location: 'Mongla riverfront' },
    ],
    activities: [
      { name: 'Sundarbans Wildlife Cruise', category: 'nature', duration: '2–3 days', costUSD: '৳12,000–25,000', difficulty: 'Easy', description: 'Cruise tidal channels with forest guides, watching deer, birds, dolphins and tiger signs.', icon: '🐅' },
      { name: 'Mangrove Creek Canoe', category: 'water', duration: '2 hours', costUSD: '৳1,500', difficulty: 'Easy', description: 'Enter narrow creeks by silent country boat at high tide.', icon: '🛶' },
      { name: 'Bagerhat Heritage Tour', category: 'cultural', duration: 'Half day', costUSD: '৳1,000', difficulty: 'Easy', description: 'Visit the Sixty Dome Mosque, Khan Jahan Ali\'s tomb and historic water tanks.', icon: '🕌' },
      { name: 'Birdwatching at Katka', category: 'nature', duration: '3 hours', costUSD: 'Included with cruise', difficulty: 'Moderate', description: 'Walk designated forest trails and watch kingfishers, eagles and shorebirds.', icon: '🦅' },
    ],
    facilities: [
      { name: 'Mongla Forest Permit Office', type: 'information', location: 'Mongla port area', cost: 'Permit fees apply' },
      { name: 'Karamjal Visitor Washroom', type: 'washroom', location: 'Wildlife centre', cost: 'Included with entry' },
      { name: 'Sixty Dome Mosque', type: 'religious', location: 'Bagerhat', cost: 'Free' },
      { name: 'Khulna Medical College Hospital', type: 'medical', location: 'Khulna city', cost: 'Government rates' },
    ],
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi Division',
    tagline: 'Ancient Universities, Temple Cities & Mango Country',
    description: 'Rajshahi Division holds some of Bangladesh\'s richest archaeological and architectural treasures. Paharpur\'s Buddhist monastery, Puthia\'s temple complex, the Varendra Museum and the mango orchards along the Padma tell stories stretching back more than a thousand years.',
    heroImage: images.heritage,
    cardImage: images.countryside,
    mapColor: '#4a2865',
    tags: ['Archaeology', 'Temples', 'Mangoes', 'Silk', 'History'],
    capital: 'Rajshahi',
    area: '18,174 km²',
    population: '20.4 million',
    elevation: '18–40m',
    touristSpots: [
      { name: 'Somapura Mahavihara, Paharpur', description: 'The ruins of a vast 8th-century Buddhist monastery and a UNESCO World Heritage Site.', mapX: 125, mapY: 165, image: images.heritage, type: 'historical' },
      { name: 'Puthia Temple Complex', description: 'Bangladesh\'s finest collection of historic Hindu temples around a former royal estate.', mapX: 145, mapY: 190, image: images.heritage, type: 'cultural' },
      { name: 'Varendra Research Museum', description: 'The country\'s oldest museum, renowned for sculpture, manuscripts and regional archaeology.', mapX: 120, mapY: 205, image: images.heritage, type: 'historical' },
    ],
    popularAreas: [
      { name: 'Rajshahi City', description: 'A calm riverside city celebrated for silk, mangoes, universities and the Padma embankment.', image: images.countryside, highlight: 'Padma sunsets and silk shopping' },
      { name: 'Puthia', description: 'A compact heritage town of ornate terracotta temples and palace ponds.', image: images.heritage, highlight: 'Bangladesh\'s most impressive temple group' },
      { name: 'Naogaon', description: 'A rural district of rice fields, archaeological sites and traditional village life.', image: images.countryside, highlight: 'Gateway to Paharpur' },
    ],
    routes: [
      { from: 'Dhaka', to: 'Rajshahi', distance: '245 km', duration: '5–6 hours', costUSD: '৳700–1,500', type: 'road', notes: 'Train and domestic flights are also available' },
      { from: 'Rajshahi', to: 'Puthia', distance: '32 km', duration: '45 min', costUSD: '৳80–800', type: 'road', notes: 'Direct buses use the Dhaka–Rajshahi Highway' },
      { from: 'Rajshahi', to: 'Paharpur', distance: '110 km', duration: '2.5 hours', costUSD: '৳250–2,500', type: 'road', notes: 'Best combined with Mahasthangarh on a longer route' },
    ],
    restaurants: [
      { name: 'Nanking Darbar Hall', cuisine: 'Bengali & Mughlai', priceRange: '$$', rating: 4.5, speciality: 'Mutton kacchi and local mango desserts', location: 'Rajshahi city' },
      { name: 'Padma Garden Food Court', cuisine: 'Bengali Street Food', priceRange: '$', rating: 4.3, speciality: 'Fuchka, grilled fish and tea', location: 'Padma riverfront' },
      { name: 'Puthia Rajbari Kitchen', cuisine: 'Traditional Bengali', priceRange: '$', rating: 4.4, speciality: 'Seasonal vegetables and freshwater fish', location: 'Puthia' },
    ],
    activities: [
      { name: 'Puthia Temple Walk', category: 'cultural', duration: '3 hours', costUSD: '৳800', difficulty: 'Easy', description: 'Explore terracotta temples, palace grounds and historic ponds with a local guide.', icon: '🏛️' },
      { name: 'Paharpur Archaeology Tour', category: 'cultural', duration: '3 hours', costUSD: '৳500', difficulty: 'Easy', description: 'Study the great monastery plan, terracotta plaques and site museum.', icon: '🏺' },
      { name: 'Mango Orchard Visit', category: 'nature', duration: '2 hours', costUSD: '৳600', difficulty: 'Easy', description: 'Visit during May and June for orchard walks and tastings of famous local varieties.', icon: '🥭' },
      { name: 'Padma River Sunset', category: 'water', duration: '1.5 hours', costUSD: '৳400', difficulty: 'Easy', description: 'Take a small boat from the embankment as the sun drops over the wide Padma.', icon: '🛶' },
    ],
    facilities: [
      { name: 'Rajshahi Tourism Information Desk', type: 'information', location: 'Rajshahi city', cost: 'Free' },
      { name: 'Paharpur Museum Washroom', type: 'washroom', location: 'Archaeological site', cost: 'Included with entry' },
      { name: 'Shah Makhdum Mazar', type: 'religious', location: 'Rajshahi riverfront', cost: 'Free' },
      { name: 'Rajshahi Medical College Hospital', type: 'medical', location: 'Rajshahi city', cost: 'Government rates' },
    ],
  },
  {
    id: 'rangpur',
    name: 'Rangpur Division',
    tagline: 'Royal Palaces, River Plains & Northern Heritage',
    description: 'Rangpur Division is a landscape of broad rivers, winter fields, archaeological sites and remarkable architecture. Tajhat Palace, Kantajew Temple and the Teesta Barrage anchor journeys through Bangladesh\'s far north.',
    heroImage: images.countryside,
    cardImage: images.heritage,
    mapColor: '#2d5a3c',
    tags: ['Palaces', 'Temples', 'River Landscapes', 'Rural Culture'],
    capital: 'Rangpur',
    area: '16,185 km²',
    population: '17.6 million',
    elevation: '30–42m',
    touristSpots: [
      { name: 'Tajhat Palace', description: 'A stately early-20th-century palace with a grand staircase, museum galleries and landscaped grounds.', mapX: 160, mapY: 75, image: images.heritage, type: 'historical' },
      { name: 'Kantajew Temple', description: 'An exquisite terracotta Hindu temple covered in detailed scenes from epic and everyday life.', mapX: 130, mapY: 60, image: images.heritage, type: 'cultural' },
      { name: 'Teesta Barrage', description: 'A major river engineering landmark surrounded by open northern landscapes and seasonal birdlife.', mapX: 190, mapY: 90, image: images.wetlands, type: 'nature' },
    ],
    popularAreas: [
      { name: 'Rangpur City', description: 'A relaxed northern city with Tajhat Palace, Carmichael College and tree-lined neighbourhoods.', image: images.heritage, highlight: 'Palace architecture and regional museums' },
      { name: 'Dinajpur', description: 'A historic district of temples, old estates and productive agricultural countryside.', image: images.countryside, highlight: 'Kantajew Temple and Ramsagar' },
      { name: 'Nilphamari', description: 'River plains and rural landscapes near the Teesta Barrage and northern rail heritage.', image: images.wetlands, highlight: 'Teesta views and winter birding' },
    ],
    routes: [
      { from: 'Dhaka', to: 'Rangpur', distance: '300 km', duration: '6–7 hours', costUSD: '৳800–1,600', type: 'road', notes: 'Frequent coaches cross the Jamuna Bridge' },
      { from: 'Rangpur', to: 'Kantajew Temple', distance: '95 km', duration: '2 hours', costUSD: '৳200–2,000', type: 'road', notes: 'Travel via Dinajpur; combine with Ramsagar' },
      { from: 'Rangpur', to: 'Teesta Barrage', distance: '75 km', duration: '1.5 hours', costUSD: '৳180–1,500', type: 'road', notes: 'Best visited in clear winter weather' },
    ],
    restaurants: [
      { name: 'Rangpur Dining', cuisine: 'Northern Bengali', priceRange: '$', rating: 4.4, speciality: 'Duck curry, rice and seasonal vegetables', location: 'Rangpur city' },
      { name: 'Dinajpur Food Village', cuisine: 'Bengali', priceRange: '$$', rating: 4.3, speciality: 'Kataribhog rice and freshwater fish', location: 'Dinajpur' },
      { name: 'Tajhat Café', cuisine: 'Café & Snacks', priceRange: '$', rating: 4.2, speciality: 'Tea, pitha and local sweets', location: 'Near Tajhat Palace' },
    ],
    activities: [
      { name: 'Tajhat Palace Tour', category: 'cultural', duration: '2 hours', costUSD: '৳200', difficulty: 'Easy', description: 'Tour the palace museum and learn about the region\'s zamindar history.', icon: '🏛️' },
      { name: 'Kantajew Terracotta Study', category: 'cultural', duration: '2 hours', costUSD: '৳500', difficulty: 'Easy', description: 'Explore the temple\'s thousands of carved terracotta panels with a guide.', icon: '🛕' },
      { name: 'Teesta Birdwatching', category: 'nature', duration: '3 hours', costUSD: '৳700', difficulty: 'Easy', description: 'Look for winter waterbirds along river chars and irrigation channels.', icon: '🦅' },
      { name: 'Village Bicycle Tour', category: 'adventure', duration: '3 hours', costUSD: '৳800', difficulty: 'Moderate', description: 'Ride through mustard fields, bamboo villages and local markets.', icon: '🚲' },
    ],
    facilities: [
      { name: 'Tajhat Palace Visitor Desk', type: 'information', location: 'Palace entrance', cost: 'Included with entry' },
      { name: 'Kantajew Temple Washroom', type: 'washroom', location: 'Visitor area', cost: '৳10' },
      { name: 'Rangpur Central Mosque', type: 'religious', location: 'Rangpur city', cost: 'Free' },
      { name: 'Rangpur Medical College Hospital', type: 'medical', location: 'Rangpur city', cost: 'Government rates' },
    ],
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh Division',
    tagline: 'Blue Hills, Ceramic Rivers & Zamindar Heritage',
    description: 'Mymensingh Division combines the Brahmaputra\'s broad riverbanks with old zamindar palaces and the striking blue-water hills of Birishiri. It is a gentle region of folk culture, university heritage and rural landscapes.',
    heroImage: images.lake,
    cardImage: images.countryside,
    mapColor: '#386b5a',
    tags: ['River Life', 'Folk Culture', 'Palaces', 'Hills'],
    capital: 'Mymensingh',
    area: '10,584 km²',
    population: '12.2 million',
    elevation: '12–90m',
    touristSpots: [
      { name: 'Birishiri', description: 'A border landscape of blue ceramic hills, clear Someshwari River water and Garo cultural heritage.', mapX: 275, mapY: 105, image: images.lake, type: 'nature' },
      { name: 'Shashi Lodge', description: 'An ornate zamindar mansion that reflects Mymensingh\'s late colonial architectural heritage.', mapX: 260, mapY: 145, image: images.heritage, type: 'historical' },
      { name: 'Muktagacha Palace', description: 'The atmospheric remains of a major zamindar estate, famous for architecture and local sweets.', mapX: 235, mapY: 155, image: images.heritage, type: 'historical' },
    ],
    popularAreas: [
      { name: 'Mymensingh City', description: 'A university city on the old Brahmaputra with museums, gardens and riverfront walks.', image: images.countryside, highlight: 'Brahmaputra riverfront and Shashi Lodge' },
      { name: 'Birishiri', description: 'A scenic northern escape with ceramic hills, river crossings and Indigenous villages.', image: images.lake, highlight: 'Blue-water landscapes and Garo culture' },
      { name: 'Muktagacha', description: 'A heritage town known for its palace complex and celebrated monda sweets.', image: images.heritage, highlight: 'Zamindar palace and traditional confectionery' },
    ],
    routes: [
      { from: 'Dhaka', to: 'Mymensingh', distance: '120 km', duration: '3–4 hours', costUSD: '৳350–900', type: 'road', notes: 'Train services are often more comfortable' },
      { from: 'Mymensingh', to: 'Birishiri', distance: '100 km', duration: '3 hours', costUSD: '৳250–1,800', type: 'road', notes: 'Road conditions vary in monsoon' },
      { from: 'Mymensingh', to: 'Muktagacha', distance: '17 km', duration: '40 min', costUSD: '৳50–400', type: 'road', notes: 'Local buses and auto-rickshaws operate frequently' },
    ],
    restaurants: [
      { name: 'Sarinda Restaurant', cuisine: 'Bengali', priceRange: '$$', rating: 4.4, speciality: 'River fish, bhorta and local rice dishes', location: 'Mymensingh city' },
      { name: 'Muktagacha Monda House', cuisine: 'Traditional Sweets', priceRange: '$', rating: 4.7, speciality: 'Original Muktagacha monda', location: 'Muktagacha bazaar' },
      { name: 'Birishiri River Café', cuisine: 'Local Bengali', priceRange: '$', rating: 4.2, speciality: 'Fresh fish and simple village meals', location: 'Birishiri' },
    ],
    activities: [
      { name: 'Someshwari River Walk', category: 'nature', duration: '2 hours', costUSD: '৳500', difficulty: 'Easy', description: 'Walk pale sandbanks and cross the clear, shallow river near Birishiri.', icon: '🚶' },
      { name: 'Garo Cultural Visit', category: 'cultural', duration: '3 hours', costUSD: '৳1,000', difficulty: 'Easy', description: 'Join a community-led introduction to local food, weaving and traditions.', icon: '🧺' },
      { name: 'Brahmaputra Boat Ride', category: 'water', duration: '1 hour', costUSD: '৳500', difficulty: 'Easy', description: 'See the old river channel and city skyline from a local boat.', icon: '🛶' },
      { name: 'Heritage Palace Trail', category: 'cultural', duration: 'Half day', costUSD: '৳1,200', difficulty: 'Easy', description: 'Combine Shashi Lodge and Muktagacha Palace with a local history guide.', icon: '🏛️' },
    ],
    facilities: [
      { name: 'Mymensingh Museum Desk', type: 'information', location: 'Shashi Lodge area', cost: 'Free' },
      { name: 'Birishiri Cultural Academy Washroom', type: 'washroom', location: 'Birishiri', cost: '৳20' },
      { name: 'Boro Masjid', type: 'religious', location: 'Mymensingh city', cost: 'Free' },
      { name: 'Mymensingh Medical College Hospital', type: 'medical', location: 'Mymensingh city', cost: 'Government rates' },
    ],
  },
  {
    id: 'barishal',
    name: 'Barishal Division',
    tagline: 'Floating Markets, River Highways & Coastal Sunsets',
    description: 'Barishal is Bangladesh at its most riverine. Ferries, canals and floating markets connect orchards and villages, while Kuakata offers rare views of both sunrise and sunset over the Bay of Bengal.',
    heroImage: images.boats,
    cardImage: images.coast,
    mapColor: '#6b5a2f',
    tags: ['Floating Markets', 'Rivers', 'Coast', 'Village Life'],
    capital: 'Barishal',
    area: '13,225 km²',
    population: '9.3 million',
    elevation: '1–7m',
    touristSpots: [
      { name: 'Floating Guava Market', description: 'Boats loaded with guavas gather on canals near Bhimruli during the summer harvest.', mapX: 240, mapY: 285, image: images.boats, type: 'cultural' },
      { name: 'Kuakata Sea Beach', description: 'A wide coastal beach famous for views of both sunrise and sunset over the Bay of Bengal.', mapX: 270, mapY: 350, image: images.coast, type: 'wellness' },
      { name: 'Durga Sagar', description: 'A large historic pond and peaceful green retreat with winter birdlife near Barishal city.', mapX: 250, mapY: 270, image: images.lake, type: 'historical' },
    ],
    popularAreas: [
      { name: 'Barishal City', description: 'A river port city of colonial buildings, launch terminals and tree-lined roads.', image: images.boats, highlight: 'Gateway to southern river journeys' },
      { name: 'Bhimruli', description: 'A canal village at the centre of the seasonal floating guava trade.', image: images.boats, highlight: 'Best from July to September' },
      { name: 'Kuakata', description: 'A relaxed beach town with fishing communities, Buddhist heritage and coastal forests.', image: images.coast, highlight: 'Sunrise and sunset from the same beach' },
    ],
    routes: [
      { from: 'Dhaka', to: 'Barishal', distance: '180 km', duration: '3–4 hours', costUSD: '৳500–1,200', type: 'road', notes: 'Direct road route via Padma Bridge' },
      { from: 'Dhaka', to: 'Barishal', distance: 'River route', duration: '8–10 hours', costUSD: '৳400–3,000', type: 'boat', notes: 'Overnight launches provide cabins and deck seating' },
      { from: 'Barishal', to: 'Kuakata', distance: '108 km', duration: '3 hours', costUSD: '৳250–1,500', type: 'road', notes: 'Regular buses use the coastal highway' },
    ],
    restaurants: [
      { name: 'River View Restaurant', cuisine: 'Bengali', priceRange: '$$', rating: 4.4, speciality: 'Hilsa curry and local river fish', location: 'Barishal riverfront' },
      { name: 'Kuakata Sea Kitchen', cuisine: 'Seafood', priceRange: '$$', rating: 4.5, speciality: 'Grilled pomfret, crab and prawns', location: 'Kuakata beach' },
      { name: 'Bhimruli Orchard Café', cuisine: 'Local Snacks', priceRange: '$', rating: 4.2, speciality: 'Fresh guava, pitha and tea', location: 'Bhimruli' },
    ],
    activities: [
      { name: 'Floating Market Boat Tour', category: 'water', duration: '3 hours', costUSD: '৳1,500', difficulty: 'Easy', description: 'Travel narrow canals among fruit boats, orchards and village markets.', icon: '🛶' },
      { name: 'Kuakata Sunrise Ride', category: 'adventure', duration: '2 hours', costUSD: '৳700', difficulty: 'Easy', description: 'Cycle the beach and fishing villages in the cool early morning.', icon: '🚲' },
      { name: 'Hilsa Food Experience', category: 'cultural', duration: '2 hours', costUSD: '৳1,200', difficulty: 'Easy', description: 'Learn how Bangladesh\'s national fish is prepared in several regional styles.', icon: '🐟' },
      { name: 'Coastal Forest Walk', category: 'nature', duration: '2 hours', costUSD: '৳500', difficulty: 'Easy', description: 'Walk the Gangamati forest edge with a local nature guide.', icon: '🌿' },
    ],
    facilities: [
      { name: 'Barishal Launch Terminal Help Desk', type: 'information', location: 'River port', cost: 'Free' },
      { name: 'Kuakata Beach Washroom', type: 'washroom', location: 'Main beach access', cost: '৳20' },
      { name: 'Kuakata Buddhist Temple', type: 'religious', location: 'Kuakata town', cost: 'Free' },
      { name: 'Sher-e-Bangla Medical College Hospital', type: 'medical', location: 'Barishal city', cost: 'Government rates' },
    ],
  },
];