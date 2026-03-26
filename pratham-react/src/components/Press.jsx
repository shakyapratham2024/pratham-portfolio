import { useEffect, useRef, useState } from 'react'

const MARQUEE = ['Singer','·','Songwriter','·','Kathmandu','·','Nepal','·','Independent','·','Original','·']

export default function Press() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  const fade = (delay = '0s') => ({
    opacity:   inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(20px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  })

  return (
    <section id="press" ref={ref} style={{ position:'relative', background:'#06060a', zIndex:1, overflow:'hidden' }}>

      {/* Scrolling tape */}
      <div style={{ borderTop:'0.5px solid rgba(201,168,76,0.08)', borderBottom:'0.5px solid rgba(201,168,76,0.08)', padding:'0.8rem 0', overflow:'hidden' }}>
        <div style={{ display:'flex', animation:'marquee 22s linear infinite', whiteSpace:'nowrap' }}>
          {[...MARQUEE,...MARQUEE,...MARQUEE].map((item,i) => (
            <span key={i} style={{ fontFamily:'Space Mono', fontSize:'0.4rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(201,168,76,0.3)', padding:'0 1.6rem' }}>{item}</span>
          ))}
        </div>
      </div>

      <div style={{ padding:'7rem 7rem 8rem' }}>

        {/* Label */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1.2rem', ...fade() }}>
          <div style={{ width:'24px', height:'0.5px', background:'#c9a84c', opacity:0.7 }} />
          <span style={{ fontFamily:'Space Mono', fontSize:'0.4rem', letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)' }}>A little about the journey</span>
        </div>

        {/* Heading — honest */}
        <h2 style={{ fontFamily:'Playfair Display', fontWeight:900, fontSize:'clamp(2.2rem,4vw,4.5rem)', lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:'1.5rem', maxWidth:'640px', ...fade('0.1s') }}>
          Still at the start —<br />
          <span style={{ fontStyle:'italic', fontWeight:400, color:'#c9a84c' }}>and that's okay.</span>
        </h2>

        <p style={{ fontFamily:'DM Sans', fontWeight:300, fontSize:'0.88rem', lineHeight:2, color:'rgba(240,237,232,0.42)', maxWidth:'520px', marginBottom:'5rem', ...fade('0.2s') }}>
          No big label. No million streams. Just a kid from Kathmandu who writes songs because he has to — because keeping those feelings locked up never worked. If even one song hits different for you, that's everything.
        </p>

        {/* Three honest cards */}
        <div className="press-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'rgba(255,255,255,0.04)' }}>
          {[
            { num:'2', label:'Songs out', note:'More coming soon' },
            { num:'100%', label:'Independent', note:'No label, no compromise' },
            { num:'∞', label:'More to say', note:'The music never stops' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding:'2.5rem 2rem', background:'#06060a',
              ...fade(`${0.15 + i * 0.1}s`),
            }}>
              <div style={{ fontFamily:'Playfair Display', fontWeight:700, fontSize:'clamp(2rem,3vw,3.2rem)', color:'#c9a84c', lineHeight:1, marginBottom:'0.5rem' }}>{s.num}</div>
              <div style={{ fontFamily:'DM Sans', fontWeight:500, fontSize:'0.78rem', color:'rgba(240,237,232,0.6)', marginBottom:'0.3rem' }}>{s.label}</div>
              <div style={{ fontFamily:'Space Mono', fontSize:'0.38rem', letterSpacing:'0.1em', color:'rgba(240,237,232,0.22)', textTransform:'uppercase' }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}`}</style>
    </section>
  )
}
