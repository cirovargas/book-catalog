'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface VerticalFieldMoleculeProps {
  label?: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
  htmlFor?: string
}

export const VerticalFieldMolecule = React.forwardRef<HTMLDivElement, VerticalFieldMoleculeProps>(
  ({ label, required, hint, error, children, className, htmlFor, ...props }, ref) => {
    const fieldId = htmlFor || React.useId()

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
        {label && (
          <Label htmlFor={fieldId} className={cn(error && 'text-destructive')}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <div className="relative">
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                id: fieldId,
                'aria-invalid': error ? 'true' : undefined,
                'aria-describedby': hint || error ? `${fieldId}-description` : undefined,
                className: cn(
                  error && 'border-destructive focus-visible:ring-destructive/20',
                  (children as React.ReactElement<any>).props?.className
                )
              })
            : children}
        </div>
        {hint && !error && (
          <p id={`${fieldId}-description`} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${fieldId}-description`} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

VerticalFieldMolecule.displayName = 'VerticalFieldMolecule'

