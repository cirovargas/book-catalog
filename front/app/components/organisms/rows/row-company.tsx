'use client'

import * as React from 'react'
import { Eye, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowCompanyProps extends Omit<RowBaseProps, 'cells' | 'trailing' | 'status'> {
  companyName: string
  tradeName?: string
  cnpj?: string
  email?: string
  status?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }
  onViewClick?: () => void
  onEditClick?: () => void
}

export const RowCompany = React.forwardRef<HTMLDivElement, RowCompanyProps>(
  ({ companyName, tradeName, cnpj, email, status, onViewClick, onEditClick, className, ...props }, ref) => {
    const cells = [
      <RowCell key="company" title={companyName} subtitle={tradeName} className="flex-1 min-w-[200px]" />,
      cnpj && <RowCell key="cnpj" title={cnpj} className="min-w-[150px]" />,
      email && <RowCell key="email" title={email} className="flex-1 min-w-[200px]" />
    ].filter(Boolean) as React.ReactNode[]

    const statusBadge = status && (
      <Badge variant={status.variant || 'secondary'} className={status.className}>
        {status.label}
      </Badge>
    )

    const trailing = (
      <>
        {onViewClick && (
          <Button variant="ghost" size="icon" onClick={onViewClick} aria-label="View company">
            <Eye className="size-4" />
          </Button>
        )}
        {onEditClick && (
          <Button variant="ghost" size="icon" onClick={onEditClick} aria-label="Edit company">
            <Edit className="size-4" />
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

RowCompany.displayName = 'RowCompany'

