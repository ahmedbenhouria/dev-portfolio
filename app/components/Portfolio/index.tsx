'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description:
      'Built a high-performance marketplace serving 50K+ daily users with real-time inventory sync, seamless checkout, and dynamic pricing engine.',
    image:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=1000&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://demo-ecommerce.com',
    year: '2024'
  },
  {
    id: 2,
    title: 'Mobile Fitness App',
    category: 'Mobile',
    description:
      'Engineered an intelligent fitness companion with AI-driven workout plans, progress tracking, and community challenges — 100K+ downloads.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=1000&fit=crop',
    tags: ['Flutter', 'Firebase', 'Machine Learning'],
    github: 'https://github.com/yourusername/fitness-app',
    appStore: 'https://apps.apple.com/app/fitness-tracker',
    year: '2023'
  },
  {
    id: 3,
    title: 'Design System',
    category: 'UI/UX',
    description:
      'Created a comprehensive design system with 200+ components, ensuring consistency across 15+ products and reducing design-to-dev time by 60%.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=1000&fit=crop',
    tags: ['Figma', 'React', 'Storybook'],
    github: 'https://github.com/yourusername/design-system',
    liveUrl: 'https://design-system-demo.com',
    year: '2023'
  },
  {
    id: 4,
    title: 'AI Content Generator',
    category: 'Machine Learning',
    description:
      'Developed an AI-powered content creation tool that generates high-quality marketing copy, reducing content creation time by 75% for 10K+ users.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=1000&fit=crop',
    tags: ['Python', 'TensorFlow', 'FastAPI'],
    github: 'https://github.com/yourusername/ai-content',
    liveUrl: 'https://ai-content-demo.com',
    year: '2024'
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    category: 'Frontend',
    description:
      'Developed an enterprise analytics platform processing 1M+ events daily with customizable widgets, real-time alerts, and interactive data stories.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1000&fit=crop',
    tags: ['Next.js', 'D3.js', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/analytics-dashboard',
    liveUrl: 'https://analytics-demo.com',
    year: '2024'
  }
]

