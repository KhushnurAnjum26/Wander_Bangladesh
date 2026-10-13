import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Shows one picture full size on a dark background (opens when a card image is clicked).
//
// Props:
//   item    - the spot or area to show ({ name, image, description }), or null to keep it closed
//   onClose - function that closes it (called on X, outside click or Esc)

export default function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  // Portal = draw on top of the whole page, even above the fixed top bar
  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 md:p-8 bg-[#0a1810]/95 backdrop-blur-sm animate-fadeIn cursor-zoom-out"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#f5ede0]/15 text-[#f5ede0] text-xl hover:bg-[#c4602a] transition-colors"
      >
        ✕
      </button>
      <img
        src={item.image}
        alt={item.name}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[78vh] md:max-h-[82vh] rounded-2xl shadow-2xl object-contain cursor-default"
      />
      <div className="mt-5 text-center max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-2xl md:text-3xl font-semibold text-[#f5ede0]">{item.name}</p>
        {item.description && <p className="text-lg text-[#c8d8c0] mt-1">{item.description}</p>}
      </div>
    </div>,
    document.body
  );
}
