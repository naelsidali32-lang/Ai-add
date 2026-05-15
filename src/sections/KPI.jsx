import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useIsMobile } from '../hooks/useMedia'

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
  const id = `fill-${color.replace('#','')}`
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={fill} fill={`url(#${id})`}
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
      <svg width={70} height={70} viewBox="0 0 80 80">
        <circle cx={40} cy={40} r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={8} />
        <motion.circle cx={40} cy={40} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ transformOrigin: '40px 40px', transform: 'rotate(-90deg)' }}
        />
        <text x={40} y={44} textAnchor="middle"
          style={{ fontFamily: 'League Spartan', fontSize: 13, fontWeight: 800, fill: '#1A1A1A' }}>
          {pct}%
        </text>
      </svg>
      <p style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '0.6rem', fontWeight: 600,
        color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {label}
      </p>
    </div>
  )
}

function BarChart() {
  const bars = [
    { label: 'Mon', v: 65, c: '#F5C518' },
    { label: 'Tue', v: 82, c: '#F5C518' },
    { label: 'Wed', v: 48, c: '#FF00BB' },
    { label: 'Thu', v: 91, c: '#2D5BFF' },
    { label: 'Fri', v: 73, c: '#F5C518' },
    { label: 'Sat', v: 55, c: '#FF00BB' },
    { label: 'Sun', v: 88, c: '#2D5BFF' },
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
          <p style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '0.55rem',
            color: 'rgba(0,0,0,0.5)', fontWeight: 600 }}>{b.label}</p>
        </div>
      ))}
    </div>
  )
}

const features = [
  { title: 'Full Performance Dashboard',  desc: 'Every video tracked in real time: views, CTR, watch time, engagement rate and conversion data centralized in one clean interface.' },
  { title: 'Tracked Link Intelligence',   desc: 'Each ad uses a unique tracked link. Know exactly what the user does after clicking, including which platform they joined and which step they completed.' },
  { title: 'Telegram & Channel Tracking', desc: 'Monitor post click behavior on Telegram, Discord and Signal: join rate, message engagement and drop off points all measured.' },
  { title: 'Virtual Client Profiling',    desc: 'Build a virtual profile for each lead, including traffic source, device, behavior patterns, content preferences and conversion likelihood score.' },
  { title: 'Best Performer Detection',    desc: 'The system automatically identifies which creatives drive the most qualified leads, feeding the rebuild loop with winning data.' },
  { title: 'Weekly Automated Reports',    desc: 'Receive a structured performance report every week, with no manual pull required. Data driven decisions, always up to date.' },
]

const kpiCards = [
  { label: 'Total Views', value: 284750, suffix: '', prefix: '',  color: '#F5C518', trend: '+12.4%' },
  { label: 'Click Rate',  value: 8,      suffix: '%', prefix: '', color: '#FF00BB', trend: '+2.1%'  },
  { label: 'Revenue',     value: 42800,  suffix: '', prefix: '$', color: '#2D5BFF', trend: '+28.7%' },
  { label: 'New Leads',   value: 1247,   suffix: '', prefix: '',  color: '#FF4D4D', trend: '+5.3%'  },
]

function MobileFeaturesCarousel({ items }) {
  return (
    <div
      className="no-scrollbar"
      style={{
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        gap: '0.7rem',
        padding: '0.25rem 5vw 0.5rem',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {items.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          style={{
            flex: '0 0 70vw',
            scrollSnapAlign: 'center',
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 14,
            padding: '0.95rem 1rem',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <p style={{
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 900, fontSize: '1.05rem',
            color: '#FFFFFF',
            marginBottom: '0.45rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            {f.title}
          </p>
          <p style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 700, fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5,
          }}>
            {f.desc}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

function MobileVersion() {
  return (
    <section
      id="kpi"
      style={{
        position: 'relative',
        background: '#2D5BFF',
        overflow: 'hidden',
        padding: '3.5rem 0 3rem',
      }}
    >
      <div style={{ padding: '0 5vw', marginBottom: '1.25rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '0.62rem', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '0.75rem',
          }}
        >
          07 / dashboard kpi
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 'clamp(2.4rem, 11vw, 3.4rem)',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          Real time<br />data, live.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5,
            marginTop: '0.85rem',
            maxWidth: 420,
          }}
        >
          Every metric that matters, centralized, automated and always live.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          width: '90vw',
          marginInline: 'auto',
          background: '#EEF2F7',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 14,
          padding: '0.85rem',
          boxShadow: '0 18px 40px rgba(0,0,0,0.22)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: 6 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {['#FF5F57','#FFBD2E','#28C840'].map(c => (
              <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <p style={{
            fontFamily: "'League Spartan', sans-serif", fontSize: '0.55rem', fontWeight: 600,
            color: 'rgba(0,0,0,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>AI ADD · Dashboard</p>
          <div style={{
            fontSize: '0.5rem', fontFamily: "'League Spartan', sans-serif", fontWeight: 700,
            color: '#28C840', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>● Live</div>
        </div>

        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            gap: '0.5rem',
            marginBottom: '0.6rem',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {kpiCards.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06 }}
              style={{
                flex: '0 0 56%',
                scrollSnapAlign: 'center',
                background: '#FFFFFF',
                border: `1px solid ${k.color}33`,
                borderRadius: 12, padding: '0.7rem',
              }}
            >
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '0.55rem', fontWeight: 600,
                color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4,
              }}>{k.label}</p>
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '1.05rem', fontWeight: 900, color: k.color,
              }}>
                <AnimatedNumber target={k.value} suffix={k.suffix} prefix={k.prefix} />
              </p>
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '0.55rem', fontWeight: 700,
                color: '#28C840', marginTop: 2,
              }}>{k.trend}</p>
              <div style={{ marginTop: 4, width: '100%', overflow: 'hidden' }}>
                <MiniLineChart color={k.color} />
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{
          background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 12, padding: '0.7rem',
        }}>
          <p style={{
            fontFamily: "'League Spartan', sans-serif", fontSize: '0.55rem', fontWeight: 700,
            color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
          }}>Traffic Sources</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '0.4rem' }}>
            <DonutChart pct={68} color="#F5C518" label="Meta" />
            <DonutChart pct={45} color="#FF00BB" label="TikTok" />
            <DonutChart pct={32} color="#2D5BFF" label="X" />
          </div>
        </div>
      </motion.div>

      <MobileFeaturesCarousel items={features} />
    </section>
  )
}