export default function Index() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useLayoutEffect(() => {
    // Wait for images to load before initializing animations
    const images = sectionRef.current?.querySelectorAll('img')
    if (!images || images.length === 0) {
      setImagesLoaded(true)
      return
    }

    let loadedCount = 0
    const totalImages = images.length

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        setImagesLoaded(true)
      }
    }

    images.forEach(img => {
      if (img.complete) {
        checkAllLoaded()
      } else {
        img.addEventListener('load', checkAllLoaded)
        img.addEventListener('error', checkAllLoaded)
      }
    })

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', checkAllLoaded)
        img.removeEventListener('error', checkAllLoaded)
      })
    }
  }, [])

  useLayoutEffect(() => {
    if (!imagesLoaded) return

    const ctx = gsap.context(() => {
      // Small delay to ensure DOM is fully ready
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()

        const projects = gsap.utils.toArray('[data-project]')

        projects.forEach((project: any, index) => {
          const totalProjects = projects.length
          // Reverse the z-index: first card gets highest z-index
          const baseZIndex = totalProjects - index

          // Set initial state - ensure visibility
          gsap.set(project, {
            zIndex: baseZIndex,
            opacity: 1,
            y: 0,
            scale: 1
          })

          // Create the scroll-triggered animation
          ScrollTrigger.create({
            trigger: project,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            pin: false,
            invalidateOnRefresh: true,
            onUpdate: self => {
              const progress = self.progress

              const opacity = Math.max(0, 1 - progress * 1.5)
              const scale = 1 - progress * 0.1
              const yOffset = -progress * 100

              // Disable pointer events when card starts scrolling away
              const pointerEvents = progress > 0.1 ? 'none' : 'auto'

              gsap.to(project, {
                opacity: opacity,
                scale: scale,
                y: yOffset,
                duration: 0.1,
                ease: 'none',
                overwrite: 'auto'
              })

              // Set pointer events directly on the element
              project.style.pointerEvents = pointerEvents
            }
          })

          // Initial entrance animation
          gsap.fromTo(
            project,
            {
              opacity: 0,
              y: 150
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: project,
                start: 'top bottom-=100',
                end: 'top center',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true
              }
            }
          )
        })

        // Final refresh after animations are set up
        ScrollTrigger.refresh()
      }, 100)

      return () => clearTimeout(timer)
    }, sectionRef)

    return () => ctx.revert()
  }, [imagesLoaded])

  return (
    <section
      ref={sectionRef}
      id='portfolio'
      className='relative z-20 bg-[#141516] pb-32'
    >
      <div className='mx-auto'>
        {/* Title */}
        <div className='px-6 pt-16 pb-16 md:px-12 lg:px-20'>
          <h2
            data-title
            className='mt-12 px-4 text-center text-4xl leading-tight font-bold text-[#DDDED7] uppercase md:text-7xl lg:text-[176px]'
          >
            Selected Work
          </h2>
        </div>

        {/* Projects */}
        <div className='relative px-6 md:px-12 lg:px-20'>
          {works.map((work, index) => {
            // Calculate z-index inline for visibility
            const zIndex = works.length - index

            return (
              <article
                key={work.id}
                data-project
                className='sticky top-0 flex h-screen w-full items-center'
                style={{ opacity: 1, zIndex }}
              >
                <div className='flex h-[85vh] w-full flex-col overflow-hidden rounded-3xl bg-[#DDDED7]/95 lg:flex-row'>
                  {/* Left Content */}
                  <div className='flex flex-1 flex-col justify-between p-8 md:p-9 lg:flex-[45%] lg:p-12'>
                    {/* Top - Number & Meta */}
                    <div className='space-y-6'>
                      <div className='text-4xl leading-none font-bold text-[#141516] md:text-7xl'>
                        0{work.id}
                      </div>

                      <div className='flex items-center gap-4'>
                        <span className='text-xs tracking-[0.2em] text-[#141516] uppercase md:text-sm'>
                          {work.category}
                        </span>
                        <span className='h-px w-8 bg-[#141516]' />
                        <span className='text-xs tracking-[0.2em] text-[#141516] uppercase md:text-sm'>
                          {work.year}
                        </span>
                      </div>
                    </div>

                    {/* Middle - Title & Description */}
                    <div className='space-y-8'>
                      <h3 className='text-4xl leading-[1.1] font-bold tracking-tight text-[#141516] md:text-5xl lg:text-6xl xl:text-6xl'>
                        {work.title}
                      </h3>

                      <p className='manrope max-w-xl text-[20px] leading-relaxed font-[400] text-[#141516]'>
                        {work.description}
                      </p>

                      {/* Tags */}
                      <div className='flex flex-wrap gap-3'>
                        {work.tags.map(tag => (
                          <span
                            key={tag}
                            className='rounded-full border border-[#141516]/20 px-4 py-2 text-sm text-[#141516]/70 transition-all hover:border-[#141516]/40 hover:bg-[#141516]/5'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom - Links */}
                    <div className='flex flex-wrap gap-4'>
                      {work.github && (
                        <a
                          href={work.github}
                          target='_blank'
                          rel='noreferrer'
                          className='group flex items-center gap-3 rounded-full bg-[#141516] px-6 py-3 text-sm font-medium text-[#DDDED7] transition-all hover:bg-[#141516]/80'
                        >
                          <Github className='h-4 w-4' />
                          <span>Code</span>
                          <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                        </a>
                      )}

                      {work.liveUrl && (
                        <a
                          href={work.liveUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='group flex items-center gap-3 rounded-full border border-[#141516]/30 px-6 py-3 text-sm font-medium text-[#141516] transition-all hover:bg-[#141516]/10'
                        >
                          <ExternalLink className='h-4 w-4' />
                          <span>Live Site</span>
                          <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className='h-64 flex-1 lg:h-full lg:flex-[55%]'>
                    <div className='relative h-full w-full overflow-hidden'>
                      <img
                        src={work.image}
                        alt={work.title}
                        className='h-full w-full object-cover'
                        loading='eager'
                      />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
