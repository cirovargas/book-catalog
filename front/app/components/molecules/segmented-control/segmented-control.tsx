'use client'

import * as React from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SegmentedControlItem {
  value: string
  label: string
  icon?: LucideIcon
  disabled?: boolean
}

export interface SegmentedControlProps {
  items: SegmentedControlItem[]
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  className?: string
  disabled?: boolean
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ items, value, onValueChange, defaultValue, className, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || items[0]?.value || '')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (disabled) return
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [disabled, isControlled, onValueChange]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>, itemValue: string) => {
        if (disabled || e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        handleValueChange(itemValue)
      },
      [disabled, handleValueChange]
    )

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Segmented control"
        className={cn(
          'inline-flex rounded-lg border border-border/50 bg-transparent p-1 gap-1',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {items.map((item) => {
          const isSelected = currentValue === item.value
          const ItemIcon = item.icon

          return (
            <button
              key={item.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={item.disabled || disabled}
              disabled={item.disabled || disabled}
              onClick={() => handleValueChange(item.value)}
              onKeyDown={(e) => handleKeyDown(e, item.value)}
              className={cn(
                'relative flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                isSelected
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50',
                className
              )}
            >
              {ItemIcon && <ItemIcon className="size-4 shrink-0" />}
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    )
  }
)

SegmentedControl.displayName = 'SegmentedControl'