function DesktopVersion() {
  return (
    <section
      id="kpi"
      style={{
        position: 'relative',
        background: '#2D5BFF',
        overflow: 'hidden',
        padding: '7rem 0 8rem',
      }}
    >
      <div style={{ padding: '0 5vw', marginBottom: '4rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '1.5rem',
          }}
        >
          07 / dashboard kpi
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
          }}
        >
          Real time<br />
          data, live.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 700, fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 540, lineHeight: 1.55,
            marginTop: '2rem',
          }}
        >
          Every metric that matters, centralized, automated and always live.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          position: 'relative', zIndex: 2,
          width: '92vw',
          marginInline: 'auto',
          background: '#EEF2F7',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 24,
          padding: '2rem',
          boxShadow: '0 30px 80px rgba(0,0,0,0.22)',
          marginBottom: '5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#FF5F57','#FFBD2E','#28C840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <p style={{
            fontFamily: "'League Spartan', sans-serif", fontSize: '0.7rem', fontWeight: 600,
            color: 'rgba(0,0,0,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>AI ADD · Performance Dashboard</p>
          <div style={{
            fontSize: '0.6rem', fontFamily: "'League Spartan', sans-serif", fontWeight: 700,
            color: '#28C840', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>● Live</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {kpiCards.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              style={{
                background: '#FFFFFF',
                border: `1px solid ${k.color}33`,
                borderRadius: 14, padding: '1rem',
                minWidth: 0,
              }}
            >
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 600,
                color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6,
              }}>{k.label}</p>
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '1.5rem', fontWeight: 900, color: k.color,
              }}>
                <AnimatedNumber target={k.value} suffix={k.suffix} prefix={k.prefix} />
              </p>
              <p style={{
                fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 700,
                color: '#28C840', marginTop: 4,
              }}>{k.trend} this week</p>
              <div style={{ marginTop: 8, width: '100%', overflow: 'hidden' }}>
                <MiniLineChart color={k.color} />
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 14, padding: '1rem',
          }}>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 700,
              color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
            }}>Daily Engagement</p>
            <BarChart />
          </div>

          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 14, padding: '1rem',
          }}>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 700,
              color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
            }}>Traffic Sources</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '0.5rem' }}>
              <DonutChart pct={68} color="#F5C518" label="Meta" />
              <DonutChart pct={45} color="#FF00BB" label="TikTok" />
              <DonutChart pct={32} color="#2D5BFF" label="X" />
            </div>
          </div>

          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 14, padding: '1rem', overflow: 'hidden',
          }}>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.62rem', fontWeight: 700,
              color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12,
            }}>Live Activity</p>
            {[
              { action: 'Joined Telegram', time: '2s ago',  color: '#F5C518' },
              { action: 'Clicked ad #142', time: '8s ago',  color: '#FF00BB' },
              { action: 'Watched 92%',     time: '14s ago', color: '#2D5BFF' },
              { action: 'New lead scored', time: '21s ago', color: '#FF4D4D' },
              { action: 'Joined Discord',  time: '35s ago', color: '#28C840' },
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
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.color, flexShrink: 0 }} />
                  <p style={{
                    fontFamily: "'Helvetica Neue', sans-serif", fontSize: '0.7rem',
                    fontWeight: 700, color: '#1A1A1A',
                  }}>{e.action}</p>
                </div>
                <p style={{
                  fontFamily: "'League Spartan', sans-serif", fontSize: '0.58rem',
                  fontWeight: 600, color: 'rgba(0,0,0,0.4)',
                }}>{e.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div
        style={{
          padding: '0 5vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem 3rem',
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontWeight: 900, fontSize: '1.6rem',
              color: '#FFFFFF',
              marginBottom: '0.65rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}>
              {f.title}
            </p>
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontWeight: 700, fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
            }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function KPI() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopVersion />
}
