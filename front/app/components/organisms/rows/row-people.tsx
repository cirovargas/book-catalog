'use client'

import * as React from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowPeopleProps extends Omit<RowBaseProps, 'leading' | 'cells' | 'trailing'> {
  id?: string | number
  name: string
  email?: string
  phone?: string
  avatarSrc?: string
  onEditClick?: () => void
  onDeleteClick?: () => void
}

export const RowPeople = React.forwardRef<HTMLDivElement, RowPeopleProps>(
  ({ id, name, email, phone, avatarSrc, onEditClick, onDeleteClick, className, ...props }, ref) => {
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const leading = (
      <Avatar className="size-10">
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
    )

    const cells = [
      id !== undefined && <RowCell key="id" title={String(id)} className="min-w-[80px]" />,
      <RowCell key="name" title={name} className="flex-1 min-w-[200px]" />,
      email && <RowCell key="email" title={email} className="flex-1 min-w-[200px]" />,
      phone && <RowCell key="phone" title={phone} className="min-w-[150px]" />
    ].filter(Boolean) as React.ReactNode[]

    const trailing = (
      <>
        {onEditClick && (
          <Button variant="ghost" size="icon" onClick={onEditClick} aria-label={`Edit ${name}`}>
            <Edit className="size-4" />
          </Button>
        )}
        {onDeleteClick && (
          <Button variant="ghost" size="icon" onClick={onDeleteClick} aria-label={`Delete ${name}`}>
            <Trash2 className="size-4 text-destructive" />
          </Button>
        )}
      </>
    )

    return (
      <RowBase
        ref={ref}
        leading={leading}
        cells={cells}
        trailing={trailing}
        className={className}
        {...props}
      />
    )
  }
)

RowPeople.displayName = 'RowPeople'

