import { motion } from 'framer-motion'
import { useMemo } from 'react'

const sr = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function genTree(ox, oy, angle, len, depth) {
  const lines = []
  ;(function branch(x, y, a, l, d) {
    if (d === 0 || l < 5) return
    const ex = x + Math.cos(a) * l
    const ey = y + Math.sin(a) * l
    lines.push([x, y, ex, ey])
    branch(ex, ey, a - 0.48, l * 0.63, d - 1)
    branch(ex, ey, a + 0.48, l * 0.63, d - 1)
  })(ox, oy, angle, len, depth)
  return lines
}

export default function ParticleBackground({ color = '#FF8C42', colorAlt = '#E8497A' }) {
  const uid = useMemo(() => Math.random().toString(36).slice(2, 8), [])

  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      x: sr(i * 3 + 1) * 94 + 3,
      y: sr(i * 3 + 2) * 94 + 3,
      size: sr(i * 3 + 3) * 2.5 + 1.2,
      dur: 3.5 + sr(i * 2 + 7) * 4.5,
      delay: sr(i * 5 + 3) * 6,
      col: [color, colorAlt, '#FFB347'][i % 3],
    })), [color, colorAlt])

  const drifters = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      x1: sr(i * 5 + 1) * 82 + 5,
      y1: sr(i * 5 + 2) * 82 + 5,
      x2: sr(i * 5 + 3) * 82 + 5,
      y2: sr(i * 5 + 4) * 82 + 5,
      dur: 12 + sr(i * 3 + 9) * 15,
      delay: sr(i * 7 + 1) * 7,
      col: i % 2 === 0 ? color : colorAlt,
      size: sr(i * 11 + 5) * 1.5 + 1.8,
    })), [color, colorAlt])

  const trees = useMemo(() => [
    { lines: genTree(-20, 900, -Math.PI / 3, 200, 4),          col: color    },
    { lines: genTree(1220, 900, -(Math.PI * 2 / 3), 200, 4),   col: colorAlt },
    { lines: genTree(1220, -20, Math.PI * 5 / 6, 160, 3),      col: color    },
  ], [color, colorAlt])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', pointerEvents: 'none' }}>

      {/* Arborescences lumineuses */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={`glow-${uid}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {trees.map((tree, ti) =>
          tree.lines.map(([x1, y1, x2, y2], li) => (
            <motion.path
              key={`al-${ti}-${li}`}
              d={`M ${x1} ${y1} L ${x2} ${y2}`}
              fill="none"
              stroke={tree.col}
              strokeWidth={0.6}
              strokeLinecap="round"
              filter={`url(#glow-${uid})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0.28] }}
              transition={{
                pathLength: { duration: 1.8, delay: ti * 1 + li * 0.045, ease: 'easeOut' },
                opacity:    { duration: 2.5, delay: ti * 1 + li * 0.045 },
              }}
            />
          ))
        )}
      </svg>

      {/* Points scintillants */}
      {particles.map((p, i) => (
        <motion.div
          key={`pt-${i}`}
          animate={{ opacity: [0, 0.85, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.col,
            boxShadow: `0 0 ${p.size * 4}px ${p.size * 1.5}px ${p.col}80`,
          }}
        />
      ))}

      {/* Points dérivants */}
      {drifters.map((d, i) => (
        <motion.div
          key={`dr-${i}`}
          animate={{
            left:    [`${d.x1}%`, `${d.x2}%`, `${d.x1}%`],
            top:     [`${d.y1}%`, `${d.y2}%`, `${d.y1}%`],
            opacity: [0, 0.65, 0.65, 0],
          }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: d.col,
            boxShadow: `0 0 10px 4px ${d.col}60`,
          }}
        />
      ))}
    </div>
  )
}
