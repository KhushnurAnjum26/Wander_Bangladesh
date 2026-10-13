import Reveal from '../../../components/DivisionShared/Reveal';
import SectionTitle from '../../../components/DivisionShared/SectionTitle';
import { rajshahi } from '../../../data/divisions/rajshahi';

// Part 3 of a division page: Routes & Costs and Restaurants.
// Everything for the Rajshahi details part lives in this file. Content comes from data/divisions/rajshahi.js.

const ROUTE_MODE = {
    road: { label: 'By road' },
    air: { label: 'By air' },
    boat: { label: 'By boat' },
};

export default function RajshahiDetails() {
    const division = rajshahi;
    return (
      <div className="max-w-7xl mx-auto px-6" style={{ '--accent': division.mapColor }}>
        {/* ROUTES & COST */}
        <section id="routes" className="scroll-mt-32 py-14 lg:py-16 border-b border-[#d4c8b8]">
          <Reveal>
            <SectionTitle label="Roads, Routes & Costs" title="Getting there" subtitle="Transport options with estimated time and cost."/>
          </Reveal>
          <div className="mt-10 space-y-4">
            {division.routes.map((route, i) => (<Reveal key={i} delay={i * 80}>
              <RouteCard route={route}/>
            </Reveal>))}
          </div>
        </section>

        {/* RESTAURANTS */}
        <section id="restaurants" className="scroll-mt-32 py-14 lg:py-16 border-b border-[#d4c8b8]">
          <Reveal>
            <SectionTitle label="Restaurants & Dining" title="Where to eat" subtitle="Local favourites near the tourist spots."/>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {division.restaurants.map((r, i) => (<Reveal key={i} delay={i * 90}>
              <RestaurantCard restaurant={r}/>
            </Reveal>))}
          </div>
        </section>

      </div>
    );
}

function RouteCard({ route }) {
    const mode = ROUTE_MODE[route.type] || ROUTE_MODE.road;
    return (<div className="group bg-[#ede3d2] border border-[#d4c8b8] rounded-3xl p-5 md:p-6 grid md:grid-cols-[1fr_auto] gap-5 md:gap-10 items-center hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300">
      <div className="flex gap-4 md:gap-5">
        <div className="min-w-0">
          <span className="text-sm font-bold uppercase tracking-widest text-[#c4602a]">{mode.label}</span>
          {/* from -> to with a dotted connector */}
          <div className="flex items-center gap-3 flex-wrap mt-1">
            <span className="font-display font-semibold text-[#1e3d28] text-base leading-tight">{route.from}</span>
            <span className="flex items-center gap-1 text-[#c4602a]" aria-hidden>
              <span className="w-1.5 h-1.5 rounded-full bg-current"/>
              <span className="w-10 border-t-2 border-dotted border-current"/>
              <span className="text-sm leading-none">&rsaquo;</span>
            </span>
            <span className="font-display font-semibold text-[#1e3d28] text-base leading-tight">{route.to}</span>
          </div>
          <p className="text-sm text-[#6a5a48] mt-2 leading-relaxed">{route.notes}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 md:flex gap-px md:gap-0 rounded-2xl overflow-hidden bg-[#d4c8b8] md:bg-[#f5ede0] md:border md:border-[#d4c8b8] md:divide-x md:divide-[#d4c8b8]">
        {[
          { label: 'Distance', value: route.distance, color: 'text-[#1e3d28]' },
          { label: 'Duration', value: route.duration, color: 'text-[#1e3d28]' },
          { label: 'Est. Cost', value: route.costUSD, color: 'text-[#c4602a]' },
        ].map((stat) => (<div key={stat.label} className="bg-[#f5ede0] px-4 md:px-5 py-3 text-center md:min-w-[104px]">
          <div className={`font-display font-semibold text-sm md:text-sm ${stat.color}`}>{stat.value}</div>
          <div className="text-sm uppercase tracking-widest text-[#8a7a68] mt-0.5">{stat.label}</div>
        </div>))}
      </div>
    </div>);
}

function RestaurantCard({ restaurant }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(restaurant.rating));
    return (<div className="h-full flex flex-col bg-[#ede3d2] border border-[#d4c8b8] rounded-3xl p-6 hover:border-[var(--accent)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="text-sm font-bold uppercase tracking-widest text-[#c4602a]">Restaurant</span>
        <span className={`px-3 py-1 rounded-full text-sm font-bold border ${restaurant.priceRange === '$' ? 'border-green-300 text-green-700 bg-green-50' :
            restaurant.priceRange === '$$' ? 'border-amber-300 text-amber-700 bg-amber-50' :
                'border-red-300 text-red-700 bg-red-50'}`}>
          {restaurant.priceRange}
        </span>
      </div>

      <h4 className="font-display text-[#1e3d28] font-semibold text-lg leading-tight">{restaurant.name}</h4>
      <p className="text-sm text-[#6a5a48] mb-3">{restaurant.cuisine}</p>

      <div className="flex items-center gap-0.5 mb-4">
        {stars.map((filled, i) => (<span key={i} className={`text-sm ${filled ? 'text-[#c4602a]' : 'text-[#c8bfb0]'}`}>★</span>))}
        <span className="text-sm font-semibold text-[#6a5a48] ml-2">{restaurant.rating}</span>
      </div>

      <div className="bg-[#f5ede0] rounded-2xl px-4 py-3 mb-4 flex-1">
        <p className="text-sm font-bold uppercase tracking-widest text-[#c4602a] mb-1">Speciality</p>
        <p className="text-sm text-[#3a2a18] leading-relaxed">{restaurant.speciality}</p>
      </div>

      <p className="text-sm text-[#6a5a48] flex items-center gap-1.5">
        {restaurant.location}
      </p>
    </div>);
}
