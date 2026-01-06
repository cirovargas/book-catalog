'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'
import { cn } from '@/lib/utils'

export interface DashboardBadge {
  label: string
  value: number | string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}

export interface DashboardTeam {
  name: string
  logo?: React.ReactNode
  state?: string
}

export interface RowDashboardProps extends Omit<RowBaseProps, 'leading' | 'cells' | 'trailing' | 'status'> {
  teamA?: DashboardTeam
  teamB?: DashboardTeam
  eventTitle?: string
  location?: string
  badges?: DashboardBadge[]
  onActionClick?: () => void
}

export const RowDashboard = React.forwardRef<HTMLDivElement, RowDashboardProps>(
  ({ teamA, teamB, eventTitle, location, badges = [], onActionClick, className, ...props }, ref) => {
    const defaultTeamA: DashboardTeam = { name: 'Team A', state: 'SP' }
    const defaultTeamB: DashboardTeam = { name: 'Team B', state: 'RJ' }

    const displayTeamA = teamA || defaultTeamA
    const displayTeamB = teamB || defaultTeamB

    const leading = (
      <div className="flex items-center gap-2">
        {displayTeamA.logo || (
          <div className="size-10 rounded bg-muted flex items-center justify-center border">
            <span className="text-xs font-bold">{displayTeamA.name[0]}</span>
          </div>
        )}
        <span className="text-lg font-bold mx-1">x</span>
        {displayTeamB.logo || (
          <div className="size-10 rounded bg-muted flex items-center justify-center border">
            <span className="text-xs font-bold">{displayTeamB.name[0]}</span>
          </div>
        )}
      </div>
    )

    const cells = [
      <RowCell key="title" title={eventTitle || 'Título do evento'} className="flex-1 min-w-[200px]" />,
      <RowCell key="location" title={location || 'Localização'} className="flex-1 min-w-[150px]" />
    ]

    const status = badges.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge key={index} variant={badge.variant || 'secondary'} className={badge.className}>
            {badge.value} {badge.label}
          </Badge>
        ))}
      </div>
    )

    const trailing = (
      <Button variant="ghost" size="icon" onClick={onActionClick} aria-label="Add or expand">
        <Plus className="size-4" />
      </Button>
    )

    return (
      <RowBase
        ref={ref}
        leading={leading}
        cells={cells}
        trailing={trailing}
        status={status}
        className={cn(className)}
        {...props}
      />
    )
  }
)

RowDashboard.displayName = 'RowDashboard'

