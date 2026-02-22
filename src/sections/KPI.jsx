import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function AnimatedNumber({ target, suffix = '', prefix = '' }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])
  return <span>{prefix}{value.toLocaleString()}{suffix}</span>
}

function MiniLineChart({ color }) {
  const points = [20, 45, 30, 60, 40, 75, 55, 85, 65, 95]
  const w = 120, h = 50
  const max = Math.max(...points)
  const coords = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`)
  const path = `M ${coords.join(' L ')}`
  const fill = `M ${coords[0]} L ${coords.join(' L ')} L ${w},${h} L 0,${h} Z`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`fill-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={fill} fill={`url(#fill-${color.replace('#','')})`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      <motion.path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
    </svg>
  )
}

function DonutChart({ pct, color, label }) {
  const r = 28, circ = 2 * Math.PI * r
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={80} height={80} viewBox="0 0 80 80">
        <circle cx={40} cy={40} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={8} />
        <motion.circle cx={40} cy={40} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ transformOrigin: '40px 40px', transform: 'rotate(-90deg)' }}
        />
        <text x={40} y={44} textAnchor="middle"
          style={{ fontFamily: 'League Spartan', fontSize: 12, fontWeight: 800, fill: '#0A0A0A' }}>
          {pct}%
        </text>
      </svg>
      <p style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '0.6rem', fontWeight: 600,
        color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </p>
    </div>
  )
}

function BarChart() {
  const bars = [
    { label: 'Mon', v: 65, c: '#FF8C42' },
    { label: 'Tue', v: 82, c: '#FF8C42' },
    { label: 'Wed', v: 48, c: '#FFB347' },
    { label: 'Thu', v: 91, c: '#E8497A' },
    { label: 'Fri', v: 73, c: '#FF8C42' },
    { label: 'Sat', v: 55, c: '#FFB347' },
    { label: 'Sun', v: 88, c: '#E8497A' },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
      {bars.map((b, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <motion.div
            initial={{ height: 0 }} animate={{ height: `${b.v * 0.55}px` }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
            style={{ width: 14, background: b.c, borderRadius: 3 }}
          />
          <p style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '0.5rem',
            color: '#9A9A9A', fontWeight: 600 }}>{b.label}</p>
        </div>
      ))}
    </div>
  )
}

const features = [
  {
    title: 'Full Performance Dashboard',
    desc: 'Every video tracked in real time — views, CTR, watch time, engagement rate and conversion data centralized in one clean interface.',
    icon: '📊',
  },
  {
    title: 'Tracked Link Intelligence',
    desc: 'Each ad uses a unique tracked link. Know exactly what the user does after clicking — which platform they joined, which step they completed.',
    icon: '🔗',
  },
  {
    title: 'Telegram & Channel Tracking',
    desc: 'Monitor post-click behavior on Telegram, Discord and Signal — join rate, message engagement and drop-off points all measured.',
    icon: '📡',
  },
  {
    title: 'Virtual Client Profiling',
    desc: 'Build a virtual profile for each lead — traffic source, device, behavior patterns, content preferences and conversion likelihood score.',
    icon: '👤',
  },
  {
    title: 'Best Performer Detection',
    desc: 'The system automatically identifies which creatives drive the most qualified leads — feeding the rebuild loop with winning data.',
    icon: '🏆',
  },
  {
    title: 'Weekly Automated Reports',
    desc: 'Receive a structured performance report every week — no manual pull required. Data-driven decisions, always up to date.',
    icon: '📋',
  },
]

