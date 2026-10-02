import { useState } from 'react';

/**
 * @typedef {import('../data/divisions').DivisionId} DivisionId
 * @typedef {import('../data/divisions').TouristSpot} TouristSpot
 *
 * @typedef {Object} DivisionShape
 * @property {DivisionId} id
 * @property {string} name
 * @property {string} path
 * @property {number} labelX
 * @property {number} labelY
 * @property {string} color
 */

/** @type {DivisionShape[]} */
const DIVISIONS = [
  {
    id: 'rangpur',
    name: 'Rangpur',
    path: 'M 112,24 L 190,18 L 226,48 L 218,104 L 182,128 L 112,118 L 82,82 Z',
    labelX: 155, labelY: 74,
    color: '#2d5a3c',
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    path: 'M 226,48 L 296,40 L 340,76 L 326,138 L 284,164 L 218,136 L 218,104 Z',
    labelX: 274, labelY: 102,
    color: '#386b5a',
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    path: 'M 340,76 L 414,88 L 444,120 L 414,160 L 350,164 L 326,138 Z',
    labelX: 385, labelY: 124,
    color: '#1a4a3c',
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    path: 'M 82,82 L 112,118 L 182,128 L 218,136 L 208,202 L 170,226 L 92,212 L 48,168 L 54,112 Z',
    labelX: 132, labelY: 170,
    color: '#4a2865',
  },
  {
    id: 'dhaka',
    name: 'Dhaka',
    path: 'M 218,136 L 284,164 L 326,138 L 350,164 L 330,224 L 292,262 L 224,250 L 208,202 Z',
    labelX: 270, labelY: 202,
    color: '#6b3825',
  },
  {
    id: 'khulna',
    name: 'Khulna',
    path: 'M 48,168 L 92,212 L 170,226 L 224,250 L 216,318 L 176,372 L 112,350 L 74,288 Z',
    labelX: 142, labelY: 278,
    color: '#4a3a18',
  },
  {
    id: 'barishal',
    name: 'Barishal',
    path: 'M 224,250 L 292,262 L 312,306 L 286,368 L 238,350 L 216,318 Z',
    labelX: 260, labelY: 306,
    color: '#6b5a2f',
  },
  {
    id: 'chattogram',
    name: 'Chattogram',
    path: 'M 350,164 L 414,160 L 424,210 L 406,260 L 430,318 L 398,394 L 350,354 L 312,306 L 292,262 L 330,224 Z',
    labelX: 365, labelY: 260,
    color: '#2a5438',
  },
];

/**
 * @param {Object} props
 * @param {DivisionId | null} [props.highlightedDivision]
 * @param {TouristSpot[]} [props.spots]
 * @param {(id: DivisionId) => void} [props.onDivisionClick]
 * @param {boolean} [props.interactive]
 * @param {boolean} [props.compact]
 */
export default function BangladeshMap({
  highlightedDivision,
  spots = [],
  onDivisionClick,
  interactive = true,
  compact = false,
}) {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const getDivisionColor = (p) => {
    if (highlightedDivision) {
      if (p.id === highlightedDivision) return p.color;
      return '#d4c8b0';
    }
    if (hovered === p.id) return p.color;
    return '#c8bb98';
  };

  const getDivisionOpacity = (p) => {
    if (highlightedDivision) {
      return p.id === highlightedDivision ? 1 : 0.45;
    }
    return hovered === p.id ? 1 : 0.75;
  };

  return (
    <div className={`relative select-none ${compact ? 'w-full' : 'w-full'}`}>
      <svg
        viewBox="0 0 470 410"
        className="w-full h-auto drop-shadow-sm"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}
      >
        {/* Background */}
        <rect x="0" y="0" width="470" height="410" fill="#e8ddd0" rx="8" />

        {/* Subtle grid texture */}
        <defs>
          <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d4c8b0" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="470" height="410" fill="url(#mapGrid)" rx="8" />

        {/* Division shapes */}
        {DIVISIONS.map((p) => (
          <g key={p.id}>
            <path
              d={p.path}
              fill={getDivisionColor(p)}
              fillOpacity={getDivisionOpacity(p)}
              stroke="#f5ede0"
              strokeWidth={highlightedDivision === p.id ? 2.5 : 1.5}
              style={{
                cursor: interactive ? 'pointer' : 'default',
                transition: 'fill 0.25s ease, fill-opacity 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (!interactive) return;
                setHovered(p.id);
                const svgEl = e.target.closest('svg');
                const pt = svgEl.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                const svgPt = pt.matrixTransform(svgEl.getScreenCTM().inverse());
                setTooltip({ x: svgPt.x, y: svgPt.y - 12, name: p.name + ' Division' });
              }}
              onMouseLeave={() => {
                setHovered(null);
                setTooltip(null);
              }}
              onClick={() => interactive && onDivisionClick?.(p.id)}
            />

            {/* Division label */}
            {(!highlightedDivision || highlightedDivision === p.id) && (
              <text
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                fill={highlightedDivision === p.id ? '#f5ede0' : '#3a2a18'}
                fontSize={p.id === 'mymensingh' || p.id === 'chattogram' ? '6.5' : '8.5'}
                fontFamily="Outfit, sans-serif"
                fontWeight="600"
                letterSpacing="0.05em"
                style={{ pointerEvents: 'none', userSelect: 'none', textTransform: 'uppercase' }}
              >
                {p.name}
              </text>
            )}
          </g>
        ))}

        {/* Tourist spot markers */}
        {spots.map((spot, i) => (
          <g key={i} style={{ cursor: 'pointer' }}>
            {/* Pulse ring */}
            <circle cx={spot.mapX} cy={spot.mapY} r="10" fill="#c4602a" fillOpacity="0.2">
              <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            {/* Pin body */}
            <circle cx={spot.mapX} cy={spot.mapY} r="5" fill="#c4602a" stroke="#f5ede0" strokeWidth="1.5" />
            <circle cx={spot.mapX} cy={spot.mapY} r="2" fill="#f5ede0" />
          </g>
        ))}

        {/* Compass rose */}
        <g transform="translate(432, 32)">
          <text x="0" y="-10" textAnchor="middle" fontSize="7" fill="#6a5a48" fontFamily="Outfit, sans-serif" fontWeight="600">N</text>
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#6a5a48" strokeWidth="1.2" />
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#6a5a48" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="1.5" fill="#6a5a48" />
        </g>

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={tooltip.x - 45}
              y={tooltip.y - 18}
              width="90"
              height="18"
              rx="4"
              fill="#1e3d28"
              fillOpacity="0.92"
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 6}
              textAnchor="middle"
              fill="#f5ede0"
              fontSize="7.5"
              fontFamily="Outfit, sans-serif"
              fontWeight="500"
              style={{ pointerEvents: 'none' }}
            >
              {tooltip.name}
            </text>
          </g>
        )}
      </svg>

      {/* Legend for spots */}
      {spots.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {spots.map((s, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs text-[#4a3a28]">
              <span className="w-2 h-2 rounded-full bg-[#c4602a] flex-shrink-0" />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}