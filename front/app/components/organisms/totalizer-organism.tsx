'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TotalizerItem {
  value: number | string
  label: string
  tone: 'warning' | 'success' | 'danger' | 'info'
}

export interface TotalizerOrganismProps {
  items: TotalizerItem[]
  className?: string
}

const toneStyles = {
  warning: 'border-yellow-400 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-600',
  success: 'border-green-400 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100 dark:border-green-600',
  danger: 'border-red-400 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100 dark:border-red-600',
  info: 'border-blue-400 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-600'
}

export const TotalizerOrganism = React.forwardRef<HTMLDivElement, TotalizerOrganismProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-wrap gap-4', className)} {...props}>
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col rounded-lg border-2 px-6 py-4 shadow-sm min-w-[150px]',
              toneStyles[item.tone]
            )}
            role="status"
            aria-label={`${item.label}: ${item.value}`}
          >
            <span className="text-2xl font-bold mb-1">{item.value.toLocaleString()}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    )
  }
)

TotalizerOrganism.displayName = 'TotalizerOrganism'

