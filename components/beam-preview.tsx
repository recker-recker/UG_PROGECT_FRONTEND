"use client"

type BeamType = "I_BEAM" | "T_BEAM" | "CIRCULAR" | "RECT"

interface BeamPreviewProps {
  beamType: BeamType
  highlightedField?: string | null
}

function IBeamPreview({ highlightedField }: { highlightedField?: string | null }) {
  const centerX = 150
  const centerY = 130
  const width = 90
  const height = 110
  const flangeThickness = 16
  const webThickness = 12

  const highlightColor = "#3b82f6"
  const normalColor = "#64748b"
  const shapeStroke = "#1e293b"
  const shapeFill = "#e2e8f0"
  const gridColor = "#cbd5e1"
  const bgColor = "#f8fafc"

  const getColor = (field: string) => highlightedField === field ? highlightColor : normalColor
  const getWeight = (field: string) => (highlightedField === field ? 2.5 : 1.5)
  const getFontWeight = (field: string) => (highlightedField === field ? "600" : "400")

  return (
    <svg viewBox="0 0 300 260" className="h-full w-full">
      {/* Background */}
      <rect width="300" height="260" fill={bgColor} />
      
      {/* Grid pattern */}
      <defs>
        <pattern id="grid-i" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={gridColor} strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="260" fill="url(#grid-i)" />

      {/* Title */}
      <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill={shapeStroke}>
        I-Beam Cross Section
      </text>

      {/* I-Beam shape */}
      <g>
        {/* Top flange */}
        <rect
          x={centerX - width / 2}
          y={centerY - height / 2}
          width={width}
          height={flangeThickness}
          fill={shapeFill}
          stroke={shapeStroke}
          strokeWidth="2"
        />
        {/* Bottom flange */}
        <rect
          x={centerX - width / 2}
          y={centerY + height / 2 - flangeThickness}
          width={width}
          height={flangeThickness}
          fill={shapeFill}
          stroke={shapeStroke}
          strokeWidth="2"
        />
        {/* Web */}
        <rect
          x={centerX - webThickness / 2}
          y={centerY - height / 2 + flangeThickness}
          width={webThickness}
          height={height - 2 * flangeThickness}
          fill={shapeFill}
          stroke={shapeStroke}
          strokeWidth="2"
        />
      </g>

      {/* Width dimension (top) */}
      <g>
        <line x1={centerX - width / 2} y1={centerY - height / 2 - 20} x2={centerX - width / 2} y2={centerY - height / 2 - 8} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX + width / 2} y1={centerY - height / 2 - 20} x2={centerX + width / 2} y2={centerY - height / 2 - 8} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX - width / 2} y1={centerY - height / 2 - 16} x2={centerX - 22} y2={centerY - height / 2 - 16} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX + 22} y1={centerY - height / 2 - 16} x2={centerX + width / 2} y2={centerY - height / 2 - 16} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <polygon points={`${centerX - width / 2},${centerY - height / 2 - 16} ${centerX - width / 2 + 6},${centerY - height / 2 - 19} ${centerX - width / 2 + 6},${centerY - height / 2 - 13}`} fill={getColor("width")} />
        <polygon points={`${centerX + width / 2},${centerY - height / 2 - 16} ${centerX + width / 2 - 6},${centerY - height / 2 - 19} ${centerX + width / 2 - 6},${centerY - height / 2 - 13}`} fill={getColor("width")} />
        <text x={centerX} y={centerY - height / 2 - 24} textAnchor="middle" fontSize="10" fontWeight={getFontWeight("width")} fill={getColor("width")}>Width</text>
      </g>

      {/* Height dimension (right) */}
      <g>
        <line x1={centerX + width / 2 + 8} y1={centerY - height / 2} x2={centerX + width / 2 + 20} y2={centerY - height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 8} y1={centerY + height / 2} x2={centerX + width / 2 + 20} y2={centerY + height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 16} y1={centerY - height / 2} x2={centerX + width / 2 + 16} y2={centerY - 12} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 16} y1={centerY + 12} x2={centerX + width / 2 + 16} y2={centerY + height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <polygon points={`${centerX + width / 2 + 16},${centerY - height / 2} ${centerX + width / 2 + 13},${centerY - height / 2 + 6} ${centerX + width / 2 + 19},${centerY - height / 2 + 6}`} fill={getColor("height")} />
        <polygon points={`${centerX + width / 2 + 16},${centerY + height / 2} ${centerX + width / 2 + 13},${centerY + height / 2 - 6} ${centerX + width / 2 + 19},${centerY + height / 2 - 6}`} fill={getColor("height")} />
        <text x={centerX + width / 2 + 28} y={centerY + 4} textAnchor="start" fontSize="10" fontWeight={getFontWeight("height")} fill={getColor("height")}>Height</text>
      </g>

      {/* Flange thickness dimension (left side, pointing to top flange) */}
      <g>
        <line x1={centerX - width / 2 - 8} y1={centerY - height / 2} x2={centerX - width / 2 - 25} y2={centerY - height / 2} stroke={getColor("flangeThickness")} strokeWidth={getWeight("flangeThickness")} />
        <line x1={centerX - width / 2 - 8} y1={centerY - height / 2 + flangeThickness} x2={centerX - width / 2 - 25} y2={centerY - height / 2 + flangeThickness} stroke={getColor("flangeThickness")} strokeWidth={getWeight("flangeThickness")} />
        <line x1={centerX - width / 2 - 18} y1={centerY - height / 2 + 2} x2={centerX - width / 2 - 18} y2={centerY - height / 2 + flangeThickness - 2} stroke={getColor("flangeThickness")} strokeWidth={getWeight("flangeThickness")} />
        <polygon points={`${centerX - width / 2 - 18},${centerY - height / 2} ${centerX - width / 2 - 21},${centerY - height / 2 + 5} ${centerX - width / 2 - 15},${centerY - height / 2 + 5}`} fill={getColor("flangeThickness")} />
        <polygon points={`${centerX - width / 2 - 18},${centerY - height / 2 + flangeThickness} ${centerX - width / 2 - 21},${centerY - height / 2 + flangeThickness - 5} ${centerX - width / 2 - 15},${centerY - height / 2 + flangeThickness - 5}`} fill={getColor("flangeThickness")} />
        <text x={centerX - width / 2 - 30} y={centerY - height / 2 + flangeThickness / 2 + 4} textAnchor="end" fontSize="9" fontWeight={getFontWeight("flangeThickness")} fill={getColor("flangeThickness")}>tf</text>
      </g>

      {/* Web thickness dimension (center, horizontal at middle of web) */}
      <g>
        <line x1={centerX - webThickness / 2} y1={centerY - 8} x2={centerX - webThickness / 2} y2={centerY + 8} stroke={getColor("webThickness")} strokeWidth={getWeight("webThickness")} />
        <line x1={centerX + webThickness / 2} y1={centerY - 8} x2={centerX + webThickness / 2} y2={centerY + 8} stroke={getColor("webThickness")} strokeWidth={getWeight("webThickness")} />
        <line x1={centerX - webThickness / 2 + 2} y1={centerY} x2={centerX + webThickness / 2 - 2} y2={centerY} stroke={getColor("webThickness")} strokeWidth={getWeight("webThickness")} />
        <polygon points={`${centerX - webThickness / 2},${centerY} ${centerX - webThickness / 2 + 5},${centerY - 3} ${centerX - webThickness / 2 + 5},${centerY + 3}`} fill={getColor("webThickness")} />
        <polygon points={`${centerX + webThickness / 2},${centerY} ${centerX + webThickness / 2 - 5},${centerY - 3} ${centerX + webThickness / 2 - 5},${centerY + 3}`} fill={getColor("webThickness")} />
        <text x={centerX} y={centerY + 22} textAnchor="middle" fontSize="9" fontWeight={getFontWeight("webThickness")} fill={getColor("webThickness")}>tw</text>
      </g>

      {/* Length indicator */}
      <g>
        <circle cx="150" cy="225" r="7" fill="none" stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <circle cx="150" cy="225" r="2" fill={getColor("length")} />
        <text x="150" y="245" textAnchor="middle" fontSize="9" fontWeight={getFontWeight("length")} fill={getColor("length")}>Length (Z-axis)</text>
      </g>
    </svg>
  )
}

