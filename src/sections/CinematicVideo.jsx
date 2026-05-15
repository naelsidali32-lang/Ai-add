import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

const features = [
  { title: 'Hands On Production',         desc: 'Cinematic video cannot be automated. Each project is manually directed, shot by shot, requiring full human creative oversight at every stage.' },
  { title: 'Professional Cinematography', desc: 'Complex dolly shots, crane movements, depth of field and cinematic color grading: production quality that matches high end commercial studios.' },
  { title: 'AI Enhanced Editing',         desc: 'AI tools accelerate color grading, upscaling and audio sync, but the creative direction and final cut always require a human eye.' },
  { title: 'Brand Storytelling',          desc: 'Your trading brand told through narrative arcs, emotional hooks and cinematic pacing: content that builds trust and premium perception.' },
  { title: 'URL Strategy Integration',    desc: 'Each cinematic piece is built around a specific URL strategy, driving traffic, clicks and conversions with precision.' },
  { title: 'Long Form Content',           desc: 'From 30 second brand films to multi minute documentaries: cinematic format built for YouTube, landing pages and premium placements.' },
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
      id="cinematic"
      style={{
        position: 'relative',
        background: '#0A0A0A',
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
          06 / cinematic video
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
          Hands on,<br />frame by frame.
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
          The only format that cannot be automated. Every frame is manually directed.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          width: '90vw',
          marginInline: 'auto',
          marginBottom: '1rem',
        }}
      >
        <div style={{ width: '100%', height: 14, background: '#0A0A0A' }} />
        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
          <video
            src="/Ai-add/video7.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
        <div style={{ width: '100%', height: 14, background: '#0A0A0A' }} />
      </motion.div>

      <p style={{
        padding: '0 5vw',
        fontFamily: "'League Spartan', sans-serif",
        fontSize: '0.6rem', fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}>
        ⏱ this process is long, it cannot be automated
      </p>

      <MobileFeaturesCarousel items={features} />
    </section>
  )
}

function DesktopVersion() {
  return (
    <section
      id="cinematic"
      style={{
        position: 'relative',
        background: '#0A0A0A',
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
          06 / cinematic video
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
          Hands on,<br />
          frame by frame.
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
          The only format that cannot be automated. Every frame is manually directed: a deliberate, time intensive creative process.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: 'relative',
          width: '92vw',
          marginInline: 'auto',
          marginBottom: '3rem',
        }}
      >
        <div style={{ width: '100%', height: 28, background: '#0A0A0A' }} />
        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
          <video
            src="/Ai-add/video7.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
        <div style={{ width: '100%', height: 28, background: '#0A0A0A' }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        style={{
          padding: '0 5vw',
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          marginBottom: '5rem',
          textAlign: 'center',
        }}
      >
        ⏱ this process is long, it cannot be automated
      </motion.p>

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

export default function CinematicVideo() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopVersion />
}
