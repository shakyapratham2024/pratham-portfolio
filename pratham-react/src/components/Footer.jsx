export default function Footer() {
  return (
    <footer style={{ background:'#06060a', borderTop:'0.5px solid rgba(255,255,255,0.05)', padding:'2.5rem 7rem' }}>
      <div className="footer-inner-flex" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.2rem' }}>

        <div style={{ fontFamily:'Playfair Display', fontStyle:'italic', fontWeight:400, fontSize:'1rem', color:'rgba(240,237,232,0.18)' }}>
          Pratham Shakya
        </div>

        <div style={{ fontFamily:'Space Mono', fontSize:'0.38rem', letterSpacing:'0.1em', color:'rgba(240,237,232,0.1)' }}>
          Kathmandu, Nepal · {new Date().getFullYear()}
        </div>

        <div style={{ display:'flex', gap:'1.8rem' }}>
          {[
            ['IG','https://www.instagram.com/_pratham_shakya/'],
            ['YT','https://youtube.com/@prathamsha_kya?si=d_DXznNs3e6VZIvo'],
            ['SP','https://open.spotify.com/artist/3AZ0mvBTsM0yWehrcTirow'],
            ['FB','https://www.facebook.com/pratham.shakya.2025'],
          ].map(([l,h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'Space Mono', fontSize:'0.4rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(240,237,232,0.16)', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.color='#c9a84c'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(240,237,232,0.16)'; e.currentTarget.style.transform='none' }}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
