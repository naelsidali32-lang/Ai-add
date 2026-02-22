import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'

const agentSteps = [
  { id: 1, label: 'Perceive',    desc: 'Reads data, context & environment',      icon: '👁️',  x: 50,  y: 8   },
  { id: 2, label: 'Reason',      desc: 'Analyzes and plans next action',          icon: '🧠',  x: 82,  y: 30  },
  { id: 3, label: 'Act',         desc: 'Executes tasks autonomously',             icon: '⚡',  x: 72,  y: 68  },
  { id: 4, label: 'Learn',       desc: 'Improves from results and feedback',      icon: '📈',  x: 28,  y: 68  },
  { id: 5, label: 'Memory',      desc: 'Stores context across sessions',          icon: '💾',  x: 18,  y: 30  },
]

const connections = [
  { x1: 50, y1: 18, x2: 78, y2: 32 },
  { x1: 80, y1: 42, x2: 74, y2: 60 },
  { x1: 62, y1: 72, x2: 38, y2: 72 },
  { x1: 26, y1: 60, x2: 20, y2: 42 },
  { x1: 22, y1: 30, x2: 44, y2: 12 },
]

const features = [
  {
    title: 'Autonomous Content Pipeline',
    desc: 'The agent monitors your best-performing ads, generates new creatives, posts them and tracks results — without any human input.',
    icon: '🤖',
  },
  {
    title: 'RAG Memory System',
    desc: 'Retrieval-Augmented Generation gives the agent long-term memory — it learns your brand voice, past campaigns and audience behavior over time.',
    icon: '🧠',
  },
  {
    title: 'Multi-Platform Execution',
    desc: 'One agent simultaneously manages Meta, TikTok, X, Telegram and Discord — coordinating actions across every channel in real time.',
    icon: '🌐',
  },
  {
    title: 'Self-Optimizing Loop',
    desc: 'The agent reads KPI data, identifies winning patterns and autonomously rebuilds the next batch of content based on what performed best.',
    icon: '🔄',
  },
  {
    title: 'Lead Qualification Agent',
    desc: 'Automatically scores and qualifies incoming leads based on behavior — filtering high-intent prospects and routing them to the right funnel.',
    icon: '🎯',
  },
  {
    title: 'Zero Human Overhead',
    desc: 'Once configured, the system runs indefinitely. You set the goals — the agent handles execution, optimization and reporting autonomously.',
    icon: '⚙️',
  },
]

const tools = ['n8n', 'LangChain', 'OpenAI API', 'Make.com', 'Zapier AI']

export default function AgenticAI() {
  return (
    <section
      id="agentic"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #1a0533 0%, #2d0a5e 30%, #4a0a6e 55%, #1a0533 100%)',
        minHeight: '100vh',
        padding: '7rem 6vw 8rem',
      }}
    >
      {/* Quadrillage */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <ParticleBackground color="#E8497A" colorAlt="#9333EA" />

      {/* Orbes */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%', zIndex: 0,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,73,122,0.2) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%', zIndex: 0,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147,51,234,0.25) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '40%', zIndex: 0,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,66,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
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
          fontFamily: "'League Spartan', sans-serif", fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8497A', marginBottom: '1rem',
        }}>— Autonomous AI Systems</p>
        <h2 style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF', lineHeight: 1,
        }}>
          Agentic AI —{' '}
          <span style={{
            background: 'linear-gradient(135deg, #E8497A, #9333EA, #FF8C42)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Full Autonomy</span>
        </h2>
        <p style={{
          fontFamily: "'League Spartan', sans-serif", fontSize: '1rem', fontWeight: 300,
          color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '1.5rem auto 0', lineHeight: 1.7,
        }}>
          AI agents that perceive, decide and act: running your entire creative and acquisition pipeline without human intervention.
        </p>
      </motion.div>

      {/* Infographie agent */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 600, height: 380,
          marginBottom: '5rem',
        }}
      >
        {/* SVG connexions */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8497A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.8" />
            </linearGradient>
            <filter id="agentGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {connections.map((c, i) => (
            <g key={i}>
              {/* Halo */}
              <motion.line
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="#9333EA" strokeWidth="2" strokeOpacity="0.15"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
              {/* Ligne */}
              <motion.line
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="url(#connGrad)" strokeWidth="0.8"
                strokeLinecap="round" filter="url(#agentGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
              {/* Point animé */}
              <path id={`ap-${i}`} d={`M ${c.x1} ${c.y1} L ${c.x2} ${c.y2}`} fill="none" stroke="none" />
              <motion.circle r="1.2" fill="#E8497A" filter="url(#agentGlow)"
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

          {/* Cercle central */}
          <motion.circle cx={50} cy={50} r={8}
            fill="none" stroke="url(#connGrad)" strokeWidth="0.8"
            strokeDasharray="4 2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <motion.text x={55} y={60} textAnchor="middle"
            style={{ fontFamily: 'League Spartan', fontSize: 4, fontWeight: 800, fill: 'white' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            AGENT
          </motion.text>
        </svg>

        {/* Noeuds */}
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
              width: 64, height: 64, borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(232,73,122,0.25), rgba(147,51,234,0.3))',
              border: '1px solid rgba(232,73,122,0.4)',
              backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem',
              boxShadow: '0 8px 32px rgba(147,51,234,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>
              {step.icon}
            </div>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.72rem', fontWeight: 800,
              color: 'white', textAlign: 'center', whiteSpace: 'nowrap',
            }}>{step.label}</p>
            <p style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.55rem', fontWeight: 400,
              color: 'rgba(255,255,255,0.45)', textAlign: 'center', maxWidth: 80,
            }}>{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Panels */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem', width: '100%', maxWidth: 1000,
        marginBottom: '3rem',
      }}>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            style={{
              background: 'linear-gradient(135deg, rgba(232,73,122,0.12), rgba(147,51,234,0.18))',
              border: '1px solid rgba(232,73,122,0.25)',
              borderRadius: 20, padding: '1.75rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(147,51,234,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
              overflow: 'hidden', position: 'relative',
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{f.icon}</div>
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontWeight: 800, fontSize: '0.95rem', color: '#E8497A', marginBottom: '0.5rem',
            }}>{f.title}</p>
            <p style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: '0.78rem', fontWeight: 400, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
            }}>{f.desc}</p>
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
          fontFamily: "'League Spartan', sans-serif", fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
        }}>Powered by</p>
        {tools.map((tool, i) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.1 }}
            style={{
              fontFamily: "'League Spartan', sans-serif", fontSize: '0.78rem', fontWeight: 700,
              padding: '0.4rem 1rem', borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(232,73,122,0.15), rgba(147,51,234,0.2))',
              border: '1px solid rgba(232,73,122,0.3)', color: '#E8497A',
            }}
          >{tool}</motion.span>
        ))}
      </motion.div>
    </section>
  )
}