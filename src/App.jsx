import { lazy, Suspense, useState, useEffect } from 'react'
import './index.css'
import Hero from './sections/Hero'
import AgencyTitle from './sections/AgencyTitle'
import TrustBanner from './sections/TrustBanner'
import ContactModal from './components/ContactModal'
import MorphTransition from './components/MorphTransition'

const DiscoverOrbit = lazy(() => import('./components/DiscoverOrbit'))
const PufferGridSection = lazy(() => import('./sections/PufferGridSection'))

// Midpoint of MorphTransition (covers the screen) — must match the keyframe timing in MorphTransition.jsx.
const COVER_MS = 990

export default function App() {
  const [view, setView] = useState('home')
  const [entered, setEntered] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash
      if (h === '' || h === '#' || h === '#home') setView('home')
      else setView('discover')
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Lock body scroll while the landing splash is showing or a transition is in progress.
  useEffect(() => {
    const lock = !entered || transitioning
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [entered, transitioning])

  const handleEnter = () => {
    if (transitioning || entered) return
    setTransitioning(true)
    // Swap content behind the curtain once it's fully covering the viewport.
    window.setTimeout(() => setEntered(true), COVER_MS)
  }

  const goDiscover = () => {
    window.location.hash = 'discover'
  }
  const goHome = () => {
    history.pushState(null, '', window.location.pathname + window.location.search)
    setView('home')
  }

  return (
    <div className="bg-night text-white">
      {view === 'home' ? (
        <>
          {!entered && <AgencyTitle onEnter={handleEnter} />}
          {entered && (
            <>
              <TrustBanner />
              <div style={{ background: '#ffcf01' }}>
                <Hero />
                <Suspense fallback={<div style={{ height: '100vh' }} />}>
                  <PufferGridSection onSolutions={goDiscover} />
                </Suspense>
              </div>
            </>
          )}
        </>
      ) : (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#ffcf01' }} />}>
          <DiscoverOrbit onBack={goHome} />
        </Suspense>
      )}
      <MorphTransition
        active={transitioning}
        onComplete={() => setTransitioning(false)}
      />
      <ContactModal />
    </div>
  )
}
