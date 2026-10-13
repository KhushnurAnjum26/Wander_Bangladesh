import './division.css';

// Heading used by every division section.
//
// Props:
//   label    - small orange line above the title
//   title    - big heading (optional)
//   subtitle - grey line under the title
//   noMargin - drop the bottom margin (when a filter sits next to the title)

export default function SectionTitle({ label, title, subtitle, noMargin }) {
  return (
    <div className={noMargin ? '' : 'mb-0'}>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-[#c4602a]" />
        <p className="text-[#c4602a] text-base font-semibold tracking-[0.2em] uppercase">{label}</p>
      </div>
      {title && (
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1e3d28] leading-tight mb-2">
          {title}
        </h2>
      )}
      {subtitle && <p className="text-[#6a5a48] text-lg md:text-lg max-w-xl">{subtitle}</p>}
    </div>
  );
}
