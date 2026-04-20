import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // Newer Lenis versions can handle raf automatically or we can keep manual
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
