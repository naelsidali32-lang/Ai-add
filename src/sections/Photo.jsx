import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

const BASE = import.meta.env.BASE_URL
const heroPhotos = [`${BASE}photoM.jpg`, `${BASE}photoN.jpg`]
const scatter1 = [
  `${BASE}photoA.jpg`, `${BASE}photoB.jpg`, `${BASE}photoC.jpg`,
  `${BASE}photoD.jpg`, `${BASE}photoE.jpg`, `${BASE}photoF.jpg`,
]
const scatter2 = [
  `${BASE}photoG.jpg`, `${BASE}photoH.jpg`, `${BASE}photoI.jpg`,
  `${BASE}photoJ.jpg`, `${BASE}photoK.jpg`, `${BASE}photoL.jpg`,
]
const allPhotos = [...heroPhotos, ...scatter1, ...scatter2]

const features = [
  { title: 'Photorealistic Generation',  desc: 'High fidelity images using Nano Banana Pro, Midjourney or Higgsfield Soul. Brand ready assets optimized for paid ads.' },
  { title: 'Character Consistency',      desc: 'Custom trained model from 25 photos. Your digital influencer stays identical across infinite environments and outfits.' },
  { title: 'Lifestyle Scenes',           desc: 'Trading charts, gym sessions, networking events: your avatar placed in any context, autonomously and daily.' },
  { title: 'Hyper Realistic Skin',       desc: 'Natural imperfections added intentionally, including pores, texture and subtle blemishes. Eliminates the artificial AI look.' },
  { title: 'Product Placement',          desc: 'Any object seamlessly embedded, from trading terminals to branded clothing and luxury accessories, with perfect lighting.' },
  { title: 'Auto Pipeline',              desc: 'Select a persona, input a concept. The system handles prompt engineering and delivers the final asset automatically.' },
]


function Polaroid({ src, w, rotate, top, left, right, bottom, z = 1, marginTop, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotate * 0.3 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '-10%' }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: top !== undefined || left !== undefined || right !== undefined || bottom !== undefined ? 'absolute' : 'relative',
        top, left, right, bottom,
        width: w,
        marginTop,
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        zIndex: z,
      }}
    >
      <img
        src={src}
        alt=""
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </motion.div>
  )
}

function MobilePhotoCarousel({ photos, aspect = '3/4', delayBase = 0 }) {
  return (
    <div
      className="no-scrollbar"
      style={{
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        gap: '0.6rem',
        padding: '0.5rem 5vw',
        marginBottom: '1.5rem',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {photos.map((src, i) => (
        <motion.div
          key={src + i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delayBase + i * 0.04 }}
          style={{
            flex: '0 0 60vw',
            aspectRatio: aspect,
            scrollSnapAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 14px 32px rgba(0,0,0,0.28)',
          }}
        >
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>
      ))}
    </div>
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
      id="photo"
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
          02 / static AI images
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
          Photos<br />that live.
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
          Photorealistic visuals, persona creation and brand ready assets, fully automated for trading platforms.
        </motion.p>
      </div>

      <MobilePhotoCarousel photos={allPhotos} aspect="3/4" />

      <div style={{ padding: '0 5vw', marginBottom: '1rem' }}>
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 'clamp(1.6rem, 7vw, 2.4rem)',
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '0.85rem',
          }}
        >
          One face,<br />a thousand worlds.
        </motion.h3>
      </div>

      <MobileFeaturesCarousel items={features} />
    </section>
  )
}

function DesktopVersion() {
  return (
    <section
      id="photo"
      style={{
        position: 'relative',
        background: '#2D5BFF',
        overflow: 'hidden',
        padding: '7rem 0 8rem',
      }}
    >
      <div style={{ padding: '0 5vw', marginBottom: '3rem', position: 'relative', zIndex: 30 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '1.5rem',
          }}
        >
          02 / static AI images
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
            margin: 0,
          }}
        >
          Photos<br />that live.
        </motion.h2>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: '2rem 0 6rem',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Polaroid src={heroPhotos[0]} w="58vw" rotate={-2.5} marginTop={20} />
        <Polaroid src={heroPhotos[1]} w="38vw" rotate={3} marginTop={120} />
      </div>

      <div
        style={{
          padding: '0 5vw',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '5rem',
          position: 'relative',
          zIndex: 30,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 460,
            textAlign: 'right',
          }}
        >
          Photorealistic visuals, persona creation and brand ready assets, fully automated for trading platforms, posted daily, never repetitive.
        </motion.p>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '70vh',
          minHeight: 520,
          marginBottom: '6rem',
        }}
      >
        <Polaroid src={scatter1[0]} w="22vw" rotate={-3}  top="0%"   left="6vw"  z={3} delay={0.0} />
        <Polaroid src={scatter1[1]} w="18vw" rotate={2.5} top="22%"  left="32vw" z={4} delay={0.1} />
        <Polaroid src={scatter1[2]} w="26vw" rotate={-1}  top="8%"   right="6vw" z={2} delay={0.15} />
        <Polaroid src={scatter1[3]} w="20vw" rotate={3}   top="55%"  left="14vw" z={5} delay={0.2} />
        <Polaroid src={scatter1[4]} w="24vw" rotate={-2.5} top="48%"  left="42vw" z={6} delay={0.25} />
        <Polaroid src={scatter1[5]} w="19vw" rotate={1.5} top="60%"  right="10vw" z={4} delay={0.3} />
      </div>

      <div style={{ padding: '0 5vw', marginBottom: '4rem', position: 'relative', zIndex: 30 }}>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 'clamp(2.2rem, 7vw, 6rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
          }}
        >
          One face,<br />
          a thousand worlds.
        </motion.h3>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '70vh',
          minHeight: 520,
          marginBottom: '5rem',
        }}
      >
        <Polaroid src={scatter2[0]} w="20vw" rotate={2}    top="6%"  left="4vw"  z={3} delay={0.0} />
        <Polaroid src={scatter2[1]} w="26vw" rotate={-2.5} top="18%" left="26vw" z={5} delay={0.1} />
        <Polaroid src={scatter2[2]} w="22vw" rotate={3}    top="2%"  right="4vw" z={2} delay={0.15} />
        <Polaroid src={scatter2[3]} w="18vw" rotate={-3}   top="56%" left="10vw" z={6} delay={0.2} />
        <Polaroid src={scatter2[4]} w="24vw" rotate={2}    top="60%" left="36vw" z={4} delay={0.25} />
        <Polaroid src={scatter2[5]} w="19vw" rotate={-1.5} top="50%" right="8vw" z={5} delay={0.3} />
      </div>

      <div
        style={{
          padding: '0 5vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem 3rem',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 30,
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

export default function Photo() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopVersion />
}
