import { motion } from 'framer-motion'

const videos = ['/video1.mp4', '/video2.mp4', '/video3.mp4']

const features = [
  {
    title: 'Short-Form Ads',
    desc: 'High-fidelity clips from 5 to 15 seconds using Kling AI — the current state-of-the-art for advertising video.',
    icon: '🎬',
  },
  {
    title: 'Static Camera Shots',
    desc: 'Fixed frame, subtle actions — typing on a laptop, moving a mouse. Maximum visual stability, zero artifacts.',
    icon: '📷',
  },
  {
    title: 'Avatar Consistency',
    desc: 'Your digital influencer maintains a strictly consistent appearance across every video, generated at scale.',
    icon: '👤',
  },
  {
    title: 'Scroll-Stop Concepts',
    desc: 'High-contrast visual juxtapositions designed to stop the scroll — unexpected scenarios built for virality.',
    icon: '⚡',
  },
  {
    title: 'Motion Transfer',
    desc: 'Body movements from any source video mapped precisely onto your AI character — trends, gestures, styles.',
    icon: '🔄',
  },
  {
    title: 'Auto Publish',
    desc: 'The pipeline generates and posts daily content autonomously. Your team only handles the creative direction.',
    icon: '🚀',
  },
]

const tools = ['Kling AI', 'Runway', 'Hailuo']

const pricing = [
  { label: 'Per clip',      value: '$0.15 – $0.50' },
  { label: 'Monthly plan',  value: '$20 – $100'     },
  { label: 'Resolution',    value: '720p – 1080p'   },
  { label: 'Duration',      value: '5 – 15 sec'     },
]

export default function VideoStatic() {
  return (
    <section
      id="video-static"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 6vw',
        overflow: 'hidden',
        background: 'white',
      }}
    >
      {/* Quadrillage */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(180,180,180,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,180,0.08) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Dégradé coin gauche */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 60% 60% at 0% 100%, rgba(255,140,66,0.1) 0%, rgba(232,73,122,0.08) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '4rem' }}
      >
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#FF8C42', marginBottom: '1rem',
        }}>
          — Short-Form Video Production
        </p>
        <h2 style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          color: '#0A0A0A', lineHeight: 1,
        }}>
          Video Static —{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Scroll Stoppers
          </span>
        </h2>
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '1rem', fontWeight: 300,
          color: '#6B6B6B', maxWidth: 520,
          margin: '1.5rem auto 0', lineHeight: 1.7,
        }}>
          AI-generated short clips optimized for paid ads — consistent avatars, automated pipelines, zero manual effort.
        </p>
      </motion.div>

      {/* 3 vidéos verticales */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          width: '100%', maxWidth: 1000,
          marginBottom: '4rem',
        }}
      >
        {videos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{
              aspectRatio: '9/16',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}
          >
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pricing pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: '1rem',
          marginBottom: '4rem',
        }}
      >
        {pricing.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255,140,66,0.1), rgba(255,180,80,0.18))',
              border: '1px solid rgba(255,140,66,0.3)',
              borderRadius: 14,
              padding: '1rem 1.5rem',
              textAlign: 'center',
              minWidth: 130,
            }}
          >
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '1.2rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {p.value}
            </p>
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#9A9A9A', marginTop: 4,
            }}>
              {p.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Grille features */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          width: '100%', maxWidth: 1000,
          marginBottom: '3rem',
        }}
      >
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
              borderRadius: 20,
              padding: '1.75rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
              overflow: 'hidden',
              position: 'relative',
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
              fontWeight: 800, fontSize: '0.95rem',
              color: '#FF6B1A', marginBottom: '0.5rem',
            }}>
              {f.title}
            </p>
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.78rem', fontWeight: 400,
              color: '#4B4B4B', lineHeight: 1.7,
            }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Outils */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', gap: '1rem',
          flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#9A9A9A',
        }}>
          Powered by
        </p>
        {tools.map((tool, i) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.1 }}
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.78rem', fontWeight: 700,
              padding: '0.4rem 1rem', borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(255,140,66,0.12), rgba(232,73,122,0.1))',
              border: '1px solid rgba(255,140,66,0.3)',
              color: '#FF6B1A',
            }}
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}