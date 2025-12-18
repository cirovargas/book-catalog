'use client'

import * as React from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface EmptyStateMoleculeProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }
  illustration?: React.ReactNode
  className?: string
}

export const EmptyStateMolecule = React.forwardRef<HTMLDivElement, EmptyStateMoleculeProps>(
  ({ title, description, action, illustration, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center text-center px-4 py-12', className)}
        {...props}
      >
        {illustration && <div className="mb-6">{illustration}</div>}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>}
        {action && (
          <Button
            variant={action.variant || 'default'}
            onClick={action.onClick}
            asChild={!!action.href}
          >
            {action.href ? <Link to={action.href}>{action.label}</Link> : action.label}
          </Button>
        )}
      </div>
    )
  }
)

EmptyStateMolecule.displayName = 'EmptyStateMolecule'

