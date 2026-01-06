'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ModalAction {
  label: string
  onClick: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  disabled?: boolean
}

export interface ModalOrganismProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  illustration?: React.ReactNode
  children?: React.ReactNode
  primaryAction?: ModalAction
  secondaryAction?: ModalAction
  className?: string
  showCloseButton?: boolean
}

export const ModalOrganism = React.forwardRef<HTMLDivElement, ModalOrganismProps>(
  ({ open, onOpenChange, title, description, illustration, children, primaryAction, secondaryAction, className, showCloseButton = true, ...props }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          ref={ref}
          className={cn('sm:max-w-[500px]', className)}
          {...props}
        >
          {illustration && (
            <div className="flex justify-center mb-4" aria-hidden="true">
              {illustration}
            </div>
          )}
          
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          {children && (
            <div className="py-4">
              {children}
            </div>
          )}

          {(primaryAction || secondaryAction) && (
            <DialogFooter className="justify-end gap-2">
              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant || 'outline'}
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant={primaryAction.variant || 'default'}
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled}
                >
                  {primaryAction.label}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }
)

ModalOrganism.displayName = 'ModalOrganism'