function TBeamPreview({ highlightedField }: { highlightedField?: string | null }) {
  const centerX = 150
  const centerY = 130
  const width = 90
  const height = 90
  const flangeThickness = 16
  const webThickness = 14

  const highlightColor = "#3b82f6"
  const normalColor = "#64748b"
  const shapeStroke = "#1e293b"
  const shapeFill = "#e2e8f0"
  const gridColor = "#cbd5e1"
  const bgColor = "#f8fafc"

  const getColor = (field: string) => highlightedField === field ? highlightColor : normalColor
  const getWeight = (field: string) => (highlightedField === field ? 2.5 : 1.5)
  const getFontWeight = (field: string) => (highlightedField === field ? "600" : "400")

  return (
    <svg viewBox="0 0 300 260" className="h-full w-full">
      {/* Background */}
      <rect width="300" height="260" fill={bgColor} />
      
      {/* Grid pattern */}
      <defs>
        <pattern id="grid-t" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={gridColor} strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="260" fill="url(#grid-t)" />

      {/* Title */}
      <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill={shapeStroke}>
        T-Beam Cross Section
      </text>

      {/* T-Beam shape */}
      <g>
        {/* Top flange */}
        <rect
          x={centerX - width / 2}
          y={centerY - height / 2}
          width={width}
          height={flangeThickness}
          fill={shapeFill}
          stroke={shapeStroke}
          strokeWidth="2"
        />
        {/* Web (stem) */}
        <rect
          x={centerX - webThickness / 2}
          y={centerY - height / 2 + flangeThickness}
          width={webThickness}
          height={height - flangeThickness}
          fill={shapeFill}
          stroke={shapeStroke}
          strokeWidth="2"
        />
      </g>

      {/* Width dimension (top) */}
      <g>
        <line x1={centerX - width / 2} y1={centerY - height / 2 - 20} x2={centerX - width / 2} y2={centerY - height / 2 - 8} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX + width / 2} y1={centerY - height / 2 - 20} x2={centerX + width / 2} y2={centerY - height / 2 - 8} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX - width / 2} y1={centerY - height / 2 - 16} x2={centerX - 22} y2={centerY - height / 2 - 16} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX + 22} y1={centerY - height / 2 - 16} x2={centerX + width / 2} y2={centerY - height / 2 - 16} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <polygon points={`${centerX - width / 2},${centerY - height / 2 - 16} ${centerX - width / 2 + 6},${centerY - height / 2 - 19} ${centerX - width / 2 + 6},${centerY - height / 2 - 13}`} fill={getColor("width")} />
        <polygon points={`${centerX + width / 2},${centerY - height / 2 - 16} ${centerX + width / 2 - 6},${centerY - height / 2 - 19} ${centerX + width / 2 - 6},${centerY - height / 2 - 13}`} fill={getColor("width")} />
        <text x={centerX} y={centerY - height / 2 - 24} textAnchor="middle" fontSize="10" fontWeight={getFontWeight("width")} fill={getColor("width")}>Width</text>
      </g>

      {/* Height dimension (right) */}
      <g>
        <line x1={centerX + width / 2 + 8} y1={centerY - height / 2} x2={centerX + width / 2 + 20} y2={centerY - height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 8} y1={centerY + height / 2} x2={centerX + width / 2 + 20} y2={centerY + height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 16} y1={centerY - height / 2} x2={centerX + width / 2 + 16} y2={centerY - 12} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 16} y1={centerY + 12} x2={centerX + width / 2 + 16} y2={centerY + height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <polygon points={`${centerX + width / 2 + 16},${centerY - height / 2} ${centerX + width / 2 + 13},${centerY - height / 2 + 6} ${centerX + width / 2 + 19},${centerY - height / 2 + 6}`} fill={getColor("height")} />
        <polygon points={`${centerX + width / 2 + 16},${centerY + height / 2} ${centerX + width / 2 + 13},${centerY + height / 2 - 6} ${centerX + width / 2 + 19},${centerY + height / 2 - 6}`} fill={getColor("height")} />
        <text x={centerX + width / 2 + 28} y={centerY + 4} textAnchor="start" fontSize="10" fontWeight={getFontWeight("height")} fill={getColor("height")}>Height</text>
      </g>

      {/* Flange thickness dimension (left side) */}
      <g>
        <line x1={centerX - width / 2 - 8} y1={centerY - height / 2} x2={centerX - width / 2 - 25} y2={centerY - height / 2} stroke={getColor("flangeThickness")} strokeWidth={getWeight("flangeThickness")} />
        <line x1={centerX - width / 2 - 8} y1={centerY - height / 2 + flangeThickness} x2={centerX - width / 2 - 25} y2={centerY - height / 2 + flangeThickness} stroke={getColor("flangeThickness")} strokeWidth={getWeight("flangeThickness")} />
        <line x1={centerX - width / 2 - 18} y1={centerY - height / 2 + 2} x2={centerX - width / 2 - 18} y2={centerY - height / 2 + flangeThickness - 2} stroke={getColor("flangeThickness")} strokeWidth={getWeight("flangeThickness")} />
        <polygon points={`${centerX - width / 2 - 18},${centerY - height / 2} ${centerX - width / 2 - 21},${centerY - height / 2 + 5} ${centerX - width / 2 - 15},${centerY - height / 2 + 5}`} fill={getColor("flangeThickness")} />
        <polygon points={`${centerX - width / 2 - 18},${centerY - height / 2 + flangeThickness} ${centerX - width / 2 - 21},${centerY - height / 2 + flangeThickness - 5} ${centerX - width / 2 - 15},${centerY - height / 2 + flangeThickness - 5}`} fill={getColor("flangeThickness")} />
        <text x={centerX - width / 2 - 30} y={centerY - height / 2 + flangeThickness / 2 + 4} textAnchor="end" fontSize="9" fontWeight={getFontWeight("flangeThickness")} fill={getColor("flangeThickness")}>tf</text>
      </g>

      {/* Web thickness dimension (bottom of stem) */}
      <g>
        <line x1={centerX - webThickness / 2} y1={centerY + height / 2 + 8} x2={centerX - webThickness / 2} y2={centerY + height / 2 + 20} stroke={getColor("webThickness")} strokeWidth={getWeight("webThickness")} />
        <line x1={centerX + webThickness / 2} y1={centerY + height / 2 + 8} x2={centerX + webThickness / 2} y2={centerY + height / 2 + 20} stroke={getColor("webThickness")} strokeWidth={getWeight("webThickness")} />
        <line x1={centerX - webThickness / 2 + 2} y1={centerY + height / 2 + 14} x2={centerX + webThickness / 2 - 2} y2={centerY + height / 2 + 14} stroke={getColor("webThickness")} strokeWidth={getWeight("webThickness")} />
        <polygon points={`${centerX - webThickness / 2},${centerY + height / 2 + 14} ${centerX - webThickness / 2 + 5},${centerY + height / 2 + 11} ${centerX - webThickness / 2 + 5},${centerY + height / 2 + 17}`} fill={getColor("webThickness")} />
        <polygon points={`${centerX + webThickness / 2},${centerY + height / 2 + 14} ${centerX + webThickness / 2 - 5},${centerY + height / 2 + 11} ${centerX + webThickness / 2 - 5},${centerY + height / 2 + 17}`} fill={getColor("webThickness")} />
        <text x={centerX} y={centerY + height / 2 + 32} textAnchor="middle" fontSize="9" fontWeight={getFontWeight("webThickness")} fill={getColor("webThickness")}>tw</text>
      </g>

      {/* Length indicator */}
      <g>
        <circle cx="150" cy="235" r="7" fill="none" stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <circle cx="150" cy="235" r="2" fill={getColor("length")} />
        <text x="150" y="255" textAnchor="middle" fontSize="9" fontWeight={getFontWeight("length")} fill={getColor("length")}>Length (Z-axis)</text>
      </g>
    </svg>
  )
}

