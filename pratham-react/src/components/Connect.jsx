import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { label:'Instagram', href:'https://www.instagram.com/_pratham_shakya/',      desc:'Day-to-day moments' },
  { label:'YouTube',   href:'https://youtube.com/@prathamsha_kya?si=d_DXznNs3e6VZIvo', desc:'Watch the songs' },
  { label:'Spotify',   href:'https://open.spotify.com/artist/3AZ0mvBTsM0yWehrcTirow',  desc:'Stream anywhere' },
  { label:'Facebook',  href:'https://www.facebook.com/pratham.shakya.2025',    desc:'Stay in the loop' },
]

export default function Connect() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.2 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  const fade = (delay = '0s') => ({
    opacity:   inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(20px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  })

  return (
    <section id="connect" ref={ref} style={{ position:'relative', background:'#000', zIndex:1, overflow:'hidden', padding:'8rem 7rem 9rem' }}>

      {/* Faint gold glow */}
      <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)', width:'60%', height:'60%', background:'radial-gradient(ellipse, rgba(201,168,76,0.03) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'820px' }}>

        {/* Label */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1.2rem', ...fade() }}>
          <div style={{ width:'24px', height:'0.5px', background:'#c9a84c', opacity:0.7 }} />
          <span style={{ fontFamily:'Space Mono', fontSize:'0.4rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)' }}>Come find me</span>
        </div>

        {/* Heading — warm and human */}
        <h2 style={{ fontFamily:'Playfair Display', fontWeight:900, fontSize:'clamp(2.5rem,4.5vw,5.5rem)', lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:'1.2rem', ...fade('0.1s') }}>
          Say hi.<br />
          <span style={{ fontStyle:'italic', fontWeight:400, color:'#c9a84c' }}>I don't bite.</span>
        </h2>

        <p style={{ fontFamily:'DM Sans', fontWeight:300, fontSize:'0.88rem', lineHeight:2, color:'rgba(240,237,232,0.4)', maxWidth:'460px', marginBottom:'4rem', ...fade('0.2s') }}>
          Follow along wherever you are. I'm still building — and honestly, having even a few people actually listen means more than I can say.
        </p>

        {/* Links — simple list style, not grid-card overload */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {LINKS.map((l, i) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'1.4rem 0',
                borderBottom:'0.5px solid rgba(255,255,255,0.06)',
                textDecoration:'none',
                ...fade(`${0.25 + i * 0.08}s`),
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.08}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.08}s, color 0.3s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.link-label').style.color = '#c9a84c'
                e.currentTarget.querySelector('.link-arrow').style.transform = 'translateX(4px)'
                e.currentTarget.querySelector('.link-arrow').style.color = '#c9a84c'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.link-label').style.color = '#f0ede8'
                e.currentTarget.querySelector('.link-arrow').style.transform = 'none'
                e.currentTarget.querySelector('.link-arrow').style.color = 'rgba(240,237,232,0.2)'
              }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
                <span style={{ fontFamily:'Space Mono', fontSize:'0.38rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(240,237,232,0.2)', width:'20px' }}>0{i+1}</span>
                <span className="link-label" style={{ fontFamily:'Playfair Display', fontWeight:700, fontSize:'clamp(1.2rem,2vw,1.6rem)', color:'#f0ede8', transition:'color 0.3s' }}>{l.label}</span>
                <span style={{ fontFamily:'Space Mono', fontSize:'0.38rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(240,237,232,0.25)' }}>{l.desc}</span>
              </div>
              <span className="link-arrow" style={{ fontSize:'1rem', color:'rgba(240,237,232,0.2)', transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)' }}>→</span>
            </a>
          ))}
        </div>

        {/* Spotify CTA */}
        <div style={{ marginTop:'3.5rem', ...fade('0.6s') }}>
          <a href="https://open.spotify.com/artist/3AZ0mvBTsM0yWehrcTirow" target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:'0.7rem',
              fontFamily:'Space Mono', fontSize:'0.46rem', letterSpacing:'0.2em', textTransform:'uppercase',
              color:'#000', background:'#c9a84c',
              padding:'0.9rem 2rem', borderRadius:'3px',
              boxShadow:'0 0 40px rgba(201,168,76,0.2)',
              transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 16px 50px rgba(201,168,76,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 0 40px rgba(201,168,76,0.2)' }}
          >
            ♪ &nbsp; Listen on Spotify
          </a>
        </div>
      </div>
    </section>
  )
}
