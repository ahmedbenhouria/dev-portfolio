'use client'

import {
  motion,
  MotionValue,
  useTransform,
  useSpring,
  useReducedMotion
} from 'framer-motion'
import {
  slideUp,
  fadeInUp,
  containerVariants,
  portraitReveal,
  imageScale,
  shapeAppear
} from './animation'
import Shape from '@/app/common/svgs/Shape'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'

const CustomButton = () => {
  return (
    <button className='group relative w-fit cursor-pointer overflow-hidden rounded-4xl bg-[#141516] px-7 py-[15px] text-[17px] font-medium tracking-wide text-white transition-transform duration-700 ease-out will-change-transform selection:text-white hover:scale-x-[1.02] hover:ease-[cubic-bezier(.34,5.56,.64,1)]'>
      <span
        data-text='Invert Button'
        className='relative block overflow-hidden'
      >
        <span className='inline-block tracking-wider duration-700 ease-[cubic-bezier(.4,0,0,1)] group-hover:-translate-y-full'>
          LET'S TALK!
          <span aria-hidden> ✦</span>
        </span>
        <span
          className='absolute top-0 left-0 z-10 translate-y-full transform tracking-wider text-white duration-700 ease-[cubic-bezier(.4,0,0,1)] will-change-transform group-hover:translate-y-0'
          aria-hidden
        >
          LET'S TALK!
          <span aria-hidden> ✦</span>
        </span>
      </span>

      <span className='absolute inset-0 translate-y-full rounded-[50%_50%_0_0] bg-[#6C645D] transition-all duration-500 ease-[cubic-bezier(.4,0,0,1)] group-hover:translate-y-0 group-hover:rounded-none'></span>
    </button>
  )
}

export default function Index({
  scrollProgress,
  isLoading = false
}: {
  scrollProgress: MotionValue<number>
  isLoading?: boolean
}) {
  const shouldAnimate = !isLoading

  const rawScale = useTransform(scrollProgress, [0, 0.4], [1, 0.9])
  const rawOpacity = useTransform(scrollProgress, [0, 0.35, 0.75], [1, 1, 0])
  const rawY = useTransform(scrollProgress, [0, 0.9], [0, -230])

  const springConfig = { stiffness: 300, damping: 48 }

  const scale = useSpring(rawScale, springConfig)
  const opacity = useSpring(rawOpacity, springConfig)
  const y = useSpring(rawY, springConfig)

  const description =
    'Independent mobile app developer who builds digital experiences that balance clean design, solid architecture, and meaningful interactions. Driven by passion and intention.'

  useGSAP(() => {
    if (!shouldAnimate) return

    const heroSplit = new SplitText('.title', {
      type: 'chars, words'
    })

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.04,
      delay: 0.6
    })
  }, [shouldAnimate])

  return (
    <section
      id='hero'
      className='sticky top-0 z-10 h-screen overflow-hidden bg-[#DDDED7] selection:text-[#32297A]'
    >
      <div className='relative z-10 grid h-full w-full place-items-center px-28'>
        <motion.div style={{ scale, opacity, y }} className='w-full'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={shouldAnimate ? 'visible' : 'hidden'}
            className='mt-12 grid grid-cols-1 gap-y-8 lg:grid-cols-12'
          >
            {/* TITLE */}
            <h1 className='title mask manrope col-span-full inline-block justify-center overflow-hidden text-center text-5xl font-extrabold tracking-tighter text-[#3C3933] sm:text-6xl md:text-7xl lg:text-[133px]'>
              AHMED BEN HOURIA
            </h1>

            {/* LEFT — portrait */}
            <div className='col-span-full ml-9 lg:col-span-4'>
              <motion.div
                variants={portraitReveal}
                initial='initial'
                animate={shouldAnimate ? 'open' : 'initial'}
                className='aspect-4/5 overflow-hidden rounded-md lg:w-[242px]'
              >
                <motion.img
                  src='/portrait-img.png'
                  alt='Portrait'
                  className='h-full w-full object-cover'
                  variants={imageScale}
                  initial='initial'
                  animate={shouldAnimate ? 'open' : 'initial'}
                />
              </motion.div>
            </div>

            {/* RIGHT COLUMN — Split into 2 columns */}
            <div className='col-span-full grid grid-cols-1 lg:col-span-8 lg:grid-cols-[auto_1fr]'>
              {/* Column 1 — Shape */}
              <div className='flex flex-col items-start justify-between pt-1'>
                <motion.div
                  className='min-w-44 shrink-0'
                  variants={shapeAppear}
                  initial='initial'
                  animate={shouldAnimate ? 'open' : 'initial'}
                >
                  <Shape />
                </motion.div>

                <motion.p
                  initial='initial'
                  animate={shouldAnimate ? 'open' : 'initial'}
                  variants={fadeInUp}
                  className='text-[11.5px] font-normal tracking-wide text-[#87847f] uppercase'
                >
                  Tunis, Tunisia
                </motion.p>
              </div>

              {/* Column 2 — Description and Button */}
              <div className='flex flex-col justify-between px-8'>
                <div className='flex flex-col gap-y-10'>
                  {/* Description */}
                  <p className='max-w-xl pt-3 text-[23px] font-[400] text-[#6D6660]'>
                    {description.split(' ').map((word, index) => (
                      <span key={index} className='mask'>
                        <motion.span
                          variants={slideUp}
                          custom={index}
                          initial='initial'
                          animate={!isLoading ? 'open' : 'initial'}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </p>

                  {/* Button */}
                  <motion.a
                    href='#contact'
                    whileTap={{ scale: 0.96 }}
                    initial='initial'
                    animate={!isLoading ? 'open' : 'initial'}
                    variants={fadeInUp}
                  >
                    <CustomButton />
                  </motion.a>
                </div>
                <div>
                  <motion.p
                    initial='initial'
                    animate={!isLoading ? 'open' : 'initial'}
                    variants={fadeInUp}
                    className='text-end text-[11.5px] font-normal tracking-wide text-[#87847f] uppercase'
                  >
                    (Scroll for more &#8595;)
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
