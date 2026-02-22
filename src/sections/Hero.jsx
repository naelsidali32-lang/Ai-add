import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'

// On utilise directement les chemins du dossier public en .jpg
const photos = [
  '/Ai-add/photo1.jpg',
  '/Ai-add/photo2.jpg',
  '/Ai-add/photo3.jpg',
  '/Ai-add/photo4.jpg',
  '/Ai-add/photo5.jpg',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Quadrillage 3D */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(180,180,180,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,180,0.12) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        transform: 'perspective(900px) rotateX(15deg)',
        transformOrigin: 'top center',
      }} />

      {/* Orbes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[
          { top: '10%', left: '5%',  size: 320, opacity: 0.13 },
          { top: '65%', left: '10%', size: 220, opacity: 0.09 },
          { top: '30%', left: '35%', size: 160, opacity: 0.06 },
          { top: '70%', left: '45%', size: 260, opacity: 0.08 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [orb.opacity, orb.opacity * 1.6, orb.opacity] }}
            transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full"
            style={{
              top: orb.top,
              left: orb.left,
              width: orb.size,
              height: orb.size,
              background: 'radial-gradient(circle, #FF8C42, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        ))}
      </div>

      <ParticleBackground color="#FF8C42" colorAlt="#E8497A" />

      {/* Layout : texte | bouton | photos */}
      <div
        className="relative z-10 w-full flex items-center"
        style={{ paddingLeft: '9vw', paddingRight: '2vw', gap: '12vw' }}
      >

        {/* Colonne 1 — Titre à gauche */}
        <div className="flex-1 flex flex-col gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 'clamp(3.5rem, 6vw, 6rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #FF8C42 0%, #FFB347 40%, #E8497A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              AI ADD
            </span>
            <br />
            <span style={{ color: '#0A0A0A' }}>automated</span>
            <br />
            <span style={{ color: '#0A0A0A' }}>for Trading</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '1rem',
              fontWeight: 300,
              color: '#6B6B6B',
              maxWidth: 380,
              lineHeight: 1.7,
            }}
          >
            End-to-end AI creative systems: from hyper-realistic visuals to intelligent acquisition pipelines.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FF8C42',
            }}
          >
            made by Nael Sidali
          </motion.p>
        </div>

        {/* Colonne 2 — Bouton au milieu */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <motion.a
            href="#process"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 40px rgba(255,140,66,0.5), 0 20px 60px rgba(255,140,66,0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '2.5rem',
              paddingRight: '2.5rem',
              height: 56,
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #FF8C42 0%, #FFB347 50%, #E8497A 100%)',
              boxShadow: '0 4px 24px rgba(255,140,66,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'white',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Discover
          </motion.a>
        </div>

        {/* Colonne 3 — Photos à droite */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex-shrink-0 rounded-3xl overflow-hidden"
          style={{ width: 320, height: '82vh' }}
        >
          <motion.div
            animate={{ y: ['0%', '-50%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="flex flex-col gap-4"
          >
            {[...photos, ...photos].map((src, i) => (
              <div
                key={i}
                className="w-full rounded-2xl overflow-hidden flex-shrink-0"
                style={{
                  height: 260,
                  background: 'linear-gradient(135deg, rgba(255,140,66,0.08), rgba(232,73,122,0.06))',
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>

          <div className="absolute top-0 inset-x-0 h-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, white, transparent)' }} />
          <div className="absolute bottom-0 inset-x-0 h-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to top, white, transparent)' }} />
        </motion.div>

      </div>
    </section>
  )
}