function CircularPreview({ highlightedField }: { highlightedField?: string | null }) {
  const centerX = 150
  const centerY = 120
  const radius = 45

  const highlightColor = "#3b82f6"
  const normalColor = "#64748b"
  const shapeStroke = "#1e293b"
  const shapeFill = "#e2e8f0"
  const gridColor = "#cbd5e1"
  const bgColor = "#f8fafc"

  const getColor = (field: string) => highlightedField === field ? highlightColor : normalColor
  const getWeight = (field: string) => (highlightedField === field ? 2.5 : 1.5)
  const getFontWeight = (field: string) => (highlightedField === field ? "600" : "400")

  return (
    <svg viewBox="0 0 300 260" className="h-full w-full">
      {/* Background */}
      <rect width="300" height="260" fill={bgColor} />
      
      {/* Grid pattern */}
      <defs>
        <pattern id="grid-c" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={gridColor} strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="260" fill="url(#grid-c)" />

      {/* Title */}
      <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill={shapeStroke}>
        Circular Cross Section
      </text>

      {/* Circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill={shapeFill}
        stroke={shapeStroke}
        strokeWidth="2"
      />

      {/* Center point */}
      <circle cx={centerX} cy={centerY} r="3" fill={shapeStroke} />

      {/* Diameter dimension (horizontal through center) */}
      <g>
        <line x1={centerX - radius} y1={centerY} x2={centerX - 28} y2={centerY} stroke={getColor("diameter")} strokeWidth={getWeight("diameter")} strokeDasharray="3 2" />
        <line x1={centerX + 28} y1={centerY} x2={centerX + radius} y2={centerY} stroke={getColor("diameter")} strokeWidth={getWeight("diameter")} strokeDasharray="3 2" />
        <polygon points={`${centerX - radius},${centerY} ${centerX - radius + 7},${centerY - 4} ${centerX - radius + 7},${centerY + 4}`} fill={getColor("diameter")} />
        <polygon points={`${centerX + radius},${centerY} ${centerX + radius - 7},${centerY - 4} ${centerX + radius - 7},${centerY + 4}`} fill={getColor("diameter")} />
        <rect x={centerX - 26} y={centerY - 8} width="52" height="16" fill={bgColor} rx="2" />
        <text x={centerX} y={centerY + 4} textAnchor="middle" fontSize="10" fontWeight={getFontWeight("diameter")} fill={getColor("diameter")}>Diameter</text>
      </g>

      {/* Radius indicator line */}
      <g>
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + radius * 0.707}
          y2={centerY - radius * 0.707}
          stroke={normalColor}
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.6"
        />
        <text x={centerX + radius * 0.4 + 4} y={centerY - radius * 0.4} fontSize="9" fill={normalColor}>r</text>
      </g>

      {/* 3D cylinder preview */}
      <g transform="translate(150, 210)">
        <ellipse cx="0" cy="0" rx="25" ry="8" fill="none" stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <line x1="-25" y1="0" x2="-25" y2="20" stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <line x1="25" y1="0" x2="25" y2="20" stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <ellipse cx="0" cy="20" rx="25" ry="8" fill={shapeFill} stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <text x="0" y="42" textAnchor="middle" fontSize="9" fontWeight={getFontWeight("length")} fill={getColor("length")}>Length</text>
      </g>
    </svg>
  )
}

