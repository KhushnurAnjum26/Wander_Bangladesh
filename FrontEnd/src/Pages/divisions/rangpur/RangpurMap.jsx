import { useState } from 'react';
import BangladeshMap from '../../../components/DivisionShared/BangladeshMap';
import Button from '../../../components/DivisionShared/Button';
import DetailsModal from '../../../components/DivisionShared/DetailsModal';
import ImageLightbox from '../../../components/DivisionShared/ImageLightbox';
import FilterTabs from '../../../components/DivisionShared/FilterTabs';
import Reveal from '../../../components/DivisionShared/Reveal';
import SectionTitle from '../../../components/DivisionShared/SectionTitle';
import { rangpur } from '../../../data/divisions/rangpur';

// Part 2 of a division page: Map & Spots and Popular Areas (with filters and Read more).
// Everything for the Rangpur map part lives in this file. Content comes from data/divisions/rangpur.js.

const TYPE_STYLE = {
    nature: 'bg-green-100 text-green-800',
    adventure: 'bg-orange-100 text-orange-800',
    cultural: 'bg-purple-100 text-purple-800',
    historical: 'bg-amber-100 text-amber-800',
    wellness: 'bg-sky-100 text-sky-800',
};
const VISIBLE = 3; // how many cards show before "See more"

export default function RangpurMap() {
    const division = rangpur;
    const [selectedSpot, setSelectedSpot] = useState(division.touristSpots[0]?.name ?? null);
    const [spotFilter, setSpotFilter] = useState('all');
    const [areaFilter, setAreaFilter] = useState('all');
    const [openItem, setOpenItem] = useState(null); // area or spot shown in the Read more popup
    const [showAllSpots, setShowAllSpots] = useState(false);
    const [showAllAreas, setShowAllAreas] = useState(false);
    const [zoomed, setZoomed] = useState(null); // spot or area whose picture is shown full size

    const countBy = (list, key) => list.reduce((acc, item) => ({ ...acc, all: acc.all + 1, [item[key]]: (acc[item[key]] || 0) + 1 }), { all: 0 });

    // Tourist spots: only show the types this division really has
    const spotTypes = ['all', ...new Set(division.touristSpots.map((s) => s.type))];
    const spotCounts = countBy(division.touristSpots, 'type');
    const filteredSpots = spotFilter === 'all' ? division.touristSpots : division.touristSpots.filter((s) => s.type === spotFilter);

    // Popular areas: same idea, filter by category
    const areaTypes = ['all', ...new Set(division.popularAreas.map((a) => a.category))];
    const areaCounts = countBy(division.popularAreas, 'category');
    const filteredAreas = areaFilter === 'all' ? division.popularAreas : division.popularAreas.filter((a) => a.category === areaFilter);

    const visibleSpots = showAllSpots ? filteredSpots : filteredSpots.slice(0, VISIBLE);
    const visibleAreas = showAllAreas ? filteredAreas : filteredAreas.slice(0, VISIBLE);

    // If the selected spot is filtered out, fall back to the first visible one
    const activeName = filteredSpots.some((s) => s.name === selectedSpot) ? selectedSpot : filteredSpots[0]?.name;

    return (
      <div className="max-w-[2200px] mx-auto px-5 lg:px-12" style={{ '--accent': division.mapColor }}>
        {/* MAP */}
        <section id="map" className="scroll-mt-32 py-14 lg:py-16 border-b border-[#d4c8b8]">
          <Reveal>
            <SectionTitle label="Interactive Map" title="Map & Spots" subtitle="Tap a pin or a card to explore the key attractions of this division."/>
          </Reveal>
          <div className="grid lg:grid-cols-[1fr_460px] gap-10 mt-10 items-start">
            {/* Map stays in view while the spot list scrolls */}
            <Reveal className="lg:sticky lg:top-40">
              <div className="bg-[#ede3d2] rounded-3xl p-4 md:p-6 border border-[#d4c8b8] shadow-[0_20px_40px_-24px_rgba(30,61,40,0.5)]">
                <BangladeshMap
                  highlightedDivision={division.id}
                  spots={filteredSpots.map((s) => ({ ...s, number: division.touristSpots.indexOf(s) + 1 }))}
                  interactive={false}
                  selectedSpot={activeName}
                  onSpotClick={(spot) => { setSelectedSpot(spot.name); if (filteredSpots.findIndex((s) => s.name === spot.name) >= VISIBLE) setShowAllSpots(true); }}
                />
              </div>
            </Reveal>

            {/* Spot detail panel */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[#1e3d28] text-2xl font-semibold">Tourist Spots</h3>
                <span className="text-base text-[#8a7a68]">{filteredSpots.length} of {division.touristSpots.length}</span>
              </div>
              <FilterTabs options={spotTypes} value={spotFilter} onChange={(f) => { setSpotFilter(f); setShowAllSpots(false); }} counts={spotCounts}/>
              <div key={spotFilter} className="space-y-4 animate-fadeIn">
              {visibleSpots.map((spot) => {
                  const active = activeName === spot.name;
                  const number = division.touristSpots.indexOf(spot) + 1;
                  return (<div key={spot.name} className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer bg-[#f5ede0] ${active
                    ? 'border-[var(--accent)] shadow-lg -translate-y-0.5'
                    : 'border-[#d4c8b8] hover:border-[#8a7a68]'}`} onClick={() => setSelectedSpot(spot.name)}>
                  <div className={`relative ${spotFilter === 'all' ? 'h-44' : 'h-[26rem]'} bg-[#d4c8b8] overflow-hidden cursor-zoom-in`} onClick={(e) => { e.stopPropagation(); setSelectedSpot(spot.name); setZoomed(spot); }}>
                    <img src={spot.image} alt={spot.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e2018]/50 to-transparent"/>
                    <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#c4602a] text-[#f5ede0] text-base font-bold grid place-items-center border-2 border-[#f5ede0]">{number}</span>
                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${TYPE_STYLE[spot.type] || 'bg-blue-100 text-blue-800'}`}>
                      {spot.type}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-display font-semibold text-[#1e3d28] text-xl leading-snug mb-1">{spot.name}</p>
                    <p className="text-lg text-[#6a5a48] leading-relaxed">{spot.description}</p>
                    {spot.details && (<Button variant="dark" size="sm" className="mt-4" onClick={(e) => { e.stopPropagation(); setOpenItem(spot); }}>
                        Read more <span aria-hidden>→</span>
                      </Button>)}
                  </div>
                </div>);
              })}
              </div>
              {filteredSpots.length > VISIBLE && (<button onClick={() => setShowAllSpots(!showAllSpots)} className="w-full py-3.5 rounded-2xl border-2 border-dashed border-[var(--accent)] text-[var(--accent)] text-lg font-semibold hover:bg-[var(--accent)] hover:text-[#f5ede0] transition-colors">
                {showAllSpots ? 'Show less ↑' : `See more (${filteredSpots.length - VISIBLE} more) ↓`}
              </button>)}
            </div>
          </div>
        </section>

        {/* POPULAR AREAS */}
        <section id="areas" className="scroll-mt-32 py-14 lg:py-16 border-b border-[#d4c8b8]">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <Reveal>
              <SectionTitle label="Most Popular Areas" title="Where to go" subtitle="Key destinations within the division." noMargin/>
            </Reveal>
            <FilterTabs options={areaTypes} value={areaFilter} onChange={(f) => { setAreaFilter(f); setShowAllAreas(false); }} counts={areaCounts}/>
          </div>
          <div key={areaFilter} className={`grid ${areaFilter === 'all' ? 'sm:grid-cols-2 lg:grid-cols-3' : visibleAreas.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2'} gap-6 mt-10 animate-fadeIn`}>
            {visibleAreas.map((area, i) => (<Reveal key={area.name} delay={i * 90}>
              <article className="group h-full flex flex-col rounded-3xl overflow-hidden border border-[#d4c8b8] bg-[#f5ede0] hover:shadow-xl hover:-translate-y-1 hover:border-[var(--accent)] transition-all duration-300">
                <div className={`relative ${areaFilter === 'all' ? 'aspect-[4/3]' : visibleAreas.length === 1 ? 'h-96 md:h-[34rem]' : 'h-80 md:h-[26rem]'} bg-[#d4c8b8] overflow-hidden cursor-zoom-in`} onClick={() => setZoomed(area)}>
                  <img src={area.image} alt={area.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e2018]/75 via-transparent to-transparent"/>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#f5ede0]/90 text-[#1e3d28] text-sm font-bold uppercase tracking-wider">
                    {area.category}
                  </span>
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="inline-flex items-center gap-1.5 text-base font-medium text-[#f5ede0]">
                      {area.highlight}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-[#1e3d28] text-2xl font-semibold mb-2">{area.name}</h3>
                  <p className="text-lg text-[#4a3a28] leading-relaxed flex-1">{area.description}</p>
                  {area.details && (<Button variant="dark" size="sm" className="mt-5 self-start" onClick={() => setOpenItem(area)}>
                      Read more <span aria-hidden>→</span>
                    </Button>)}
                </div>
              </article>
            </Reveal>))}
          </div>

          {filteredAreas.length > VISIBLE && (<div className="mt-10 text-center">
            <button onClick={() => setShowAllAreas(!showAllAreas)} className="px-10 py-3.5 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] text-lg font-semibold hover:bg-[var(--accent)] hover:text-[#f5ede0] transition-colors">
              {showAllAreas ? 'Show less ↑' : `See more (${filteredAreas.length - VISIBLE} more) ↓`}
            </button>
          </div>)}

          <DetailsModal item={openItem} onClose={() => setOpenItem(null)}/>
          <ImageLightbox item={zoomed} onClose={() => setZoomed(null)}/>
        </section>

      </div>
    );
}
