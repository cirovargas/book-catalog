'use client'

import * as React from 'react'
import { User, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowPresetWithMetaProps extends Omit<RowBaseProps, 'cells' | 'trailing'> {
  id?: string | number
  startDate?: string
  endDate?: string
  description?: string
  category?: string
  onActionClick?: () => void
  onEditClick?: () => void
}

export const RowPresetWithMeta = React.forwardRef<HTMLDivElement, RowPresetWithMetaProps>(
  ({ id, startDate, endDate, description, category = 'Media', onActionClick, onEditClick, className, ...props }, ref) => {
    const cells = [
      id !== undefined && <RowCell key="id" title={String(id)} className="min-w-[150px]" />,
      <RowCell key="category" title={category} className="min-w-[120px]" />,
      startDate && <RowCell key="start" title={startDate} className="min-w-[150px]" />,
      endDate && <RowCell key="end" title={endDate} className="min-w-[150px]" />,
      description && <RowCell key="description" title={description} className="flex-1 min-w-[300px]" />
    ].filter(Boolean) as React.ReactNode[]

    const trailing = (
      <>
        {onActionClick && (
          <Button variant="ghost" size="icon" onClick={onActionClick} aria-label="View details">
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

RowPresetWithMeta.displayName = 'RowPresetWithMeta'

// Backwards compatibility export
export { RowPresetWithMeta as RowCredenciamento3 }
export type { RowPresetWithMetaProps as RowCredenciamento3Props }
