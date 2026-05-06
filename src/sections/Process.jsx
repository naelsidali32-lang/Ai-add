import { motion } from 'framer-motion'
import { useIsMobile, useIsTablet } from '../hooks/useMedia'

const nodes = [
  { id: 'query',     label: 'Query',         icon: '👤', x: 60,  y: 240, small: true },
  { id: 'automated', label: 'Automated',     sub: ['Photo', 'Video Static', 'Animated Video'], x: 180, y: 80,  w: 175, h: 120 },
  { id: 'hands',     label: 'Hands Build',   sub: ['Cinematic Video', 'URL Strategy'],         x: 180, y: 340, w: 175, h: 105 },
  { id: 'montage',   label: 'Montage',       sub: [], x: 440, y: 345, w: 130, h: 60 },
  { id: 'add',       label: 'ADD',           sub: ['Meta', 'TikTok', 'X'],          x: 440, y: 120, w: 130, h: 110 },
  { id: 'platform',  label: 'Platform',      sub: ['Discord', 'Telegram', 'Signal'],x: 660, y: 120, w: 145, h: 110 },
  { id: 'dashboard', label: 'Dashboard KPI', sub: ['Clicks', 'Likes', 'CTR', 'Video Views', 'Shares'], x: 880, y: 100, w: 160, h: 130 },
]

const paths = [
  { points: [{x:92,y:255}, {x:180,y:255}, {x:180,y:135}],                                  delay: 0.2  },
  { points: [{x:92,y:270}, {x:140,y:270}, {x:140,y:375}, {x:180,y:375}],                   delay: 0.4  },
  { points: [{x:355,y:135}, {x:395,y:135}, {x:395,y:175}, {x:440,y:175}],                  delay: 0.6  },
  { points: [{x:355,y:385}, {x:440,y:385}, {x:440,y:370}],                                 delay: 0.7  },
  { points: [{x:505,y:345}, {x:505,y:230}],                                                delay: 0.85 },
  { points: [{x:570,y:175}, {x:660,y:175}],                                                delay: 1.0  },
  { points: [{x:805,y:175}, {x:880,y:175}, {x:880,y:165}],                                 delay: 1.15 },
  { points: [{x:1040,y:120}, {x:1060,y:120}, {x:1060,y:50}, {x:270,y:50}, {x:270,y:80}],   delay: 1.3  },
]

function pointsToD(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

function FluxPath({ points, delay }) {
  const pathD = pointsToD(points)
  const lastP = points[points.length - 1]
  const prevP = points[points.length - 2]
  const dx = lastP.x - prevP.x, dy = lastP.y - prevP.y
  const len = Math.sqrt(dx*dx + dy*dy)
  const nx = dx / len, ny = dy / len
  const a = 8

  return (
    <g>
      <motion.path
        d={pathD}
        fill="none"
        stroke="#F5C518"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay }}
      />
      <motion.polygon
        points={`
          ${lastP.x},${lastP.y}
          ${lastP.x - nx*a - ny*a*0.5},${lastP.y - ny*a + nx*a*0.5}
          ${lastP.x - nx*a + ny*a*0.5},${lastP.y - ny*a - nx*a*0.5}
        `}
        fill="#FF00BB"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.9 }}
      />
    </g>
  )
}

