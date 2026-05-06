import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useIsMobile, useIsTablet } from '../hooks/useMedia'

const PufferFish = lazy(() => import('../components/PufferFish'))

const timelinePhotos = [
  '/Ai-add/photo1.jpg',
  '/Ai-add/photo2.jpg',
  '/Ai-add/photo3.jpg',
  '/Ai-add/photo4.jpg',
  '/Ai-add/photo5.jpg',
]

export default function Hero({ onDiscover }) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const handleDiscover = (e) => {
    if (onDiscover) {
      e.preventDefault()
      onDiscover()
    }
  }

  return (
    <section
      style={{
        position: 'relative',
        minHeight: isMobile ? 'auto' : '100vh',
        background: '#ffcf01',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Nav */}
      <div
        style={{
          position: 'relative',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '1.25rem 5vw' : '2rem 4vw',
        }}
      >
        <p
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? '0.85rem' : '1rem',
            letterSpacing: '0.18em',
            color: '#FFFFFF',
          }}
        >
          ANNA KALEB
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ width: isMobile ? 22 : 28, height: 2, background: '#FFFFFF', borderRadius: 9999 }}
            />
          ))}
        </div>
      </div>

      {/* Hero composition */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          padding: isMobile ? '1.5rem 5vw 0' : '2rem 4vw 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* 3D Star — puffer fish: floats absolute on desktop, inline below text on mobile */}
        <div
          style={
            isMobile
              ? {
                  position: 'relative',
                  width: '85vw',
                  height: '70vw',
                  margin: '1.5rem auto 0',
                  order: 2,
                  zIndex: 1,
                  pointerEvents: 'none',
                }
              : {
                  position: 'absolute',
                  right: isTablet ? '2vw' : '6vw',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isTablet ? 'min(60vw, 600px)' : 'min(70vw, 880px)',
                  height: isTablet ? 'min(60vw, 600px)' : 'min(70vw, 880px)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }
          }
        >
          <Suspense fallback={null}>
            <PufferFish />
          </Suspense>
        </div>

        {/* Foreground text — sits above the puffer */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: isMobile ? '100%' : '70vw',
            order: isMobile ? 1 : 'unset',
          }}
        >

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: isMobile ? '0.65rem' : '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: isMobile ? '1rem' : '1.5rem',
          }}
        >
          AI ADD · creative automation studio
        </motion.p>

        {/* Display title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: isMobile ? 'clamp(3.2rem, 17vw, 6rem)' : 'clamp(5rem, 14vw, 14rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          The art<br />
          of creating
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: isMobile ? '100%' : 460,
            marginTop: isMobile ? '1.25rem' : '2rem',
          }}
        >
          Complete AI creative systems, from hyper realistic visuals to intelligent acquisition pipelines for trading brands.
        </motion.p>

        {/* Pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: isMobile ? '1.5rem' : '2.25rem',
            flexWrap: 'wrap',
          }}
        >
          <a href="#discover" onClick={handleDiscover} className="btn-pill btn-pill-dark">Discover the work</a>
          <a href="#discover" onClick={handleDiscover} className="btn-pill btn-pill-light">See agentic AI</a>
        </motion.div>

        {/* Maker tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginTop: isMobile ? '1.5rem' : '2rem',
          }}
        >
          made by Nael Sidali
        </motion.p>

        </div>
        {/* /foreground text */}

        {/* Decorative side label — hidden on mobile/tablet */}
        {!isTablet && (
          <p
            style={{
              position: 'absolute',
              right: '2vw',
              top: '40%',
              transform: 'rotate(90deg)',
              transformOrigin: 'right top',
              zIndex: 3,
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.4em',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            ↑ scroll · est. 2025
          </p>
        )}
      </div>

      {/* Timeline of photos at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className={isMobile ? 'no-scrollbar' : ''}
        style={{
          position: 'relative',
          padding: isMobile ? '2rem 5vw 2rem' : '3rem 4vw 2.5rem',
          display: 'flex',
          alignItems: 'flex-end',
          gap: isMobile ? '0.85rem' : '1.25rem',
          overflowX: isMobile ? 'auto' : 'hidden',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {timelinePhotos.map((src, i) => {
          const sizes = isMobile ? [110, 90, 130, 100, 120] : [180, 140, 220, 160, 200]
          const rotations = [-3, 2, -1.5, 3, -2]
          const offsets = isMobile ? [0, 8, -4, 10, -2] : [0, 18, -10, 22, -6]
          return (
            <motion.div
              key={src}
              whileHover={{ rotate: 0, scale: 1.04 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flexShrink: 0,
                width: sizes[i],
                height: sizes[i] * 1.25,
                borderRadius: 8,
                overflow: 'hidden',
                transform: `rotate(${rotations[i]}deg) translateY(${offsets[i]}px)`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </motion.div>
          )
        })}

        {/* Caption — desktop only */}
        {!isMobile && (
          <p
            style={{
              marginLeft: 'auto',
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              whiteSpace: 'nowrap',
              alignSelf: 'flex-end',
              paddingBottom: '0.5rem',
            }}
          >
            a recent timeline ↗
          </p>
        )}
      </motion.div>
    </section>
  )
}
