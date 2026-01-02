'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type Variant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'gradient'

type Size = 'default' | 'sm' | 'lg' | 'icon'

/**
 * Broad props so the component can accept either button or anchor props
 * when used with `asChild`. We forward the props to the rendered element.
 */
interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  className?: string
}

/* Tailwind classes for variants (you can tweak these to match your design tokens) */
const buttonVariants: Record<Variant, string> = {
  default:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-foreground/90',
  destructive:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700',
  outline:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 border-2 border-foreground/20 bg-transparent hover:border-primary hover:bg-primary/10',
  secondary:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground',
  link: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 text-primary underline-offset-4 hover:underline',
  gradient:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90'
}

/* Size helpers */
const sizeVariants: Record<Size, string> = {
  default: 'h-11 px-6 py-2',
  sm: 'h-9 rounded-lg px-4',
  lg: 'h-12 rounded-xl px-8 text-base',
  icon: 'h-10 w-10'
}

/**
 * ForwardRef with a flexible ref type (HTMLElement) so it works for <button>, <a>, etc.
 * We cast the ref to any when passing to Comp to avoid TS mismatch when Comp is Slot.
 */
const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp: React.ElementType = asChild ? Slot : 'button'
    const variantClass = buttonVariants[variant] ?? buttonVariants.default
    const sizeClass = sizeVariants[size] ?? sizeVariants.default

    return (
      <Comp
        // `ref` cast to any to support both Slot and native elements
        ref={ref as any}
        className={cn(
          variantClass,
          sizeClass,
          '[&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants, sizeVariants }
export type { ButtonProps }