function RectPreview({ highlightedField }: { highlightedField?: string | null }) {
  const centerX = 150
  const centerY = 120
  const width = 80
  const height = 100

  const highlightColor = "#3b82f6"
  const normalColor = "#64748b"
  const shapeStroke = "#1e293b"
  const shapeFill = "#e2e8f0"
  const gridColor = "#cbd5e1"
  const bgColor = "#f8fafc"

  const getColor = (field: string) => highlightedField === field ? highlightColor : normalColor
  const getWeight = (field: string) => (highlightedField === field ? 2.5 : 1.5)
  const getFontWeight = (field: string) => (highlightedField === field ? "600" : "400")

  return (
    <svg viewBox="0 0 300 260" className="h-full w-full">
      {/* Background */}
      <rect width="300" height="260" fill={bgColor} />
      
      {/* Grid pattern */}
      <defs>
        <pattern id="grid-r" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={gridColor} strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="260" fill="url(#grid-r)" />

      {/* Title */}
      <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill={shapeStroke}>
        Rectangular Cross Section
      </text>

      {/* Rectangle */}
      <rect
        x={centerX - width / 2}
        y={centerY - height / 2}
        width={width}
        height={height}
        fill={shapeFill}
        stroke={shapeStroke}
        strokeWidth="2"
      />

      {/* Width dimension (top) */}
      <g>
        <line x1={centerX - width / 2} y1={centerY - height / 2 - 20} x2={centerX - width / 2} y2={centerY - height / 2 - 8} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX + width / 2} y1={centerY - height / 2 - 20} x2={centerX + width / 2} y2={centerY - height / 2 - 8} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX - width / 2} y1={centerY - height / 2 - 16} x2={centerX - 22} y2={centerY - height / 2 - 16} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <line x1={centerX + 22} y1={centerY - height / 2 - 16} x2={centerX + width / 2} y2={centerY - height / 2 - 16} stroke={getColor("width")} strokeWidth={getWeight("width")} />
        <polygon points={`${centerX - width / 2},${centerY - height / 2 - 16} ${centerX - width / 2 + 6},${centerY - height / 2 - 19} ${centerX - width / 2 + 6},${centerY - height / 2 - 13}`} fill={getColor("width")} />
        <polygon points={`${centerX + width / 2},${centerY - height / 2 - 16} ${centerX + width / 2 - 6},${centerY - height / 2 - 19} ${centerX + width / 2 - 6},${centerY - height / 2 - 13}`} fill={getColor("width")} />
        <text x={centerX} y={centerY - height / 2 - 24} textAnchor="middle" fontSize="10" fontWeight={getFontWeight("width")} fill={getColor("width")}>Width</text>
      </g>

      {/* Height dimension (right) */}
      <g>
        <line x1={centerX + width / 2 + 8} y1={centerY - height / 2} x2={centerX + width / 2 + 20} y2={centerY - height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 8} y1={centerY + height / 2} x2={centerX + width / 2 + 20} y2={centerY + height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 16} y1={centerY - height / 2} x2={centerX + width / 2 + 16} y2={centerY - 12} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <line x1={centerX + width / 2 + 16} y1={centerY + 12} x2={centerX + width / 2 + 16} y2={centerY + height / 2} stroke={getColor("height")} strokeWidth={getWeight("height")} />
        <polygon points={`${centerX + width / 2 + 16},${centerY - height / 2} ${centerX + width / 2 + 13},${centerY - height / 2 + 6} ${centerX + width / 2 + 19},${centerY - height / 2 + 6}`} fill={getColor("height")} />
        <polygon points={`${centerX + width / 2 + 16},${centerY + height / 2} ${centerX + width / 2 + 13},${centerY + height / 2 - 6} ${centerX + width / 2 + 19},${centerY + height / 2 - 6}`} fill={getColor("height")} />
        <text x={centerX + width / 2 + 28} y={centerY + 4} textAnchor="start" fontSize="10" fontWeight={getFontWeight("height")} fill={getColor("height")}>Height</text>
      </g>

      {/* 3D box preview */}
      <g transform="translate(150, 215)">
        <polygon points="-20,0 20,0 30,-8 -10,-8" fill={shapeFill} stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <polygon points="20,0 20,15 30,7 30,-8" fill={shapeFill} stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <rect x="-20" y="0" width="40" height="15" fill={shapeFill} stroke={getColor("length")} strokeWidth={getWeight("length")} />
        <text x="5" y="35" textAnchor="middle" fontSize="9" fontWeight={getFontWeight("length")} fill={getColor("length")}>Length</text>
      </g>
    </svg>
  )
}

export function BeamPreview({ beamType, highlightedField }: BeamPreviewProps) {
  switch (beamType) {
    case "I_BEAM":
      return <IBeamPreview highlightedField={highlightedField} />
    case "T_BEAM":
      return <TBeamPreview highlightedField={highlightedField} />
    case "CIRCULAR":
      return <CircularPreview highlightedField={highlightedField} />
    case "RECT":
      return <RectPreview highlightedField={highlightedField} />
    default:
      return <IBeamPreview highlightedField={highlightedField} />
  }
}
