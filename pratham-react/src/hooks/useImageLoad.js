import { useEffect } from 'react'

export function useImageLoad() {
  useEffect(() => {
    const imgs = document.querySelectorAll('img')
    imgs.forEach(img => {
      if (img.complete) img.classList.add('loaded')
      else {
        img.addEventListener('load',  () => img.classList.add('loaded'))
        img.addEventListener('error', () => img.classList.add('loaded'))
      }
    })
  })
}
