import { useEffect, useRef } from 'react'

export default function NightSky({ visible }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let stars=[], mx=0, my=0, t=0, animId
    function resize() {
      canvas.width=window.innerWidth; canvas.height=window.innerHeight
      stars=Array.from({length:Math.floor(canvas.width*canvas.height/3500)},()=>({
        x:Math.random()*canvas.width, y:Math.random()*canvas.height,
        r:Math.random()*1.3+0.15, speed:Math.random()*0.3+0.04,
        depth:Math.random()*3+1, alpha:Math.random()*0.5+0.18,
        phase:Math.random()*Math.PI*2,
      }))
    }
    const onM=e=>{mx=(e.clientX/innerWidth-0.5)*2;my=(e.clientY/innerHeight-0.5)*2}
    const onT=e=>{mx=(e.touches[0].clientX/innerWidth-0.5)*2;my=(e.touches[0].clientY/innerHeight-0.5)*2}
    window.addEventListener('mousemove',onM)
    window.addEventListener('touchmove',onT,{passive:true})
    window.addEventListener('resize',resize)
    resize()
    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height); t+=0.006
      stars.forEach(s=>{
        const px=((s.x+mx*s.depth*14)%canvas.width+canvas.width)%canvas.width
        const py=((s.y+my*s.depth*14+(typeof scrollY!=='undefined'?scrollY:0)*s.speed*0.07)%canvas.height+canvas.height)%canvas.height
        const tw=Math.sin(t*1.3+s.phase)*0.3+0.7
        ctx.beginPath();ctx.arc(px,py,s.r,0,Math.PI*2)
        ctx.fillStyle=s.depth>3.5?`rgba(201,168,76,${s.alpha*tw})`:`rgba(240,237,232,${s.alpha*tw})`
        ctx.fill()
      })
      animId=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ cancelAnimationFrame(animId);window.removeEventListener('mousemove',onM);window.removeEventListener('touchmove',onT);window.removeEventListener('resize',resize) }
  },[])
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{zIndex:0,opacity:visible?1:0,transition:'opacity 3s ease'}} />
}
