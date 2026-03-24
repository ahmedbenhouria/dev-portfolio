'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { AnimatePresence, useScroll } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import Navbar from '@/components/Header/Navbar'
import Preloader from './components/Preloader'
import Hero from '@/components/Landing'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function App() {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ['start end', 'start start']
  })
  const [isLoading, setIsLoading] = useState(true)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // Register GSAP plugins
  useGSAP(() => {
    gsap.registerPlugin(SplitText)
  })

  useEffect(() => {
    // Wait minimum 2 seconds before allowing preloader to hide
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
      window.scrollTo(0, 0)
      document.body.style.cursor = 'default'
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset

    // Hide preloader only when we've reached 0,0 AND min time has passed
    if (scrollX === 0 && scrollY === 0) {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Only start tracking scroll after minimum time has elapsed
    if (!minTimeElapsed) return

    let debounceTimer: NodeJS.Timeout | null = null

    const debouncedScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        handleScroll()
      }, 100) // Debounce scroll checks to 100ms
    }

    // Add scroll listener
    window.addEventListener('scroll', debouncedScroll, { passive: true })

    // Check initial position immediately
    handleScroll()

    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      if (debounceTimer) clearTimeout(debounceTimer)
    }
  }, [minTimeElapsed, handleScroll])

  // Initialize Lenis with proper cleanup
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenis.destroy()
    }
  }, [])

  return (
    <main className='bg-[#DDDED7]'>
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

      <Contact />
    </main>
  )
}
