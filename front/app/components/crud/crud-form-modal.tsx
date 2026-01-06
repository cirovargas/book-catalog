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

type CrudFormModalProps = React.ComponentProps<typeof DialogContent> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  mode: 'create' | 'edit'
  onSubmit: () => void | Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
  submitLabel?: string
  cancelLabel?: string
  children: React.ReactNode
}

export function CrudFormModal({
  open,
  onOpenChange,
  title,
  description,
  mode,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel,
  cancelLabel = 'Cancel',
  children,
  className,
  ...props
}: CrudFormModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onOpenChange(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit()
      // Only close if onSubmit doesn't throw
      onOpenChange(false)
    } catch (error) {
      // Let the parent handle the error, don't close modal
      console.error('Form submission error:', error)
    }
  }

  const defaultSubmitLabel = mode === 'create' ? 'Create' : 'Update'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="crud-form-modal"
        className={cn('sm:max-w-[600px]', className)}
        {...props}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          <div
            data-slot="crud-form-modal-content"
            className="py-4 space-y-4 max-h-[60vh] overflow-y-auto"
          >
            {children}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? (mode === 'create' ? 'Creating...' : 'Updating...')
                : (submitLabel || defaultSubmitLabel)
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

