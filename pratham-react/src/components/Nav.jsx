import { useEffect, useState } from 'react'
import AudioVibes from './AudioVibes'

const LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Music',   href: '#music'   },
  { label: 'Press',   href: '#press'   },
  { label: 'Connect', href: '#connect' },
]

export default function Nav({ revealed }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on escape
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '62px',
        background:    scrolled ? 'rgba(6,6,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(24px)' : 'none',
        borderBottom:   scrolled ? '0.5px solid rgba(201,168,76,0.07)' : 'none',
        boxShadow:      scrolled ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        opacity:    revealed ? 1 : 0,
        transform:  revealed ? 'none' : 'translateY(-12px)',
      }}>

        {/* Logo */}
        <a href="#about" data-hover style={{
          fontFamily: 'Playfair Display', fontWeight: 700,
          fontSize: '1.1rem', letterSpacing: '0.01em',
          color: '#f0ede8', display: 'flex', alignItems: 'center', gap: '0.7rem',
        }}>
          <span>PS</span>
          <AudioVibes />
        </a>

        {/* Desktop links */}
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2.5rem', margin: 0, padding: 0 }} className="hidden md:flex">
          {LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} className="link-underline" data-hover style={{
                fontFamily: 'Space Mono', fontSize: '0.48rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(240,237,232,0.45)', transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#f0ede8'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.45)'}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://open.spotify.com/artist/3AZ0mvBTsM0yWehrcTirow"
          target="_blank" rel="noopener noreferrer"
          data-hover
          className="hidden md:flex"
          style={{
            alignItems: 'center', gap: '0.5rem',
            fontFamily: 'Space Mono', fontSize: '0.44rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#c9a84c',
            border: '0.5px solid rgba(201,168,76,0.3)',
            padding: '0.5rem 1.1rem', borderRadius: '100px',
            background: 'rgba(201,168,76,0.06)', backdropFilter: 'blur(8px)',
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(201,168,76,0.14)'; e.currentTarget.style.borderColor='#c9a84c'; e.currentTarget.style.transform='translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(201,168,76,0.06)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.3)'; e.currentTarget.style.transform='none' }}
        >
          ♪  Listen
        </a>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col justify-center bg-transparent border-none p-2"
          style={{ gap: '5px', cursor: 'none', width: '36px' }}
          onClick={() => setOpen(o => !o)}
          data-hover
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.5px',
              background: '#f0ede8', borderRadius: '1px',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              transformOrigin: 'center',
              transform:
                open && i === 0 ? 'translateY(6.5px) rotate(45deg)' :
                open && i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 490,
        background: 'rgba(6,6,10,0.97)',
        backdropFilter: 'blur(40px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), visibility 0.45s',
      }}>
        {LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            data-hover
            style={{
              fontFamily: 'Playfair Display', fontWeight: 700,
              fontSize: 'clamp(2.8rem, 11vw, 5.5rem)',
              color: '#f0ede8', letterSpacing: '-0.01em',
              opacity: open ? 1 : 0,
              transform: open ? 'none' : 'translateY(24px)',
              transition: `all 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              lineHeight: 1.15,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
            onMouseLeave={e => e.currentTarget.style.color = '#f0ede8'}
          >
            {l.label}
          </a>
        ))}

        {/* Social row inside mobile menu */}
        <div style={{
          display: 'flex', gap: '2rem', marginTop: '2.5rem',
          opacity: open ? 1 : 0,
          transform: open ? 'none' : 'translateY(14px)',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1) 0.35s',
        }}>
          {[
            ['IG', 'https://www.instagram.com/_pratham_shakya/'],
            ['YT', 'https://youtube.com/@prathamsha_kya?si=d_DXznNs3e6VZIvo'],
            ['SP', 'https://open.spotify.com/artist/3AZ0mvBTsM0yWehrcTirow'],
            ['FB', 'https://www.facebook.com/pratham.shakya.2025'],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-hover
              style={{
                fontFamily: 'Space Mono', fontSize: '0.5rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(240,237,232,0.3)', transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.3)'}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
