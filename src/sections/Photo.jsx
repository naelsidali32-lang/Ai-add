import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

const heroPhotos = ['/Ai-add/photoM.jpg', '/Ai-add/photoN.jpg']
const scatter1 = [
  '/Ai-add/photoA.jpg', '/Ai-add/photoB.jpg', '/Ai-add/photoC.jpg',
  '/Ai-add/photoD.jpg', '/Ai-add/photoE.jpg', '/Ai-add/photoF.jpg',
]
const scatter2 = [
  '/Ai-add/photoG.jpg', '/Ai-add/photoH.jpg', '/Ai-add/photoI.jpg',
  '/Ai-add/photoJ.jpg', '/Ai-add/photoK.jpg', '/Ai-add/photoL.jpg',
]

const features = [
  { title: 'Photorealistic Generation',  desc: 'High fidelity images using Nano Banana Pro, Midjourney or Higgsfield Soul. Brand ready assets optimized for paid ads.' },
  { title: 'Character Consistency',      desc: 'Custom trained model from 25 photos. Your digital influencer stays identical across infinite environments and outfits.' },
  { title: 'Lifestyle Scenes',           desc: 'Trading charts, gym sessions, networking events: your avatar placed in any context, autonomously and daily.' },
  { title: 'Hyper Realistic Skin',       desc: 'Natural imperfections added intentionally, including pores, texture and subtle blemishes. Eliminates the artificial AI look.' },
  { title: 'Product Placement',          desc: 'Any object seamlessly embedded, from trading terminals to branded clothing and luxury accessories, with perfect lighting.' },
  { title: 'Auto Pipeline',              desc: 'Select a persona, input a concept. The system handles prompt engineering and delivers the final asset automatically.' },
]

const tools = ['Nano Banana Pro', 'Midjourney', 'Higgsfield Soul']

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
        borderRadius: 8,
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

function MobileGallery({ photos, delayBase = 0 }) {
  const rotations = [-2.5, 2, -1.5, 3, -2, 1.5]
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.85rem',
        padding: '0 5vw',
        marginBottom: '3rem',
      }}
    >
      {photos.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delayBase + i * 0.06 }}
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
            transform: `rotate(${rotations[i % rotations.length]}deg)`,
          }}
        >
          <img src={src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </motion.div>
      ))}
    </div>
  )
}

export default function Photo() {
  const isMobile = useIsMobile()

  return (
    <section
      id="photo"
      style={{
        position: 'relative',
        background: '#2D5BFF',
        overflow: 'hidden',
        padding: isMobile ? '4rem 0 5rem' : '7rem 0 8rem',
      }}
    >
      {/* Section label + title */}
      <div style={{ padding: '0 5vw', marginBottom: isMobile ? '2rem' : '3rem', position: 'relative', zIndex: 30 }}>
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
          Photos<br />
          that live.
        </motion.h2>
      </div>

      {/* Two huge hero photos */}
      {isMobile ? (
        <div style={{ padding: '0 5vw', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          <Polaroid src={heroPhotos[0]} w="100%" rotate={-1.5} />
          <Polaroid src={heroPhotos[1]} w="100%" rotate={1.5} />
        </div>
      ) : (
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
      )}

      {/* Body copy */}
      <div
        style={{
          padding: '0 5vw',
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'flex-end',
          marginBottom: isMobile ? '3rem' : '5rem',
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
            fontSize: isMobile ? '0.95rem' : '1.1rem',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 460,
            textAlign: isMobile ? 'left' : 'right',
          }}
        >
          Photorealistic visuals, persona creation and brand ready assets, fully automated for trading platforms, posted daily, never repetitive.
        </motion.p>
      </div>

      {/* Scatter gallery 1 */}
      {isMobile ? (
        <MobileGallery photos={scatter1} />
      ) : (
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
      )}

      {/* Headline mid */}
      <div style={{ padding: '0 5vw', marginBottom: isMobile ? '2.5rem' : '4rem', position: 'relative', zIndex: 30 }}>
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

      {/* Scatter gallery 2 */}
      {isMobile ? (
        <MobileGallery photos={scatter2} />
      ) : (
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
      )}

      {/* Features as flat color blocks */}
      <div
        style={{
          padding: '0 5vw',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1.75rem' : '2.5rem 3rem',
          marginBottom: isMobile ? '2.5rem' : '4rem',
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

      {/* Tool pills */}
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
          <span key={tool} className="btn-pill btn-pill-light" style={{ pointerEvents: 'none' }}>
            {tool}
          </span>
        ))}
      </div>
    </section>
  )
}
