'use client'

import * as React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface TooltipOrganismProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'default' | 'dark' | 'light' | 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export const TooltipOrganism = React.forwardRef<HTMLDivElement, TooltipOrganismProps>(
  ({ children, content, side = 'top', variant = 'default', className, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div ref={ref} className={cn('inline-block', className)} {...props}>
              {children}
            </div>
          </TooltipTrigger>
          <TooltipContent side={side} variant={variant}>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

TooltipOrganism.displayName = 'TooltipOrganism'

