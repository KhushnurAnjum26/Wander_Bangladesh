import { useState, useEffect } from 'react';
import SectionTitle from '../../../components/DivisionShared/SectionTitle';
import Reveal from '../../../components/DivisionShared/Reveal';
import { rajshahi } from '../../../data/divisions/rajshahi';

// Part 1 of a division page: hero, tab bar and the Overview section.
// Everything for the Rajshahi overview part lives in this file. Content comes from data/divisions/rajshahi.js.

const SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'map', label: 'Map & Spots' },
    { id: 'areas', label: 'Popular Areas' },
    { id: 'routes', label: 'Routes & Cost' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'activities', label: 'Activities' },
    { id: 'facilities', label: 'Facilities' },
];

export default function RajshahiOverview() {
    const division = rajshahi;
    const [activeSection, setActiveSection] = useState('overview');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [division.id]);

    // Highlight the tab of the section that is on screen
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, { threshold: 0.3, rootMargin: '-130px 0px 0px 0px' });
        SECTIONS.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [division.id]);

    // Thin reading-progress line under the tab bar
    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
    };

    const shortName = division.name.replace(/\s*Division$/i, '');
    const facts = [
        { label: 'Capital', value: division.capital },
        { label: 'Area', value: division.area },
        { label: 'Population', value: division.population },
        { label: 'Elevation', value: division.elevation },
        { label: 'Tourist Spots', value: `${division.touristSpots.length} key attractions` },
        { label: 'Activities', value: `${division.activities.length} options` },
    ];

    return (<div style={{ '--accent': division.mapColor }}>
      {/* HERO */}
      <section className="relative h-[78vh] min-h-[540px] flex items-end overflow-hidden bg-[#132818] grain">
        <div className="absolute inset-0 bg-cover bg-center animate-kenburns" style={{ backgroundImage: `url(${division.heroImage})` }}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1810] via-[#0e2018]/45 to-[#0e2018]/20"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2018]/70 via-transparent to-transparent"/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-14 md:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[#c8d4c0] text-base mb-8 tracking-wide">
            <span>Home</span>
            <span className="opacity-50">/</span>
            <span>Divisions</span>
            <span className="opacity-50">/</span>
            <span className="text-[#f5ede0]">{shortName}</span>
          </nav>

          <div className="flex items-end justify-between gap-10 flex-wrap">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-3 text-base font-semibold tracking-[0.3em] uppercase mb-5 text-[#f0b88f]">
                <span className="h-px w-10 bg-[#f0b88f]"/>
                Bangladesh Division
              </p>
              <h1 className="font-display text-[#f5ede0] text-6xl sm:text-7xl md:text-8xl font-light leading-[0.95] tracking-tight mb-5">
                {shortName}
              </h1>
              <p className="text-[#e3ecd9] text-xl md:text-2xl italic font-display font-light max-w-2xl">
                {division.tagline}
              </p>
              <div className="flex flex-wrap gap-2 mt-7">
                {division.tags.map((tag) => (<span key={tag} className="px-3.5 py-1.5 rounded-full text-base font-medium text-[#f5ede0] bg-[#f5ede0]/12 border border-[#f5ede0]/25 backdrop-blur-sm">
                    {tag}
                  </span>))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 divide-x divide-[#f5ede0]/20 rounded-2xl bg-[#0e2018]/45 border border-[#f5ede0]/20 backdrop-blur-md text-[#f5ede0]">
              {[
            { label: 'Capital', value: division.capital },
            { label: 'Area', value: division.area },
            { label: 'Population', value: division.population },
        ].map((s) => (<div key={s.label} className="px-5 md:px-7 py-4 text-center">
                  <div className="font-display text-xl md:text-2xl font-semibold whitespace-nowrap">{s.value}</div>
                  <div className="text-sm uppercase tracking-widest text-[#c8d8c0] mt-0.5">{s.label}</div>
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY NAV */}
      <nav className="sticky top-16 z-40 bg-[#f5ede0]/92 backdrop-blur-md border-b border-[#c8bfb0]/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {SECTIONS.map((s) => (<button key={s.id} onClick={() => scrollTo(s.id)} className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${activeSection === s.id
                ? 'bg-[var(--accent)] text-[#f5ede0] shadow-md'
                : 'text-[#4a3a28] hover:bg-[#e8ddd0]'}`}>
                {s.label}
              </button>))}
          </div>
        </div>
        <div className="h-[2px] bg-transparent">
          <div className="h-full bg-[#c4602a] origin-left transition-transform duration-150" style={{ transform: `scaleX(${progress})` }}/>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        {/* OVERVIEW */}
        <section id="overview" className="scroll-mt-32 py-14 lg:py-16 border-b border-[#d4c8b8]">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
            <Reveal>
              <SectionTitle label="About This Division" title={`Discover ${shortName}`}/>
              <p className="text-[#3a2a18] text-base leading-[1.8] mt-6 mb-8">{division.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {facts.map((item) => (<div key={item.label} className="group bg-[#ede3d2] rounded-2xl px-4 py-4 border border-[#d4c8b8] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md transition-all duration-300">
                    <div className="font-display font-semibold text-[#1e3d28] text-sm leading-tight">{item.value}</div>
                    <div className="text-sm uppercase tracking-widest text-[#8a7a68] mt-1">{item.label}</div>
                  </div>))}
              </div>
            </Reveal>

            {/* Spots preview */}
            <Reveal delay={120}>
              <div className="rounded-3xl bg-[#ede3d2] border border-[#d4c8b8] p-6 md:p-7">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-[#1e3d28] text-base font-semibold">Must-see places</h3>
                  <button onClick={() => scrollTo('map')} className="text-sm font-semibold text-[#c4602a] hover:underline underline-offset-4">View on map →</button>
                </div>
                <div className="space-y-3">
                  {division.touristSpots.slice(0, 3).map((spot) => (<button key={spot.name} className="group w-full text-left flex gap-4 bg-[#f5ede0] border border-[#d4c8b8] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:shadow-md transition-all duration-300" onClick={() => scrollTo('map')}>
                      <div className="relative w-24 h-24 flex-shrink-0 bg-[#d4c8b8] overflow-hidden">
                        <img src={spot.image} alt={spot.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                      </div>
                      <div className="py-3 pr-4 flex-1 min-w-0">
                        <span className="text-sm font-bold tracking-widest uppercase text-[#c4602a]">
                          {spot.type}
                        </span>
                        <p className="font-display font-semibold text-[#1e3d28] text-sm leading-snug">{spot.name}</p>
                        <p className="text-sm text-[#6a5a48] line-clamp-2 mt-0.5">{spot.description}</p>
                      </div>
                    </button>))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </div>);
}
