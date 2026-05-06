import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'

const agentSteps = [
  { id: 1, label: 'Perceive', desc: 'Reads data, context & environment', icon: '👁️', x: 50, y: 8  },
  { id: 2, label: 'Reason',   desc: 'Analyzes and plans next action',     icon: '🧠', x: 82, y: 30 },
  { id: 3, label: 'Act',      desc: 'Executes tasks autonomously',        icon: '⚡', x: 72, y: 68 },
  { id: 4, label: 'Learn',    desc: 'Improves from results and feedback', icon: '📈', x: 28, y: 68 },
  { id: 5, label: 'Memory',   desc: 'Stores context across sessions',     icon: '💾', x: 18, y: 30 },
]

const connections = [
  { x1: 50, y1: 18, x2: 78, y2: 32 },
  { x1: 80, y1: 42, x2: 74, y2: 60 },
  { x1: 62, y1: 72, x2: 38, y2: 72 },
  { x1: 26, y1: 60, x2: 20, y2: 42 },
  { x1: 22, y1: 30, x2: 44, y2: 12 },
]

const features = [
  { title: 'Autonomous Content Pipeline', desc: 'The agent monitors your best performing ads, generates new creatives, posts them and tracks results, without any human input.' },
  { title: 'RAG Memory System',           desc: 'Retrieval Augmented Generation gives the agent long term memory: it learns your brand voice, past campaigns and audience behavior over time.' },
  { title: 'Multi Platform Execution',    desc: 'One agent simultaneously manages Meta, TikTok, X, Telegram and Discord, coordinating actions across every channel in real time.' },
  { title: 'Self Optimizing Loop',        desc: 'The agent reads KPI data, identifies winning patterns and autonomously rebuilds the next batch of content based on what performed best.' },
  { title: 'Lead Qualification Agent',    desc: 'Automatically scores and qualifies incoming leads based on behavior, filtering high intent prospects and routing them to the right funnel.' },
  { title: 'Zero Human Overhead',         desc: 'Once configured, the system runs indefinitely. You set the goals and the agent handles execution, optimization and reporting autonomously.' },
]

const tools = ['n8n', 'LangChain', 'OpenAI API', 'Make.com', 'Zapier AI']

export default function AgenticAI() {
  const isMobile = useIsMobile()
  return (
    <section
      id="agentic"
      style={{
        position: 'relative',
        background: '#F5C518',
        overflow: 'hidden',
        padding: isMobile ? '4rem 0 5rem' : '7rem 0 8rem',
      }}
    >
      <div style={{ padding: '0 5vw', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
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
          07 / agentic ai
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
            fontWeight: 700, fontSize: isMobile ? '0.95rem' : '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 540, lineHeight: 1.55,
            marginTop: isMobile ? '1.25rem' : '2rem',
          }}
        >
          AI agents that perceive, decide and act, running your entire creative and acquisition pipeline without human intervention.
        </motion.p>
      </div>

      {/* Agent diagram */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          position: 'relative', zIndex: 2,
          width: isMobile ? '92vw' : '100%',
          maxWidth: 640,
          height: isMobile ? 340 : 420,
          marginInline: 'auto',
          marginBottom: isMobile ? '3rem' : '5rem',
        }}
      >
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {connections.map((c, i) => (
            <g key={i}>
              <motion.line
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="#FFFFFF" strokeWidth="0.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
              <path id={`ap-${i}`} d={`M ${c.x1} ${c.y1} L ${c.x2} ${c.y2}`} fill="none" stroke="none" />
              <motion.circle r="1.2" fill="#FF00BB"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                  <mpath href={`#ap-${i}`} />
                </animateMotion>
              </motion.circle>
            </g>
          ))}

          <motion.circle cx={50} cy={50} r={8}
            fill="none" stroke="#FFFFFF" strokeWidth="0.8"
            strokeDasharray="4 2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <motion.text x={50} y={52.5} textAnchor="middle"
            style={{ fontFamily: 'League Spartan', fontSize: 4, fontWeight: 900, fill: '#FFFFFF' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            AGENT
          </motion.text>
        </svg>

        {agentSteps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.34, 1.2, 0.64, 1] }}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            style={{
              position: 'absolute',
              left: `${step.x}%`, top: `${step.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}
          >
            <div style={{
              width: isMobile ? 50 : 68, height: isMobile ? 50 : 68, borderRadius: 9999,
              background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isMobile ? '1.2rem' : '1.7rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
            }}>
              {step.icon}
            </div>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: isMobile ? '0.65rem' : '0.78rem', fontWeight: 800,
              color: '#FFFFFF', textAlign: 'center', whiteSpace: 'nowrap',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>{step.label}</p>
            {!isMobile && (
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: '0.65rem', fontWeight: 700,
                color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: 100, lineHeight: 1.4,
              }}>{step.desc}</p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <div
        style={{
          padding: '0 5vw',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1.75rem' : '2.5rem 3rem',
          marginBottom: isMobile ? '2.5rem' : '4rem',
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

      <div style={{ padding: '0 5vw', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: isMobile ? '3rem' : '5rem' }}>
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
          <span key={tool} className="btn-pill btn-pill-dark" style={{ pointerEvents: 'none' }}>
            {tool}
          </span>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ padding: isMobile ? '3rem 5vw 0' : '5rem 5vw 0', textAlign: 'center' }}>
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
            marginBottom: isMobile ? '1.5rem' : '2rem',
          }}
        >
          Let's automate it.
        </motion.h3>
        <a href="mailto:naelsidali31@gmail.com" className="btn-pill btn-pill-dark">
          Start a project
        </a>
      </div>
    </section>
  )
}
