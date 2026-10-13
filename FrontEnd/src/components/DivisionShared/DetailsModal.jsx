import Modal from './Modal';

// "Read more" popup used for popular areas and tourist spots.
//
// Props:
//   item    - the area or spot to show ({ name, image, details }), or null to keep it closed
//   onClose - function that closes the popup
//
// details is written as paragraphs separated by a blank line.

export default function DetailsModal({ item, onClose }) {
  const tag = item?.type || item?.category;
  return (
    <Modal isOpen={item !== null} onClose={onClose}>
      {item && (
        <div>
          <div className="relative h-64 bg-[#d4c8b8]">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e2018]/90 via-[#0e2018]/30 to-transparent" />
            <div className="absolute bottom-5 left-7 right-16">
              {tag && (
                <span className="inline-block mb-2 px-3 py-1 rounded-full bg-[#c4602a] text-[#f5ede0] text-sm font-bold uppercase tracking-widest">
                  {tag}
                </span>
              )}
              <h3 className="font-display text-3xl md:text-4xl text-[#f5ede0] font-semibold leading-tight">
                {item.name}
              </h3>
            </div>
          </div>
          <div className="p-7 md:p-9 space-y-4 text-[17px] text-[#2a1a0e] leading-relaxed">
            {item.details.split('\n\n').map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'text-xl text-[#1e3d28] font-display leading-snug' : 'text-[#3a2a18]'}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
