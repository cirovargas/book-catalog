import * as React from 'react'

import { cn } from '@/lib/utils'

type CrudPageHeaderProps = React.ComponentProps<'div'> & {
  title: string
  description?: string
  actions?: React.ReactNode
}

function CrudPageHeader({
                          title,
                          description,
                          actions,
                          className,
                          ...props
                        }: CrudPageHeaderProps) {
  return (
    <div
      data-slot="crud-page-header"
      className={cn('flex items-center justify-between gap-4', className)}
      {...props}
    >
      <div data-slot="crud-page-header-main" className="space-y-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {actions ? (
        <div
          data-slot="crud-page-header-actions"
          className="flex items-center gap-2"
        >
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export { CrudPageHeader }
