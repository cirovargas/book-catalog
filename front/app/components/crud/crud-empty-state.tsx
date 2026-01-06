import * as React from 'react'
import { EmptyStateMolecule } from '@/components/molecules/empty-state/empty-state'
import { cn } from '@/lib/utils'

type CrudEmptyStateProps = React.ComponentProps<'div'> & {
  title?: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }
  illustration?: React.ReactNode
}

export function CrudEmptyState({
  title = 'No items found',
  description = 'Get started by creating a new item.',
  action,
  illustration,
  className,
  ...props
}: CrudEmptyStateProps) {
  return (
    <div
      data-slot="crud-empty-state"
      className={cn('py-8', className)}
      {...props}
    >
      <EmptyStateMolecule
        title={title}
        description={description}
        action={action}
        illustration={illustration}
      />
    </div>
  )
}

