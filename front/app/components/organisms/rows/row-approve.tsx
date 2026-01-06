'use client'

import * as React from 'react'
import { Search, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowApproveProps extends Omit<RowBaseProps, 'cells' | 'trailing' | 'status'> {
  id?: string | number
  companyName: string
  cnpj?: string
  email?: string
  status?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }
  onSearchClick?: () => void
  onApproveClick?: () => void
  onRejectClick?: () => void
}

export const RowApprove = React.forwardRef<HTMLDivElement, RowApproveProps>(
  ({ id, companyName, cnpj, email, status, onSearchClick, onApproveClick, onRejectClick, className, ...props }, ref) => {
    const cells = [
      id !== undefined && <RowCell key="id" title={String(id)} className="min-w-[100px]" />,
      <RowCell key="company" title={companyName} className="flex-1 min-w-[200px]" />,
      cnpj && <RowCell key="cnpj" title={cnpj} className="min-w-[180px]" />,
      email && <RowCell key="email" title={email} className="flex-1 min-w-[200px]" />
    ].filter(Boolean) as React.ReactNode[]

    const statusBadge = status && (
      <Badge variant={status.variant || 'secondary'} className={status.className}>
        {status.label}
      </Badge>
    )

    const trailing = (
      <>
        {onSearchClick && (
          <Button variant="ghost" size="icon" onClick={onSearchClick} aria-label="View details">
            <Search className="size-4" />
          </Button>
        )}
        {onApproveClick && (
          <Button variant="ghost" size="icon" onClick={onApproveClick} aria-label="Approve" className="text-green-600 hover:text-green-700">
            <CheckCircle2 className="size-4" />
          </Button>
        )}
        {onRejectClick && (
          <Button variant="ghost" size="icon" onClick={onRejectClick} aria-label="Reject" className="text-red-600 hover:text-red-700">
            <XCircle className="size-4" />
          </Button>
        )}
      </>
    )

    return (
      <RowBase
        ref={ref}
        cells={cells}
        trailing={trailing}
        status={statusBadge}
        className={className}
        {...props}
      />
    )
  }
)

RowApprove.displayName = 'RowApprove'

