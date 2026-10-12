import { useState, useEffect } from 'react';
import { divisions } from '../../data/bangladesh';
import BangladeshMap from "../../components/BangladeshMap";

/**
 * @typedef {import('../data/bangladesh').DivisionId} DivisionId
 */

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1577624060070-ca1afe89ddad?w=1800&h=1000&fit=crop&auto=format';

const STATS = [
  { value: '8', label: 'Divisions' },
  { value: '50+', label: 'Featured Places' },
  { value: '700+', label: 'Rivers' },
  { value: '120 km', label: 'Natural Sea Beach' },
  { value: '3', label: 'UNESCO World Heritage Sites' },
];

/**
 * @param {Object} props
 * @param {(page: 'home' | 'divisions' | 'detail', divisionId?: DivisionId) => void} props.onNavigate
 */
export default function Home({ onNavigate }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5ede0]">
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            opacity: heroLoaded ? 1 : 0,
          }}
        />
        <img
          src={HERO_IMAGE}
          alt=""
          className="hidden"
          onLoad={() => setHeroLoaded(true)}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a18]/80 via-[#1a2a18]/30 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
          <p className="text-[#c4602a] text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-fadeInUp">
            The Land of Rivers
          </p>
          <h1
            className="font-[var(--font-display)] text-[#f5ede0] text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] mb-6"
            style={{ animationDelay: '0.1s' }}
          >
            Discover<br />
            <em className="font-semibold not-italic">Bangladesh</em>
          </h1>
          <p className="text-[#e8d8c8] text-lg md:text-xl max-w-xl leading-relaxed mb-10" style={{ animationDelay: '0.2s' }}>
            Mangrove forests. Tea gardens. Golden beaches. Ancient cities. One unforgettable country.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('divisions')}
              className="px-8 py-3.5 bg-[#c4602a] text-[#f5ede0] text-sm font-semibold rounded-full hover:bg-[#d4783e] transition-colors"
            >
              Explore Divisions
            </button>
            <button
              onClick={() => onNavigate('divisions')}
              className="px-8 py-3.5 border border-[#f5ede0]/40 text-[#f5ede0] text-sm font-semibold rounded-full hover:bg-[#f5ede0]/10 transition-colors"
            >
              Plan Your Journey
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-[#f5ede0]/60">
          <span className="text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-[#f5ede0]/30 relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-[#f5ede0]/70 animate-bounce" />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#1e3d28] text-[#f5ede0]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-between gap-y-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-4">
                <div className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-[#c4602a]">
                  {s.value}
                </div>
                <div className="text-xs text-[#c8d4c0] mt-0.5 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#c4602a] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              About Bangladesh
            </p>
            <h2 className="font-[var(--font-display)] text-[#1e3d28] text-4xl md:text-5xl font-light leading-tight mb-6">
              A country shaped by rivers and stories
            </h2>
            <p className="text-[#4a3a28] leading-relaxed text-lg mb-6">
              At the meeting point of mighty rivers and the Bay of Bengal, Bangladesh is a country of
              extraordinary contrasts — mangrove wilderness and energetic cities, tea-covered hills and
              endless beaches, ancient mosques and colourful river ports. Its warmth, food and living
              traditions reward every curious traveller.
            </p>
            <p className="text-[#4a3a28] leading-relaxed text-base mb-8">
              From the tea gardens of Sylhet to the Sundarbans in Khulna and the hill country of Chattogram,
              eight distinct divisions each tell a different chapter of Bangladesh's story. Use the map to begin yours.
            </p>
            <button
              onClick={() => onNavigate('divisions')}
              className="inline-flex items-center gap-2 text-[#1e3d28] font-semibold text-sm border-b-2 border-[#c4602a] pb-0.5 hover:text-[#c4602a] transition-colors"
            >
              Browse all divisions
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Interactive mini-map */}
          <div className="bg-[#ede3d2] rounded-2xl p-6 border border-[#d4c8b8]">
            <p className="text-xs text-[#6a5a48] font-semibold tracking-widest uppercase mb-4">
              Click a division to explore
            </p>
            <BangladeshMap
              highlightedDivision={hoveredProvince}
              onDivisionClick={(id) => onNavigate('detail', id)}
              interactive
              compact
            />
          </div>
        </div>
      </section>

      {/* DIVISIONS GRID */}
      <section className="bg-[#ede3d2] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#c4602a] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Eight Divisions
              </p>
              <h2 className="font-[var(--font-display)] text-[#1e3d28] text-4xl md:text-5xl font-light">
                Where do you want to go?
              </h2>
            </div>
            <button
              onClick={() => onNavigate('divisions')}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[#4a3a28] hover:text-[#1e3d28] transition-colors"
            >
              View all
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Province cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((div) => (
              <ProvinceCard
                key={div.id}
                division={div}
                onHover={() => setHoveredProvince(div.id)}
                onLeave={() => setHoveredProvince(null)}
                onClick={() => onNavigate('detail', div.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1706444326115-6a659b5cfda5?w=1400&h=600&fit=crop&auto=format)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#1e3d28]/80" />
          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <p className="text-[#c4602a] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Start Planning
            </p>
            <h2 className="font-[var(--font-display)] text-[#f5ede0] text-4xl md:text-5xl font-light mb-6">
              Your Bangladesh journey begins with one click
            </h2>
            <p className="text-[#c8d8c0] text-lg max-w-xl mx-auto mb-10">
              Explore maps, routes, costs, restaurants, and activities for every division of Bangladesh.
            </p>
            <button
              onClick={() => onNavigate('divisions')}
              className="px-10 py-4 bg-[#c4602a] text-[#f5ede0] font-semibold rounded-full hover:bg-[#d4783e] transition-colors"
            >
              Explore All Divisions
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#c8bfb0] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1e3d28] flex items-center justify-center text-[#f5ede0] text-xs font-bold">
              R
            </div>
            <span className="font-[var(--font-display)] text-[#1e3d28] font-semibold">
              Explore<span className="text-[#c4602a]">Bangladesh</span>
            </span>
          </div>
          <p className="text-xs text-[#8a7a68]">
            © 2026 ExploreBangladesh. Promoting thoughtful travel across the Land of Rivers.
          </p>
          <div className="flex gap-5 text-xs text-[#6a5a48]">
            <button className="hover:text-[#1e3d28] transition-colors">About</button>
            <button className="hover:text-[#1e3d28] transition-colors">Contact</button>
            <button className="hover:text-[#1e3d28] transition-colors">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {(typeof divisions)[number]} props.division
 * @param {() => void} props.onHover
 * @param {() => void} props.onLeave
 * @param {() => void} props.onClick
 */
function ProvinceCard({ division, onHover, onLeave, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="group bg-[#f5ede0] rounded-2xl overflow-hidden border border-[#d4c8b8] hover:border-[#1e3d28] hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-52 bg-[#d4c8b8] overflow-hidden">
        <img
          src={division.cardImage}
          alt={division.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Province color accent */}
        <div
          className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#f5ede0] uppercase"
          style={{ backgroundColor: division.mapColor }}
        >
          {division.capital}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-[var(--font-display)] text-[#1e3d28] text-xl font-semibold mb-1">
          {division.name}
        </h3>
        <p className="text-[#c4602a] text-xs font-medium italic mb-3">{division.tagline}</p>
        <p className="text-[#4a3a28] text-sm leading-relaxed mb-4 line-clamp-2">
          {division.description.substring(0, 110)}…
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {division.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-[#e8ddd0] text-[#4a3a28] text-[10px] font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3d28] group-hover:text-[#c4602a] transition-colors">
          Explore division
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}