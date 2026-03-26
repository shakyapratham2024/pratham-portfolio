import { useRef, useState, useEffect } from 'react'

const SONGS = [
  {
    id: 'MYrdi6Gtg00',
    title: 'Original Song',
    subtitle: 'Pratham Shakya',
    thumb: 'https://img.youtube.com/vi/MYrdi6Gtg00/maxresdefault.jpg',
    fallbackThumb: 'https://img.youtube.com/vi/MYrdi6Gtg00/hqdefault.jpg',
    url: 'https://youtu.be/MYrdi6Gtg00?si=2LwCyI0ZOHcSu_B4',
  },
  {
    id: 'mBLwpZ9QMdw',
    title: 'Original Song',
    subtitle: 'Pratham Shakya',
    thumb: 'https://img.youtube.com/vi/mBLwpZ9QMdw/maxresdefault.jpg',
    fallbackThumb: 'https://img.youtube.com/vi/mBLwpZ9QMdw/hqdefault.jpg',
    url: 'https://youtu.be/mBLwpZ9QMdw?si=glrmRVq6XnunPR1W',
  },
]

function openYouTube(song) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  if (isMobile) {
    window.location.href = `vnd.youtube://watch?v=${song.id}`
    setTimeout(() => { window.location.href = song.url }, 1500)
  } else {
    window.open(song.url, '_blank', 'noopener,noreferrer')
  }
}

function MusicCard({ song, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [imgSrc,  setImgSrc]  = useState(song.thumb)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setVisible(true), 100 + index * 120)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <div
      onClick={() => openYouTube(song)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(19,19,26,0.95)',
        border: `0.5px solid ${hovered ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)'}`,
        cursor: 'none',
        opacity:   visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-10px) scale(1.015)' : 'none'
          : 'translateY(32px)',
        transition: visible
          ? 'border-color 0.4s, box-shadow 0.4s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'
          : `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 120}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 120}ms`,
        boxShadow: hovered
          ? '0 36px 90px rgba(0,0,0,0.75), 0 0 50px rgba(201,168,76,0.08), inset 0 0.5px 0 rgba(255,255,255,0.06)'
          : 'none',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden', background: '#0a0a0a' }}>
        <img
          src={imgSrc}
          alt={song.title}
          loading="lazy"
          onError={() => setImgSrc(song.fallbackThumb)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />

        {/* Play overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.42)',
          backdropFilter: 'blur(1px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingLeft: '5px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            transform: hovered ? 'scale(1)' : 'scale(0.55)',
            transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>

        {/* YouTube badge */}
        <div style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          borderRadius: '6px', padding: '0.22rem 0.55rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24">
            <path fill="#FF0000" d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
            <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
          </svg>
          <span style={{ fontFamily: 'Space Mono', fontSize: '0.38rem', letterSpacing: '0.08em', color: 'rgba(240,237,232,0.75)', textTransform: 'uppercase' }}>YouTube</span>
        </div>

        {/* Gold shimmer on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: '2px',
          background: 'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.2), transparent)',
          width: hovered ? '100%' : '0%',
          transition: 'width 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
      </div>

      {/* Card info */}
      <div style={{ padding: '1.2rem 1.4rem 1.5rem' }}>
        <div style={{
          fontFamily: 'Playfair Display', fontWeight: 700,
          fontSize: '1rem', lineHeight: 1.3,
          color: hovered ? '#c9a84c' : '#f0ede8',
          marginBottom: '0.4rem',
          transition: 'color 0.3s',
        }}>
          {song.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Space Mono', fontSize: '0.4rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.25)' }}>
            {song.subtitle}
          </span>
          <span style={{
            fontFamily: 'Space Mono', fontSize: '0.38rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: hovered ? '#c9a84c' : 'rgba(240,237,232,0.2)',
            transition: 'color 0.3s',
          }}>
            Watch →
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Music() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const fadeIn = (delay = '0s') => ({
    opacity:   inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(22px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  })

  return (
    <section id="music" ref={ref} style={{ position: 'relative', background: '#0e0e14', zIndex: 1, padding: '8rem 6rem 9rem' }}>

      {/* Ghost letter */}
      <div style={{ position: 'absolute', top: '15%', right: '-3%', fontFamily: 'Playfair Display', fontWeight: 900, fontSize: '22vw', color: 'rgba(201,168,76,0.018)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em' }}>M</div>

      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem', ...fadeIn() }}>
        <div style={{ width: '28px', height: '0.5px', background: '#c9a84c' }} />
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.44rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c' }}>Discography</span>
      </div>

      {/* Title + channel link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 900, fontSize: 'clamp(2.5rem,4.5vw,5.5rem)', lineHeight: 1, letterSpacing: '-0.02em', margin: 0, ...fadeIn('0.1s') }}>
          Latest<br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#c9a84c' }}>Music</span>
        </h2>

        <a
          href="https://youtube.com/@prathamsha_kya?si=d_DXznNs3e6VZIvo"
          target="_blank" rel="noopener noreferrer"
          data-hover
          style={{
            fontFamily: 'Space Mono', fontSize: '0.46rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#c9a84c', border: '0.5px solid rgba(201,168,76,0.3)',
            padding: '0.7rem 1.4rem', borderRadius: '100px',
            background: 'rgba(201,168,76,0.05)', backdropFilter: 'blur(8px)',
            transition: 'all 0.3s', ...fadeIn('0.15s'),
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.borderColor = '#c9a84c' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
        >
          View Channel →
        </a>
      </div>

      {/* Song cards — 2 column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.8rem', maxWidth: '860px' }}>
        {SONGS.map((song, i) => (
          <MusicCard key={song.id} song={song} index={i} inView={inView} />
        ))}
      </div>

      {/* Mobile hint */}
      <p style={{
        fontFamily: 'Space Mono', fontSize: '0.4rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'rgba(240,237,232,0.15)', marginTop: '2.5rem',
        ...fadeIn('0.3s'),
      }}>
        Tap to open · Opens in YouTube app on mobile
      </p>

      <style>{`
        @media (max-width: 640px) {
          #music { padding: 5rem 1.6rem 6rem !important; }
          #music .grid-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
