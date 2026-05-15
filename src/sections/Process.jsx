import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useMedia'

const PufferFish = lazy(() => import('../components/PufferFish'))

const STEPS = [
  { id: 'query',     label: 'Query',         sub: ['User input'] },
  { id: 'automated', label: 'Automated',     sub: ['Photo', 'Video Static', 'Animated Video'] },
  { id: 'hands',     label: 'Hands Build',   sub: ['Cinematic Video', 'URL Strategy'] },
  { id: 'montage',   label: 'Montage',       sub: ['Edit & Assemble'] },
  { id: 'add',       label: 'ADD',           sub: ['Meta', 'TikTok', 'X'] },
  { id: 'platform',  label: 'Platform',      sub: ['Discord', 'Telegram', 'Signal'] },
  { id: 'dashboard', label: 'Dashboard KPI', sub: ['Clicks', 'CTR', 'Likes', 'Shares'] },
]

const PW = 200
const PH = 210
const HALF_W = PW / 2
const HALF_H = PH / 2

// 2D layout following the schema: middle row [Query, ADD, Platform, Dashboard KPI],
// top row [Automated], bottom row [Hands Build, Montage]. Coordinates are panel
// CENTERS in strip-local pixels.
const POSITIONS = [
  { x: 0,    y: 0    }, // 0 Query
  { x: 375,  y: -115 }, // 1 Automated (top)
  { x: 375,  y: +115 }, // 2 Hands Build (bottom)
  { x: 600,  y: +115 }, // 3 Montage (bottom)
  { x: 825,  y: 0    }, // 4 ADD
  { x: 1050, y: 0    }, // 5 Platform
  { x: 1275, y: 0    }, // 6 Dashboard KPI
]

const FULL_WIDTH = POSITIONS[POSITIONS.length - 1].x - POSITIONS[0].x + PW
const GEO_CENTER = {
  x: (POSITIONS[0].x + POSITIONS[POSITIONS.length - 1].x) / 2,
  y: 0,
}

// Orthogonal connection paths in strip-local coordinates. Index k connects panel k → k+1.
function rightEdge(i) { return [POSITIONS[i].x + HALF_W, POSITIONS[i].y] }
function leftEdge(i)  { return [POSITIONS[i].x - HALF_W, POSITIONS[i].y] }
function topEdge(i)   { return [POSITIONS[i].x, POSITIONS[i].y - HALF_H] }
function bottomEdge(i){ return [POSITIONS[i].x, POSITIONS[i].y + HALF_H] }

function buildConnections() {
  const paths = []
  // Fork x-position between Query.right and Automated/HB.left
  const Q_R = rightEdge(0)
  const A_L = leftEdge(1)
  const HB_L = leftEdge(2)
  const FORK_X = (Q_R[0] + A_L[0]) / 2

  // 0: Query → Automated (branch up from fork)
  paths.push(`M ${Q_R[0]} ${Q_R[1]} L ${FORK_X} ${Q_R[1]} L ${FORK_X} ${POSITIONS[1].y} L ${A_L[0]} ${POSITIONS[1].y}`)
  // 1: Query → Hands Build (branch down from fork — same start, opposite vertical)
  paths.push(`M ${Q_R[0]} ${Q_R[1]} L ${FORK_X} ${Q_R[1]} L ${FORK_X} ${POSITIONS[2].y} L ${HB_L[0]} ${POSITIONS[2].y}`)
  // 2: Hands Build → Montage (straight right)
  {
    const [sx, sy] = rightEdge(2)
    const [ex, ey] = leftEdge(3)
    paths.push(`M ${sx} ${sy} L ${ex} ${ey}`)
  }
  // 3: Montage → ADD (up to mid row, then right)
  {
    const [sx, sy] = topEdge(3)
    const [ex] = leftEdge(4)
    paths.push(`M ${sx} ${sy} L ${sx} 0 L ${ex} 0`)
  }
  // 4: Automated → ADD (down to mid row, then right — DIRECT, skipping HB & Montage)
  {
    const [sx, sy] = bottomEdge(1)
    const [ex] = leftEdge(4)
    paths.push(`M ${sx} ${sy} L ${sx} 0 L ${ex} 0`)
  }
  // 5: ADD → Platform (straight right)
  {
    const [sx, sy] = rightEdge(4)
    const [ex, ey] = leftEdge(5)
    paths.push(`M ${sx} ${sy} L ${ex} ${ey}`)
  }
  // 6: Platform → Dashboard KPI (straight right)
  {
    const [sx, sy] = rightEdge(5)
    const [ex, ey] = leftEdge(6)
    paths.push(`M ${sx} ${sy} L ${ex} ${ey}`)
  }
  return paths
}
const CONNECTIONS = buildConnections()

