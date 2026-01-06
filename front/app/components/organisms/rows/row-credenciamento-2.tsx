'use client'

import * as React from 'react'
import { User, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowCredenciamento2Props extends Omit<RowBaseProps, 'cells' | 'trailing'> {
  id?: string | number
  category?: string
  count?: number
  onCredentialClick?: () => void
  onEditClick?: () => void
}

export const RowCredenciamento2 = React.forwardRef<HTMLDivElement, RowCredenciamento2Props>(
  ({ id, category, count, onCredentialClick, onEditClick, className, ...props }, ref) => {
    const cells = [
      id !== undefined && <RowCell key="id" title={String(id)} className="min-w-[120px]" />,
      category && <RowCell key="category" title={category} className="flex-1 min-w-[150px]" />,
      count !== undefined && <RowCell key="count" title={String(count)} className="min-w-[80px]" />,
      <RowCell key="count2" title="0" className="min-w-[80px]" />
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

RowCredenciamento2.displayName = 'RowCredenciamento2'

