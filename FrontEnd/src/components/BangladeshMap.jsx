import { useState } from "react";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  DIVISION_SHAPES,
  INTERNAL_BORDERS,
  SEA_PATH,
  RIVER_PATHS,
  MAP_ANCHORS
} from "../data/bangladeshMapGeo";

// Colourful map of Bangladesh drawn from real division boundaries.
const DIVISION_STYLE = {
  rangpur: { name: "Rangpur", color: "#b7d36a", textColor: "#3a4a14" },
  mymensingh: { name: "Mymensingh", color: "#2f7f72", textColor: "#f5ede0" },
  sylhet: { name: "Sylhet", color: "#ee9d92", textColor: "#5a2018" },
  rajshahi: { name: "Rajshahi", color: "#b6b0d6", textColor: "#3a2f66" },
  dhaka: { name: "Dhaka", color: "#e1e47c", textColor: "#4a4a10" },
  khulna: { name: "Khulna", color: "#dca5c8", textColor: "#5e2450" },
  barishal: { name: "Barishal", color: "#8fd0a8", textColor: "#1c5a36" },
  chattogram: { name: "Chattogram", color: "#dcb96c", textColor: "#5a3e0a" }
};

const DIVISIONS = Object.keys(DIVISION_STYLE).map((id) => ({
  id,
  ...DIVISION_STYLE[id],
  ...DIVISION_SHAPES[id]
}));

