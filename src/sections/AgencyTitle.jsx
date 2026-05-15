import { useState, useRef, useLayoutEffect, useCallback } from 'react'

const BASE = import.meta.env.BASE_URL

// A (ANNA) → fontt1, N → font2, N → font3, A → font4
// K → font5, A → font6, L → font7, E → font8, B → font9
const TEXTURES = [
  `${BASE}fontt1.jpg`,
  `${BASE}font2.jpg`,
  `${BASE}font3.jpg`,
  `${BASE}font4.jpg`,
  `${BASE}font5.jpg`,
  `${BASE}font6.jpg`,
  `${BASE}font7.jpg`,
  `${BASE}font8.jpg`,
  `${BASE}font9.jpg`,
]

function Letter({ char, texture }) {
  const [hover, setHover] = useState(false)

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-block',
        cursor: 'default',
        color: hover ? 'transparent' : '#FFFFFF',
        backgroundImage: hover ? `url(${texture})` : 'none',
        backgroundSize: '200%',
        backgroundPosition: 'center',
        WebkitBackgroundClip: hover ? 'text' : 'initial',
        backgroundClip: hover ? 'text' : 'initial',
        transition: 'color 0.25s ease',
        userSelect: 'none',
      }}
    >
      {char}
    </span>
  )
}

function FitLine({ chars, textures }) {
  const wrapRef = useRef(null)
  const textRef = useRef(null)

  const fit = useCallback(() => {
    const wrap = wrapRef.current
    const text = textRef.current
    if (!wrap || !text) return
    text.style.fontSize = '200px'
    const ratio = wrap.offsetWidth / text.scrollWidth
    text.style.fontSize = Math.floor(200 * ratio * 0.995) + 'px'
  }, [])

  useLayoutEffect(() => {
    fit()
    document.fonts.ready.then(fit)
    const ro = new ResizeObserver(fit)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [fit])

  return (
    <div ref={wrapRef} style={{ width: '100%', overflow: 'hidden', lineHeight: 0.82 }}>
      <div
        ref={textRef}
        style={{
          whiteSpace: 'nowrap',
          fontFamily: "'League Spartan', sans-serif",
          fontWeight: 900,
          letterSpacing: '-0.03em',
          fontSize: 200,
          display: 'inline-block',
        }}
      >
        {chars.map((ch, i) => (
          <Letter key={i} char={ch} texture={textures[i]} />
        ))}
      </div>
    </div>
  )
}

export default function AgencyTitle({ onEnter }) {
  return (
    <section
      style={{
        background: '#ffcf01',
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8vh 5vw 4vh',
        overflow: 'hidden',
        gap: '0.5rem',
        zIndex: 100,
      }}
    >
      <FitLine
        chars={['A', 'N', 'N', 'A']}
        textures={TEXTURES.slice(0, 4)}
      />
      <FitLine
        chars={['K', 'A', 'L', 'E', 'B']}
        textures={TEXTURES.slice(4, 9)}
      />

      <button
        type="button"
        onClick={onEnter}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '1.5vh',
          transform: 'translateX(-50%)',
          background: 'transparent',
          color: '#FFFFFF',
          border: '1.5px solid rgba(255,255,255,0.85)',
          borderRadius: 9999,
          padding: '14px 36px',
          fontFamily: "'League Spartan', sans-serif",
          fontWeight: 700,
          fontSize: '0.78rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6em',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#FFFFFF'
          e.currentTarget.style.color = '#0A0A0A'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#FFFFFF'
        }}
      >
        Enter
        <span style={{ display: 'inline-block', transform: 'translateY(1px)' }}>↓</span>
      </button>
    </section>
  )
}
