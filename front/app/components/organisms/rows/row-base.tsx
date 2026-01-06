'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export interface RowBaseProps {
  leading?: React.ReactNode
  cells?: React.ReactNode[]
  children?: React.ReactNode
  trailing?: React.ReactNode
  status?: React.ReactNode
  selectable?: boolean
  selected?: boolean
  onSelectedChange?: (checked: boolean) => void
  variant?: 'default' | 'selected' | 'disabled'
  density?: 'compact' | 'regular'
  className?: string
  onClick?: () => void
  'aria-label'?: string
}

export const RowBase = React.forwardRef<HTMLDivElement, RowBaseProps>(
  (
    {
      leading,
      cells = [],
      children,
      trailing,
      status,
      selectable = false,
      selected = false,
      onSelectedChange,
      variant,
      density = 'regular',
      className,
      onClick,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const effectiveVariant = variant || (selected && !variant ? 'selected' : 'default')
    const isDisabled = effectiveVariant === 'disabled'
    const isSelected = effectiveVariant === 'selected' || (selected && !isDisabled)

    const handleCheckboxChange = (checked: boolean) => {
      if (isDisabled) return
      onSelectedChange?.(checked)
    }

    const handleRowClick = (e: React.MouseEvent) => {
      if (isDisabled) return
      // Don't trigger row click if clicking checkbox or action buttons
      const target = e.target as HTMLElement
      if (target.closest('[role="checkbox"]') || target.closest('button') || target.closest('a')) {
        return
      }
      onClick?.()
    }

    const paddingClass = density === 'compact' ? 'px-4 py-2' : 'px-4 py-3'

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-4 border-b border-border transition-colors',
          paddingClass,
          isSelected && 'bg-blue-50 dark:bg-blue-950/20',
          !isSelected && !isDisabled && 'hover:bg-muted/50',
          isDisabled && 'opacity-60 grayscale cursor-not-allowed',
          onClick && !isDisabled && 'cursor-pointer',
          className
        )}
        onClick={handleRowClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick && !isDisabled ? 0 : undefined}
        onKeyDown={
          onClick && !isDisabled
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Checkbox */}
        {selectable && (
          <div className="flex-shrink-0">
            <Checkbox
              checked={selected}
              onCheckedChange={handleCheckboxChange}
              disabled={isDisabled}
              aria-label={ariaLabel ? `Select ${ariaLabel}` : 'Select row'}
            />
          </div>
        )}

        {/* Leading content */}
        {leading && <div className="flex-shrink-0">{leading}</div>}

        {/* Cells area */}
        <div className="flex-1 flex items-center gap-4 min-w-0">
          {children || cells.map((cell, index) => <React.Fragment key={index}>{cell}</React.Fragment>)}
        </div>

        {/* Status */}
        {status && <div className="flex-shrink-0">{status}</div>}

        {/* Trailing actions */}
        {trailing && <div className="flex-shrink-0 flex items-center gap-2">{trailing}</div>}
      </div>
    )
  }
)

RowBase.displayName = 'RowBase'

