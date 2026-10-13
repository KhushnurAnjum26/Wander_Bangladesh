import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Reusable popup. Put anything inside it.
//
// Props:
//   isOpen   - true to show the popup
//   onClose  - function that closes it (called on X, outside click or Esc)
//   children - the content inside the popup

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden'; // stop page scrolling behind the popup
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Portal = draw on top of the whole page, even above the fixed top bar
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0e2018]/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#f5ede0] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#f5ede0]/90 text-[#1e3d28] shadow-md hover:bg-[#c4602a] hover:text-[#f5ede0] hover:rotate-90 transition-all duration-300"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
