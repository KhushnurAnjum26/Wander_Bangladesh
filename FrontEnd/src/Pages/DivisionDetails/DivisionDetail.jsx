import { useState, useEffect, useRef } from 'react';
import { divisions } from '../../data/bangladesh';
import BangladeshMap from "../../components/BangladeshMap";

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: '📍' },
  { id: 'map', label: 'Map & Spots', icon: '🗺️' },
  { id: 'areas', label: 'Popular Areas', icon: '⭐' },
  { id: 'routes', label: 'Routes & Cost', icon: '🚗' },
  { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
  { id: 'activities', label: 'Activities', icon: '🎯' },
  { id: 'facilities', label: 'Facilities', icon: '🏥' },
];

const DIFFICULTY_COLOR = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Hard: 'bg-red-100 text-red-800',
};

const FACILITY_ICONS = {
  washroom: '🚻',
  religious: '🕌',
  medical: '🏥',
  information: 'ℹ️',
  wellness: '🧘',
};

export default function DivisionDetail({ divisionId, onNavigate }) {
  const division = divisions.find((d) => d.id === divisionId);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedSpot, setSelectedSpot] = useState(0);
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');
  const sectionRefs = useRef({
    overview: null, map: null, areas: null, routes: null, restaurants: null, activities: null, facilities: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [divisionId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!division) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5ede0]">
        <div className="text-center">
          <p className="text-[#8a7a68]">Division not found.</p>
          <button onClick={() => onNavigate('divisions')} className="mt-4 text-[#c4602a] text-sm hover:underline">
            Back to divisions
          </button>
        </div>
      </div>
    );
  }

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  const filteredActivities =
    activityFilter === 'all' ? division.activities : division.activities.filter((a) => a.category === activityFilter);
  const filteredFacilities =
    facilityFilter === 'all' ? division.facilities : division.facilities.filter((f) => f.type === facilityFilter);

  return (
    <div className="min-h-screen bg-[#f5ede0]">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${division.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e2018]/85 via-[#0e2018]/30 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[#c8d4c0] text-xs mb-6">
            <button onClick={() => onNavigate('home')} className="hover:text-[#f5ede0] transition-colors">
              Home
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('divisions')} className="hover:text-[#f5ede0] transition-colors">
              Divisions
            </button>
            <span>/</span>
            <span className="text-[#f5ede0]">{division.name}</span>
          </nav>

          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: division.mapColor === '#6b3825' ? '#e88a5a' : '#c4d8a0' }}
              >
                Bangladesh Division
              </p>
              <h1 className="font-[var(--font-display)] text-[#f5ede0] text-4xl md:text-6xl font-light leading-tight mb-3">
                {division.name}
              </h1>
              <p className="text-[#c8d8c0] text-lg md:text-xl italic font-[var(--font-display)] font-light">
                {division.tagline}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 text-[#f5ede0]/90">
              {[
                { label: 'Capital', value: division.capital },
                { label: 'Area', value: division.area },
                { label: 'Population', value: division.population },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-[var(--font-display)] text-lg font-semibold">{s.value}</div>
                  <div className="text-xs text-[#c8d8c0]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY NAV */}
      <nav className="sticky top-16 z-40 bg-[#f5ede0]/95 backdrop-blur-sm border-b border-[#c8bfb0] shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeSection === s.id
                    ? 'bg-[#1e3d28] text-[#f5ede0]'
                    : 'text-[#4a3a28] hover:bg-[#e8ddd0]'
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* OVERVIEW */}
        <section
          id="overview"
          ref={(el) => { sectionRefs.current.overview = el; }}
          className="py-16 border-b border-[#d4c8b8]"
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle label="About This Division" />
              <p className="text-[#3a2a18] text-base leading-relaxed mb-6">{division.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Capital', value: division.capital, icon: '🏙️' },
                  { label: 'Area', value: division.area, icon: '📐' },
                  { label: 'Population', value: division.population, icon: '👥' },
                  { label: 'Elevation', value: division.elevation, icon: '⛰️' },
                  { label: 'Tourist Spots', value: `${division.touristSpots.length} key attractions`, icon: '📍' },
                  { label: 'Activities', value: `${division.activities.length} options`, icon: '🎯' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#ede3d2] rounded-xl px-4 py-3 border border-[#d4c8b8]">
                    <div className="text-sm mb-0.5">{item.icon}</div>
                    <div className="font-semibold text-[#1e3d28] text-sm">{item.value}</div>
                    <div className="text-[10px] text-[#8a7a68]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags & highlights */}
            <div>
              <div className="bg-[#ede3d2] rounded-2xl p-6 border border-[#d4c8b8] mb-6">
                <h3 className="font-[var(--font-display)] text-[#1e3d28] text-sm font-semibold uppercase tracking-widest mb-4">
                  Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {division.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-[#f5ede0]"
                      style={{ backgroundColor: division.mapColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Tourist spots preview */}
              <div className="space-y-3">
                {division.touristSpots.map((spot, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-[#f5ede0] border border-[#d4c8b8] rounded-xl overflow-hidden hover:border-[#1e3d28] transition-colors cursor-pointer"
                    onClick={() => setSelectedSpot(i)}
                  >
                    <div className="w-20 h-20 flex-shrink-0 bg-[#d4c8b8] overflow-hidden">
                      <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="py-3 pr-4 flex-1 min-w-0">
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase text-[#c4602a]"
                      >
                        {spot.type}
                      </span>
                      <p className="font-semibold text-[#1e3d28] text-sm">{spot.name}</p>
                      <p className="text-xs text-[#6a5a48] truncate">{spot.description.substring(0, 60)}…</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section
          id="map"
          ref={(el) => { sectionRefs.current.map = el; }}
          className="py-16 border-b border-[#d4c8b8]"
        >
          <SectionTitle label="Interactive Map" subtitle="Division highlighted with key tourist attractions" />
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 mt-8">
            <div className="bg-[#ede3d2] rounded-2xl p-6 border border-[#d4c8b8]">
              <BangladeshMap
                highlightedDivision={divisionId}
                spots={division.touristSpots}
                interactive={false}
              />
            </div>

            {/* Spot detail panel */}
            <div className="space-y-4">
              <h3 className="font-[var(--font-display)] text-[#1e3d28] text-sm font-semibold uppercase tracking-widest">
                Tourist Spots
              </h3>
              {division.touristSpots.map((spot, i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                    selectedSpot === i
                      ? 'border-[#1e3d28] shadow-md'
                      : 'border-[#d4c8b8] hover:border-[#8a7a68]'
                  }`}
                  onClick={() => setSelectedSpot(i)}
                >
                  <div className="h-32 bg-[#d4c8b8] overflow-hidden">
                    <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 bg-[#f5ede0]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        spot.type === 'nature' ? 'bg-green-100 text-green-800' :
                        spot.type === 'adventure' ? 'bg-orange-100 text-orange-800' :
                        spot.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                        spot.type === 'historical' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {spot.type}
                      </span>
                    </div>
                    <p className="font-[var(--font-display)] font-semibold text-[#1e3d28] text-sm mb-1">{spot.name}</p>
                    <p className="text-xs text-[#6a5a48] leading-relaxed">{spot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POPULAR AREAS */}
        <section
          id="areas"
          ref={(el) => { sectionRefs.current.areas = el; }}
          className="py-16 border-b border-[#d4c8b8]"
        >
          <SectionTitle label="Most Popular Areas" subtitle="Key destinations within the division" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {division.popularAreas.map((area, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-[#d4c8b8] hover:shadow-md hover:border-[#1e3d28] transition-all">
                <div className="relative h-48 bg-[#d4c8b8] overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a18]/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-xs font-medium text-[#f5ede0]/90">⭐ {area.highlight}</span>
                  </div>
                </div>
                <div className="p-5 bg-[#f5ede0]">
                  <h3 className="font-[var(--font-display)] text-[#1e3d28] text-lg font-semibold mb-2">{area.name}</h3>
                  <p className="text-sm text-[#4a3a28] leading-relaxed">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROUTES & COST */}
        <section
          id="routes"
          ref={(el) => { sectionRefs.current.routes = el; }}
          className="py-16 border-b border-[#d4c8b8]"
        >
          <SectionTitle label="Roads, Routes & Costs" subtitle="How to get there — transport options and estimated costs" />
          <div className="mt-8 space-y-4">
            {division.routes.map((route, i) => (
              <div
                key={i}
                className="bg-[#ede3d2] border border-[#d4c8b8] rounded-2xl p-5 grid md:grid-cols-[1fr_auto] gap-4 items-center"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">
                      {route.type === 'road' ? '🚗' : route.type === 'air' ? '✈️' : '⛵'}
                    </span>
                    <div>
                      <span className="font-[var(--font-display)] font-semibold text-[#1e3d28] text-base">
                        {route.from}
                      </span>
                      <span className="text-[#8a7a68] mx-2">→</span>
                      <span className="font-[var(--font-display)] font-semibold text-[#1e3d28] text-base">
                        {route.to}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6a5a48] ml-9">{route.notes}</p>
                </div>
                <div className="flex md:flex-col gap-4 md:gap-1 md:text-right flex-wrap">
                  <div>
                    <div className="text-[#1e3d28] font-semibold text-sm">{route.distance}</div>
                    <div className="text-[10px] text-[#8a7a68]">Distance</div>
                  </div>
                  <div>
                    <div className="text-[#1e3d28] font-semibold text-sm">{route.duration}</div>
                    <div className="text-[10px] text-[#8a7a68]">Duration</div>
                  </div>
                  <div>
                    <div className="text-[#c4602a] font-semibold text-sm">{route.costUSD}</div>
                    <div className="text-[10px] text-[#8a7a68]">Est. Cost</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESTAURANTS */}
        <section
          id="restaurants"
          ref={(el) => { sectionRefs.current.restaurants = el; }}
          className="py-16 border-b border-[#d4c8b8]"
        >
          <SectionTitle label="Restaurants & Dining" subtitle="Where to eat near the tourist spots" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {division.restaurants.map((r, i) => (
              <RestaurantCard key={i} restaurant={r} />
            ))}
          </div>
        </section>

        {/* ACTIVITIES */}
        <section
          id="activities"
          ref={(el) => { sectionRefs.current.activities = el; }}
          className="py-16 border-b border-[#d4c8b8]"
        >
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <SectionTitle label="Activities" subtitle="Things to do in the division" noMargin />
            <div className="flex gap-2 flex-wrap">
              {['all', 'adventure', 'cultural', 'nature', 'water', 'wellness'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivityFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                    activityFilter === cat
                      ? 'bg-[#1e3d28] text-[#f5ede0]'
                      : 'bg-[#e8ddd0] text-[#4a3a28] hover:bg-[#d4c8b8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredActivities.map((a, i) => (
              <ActivityCard key={i} activity={a} />
            ))}
          </div>
        </section>

        {/* FACILITIES */}
        <section
          id="facilities"
          ref={(el) => { sectionRefs.current.facilities = el; }}
          className="py-16"
        >
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <SectionTitle label="Facilities & Services" subtitle="Washrooms, religious institutions, medical & info" noMargin />
            <div className="flex gap-2 flex-wrap">
              {['all', 'washroom', 'religious', 'medical', 'information', 'wellness'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFacilityFilter(type)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                    facilityFilter === type
                      ? 'bg-[#1e3d28] text-[#f5ede0]'
                      : 'bg-[#e8ddd0] text-[#4a3a28] hover:bg-[#d4c8b8]'
                  }`}
                >
                  {type !== 'all' && <span>{FACILITY_ICONS[type]}</span>}
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFacilities.map((f, i) => (
              <FacilityCard key={i} facility={f} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionTitle({ label, subtitle, noMargin }) {
  return (
    <div className={noMargin ? '' : 'mb-0'}>
      <p className="text-[#c4602a] text-xs font-semibold tracking-[0.2em] uppercase mb-2">{label}</p>
      {subtitle && <p className="text-[#6a5a48] text-sm">{subtitle}</p>}
    </div>
  );
}

function RestaurantCard({ restaurant }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(restaurant.rating));
  return (
    <div className="bg-[#ede3d2] border border-[#d4c8b8] rounded-2xl p-5 hover:border-[#1e3d28] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-[var(--font-display)] text-[#1e3d28] font-semibold text-base">{restaurant.name}</h4>
          <p className="text-xs text-[#6a5a48]">{restaurant.cuisine}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
          restaurant.priceRange === '$' ? 'border-green-300 text-green-700 bg-green-50' :
          restaurant.priceRange === '$$' ? 'border-amber-300 text-amber-700 bg-amber-50' :
          'border-red-300 text-red-700 bg-red-50'
        }`}>
          {restaurant.priceRange}
        </span>
      </div>

      <div className="flex items-center gap-1 mb-2">
        {stars.map((filled, i) => (
          <span key={i} className={`text-xs ${filled ? 'text-[#c4602a]' : 'text-[#c8bfb0]'}`}>★</span>
        ))}
        <span className="text-xs text-[#8a7a68] ml-1">{restaurant.rating}</span>
      </div>

      <div className="bg-[#f5ede0] rounded-xl px-3 py-2 mb-2">
        <p className="text-xs text-[#4a3a28]">
          <span className="font-medium text-[#c4602a]">Speciality: </span>
          {restaurant.speciality}
        </p>
      </div>

      <p className="text-xs text-[#6a5a48] flex items-center gap-1">
        <span>📍</span>
        {restaurant.location}
      </p>
    </div>
  );
}

function ActivityCard({ activity }) {
  return (
    <div className="bg-[#ede3d2] border border-[#d4c8b8] rounded-2xl p-5 hover:border-[#1e3d28] hover:shadow-sm transition-all">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{activity.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-[var(--font-display)] text-[#1e3d28] font-semibold text-base leading-tight">
            {activity.name}
          </h4>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${DIFFICULTY_COLOR[activity.difficulty]}`}>
              {activity.difficulty}
            </span>
            <span className="text-xs text-[#8a7a68]">{activity.duration}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-semibold text-[#c4602a] text-sm">{activity.costUSD}</div>
          <div className="text-[10px] text-[#8a7a68]">per person</div>
        </div>
      </div>
      <p className="text-xs text-[#4a3a28] leading-relaxed">{activity.description}</p>
    </div>
  );
}

function FacilityCard({ facility }) {
  return (
    <div className="bg-[#f5ede0] border border-[#d4c8b8] rounded-2xl p-4 hover:border-[#8a7a68] transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{FACILITY_ICONS[facility.type] || '📍'}</span>
        <div>
          <h4 className="font-semibold text-[#1e3d28] text-sm">{facility.name}</h4>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            facility.type === 'washroom' ? 'bg-blue-100 text-blue-700' :
            facility.type === 'religious' ? 'bg-purple-100 text-purple-700' :
            facility.type === 'medical' ? 'bg-red-100 text-red-700' :
            'bg-green-100 text-green-700'
          }`}>
            {facility.type}
          </span>
        </div>
      </div>
      <p className="text-xs text-[#6a5a48] flex items-center gap-1 mb-1">
        <span>📍</span> {facility.location}
      </p>
      <p className="text-xs text-[#4a3a28] flex items-center gap-1 mb-1">
        <span>💰</span> {facility.cost}
      </p>
      {facility.notes && (
        <p className="text-xs text-[#8a7a68] italic mt-1">{facility.notes}</p>
      )}
    </div>
  );
}