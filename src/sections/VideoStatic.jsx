import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

const videos = ['/Ai-add/video1.mp4', '/Ai-add/video2.mp4', '/Ai-add/video3.mp4']

const features = [
  { title: 'Short Form Ads',       desc: 'High fidelity clips from 5 to 15 seconds using Kling AI, the current state of the art for advertising video.' },
  { title: 'Static Camera Shots',  desc: 'Fixed frame, subtle actions like typing on a laptop or moving a mouse. Maximum visual stability, zero artifacts.' },
  { title: 'Avatar Consistency',   desc: 'Your digital influencer maintains a strictly consistent appearance across every video, generated at scale.' },
  { title: 'Scroll Stop Concepts', desc: 'High contrast visual juxtapositions designed to stop the scroll: unexpected scenarios built for virality.' },
  { title: 'Motion Transfer',      desc: 'Body movements from any source video mapped precisely onto your AI character: trends, gestures, styles.' },
  { title: 'Auto Publish',         desc: 'The pipeline generates and posts daily content autonomously. Your team only handles the creative direction.' },
]

const tools = ['Kling AI', 'Runway', 'Hailuo']

const pricing = [
  { label: 'Per clip',     value: '$0.15 to $0.50' },
  { label: 'Monthly plan', value: '$20 to $100'    },
  { label: 'Resolution',   value: '720p to 1080p'  },
  { label: 'Duration',     value: '5 to 15 sec'    },
]

export default function VideoStatic() {
  const isMobile = useIsMobile()
  return (
    <section
      id="video-static"
      style={{
        position: 'relative',
        background: '#FF4D4D',
        overflow: 'hidden',
        padding: isMobile ? '4rem 0 5rem' : '7rem 0 8rem',
      }}
    >
      {/* Section label + title */}
      <div style={{ padding: '0 5vw', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
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
          03 / video static
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
          Scroll<br />stoppers.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 700, fontSize: isMobile ? '0.95rem' : '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 520, lineHeight: 1.55,
            marginTop: isMobile ? '1.25rem' : '2rem',
          }}
        >
          AI generated short clips optimized for paid ads: consistent avatars, automated pipelines, zero manual effort.
        </motion.p>
      </div>

      {/* 3 vertical videos — stacked grid on mobile, overlapping row on desktop */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: isMobile ? '1rem 5vw' : '2rem 5vw',
          display: isMobile ? 'grid' : 'flex',
          gridTemplateColumns: isMobile ? '1fr 1fr' : undefined,
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: isMobile ? '0.75rem' : '1.5vw',
          marginBottom: isMobile ? '3rem' : '5rem',
        }}
      >
        {videos.map((src, i) => {
          const rotations = [-2, 1.5, -1]
          const offsets = [0, 60, 20]
          const mobileSpan = isMobile && i === 2 ? '1 / span 2' : undefined
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              style={{
                width: isMobile ? '100%' : '28vw',
                gridColumn: mobileSpan,
                maxWidth: isMobile && i === 2 ? '60%' : undefined,
                marginInline: isMobile && i === 2 ? 'auto' : undefined,
                aspectRatio: '9/16',
                overflow: 'hidden',
                borderRadius: 8,
                transform: isMobile ? `rotate(${rotations[i] * 0.6}deg)` : `rotate(${rotations[i]}deg) translateY(${offsets[i]}px)`,
                boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
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
        })}
      </div>

      {/* Pricing */}
      <div
        style={{
          padding: '0 5vw',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
          marginBottom: isMobile ? '2.5rem' : '5rem',
        }}
      >
        {pricing.map((p) => (
          <span
            key={p.label}
            className="btn-pill btn-pill-dark"
            style={{ pointerEvents: 'none' }}
          >
            <strong style={{ marginRight: 8, fontWeight: 800 }}>{p.value}</strong>
            <span style={{ opacity: 0.6, fontWeight: 600 }}>{p.label}</span>
          </span>
        ))}
      </div>

      {/* Features */}
      <div
        style={{
          padding: '0 5vw',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1.75rem' : '2.5rem 3rem',
          marginBottom: isMobile ? '2.5rem' : '4rem',
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
              fontWeight: 900, fontSize: isMobile ? '1.35rem' : '1.6rem',
              color: '#FFFFFF',
              marginBottom: '0.65rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}>
              {f.title}
            </p>
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontWeight: 700, fontSize: isMobile ? '0.9rem' : '0.95rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
            }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: '0 5vw', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginRight: '0.5rem',
        }}>
          Powered by
        </p>
        {tools.map((tool) => (
          <span key={tool} className="btn-pill btn-pill-dark" style={{ pointerEvents: 'none' }}>
            {tool}
          </span>
        ))}
      </div>
    </section>
  )
}
