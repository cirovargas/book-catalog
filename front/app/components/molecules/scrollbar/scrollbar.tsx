'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ScrollbarMoleculeProps {
  orientation?: 'vertical' | 'horizontal'
  className?: string
  containerClassName?: string
}

export const ScrollbarMolecule = React.forwardRef<HTMLDivElement, ScrollbarMoleculeProps>(
  ({ orientation = 'vertical', className, containerClassName, ...props }, ref) => {
    const isVertical = orientation === 'vertical'

    return (
      <div
        ref={ref}
        className={cn(
          'rounded border border-border bg-background',
          containerClassName
        )}
        {...props}
      >
        <div
          className={cn(
            'rounded bg-border',
            isVertical ? 'w-1.5 h-12' : 'w-12 h-1.5',
            className
          )}
          style={{
            width: isVertical ? '6px' : '48px',
            height: isVertical ? '48px' : '6px'
          }}
        />
      </div>
    )
  }
)

ScrollbarMolecule.displayName = 'ScrollbarMolecule'

