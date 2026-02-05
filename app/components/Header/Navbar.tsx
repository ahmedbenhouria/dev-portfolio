'use client'

import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { Motion3DLabel } from './Motion3DLabel'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { getCalApi } from '@calcom/embed-react'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const navItems = [
  { label: 'SERVICES', href: '#services' },
  { label: 'WORKS', href: '#works' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' }
]

const Navbar = ({ isLoading }: { isLoading: boolean }) => {
  const burger = useRef(null)

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href)
    if (!target) return

    const header = document.querySelector('header') as HTMLElement | null
    const headerHeight = header?.offsetHeight ?? 0

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerHeight

    gsap.to(window, {
      duration: 0.2,
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      ease: 'power2.inOut'
    })
  }

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'project-intro-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to(burger.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,

        onLeave: () => {
          gsap.to(burger.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out'
          })
        },

        onEnterBack: () => {
          gsap.to(burger.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power1.out'
          })
        }
      }
    })

    // Hide burger on contact section
    gsap.to(burger.current, {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top center',
        end: 'bottom bottom',
        onEnter: () => {
          gsap.to(burger.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power1.out'
          })
        },
        onLeave: () => {
          gsap.to(burger.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out'
          })
        },
        onEnterBack: () => {
          gsap.to(burger.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power1.out'
          })
        },
        onLeaveBack: () => {
          gsap.to(burger.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out'
          })
        }
      }
    })
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    // Add padding to account for fixed navbar on mobile
    const updatePadding = () => {
      const navbar = document.querySelector('header')
      if (navbar && isMobile) {
        const navHeight = navbar.offsetHeight
        document.body.style.paddingTop = `${navHeight}px`
      } else {
        document.body.style.paddingTop = '0'
      }
    }

    updatePadding()
    window.addEventListener('resize', updatePadding)
    return () => window.removeEventListener('resize', updatePadding)
  }, [mounted, isMobile])

  const navbarVariants = {
    hidden: {
      y: -100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const
      }
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Top Navbar - Fixed on mobile, hidden on scroll on desktop */}
      <AnimatePresence>
        {(!scrolled || isMobile) && !isLoading && (
          <motion.header
            variants={navbarVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed top-0 z-40 w-full selection:text-[#32297A] md:z-40'
          >
            <nav
              className={`relative flex items-center justify-between border-b px-4 py-2 transition-all duration-300 md:border-b-0 md:bg-transparent md:px-8 md:py-10 ${
                scrolled && isMobile
                  ? 'border-b-white/10 bg-[#DDDED7]/80 shadow-lg backdrop-blur-md'
                  : 'border-b-transparent bg-[#DDDED7] md:bg-transparent'
              }`}
            >
              {/* Mobile: Hamburger menu on left */}
              <motion.button
                onClick={() => setIsOpen(true)}
                className='p-2 text-[#1b1915] md:hidden'
                aria-label='Open menu'
              >
                <Menu className='h-6 w-6' />
              </motion.button>

              {/* Mobile: Brand name centered */}
              <div className='ml-4 md:hidden'>
                <h1
                  className={`text-[14px] font-semibold tracking-wider transition-colors duration-300 ${
                    scrolled ? 'text-[#1b1915]' : 'text-[#1b1915]'
                  }`}
                >
                  AHMED BEN HOURIA
                </h1>
              </div>

              {/* Desktop: Centered nav items */}
              <ul className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex'>
                {navItems.map(item => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={e => {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }}
                      className='group relative block px-6 text-[16px] font-semibold text-[#171717] transition-colors hover:text-[#171717ad]'
                    >
                      <Motion3DLabel label={item.label} />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right side: Contact button (mobile only) */}
              <div className='ml-auto flex items-center gap-3 md:hidden'>
                <button
                  data-cal-namespace='project-intro-call'
                  data-cal-link='ahmed-ben-houria-h4fkio/project-intro-call'
                  data-cal-config='{"layout":"month_view"}'
                  className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                    scrolled
                      ? 'bg-[#171717] text-white shadow-md hover:bg-[#171717e6]'
                      : 'bg-[#171717] text-white hover:bg-[#171717e6]'
                  }`}
                >
                  Let's Talk!
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Floating Menu Button - Only visible when scrolled (hidden on mobile) */}
      <button
        ref={burger}
        onClick={() => setIsOpen(true)}
        className='fixed top-6 right-6 z-50 hidden scale-0 rounded-full bg-white p-3 text-black shadow-lg transition-shadow hover:shadow-xl md:block'
        aria-label='Open menu'
      >
        <Menu className='h-6 w-6' />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1]
              }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 z-100 bg-black/50 backdrop-blur-sm'
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'tween',
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1]
              }}
              className='fixed top-0 right-0 bottom-0 z-101 w-full bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] md:w-[35%] md:border-l md:border-white/10'
            >
              {/* Header */}
              <div className='flex items-center justify-between border-b border-white/10 px-6 py-6 md:px-8'>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                >
                  <h2 className='text-2xl font-bold text-white md:text-xl'>
                    Menu
                  </h2>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className='rounded-full p-3 text-white transition-colors hover:bg-white/10 active:bg-white/20'
                  aria-label='Close menu'
                >
                  <X className='h-6 w-6' />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <nav className='px-4 py-8 md:px-6'>
                <ul className='space-y-3'>
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={e => {
                          e.preventDefault()
                          setIsOpen(false)
                          scrollToSection(item.href)
                        }}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.95 }}
                        className='group relative flex items-center justify-between rounded-2xl bg-gradient-to-r from-white/5 to-white/0 px-6 py-5 text-2xl font-semibold text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 active:bg-white/15 md:text-lg'
                      >
                        <span>{item.label}</span>
                        <motion.span
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 5, opacity: 1 }}
                          className='text-white/60 transition-colors group-hover:text-white/100'
                        >
                          →
                        </motion.span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className='absolute right-0 bottom-0 left-0 border-t border-white/10 px-6 py-6 text-center backdrop-blur-sm md:relative md:mt-auto md:border-t md:border-white/10'
              >
                <p className='text-xs leading-relaxed text-white/50'>
                  © 2026 Ahmed Ben Houria
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
