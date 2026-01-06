'use client'

import * as React from 'react'
import { CheckCircle2, XCircle, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface RowCredenciamentoPessoasProps extends Omit<RowBaseProps, 'leading' | 'cells' | 'trailing' | 'status'> {
  id?: string | number
  name: string
  document?: string
  role?: string
  portal?: string
  avatarSrc?: string
  status?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }
  onApproveClick?: () => void
  onRejectClick?: () => void
  onMoreClick?: () => void
}

export const RowCredenciamentoPessoas = React.forwardRef<HTMLDivElement, RowCredenciamentoPessoasProps>(
  ({ id, name, document, role, portal, avatarSrc, status, onApproveClick, onRejectClick, onMoreClick, className, ...props }, ref) => {
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
      id !== undefined && <RowCell key="id" title={String(id)} className="min-w-[100px]" />,
      <RowCell key="name" title={name} className="flex-1 min-w-[200px]" />,
      document && <RowCell key="document" title={document} className="min-w-[150px]" />,
      role && <RowCell key="role" title={role} className="min-w-[150px]" />,
      portal && <RowCell key="portal" title={portal} className="min-w-[150px]" />
    ].filter(Boolean) as React.ReactNode[]

    const statusBadge = status && (
      <Badge variant={status.variant || 'secondary'} className={status.className}>
        {status.label}
      </Badge>
    )

    const trailing = (
      <>
        {onApproveClick && (
          <Button variant="ghost" size="icon" onClick={onApproveClick} aria-label={`Approve ${name}`} className="text-green-600 hover:text-green-700">
            <CheckCircle2 className="size-4" />
          </Button>
        )}
        {onRejectClick && (
          <Button variant="ghost" size="icon" onClick={onRejectClick} aria-label={`Reject ${name}`} className="text-red-600 hover:text-red-700">
            <XCircle className="size-4" />
          </Button>
        )}
        {onMoreClick && (
          <Button variant="ghost" size="icon" onClick={onMoreClick} aria-label="More options">
            <MoreVertical className="size-4" />
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
        status={statusBadge}
        className={className}
        {...props}
      />
    )
  }
)

RowCredenciamentoPessoas.displayName = 'RowCredenciamentoPessoas'

