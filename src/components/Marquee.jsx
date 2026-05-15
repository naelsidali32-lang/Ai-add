const BLUE = '#0131ff'

export default function Marquee({
  words,
  reverse = false,
  duration = 28,
  fontSize = 'clamp(3.5rem, 9vw, 9rem)',
  color = BLUE,
  opacity = 1,
}) {
  // Duplicate the words enough times that the loop hides the seam.
  const track = Array.from({ length: 4 }).flatMap(() => words)

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <div
        className={reverse ? 'mq-track mq-rev' : 'mq-track'}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((word, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontWeight: 900,
              fontSize,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color,
              opacity,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55em',
            }}
          >
            {word}
            <span
              aria-hidden
              style={{
                width: '0.45em',
                height: '0.45em',
                borderRadius: 9999,
                background: color,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
