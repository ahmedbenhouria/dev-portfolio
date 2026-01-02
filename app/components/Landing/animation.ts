// Easing curve for consistency
const smoothEase = [0.25, 0.46, 0.45, 0.94] as const

// Container stagger animation
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 1.2
        }
    }
}

// Description word slide up animation
export const slideUp = {
    initial: {
        y: '100%',
        opacity: 0
    },
    open: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.8 + 0.04 * i,
            ease: smoothEase
        }
    })
}

// General fade in and slide up (location, button, scroll indicator)
export const fadeInUp = {
    initial: {
        opacity: 0,
        y: 24,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1.3,
            duration: 0.6,
            ease: smoothEase
        },
    },
}

// Portrait container reveal (clip path)
export const portraitReveal = {
    initial: {
        clipPath: 'inset(0 0 100% 0)'
    },
    open: {
        clipPath: 'inset(0 0 0 0)',
        transition: {
            delay: 1.2,
            duration: 0.7,
            ease: 'easeInOut' as const
        }
    }
}

// Portrait image zoom out
export const imageScale = {
    initial: {
        scale: 1.05
    },
    open: {
        scale: 1,
        transition: {
            delay: 1.2,
            duration: 0.7,
            ease: 'easeInOut' as const
        }
    }
}

// Shape SVG fade in
export const shapeAppear = {
    initial: {
        opacity: 0
    },
    open: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 1.0,
            ease: 'easeOut' as const
        }
    }
}