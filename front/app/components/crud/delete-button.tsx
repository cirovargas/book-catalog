import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/feedback/confirm-dialog'
import type { VariantProps } from 'class-variance-authority'

/**
 * Tipos aceitos pelo componente Button do projeto:
 * - props nativos de <button>
 * - variantes do buttonVariants (variant, size)
 * - optional asChild (não usaremos)
 */
type BaseButtonProps =
  React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

type DeleteButtonProps = {
  onConfirm: () => void | Promise<void>
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  extraContentSlot?: React.ReactNode
  hideIcon?: boolean
} & Omit<BaseButtonProps, 'onClick'>

export function DeleteButton({
                               onConfirm,
                               title = 'Delete item',
                               description = 'Are you sure you want to delete this item? This action cannot be undone.',
                               confirmLabel = 'Delete',
                               cancelLabel = 'Cancel',
                               extraContentSlot,
                               hideIcon = false,
                               variant = 'destructive',
                               size = 'sm',
                               children,
                               ...buttonProps
                             }: DeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleConfirm() {
    setIsLoading(true)
    try {
      await onConfirm()
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        disabled={isLoading}
        onClick={() => setOpen(true)}
        {...buttonProps}
      >
        {!hideIcon && (
          <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        {children ?? 'Delete'}
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        extraContentSlot={extraContentSlot}
        onConfirm={handleConfirm}
      />
    </>
  )
}