// Each connection appears as the head crosses a panel reveal threshold.
const CONNECTION_REVEALS = [
  { start: 0, end: 1 }, // Q → A
  { start: 1, end: 2 }, // Q → HB (delayed branch — appears with HB)
  { start: 2, end: 3 }, // HB → M
  { start: 3, end: 4 }, // M → ADD
  { start: 3, end: 4 }, // A → ADD (merges with M→ADD)
  { start: 4, end: 5 }, // ADD → Platform
  { start: 5, end: 6 }, // Platform → DK
]

const REVEAL_START = 0.06
const REVEAL_END = 0.68
const PHASE2_END = 0.92

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const lerp = (a, b, t) => a + (b - a) * t
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

function getHead(p) {
  if (p <= REVEAL_START) return -0.6
  if (p >= REVEAL_END) return STEPS.length - 1
  return ((p - REVEAL_START) / (REVEAL_END - REVEAL_START)) * (STEPS.length - 1)
}

function getTransitionT(p) {
  if (p <= REVEAL_END) return 0
  if (p >= PHASE2_END) return 1
  return easeOut((p - REVEAL_END) / (PHASE2_END - REVEAL_END))
}

function getTargetScale(vw) {
  return clamp((vw - 100) / FULL_WIDTH, 0.4, 1)
}

function getStripScale(p, vw) {
  return lerp(1, getTargetScale(vw), getTransitionT(p))
}

function getStripCenter(p) {
  const head = Math.max(0, getHead(p))
  const i = Math.min(STEPS.length - 1, Math.floor(head))
  const j = Math.min(STEPS.length - 1, i + 1)
  const f = head - i
  let cx = lerp(POSITIONS[i].x, POSITIONS[j].x, f)
  let cy = lerp(POSITIONS[i].y, POSITIONS[j].y, f)
  const t = getTransitionT(p)
  if (t > 0) {
    cx = lerp(cx, GEO_CENTER.x, t)
    cy = lerp(cy, GEO_CENTER.y, t)
  }
  return { x: cx, y: cy }
}

function getStripX(p, vw) {
  return -getStripCenter(p).x * getStripScale(p, vw)
}

function getStripY(p, vw) {
  return -getStripCenter(p).y * getStripScale(p, vw)
}

function getPanelOpacity(p, index) {
  const head = getHead(p)
  return clamp((head - (index - 0.5)) * 2, 0, 1)
}

function getPanelInnerScale(p, index) {
  const head = getHead(p)
  return 0.7 + 0.3 * clamp((head - (index - 0.5)) * 2, 0, 1)
}

function getConnectionLength(p, index) {
  const head = getHead(p)
  const { start, end } = CONNECTION_REVEALS[index]
  return clamp((head - start) / (end - start), 0, 1)
}

function getGaugeProgress(p) {
  return clamp(p, 0, 1)
}

function getLoopOpacity(p) {
  return clamp((p - PHASE2_END) / (1 - PHASE2_END), 0, 1)
}

function SectionHeader({ isMobile }) {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          marginBottom: '1.25rem',
        }}
      >
        01 / process
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: isMobile ? 'clamp(3rem, 12vw, 5rem)' : 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 900,
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          color: '#FFFFFF',
          marginBottom: 0,
          maxWidth: '90%',
        }}
      >
        A loop that<br />
        never sleeps.
      </motion.h2>
    </>
  )
}

