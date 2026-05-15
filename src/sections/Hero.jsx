import { motion, useScroll, useTransform } from 'framer-motion'
import { lazy, Suspense, useRef } from 'react'
import { useIsMobile, useIsTablet } from '../hooks/useMedia'

const PufferFish = lazy(() => import('../components/PufferFish'))

const DESCRIPTION_PARAGRAPHS = [
  'We bridge the gap between high-level creative direction and intelligent automation. Our studio specializes in building powerful brand identities through AI-driven visual content and strategic communication.',
  'From media strategy to event coordination, we streamline the creative process to help ambitious brands move faster and stand out further. Design fueled by strategy, scaled by technology.',
]

function ScrollWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  return (
    <motion.span
      style={{
        opacity,
        display: 'inline-block',
        marginRight: '0.3em',
        willChange: 'opacity',
      }}
    >
      {word}
    </motion.span>
  )
}

function ScrollRevealText({ text, progress, rangeStart, rangeEnd }) {
  const words = text.split(' ')
  const span = rangeEnd - rangeStart
  return (
    <>
      {words.map((word, i) => {
        const t = (i + 0.5) / words.length
        const center = rangeStart + t * span
        const half = span / words.length / 1.2
        return (
          <ScrollWord
            key={i}
            word={word}
            progress={progress}
            start={center - half}
            end={center + half}
          />
        )
      })}
    </>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const fishPx = isMobile ? null : isTablet ? 520 : 720

  return (
    <section
      style={{
        position: 'relative',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        padding: isMobile ? '0 5vw 5rem' : '0 4vw 5vw',
      }}
    >
      {/* Title + fish — sits near the top of the first viewport */}
      <div
        style={{
          position: 'relative',
          minHeight: isMobile ? 'auto' : fishPx - 340,
          paddingTop: isMobile ? '3rem' : '15vh',
          paddingBottom: isMobile ? '2rem' : '0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={
            isMobile
              ? {
                  position: 'relative',
                  width: '85vw',
                  height: '70vw',
                  margin: '2rem auto 0',
                  order: 2,
                  pointerEvents: 'none',
                }
              : {
                  position: 'absolute',
                  right: isTablet ? '-4vw' : '-2vw',
                  top: 'calc(15vh - 13rem)',
                  width: fishPx,
                  height: fishPx,
                  zIndex: 1,
                  pointerEvents: 'none',
                }
          }
        >
          <Suspense fallback={null}>
            <PufferFish />
          </Suspense>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 2,
            fontFamily: "'League Spartan', sans-serif",
            fontSize: isMobile ? 'clamp(3rem, 16vw, 5.5rem)' : 'clamp(4rem, 11vw, 11rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            margin: 0,
            order: isMobile ? 1 : 'unset',
            flex: isMobile ? 'unset' : '0 1 auto',
          }}
        >
          Art beyond<br />
          human touch
        </motion.h1>
      </div>

      <AboutStudioScroll isMobile={isMobile} />
    </section>
  )
}

function AboutStudioScroll({ isMobile }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '320vh',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '0 6vw' : '0 6vw',
          gap: isMobile ? '1.5rem' : '2.5rem',
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '0.7rem' : '0.85rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            display: 'inline-block',
          }}
        >
          About the studio
        </motion.span>

        <h2
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontWeight: 700,
            fontSize: isMobile
              ? 'clamp(1.6rem, 6vw, 2.6rem)'
              : 'clamp(2rem, 3.4vw, 4rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: '#FFFFFF',
            margin: 0,
            maxWidth: '90vw',
          }}
        >
          <span style={{ display: 'block' }}>
            <ScrollRevealText
              text={DESCRIPTION_PARAGRAPHS[0]}
              progress={scrollYProgress}
              rangeStart={0.26}
              rangeEnd={0.5}
            />
          </span>
          <span style={{ display: 'block', marginTop: '0.6em' }}>
            <ScrollRevealText
              text={DESCRIPTION_PARAGRAPHS[1]}
              progress={scrollYProgress}
              rangeStart={0.5}
              rangeEnd={0.74}
            />
          </span>
        </h2>
      </div>
    </div>
  )
}

