import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

import Process from '../sections/Process'
import Photo from '../sections/Photo'
import VideoStatic from '../sections/VideoStatic'
import AnimatedVideo from '../sections/AnimatedVideo'
import CinematicVideo from '../sections/CinematicVideo'
import KPI from '../sections/KPI'
import AgenticAI from '../sections/AgenticAI'

const PufferFish = lazy(() => import('./PufferFish'))

const SECTIONS = [
  { id: 'process',        title: 'Process'        },
  { id: 'photo',          title: 'Photo'          },
  { id: 'video-static',   title: 'Video Static'   },
  { id: 'animated-video', title: 'Animated'       },
  { id: 'cinematic',      title: 'Cinematic'      },
  { id: 'kpi',            title: 'KPI'            },
  { id: 'agentic',        title: 'Agentic AI'     },
]

export default function DiscoverOrbit({ onBack }) {
  const isMobile = useIsMobile()
  const [activeIdx, setActiveIdx] = useState(0)
  const [fishRotation, setFishRotation] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const compute = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      // Half a turn per section transition feels natural and matches the orbit metaphor
      setFishRotation(-progress * Math.PI * (SECTIONS.length - 1))

      const targetY = window.scrollY + window.innerHeight / 2
      let bestIdx = 0
      let bestDist = Infinity
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const center = window.scrollY + rect.top + rect.height / 2
        const dist = Math.abs(center - targetY)
        if (dist < bestDist) { bestDist = dist; bestIdx = i }
      })
      setActiveIdx(bestIdx)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Land at the top of the section when arriving on the page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goToSection = (i) => {
    document.getElementById(SECTIONS[i].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const fishSize = isMobile ? 'min(70vw, 260px)' : 'min(34vw, 320px)'

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

      {/* All seven sections — full original content */}
      <Process />
      <Photo />
      <VideoStatic />
      <AnimatedVideo />
      <CinematicVideo />
      <KPI />
      <AgenticAI />

      {/* Vertical section dots — right side, doesn't overlap the fish */}
      <div
        style={{
          position: 'fixed',
          right: isMobile ? '0.6rem' : '1.2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 95,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '12px 8px',
          borderRadius: 9999,
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSection(i)}
            aria-label={s.title}
            style={{
              width: 8,
              height: i === activeIdx ? 22 : 8,
              borderRadius: 9999,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === activeIdx ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ))}
      </div>

      {/* Puffer fish — fixed at bottom-center, only top half visible, spins as you scroll */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 0,
          width: fishSize,
          height: fishSize,
          transform: 'translate(-50%, 50%)',
          zIndex: 90,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 -10px 30px rgba(0,0,0,0.25))',
        }}
      >
        <Suspense fallback={null}>
          <PufferFish rotationX={fishRotation} />
        </Suspense>
      </motion.div>
    </div>
  )
}
