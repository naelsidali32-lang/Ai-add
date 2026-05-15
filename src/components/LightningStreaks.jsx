import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

// Capsule-shaped streaks placed around the text column. Each one reveals
// progressively (left → right of its local axis) like a lightning strike,
// then stays visible. Texture comes from the same font*.jpg used elsewhere.
const STREAKS = [
  { src: `${BASE}font3.jpg`,  top: '4%',  left: '2%',   length: 300, thickness: 34, angle: 28,  delay: 0.0 },
  { src: `${BASE}font5.jpg`,  top: '10%', right: '3%',  length: 340, thickness: 36, angle: -20, delay: 0.3 },
  { src: `${BASE}fontt1.jpg`, top: '20%', left: '15%',  length: 220, thickness: 26, angle: -45, delay: 0.55 },
  { src: `${BASE}font7.jpg`,  top: '24%', right: '18%', length: 200, thickness: 24, angle: 50,  delay: 0.8 },
  { src: `${BASE}font4.jpg`,  top: '32%', left: '4%',   length: 280, thickness: 32, angle: 38,  delay: 1.05 },
  { src: `${BASE}font6.jpg`,  top: '36%', right: '6%',  length: 260, thickness: 30, angle: -28, delay: 1.3 },
  { src: `${BASE}font9.jpg`,  top: '46%', left: '20%',  length: 170, thickness: 22, angle: 62,  delay: 1.55 },
  { src: `${BASE}font2.jpg`,  top: '48%', right: '22%', length: 180, thickness: 24, angle: -58, delay: 1.8 },
  { src: `${BASE}fontt1.jpg`, top: '56%', left: '3%',   length: 320, thickness: 34, angle: 18,  delay: 2.05 },
  { src: `${BASE}font3.jpg`,  top: '60%', right: '4%',  length: 290, thickness: 30, angle: -22, delay: 2.3 },
  { src: `${BASE}font5.jpg`,  top: '70%', left: '12%',  length: 230, thickness: 28, angle: 48,  delay: 2.55 },
  { src: `${BASE}font7.jpg`,  top: '74%', right: '12%', length: 240, thickness: 28, angle: -52, delay: 2.8 },
  { src: `${BASE}font8.jpg`,  top: '82%', left: '4%',   length: 270, thickness: 30, angle: 32,  delay: 3.05 },
  { src: `${BASE}font4.jpg`,  top: '86%', right: '3%',  length: 250, thickness: 28, angle: -36, delay: 3.3 },
  { src: `${BASE}font9.jpg`,  top: '92%', left: '34%',  length: 160, thickness: 22, angle: 8,   delay: 3.55 },
  { src: `${BASE}font2.jpg`,  top: '14%', left: '38%',  length: 140, thickness: 20, angle: 75,  delay: 3.8 },
]

const REVEAL_DURATION = 1.0 // seconds for each streak to fully draw in

export default function LightningStreaks() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {STREAKS.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            right: s.right,
            transform: `rotate(${s.angle}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{
              duration: REVEAL_DURATION,
              delay: s.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              width: `clamp(110px, ${s.length / 14}vw, ${s.length}px)`,
              height: `${s.thickness}px`,
              backgroundImage: `url(${s.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 9999,
              filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.18))',
              willChange: 'clip-path, opacity',
            }}
          />
        </div>
      ))}
    </div>
  )
}
