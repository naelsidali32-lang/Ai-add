import { useEffect } from 'react'
import { useIsMobile } from '../hooks/useMedia'

import Process from '../sections/Process'
import Photo from '../sections/Photo'
import VideoStatic from '../sections/VideoStatic'
import AnimatedVideo from '../sections/AnimatedVideo'
import UGCVideo from '../sections/UGCVideo'
import CinematicVideo from '../sections/CinematicVideo'
import KPI from '../sections/KPI'
import AgenticAI from '../sections/AgenticAI'

export default function DiscoverOrbit({ onBack }) {
  const isMobile = useIsMobile()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ position: 'relative', background: '#0A0A0A' }}>
      {/* Top bar — fixed overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          padding: isMobile ? '1rem 5vw' : '1.4rem 4vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
        }}
      >
        <p
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? '0.85rem' : '1rem',
            letterSpacing: '0.18em',
            color: '#FFFFFF',
            textShadow: '0 2px 18px rgba(0,0,0,0.45)',
          }}
        >
          ANNA KALEB
        </p>
        <button
          onClick={onBack}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#FFFFFF',
            padding: '10px 22px',
            borderRadius: 9999,
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 700,
            fontSize: '0.78rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
      </div>

      {/* Solutions sections */}
      <Process />
      <Photo />
      <VideoStatic />
      <AnimatedVideo />
      <UGCVideo />
      <CinematicVideo />
      <KPI />
      <AgenticAI />

    </div>
  )
}
