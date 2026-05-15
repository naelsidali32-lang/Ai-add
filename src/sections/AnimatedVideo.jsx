import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

const videos = ['/Ai-add/video4.mp4', '/Ai-add/video5.mp4', '/Ai-add/video6.mp4']

const features = [
  { title: '3D Avatar Creation',          desc: 'A unique, expressive 3D avatar built around your brand: quirky, memorable, and designed to pitch products or deliver advice in an engaging way.' },
  { title: 'Fully Automated Appearances', desc: 'Once your avatar is calibrated, every appearance is automated. Same face, same voice, infinite contexts and no manual work required.' },
  { title: 'Animated Charts',             desc: 'Trading data transformed into dynamic motion graphics: candlesticks, trends and indicators brought to life.' },
  { title: 'Stylized Art Direction',      desc: '2D and 3D animation, fictional mascots and artistic styles: no realism constraints, pure creative freedom.' },
  { title: 'Wojak Style Content',         desc: 'Exaggerated emotions, simple shapes and narrative humor: the format proven viral in the trading niche.' },
  { title: 'Storyboard Pipeline',         desc: 'Pre production storyboard ensures narrative coherence before generation, with cinematic quality guaranteed.' },
]

function MobileVideoCarousel() {
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
      {videos.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          style={{
            flex: '0 0 60vw',
            aspectRatio: '9/16',
            scrollSnapAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 14px 32px rgba(0,0,0,0.28)',
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
      id="animated-video"
      style={{
        position: 'relative',
        background: '#FF00BB',
        color: '#FFFFFF',
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
          04 / animated video
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
          Insolite<br />by design.
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
          Multi scene storytelling, cinematic camera movements and fully automated workflows.
        </motion.p>
      </div>

      <MobileVideoCarousel />
      <MobileFeaturesCarousel items={features} />
    </section>
  )
}

function DesktopVersion() {
  return (
    <section
      id="animated-video"
      style={{
        position: 'relative',
        background: '#FF00BB',
        color: '#FFFFFF',
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
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '1.5rem',
          }}
        >
          04 / animated video
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
          Insolite<br />
          by design.
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
            maxWidth: 520, lineHeight: 1.55,
            marginTop: '2rem',
          }}
        >
          Beyond simple clips: multi scene storytelling, cinematic camera movements and fully automated workflows.
        </motion.p>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: '2rem 5vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '1.5vw',
          marginBottom: '5rem',
        }}
      >
        {videos.map((src, i) => {
          const rotations = [2, -1.5, 1]
          const offsets = [40, 0, 60]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              style={{
                width: '28vw',
                aspectRatio: '9/16',
                overflow: 'hidden',
                borderRadius: 0,
                transform: `rotate(${rotations[i]}deg) translateY(${offsets[i]}px)`,
                boxShadow: '0 30px 70px rgba(0,0,0,0.18)',
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

      <div
        style={{
          padding: '0 5vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem 3rem',
          marginBottom: '4rem',
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

export default function AnimatedVideo() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopVersion />
}
