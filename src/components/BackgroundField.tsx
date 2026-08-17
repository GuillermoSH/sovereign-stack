/**
 * Abstract backdrop for the landing: a sparse circuit/network-trace motif — the
 * same visual language as the rest of the brand (nodes + right-angle traces,
 * periwinkle/cyan on void), not a decorative mesh gradient. `BackgroundField` is
 * the static tiled layer behind every section; `HeroField` is the full-viewport
 * signal-plane that lives only in the hero. `SectionField` is thematic, quiet
 * geometry per banded section — not a hero clone.
 */

export function BackgroundField() {
  return (
    <svg className="bg-field" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="circuit-tile" width="560" height="560" patternUnits="userSpaceOnUse">
          <path
            className="bg-field__trace"
            d="M70,90 V230 H120 M250,60 V140 H300 V200 M420,110 H500 V240 M120,230 H220 V350 M300,200 V300 H380 V400 M60,380 H160 V480 M380,400 H480 V460"
          />
          <circle className="bg-field__node" cx="70" cy="90" r="3.2" />
          <circle className="bg-field__node bg-field__node--hollow" cx="250" cy="60" r="3.2" />
          <circle className="bg-field__node" cx="420" cy="110" r="3.2" />
          <circle className="bg-field__node bg-field__node--cyan" cx="500" cy="240" r="3.6" />
          <circle className="bg-field__node bg-field__node--hollow" cx="120" cy="230" r="3.2" />
          <circle className="bg-field__node" cx="300" cy="200" r="3.2" />
          <circle className="bg-field__node bg-field__node--hollow" cx="60" cy="380" r="3.2" />
          <circle className="bg-field__node" cx="220" cy="350" r="3.2" />
          <circle className="bg-field__node bg-field__node--hollow" cx="380" cy="400" r="3.2" />
          <circle className="bg-field__node bg-field__node--cyan" cx="480" cy="460" r="3.6" />
          <circle className="bg-field__node bg-field__node--hollow" cx="160" cy="480" r="3.2" />
          <circle className="bg-field__node bg-field__node--hollow" cx="500" cy="460" r="2.6" />
          <circle className="bg-field__node" cx="30" cy="480" r="2.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-tile)" />
    </svg>
  )
}

/**
 * Full-viewport signal plane for the hero: one committed angular field on the
 * right/top (~30–40% of the surface) plus long orthogonal traces that actually
 * cross the screen. Crisp-edged fills — never a blurred radial mesh.
 */
export function HeroField() {
  return (
    <svg
      className="hero-field motion-allow"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <polygon
        className="hero-field__plane hero-field__plane--a"
        points="760,-80 1680,-80 1680,640 1120,820 620,360"
      />
      <polygon
        className="hero-field__plane hero-field__plane--b"
        points="1040,160 1680,40 1680,980 860,980 940,500"
      />

      <path className="hero-field__trace" d="M-80,150 H440 V270 H1020 V150 H1680" />
      <path className="hero-field__trace" d="M-80,430 H260 V570 H760 V430 H1300 V610 H1680" />
      <path className="hero-field__trace" d="M-80,710 H380 V800 H920" />
      <path className="hero-field__trace" d="M1180,-40 V290 H1400 V920" />
      <path className="hero-field__trace" d="M140,920 V640 H300 V430" />

      <path className="hero-field__pulse hero-field__pulse--a" d="M-80,150 H440 V270 H1020 V150 H1680" />
      <path className="hero-field__pulse hero-field__pulse--b" d="M-80,430 H260 V570 H760 V430 H1300 V610 H1680" />
      <path className="hero-field__pulse hero-field__pulse--c" d="M1180,-40 V290 H1400 V920" />

      <circle className="hero-field__node hero-field__node--a" cx="440" cy="150" r="5" />
      <circle className="hero-field__node hero-field__node--hollow hero-field__node--b" cx="1020" cy="150" r="5" />
      <circle className="hero-field__node hero-field__node--cyan hero-field__node--c" cx="260" cy="430" r="5.5" />
      <circle className="hero-field__node hero-field__node--d" cx="760" cy="430" r="5" />
      <circle className="hero-field__node hero-field__node--hollow hero-field__node--e" cx="1300" cy="430" r="5" />
      <circle className="hero-field__node hero-field__node--f" cx="1180" cy="290" r="5" />
      <circle className="hero-field__node hero-field__node--cyan hero-field__node--g" cx="1400" cy="290" r="5.5" />
      <circle className="hero-field__node hero-field__node--hollow hero-field__node--h" cx="300" cy="640" r="5" />
      <circle className="hero-field__node hero-field__node--i" cx="380" cy="710" r="4.5" />
    </svg>
  )
}

