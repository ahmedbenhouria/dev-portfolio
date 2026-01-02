'use client'

import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { Motion3DLabel } from './Motion3DLabel'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const navItems = [
  { label: 'SERVICES', href: '#services' },
  { label: 'PORTFOLIO', href: '#portfolio' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' }
]

const Navbar = ({ isLoading }: { isLoading: boolean }) => {
  const burger = useRef(null)

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href)
    if (!target) return

    const targetPosition = target.getBoundingClientRect().top + window.scrollY

    gsap.to(window, {
      duration: 0.2, // Longer duration for smoother experience
      scrollTo: {
        y: targetPosition,
        autoKill: false // Prevent interruption
      },
      ease: 'power2.inOut' // Smoother easing
    })
  }

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
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

  const navbarVariants = {
    hidden: {
      y: -100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: isLoading ? 2.5 : 0,
        duration: isLoading ? 1.2 : 0.8,
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
      {/* Top Navbar */}
      <AnimatePresence>
        {!scrolled && (
          <motion.header
            variants={navbarVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed z-50 w-full selection:text-[#32297A]'
          >
            <nav className='relative flex items-center px-6 py-10 md:px-8'>
              {/* Centered nav items */}
              <ul className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex'>
                {navItems.map(item => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={e => {
                        e.preventDefault
                        scrollToSection(item.href)
                      }}
                      className='group relative block px-6 text-[16px] font-semibold text-[#171717] transition-colors hover:text-[#171717ad]'
                    >
                      <Motion3DLabel label={item.label} />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right side (mobile menu button) */}
              <div className='ml-auto flex items-center gap-4'>
                <motion.button
                  onClick={() => setIsOpen(true)}
                  className='p-2 text-[#171717] md:hidden'
                  aria-label='Open menu'
                >
                  <Menu className='h-6 w-6' />
                </motion.button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Floating Menu Button - Only visible when scrolled */}
      <button
        ref={burger}
        onClick={() => setIsOpen(true)}
        className='fixed top-6 right-6 z-50 scale-0 rounded-full bg-white p-3 text-black shadow-lg transition-shadow hover:shadow-xl'
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
              className='fixed top-0 right-0 bottom-0 z-101 w-[35%] max-w-[85vw] border-l border-white/10 bg-[#1a1a1a] shadow-2xl'
            >
              <div className='flex items-center justify-between border-b border-white/10 p-6'>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  className='text-xl font-bold text-white'
                >
                  Menu
                </motion.h2>
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
                  className='rounded-lg p-2 text-white transition-colors hover:bg-white/10'
                  aria-label='Close menu'
                >
                  <X className='h-6 w-6' />
                </motion.button>
              </div>

              <nav className='p-8'>
                <ul className='space-y-2'>
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2 + index * 0.08,
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={e => {
                          e.preventDefault
                          setIsOpen(false)
                          scrollToSection(item.href)
                        }}
                        className='group relative block rounded-xl px-4 py-4 text-3xl font-medium text-white transition-all duration-300 hover:translate-x-2 hover:bg-white/5'
                      >
                        <span className='flex items-center justify-between'>
                          {item.label}
                          <motion.span
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className='text-white'
                          >
                            →
                          </motion.span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className='mt-16 border-t border-white/10 pt-8'
                >
                  <p className='text-center text-sm text-gray-400'>
                    © 2026 Portfolio
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
