import { useState } from 'react'
import { useImageLoad }   from './hooks/useImageLoad'
import Loader             from './components/Loader'
import NightSky           from './components/NightSky'
import ScrollProgress     from './components/ScrollProgress'
import SideIndicator      from './components/SideIndicator'
import Nav                from './components/Nav'
import Hero               from './components/Hero'
import Divider            from './components/Divider'
import Press              from './components/Press'
import Music              from './components/Music'
import Connect            from './components/Connect'
import Footer             from './components/Footer'

export default function App() {
  const [revealed,   setRevealed]   = useState(false)
  const [skyVisible, setSkyVisible] = useState(false)

  useImageLoad()

  function handleDone() {
    setRevealed(true)
    setTimeout(() => setSkyVisible(true), 600)
  }

  return (
    <>
      {/* Global UI layer */}
      <ScrollProgress />
      <SideIndicator revealed={revealed} />

      {/* Intro */}
      <Loader onDone={handleDone} />

      {/* Background */}
      <NightSky visible={skyVisible} />

      {/* Navigation */}
      <Nav revealed={revealed} />

      {/* Main content */}
      <main style={{
        position: 'relative', zIndex: 1,
        opacity:    revealed ? 1 : 0,
        transform:  revealed ? 'none' : 'translateY(8px)',
        transition: 'opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s',
      }}>

        {/* ── Hero ── */}
        <Hero revealed={revealed} />

        {/* ── Press & Numbers ── */}
        <Divider
          bg="#000000"
          fill="#06060a"
          path="M0,0 C480,80 960,0 1440,60 L1440,80 L0,80 Z"
        />
        <Press />

        {/* ── Latest Music ── */}
        <Divider
          bg="#06060a"
          fill="#0e0e14"
          path="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z"
        />
        <Music />

        {/* ── Connect ── */}
        <Divider
          bg="#0e0e14"
          fill="#000000"
          path="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
        />
        <Connect />

        {/* ── Footer ── */}
        <Divider
          bg="#000000"
          fill="#06060a"
          path="M0,20 C360,80 1080,0 1440,60 L1440,80 L0,80 Z"
        />
        <Footer />
      </main>
    </>
  )
}
