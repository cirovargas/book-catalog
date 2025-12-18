'use client'

import * as React from 'react'
import { Link as RouterLink } from 'react-router'
import { ChevronLeft, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const linkVariants = cva(
  'inline-flex items-center gap-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-foreground hover:text-primary underline-offset-4 hover:underline',
        back: 'text-muted-foreground hover:text-foreground underline underline-offset-4',
        action: 'text-primary hover:text-primary/80 underline-offset-4 hover:underline'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface LinkMoleculeProps extends VariantProps<typeof linkVariants> {
  href?: string
  to?: string
  children: React.ReactNode
  iconLeft?: LucideIcon
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  'aria-label'?: string
}

export const LinkMolecule = React.forwardRef<HTMLAnchorElement, LinkMoleculeProps>(
  ({ href, to, children, iconLeft: IconLeft, variant = 'default', disabled, className, onClick, 'aria-label': ariaLabel, ...props }, ref) => {
    const LeftIcon = variant === 'back' ? ChevronLeft : IconLeft

    const content = (
      <>
        {LeftIcon && <LeftIcon className="size-4 shrink-0" />}
        <span>{children}</span>
      </>
    )

    const baseClassName = cn(linkVariants({ variant }), className)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    // Use react-router Link when 'to' prop is provided
    if (to) {
      return (
        <RouterLink
          ref={ref}
          to={to}
          className={baseClassName}
          onClick={handleClick}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          {...(props as any)}
        >
          {content}
        </RouterLink>
      )
    }

    // Use regular anchor tag when 'href' is provided or for external links
    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={baseClassName}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        {...props}
      >
        {content}
      </a>
    )
  }
)

LinkMolecule.displayName = 'LinkMolecule'