/**
 * Thematic section atmospheres — quiet, motif-specific.
 * - services: stack shelves + dual angular washes (hero kin)
 * - network: dual planes + orthogonal traces + circular nodes (like hero)
 * - story: organic 4-stop path (curves/direct), circular nodes, pulsing goal
 *
 * Motifs are edge-anchored so ultrawide keeps a solid band + decoration near content.
 */
export function SectionField({
  motif,
}: {
  motif: 'services' | 'network' | 'story'
}) {
  const aspect =
    motif === 'network' ? 'xMinYMid slice' : 'xMaxYMid slice'

  return (
    <svg
      className={`section-field section-field--${motif} motion-allow`}
      viewBox="0 0 1600 900"
      preserveAspectRatio={aspect}
      aria-hidden="true"
      focusable="false"
    >
      {motif === 'services' && (
        <>
          <polygon
            className="section-field__wash section-field__wash--a"
            points="1080,40 1680,-40 1680,640 1280,900 920,420"
          />
          <polygon
            className="section-field__wash section-field__wash--b"
            points="1240,180 1680,60 1680,980 1080,980 1180,520"
          />
        </>
      )}

      {motif === 'network' && (
        <>
          <polygon
            className="section-field__wash section-field__wash--a"
            points="-80,-40 720,-20 780,320 460,820 -80,640"
          />
          <polygon
            className="section-field__wash section-field__wash--b"
            points="-80,120 480,40 560,520 -80,700"
          />
          <path className="section-field__trace" d="M-80,180 H420 V320 H780" />
          <path className="section-field__trace" d="M-80,420 H280 V580 H640 V700 H920" />
          <path className="section-field__trace" d="M-80,620 H200 V780 H480" />
          <path className="section-field__trace" d="M280,-20 V360 H120 V920" />
          <path className="section-field__trace" d="M520,120 V420 H700" />
          <circle className="section-field__node" cx="420" cy="180" r="5" />
          <circle className="section-field__node section-field__node--hollow" cx="280" cy="420" r="5" />
          <circle className="section-field__node section-field__node--cyan" cx="640" cy="580" r="5.5" />
          <circle className="section-field__node" cx="120" cy="360" r="4.5" />
          <circle className="section-field__node section-field__node--hollow" cx="520" cy="420" r="4.5" />
          <circle className="section-field__node section-field__node--cyan" cx="200" cy="620" r="5" />
        </>
      )}

      {motif === 'story' && (
        <>
          <polygon
            className="section-field__wash section-field__wash--a"
            points="1140,900 1340,80 1680,-40 1680,900"
          />
          <polygon
            className="section-field__wash section-field__wash--b"
            points="1280,900 1480,220 1680,120 1680,900"
          />
          {/* Four stops = four roadmap steps; last is the pulsing goal */}
          <path
            className="section-field__path"
            d="M1290,760 C1320,680 1265,620 1355,540 S1430,430 1375,320 S1480,200 1460,110"
          />
          <circle className="section-field__station" cx="1290" cy="760" r="6" />
          <circle className="section-field__station" cx="1355" cy="540" r="6.5" />
          <circle className="section-field__station" cx="1375" cy="320" r="6" />
          <circle className="section-field__goal" cx="1460" cy="110" r="8" />
          <circle className="section-field__goal-ring" cx="1460" cy="110" r="14" />
        </>
      )}
    </svg>
  )
}

/** Wave cutters: paint page void over band edges so transitions read as curves, not facets. */
export function SectionWaves({ close = false }: { close?: boolean }) {
  return (
    <>
      <svg
        className="section-wave section-wave--top"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="section-wave__fill"
          d="M0,0 H1440 V28 C1260,58 1080,8 900,28 C660,56 420,4 240,32 C120,48 60,36 0,44 Z"
        />
      </svg>
      {!close && (
        <svg
          className="section-wave section-wave--bottom"
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="section-wave__fill"
            d="M0,72 H1440 V44 C1320,24 1200,60 1020,40 C780,12 540,64 360,36 C180,8 90,40 0,28 Z"
          />
        </svg>
      )}
    </>
  )
}
