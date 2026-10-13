import { useState } from 'react';
import FilterTabs from '../../../components/DivisionShared/FilterTabs';
import Reveal from '../../../components/DivisionShared/Reveal';
import SectionTitle from '../../../components/DivisionShared/SectionTitle';
import { rangpur } from '../../../data/divisions/rangpur';

// Part 4 of a division page: Activities and Facilities (with filters).
// Everything for the Rangpur experience part lives in this file. Content comes from data/divisions/rangpur.js.

const DIFFICULTY_COLOR = {
    Easy: 'bg-green-100 text-green-800',
    Moderate: 'bg-amber-100 text-amber-800',
    Hard: 'bg-red-100 text-red-800',
};
const FACILITY_STYLE = {
    washroom: 'bg-blue-100 text-blue-700',
    religious: 'bg-purple-100 text-purple-700',
    medical: 'bg-red-100 text-red-700',
    information: 'bg-green-100 text-green-700',
    wellness: 'bg-teal-100 text-teal-700',
};

export default function RangpurExperience() {
    const division = rangpur;
    const [activityFilter, setActivityFilter] = useState('all');
    const [facilityFilter, setFacilityFilter] = useState('all');

    const countBy = (list, key) => list.reduce((acc, item) => ({ ...acc, all: acc.all + 1, [item[key]]: (acc[item[key]] || 0) + 1 }), { all: 0 });

    const activityTypes = ['all', ...new Set(division.activities.map((a) => a.category))];
    const activityCounts = countBy(division.activities, 'category');
    const filteredActivities = activityFilter === 'all' ? division.activities : division.activities.filter((a) => a.category === activityFilter);

    const facilityTypes = ['all', ...new Set(division.facilities.map((f) => f.type))];
    const facilityCounts = countBy(division.facilities, 'type');
    const filteredFacilities = facilityFilter === 'all' ? division.facilities : division.facilities.filter((f) => f.type === facilityFilter);

    return (
      <div className="max-w-[2200px] mx-auto px-5 lg:px-12 pb-24" style={{ '--accent': division.mapColor }}>
        {/* ACTIVITIES */}
        <section id="activities" className="scroll-mt-32 py-14 lg:py-16 border-b border-[#d4c8b8]">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <Reveal>
              <SectionTitle label="Activities" title="Things to do" subtitle="Experiences you can book or do on your own." noMargin/>
            </Reveal>
            <FilterTabs options={activityTypes} value={activityFilter} onChange={setActivityFilter} counts={activityCounts}/>
          </div>
          <div key={activityFilter} className="grid md:grid-cols-2 gap-5 animate-fadeIn">
            {filteredActivities.map((a, i) => (<ActivityCard key={a.name + i} activity={a}/>))}
          </div>
        </section>

        {/* FACILITIES */}
        <section id="facilities" className="scroll-mt-32 pt-14 lg:pt-16">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <Reveal>
              <SectionTitle label="Facilities & Services" title="Good to know" subtitle="Washrooms, prayer spaces, medical help and information." noMargin/>
            </Reveal>
            <FilterTabs options={facilityTypes} value={facilityFilter} onChange={setFacilityFilter} counts={facilityCounts}/>
          </div>

          <div key={facilityFilter} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-fadeIn">
            {filteredFacilities.map((f, i) => (<FacilityCard key={f.name + i} facility={f}/>))}
          </div>
        </section>
      </div>
    );
}

function ActivityCard({ activity }) {
    return (<div className="h-full bg-[#ede3d2] border border-[#d4c8b8] rounded-3xl p-5 md:p-6 hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-[#1e3d28] font-semibold text-xl leading-tight">
            {activity.name}
          </h4>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-sm font-bold uppercase tracking-wider ${DIFFICULTY_COLOR[activity.difficulty] || 'bg-stone-100 text-stone-700'}`}>
              {activity.difficulty}
            </span>
            <span className="text-base text-[#8a7a68]">{activity.duration}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-display font-semibold text-[#c4602a] text-xl leading-none">{activity.costUSD}</div>
          <div className="text-sm uppercase tracking-widest text-[#8a7a68] mt-1">per person</div>
        </div>
      </div>
      <p className="text-lg text-[#4a3a28] leading-relaxed">{activity.description}</p>
    </div>);
}
function FacilityCard({ facility }) {
    return (<div className="h-full bg-[#f5ede0] border border-[#d4c8b8] rounded-2xl p-5 hover:border-[var(--accent)] hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="min-w-0">
          <h4 className="font-semibold text-[#1e3d28] text-lg leading-tight">{facility.name}</h4>
          <span className={`inline-block mt-1 text-[13px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${FACILITY_STYLE[facility.type] || 'bg-green-100 text-green-700'}`}>
            {facility.type}
          </span>
        </div>
      </div>
      <p className="text-base text-[#6a5a48] mb-1.5"><span className="font-semibold">Location: </span>{facility.location}
      </p>
      <p className="text-base text-[#4a3a28] mb-1.5"><span className="font-semibold">Cost: </span>{facility.cost}
      </p>
      {facility.notes && (<p className="text-base text-[#8a7a68] italic mt-2 pt-2 border-t border-[#d4c8b8]">{facility.notes}</p>)}
    </div>);
}
