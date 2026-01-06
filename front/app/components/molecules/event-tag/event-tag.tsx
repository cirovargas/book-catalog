'use client'

import * as React from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

export interface EventTagMoleculeProps {
  title: string
  imageSrc: string
  imageAlt: string
  href?: string
  to?: string
  onClick?: () => void
  imagePosition?: 'left' | 'right'
  className?: string
  'aria-label'?: string
}

export const EventTagMolecule = React.forwardRef<HTMLAnchorElement | HTMLDivElement, EventTagMoleculeProps>(
  ({ title, imageSrc, imageAlt, href, to, onClick, imagePosition = 'right', className, 'aria-label': ariaLabel, ...props }, ref) => {
    const isClickable = !!(href || to || onClick)

    const content = (
      <div
        className={cn(
          'flex items-center rounded-lg overflow-hidden border border-border bg-card shadow-sm transition-all',
          isClickable && 'hover:shadow-md cursor-pointer',
          className
        )}
        {...(props as any)}
      >
        {imagePosition === 'left' && (
          <div className="relative shrink-0 w-1/3">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        
        {/* Text Section */}
        <div className="flex-1 p-4 text-left">
          <h3 className="text-base font-semibold text-foreground leading-tight">{title}</h3>
        </div>

        {imagePosition === 'right' && (
          <div className="relative shrink-0 w-1/3">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    )

    if (to) {
      return (
        <Link
          ref={ref as any}
          to={to}
          onClick={onClick}
          aria-label={ariaLabel || title}
          className="block"
        >
          {content}
        </Link>
      )
    }

    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          onClick={onClick}
          aria-label={ariaLabel || title}
          className="block"
        >
          {content}
        </a>
      )
    }

    if (onClick) {
      return (
        <div
          ref={ref as any}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClick()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={ariaLabel || title}
          className="block"
        >
          {content}
        </div>
      )
    }

    return (
      <div ref={ref as any} aria-label={ariaLabel || title}>
        {content}
      </div>
    )
  }
)

EventTagMolecule.displayName = 'EventTagMolecule'