function BangladeshMap({
  highlightedDivision,
  spots = [],
  onDivisionClick,
  interactive = true,
  compact = false
  compact = false,
}) {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const getOpacity = (p) => {
    if (highlightedDivision) return p.id === highlightedDivision ? 1 : 0.35;
    if (hovered) return hovered === p.id ? 1 : 0.8;
    return 1;
  };

  const activeId = highlightedDivision || hovered;
  const activeDivision = DIVISIONS.find((d) => d.id === activeId);

  // Draw the active division last so it sits on top
  const drawOrder = [...DIVISIONS].sort(
    (a, b) => Number(a.id === activeId) - Number(b.id === activeId)
  );

  const neighbourText = {
    fontFamily: "Outfit, sans-serif",
    fontWeight: 600,
    letterSpacing: "0.08em",
    fill: "#f2efe6",
    pointerEvents: "none"
  };

  return (
    <div className={`relative select-none ${compact ? "w-full" : "w-full"}`}>
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))" }}
      >
        <defs>
          <clipPath id="mapFrame">
            <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} rx="8" />
          </clipPath>
          <clipPath id="bangladeshOnly">
            {DIVISIONS.map((p) => (
              <path key={p.id} d={p.path} />
            ))}
          </clipPath>
        </defs>

        <g clipPath="url(#mapFrame)">
          {/* Neighbouring land (India / Myanmar) */}
          <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#a9a79c" />

          {/* Bay of Bengal */}
          <path d={SEA_PATH} fill="#9fd6d3" fillRule="evenodd" />
          <text
            x={MAP_ANCHORS.bay[0]}
            y={MAP_ANCHORS.bay[1]}
            textAnchor="middle"
            fontSize="9"
            fontStyle="italic"
            letterSpacing="0.14em"
            fontFamily="Outfit, sans-serif"
            fill="#2d6e8e"
            style={{ pointerEvents: "none" }}
          >
            BAY OF BENGAL
          </text>

          {/* Neighbour labels */}
          <g fontSize="7" style={neighbourText}>
            <text x={MAP_ANCHORS.meghalaya[0]} y={MAP_ANCHORS.meghalaya[1]} textAnchor="middle">MEGHALAYA</text>
            <text x={MAP_ANCHORS.meghalaya[0]} y={MAP_ANCHORS.meghalaya[1] + 9} textAnchor="middle">(INDIA)</text>
            <text x={MAP_ANCHORS.tripura[0]} y={MAP_ANCHORS.tripura[1]} textAnchor="middle" fontSize="6.5">TRIPURA</text>
            <text x={MAP_ANCHORS.tripura[0]} y={MAP_ANCHORS.tripura[1] + 8} textAnchor="middle" fontSize="6.5">(INDIA)</text>
            <text transform={`translate(${MAP_ANCHORS.westBengal[0]} ${MAP_ANCHORS.westBengal[1]}) rotate(-90)`} textAnchor="middle">
              WEST BENGAL (INDIA)
            </text>
            <text transform={`translate(${MAP_ANCHORS.myanmar[0]} ${MAP_ANCHORS.myanmar[1]}) rotate(-90)`} textAnchor="middle">
              MYANMAR
            </text>
            <text x={MAP_ANCHORS.assam[0]} y={MAP_ANCHORS.assam[1]} textAnchor="middle">INDIA</text>
          </g>

          {/* Soft same-colour edge underneath, closes tiny creeks along the coast */}
          {DIVISIONS.filter((p) => getOpacity(p) === 1).map((p) => (
            <path
              key={"edge-" + p.id}
              d={p.path}
              fill="none"
              stroke={p.color}
              strokeWidth="3"
              strokeLinejoin="round"
              style={{ pointerEvents: "none" }}
            />
          ))}

          {/* Division shapes */}
          {drawOrder.map((p) => (
            <path
              key={p.id}
              d={p.path}
              fill={p.color}
              opacity={getOpacity(p)}
              style={{
                cursor: interactive ? "pointer" : "default",
                transition: "opacity 0.25s ease"
              }}
              onMouseEnter={(e) => {
                if (!interactive) return;
                setHovered(p.id);
                const svgEl = e.target.closest("svg");
                const pt = svgEl.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                const svgPt = pt.matrixTransform(svgEl.getScreenCTM().inverse());
                setTooltip({ x: svgPt.x, y: svgPt.y - 12, name: p.name + " Division" });
              }}
              onMouseMove={(e) => {
                if (!interactive) return;
                const svgEl = e.target.closest("svg");
                const pt = svgEl.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                const svgPt = pt.matrixTransform(svgEl.getScreenCTM().inverse());
                setTooltip({ x: svgPt.x, y: svgPt.y - 12, name: p.name + " Division" });
              }}
              onMouseLeave={() => {
                setHovered(null);
                setTooltip(null);
              }}
              onClick={() => interactive && onDivisionClick?.(p.id)}
            />
          ))}

          {/* Borders between divisions */}
          <path
            d={INTERNAL_BORDERS}
            fill="none"
            stroke="#fbf6ec"
            strokeWidth="1.3"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ pointerEvents: "none" }}
          />

          {/* Outline of the active division */}
          {activeDivision && (
            <path
              d={activeDivision.path}
              fill="none"
              stroke="#1e3d28"
              strokeWidth="1.6"
              strokeLinejoin="round"
              style={{ pointerEvents: "none" }}
            />
          )}

          {/* Rivers */}
          <g
            clipPath="url(#bangladeshOnly)"
            fill="none"
            stroke="#5aa6cf"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.8"
            style={{ pointerEvents: "none" }}
          >
            {RIVER_PATHS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* Division labels */}
          {DIVISIONS.map(
            (p) =>
              (!highlightedDivision || highlightedDivision === p.id) && (
                <text
                  key={p.id}
                  x={p.labelX}
                  y={p.labelY}
                  textAnchor="middle"
                  fill={p.textColor}
                  fontSize={p.id === "mymensingh" ? "7.5" : "9"}
                  fontFamily="Outfit, sans-serif"
                  fontWeight="700"
                  letterSpacing="0.05em"
                  style={{ pointerEvents: "none", userSelect: "none", textTransform: "uppercase" }}
                >
                  {p.name}
                </text>
              )
          )}

          {/* Tourist spot markers */}
          {spots.map((spot, i) => (
            <g key={i} style={{ cursor: "pointer" }}>
              <circle cx={spot.mapX} cy={spot.mapY} r="10" fill="#c4602a" fillOpacity="0.2">
                <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={spot.mapX} cy={spot.mapY} r="5" fill="#c4602a" stroke="#f5ede0" strokeWidth="1.5" />
              <circle cx={spot.mapX} cy={spot.mapY} r="2" fill="#f5ede0" />
            </g>
          ))}

          {/* Compass */}
          <g transform={`translate(${MAP_ANCHORS.compass[0]}, ${MAP_ANCHORS.compass[1]})`}>
            <text x="0" y="-10" textAnchor="middle" fontSize="7" fill="#f2efe6" fontFamily="Outfit, sans-serif" fontWeight="700">N</text>
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#f2efe6" strokeWidth="1.2" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#f2efe6" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="1.5" fill="#f2efe6" />
          </g>

          {/* Tooltip */}
          {tooltip && (
            <g style={{ pointerEvents: "none" }}>
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
              >
                {tooltip.name}
              </text>
            </g>
          )}
        </g>
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

export { BangladeshMap as default };
