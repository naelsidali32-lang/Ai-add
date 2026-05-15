import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

const VIDEOS = [
  '/Ai-add/ugc1.mp4',
  '/Ai-add/ugc2.mp4',
  '/Ai-add/ugc3.mp4',
  '/Ai-add/ugc4.mp4',
]

const features = [
  { title: 'True To Life Integration', desc: 'Logos, packaging, screens and physical products embedded into hyper realistic scenes that pass for genuine customer footage.' },
  { title: 'Phone Native Footage',     desc: 'Vertical 9:16 video shot with authentic angles, lighting and grain matched to real iPhone recordings.' },
  { title: 'Works For Services Too',   desc: 'Not just physical goods. Apps, dashboards and digital services blend seamlessly into phone held shots.' },
  { title: 'Faster Than Casting',      desc: 'Skip the talent agencies, studio days and reshoots. Dozens of variations generated from a single brief in hours, not weeks.' },
  { title: 'Brand Safe Iteration',     desc: 'Curated faces, voices and gestures keep every variant on brand, on message and on tone.' },
  { title: 'Built For A/B Testing',    desc: 'Stack creators, scripts and hooks to find the winner. UGC volume at the speed of insight.' },
]

function PhoneVideo({ src, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        aspectRatio: '9 / 16',
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
        background: '#111',
      }}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  )
}

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
            background: 'rgba(255,255,255,0.06)',
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
          }}>{f.title}</p>
          <p style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 700, fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5,
          }}>{f.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

function MobileVersion() {
  return (
    <section
      id="ugc"
      style={{
        position: 'relative',
        background: '#00b56d',
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
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '0.75rem',
          }}
        >
          05 / ugc video
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
          Real product.<br />Real reactions.
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
          Hyper-realistic phone footage with your brand assets embedded (for products and services alike).
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.65rem',
          padding: '0 5vw 1.5rem',
        }}
      >
        {VIDEOS.map((src, i) => (
          <PhoneVideo key={src} src={src} delay={i * 0.08} />
        ))}
      </div>

      <MobileFeaturesCarousel items={features} />
    </section>
  )
}

function DesktopVersion() {
  return (
    <section
      id="ugc"
      style={{
        position: 'relative',
        background: '#00b56d',
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
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '1.5rem',
          }}
        >
          05 / ugc video
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
          Real product.<br />
          Real reactions.
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
            maxWidth: 580, lineHeight: 1.55,
            marginTop: '2rem',
          }}
        >
          Hyper-realistic phone footage with your brand assets embedded in scene (packaging, screens, app UI, or service flows) at the speed and volume traditional UGC casting can't match.
        </motion.p>
      </div>

      <div
        style={{
          padding: '0 5vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(1rem, 1.5vw, 1.75rem)',
          marginBottom: '5rem',
        }}
      >
        {VIDEOS.map((src, i) => (
          <PhoneVideo key={src} src={src} delay={i * 0.1} />
        ))}
      </div>

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
            }}>{f.title}</p>
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontWeight: 700, fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
            }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function UGCVideo() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopVersion />
}
