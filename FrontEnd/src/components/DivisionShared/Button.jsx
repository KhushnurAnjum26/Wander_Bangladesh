// Reusable button. Design it once here, use it everywhere.
//
// Props:
//   variant  - 'primary' (orange) | 'outline' (cream border) | 'dark' (green) | 'ghost' (text only)
//   size     - 'sm' | 'md' | 'lg'
//   onClick  - function to run on click
//   className - optional extra Tailwind classes (e.g. "ml-2")
//   children - the text inside the button

const VARIANTS = {
  primary: 'bg-[#c4602a] text-[#f5ede0] hover:bg-[#d4783e] shadow-[0_6px_16px_-6px_rgba(196,96,42,0.7)]',
  outline: 'border border-[#f5ede0]/40 text-[#f5ede0] hover:bg-[#f5ede0]/10',
  dark: 'bg-[var(--accent,#1e3d28)] text-[#f5ede0] hover:brightness-125 shadow-[0_6px_16px_-8px_rgba(30,61,40,0.8)]',
  ghost: 'text-[#4a3a28] hover:bg-[#1e3d28]/8',
};

const SIZES = {
  sm: 'px-5 py-2 text-lg font-medium',
  md: 'px-8 py-3.5 text-lg font-semibold',
  lg: 'px-10 py-4 font-semibold',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 active:scale-[0.97] ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}
