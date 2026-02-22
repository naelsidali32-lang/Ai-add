import { motion } from 'framer-motion'

const nodes = [
  {
    id: 'query',
    label: 'Query',
    icon: '👤',
    x: 60, y: 240,
    small: true,
  },
  {
    id: 'automated',
    label: 'Automated',
    sub: ['Photo', 'Video Static', 'Animated Video'],
    x: 180, y: 80,
    w: 175, h: 120,
  },
  {
    id: 'hands',
    label: 'Hands Build',
    sub: ['Cinematic Video', 'URL Strategy'],
    x: 180, y: 340,
    w: 175, h: 105,
  },
  {
    id: 'montage',
    label: 'Montage',
    sub: [],
    x: 440, y: 345,
    w: 130, h: 60,
  },
  {
    id: 'add',
    label: 'ADD',
    sub: ['Meta', 'TikTok', 'X'],
    x: 440, y: 120,
    w: 130, h: 110,
  },
  {
    id: 'platform',
    label: 'Platform',
    sub: ['Discord', 'Telegram', 'Signal'],
    x: 660, y: 120,
    w: 145, h: 110,
  },
  {
    id: 'dashboard',
    label: 'Dashboard KPI',
    sub: ['Clicks', 'Likes', 'CTR', 'Video Views', 'Shares'],
    x: 880, y: 100,
    w: 160, h: 130,
  },
]

const paths = [
  { points: [{x:92,y:255}, {x:180,y:255}, {x:180,y:135}],                                      delay: 0.2  },
  { points: [{x:92,y:270}, {x:140,y:270}, {x:140,y:375}, {x:180,y:375}],                       delay: 0.4  },
  { points: [{x:355,y:135}, {x:395,y:135}, {x:395,y:175}, {x:440,y:175}],                      delay: 0.6  },
  { points: [{x:355,y:385}, {x:440,y:385}, {x:440,y:370}],                                     delay: 0.7  },
  { points: [{x:505,y:345}, {x:505,y:230}],                                                    delay: 0.85 },
  { points: [{x:570,y:175}, {x:660,y:175}],                                                    delay: 1.0  },
  { points: [{x:805,y:175}, {x:880,y:175}, {x:880,y:165}],                                    delay: 1.15 },
  { points: [{x:1040,y:120}, {x:1060,y:120}, {x:1060,y:50}, {x:270,y:50}, {x:270,y:80}],     delay: 1.3  },
]

function pointsToD(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

function FluxPath({ points, delay, index }) {
  const pathD = pointsToD(points)
  const lastP = points[points.length - 1]
  const prevP = points[points.length - 2]
  const dx = lastP.x - prevP.x
  const dy = lastP.y - prevP.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = dx / len
  const ny = dy / len
  const a = 8

  return (
    <g>
      <defs>
        <linearGradient id={`g${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF8C42" stopOpacity="1" />
          <stop offset="100%" stopColor="#E8497A" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Halo */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#FF8C42"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.12"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay }}
      />

      {/* Ligne principale */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#FF8C42"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay }}
      />

      {/* Flèche */}
      <motion.polygon
        points={`
          ${lastP.x},${lastP.y}
          ${lastP.x - nx*a - ny*a*0.5},${lastP.y - ny*a + nx*a*0.5}
          ${lastP.x - nx*a + ny*a*0.5},${lastP.y - ny*a - nx*a*0.5}
        `}
        fill="#E8497A"
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
          background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem',
          boxShadow: '0 0 30px rgba(255,140,66,0.7), 0 0 60px rgba(255,140,66,0.3)',
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
        background: 'linear-gradient(135deg, rgba(255,140,66,0.18), rgba(255,180,80,0.28))',
        border: '1px solid rgba(255,140,66,0.5)',
        borderRadius: 16,
        padding: '14px 18px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.07), 0 0 18px rgba(255,140,66,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
          pointerEvents: 'none',
        }}
      />
      <p style={{
        fontFamily: "'League Spartan', sans-serif",
        fontWeight: 800, fontSize: '0.95rem',
        color: '#FF6B1A',
        marginBottom: node.sub.length ? 7 : 0,
      }}>
        {node.label}
      </p>
      {node.sub.map((s, i) => (
        <p key={i} style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.78rem', fontWeight: 700,
          color: '#3A3A3A', lineHeight: 1.7,
        }}>
          {s}
        </p>
      ))}
    </motion.div>
  )
}

export default function Process() {
  return (
    <section
      id="process"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 4vw',
        overflow: 'hidden',
        background: 'white',
      }}
    >
      {/* Quadrillage */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(180,180,180,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,180,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Dégradé coucher de soleil coin droit */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 70% at 100% 100%, rgba(255,140,66,0.18) 0%, rgba(232,73,122,0.12) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative', zIndex: 2,
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#0A0A0A',
        }}
      >
        Process for{' '}
        <span style={{
          background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          AI Media
        </span>
      </motion.h2>

      {/* Infographie */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1150, height: 540 }}>

        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 1 }}
          viewBox="0 0 1150 540"
          preserveAspectRatio="xMidYMid meet"
        >
          {paths.map((p, i) => (
            <FluxPath key={i} index={i} points={p.points} delay={p.delay} />
          ))}
        </svg>

        {nodes.map((node, i) => (
          <GlowNode key={node.id} node={node} delay={0.1 + i * 0.1} />
        ))}

        {/* Label loop */}
        {/* Label loop */}
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
            letterSpacing: '0.12em', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            whiteSpace: 'nowrap',
          }}
        >
          Best performance ads are automatically rebuilt, forming a continuous loop.
        </motion.div>
      </div>

      {/* 7 boutons services */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.75rem',
          marginTop: '3rem',
        }}
      >
        {[
          { label: 'Photo',           href: '#photo'          },
          { label: 'Video Static',    href: '#video-static'   },
          { label: 'Animated Video',  href: '#animated-video' },
          { label: 'Cinematic Video', href: '#cinematic'      },
          { label: 'IRL',             href: '#irl'            },
          { label: 'KPI',             href: '#kpi'            },
          { label: 'Agentic AI',      href: '#agentic'        },
        ].map((btn, i) => (
          <motion.a
            key={btn.label}
            href={btn.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255,140,66,0.5), 0 12px 40px rgba(255,140,66,0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '1.75rem',
              paddingRight: '1.75rem',
              height: 48,
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #FF8C42 0%, #FFB347 50%, #E8497A 100%)',
              boxShadow: '0 4px 20px rgba(255,140,66,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'white',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {btn.label}
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}