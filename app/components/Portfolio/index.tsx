'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { Github, ExternalLink, ArrowUpRight, Apple } from 'lucide-react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const works = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description:
      'A high-performance marketplace serving 50K+ daily users with real-time inventory synchronization and dynamic pricing.',
    image:
      'https://images.unsplash.com/photo-1557821552-17105176552c?w=1600&h=1000&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://demo-ecommerce.com',
    year: '2024',
    month: 'January'
  },
  {
    id: 2,
    title: 'Mobile Fitness App',
    category: 'Mobile',
    description:
      'An intelligent fitness companion with AI-driven workout plans and progress tracking — 100K+ downloads.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=1000&fit=crop',
    tags: ['Flutter', 'Firebase', 'ML'],
    github: 'https://github.com/yourusername/fitness-app',
    appStore: 'https://apps.apple.com/app/fitness-tracker',
    year: '2023',
    month: 'September'
  },
  {
    id: 3,
    title: 'Design System',
    category: 'UI/UX',
    description:
      'A comprehensive design system with 200+ components, ensuring consistency across 15+ products.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=1000&fit=crop',
    tags: ['Figma', 'React', 'Storybook'],
    github: 'https://github.com/yourusername/design-system',
    liveUrl: 'https://design-system-demo.com',
    year: '2023',
    month: 'June'
  },
  {
    id: 4,
    title: 'AI Content Generator',
    category: 'Machine Learning',
    description:
      'An AI-powered content creation tool generating high-quality marketing copy for 10K+ users.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=1000&fit=crop',
    tags: ['Python', 'TensorFlow', 'FastAPI'],
    github: 'https://github.com/yourusername/ai-content',
    liveUrl: 'https://ai-content-demo.com',
    year: '2024',
    month: 'March'
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    category: 'Frontend',
    description:
      'An enterprise analytics platform processing 1M+ events daily with customizable widgets and real-time alerts.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1000&fit=crop',
    tags: ['Next.js', 'D3.js', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/analytics-dashboard',
    liveUrl: 'https://analytics-demo.com',
    year: '2024',
    month: 'November'
  }
]

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
      id='works'
      className='relative z-20 min-h-screen bg-[#141516] selection:text-[#32297A]'
    >
      <div className='pt-5 pb-4 text-center sm:pt-16 sm:pb-5 md:pt-20 md:pb-7'>
        <h2
          ref={titleRef}
          data-title
          className='mask mt-6 inline-block overflow-hidden px-4 text-center text-4xl leading-tight font-bold text-[#DDDED7] uppercase sm:mt-8 sm:text-5xl md:mt-12 md:text-7xl lg:text-[165px]'
        >
          Selected Works
        </h2>
      </div>
      {works.map((work, index) => {
        const isLeft = index % 2 === 0

        return (
          <div
            key={work.id}
            className='relative flex min-h-screen w-full items-center px-4 py-12 selection:text-[#32297A] sm:px-6 sm:py-16 md:px-12 lg:h-screen lg:px-24 lg:py-0'
          >
            {/* Number Badge */}
            <div className='absolute top-4 right-4 text-lg font-bold text-[#DDDED7] sm:top-6 sm:right-6 sm:text-xl md:text-2xl lg:top-8 lg:right-[96px]'>
              {String(work.id).padStart(3, '0')}
            </div>

            <div
              className={`flex w-full flex-col gap-6 sm:gap-8 lg:gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              {/* Content Side */}
              <div
                className={`flex flex-1 flex-col justify-between gap-6 py-4 sm:gap-8 ${isLeft ? 'items-start' : 'items-start lg:items-end lg:text-end'}`}
              >
                <div
                  className={`w-full space-y-3 sm:space-y-4 ${isLeft ? 'lg:max-w-md' : 'lg:max-w-md'}`}
                >
                  {/* Date */}
                  <div className='text-xs font-medium tracking-widest text-[#DDDED7]/60 uppercase md:text-sm'>
                    {work.month} {work.year}
                  </div>
                  <h2 className='text-3xl leading-tight font-black tracking-tight text-[#DDDED7] uppercase sm:text-4xl sm:leading-16 md:text-5xl lg:text-6xl'>
                    {work.title}
                  </h2>

                  <div
                    className={`flex flex-wrap gap-2 selection:text-[#DDDED7] ${isLeft ? '' : 'lg:justify-end'}`}
                  >
                    {work.tags.map(tag => (
                      <span
                        key={tag}
                        className='rounded-xl border border-[#DDDED7]/20 bg-[#1F2021] px-3 py-1.5 text-xs font-normal text-[#DDDED7] sm:rounded-2xl sm:px-4 sm:py-2 sm:text-sm'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className='manrope text-sm leading-relaxed font-[400] text-[#DDDED7]/70 md:text-base lg:text-lg'>
                    {work.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className='flex w-full flex-col flex-wrap gap-3 sm:w-auto sm:flex-row sm:gap-4'>
                  {work.github && (
                    <a
                      href={work.github}
                      target='_blank'
                      rel='noreferrer'
                      className='group sm:text-md flex items-center justify-center gap-2 rounded-full bg-[#DDDED7] px-4 py-2.5 text-sm font-semibold text-[#141516] transition-all hover:bg-[#CBCCC5] sm:px-5 sm:py-3'
                    >
                      <Github className='h-4 w-4' />
                      <span>View Code</span>
                      <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </a>
                  )}

                  {work.liveUrl && (
                    <a
                      href={work.liveUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='group sm:text-md flex items-center justify-center gap-2 rounded-full border border-[#DDDED7] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#DDDED7] transition-all duration-300 hover:bg-[#DDDED7] hover:text-[#141516] sm:px-5 sm:py-3'
                    >
                      <ExternalLink className='h-4 w-4' />
                      <span>Live Demo</span>
                      <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </a>
                  )}

                  {work.appStore && (
                    <a
                      href={work.appStore}
                      target='_blank'
                      rel='noreferrer'
                      className='group sm:text-md flex items-center justify-center gap-2 rounded-full border border-[#DDDED7] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#DDDED7] transition-all duration-300 hover:bg-[#DDDED7] hover:text-[#141516] sm:px-5 sm:py-3'
                    >
                      <Apple className='h-4 w-4' />
                      <span>App Store</span>
                      <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </a>
                  )}
                </div>
              </div>

              {/* Image Side */}
              <div className='order-first flex flex-1 items-center lg:order-none'>
                <div className='relative h-[40vh] w-full overflow-hidden rounded-lg bg-[#1F2021] shadow-2xl sm:h-[50vh] sm:rounded-xl lg:h-[75vh]'>
                  <img
                    src={work.image}
                    alt={work.title}
                    className='h-full w-full object-cover'
                  />

                  {/* Thumbnail Mockups */}
                  <div className='absolute bottom-2 left-2 flex gap-1.5 sm:bottom-3 sm:left-3 sm:gap-2'>
                    <div className='h-10 w-10 overflow-hidden rounded-md border border-[#DDDED7] bg-[#1F2021] shadow-lg sm:h-12 sm:w-12 sm:rounded-lg md:h-14 md:w-14'>
                      <img
                        src={work.image}
                        alt=''
                        className='h-full w-full object-cover opacity-80'
                      />
                    </div>
                    <div className='h-10 w-10 overflow-hidden rounded-md border border-[#DDDED7] bg-[#1F2021] shadow-lg sm:h-12 sm:w-12 sm:rounded-lg md:h-14 md:w-14'>
                      <img
                        src={work.image}
                        alt=''
                        className='h-full w-full object-cover opacity-60'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
