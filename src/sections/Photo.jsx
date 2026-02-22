import { motion } from 'framer-motion'
import { useState } from 'react'

const carousel1 = [
  '/photoA.jpg', '/photoB.jpg', '/photoC.jpg',
  '/photoD.jpg', '/photoE.jpg', '/photoF.jpg',
]

const carousel2 = [
  '/photoG.jpg', '/photoH.jpg', '/photoI.jpg',
  '/photoJ.jpg', '/photoK.jpg', '/photoL.jpg',
]

const heroPhotos = ['/photoM.jpg', '/photoN.jpg']

const features = [
  {
    title: 'Photorealistic Generation',
    desc: 'High-fidelity images using Nano Banana Pro, Midjourney or Higgsfield Soul. Brand-ready assets optimized for paid ads.',
    icon: '🎨',
  },
  {
    title: 'Character Consistency',
    desc: 'Custom-trained model from 25 photos. Your digital influencer stays identical across infinite environments and outfits.',
    icon: '👤',
  },
  {
    title: 'Lifestyle Scenes',
    desc: 'Trading charts, gym sessions, networking events — your avatar placed in any context, autonomously and daily.',
    icon: '🌆',
  },
  {
    title: 'Hyper-Realistic Skin',
    desc: 'Natural imperfections added intentionally — pores, texture, subtle blemishes. Eliminates the artificial AI look.',
    icon: '✨',
  },
  {
    title: 'Product Placement',
    desc: 'Any object seamlessly embedded — trading terminals, branded clothing, luxury accessories — with perfect lighting.',
    icon: '📦',
  },
  {
    title: 'Auto Pipeline',
    desc: 'Select a persona, input a concept. The system handles prompt engineering and delivers the final asset automatically.',
    icon: '⚡',
  },
]

const tools = ['Nano Banana Pro', 'Midjourney', 'Higgsfield Soul']

function Carousel({ photos }) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setIndex((i) => (i + 1) % photos.length)

  const visible = [
    photos[index % photos.length],
    photos[(index + 1) % photos.length],
    photos[(index + 2) % photos.length],
  ]

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', overflow: 'hidden' }}>
        {visible.map((src, i) => (
          <motion.div
            key={src + i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden' }}
          >
            <img
              src={src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Flèche gauche */}
      <button
        onClick={prev}
        style={{
          position: 'absolute', left: -20, top: '50%',
          transform: 'translateY(-50%)',
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(255,140,66,0.4)',
          zIndex: 10,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Flèche droite */}
      <button
        onClick={next}
        style={{
          position: 'absolute', right: -20, top: '50%',
          transform: 'translateY(-50%)',
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(255,140,66,0.4)',
          zIndex: 10,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem' }}>
        {photos.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? 20 : 6,
              height: 6, borderRadius: 9999,
              background: i === index
                ? 'linear-gradient(90deg, #FF8C42, #E8497A)'
                : 'rgba(255,140,66,0.25)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Photo() {
  return (
    <section
      id="photo"
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

      {/* Orbe */}
      <div style={{
        position: 'absolute', top: '10%', left: '-10%', zIndex: 0,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,66,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
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
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '4rem' }}
      >
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#FF8C42', marginBottom: '1rem',
        }}>
          — AI Image Generation
        </p>
        <h2 style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          color: '#0A0A0A', lineHeight: 1,
        }}>
          Static AI Images —{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FF8C42, #E8497A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            High Quality
          </span>
        </h2>
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: '1rem', fontWeight: 300,
          color: '#6B6B6B', maxWidth: 520,
          margin: '1.5rem auto 0', lineHeight: 1.7,
        }}>
          Photorealistic visuals, persona creation and brand-ready assets — fully automated for your trading platform.
        </p>
      </motion.div>

      {/* 2 photos hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          width: '100%', maxWidth: 1000,
          marginBottom: '2rem',
        }}
      >
        {heroPhotos.map((src, i) => (
          <div key={i} style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </motion.div>

      {/* Carousel 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1000, marginBottom: '3rem', paddingInline: '24px' }}
      >
        <Carousel photos={carousel1} />
      </motion.div>

      {/* Carousel 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1000, marginBottom: '4rem', paddingInline: '24px' }}
      >
        <Carousel photos={carousel2} />
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