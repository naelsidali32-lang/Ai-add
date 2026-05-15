import { lazy, Suspense } from 'react'
import { useIsMobile } from '../hooks/useMedia'
import GenePanel from '../components/GenePanel'

const PufferFishGrid = lazy(() => import('../components/PufferFishGrid'))

export default function PufferGridSection({ onSolutions }) {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <Suspense fallback={null}>
          <PufferFishGrid
            cols={isMobile ? 7 : 13}
            rows={isMobile ? 9 : 7}
            spacingX={isMobile ? 1.9 : 1.95}
            spacingY={isMobile ? 1.9 : 1.95}
            scale={1.35}
            holeCols={3}
            holeRows={3}
            cameraZ={isMobile ? 14 : 18}
            fov={isMobile ? 55 : 45}
          />
        </Suspense>
      </div>
      <GenePanel onSolutions={onSolutions} />
    </section>
  )
}
