import './index.css'
import Hero from './sections/Hero'
import Process from './sections/Process'
import Photo from './sections/Photo'
import VideoStatic from './sections/VideoStatic'
import AnimatedVideo from './sections/AnimatedVideo'
import CinematicVideo from './sections/CinematicVideo'
import KPI from './sections/KPI'
import AgenticAI from './sections/AgenticAI'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Process />
      <Photo />
      <VideoStatic />
      <AnimatedVideo />
      <CinematicVideo />
      <KPI />
      <AgenticAI />
    </div>
  )
}