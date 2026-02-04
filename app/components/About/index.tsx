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
      className='relative z-20 flex min-h-screen items-center justify-center bg-[#141516] px-4 py-16 text-[#DDDED7] selection:text-[#32297A] sm:px-6 sm:py-20 md:px-8 lg:py-2'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:gap-16 md:gap-20 lg:grid-cols-2'>
        {/* LEFT SIDE */}
        <div className='flex flex-col justify-center'>
          <h1
            ref={titleRef}
            className='mask inline-block justify-center overflow-hidden text-[13vw] leading-[0.95] font-extrabold tracking-tight sm:text-[12vw] md:text-[10vw] lg:text-[6rem]'
          >
            MOBILE
            <br />
            APP
            <br />
            DEVELOPER/
          </h1>

          <p className='manrope mt-6 max-w-md text-sm leading-relaxed font-[500] text-[#DDDED7]/80 sm:mt-8 sm:text-base md:mt-10 md:text-[17px]'>
            I'm a passionate Mobile App Developer with 4+ years of experience
            building native Android apps with Kotlin and Jetpack Compose, as
            well as cross-platform apps with Flutter.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex flex-col justify-center'>
          <h2 className='mb-8 text-center text-3xl font-bold tracking-tight sm:mb-10 sm:text-4xl md:mb-12 md:text-5xl'>
            Skills
          </h2>

          <div className='grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-12'>
            {/* Languages & Tools */}
            <div className='flex flex-col'>
              <h3 className='mb-3 flex min-h-[2.5rem] items-start text-lg font-semibold text-[#BFBFB9] sm:mb-4 sm:min-h-[3rem] sm:text-xl md:min-h-[3.8rem]'>
                Languages & Tools
              </h3>
              <ul className='manrope space-y-1.5 text-sm font-[500] text-[#9E9E99] sm:space-y-2 sm:text-[15px] md:text-[16px]'>
                <li>Java</li>
                <li>Kotlin</li>
                <li>Dart</li>
                <li>TypeScript</li>
                <li>Git</li>
                <li>Postman</li>
                <li>Firebase</li>
              </ul>
            </div>

            {/* Frameworks & Libraries */}
            <div className='flex flex-col'>
              <h3 className='mb-3 flex min-h-[2.5rem] items-start text-lg font-semibold text-[#BFBFB9] sm:mb-4 sm:min-h-[3rem] sm:text-xl md:min-h-[3.8rem]'>
                Frameworks & Libraries
              </h3>
              <ul className='manrope space-y-1.5 text-sm font-[500] text-[#9E9E99] sm:space-y-2 sm:text-[15px] md:text-[16px]'>
                <li>Android SDK</li>
                <li>Jetpack Compose</li>
                <li>Kotlin Multiplatform</li>
                <li>Flutter</li>
                <li>Next.js</li>
                <li>TailwindCSS</li>
                <li>Framer Motion</li>
                <li>GSAP</li>
              </ul>
            </div>

            {/* Core CS Concepts */}
            <div className='flex flex-col'>
              <h3 className='mb-3 flex min-h-[2.5rem] items-start text-lg font-semibold text-[#BFBFB9] sm:mb-4 sm:min-h-[3rem] sm:text-xl md:min-h-[3.8rem]'>
                Core CS Concepts
              </h3>
              <ul className='manrope space-y-1.5 text-sm font-[500] text-[#9E9E99] sm:space-y-2 sm:text-[15px] md:text-[16px]'>
                <li>DSA</li>
                <li>OOP</li>
                <li>Design Patterns</li>
                <li>Networking & APIs</li>
                <li>Multithreading</li>
                <li>State Management</li>
                <li>Architecture Patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
