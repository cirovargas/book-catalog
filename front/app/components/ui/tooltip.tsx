'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

const tooltipContentVariants = cva(
  'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        dark: 'bg-slate-900 text-white dark:bg-slate-950',
        light: 'bg-white text-slate-900 border border-slate-200 dark:bg-white dark:text-slate-900',
        info: 'bg-[#005FE6] text-white dark:bg-[#005FE6]',
        success: 'bg-green-600 text-white dark:bg-green-700',
        warning: 'bg-yellow-500 text-slate-900 dark:bg-yellow-600',
        error: 'bg-red-600 text-white dark:bg-red-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const tooltipArrowVariants = cva(
  'z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]',
  {
    variants: {
      variant: {
        default: 'bg-primary fill-primary',
        dark: 'bg-slate-900 fill-slate-900 dark:bg-slate-950 dark:fill-slate-950',
        light: 'bg-white fill-white dark:bg-white dark:fill-white',
        info: 'bg-[#005FE6] fill-[#005FE6]',
        success: 'bg-green-600 fill-green-600 dark:bg-green-700 dark:fill-green-700',
        warning: 'bg-yellow-500 fill-yellow-500 dark:bg-yellow-600 dark:fill-yellow-600',
        error: 'bg-red-600 fill-red-600 dark:bg-red-700 dark:fill-red-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface TooltipContentProps extends React.ComponentProps<typeof TooltipPrimitive.Content>, VariantProps<typeof tooltipContentVariants> {}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  variant,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant }), className)}
        role="tooltip"
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={cn(tooltipArrowVariants({ variant }))} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipContentVariants }
export type { TooltipContentProps }
