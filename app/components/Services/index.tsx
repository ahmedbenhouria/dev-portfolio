import ArrowDownRight from '@/app/common/svgs/ArrowDownRight'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  {
    id: 1,
    title: 'Cross-Platform Mobile Development',
    description:
      'High-quality cross-platform mobile applications for Android and iOS, built from a single codebase. I develop scalable apps with real-time database integration, authentication, and cloud features using Firebase, ensuring consistent performance and a seamless user experience.',
    tools: ['Flutter', 'Dart', 'Riverpod', 'Bloc', 'Firebase']
  },
  {
    id: 2,
    title: 'Android App Development',
    description:
      'Native Android applications built with modern best practices, focusing on performance, scalability, and clean architecture. I develop intuitive UIs and robust app logic using the latest Android technologies.',
    tools: [
      'Kotlin',
      'Jetpack Compose',
      'XML',
      'Coroutines',
      'Flow',
      'Firebase'
    ]
  },
  {
    id: 3,
    title: 'Kotlin Multiplatform Development (KMP)',
    description:
      'Build shared business logic for Android and iOS with Kotlin Multiplatform. This reduces code duplication while preserving native performance, flexibility, and platform-specific UI design.',
    tools: ['Kotlin', 'Kotlin Multiplatform', 'Compose Multiplatform']
  },
  {
    id: 4,
    title: 'UI/UX & Frontend Development',
    description:
      'UI/UX-driven frontend development focused on responsive layouts, accessibility, and performance, enhanced with smooth animations and modern interaction patterns.',
    tools: ['Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion']
  }
]

