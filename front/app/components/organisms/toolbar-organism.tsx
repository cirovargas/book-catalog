'use client'

import * as React from 'react'
import { X, Printer, Send, XCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ToolbarAction {
  label: string
  icon?: React.ReactNode
  count?: number
  tone?: 'default' | 'primary' | 'danger' | 'success' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

export interface ToolbarOrganismProps {
  actions?: ToolbarAction[]
  className?: string
}

const defaultIconMap: Record<string, React.ReactNode> = {
  Cancelar: null,
  Imprimir: <Printer className="size-4" />,
  Notificar: <Send className="size-4" />,
  Recusar: <XCircle className="size-4" />,
  Aprovar: <CheckCircle2 className="size-4" />
}

const toneVariants: Record<string, 'default' | 'destructive' | 'secondary' | 'outline'> = {
  default: 'secondary',
  primary: 'default',
  danger: 'destructive',
  success: 'default',
  secondary: 'secondary'
}

export const ToolbarOrganism = React.forwardRef<HTMLDivElement, ToolbarOrganismProps>(
  ({ actions = [], className, ...props }, ref) => {
    const defaultActions: ToolbarAction[] = [
      { label: 'Cancelar', tone: 'default' },
      { label: 'Imprimir', count: 10, tone: 'primary' },
      { label: 'Notificar', count: 10, tone: 'primary' },
      { label: 'Recusar', count: 10, tone: 'danger' },
      { label: 'Aprovar', count: 10, tone: 'success' }
    ]

    const displayActions = actions.length > 0 ? actions : defaultActions

    return (
      <div ref={ref} className={cn('flex flex-wrap items-center gap-2', className)} {...props} role="toolbar" aria-label="Action toolbar">
        {displayActions.map((action, index) => {
          const icon = action.icon || defaultIconMap[action.label]
          const variant = toneVariants[action.tone || 'default'] || 'secondary'
          const isSuccess = action.tone === 'success'
          const isDanger = action.tone === 'danger'
          const isDefault = action.tone === 'default'

          return (
            <Button
              key={index}
              variant={variant}
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                isSuccess && 'bg-green-500 hover:bg-green-600 text-white',
                isDanger && variant === 'destructive',
                isDefault && variant === 'secondary'
              )}
            >
              {icon && <span className="mr-2">{icon}</span>}
              {action.label}
              {action.count !== undefined && (
                <span className="ml-2">({action.count})</span>
              )}
            </Button>
          )
        })}
      </div>
    )
  }
)

ToolbarOrganism.displayName = 'ToolbarOrganism'

