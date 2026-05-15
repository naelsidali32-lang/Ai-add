import { useEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL

// A thick wavy SVG path stroked with a tiling texture (font*.jpg).
// The wave's phase advances slowly on its own, and surges with scroll velocity
// — so the tube looks like a worm slithering, faster when you scroll.
export default function SensorTube({
  texture = `${BASE}font3.jpg`,
  thickness = 130,
  amplitude = 130,
  frequency = 0.005,
  ambientSpeed = 0.0035,
  scrollBoost = 0.06,
  yOffset = 0.5,         // 0 = top, 1 = bottom
  patternSize = 480,
  patternId = 'sensor-tube-pattern',
  opacity = 0.92,
}) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    const path = pathRef.current
    if (!container || !svg || !path) return

    let width = 0
    let height = 0
    let phase = 0
    let scrollVel = 0
    let lastScroll = window.scrollY || 0
    let rafId

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    const onScroll = () => {
      const y = window.scrollY || 0
      scrollVel = y - lastScroll
      lastScroll = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const tick = () => {
      // Advance phase: slow ambient + scroll velocity surge.
      phase += ambientSpeed + scrollVel * scrollBoost * 0.01
      // Decay velocity so the tube settles back to ambient when scroll stops.
      scrollVel *= 0.82

      const cy = height * yOffset
      const step = 14
      const pts = []
      for (let x = -step; x <= width + step; x += step) {
        const y =
          cy +
          Math.sin(x * frequency + phase) * amplitude +
          Math.cos(x * frequency * 0.55 - phase * 0.45) * amplitude * 0.35
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
      }
      path.setAttribute('d', 'M ' + pts.join(' L '))

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ambientSpeed, scrollBoost, frequency, amplitude, yOffset])

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
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={patternSize}
            height={patternSize}
          >
            <image
              href={texture}
              width={patternSize}
              height={patternSize}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke={`url(#${patternId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
      </svg>
    </div>
  )
}