export default function KPI() {
  return (
    <section
      id="kpi"
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', background: 'white' }}
    >
      {/* Quadrillage */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(180,180,180,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,180,0.08) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Dégradé coin droit */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 60% 60% at 100% 100%, rgba(255,140,66,0.1) 0%, rgba(232,73,122,0.08) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '3.5rem', paddingTop: '7rem' }}
      >
        <p style={{
          fontFamily: "'League Spartan', sans-serif", fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FF8C42', marginBottom: '1rem',
        }}>— Performance Intelligence</p>
        <h2 style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 800, letterSpacing: '-0.03em', color: '#0A0A0A', lineHeight: 1,
        }}>
          Dashboard KPI —{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Real-Time Data</span>
        </h2>
        <p style={{
          fontFamily: "'League Spartan', sans-serif", fontSize: '1rem', fontWeight: 300,
          color: '#6B6B6B', maxWidth: 520, margin: '1.5rem auto 0', lineHeight: 1.7,
        }}>
          Every metric that matters — centralized, automated and always live.
        </p>
      </motion.div>

      {/* Dashboard UI */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 1000,
          marginInline: 'auto',
          paddingInline: '6vw',
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,140,66,0.15)',
          borderRadius: 24, padding: '2rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(255,140,66,0.08), 0 4px 20px rgba(0,0,0,0.05)',
          marginBottom: '4rem',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#FF5F57','#FFBD2E','#28C840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <p style={{
            fontFamily: "'League Spartan', sans-serif", fontSize: '0.7rem', fontWeight: 600,
            color: '#9A9A9A', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>AI ADD — Performance Dashboard</p>
          <div style={{
            fontSize: '0.6rem', fontFamily: "'League Spartan', sans-serif", fontWeight: 600,
            color: '#28C840', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>● Live</div>
        </div>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Views', value: 284750, suffix: '', prefix: '',  color: '#FF8C42', trend: '+12.4%' },
            { label: 'Click Rate',  value: 8,      suffix: '%', prefix: '', color: '#E8497A', trend: '+2.1%'  },
            { label: 'Revenue',     value: 42800,  suffix: '', prefix: '$', color: '#FFB347', trend: '+28.7%' },
            { label: 'New Leads',   value: 1247,   suffix: '', prefix: '',  color: '#9333EA', trend: '+5.3%'  },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: `1px solid ${k.color}33`,
                borderRadius: 14, padding: '1rem',
                boxShadow: `0 4px 16px ${k.color}11`,
              }}
            >
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '0.6rem', fontWeight: 600,
                color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6,
              }}>{k.label}</p>
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: k.color,
              }}>
                <AnimatedNumber target={k.value} suffix={k.suffix} prefix={k.prefix} />
              </p>
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '0.6rem', fontWeight: 700,
                color: '#28C840', marginTop: 4,
              }}>{k.trend} this week</p>
              <div style={{ marginTop: 8 }}>
                <MiniLineChart color={k.color} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>

          {/* Bar chart */}
          <div style={{
            background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,140,66,0.12)',
            borderRadius: 14, padding: '1rem',
          }}>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 700,
              color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12,
            }}>Daily Engagement</p>
            <BarChart />
          </div>

          {/* Donuts */}
          <div style={{
            background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,140,66,0.12)',
            borderRadius: 14, padding: '1rem',
          }}>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 700,
              color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12,
            }}>Traffic Sources</p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <DonutChart pct={68} color="#FF8C42" label="Meta" />
              <DonutChart pct={45} color="#E8497A" label="TikTok" />
              <DonutChart pct={32} color="#9333EA" label="X" />
            </div>
          </div>

          {/* Live feed */}
          <div style={{
            background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,140,66,0.12)',
            borderRadius: 14, padding: '1rem', overflow: 'hidden',
          }}>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 700,
              color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12,
            }}>Live Activity</p>
            {[
              { action: 'Joined Telegram', time: '2s ago',  color: '#FF8C42' },
              { action: 'Clicked ad #142', time: '8s ago',  color: '#E8497A' },
              { action: 'Watched 92%',     time: '14s ago', color: '#9333EA' },
              { action: 'New lead scored', time: '21s ago', color: '#FFB347' },
              { action: 'Joined Discord',  time: '35s ago', color: '#14B8A6' },
            ].map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 8, paddingBottom: 8,
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.color, flexShrink: 0 }} />
                  <p style={{
                    fontFamily: "'League Spartan', sans-serif", fontSize: '0.65rem',
                    fontWeight: 600, color: '#3A3A3A',
                  }}>{e.action}</p>
                </div>
                <p style={{
                  fontFamily: "'League Spartan', sans-serif", fontSize: '0.55rem',
                  fontWeight: 500, color: '#9A9A9A',
                }}>{e.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Panels features */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem', width: '100%', maxWidth: 1000,
        paddingInline: '6vw', paddingBottom: '8rem',
      }}>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255,140,66,0.1), rgba(255,180,80,0.18))',
              border: '1px solid rgba(255,140,66,0.3)',
              borderRadius: 20, padding: '1.75rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
              overflow: 'hidden', position: 'relative',
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{f.icon}</div>
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontWeight: 800, fontSize: '0.95rem', color: '#FF6B1A', marginBottom: '0.5rem',
            }}>{f.title}</p>
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.78rem', fontWeight: 400, color: '#4B4B4B', lineHeight: 1.7,
            }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}