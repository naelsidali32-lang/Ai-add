import { useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

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

function Letter({ char, texture, delay }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'inline-block',
        color: hover ? 'transparent' : '#FFFFFF',
        backgroundImage: hover ? `url(${texture})` : 'none',
        backgroundSize: '220%',
        backgroundPosition: 'center',
        WebkitBackgroundClip: hover ? 'text' : 'initial',
        backgroundClip: hover ? 'text' : 'initial',
        transition: 'color 0.25s ease',
        userSelect: 'none',
      }}
    >
      {char}
    </motion.span>
  )
}

function FitLine({ chars, textures, baseDelay = 0, onClick }) {
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
    <div
      ref={wrapRef}
      onClick={onClick}
      style={{ width: '100%', overflow: 'hidden', lineHeight: 0.82, cursor: onClick ? 'pointer' : 'default' }}
    >
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
          <Letter key={i} char={ch} texture={textures[i]} delay={baseDelay + i * 0.05} />
        ))}
      </div>
    </div>
  )
}

const SOLUTIONS_LETTERS = ['S', 'O', 'L', 'U', 'T', 'I', 'O', 'N', 'S']
const CONTACT_LETTERS = ['C', 'O', 'N', 'T', 'A', 'C', 'T']

export default function GenePanel({ onSolutions }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const handleSolutions = () => {
    setOpen(false)
    if (onSolutions) onSolutions()
    else window.location.hash = 'discover'
  }

  const handleContact = () => {
    setOpen(false)
    window.dispatchEvent(new CustomEvent('open-contact'))
  }

  return (
    <>
      {/* startN.png button — centered over the puffer-fish grid hole */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.88, rotate: -4 }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 380, damping: 18 },
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 20,
          width: 'clamp(160px, 22vw, 320px)',
          lineHeight: 0,
          filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.25))',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}startN.png`}
          alt="Open menu"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          draggable={false}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="solutions-contact-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: '#ffcf01',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '2vh',
              padding: '7vh 5vw',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 'clamp(1rem, 2.5vh, 2rem)',
                right: 'clamp(1rem, 2.5vw, 2rem)',
                background: 'rgba(10,10,10,0.92)',
                color: '#FFFFFF',
                border: 'none',
                width: 46,
                height: 46,
                borderRadius: 9999,
                cursor: 'pointer',
                fontSize: 24,
                fontWeight: 700,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              ×
            </button>

            <FitLine
              chars={SOLUTIONS_LETTERS}
              textures={TEXTURES.slice(0, SOLUTIONS_LETTERS.length)}
              baseDelay={0.15}
              onClick={handleSolutions}
            />

            <FitLine
              chars={CONTACT_LETTERS}
              textures={TEXTURES.slice(0, CONTACT_LETTERS.length)}
              baseDelay={0.55}
              onClick={handleContact}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
