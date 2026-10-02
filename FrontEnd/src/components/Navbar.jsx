import { useState, useEffect } from 'react';

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = currentPage === 'home';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-[#f5ede0]/95 backdrop-blur-sm border-b border-[#c8bfb0] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-[#1e3d28] flex items-center justify-center text-[#f5ede0] text-xs font-bold tracking-wider font-[var(--font-display)]">
            R
          </div>
          <span
            className={`font-[var(--font-display)] font-semibold text-lg tracking-tight transition-colors ${
              scrolled || !isHome ? 'text-[#1e3d28]' : 'text-[#f5ede0]'
            }`}
          >
            Explore<span className="text-[#c4602a]">Bangladesh</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', page: 'home' },
            { label: 'Divisions', page: 'divisions' },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`text-sm font-medium tracking-wide transition-colors relative group ${
                scrolled || !isHome
                  ? currentPage === page
                    ? 'text-[#c4602a]'
                    : 'text-[#2a1a0e] hover:text-[#1e3d28]'
                  : currentPage === page
                  ? 'text-[#c4602a]'
                  : 'text-[#f5ede0]/90 hover:text-[#f5ede0]'
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#c4602a] transition-all duration-300 ${
                  currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}

          <button
            onClick={() => onNavigate('dashboard')}
            className="ml-2 px-5 py-2 bg-[#1e3d28] text-[#f5ede0] text-sm font-medium rounded-full hover:bg-[#2d5a3c] transition-colors"
          >
            Portal
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={`w-5 h-0.5 mb-1.5 transition-all ${
              scrolled || !isHome ? 'bg-[#2a1a0e]' : 'bg-[#f5ede0]'
            }`}
          />
          <div
            className={`w-5 h-0.5 mb-1.5 transition-all ${
              scrolled || !isHome ? 'bg-[#2a1a0e]' : 'bg-[#f5ede0]'
            }`}
          />
          <div
            className={`w-3 h-0.5 transition-all ${
              scrolled || !isHome ? 'bg-[#2a1a0e]' : 'bg-[#f5ede0]'
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5ede0] border-t border-[#c8bfb0] px-6 py-4 flex flex-col gap-4">
          <button
            onClick={() => { onNavigate('home'); setMenuOpen(false); }}
            className="text-left text-sm font-medium text-[#2a1a0e] hover:text-[#1e3d28]"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate('divisions'); setMenuOpen(false); }}
            className="text-left text-sm font-medium text-[#2a1a0e] hover:text-[#1e3d28]"
          >
            Divisions
          </button>
          <button
            onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
            className="px-5 py-2 bg-[#1e3d28] text-[#f5ede0] text-sm font-medium rounded-full text-center"
          >
            Open Portal
          </button>
        </div>
      )}
    </header>
  );
}