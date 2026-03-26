import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const onScroll = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      bar.style.width  = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
      zIndex: 99997, background: 'transparent',
    }}>
      <div ref={barRef} style={{
        height: '100%', width: '0%',
        background: 'linear-gradient(90deg, #c9a84c, rgba(255,255,255,0.8), #c9a84c)',
        backgroundSize: '200% 100%',
        boxShadow: '0 0 10px rgba(201,168,76,0.7)',
        transition: 'width 0.1s linear',
        animation: 'shimmerBar 3s linear infinite',
      }} />
      <style>{`
        @keyframes shimmerBar {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  )
}
