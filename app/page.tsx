'use client'

import { useEffect, useRef, useState } from 'react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { AnimatePresence, useScroll } from 'framer-motion'
import ReactLenis from 'lenis/react'
import Navbar from '@/components/Header/Navbar'
import Preloader from './components/Preloader'
import Hero from '@/components/Landing'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'

gsap.registerPlugin(SplitText)

export default function App() {
  const triggerRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ['start end', 'start start']
  })
  const [isLoading, setIsLoading] = useState(true)

  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  useEffect(() => {
    // Wait minimum 2 seconds before allowing preloader to hide
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
      window.scrollTo(0, 0)
      document.body.style.cursor = 'default'
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Only start tracking scroll after minimum time has elapsed
    if (!minTimeElapsed) return

    const handleScroll = () => {
      const scrollX = window.scrollX || window.pageXOffset
      const scrollY = window.scrollY || window.pageYOffset

      // Hide preloader only when we've reached 0,0 AND min time has passed
      if (scrollX === 0 && scrollY === 0) {
        setIsLoading(false)
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)

    // Check initial position immediately
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [minTimeElapsed])

  // Lenis options: increase lerp to reduce micro-updates; check your Lenis version for exact option names
  const lenisOptions = { smooth: true, lerp: 0.12 } // coarser interpolation for smoother updates

  return (
    <ReactLenis root className='bg-[#DDDED7]'>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Navbar isLoading={isLoading} />

      {/* Hero reacts to scroll */}
      <Hero scrollProgress={scrollYProgress} isLoading={isLoading} />

      {/* This is the trigger */}
      <div ref={triggerRef}>
        <Services scrollYProgress={scrollYProgress} />
      </div>
      <Portfolio />

      <About />

      <div className='relative z-30 bg-indigo-500 p-20'>
        <h3 className='text-center text-3xl font-bold text-white'>
          More Content Below
        </h3>
      </div>
    </ReactLenis>
  )
}
