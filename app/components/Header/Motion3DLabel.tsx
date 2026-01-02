import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect
} from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

type Props = {
  label?: string
  className?: string
}

export function Motion3DLabel({ label = 'Github', className = '' }: Props) {
  const controls = useAnimation()
  const wrapRef = useRef<HTMLSpanElement | null>(null)
  const [hovered, setHovered] = useState(false)
  const [flippedThisHover, setFlippedThisHover] = useState(false)

  const mapRange = useCallback(
    (
      value: number,
      inMin: number,
      inMax: number,
      outMin: number,
      outMax: number
    ) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin,
    []
  )

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!wrapRef.current || !hovered) return

      const rect = wrapRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const rx = mapRange(y, 0, rect.height, 15, -15)
      const ry = mapRange(x, 0, rect.width, -15, 15)

      controls.start({
        rotateX: flippedThisHover ? 180 + rx : rx,
        rotateY: ry,
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
      })
    },
    [controls, flippedThisHover, hovered, mapRange]
  )

  useEffect(() => {
    return () => {
      if (wrapRef.current) {
        wrapRef.current.removeEventListener(
          'pointermove',
          handlePointerMove as EventListener
        )
      }
    }
  }, [handlePointerMove])

  const onPointerEnter = useCallback(() => {
    setHovered(true)

    if (!flippedThisHover) {
      controls
        .start({
          rotateX: 180,
          rotateY: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        })
        .then(() => {
          setFlippedThisHover(true)
        })
    }

    wrapRef.current?.addEventListener(
      'pointermove',
      handlePointerMove as EventListener
    )
  }, [controls, flippedThisHover, handlePointerMove])

  const onPointerLeave = useCallback(() => {
    setHovered(false)
    setFlippedThisHover(false)

    wrapRef.current?.removeEventListener(
      'pointermove',
      handlePointerMove as EventListener
    )

    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  }, [controls, handlePointerMove])

  return (
    <span
      className='three-d-wrap'
      aria-hidden='false'
      ref={wrapRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{ display: 'inline-block', perspective: 800 }}
    >
      <motion.span
        className={`three-d ${className}`}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          display: 'inline-block',
          position: 'relative'
        }}
        animate={controls}
        initial={{ rotateX: 0, rotateY: 0 }}
      >
        <span className='visually-hidden' aria-hidden='true'>
          {label}
        </span>

        <span
          style={{
            visibility: 'hidden',
            display: 'inline-block'
          }}
        >
          {label}
        </span>

        <span
          className='face'
          style={{
            transform: 'rotateX(0deg) translateZ(12px)',
            backfaceVisibility: 'hidden'
          }}
        >
          {label}
        </span>

        <span
          className='face'
          style={{
            transform: 'rotateX(180deg) translateZ(12px)',
            backfaceVisibility: 'hidden'
          }}
        >
          {label}
        </span>

        <span
          className='face'
          style={{
            transform: 'rotateX(90deg) translateZ(12px)',
            backfaceVisibility: 'hidden'
          }}
        >
          {label}
        </span>

        <span
          className='face'
          style={{
            transform: 'rotateX(-90deg) translateZ(12px)',
            backfaceVisibility: 'hidden'
          }}
        >
          {label}
        </span>
      </motion.span>
    </span>
  )
}
