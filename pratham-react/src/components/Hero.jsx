import { useEffect, useRef, useState } from 'react'

const SOCIALS = [
  { label:'Instagram', short:'IG', href:'https://www.instagram.com/_pratham_shakya/',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
  { label:'YouTube', short:'YT', href:'https://youtube.com/@prathamsha_kya?si=d_DXznNs3e6VZIvo',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg> },
  { label:'Spotify', short:'SP', href:'https://open.spotify.com/artist/3AZ0mvBTsM0yWehrcTirow',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12"><circle cx="12" cy="12" r="10"/><path d="M8 13.5c2.5-1 5.5-.8 7.5.5"/><path d="M7 10.5c3-1.3 7-1 9.5.8"/><path d="M9 16.5c1.8-.7 4-.6 5.5.3"/></svg> },
  { label:'Facebook', short:'FB', href:'https://www.facebook.com/pratham.shakya.2025',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
]

function useInView(ref, threshold = 0.25) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [ref, threshold])
  return v
}

export default function Hero({ revealed }) {
  const ref   = useRef(null)
  const inView = useInView(ref)

  const anim = (delay = '0s') => ({
    opacity:   revealed ? 1 : 0,
    transform: revealed ? 'none' : 'translateY(24px)',
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  })

  return (
    <section id="about" ref={ref} style={{ position:'relative', minHeight:'100vh', background:'#000', overflow:'hidden', zIndex:1 }}>

      {/* Subtle gold glow, top-left */}
      <div style={{ position:'absolute', top:'-15%', left:'-10%', width:'65%', height:'85%', background:'radial-gradient(ellipse, rgba(201,168,76,0.035) 0%, transparent 65%)', pointerEvents:'none' }} />

      {/* ── DESKTOP ── */}
      <div className="hidden md:grid" style={{ minHeight:'100vh', gridTemplateColumns:'1fr 1fr', alignItems:'center', gap:'6rem', padding:'8rem 7rem 7rem' }}>

        {/* Photo */}
        <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div style={{
            width:'min(380px,90%)', height:'min(500px,75vw)',
            borderRadius:'4px',
            overflow:'hidden', background:'#0a0a0a',
            boxShadow:'0 60px 120px rgba(0,0,0,0.9)',
            opacity: revealed ? 1 : 0,
            transition:'opacity 1.4s ease 0.2s',
          }}>
            <img
              src="/pratham.jpg" alt="Pratham Shakya"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%' }}
            />
            {/* faint gold tint overlay */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
          </div>

          {/* Location tag — minimal */}
          <div style={{
            position:'absolute', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)',
            display:'flex', alignItems:'center', gap:'0.5rem',
            ...anim('1.6s'),
          }}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#c9a84c', opacity:0.8 }} />
            <span style={{ fontFamily:'Space Mono', fontSize:'0.38rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(240,237,232,0.35)' }}>Kathmandu, Nepal</span>
          </div>
        </div>

        {/* Text */}
        <div style={{ position:'relative', zIndex:2 }}>

          {/* Eyebrow */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'2rem', ...anim('0.1s') }}>
            <div style={{ width:'24px', height:'0.5px', background:'#c9a84c', opacity:0.7 }} />
            <span style={{ fontFamily:'Space Mono', fontSize:'0.4rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)' }}>Singer · Songwriter</span>
          </div>

          {/* Name */}
          <h1 style={{ fontFamily:'Playfair Display', fontWeight:900, fontSize:'clamp(3.5rem,5.5vw,7rem)', lineHeight:0.9, letterSpacing:'-0.02em', marginBottom:'0.2rem', ...anim('0.25s') }}>
            Pratham
          </h1>
          <h1 style={{ fontFamily:'Playfair Display', fontWeight:400, fontStyle:'italic', fontSize:'clamp(3rem,5vw,6.5rem)', lineHeight:0.9, letterSpacing:'-0.01em', color:'#c9a84c', marginBottom:'2.8rem', ...anim('0.38s') }}>
            Shakya
          </h1>

          {/* Bio — honest, human, not robotic */}
          <p style={{ fontFamily:'DM Sans', fontWeight:300, fontSize:'0.9rem', lineHeight:2, color:'rgba(240,237,232,0.48)', maxWidth:'400px', marginBottom:'0.8rem', letterSpacing:'0.01em', ...anim('0.52s') }}>
            I'm just someone who grew up in Kathmandu with feelings too big for words — so I put them in songs instead.
          </p>
          <p style={{ fontFamily:'DM Sans', fontWeight:300, fontSize:'0.9rem', lineHeight:2, color:'rgba(240,237,232,0.35)', maxWidth:'400px', marginBottom:'3rem', letterSpacing:'0.01em', ...anim('0.62s') }}>
            Still early in the journey. Still figuring it out. But every song is real.
          </p>

          {/* Socials */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.55rem', ...anim('0.78s') }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'0.45rem',
                  fontFamily:'Space Mono', fontSize:'0.44rem', letterSpacing:'0.12em', textTransform:'uppercase',
                  color:'rgba(240,237,232,0.6)',
                  border:'0.5px solid rgba(255,255,255,0.1)',
                  padding:'0.55rem 1rem', borderRadius:'3px',
                  background:'rgba(255,255,255,0.03)',
                  transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='#c9a84c'; e.currentTarget.style.borderColor='rgba(201,168,76,0.4)'; e.currentTarget.style.background='rgba(201,168,76,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(240,237,232,0.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
              >
                {s.icon}{s.label}
              </a>
            ))}
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop:'4rem', display:'flex', alignItems:'center', gap:'1rem', ...anim('1s') }}>
            <div style={{ width:'1px', height:'42px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)', animation:'scrollPulse 2.5s ease-in-out infinite' }} />
            <span style={{ fontFamily:'Space Mono', fontSize:'0.36rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(240,237,232,0.2)' }}>Scroll</span>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex md:hidden flex-col" style={{ minHeight:'100svh', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src="/pratham.jpg" alt="Pratham Shakya" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 20%' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.98) 100%)' }} />
        </div>
        <div style={{
          position:'relative', zIndex:2, marginTop:'auto',
          padding:'2rem 1.8rem 3.5rem',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateY(30px)',
          transition: 'opacity 1.1s ease 0.35s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.7rem', marginBottom:'1rem' }}>
            <div style={{ width:'18px', height:'0.5px', background:'#c9a84c', opacity:0.7 }} />
            <span style={{ fontFamily:'Space Mono', fontSize:'0.38rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)' }}>Singer · Songwriter</span>
          </div>
          <h1 style={{ fontFamily:'Playfair Display', fontWeight:900, fontSize:'clamp(3rem,14vw,5rem)', lineHeight:0.88, marginBottom:'0.15rem' }}>Pratham</h1>
          <h1 style={{ fontFamily:'Playfair Display', fontStyle:'italic', fontWeight:400, fontSize:'clamp(2.5rem,12vw,4.5rem)', lineHeight:0.88, color:'#c9a84c', marginBottom:'1.4rem' }}>Shakya</h1>
          <p style={{ fontFamily:'DM Sans', fontWeight:300, fontSize:'0.72rem', lineHeight:1.9, color:'rgba(240,237,232,0.55)', marginBottom:'2rem' }}>
            I'm just someone who grew up in Kathmandu with feelings too big for words — so I put them in songs instead.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', fontFamily:'Space Mono', fontSize:'0.44rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(240,237,232,0.7)', border:'0.5px solid rgba(255,255,255,0.15)', padding:'0.5rem 0.9rem', borderRadius:'3px', background:'rgba(255,255,255,0.07)', backdropFilter:'blur(14px)' }}>
                {s.icon}{s.short}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
      `}</style>
    </section>
  )
}
