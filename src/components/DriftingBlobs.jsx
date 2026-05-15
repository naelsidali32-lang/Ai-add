import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

// Non-interactive blobs that drift slowly across a horizontal band.
const BLOBS = [
  {
    src: `${BASE}font4.jpg`,
    top: '15%',
    left: '5%',
    size: 110,
    radius: '55% 45% 60% 40% / 50% 55% 45% 50%',
    keyframes: { x: [0, 22, -10, 14, 0], y: [0, -14, 12, -8, 0], rotate: [0, 8, -5, 4, 0] },
    duration: 22,
  },
  {
    src: `${BASE}font6.jpg`,
    top: '50%',
    left: '20%',
    size: 80,
    radius: '60% 40% 35% 65% / 45% 55% 45% 55%',
    keyframes: { x: [0, -16, 18, -8, 0], y: [0, 14, -10, 12, 0], rotate: [0, -6, 9, -3, 0] },
    duration: 28,
  },
  {
    src: `${BASE}font8.jpg`,
    top: '20%',
    left: '42%',
    size: 130,
    radius: '50% 50% 60% 40% / 55% 45% 55% 45%',
    keyframes: { x: [0, 14, -20, 10, 0], y: [0, -12, 10, -6, 0], rotate: [0, 5, -8, 2, 0] },
    duration: 24,
  },
  {
    src: `${BASE}fontt1.jpg`,
    top: '55%',
    left: '62%',
    size: 95,
    radius: '45% 55% 50% 50% / 60% 40% 60% 40%',
    keyframes: { x: [0, -18, 16, -6, 0], y: [0, 16, -12, 8, 0], rotate: [0, 10, -4, 6, 0] },
    duration: 30,
  },
  {
    src: `${BASE}font2.jpg`,
    top: '22%',
    left: '82%',
    size: 105,
    radius: '52% 48% 40% 60% / 55% 45% 55% 45%',
    keyframes: { x: [0, 16, -18, 12, 0], y: [0, -14, 16, -8, 0], rotate: [0, -4, 8, -2, 0] },
    duration: 26,
  },
]

export default function DriftingBlobs() {
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
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          animate={b.keyframes}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: `clamp(50px, ${b.size / 14}vw, ${b.size}px)`,
            aspectRatio: '1 / 1',
            backgroundImage: `url(${b.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: b.radius,
            filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.15))',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
