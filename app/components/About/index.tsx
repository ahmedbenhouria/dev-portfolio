'use client'

import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useLayoutEffect, useRef } from 'react'

export default function Index() {
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  useLayoutEffect(() => {
    if (!titleRef.current) return

    const titleSplit = new SplitText(titleRef.current, {
      type: 'chars, words'
    })

    gsap.from(titleSplit.chars, {
      yPercent: 100,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.03,
      delay: 0.1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    return () => {
      titleSplit.revert()
    }
  }, [])

  return (
    <section
      id='about'
      className='relative z-20 flex min-h-screen items-center justify-center bg-[#141516] py-12 text-[#DDDED7] selection:text-[#32297A] sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-12 md:gap-16 lg:max-w-[1400px] lg:grid-cols-2 lg:gap-20'>
        {/* LEFT SIDE */}
        <div className='flex flex-col justify-center'>
          <h1
            ref={titleRef}
            className='mask inline-block justify-center overflow-hidden text-[10vw] leading-[0.95] font-extrabold tracking-tight sm:text-[9vw] md:text-[8vw] lg:text-[6rem]'
          >
            MOBILE
            <br />
            APP
            <br />
            DEVELOPER/
          </h1>

          <p className='manrope mt-4 max-w-xs text-sm leading-relaxed font-[500] text-[#DDDED7]/80 sm:mt-6 sm:max-w-md md:mt-8 md:text-base lg:text-[17px]'>
            I’m a passionate Software Developer with 4+ years of experience
            building mobile and web applications. I specialize in native Android
            development using Kotlin and Jetpack Compose, cross-platform apps
            with Flutter, and modern web development solutions.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex flex-col justify-center'>
          <h2 className='mt-6 mb-6 text-center text-2xl font-bold tracking-tight sm:mt-0 sm:mb-8 sm:text-3xl md:mb-10 md:text-4xl'>
            Skills
          </h2>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8'>
            {/* Languages & Tools */}
            <div className='rounded-lg border border-white/5 bg-[#1a1a1a]/50 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/10 sm:p-5 sm:text-left md:p-6'>
              <h3 className='mb-3 text-sm font-semibold text-[#BFBFB9] sm:mb-4 sm:text-base'>
                Languages & Tools
              </h3>
              <ul className='manrope space-y-1.5 text-xs font-[500] text-[#9E9E99] sm:space-y-2 sm:text-sm'>
                <li className='transition-colors hover:text-[#BFBFB9]'>Java</li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Kotlin
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>Dart</li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  TypeScript
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>Git</li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Postman
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Firebase
                </li>
              </ul>
            </div>

            {/* Frameworks & Libraries */}
            <div className='rounded-lg border border-white/5 bg-[#1a1a1a]/50 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/10 sm:p-5 sm:text-left md:p-6'>
              <h3 className='mb-3 text-sm font-semibold text-[#BFBFB9] sm:mb-4 sm:text-base'>
                Frameworks & Libraries
              </h3>
              <ul className='manrope space-y-1.5 text-xs font-[500] text-[#9E9E99] sm:space-y-2 sm:text-sm'>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Android SDK
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Jetpack Compose
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Kotlin Multiplatform
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Flutter
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Next.js
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  TailwindCSS
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Framer Motion
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>GSAP</li>
              </ul>
            </div>

            {/* Core CS Concepts */}
            <div className='rounded-lg border border-white/5 bg-[#1a1a1a]/50 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/10 sm:p-5 sm:text-left md:p-6'>
              <h3 className='mb-3 text-sm font-semibold text-[#BFBFB9] sm:mb-4 sm:text-base'>
                Core CS Concepts
              </h3>
              <ul className='manrope space-y-1.5 text-xs font-[500] text-[#9E9E99] sm:space-y-2 sm:text-sm'>
                <li className='transition-colors hover:text-[#BFBFB9]'>DSA</li>
                <li className='transition-colors hover:text-[#BFBFB9]'>OOP</li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Design Patterns
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Networking & APIs
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Multithreading
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  State Management
                </li>
                <li className='transition-colors hover:text-[#BFBFB9]'>
                  Architecture Patterns
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
