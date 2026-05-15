import { motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef } from 'react'
import { useIsMobile } from '../hooks/useMedia'

const PufferFish = lazy(() => import('../components/PufferFish'))

const agentSteps = [
  { id: 1, label: 'Perceive', desc: 'Reads data, context & environment' },
  { id: 2, label: 'Reason',   desc: 'Analyzes and plans next action' },
  { id: 3, label: 'Act',      desc: 'Executes tasks autonomously' },
  { id: 4, label: 'Learn',    desc: 'Improves from results and feedback' },
  { id: 5, label: 'Memory',   desc: 'Stores context across sessions' },
]

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

const features = [
  { title: 'Autonomous Content Pipeline', desc: 'The agent monitors your best performing ads, generates new creatives, posts them and tracks results, without any human input.' },
  { title: 'RAG Memory System',           desc: 'Retrieval Augmented Generation gives the agent long term memory: it learns your brand voice, past campaigns and audience behavior over time.' },
  { title: 'Multi Platform Execution',    desc: 'One agent simultaneously manages Meta, TikTok, X, Telegram and Discord, coordinating actions across every channel in real time.' },
  { title: 'Self Optimizing Loop',        desc: 'The agent reads KPI data, identifies winning patterns and autonomously rebuilds the next batch of content based on what performed best.' },
  { title: 'Lead Qualification Agent',    desc: 'Automatically scores and qualifies incoming leads based on behavior, filtering high intent prospects and routing them to the right funnel.' },
  { title: 'Zero Human Overhead',         desc: 'Once configured, the system runs indefinitely. You set the goals and the agent handles execution, optimization and reporting autonomously.' },
]


function AgentDiagram({ isMobile }) {
  const containerRef = useRef(null)
  const lookAtRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = clamp((e.clientX - cx) / (window.innerWidth / 2), -1.5, 1.5)
      const dy = clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1)
      lookAtRef.current.y = dx * (Math.PI / 4)
      lookAtRef.current.x = -dy * (Math.PI / 8)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  const containerSize = isMobile ? 290 : 720
  const centerSize = isMobile ? 120 : 280
  const badgeSize = isMobile ? 64 : 130
  const orbitRadius = (containerSize / 2) - (badgeSize / 2) - (isMobile ? 4 : 16)

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.2 }}
      style={{
        position: 'relative',
        width: containerSize,
        height: containerSize,
        marginInline: 'auto',
        marginBottom: isMobile ? '1.5rem' : '5rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: centerSize, height: centerSize,
          marginLeft: -centerSize / 2, marginTop: -centerSize / 2,
          borderRadius: '50%',
          border: `${isMobile ? 5 : 10}px solid #FFFFFF`,
          boxShadow: '0 18px 50px rgba(0, 0, 0, 0.18)',
          overflow: 'hidden',
        }}
      >
        <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
          <PufferFish lookAtRef={lookAtRef} />
        </Suspense>
      </motion.div>

      {agentSteps.map((step, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / agentSteps.length
        const bx = Math.cos(angle) * orbitRadius
        const by = Math.sin(angle) * orbitRadius
        const descWidth = isMobile ? 110 : 210
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: bx, y: by }}
            whileInView={{ opacity: 1, x: bx, y: by }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.34, 1.2, 0.64, 1] }}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 0, height: 0,
              zIndex: 5,
            }}
          >
            <motion.div
              initial={{ scale: 0.6 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.34, 1.2, 0.64, 1] }}
              style={{
                position: 'absolute',
                width: badgeSize, height: badgeSize,
                left: -badgeSize / 2, top: -badgeSize / 2,
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 14px 36px rgba(0, 0, 0, 0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{
                fontFamily: "'League Spartan', sans-serif",
                fontWeight: 800,
                fontSize: isMobile ? '0.68rem' : '1.05rem',
                color: '#0A0A0A',
                letterSpacing: '-0.01em',
                textAlign: 'center',
                padding: '0 6px',
              }}>
                {step.label}
              </span>
            </motion.div>
            {!isMobile && (
              <p style={{
                position: 'absolute',
                left: -descWidth / 2,
                top: badgeSize / 2 + 12,
                width: descWidth,
                margin: 0,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                lineHeight: 1.35,
                color: '#FFFFFF',
                textAlign: 'center',
                pointerEvents: 'none',
              }}>
                {step.desc}
              </p>
            )}
          </motion.div>
        )
      })}
    </motion.div>
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
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.28)',
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
            color: 'rgba(255,255,255,0.9)',
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
      id="agentic"
      style={{
        position: 'relative',
        background: '#F5C518',
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
          08 / agentic ai
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
          Full<br />autonomy.
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
          AI agents that perceive, decide and act, running your entire creative and acquisition pipeline.
        </motion.p>
      </div>

      <AgentDiagram isMobile />

      <MobileFeaturesCarousel items={features} />

      <div style={{ padding: '2rem 5vw 0', textAlign: 'center' }}>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 'clamp(1.6rem, 7vw, 2.4rem)',
            fontWeight: 900, lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '1.25rem',
          }}
        >
          Let's automate it.
        </motion.h3>
        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-contact')) }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="btn-pill btn-pill-dark"
          style={{ display: 'inline-block' }}
        >
          CONTACT SALES
        </motion.a>
      </div>
    </section>
  )
}

function DesktopVersion() {
  return (
    <section
      id="agentic"
      style={{
        position: 'relative',
        background: '#F5C518',
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
          08 / agentic ai
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
          Full<br />
          autonomy.
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
            maxWidth: 540, lineHeight: 1.55,
            marginTop: '2rem',
          }}
        >
          AI agents that perceive, decide and act, running your entire creative and acquisition pipeline without human intervention.
        </motion.p>
      </div>

      <AgentDiagram isMobile={false} />

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

      <div style={{ padding: '5rem 5vw 0', textAlign: 'center' }}>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 'clamp(2rem, 7vw, 5rem)',
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '2rem',
          }}
        >
          Let's automate it.
        </motion.h3>
        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-contact')) }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="btn-pill btn-pill-dark"
          style={{ display: 'inline-block' }}
        >
          CONTACT SALES
        </motion.a>
      </div>
    </section>
  )
}

export default function AgenticAI() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopVersion />
}
