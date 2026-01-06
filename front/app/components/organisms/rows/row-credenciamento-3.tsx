'use client'

import * as React from 'react'
import { User, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowCredenciamento3Props extends Omit<RowBaseProps, 'cells' | 'trailing'> {
  id?: string | number
  startDate?: string
  endDate?: string
  description?: string
  onCredentialClick?: () => void
  onEditClick?: () => void
}

export const RowCredenciamento3 = React.forwardRef<HTMLDivElement, RowCredenciamento3Props>(
  ({ id, startDate, endDate, description, onCredentialClick, onEditClick, className, ...props }, ref) => {
    const cells = [
      id !== undefined && <RowCell key="id" title={String(id)} className="min-w-[150px]" />,
      <RowCell key="category" title="Imprensa" className="min-w-[120px]" />,
      startDate && <RowCell key="start" title={startDate} className="min-w-[150px]" />,
      endDate && <RowCell key="end" title={endDate} className="min-w-[150px]" />,
      description && <RowCell key="description" title={description} className="flex-1 min-w-[300px]" />
    ].filter(Boolean) as React.ReactNode[]

    const trailing = (
      <>
        {onCredentialClick && (
          <Button variant="ghost" size="icon" onClick={onCredentialClick} aria-label="Credentials">
            <User className="size-4" />
          </Button>
        )}
        {onEditClick && (
          <Button variant="ghost" size="icon" onClick={onEditClick} aria-label="Edit">
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
        className={className}
        {...props}
      />
    )
  }
)

RowCredenciamento3.displayName = 'RowCredenciamento3'