function Panel({ step, index, progress }) {
  const opacity = useTransform(progress, p => getPanelOpacity(p, index))
  const innerScale = useTransform(progress, p => getPanelInnerScale(p, index))

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: -PW / 2, top: -PH / 2,
        x: POSITIONS[index].x,
        y: POSITIONS[index].y,
        width: PW, height: PH,
        opacity,
        scale: innerScale,
        background: '#FFFFFF',
        backgroundImage:
          'radial-gradient(circle at 12% 8%, rgba(255, 120, 210, 0.22) 0%, transparent 42%),' +
          'radial-gradient(circle at 92% 95%, rgba(255, 0, 187, 0.14) 0%, transparent 45%)',
        border: '1px solid rgba(255, 0, 187, 0.18)',
        borderRadius: 18,
        padding: '22px 22px',
        boxShadow:
          '0 18px 50px rgba(255, 0, 187, 0.22),' +
          'inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        fontFamily: "'League Spartan', sans-serif",
        fontWeight: 700,
        fontSize: '0.62rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255, 0, 187, 0.7)',
        marginBottom: 10,
      }}>
        Step {String(index + 1).padStart(2, '0')}
      </div>
      <div style={{
        fontFamily: "'League Spartan', sans-serif",
        fontWeight: 800,
        fontSize: '1.6rem',
        lineHeight: 1,
        color: '#0A0A0A',
        marginBottom: 14,
        letterSpacing: '-0.01em',
      }}>
        {step.label}
      </div>
      <div style={{ width: 36, height: 1, background: 'rgba(255, 0, 187, 0.4)', marginBottom: 14 }} />
      {step.sub.map((s, i) => (
        <div key={i} style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          lineHeight: 1.65,
          color: 'rgba(0, 0, 0, 0.72)',
        }}>
          {s}
        </div>
      ))}
    </motion.div>
  )
}

function Connection({ index, progress }) {
  const length = useTransform(progress, p => getConnectionLength(p, index))
  return (
    <motion.path
      d={CONNECTIONS[index]}
      fill="none"
      stroke="rgba(255,255,255,0.85)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength: length }}
    />
  )
}

function LoopArrow({ progress }) {
  const opacity = useTransform(progress, getLoopOpacity)
  const pathLength = useTransform(progress, getLoopOpacity)

  const [startX, startY] = topEdge(POSITIONS.length - 1)
  const [endX, endY] = topEdge(1)
  const peakY = Math.min(POSITIONS[1].y, POSITIONS[POSITIONS.length - 1].y) - HALF_H - 70

  const pathD = `M ${startX} ${startY} L ${startX} ${peakY} L ${endX} ${peakY} L ${endX} ${endY}`

  const labelX = (startX + endX) / 2
  const labelY = peakY - 22

  return (
    <motion.g style={{ opacity }}>
      <motion.path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 5"
        style={{ pathLength }}
      />
      <motion.polygon
        points={`${endX},${endY} ${endX - 7},${endY - 14} ${endX + 7},${endY - 14}`}
        fill="rgba(255,255,255,0.92)"
        style={{ opacity }}
      />
      <motion.text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fill: 'rgba(255,255,255,0.9)',
          opacity,
        }}
      >
        ↻ continuous loop
      </motion.text>
    </motion.g>
  )
}

function Stage({ progress, vw }) {
  const stripScale = useTransform(progress, p => getStripScale(p, vw))
  const stripX = useTransform(progress, p => getStripX(p, vw))
  const stripY = useTransform(progress, p => getStripY(p, vw))

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
      paddingTop: '4rem',
    }}>
      <motion.div style={{
        position: 'relative',
        width: 0, height: 0,
        x: stripX,
        y: stripY,
        scale: stripScale,
      }}>
        <svg
          viewBox="-200 -400 1800 800"
          overflow="visible"
          style={{
            position: 'absolute',
            left: -200, top: -400,
            width: 1800, height: 800,
            maxWidth: 'none',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          {CONNECTIONS.map((_, i) => (
            <Connection key={i} index={i} progress={progress} />
          ))}
          <LoopArrow progress={progress} />
        </svg>
        {STEPS.map((step, i) => (
          <Panel key={step.id} step={step} index={i} progress={progress} />
        ))}
      </motion.div>
    </div>
  )
}

function Gauge({ progress, sectionRef, direction }) {
  const fillWidth = useTransform(progress, p => `${getGaugeProgress(p) * 100}%`)
  const cursorLeft = useTransform(progress, p => `${getGaugeProgress(p) * 100}%`)
  const trackRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const updateFromPointer = (clientX) => {
    if (!trackRef.current || !sectionRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const t = clamp((clientX - rect.left) / rect.width, 0, 1)
    const section = sectionRef.current
    const range = section.offsetHeight - window.innerHeight
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: sectionTop + t * range, behavior: 'auto' })
  }

  const handlePointerDown = (e) => {
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromPointer(e.clientX)
  }
  const handlePointerMove = (e) => {
    if (!isDragging) return
    updateFromPointer(e.clientX)
  }
  const handlePointerUp = (e) => {
    setIsDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        width: '78%',
        maxWidth: 920,
        margin: '0 auto',
        position: 'relative',
        paddingTop: 25,
        paddingBottom: 30,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div ref={trackRef} style={{
        height: 14,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 9999,
        position: 'relative',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.10)',
      }}>
        <motion.div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: fillWidth,
          background: 'rgba(0,0,0,0.18)',
          borderRadius: 9999,
          pointerEvents: 'none',
        }} />
        <motion.div style={{
          position: 'absolute',
          left: cursorLeft,
          top: '50%',
          x: '-50%',
          y: '-50%',
          width: 110,
          height: 110,
          pointerEvents: 'none',
        }}>
          <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
            <PufferFish facing={direction} />
          </Suspense>
        </motion.div>
      </div>
    </div>
  )
}

