import { useEffect, useRef } from 'react'

// Grid of dots whose radius pulses with a radial sinusoidal wave radiating
// from the cursor, and a slower ambient breath if the cursor is idle/away.
// Heavily inspired by mattrossman/breathing-dots-tutorial.
export default function BreathingDots({
  spacing = 26,
  baseRadius = 1.8,
  maxRadius = 5.5,
  color = 'rgba(255, 207, 1, 0.9)',
  glow = 14,             // px of shadow blur around each dot (0 to disable)
  waveLength = 110,      // pixels between crests in the radial wave
  waveSpeed = 0.0028,    // wave propagation speed
  hoverRadius = 260,     // how far the cursor's wave reaches
  ambientAmp = 0.4,      // amount of automatic pulse when no hover
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let rafId

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    const onMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseRef.current.x = x
      mouseRef.current.y = y
      mouseRef.current.active =
        x >= 0 && x <= width && y >= 0 && y <= height
    }
    const onLeave = () => {
      mouseRef.current.active = false
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const TWO_PI = Math.PI * 2

    const tick = (time) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      if (glow > 0) {
        ctx.shadowColor = color
        ctx.shadowBlur = glow
      }

      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1
      const offsetX = (width - (cols - 1) * spacing) / 2
      const offsetY = (height - (rows - 1) * spacing) / 2

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const hover = mouseRef.current.active
      const t = time

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing
          const y = offsetY + r * spacing

          let radius = baseRadius

          if (hover) {
            // Radial wave from cursor.
            const dx = x - mx
            const dy = y - my
            const dist = Math.hypot(dx, dy)
            if (dist < hoverRadius) {
              const falloff = 1 - dist / hoverRadius
              const phase = (dist / waveLength) * TWO_PI - t * waveSpeed * TWO_PI
              const wave = (Math.sin(phase) + 1) * 0.5
              radius += wave * falloff * (maxRadius - baseRadius)
            }
          } else {
            // Ambient breathing across the whole grid.
            const phase =
              (Math.hypot(x - width / 2, y - height / 2) / waveLength) * TWO_PI -
              t * 0.0008 * TWO_PI
            const wave = (Math.sin(phase) + 1) * 0.5
            radius += wave * ambientAmp * (maxRadius - baseRadius)
          }

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, TWO_PI)
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [spacing, baseRadius, maxRadius, color, glow, waveLength, waveSpeed, hoverRadius, ambientAmp])

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
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, display: 'block' }}
      />
    </div>
  )
}
