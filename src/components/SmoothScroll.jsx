import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // Adjust this for scrolling smoothness (lower is smoother)
      wheelMultiplier: 1,
      smoothWheel: true,
      autoRaf: true, 
    })

    // Add lenis class to html for CSS
    document.documentElement.classList.add('lenis')

    // Attach to window for global access (e.g. from scrollAnimations)
    window.lenis = lenis

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      window.lenis = null
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  return null
}

export default SmoothScroll
