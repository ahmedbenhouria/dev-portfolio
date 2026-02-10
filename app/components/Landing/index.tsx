'use client'

import { motion, MotionValue, useTransform, useSpring } from 'framer-motion'
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
import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

const CustomButton = motion.button

const CustomButtonComponent = () => {
  return (
    <CustomButton
      whileTap={{ scale: 0.96 }}
      data-cal-namespace='project-intro-call'
      data-cal-link='ahmed-ben-houria-h4fkio/project-intro-call'
      data-cal-config='{"layout":"month_view"}'
      className='group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[#141516] px-5 py-3 text-base font-medium tracking-wide text-white transition-transform duration-700 ease-out will-change-transform selection:text-white hover:scale-x-[1.02] hover:ease-[cubic-bezier(.34,5.56,.64,1)] sm:w-fit sm:rounded-4xl sm:px-6 sm:py-[15px] sm:text-[17px] md:px-7'
    >
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
    </CustomButton>
  )
}

{
  /* ─── Vertical Social Icons (shared SVGs) ─── */
}
const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
}

const GitHubIcon = () => (
  <svg {...iconProps}>
    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
  </svg>
)

const TwitterIcon = () => (
  <svg {...iconProps}>
    <path
      d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
      fill='currentColor'
      stroke='none'
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg {...iconProps}>
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect x='2' y='9' width='4' height='12' />
    <circle cx='4' cy='4' r='2' />
  </svg>
)

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17.5' cy='6.5' r='1.5' fill='currentColor' stroke='none' />
  </svg>
)

const socials = [
  {
    icon: GitHubIcon,
    href: 'https://github.com/ahmedbenhouria',
    label: 'GitHub'
  },
  {
    icon: LinkedInIcon,
    href: 'https://www.linkedin.com/in/ahmedbenhouria/',
    label: 'LinkedIn'
  },
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/ahmedbenhouria/',
    label: 'Instagram'
  },
  { icon: TwitterIcon, href: 'https://x.com/ahmedben66', label: 'X' }
]

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
    'Independent developer who builds digital experiences that balance clean design, solid architecture, and meaningful interactions. Driven by passion and intention.'

  const descriptionMobile =
    'Independent software developer building digital experiences that balance clean design, solid architecture, and meaningful user interactions across mobile and web. Driven by passion, intention, and quality.'

  useGSAP(() => {
    if (!shouldAnimate) return

    const heroSplit = new SplitText('.title', {
      type: 'chars, words'
    })

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.03,
      delay: 0.8
    })
  }, [shouldAnimate])

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'project-intro-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <>
      {/* ════════════════════════════════════════════
          MOBILE & TABLET SECTION  (< lg)
          ════════════════════════════════════════════ */}
      <section
        id='home'
        className='relative z-20 h-[100dvh] overflow-hidden bg-[#DDDED7] selection:text-[#32297A] md:z-10 lg:hidden'
      >
        <div className='relative z-10 flex h-full flex-col px-7 pt-16 pb-6 sm:px-6 sm:pt-20 sm:pb-8 md:px-12 md:pt-24 md:pb-10'>
          <motion.div
            style={{ scale, opacity, y }}
            className='mx-auto flex h-full w-full max-w-2xl flex-col'
          >
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate={shouldAnimate ? 'visible' : 'hidden'}
              className='flex h-full flex-col gap-4 sm:gap-6 md:gap-8'
            >
              {/* Content area */}
              <div className='mt-4 grid flex-shrink-0 grid-cols-[1fr_auto] items-start gap-3 sm:gap-4'>
                {/* Title + Description */}
                <div className='mt-1 space-y-3 sm:space-y-3 md:space-y-4'>
                  <h1 className='title mask manrope text-[21px] leading-tight font-bold tracking-tight text-[#3C3933] sm:text-2xl md:text-3xl'>
                    Software Developer
                  </h1>
                  <p className='manrope max-w-[95%] text-[12.5px] leading-4.5 font-[500] text-[#6D6660] sm:text-[14px] md:text-base'>
                    {descriptionMobile.split(' ').map((word, index) => (
                      <span key={index} className='mask'>
                        <motion.span
                          variants={slideUp}
                          custom={index}
                          initial='initial'
                          animate={!isLoading ? 'open' : 'initial'}
                        >
                          {word}{' '}
                        </motion.span>
                      </span>
                    ))}
                  </p>
                </div>

                {/* Social icons */}
                <div className='grid grid-rows-4 gap-5.5 sm:gap-4'>
                  {socials.map(({ icon: Icon, href, label }, i) => (
                    <motion.a
                      key={label}
                      href={href}
                      aria-label={label}
                      initial='initial'
                      animate={shouldAnimate ? 'open' : 'initial'}
                      variants={{
                        initial: { opacity: 0, y: 12 },
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: 0.15 * i + 0.4,
                            duration: 0.5,
                            ease: [0.4, 0, 0, 1]
                          }
                        }
                      }}
                      className='text-[#3C3933] transition-all duration-300 hover:scale-110 hover:text-[#6C645D]'
                      whileTap={{ scale: 0.85 }}
                    >
                      <div className='h-[17px] w-[17px] sm:h-5 sm:w-5 md:h-6 md:w-6'>
                        <Icon />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Image - takes remaining space */}
              <div className='relative mt-4 mb-1 min-h-0 flex-1 overflow-hidden rounded-lg sm:rounded-xl'>
                <motion.div
                  variants={portraitReveal}
                  initial='initial'
                  animate={shouldAnimate ? 'open' : 'initial'}
                  className='relative h-full w-full'
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          DESKTOP SECTION (≥ lg)
          ════════════════════════════════════════════ */}
      <section
        id='home-desktop'
        className='sticky top-0 z-20 hidden h-screen overflow-hidden bg-[#DDDED7] selection:text-[#32297A] md:z-10 lg:block'
      >
        <div className='relative z-10 grid h-full w-full place-items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28'>
          <motion.div style={{ scale, opacity, y }} className='w-full'>
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate={shouldAnimate ? 'visible' : 'hidden'}
              className='grid grid-cols-1 gap-y-6 sm:mt-12 sm:gap-y-8 lg:grid-cols-12'
            >
              {/* DESKTOP TITLE - Only shown on large screens */}
              <h1 className='title mask manrope col-span-full hidden justify-center overflow-hidden text-center text-5xl font-extrabold tracking-tighter text-[#3C3933] sm:text-6xl md:text-7xl lg:inline-block lg:text-[133px]'>
                AHMED BEN HOURIA
              </h1>

              {/* DESKTOP LAYOUT (≥ lg) */}
              <div className='contents'>
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
                      <p className='font-400 max-w-xl pt-3 text-[23px] text-[#6D6660]'>
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
                      <motion.div
                        initial='initial'
                        animate={!isLoading ? 'open' : 'initial'}
                        variants={fadeInUp}
                      >
                        <CustomButtonComponent />
                      </motion.div>
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
