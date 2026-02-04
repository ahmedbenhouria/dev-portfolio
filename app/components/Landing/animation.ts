// Easing curve for consistency
const smoothEase = [0.25, 0.46, 0.45, 0.94] as const

// Container stagger animation
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3
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
            delay: 1.4 + 0.02 * i, // Start after title completes (0.6 base + 1.1 duration + 0.3 buffer)
            ease: smoothEase
        }
    })
}

// General fade in and slide up (location text at bottom left)
export const fadeInUp = {
    initial: {
        opacity: 0,
        y: 24,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1.3, // After description starts
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
            delay: 1.3, // After title animation completes
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1] as const // Custom ease for smooth reveal
        }
    }
}

// Portrait image zoom out (synchronized with portrait reveal)
export const imageScale = {
    initial: {
        scale: 1.08
    },
    open: {
        scale: 1,
        transition: {
            delay: 1.3, // Same as portrait reveal
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1] as const
        }
    }
}

// Shape SVG fade in
export const shapeAppear = {
    initial: {
        opacity: 0,
        scale: 0.95
    },
    open: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: 1.4, // Slightly after portrait starts
            ease: smoothEase
        }
    }
}