function MobileFlow() {
  const steps = [
    { label: 'Query',         sub: ['User input'] },
    { label: 'Automated',     sub: ['Photo', 'Video Static', 'Animated Video'] },
    { label: 'Hands Build',   sub: ['Cinematic Video', 'URL Strategy'] },
    { label: 'Montage',       sub: ['Edit & assemble'] },
    { label: 'ADD',           sub: ['Meta', 'TikTok', 'X'] },
    { label: 'Platform',      sub: ['Discord', 'Telegram', 'Signal'] },
    { label: 'Dashboard KPI', sub: ['Clicks', 'Likes', 'CTR', 'Shares'] },
  ]
  return (
    <div
      className="no-scrollbar"
      style={{
        width: '100%',
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        gap: '0.6rem',
        padding: '0.4rem 5vw',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {steps.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          style={{
            flex: '0 0 62vw',
            scrollSnapAlign: 'center',
            background: '#FFFFFF',
            backgroundImage:
              'radial-gradient(circle at 8% 0%, rgba(255, 120, 210, 0.22) 0%, transparent 45%),' +
              'radial-gradient(circle at 100% 100%, rgba(255, 0, 187, 0.14) 0%, transparent 50%)',
            border: '1px solid rgba(255, 0, 187, 0.18)',
            borderRadius: 14,
            padding: '14px 16px',
            boxShadow:
              '0 10px 28px rgba(255, 0, 187, 0.22),' +
              'inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          }}
        >
          <p style={{
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 700, fontSize: '0.55rem', color: 'rgba(255, 0, 187, 0.7)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            Step {String(i + 1).padStart(2, '0')}
          </p>
          <p style={{
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 800, fontSize: '1.1rem', color: '#0A0A0A',
            letterSpacing: '-0.01em',
            marginBottom: 8,
          }}>
            {s.label}
          </p>
          <div style={{ width: 28, height: 1, background: 'rgba(255, 0, 187, 0.4)', marginBottom: 8 }} />
          {s.sub.map((sub, j) => (
            <p key={j} style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: '0.72rem', fontWeight: 700,
              color: 'rgba(0, 0, 0, 0.72)', lineHeight: 1.5,
            }}>
              · {sub}
            </p>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

function MobileVersion() {
  return (
    <section
      id="process"
      style={{
        position: 'relative',
        background: '#FF00BB',
        padding: '3.5rem 0 3rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '0 5vw' }}>
        <SectionHeader isMobile />
      </div>
      <div style={{ marginTop: '1.75rem' }}>
        <MobileFlow />
      </div>
      <p style={{
        marginTop: '1.25rem',
        fontFamily: "'League Spartan', sans-serif",
        fontSize: '0.6rem', fontWeight: 600,
        color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase',
        letterSpacing: '0.22em', textAlign: 'center',
      }}>
        ↻ swipe — continuous loop
      </p>
    </section>
  )
}

function DesktopVersion() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280)
  useEffect(() => {
    const handler = () => setVw(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const [direction, setDirection] = useState('right')
  const lastValueRef = useRef(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const delta = v - lastValueRef.current
    if (delta > 0.001) setDirection('right')
    else if (delta < -0.001) setDirection('left')
    lastValueRef.current = v
  })

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        position: 'relative',
        height: '380vh',
        background: '#FF00BB',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ flexShrink: 0, padding: '3rem 4vw 0' }}>
          <SectionHeader isMobile={false} />
        </div>

        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <Stage progress={scrollYProgress} vw={vw} />
        </div>

        <div style={{ flexShrink: 0 }}>
          <Gauge progress={scrollYProgress} sectionRef={sectionRef} direction={direction} />
        </div>
      </div>
    </section>
  )
}

export default function Process() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopVersion />
}
