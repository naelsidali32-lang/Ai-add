import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'

const videos = ['/video4.mp4', '/video5.mp4', '/video6.mp4']

const features = [
  {
    title: '3D Avatar Creation',
    desc: 'A unique, expressive 3D avatar built around your brand — quirky, memorable, and designed to pitch products or deliver advice in an engaging way.',
    icon: '🤖',
  },
  {
    title: 'Fully Automated Appearances',
    desc: 'Once your avatar is calibrated, every appearance is automated. Same face, same voice, infinite contexts — no manual work required.',
    icon: '⚙️',
  },
  {
    title: 'Animated Charts',
    desc: 'Trading data transformed into dynamic motion graphics — candlesticks, trends and indicators brought to life.',
    icon: '📊',
  },
  {
    title: 'Stylized Art Direction',
    desc: '2D/3D animation, fictional mascots and artistic styles — no realism constraints, pure creative freedom.',
    icon: '🎨',
  },
  {
    title: 'Wojak-Style Content',
    desc: 'Exaggerated emotions, simple shapes and narrative humor — the format proven viral in the trading niche.',
    icon: '😤',
  },
  {
    title: 'Storyboard Pipeline',
    desc: 'Pre-production storyboard ensures narrative coherence before generation — cinematic quality guaranteed.',
    icon: '📋',
  },
]

const tools = ['Runway Studio', 'Hailuo', 'Sora']

const pricing = [
  { label: 'Runway Standard', value: '$12/mo'        },
  { label: 'Runway Pro',      value: '$28/mo'        },
  { label: 'Sora Standard',   value: '$0.10/sec'     },
  { label: 'Sora Pro 1080p',  value: '$0.50/sec'     },
]

export default function AnimatedVideo() {
  return (
    <section
      id="animated-video"
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

      <ParticleBackground color="#FF8C42" colorAlt="#E8497A" />

      {/* Dégradé coin droit */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 60% 60% at 100% 0%, rgba(255,140,66,0.1) 0%, rgba(232,73,122,0.08) 40%, transparent 70%)',
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
          — Advanced AI Video
        </p>
        <h2 style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          color: '#0A0A0A', lineHeight: 1,
        }}>
          Animated Video —{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Insolit result
          </span>
        </h2>
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '1rem', fontWeight: 300,
          color: '#6B6B6B', maxWidth: 520,
          margin: '1.5rem auto 0', lineHeight: 1.7,
        }}>
          Beyond simple clips: multi-scene storytelling, cinematic camera movements and fully automated workflows.
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