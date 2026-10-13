// Reusable filter pills (All / Nature / Historical ...).
//
// Props:
//   options  - list of names, e.g. ['all', 'nature', 'historical']
//   value    - the option that is selected now
//   onChange - function called with the new option when a pill is clicked
//   counts   - optional, how many items each option has, e.g. { all: 3, nature: 2 }

export default function FilterTabs({ options, value, onChange, counts, icons }) {
  return (
    <div className="flex gap-2 flex-wrap" role="group">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 pl-3.5 pr-3 py-1.5 rounded-full text-sm font-semibold capitalize border transition-all duration-200 ${
              active
                ? 'bg-[var(--accent,#1e3d28)] border-[var(--accent,#1e3d28)] text-[#f5ede0] shadow-md'
                : 'bg-[#f5ede0] border-[#d4c8b8] text-[#4a3a28] hover:border-[var(--accent,#1e3d28)] hover:text-[var(--accent,#1e3d28)]'
            }`}
          >
            {icons?.[option] && <span>{icons[option]}</span>}
            {option}
            {counts && counts[option] !== undefined && (
              <span
                className={`min-w-5 h-5 px-1.5 rounded-full text-xs leading-5 text-center ${
                  active ? 'bg-[#f5ede0]/20' : 'bg-[#e8ddd0]'
                }`}
              >
                {counts[option]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
