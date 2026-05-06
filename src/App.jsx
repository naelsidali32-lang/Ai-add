import { lazy, Suspense, useState, useEffect } from 'react'
import './index.css'
import Hero from './sections/Hero'

const DiscoverOrbit = lazy(() => import('./components/DiscoverOrbit'))

export default function App() {
  const [view, setView] = useState('home')

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
        <Hero onDiscover={goDiscover} />
      ) : (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#ffcf01' }} />}>
          <DiscoverOrbit onBack={goHome} />
        </Suspense>
      )}
    </div>
  )
}
