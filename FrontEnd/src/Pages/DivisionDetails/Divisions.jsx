import { useState, useEffect } from 'react';
import { divisions } from '../../data/bangladesh';
import BangladeshMap from "../../components/BangladeshMap";

/**
 * @typedef {import('../data/bangladesh').DivisionId} DivisionId
 * @typedef {'All'|'Nature'|'Cultural'|'Adventure'|'Wildlife'|'History'|'Wellness'} TagFilter
 */

/** @type {TagFilter[]} */
const TAG_FILTERS = ['All', 'Nature', 'Cultural', 'Adventure', 'Wildlife', 'History', 'Wellness'];

/** @type {Record<TagFilter, string[]>} */
const TAG_MAP = {
  All: [],
  Nature: ['Nature', 'Wetlands', 'Sundarbans', 'Tea Gardens', 'Rivers'],
  Cultural: ['Culture', 'Urban', 'Art', 'Temples', 'Mosques', 'Floating Markets'],
  Adventure: ['Adventure', 'Hill Tracts', 'Sea Beach', 'Islands'],
  Wildlife: ['Wildlife', 'Sundarbans', 'Wetlands'],
  History: ['History', 'Archaeology', 'Heritage', 'Palaces', 'Temples'],
  Wellness: ['Wellness', 'Tea Gardens', 'Coast'],
};

/**
 * @param {Object} props
 * @param {(page: 'home' | 'divisions' | 'detail', divisionId?: DivisionId) => void} props.onNavigate
 */
export default function Divisions({ onNavigate }) {
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedTag, setSelectedTag] = useState('All');
  const [mapHovered, setMapHovered] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = divisions.filter((d) => {
    const provinceMatch = selectedProvince === 'all' || d.id === selectedProvince;
    if (!provinceMatch) return false;
    if (selectedTag === 'All') return true;
    const allowedTags = TAG_MAP[selectedTag];
    return d.tags.some((t) => allowedTags.some((a) => t.toLowerCase().includes(a.toLowerCase())));
  });

  return (
    <div className="min-h-screen bg-[#f5ede0] pt-16">
      {/* Page header */}
      <div className="bg-[#1e3d28] text-[#f5ede0] py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-[#c8d4c0] text-sm mb-6 hover:text-[#f5ede0] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </button>
          <p className="text-[#c4602a] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Eight Divisions
          </p>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-light mb-4">
            Explore Bangladesh's Divisions
          </h1>
          <p className="text-[#c8d4c0] text-lg max-w-xl">
            Filter by division or interest to find your perfect Bangladesh destination.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          {/* SIDEBAR */}
          <aside className="space-y-8">
            {/* Map filter */}
            <div className="bg-[#ede3d2] rounded-2xl p-5 border border-[#d4c8b8]">
              <h3 className="font-[var(--font-display)] text-[#1e3d28] text-sm font-semibold uppercase tracking-widest mb-4">
                Filter by Division
              </h3>
              <p className="text-xs text-[#6a5a48] mb-4">Click a division on the map or select below</p>
              <BangladeshMap
                highlightedDivision={selectedProvince === 'all' ? mapHovered : selectedProvince}
                onDivisionClick={(id) => setSelectedProvince(id === selectedProvince ? 'all' : id)}
                interactive
                compact
              />

              {/* Province buttons */}
              <div className="mt-4 space-y-1.5">
                <button
                  onClick={() => setSelectedProvince('all')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    selectedProvince === 'all'
                      ? 'bg-[#1e3d28] text-[#f5ede0]'
                      : 'text-[#4a3a28] hover:bg-[#d4c8b8]'
                  }`}
                >
                  All Divisions
                </button>
                {divisions.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedProvince(d.id === selectedProvince ? 'all' : d.id)}
                    onMouseEnter={() => setMapHovered(d.id)}
                    onMouseLeave={() => setMapHovered(null)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                      selectedProvince === d.id
                        ? 'bg-[#1e3d28] text-[#f5ede0]'
                        : 'text-[#4a3a28] hover:bg-[#d4c8b8]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: d.mapColor }}
                    />
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="bg-[#ede3d2] rounded-2xl p-5 border border-[#d4c8b8]">
              <h3 className="font-[var(--font-display)] text-[#1e3d28] text-sm font-semibold uppercase tracking-widest mb-4">
                Filter by Interest
              </h3>
              <div className="flex flex-wrap gap-2">
                {TAG_FILTERS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-[#c4602a] text-[#f5ede0]'
                        : 'bg-[#d4c8b8] text-[#4a3a28] hover:bg-[#c8b8a8]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {(selectedProvince !== 'all' || selectedTag !== 'All') && (
              <button
                onClick={() => { setSelectedProvince('all'); setSelectedTag('All'); }}
                className="w-full py-2.5 rounded-xl border border-[#c8bfb0] text-sm text-[#6a5a48] hover:text-[#2a1a0e] hover:border-[#8a7a68] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* RESULTS */}
          <main>
            {/* Result count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#6a5a48] text-sm">
                Showing <strong className="text-[#2a1a0e]">{filtered.length}</strong> of {divisions.length} divisions
              </p>
              {selectedProvince !== 'all' && (
                <span className="text-xs text-[#c4602a] font-medium">
                  Filtered by: {divisions.find((d) => d.id === selectedProvince)?.name}
                </span>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-[#8a7a68]">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="font-[var(--font-display)] text-xl">No divisions match these filters</p>
                <button
                  onClick={() => { setSelectedProvince('all'); setSelectedTag('All'); }}
                  className="mt-4 text-sm text-[#c4602a] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filtered.map((div) => (
                  <div
                    key={div.id}
                    onClick={() => onNavigate('detail', div.id)}
                    className="group bg-[#f5ede0] border border-[#d4c8b8] rounded-2xl overflow-hidden hover:border-[#1e3d28] hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-56 bg-[#d4c8b8] overflow-hidden">
                      <img
                        src={div.cardImage}
                        alt={div.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a18]/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {div.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-[#f5ede0]/20 backdrop-blur-sm text-[#f5ede0] text-[10px] font-medium rounded-full border border-[#f5ede0]/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-[var(--font-display)] text-[#1e3d28] text-xl font-semibold">
                            {div.name}
                          </h3>
                          <p className="text-xs text-[#8a7a68] mt-0.5">Capital: {div.capital}</p>
                        </div>
                        <span
                          className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: div.mapColor }}
                        />
                      </div>
                      <p className="text-[#c4602a] text-xs font-medium italic mb-3">{div.tagline}</p>
                      <p className="text-[#4a3a28] text-sm leading-relaxed mb-4 line-clamp-3">
                        {div.description.substring(0, 140)}…
                      </p>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-b border-[#e8ddd0]">
                        <div className="text-center">
                          <div className="text-xs font-semibold text-[#1e3d28]">{div.touristSpots.length}</div>
                          <div className="text-[10px] text-[#8a7a68]">Spots</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-[#1e3d28]">{div.activities.length}</div>
                          <div className="text-[10px] text-[#8a7a68]">Activities</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-[#1e3d28]">{div.restaurants.length}</div>
                          <div className="text-[10px] text-[#8a7a68]">Restaurants</div>
                        </div>
                      </div>

                      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3d28] group-hover:text-[#c4602a] transition-colors">
                        View full guide
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}