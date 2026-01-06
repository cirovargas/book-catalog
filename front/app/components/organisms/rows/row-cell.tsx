'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface RowCellProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
  className?: string
  width?: string
}

export const RowCell = React.forwardRef<HTMLDivElement, RowCellProps>(
  ({ title, subtitle, align = 'left', truncate = true, className, width, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          align === 'left' && 'text-left',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          width && `min-w-[${width}] max-w-[${width}]`,
          className
        )}
        style={width ? { width, minWidth: width, maxWidth: width } : undefined}
        {...props}
      >
        <div
          className={cn(
            'text-sm font-medium text-foreground',
            truncate && 'truncate'
          )}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className={cn(
              'text-xs text-muted-foreground',
              truncate && 'truncate'
            )}
          >
            {subtitle}
          </div>
        )}
      </div>
    )
  }
)

RowCell.displayName = 'RowCell'

