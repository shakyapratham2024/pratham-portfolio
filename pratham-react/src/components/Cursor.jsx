import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx=0, my=0, rx=0, ry=0, hovering=false

    const onMove = e => { mx=e.clientX; my=e.clientY }
    window.addEventListener('mousemove', onMove)

    const els = () => document.querySelectorAll('a,button,[data-hover]')
    const addHover = () => {
      els().forEach(el => {
        el.addEventListener('mouseenter', () => { hovering=true; dot.classList.add('hovering'); ring.classList.add('hovering') })
        el.addEventListener('mouseleave', () => { hovering=false; dot.classList.remove('hovering'); ring.classList.remove('hovering') })
      })
    }
    addHover()

    let raf
    function loop() {
      dot.style.left  = mx+'px'
      dot.style.top   = my+'px'
      rx += (mx-rx)*0.1
      ry += (my-ry)*0.1
      ring.style.left = rx+'px'
      ring.style.top  = ry+'px'
      raf = requestAnimationFrame(loop)
    }
    loop()

    // Re-apply on DOM changes
    const obs = new MutationObserver(addHover)
    obs.observe(document.body, { childList:true, subtree:true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
