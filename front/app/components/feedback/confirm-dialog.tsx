import * as React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog'

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  confirmLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  onConfirm: () => void | Promise<void>
  /** Conteúdo adicional opcional (ex.: nome do usuário, detalhes, etc.) */
  extraContentSlot?: React.ReactNode
}

export function ConfirmDialog({
                                open,
                                onOpenChange,
                                title = 'Are you sure?',
                                description = 'This action cannot be undone.',
                                confirmLabel = 'Confirm',
                                cancelLabel = 'Cancel',
                                onConfirm,
                                extraContentSlot
                              }: ConfirmDialogProps) {
  async function handleConfirm() {
    await onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} data-slot="confirm-dialog">
      <AlertDialogContent data-slot="confirm-dialog-content">
        <AlertDialogHeader data-slot="confirm-dialog-header">
          <AlertDialogTitle data-slot="confirm-dialog-title">
            {title}
          </AlertDialogTitle>

          {description ? (
            <AlertDialogDescription data-slot="confirm-dialog-description">
              {description}
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>

        {extraContentSlot ? (
          <div
            data-slot="confirm-dialog-extra"
            className="mt-2 text-sm text-muted-foreground"
          >
            {extraContentSlot}
          </div>
        ) : null}

        <AlertDialogFooter data-slot="confirm-dialog-footer">
          <AlertDialogCancel type="button">
            {cancelLabel}
          </AlertDialogCancel>

          <AlertDialogAction type="button" onClick={handleConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
