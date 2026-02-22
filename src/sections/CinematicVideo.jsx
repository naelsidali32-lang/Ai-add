import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'

const features = [
  {
    title: 'Hands-On Production',
    desc: 'Cinematic video cannot be automated. Each project is manually directed, shot by shot — requiring full human creative oversight at every stage.',
    icon: '🎬',
    dark: true,
  },
  {
    title: 'Professional Cinematography',
    desc: 'Complex dolly shots, crane movements, depth of field and cinematic color grading — production quality that matches high-end commercial studios.',
    icon: '🎥',
  },
  {
    title: 'AI-Enhanced Editing',
    desc: 'AI tools accelerate color grading, upscaling and audio sync — but the creative direction and final cut always require a human eye.',
    icon: '✂️',
  },
  {
    title: 'Brand Storytelling',
    desc: 'Your trading brand told through narrative arcs, emotional hooks and cinematic pacing — content that builds trust and premium perception.',
    icon: '📖',
  },
  {
    title: 'URL Strategy Integration',
    desc: 'Each cinematic piece is built around a specific URL strategy — driving traffic, clicks and conversions with precision.',
    icon: '🔗',
  },
  {
    title: 'Long-Form Content',
    desc: 'From 30-second brand films to multi-minute documentaries — cinematic format built for YouTube, landing pages and premium placements.',
    icon: '🏆',
  },
]

export default function CinematicVideo() {
  return (
    <section
      id="cinematic"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground color="#FF8C42" colorAlt="#E8497A" />

      {/* ── Bloc cinéma sombre ── */}
      <div
        style={{
          width: '100%',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '6rem 6vw 5rem',
          position: 'relative',
        }}
      >
        {/* Grain cinéma */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px',
        }} />

        {/* Orbe rouge cinéma */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: 600, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(180,30,30,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#FF8C42', marginBottom: '1rem',
          }}>
            — Premium Film Production
          </p>
          <h2 style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#FFFFFF', lineHeight: 1,
          }}>
            Cinematic Video —{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Hands-On Only
            </span>
          </h2>
          <p style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '1rem', fontWeight: 300,
            color: 'rgba(255,255,255,0.5)', maxWidth: 520,
            margin: '1.5rem auto 0', lineHeight: 1.7,
          }}>
            The only format that cannot be automated. Every frame is manually directed: a deliberate, time-intensive creative process.
          </p>
        </motion.div>

        {/* Barres cinéma + vidéo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            position: 'relative', zIndex: 2,
            width: '100%', maxWidth: 1000,
          }}
        >
          {/* Barre cinéma haut */}
          <div style={{
            width: '100%', height: 32,
            background: '#0A0A0A',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }} />

          {/* Vidéo */}
          <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
            <video
              src="/Ai-add/video7.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Vignette */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Barre cinéma bas */}
          <div style={{
            width: '100%', height: 32,
            background: '#0A0A0A',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }} />
        </motion.div>

        {/* Label durée */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          style={{
            position: 'relative', zIndex: 2,
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '0.65rem', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            marginTop: '1.5rem',
          }}
        >
          ⏱ This process is long: it cannot be automated
        </motion.p>
      </div>

      {/* ── Transition noir → blanc ── */}
      <div style={{
        width: '100%', height: 120,
        background: 'linear-gradient(to bottom, #000000, #ffffff)',
      }} />

      {/* ── Bloc panels blanc ── */}
      <div
        style={{
          width: '100%',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 6vw 8rem',
          position: 'relative',
        }}
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

        {/* Grille features */}
        <div
          style={{
            position: 'relative', zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            width: '100%', maxWidth: 1000,
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
                background: f.dark
                  ? 'linear-gradient(135deg, rgba(20,20,20,0.95), rgba(40,20,20,0.9))'
                  : 'linear-gradient(135deg, rgba(255,140,66,0.1), rgba(255,180,80,0.18))',
                border: f.dark
                  ? '1px solid rgba(255,140,66,0.4)'
                  : '1px solid rgba(255,140,66,0.3)',
                borderRadius: 20,
                padding: '1.75rem',
                backdropFilter: 'blur(16px)',
                boxShadow: f.dark
                  ? '0 8px 40px rgba(0,0,0,0.3), 0 0 20px rgba(255,140,66,0.1)'
                  : '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <p style={{
                fontFamily: "'League Spartan', sans-serif",
                fontWeight: 800, fontSize: '0.95rem',
                color: f.dark ? '#FF8C42' : '#FF6B1A',
                marginBottom: '0.5rem',
              }}>
                {f.title}
              </p>
              <p style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: '0.78rem', fontWeight: 400,
                color: f.dark ? 'rgba(255,255,255,0.6)' : '#4B4B4B',
                lineHeight: 1.7,
              }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}