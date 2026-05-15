const BASE = import.meta.env.BASE_URL

const LOGOS = [
  { src: `${BASE}logo1.png`, alt: 'Logo 1' },
  { src: `${BASE}logo2.png`, alt: 'Logo 2' },
  { src: `${BASE}logo3.png`, alt: 'Logo 3' },
]

// Repeat enough times for a seamless loop
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

export default function TrustBanner() {
  return (
    <section
      style={{
        background: '#ffcf01',
        width: '100%',
        padding: '3.5rem 0',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.75)',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        They already trust us
      </p>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="trust-track">
          {TRACK.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              draggable={false}
              style={{
                height: 52,
                width: 'auto',
                objectFit: 'contain',
                flexShrink: 0,
                filter: 'brightness(0) invert(1)',
                opacity: 0.8,
                userSelect: 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
