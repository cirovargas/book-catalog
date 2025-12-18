'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowCredenciamentoProps extends Omit<RowBaseProps, 'cells' | 'status'> {
  code?: string | number
  eventName?: string
  status?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }
}

export const RowCredenciamento = React.forwardRef<HTMLDivElement, RowCredenciamentoProps>(
  ({ code, eventName, status, className, ...props }, ref) => {
    const cells = [
      code !== undefined && <RowCell key="code" title={String(code)} className="min-w-[120px]" />,
      <RowCell key="event" title={eventName || 'Campeonato Brasileiro - Série A'} className="flex-1 min-w-[300px]" />
    ].filter(Boolean) as React.ReactNode[]

    const statusBadge = status && (
      <Badge variant={status.variant || 'secondary'} className={status.className}>
        {status.label}
      </Badge>
    )

    return (
      <RowBase
        ref={ref}
        cells={cells}
        status={statusBadge}
        className={className}
        {...props}
      />
    )
  }
)

RowCredenciamento.displayName = 'RowCredenciamento'

