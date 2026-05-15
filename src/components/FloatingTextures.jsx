import { useEffect, useLayoutEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL

const BLOBS = [
  {
    id: 'a',
    src: `${BASE}fontt1.jpg`,
    radius: '63% 37% 54% 46% / 55% 48% 52% 45%',
    sizeScale: 0.17,
    startX: 0.1,
    startY: 0.08,
  },
  {
    id: 'b',
    src: `${BASE}font3.jpg`,
    radius: '47% 53% 38% 62% / 42% 60% 40% 58%',
    sizeScale: 0.13,
    startX: 0.9,
    startY: 0.12,
  },
  {
    id: 'c',
    src: `${BASE}font5.jpg`,
    radius: '58% 42% 64% 36% / 45% 55% 45% 55%',
    sizeScale: 0.15,
    startX: 0.08,
    startY: 0.45,
  },
  {
    id: 'd',
    src: `${BASE}font7.jpg`,
    radius: '52% 48% 35% 65% / 60% 45% 55% 40%',
    sizeScale: 0.12,
    startX: 0.92,
    startY: 0.52,
  },
  {
    id: 'e',
    src: `${BASE}font9.jpg`,
    radius: '60% 40% 50% 50% / 48% 52% 48% 52%',
    sizeScale: 0.09,
    startX: 0.2,
    startY: 0.78,
  },
  {
    id: 'f',
    src: `${BASE}font2.jpg`,
    radius: '45% 55% 60% 40% / 55% 45% 55% 45%',
    sizeScale: 0.1,
    startX: 0.78,
    startY: 0.8,
  },
]

// Physics constants (tweak feel here).
const FORCE_RADIUS = 230     // cursor repulsion radius (px)
const FORCE_PUSH = 1.6       // strength of repulsion
const DAMPING = 0.965        // velocity decay per frame (water resistance)
const BOUNCE = 0.72          // velocity retained on wall bounce
const DRIFT_FORCE = 0.045    // strength of autonomous drift
const MAX_VELOCITY = 18      // cap on velocity magnitude
const THROW_BOOST = 1.15     // amplifies release velocity for satisfying throws

export default function FloatingTextures() {
  const containerRef = useRef(null)
  const blobRefs = useRef([])
  const stateRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false })
  const dimsRef = useRef({ w: 0, h: 0 })
  const draggedRef = useRef(-1)

  // Initialise blob physics state and DOM sizing once dimensions are known.
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const init = () => {
      const rect = el.getBoundingClientRect()
      dimsRef.current = { w: rect.width, h: rect.height }
      stateRef.current = BLOBS.map((b) => {
        const size = Math.max(70, Math.min(rect.width * b.sizeScale, 280))
        return {
          size,
          x: rect.width * b.startX,
          y: rect.height * b.startY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.2,
          angle: Math.random() * 360,
          angVel: (Math.random() - 0.5) * 0.3,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
        }
      })
      blobRefs.current.forEach((node, i) => {
        if (!node) return
        const s = stateRef.current[i]
        node.style.width = s.size + 'px'
        node.style.height = s.size + 'px'
        node.style.transform = `translate(${s.x - s.size / 2}px, ${s.y - s.size / 2}px) rotate(${s.angle}deg)`
      })
    }

    init()
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect
      dimsRef.current = { w: r.width, h: r.height }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Global pointer listeners.
  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    }
    const onUp = () => {
      if (draggedRef.current >= 0) {
        // Boost release velocity for a more "thrown" feel.
        const s = stateRef.current[draggedRef.current]
        if (s) {
          s.vx *= THROW_BOOST
          s.vy *= THROW_BOOST
        }
      }
      draggedRef.current = -1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  // Physics loop.
  useEffect(() => {
    let rafId
    const tick = () => {
      const { w, h } = dimsRef.current
      if (w && h) {
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const mouseInside = mouseRef.current.inside
        const draggedIdx = draggedRef.current

        for (let i = 0; i < stateRef.current.length; i++) {
          const s = stateRef.current[i]
          if (!s) continue
          const r = s.size / 2

          if (i === draggedIdx) {
            // Snap to cursor, derive velocity from delta.
            const dx = mx - s.x
            const dy = my - s.y
            s.vx = dx
            s.vy = dy
            s.x = mx
            s.y = my
          } else {
            // Cursor repulsion — only when cursor is inside the section.
            if (mouseInside) {
              const dx = s.x - mx
              const dy = s.y - my
              const dist = Math.hypot(dx, dy) || 1
              if (dist < FORCE_RADIUS) {
                const power = (FORCE_RADIUS - dist) / FORCE_RADIUS
                s.vx += (dx / dist) * power * FORCE_PUSH
                s.vy += (dy / dist) * power * FORCE_PUSH
              }
            }

            // Smooth wandering drift (sinusoidal so it feels organic, not jittery).
            s.phaseX += 0.012
            s.phaseY += 0.009
            s.vx += Math.sin(s.phaseX) * DRIFT_FORCE
            s.vy += Math.cos(s.phaseY) * DRIFT_FORCE

            // Cap velocity.
            const speed = Math.hypot(s.vx, s.vy)
            if (speed > MAX_VELOCITY) {
              s.vx = (s.vx / speed) * MAX_VELOCITY
              s.vy = (s.vy / speed) * MAX_VELOCITY
            }

            // Integrate.
            s.x += s.vx
            s.y += s.vy
            s.vx *= DAMPING
            s.vy *= DAMPING

            // Bounce off walls.
            if (s.x < r) { s.x = r; s.vx = Math.abs(s.vx) * BOUNCE }
            if (s.x > w - r) { s.x = w - r; s.vx = -Math.abs(s.vx) * BOUNCE }
            if (s.y < r) { s.y = r; s.vy = Math.abs(s.vy) * BOUNCE }
            if (s.y > h - r) { s.y = h - r; s.vy = -Math.abs(s.vy) * BOUNCE }
          }

          // Rotation coupled to horizontal velocity.
          s.angVel += s.vx * 0.0035
          s.angVel *= 0.95
          s.angle += s.angVel

          const node = blobRefs.current[i]
          if (node) {
            node.style.transform = `translate(${s.x - r}px, ${s.y - r}px) rotate(${s.angle}deg)`
          }
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handlePointerDown = (i) => (e) => {
    e.preventDefault()
    draggedRef.current = i
    const node = blobRefs.current[i]
    if (node) node.setPointerCapture?.(e.pointerId)
  }

  return (
    <div
      ref={containerRef}
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
        <div
          key={b.id}
          ref={(el) => (blobRefs.current[i] = el)}
          onPointerDown={handlePointerDown(i)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: `url(${b.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: b.radius,
            cursor: 'grab',
            filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.18))',
            pointerEvents: 'auto',
            willChange: 'transform',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserDrag: 'none',
          }}
        />
      ))}
    </div>
  )
}