function GlowNode({ node, delay }) {
  if (node.small) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        style={{
          position: 'absolute',
          left: node.x, top: node.y,
          width: 64, height: 64,
          borderRadius: '50%',
          background: '#F5C518',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem',
          zIndex: 10,
        }}
      >
        {node.icon}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04, zIndex: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.2, 0.64, 1] }}
      style={{
        position: 'absolute',
        left: node.x, top: node.y,
        width: node.w,
        zIndex: 10,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 16,
        padding: '14px 18px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <p style={{
        fontFamily: "'League Spartan', sans-serif",
        fontWeight: 800, fontSize: '0.95rem',
        color: '#F5C518',
        marginBottom: node.sub.length ? 7 : 0,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>
        {node.label}
      </p>
      {node.sub.map((s, i) => (
        <p key={i} style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: '0.78rem', fontWeight: 700,
          color: 'rgba(255,255,255,0.85)', lineHeight: 1.7,
        }}>
          {s}
        </p>
      ))}
    </motion.div>
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
    { label: 'Dashboard KPI', sub: ['Clicks', 'Likes', 'CTR', 'Video Views', 'Shares'] },
  ]
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {steps.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 14,
            padding: '14px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: s.sub.length ? 6 : 0 }}>
            <span style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.65rem', fontWeight: 800, color: '#FF00BB',
              background: '#F5C518', padding: '2px 8px', borderRadius: 9999,
              letterSpacing: '0.1em',
            }}>
              0{i + 1}
            </span>
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontWeight: 800, fontSize: '0.95rem', color: '#F5C518',
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>
              {s.label}
            </p>
          </div>
          {s.sub.map((sub, j) => (
            <p key={j} style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: '0.78rem', fontWeight: 700,
              color: 'rgba(255,255,255,0.85)', lineHeight: 1.6,
              paddingLeft: 4,
            }}>
              · {sub}
            </p>
          ))}
        </motion.div>
      ))}
      <p style={{
        marginTop: '0.5rem',
        fontFamily: "'League Spartan', sans-serif",
        fontSize: '0.62rem', fontWeight: 600,
        color: '#F5C518', textTransform: 'uppercase',
        letterSpacing: '0.18em', textAlign: 'center',
      }}>
        ↻ continuous loop
      </p>
    </div>
  )
}

export default function Process() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  return (
    <section
      id="process"
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '4rem 5vw' : '6rem 4vw',
        overflow: 'hidden',
        background: '#FF00BB',
      }}
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '1.5rem',
          alignSelf: 'flex-start',
          paddingLeft: isMobile ? 0 : '2vw',
        }}
      >
        01 / process
      </motion.p>

      {/* Massive title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 'clamp(3rem, 9vw, 8rem)',
          fontWeight: 900,
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          color: '#FFFFFF',
          marginBottom: isMobile ? '2rem' : '3.5rem',
          alignSelf: 'flex-start',
          paddingLeft: isMobile ? 0 : '2vw',
          maxWidth: '90%',
        }}
      >
        A loop that<br />
        never sleeps.
      </motion.h2>

      {/* Infographie */}
      {isMobile ? (
        <MobileFlow />
      ) : (
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: 1150,
            height: isTablet ? 'auto' : 540,
            aspectRatio: isTablet ? '1150 / 540' : 'auto',
          }}
        >
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 1 }}
            viewBox="0 0 1150 540"
            preserveAspectRatio="xMidYMid meet"
          >
            {paths.map((p, i) => (
              <FluxPath key={i} points={p.points} delay={p.delay} />
            ))}
          </svg>

          <ScalingLayer>
            {nodes.map((node, i) => (
              <GlowNode key={node.id} node={node} delay={0.1 + i * 0.1} />
            ))}
          </ScalingLayer>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
            style={{
              position: 'absolute', top: 8, left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.65rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#F5C518',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              maxWidth: '95%',
            }}
          >
            best performance ads are automatically rebuilt in a continuous loop
          </motion.div>
        </div>
      )}

      {/* Pill nav */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.6rem',
          marginTop: isMobile ? '2.5rem' : '3rem',
        }}
      >
        {[
          { label: 'Photo',           href: '#photo'          },
          { label: 'Video Static',    href: '#video-static'   },
          { label: 'Animated Video',  href: '#animated-video' },
          { label: 'Cinematic Video', href: '#cinematic'      },
          { label: 'KPI',             href: '#kpi'            },
          { label: 'Agentic AI',      href: '#agentic'        },
        ].map((btn, i) => (
          <motion.a
            key={btn.label}
            href={btn.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
            className="btn-pill btn-pill-light"
          >
            {btn.label}
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}

// Wrapper that scales the absolute-positioned children to fit the parent width.
// The original infographic is laid out for a 1150x540 box. On smaller laptops we
// scale it uniformly so it never overflows.
function ScalingLayer({ children }) {
  return (
    <div
      ref={(el) => {
        if (!el) return
        const parent = el.parentElement
        if (!parent) return
        const fit = () => {
          const w = parent.clientWidth
          const scale = Math.min(1, w / 1150)
          el.style.transform = `scale(${scale})`
          el.style.width = '1150px'
        }
        fit()
        const ro = new ResizeObserver(fit)
        ro.observe(parent)
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 540,
        transformOrigin: 'top left',
      }}
    >
      {children}
    </div>
  )
}
