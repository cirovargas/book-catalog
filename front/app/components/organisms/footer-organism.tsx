'use client'

import * as React from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

export interface FooterLink {
  label: string
  href?: string
  to?: string
}

export interface FooterOrganismProps {
  copyright?: string
  links?: FooterLink[]
  className?: string
}

export const FooterOrganism = React.forwardRef<HTMLElement, FooterOrganismProps>(
  ({ copyright = '© 2025 Book Catalog. All rights reserved.', links = [], className, ...props }, ref) => {
    const defaultLinks: FooterLink[] = [
      { label: 'Terms', to: '/terms' },
      { label: 'Privacy', to: '/privacy' }
    ]

    const displayLinks = links.length > 0 ? links : defaultLinks

    return (
      <footer
        ref={ref as any}
        className={cn('flex items-center justify-between px-6 py-4 border-t bg-background text-sm text-muted-foreground', className)}
        {...props}
      >
        <div>{copyright}</div>
        <nav className="flex items-center gap-4" aria-label="Footer navigation">
          {displayLinks.map((link, index) => {
            if (link.to) {
              return (
                <Link
                  key={index}
                  to={link.to}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            }
            return (
              <a
                key={index}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          })}
        </nav>
      </footer>
    )
  }
)

FooterOrganism.displayName = 'FooterOrganism'

