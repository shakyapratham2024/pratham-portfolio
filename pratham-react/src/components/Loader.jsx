import { useEffect, useRef } from 'react'

const DURATION = 1800

export default function Loader({ onDone }) {
  const canvasRef = useRef(null)
  const barRef    = useRef(null)
  const loaderRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const bar    = barRef.current
    const loader = loaderRef.current
    if (!canvas || !bar || !loader) return
    const ctx = canvas.getContext('2d')
    let W, H, startTime = null, animId = null, frame = 0
    let startX, startY, landX, landY, cp1x, cp1y, cp2x, cp2y

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    function initPath() {
      startX = W*(0.1+Math.random()*0.8); startY=-120; landX=W*0.5; landY=H*0.42
      const side = startX<landX?1:-1
      cp1x=startX+side*W*0.35; cp1y=H*0.18; cp2x=landX-side*W*0.22; cp2y=H*0.36
    }
    resize(); initPath()
    const onR = () => { resize(); initPath() }
    window.addEventListener('resize', onR)

    const bez  = (t,p0,p1,p2,p3)=>{ const u=1-t; return u*u*u*p0+3*u*u*t*p1+3*u*t*t*p2+t*t*t*p3 }
    const bezT = (t,p0,p1,p2,p3)=>{ const u=1-t; return 3*u*u*(p1-p0)+6*u*t*(p2-p1)+3*t*t*(p3-p2) }

    function drawLeaf(alpha,sc) {
      ctx.save(); ctx.scale(sc,sc)
      ctx.beginPath(); ctx.moveTo(0,0)
      ctx.bezierCurveTo(38,-24,46,-74,0,-114)
      ctx.bezierCurveTo(-46,-74,-38,-24,0,0); ctx.closePath()
      const fill=ctx.createLinearGradient(0,0,0,-114)
      fill.addColorStop(0,`rgba(220,185,88,${alpha})`); fill.addColorStop(0.4,`rgba(185,148,58,${alpha})`); fill.addColorStop(1,`rgba(135,104,35,${alpha*0.85})`)
      ctx.fillStyle=fill; ctx.fill()
      ctx.strokeStyle=`rgba(80,55,12,${alpha*0.25})`; ctx.lineWidth=0.8; ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(2,-38,1,-76,0,-114)
      ctx.strokeStyle=`rgba(80,55,12,${alpha*0.45})`; ctx.lineWidth=1.2; ctx.stroke()
      ctx.strokeStyle=`rgba(80,55,12,${alpha*0.22})`; ctx.lineWidth=0.7
      [[0.18,18],[0.35,26],[0.52,26],[0.68,20],[0.82,13]].forEach(([t,sp])=>{
        const by=-114*t
        ctx.beginPath();ctx.moveTo(0,by);ctx.quadraticCurveTo(sp*0.5,by-10,sp,by-20);ctx.stroke()
        ctx.beginPath();ctx.moveTo(0,by);ctx.quadraticCurveTo(-sp*0.5,by-10,-sp,by-20);ctx.stroke()
      })
      ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(5,15,4,30,2,44)
      ctx.strokeStyle=`rgba(100,72,18,${alpha*0.7})`;ctx.lineWidth=1.6;ctx.lineCap='round';ctx.stroke()
      ctx.font='bold 24px serif';ctx.textAlign='center';ctx.textBaseline='middle'
      ctx.fillStyle=`rgba(65,44,8,${alpha*0.85})`;ctx.fillText('Hi',0,-57)
      ctx.restore()
    }

    const dust=Array.from({length:22},()=>({x:Math.random(),y:Math.random(),r:Math.random()*0.6+0.1,a:Math.random()*0.08+0.02,p:Math.random()*Math.PI*2}))
    function drawDust(f){ dust.forEach(d=>{const tw=Math.sin(f*0.014+d.p)*0.2+0.8;ctx.beginPath();ctx.arc(d.x*W,d.y*H,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(201,168,76,${d.a*tw})`;ctx.fill()}) }

    function dismiss() {
      cancelAnimationFrame(animId)
      const lc=loader.querySelector('.lc')
      if(lc){lc.style.transition='opacity 0.6s ease';lc.style.opacity='0'}
      setTimeout(()=>{
        loader.style.transition='opacity 1s cubic-bezier(0.16,1,0.3,1)';loader.style.opacity='0'
        setTimeout(()=>onDone(),250)
        setTimeout(()=>{if(loader.parentNode)loader.remove()},1200)
      },550)
    }

    function animate(ts) {
      if(!startTime) startTime=ts
      const p=Math.min((ts-startTime)/DURATION,1)
      bar.style.width=(1-Math.pow(1-p,3))*100+'%'
      ctx.clearRect(0,0,W,H); frame++; drawDust(frame)
      let lx,ly,angle,sc,alpha
      if(p<0.88){
        const t=p/0.88,et=t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2
        lx=bez(et,startX,cp1x,cp2x,landX);ly=bez(et,startY,cp1y,cp2y,landY)
        const tx=bezT(et,startX,cp1x,cp2x,landX),ty=bezT(et,startY,cp1y,cp2y,landY)
        angle=Math.atan2(ty,tx)-Math.PI/2+Math.sin(et*Math.PI*2.5)*0.32
        sc=0.92+Math.sin(et*Math.PI)*0.22; alpha=Math.min(t*5,1)
      } else {
        const t2=(p-0.88)/0.12,settle=1-Math.pow(1-t2,3)
        lx=landX;ly=landY+Math.sin(t2*Math.PI)*12
        const et1=1,tx=bezT(et1,startX,cp1x,cp2x,landX),ty=bezT(et1,startY,cp1y,cp2y,landY)
        const endAng=Math.atan2(ty,tx)-Math.PI/2+Math.sin(Math.PI*2.5)*0.32
        angle=endAng*(1-settle)+0.12*settle; sc=1.14-settle*0.12; alpha=1
      }
      ctx.save();ctx.translate(lx,ly+sc*56);ctx.scale(1.5,0.18)
      const shd=ctx.createRadialGradient(0,0,0,0,0,46*sc)
      shd.addColorStop(0,`rgba(0,0,0,${0.3*alpha})`);shd.addColorStop(1,'rgba(0,0,0,0)')
      ctx.beginPath();ctx.arc(0,0,46*sc,0,Math.PI*2);ctx.fillStyle=shd;ctx.fill();ctx.restore()
      ctx.save();ctx.translate(lx,ly);ctx.rotate(angle);drawLeaf(alpha,sc);ctx.restore()
      p<1?(animId=requestAnimationFrame(animate)):dismiss()
    }

    const fallback=setTimeout(()=>dismiss(),7000)
    animId=requestAnimationFrame(animate)
    return ()=>{ cancelAnimationFrame(animId);clearTimeout(fallback);window.removeEventListener('resize',onR) }
  }, [onDone])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'repeating-linear-gradient(90deg,rgba(201,168,76,0.025) 0px,transparent 1px,transparent calc(100%/12))',backgroundSize:'calc(100%/12) 100%'}} />
      <div className="lc relative z-10 flex flex-col items-center gap-10 text-center px-8" style={{opacity:0,animation:'fadeIn 0.8s ease 0.3s both'}}>
        <div style={{fontSize:'0.42rem',letterSpacing:'0.6em',textTransform:'uppercase',color:'rgba(240,237,232,0.22)',animation:'fadeIn 1s ease 0.5s both',opacity:0,fontFamily:'Space Mono'}}>
          Kathmandu, Nepal
        </div>
        <div className="flex flex-col items-center" style={{gap:'0.2rem',overflow:'hidden'}}>
          <div style={{fontFamily:'Playfair Display',fontWeight:900,fontSize:'clamp(2.8rem,8vw,6.5rem)',letterSpacing:'-0.02em',lineHeight:0.9,color:'#f0ede8',animation:'slideUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both',opacity:0}}>PRATHAM</div>
          <div style={{fontFamily:'Playfair Display',fontStyle:'italic',fontWeight:400,fontSize:'clamp(1.6rem,4vw,3.8rem)',letterSpacing:'0.05em',color:'#c9a84c',animation:'slideUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s both',opacity:0}}>Shakya</div>
        </div>
        <div style={{fontFamily:'Space Mono',fontSize:'0.48rem',letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(240,237,232,0.28)',animation:'fadeIn 1s ease 1s both',opacity:0}}>Singer · Songwriter</div>
        <div style={{width:'clamp(140px,28vw,260px)',height:'1px',background:'rgba(240,237,232,0.07)',overflow:'hidden',animation:'fadeIn 0.6s ease 1.2s both',opacity:0}}>
          <div ref={barRef} style={{height:'100%',width:'0%',background:'linear-gradient(90deg,#c9a84c,rgba(255,255,255,0.95))',boxShadow:'0 0 14px rgba(201,168,76,0.8)',transition:'width 0.05s linear'}} />
        </div>
      </div>
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      `}</style>
    </div>
  )
}
