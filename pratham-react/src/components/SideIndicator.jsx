import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'about',   label: 'About'   },
  { id: 'press',   label: 'Press'   },
  { id: 'music',   label: 'Music'   },
  { id: 'connect', label: 'Connect' },
]

export default function SideIndicator({ revealed }) {
  const [active, setActive] = useState('about')

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [revealed])

  if (!revealed) return null

  return (
    <div style={{
      position: 'fixed', right: '2rem', top: '50%',
      transform: 'translateY(-50%)', zIndex: 490,
      display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'flex-end',
    }}
    className="hidden lg:flex"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            data-hover
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
            title={label}
          >
            <span style={{
              fontFamily: 'Space Mono', fontSize: '0.36rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: isActive ? '#c9a84c' : 'rgba(240,237,232,0.25)',
              transition: 'all 0.4s', opacity: isActive ? 1 : 0,
              transform: isActive ? 'none' : 'translateX(4px)',
            }}>
              {label}
            </span>
            <div style={{
              width: isActive ? '24px' : '8px', height: '1px',
              background: isActive ? '#c9a84c' : 'rgba(240,237,232,0.2)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              borderRadius: '1px',
            }} />
          </a>
        )
      })}
    </div>
  )
}
