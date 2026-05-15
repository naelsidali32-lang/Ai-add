import { motion } from 'framer-motion'

// Wavy closed shape: top edge = two Q curves (crest up + crest down),
// bottom edge = two Q curves mirrored. When amp=0 the edge is flat.
const wave = (top, amp, bot, botAmp) =>
  `M 0 ${top} ` +
  `Q 250 ${top - amp * 2}, 500 ${top} ` +
  `Q 750 ${top + amp * 2}, 1000 ${top} ` +
  `L 1000 ${bot} ` +
  `Q 750 ${bot + botAmp * 2}, 500 ${bot} ` +
  `Q 250 ${bot - botAmp * 2}, 0 ${bot} Z`

const HIDDEN_BELOW = wave(1100, 0, 1200, 0)
const WAVY_RISE = wave(320, 180, 1100, 0)
const SETTLED_COVER = wave(-20, 30, 1100, 30)
const WAVY_EXIT = wave(-1100, 0, -200, 180)

export default function MorphTransition({ active, onComplete, color = '#FF00BB' }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: active ? 'auto' : 'none',
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <motion.path
          fill={color}
          initial={{ d: HIDDEN_BELOW }}
          animate={
            active
              ? { d: [HIDDEN_BELOW, WAVY_RISE, SETTLED_COVER, WAVY_EXIT] }
              : { d: HIDDEN_BELOW }
          }
          transition={{
            duration: 1.8,
            times: [0, 0.4, 0.55, 1],
            ease: [0.65, 0, 0.35, 1],
          }}
          onAnimationComplete={() => active && onComplete?.()}
        />
      </svg>
    </div>
  )
}