export default function Services({
  scrollYProgress
}: {
  scrollYProgress: MotionValue<number>
}) {
  const ref = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const topRadius = useTransform(scrollYProgress, [0.9, 1], [30, 0])

  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const contentRefs = useRef<HTMLDivElement[]>([])
  const chevronRefs = useRef<SVGElement[]>([])
  const borderLineRefs = useRef<HTMLDivElement[]>([])
  const triggersRef = useRef<ScrollTrigger[]>([])

  const setContentRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return
    contentRefs.current[i] = el
  }

  const setBorderLineRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return
    borderLineRefs.current[i] = el
  }

  const isHoveredOrExpanded = (id: number) => {
    return hoveredId === id || expandedId === id
  }

  const toggleExpand = (id: number) => {
    const index = services.findIndex(s => s.id === id)
    const contentEl = contentRefs.current[index]
    const chevronEl = chevronRefs.current[index]

    if (!contentEl) return

    const innerEl = contentEl.firstElementChild as HTMLElement
    const targetHeight = innerEl.offsetHeight

    // CLOSE SAME ITEM
    if (expandedId === id) {
      contentEl.style.height = '0'
      contentEl.style.opacity = '0'
      contentEl.style.transform = 'translateY(-12px)'
      contentEl.style.marginTop = '0'

      if (chevronEl) {
        chevronEl.style.transform = 'rotate(0deg)'
      }

      setExpandedId(null)
      return
    }

    // CLOSE PREVIOUS
    if (expandedId !== null) {
      const prevIndex = services.findIndex(s => s.id === expandedId)
      const prevContent = contentRefs.current[prevIndex]
      const prevChevron = chevronRefs.current[prevIndex]

      if (prevContent) {
        prevContent.style.height = '0'
        prevContent.style.opacity = '0'
        prevContent.style.transform = 'translateY(-12px)'
        prevContent.style.marginTop = '0'
      }

      if (prevChevron) {
        prevChevron.style.transform = 'rotate(0deg)'
      }
    }

    // OPEN NEW
    contentEl.style.height = targetHeight + 'px'
    contentEl.style.opacity = '1'
    contentEl.style.transform = 'translateY(0)'

    if (chevronEl) {
      chevronEl.style.transform = 'rotate(180deg)'
    }

    setExpandedId(id)
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const elements = containerRef.current?.querySelectorAll(
      '[data-service-item]'
    )
    if (!elements) return

    elements.forEach((itemEl, i) => {
      const lineIndex = i === 0 ? 0 : i
      const lineEl = borderLineRefs.current[lineIndex]

      gsap.set(lineEl, { scaleX: 0, transformOrigin: 'left center' })

      const baseDelay = i * 0.12

      const trigger = ScrollTrigger.create({
        trigger: itemEl as Element,
        start: 'top 98%',
        markers: false,
        onEnter: () => {
          gsap.killTweensOf(lineEl)
          gsap.to(lineEl, {
            scaleX: 1,
            duration: 1.6,
            ease: 'sine.out',
            delay: baseDelay
          })
        },
        onLeave: () => {
          gsap.killTweensOf(lineEl)
          gsap.to(lineEl, {
            scaleX: 0,
            duration: 0.4,
            ease: 'sine.in'
          })
        },
        onEnterBack: () => {
          gsap.killTweensOf(lineEl)
          gsap.to(lineEl, {
            scaleX: 1,
            duration: 1.6,
            ease: 'sine.out',
            delay: baseDelay
          })
        },
        onLeaveBack: () => {
          gsap.killTweensOf(lineEl)
          gsap.to(lineEl, {
            scaleX: 0,
            duration: 0.4,
            ease: 'sine.in'
          })
        }
      })

      triggersRef.current.push(trigger)
    })

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill())
      triggersRef.current = []
    }
  }, [])

  return (
    <section
      ref={ref}
      id='services'
      className='relative z-20 selection:text-[#32297A]'
    >
      <motion.div
        style={{
          borderTopLeftRadius: topRadius,
          borderTopRightRadius: topRadius
        }}
        className='sticky top-0 flex min-h-full items-center justify-center bg-[#141516]'
      >
        <div className='mx-auto flex h-full w-full flex-col px-40'>
          <h2 className='mt-14 text-[140px] leading-tight font-bold text-[#DDDED7] uppercase'>
            Services Provided
          </h2>

          <div ref={containerRef} className='flex-1 pt-16'>
            <div className='flex flex-row justify-between'>
              <h3 className='translateX-[2px] pb-1 text-[11px] leading-8 font-[500] tracking-wide text-[#DDDED7]/70 uppercase transition-all duration-200'>
                Service Name
              </h3>
              <h3 className='translateX-[2px] pb-1 text-[11px] leading-8 font-[500] tracking-wide text-[#DDDED7]/70 uppercase transition-all duration-200'>
                Click to get more info
              </h3>
            </div>
            <div className='pointer-events-none h-[1.8px] w-full overflow-hidden'>
              <div
                ref={el => setBorderLineRef(el, 0)}
                className='h-[1.8px] origin-left bg-[#DDDED7]'
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            {services.map((service, i) => {
              const isActive = isHoveredOrExpanded(service.id)

              return (
                <div
                  key={service.id}
                  data-service-item
                  className='relative transition-all'
                >
                  <button
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => toggleExpand(service.id)}
                    className='group flex w-full items-center justify-between py-4 transition-all duration-200 select-none'
                    style={{
                      backgroundColor: isActive ? '#DDDED7' : 'transparent'
                    }}
                  >
                    <h3
                      className='pb-1 text-[24px] leading-9 font-[500] tracking-wide transition-all duration-200'
                      style={{
                        color: isActive ? '#141516' : '#DDDED7',
                        transform: isActive
                          ? 'translateX(12px)'
                          : 'translateX(2px)'
                      }}
                    >
                      {service.title}
                    </h3>
                    <div className='absolute top-2 right-2 h-7 w-7 overflow-hidden'>
                      <motion.div
                        initial={false}
                        animate={{
                          x: isActive ? 0 : 10,
                          opacity: isActive ? 1 : 0,
                          rotate: expandedId === service.id ? -90 : 0
                        }}
                        transition={{
                          duration: 0.2,
                          ease: 'easeOut'
                        }}
                        className='h-7 w-7'
                        style={{
                          color: isActive ? '#141516' : '#DDDED7'
                        }}
                      >
                        <ArrowDownRight />
                      </motion.div>
                    </div>
                  </button>

                  <div
                    ref={el => setContentRef(el, i)}
                    className='overflow-hidden transition-all duration-200'
                    style={{
                      backgroundColor: isActive ? '#DDDED7' : 'transparent',
                      height: 0,
                      opacity: 0,
                      transform: 'translateY(-12px)',
                      marginTop: 0
                    }}
                  >
                    <div className='pr-12 pb-6'>
                      <p
                        className='manrope mb-4 px-[13px] text-[24px] font-[400] transition-colors duration-200'
                        style={{
                          color: isActive
                            ? '#141516'
                            : 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {service.description}
                      </p>

                      {service.tools && (
                        <div className='flex flex-wrap gap-3 px-[13px]'>
                          {service.tools.map(tool => (
                            <span
                              key={tool}
                              className='rounded-2xl px-4 py-2 text-sm transition-all duration-200'
                              style={{
                                backgroundColor: isActive
                                  ? '#141516'
                                  : 'rgba(255, 255, 255, 0.1)',
                                color: isActive ? '#DDDED7' : '#141516'
                              }}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {i < services.length - 1 && (
                    <div className='pointer-events-none absolute bottom-0 left-0 h-[1.8px] w-full overflow-hidden'>
                      <div
                        ref={el => setBorderLineRef(el, i + 1)}
                        className='h-[1.8px] origin-left bg-[#DDDED7]'
                        style={{ transform: 'scaleX(0)' }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
