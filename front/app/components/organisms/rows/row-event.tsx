'use client'

import * as React from 'react'
import { Workflow, User, Edit } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RowBase, type RowBaseProps } from './row-base'
import { RowCell } from './row-cell'

export interface EventTeam {
  name: string
  logo?: React.ReactNode
  state?: string
}

export interface RowEventProps extends Omit<RowBaseProps, 'leading' | 'cells' | 'trailing'> {
  id?: string | number
  teamA?: EventTeam
  teamB?: EventTeam
  matchup?: string
  location?: string
  dateTime?: string
  competition?: string
  onWorkflowClick?: () => void
  onCredentialClick?: () => void
  onEditClick?: () => void
}

export const RowEvent = React.forwardRef<HTMLDivElement, RowEventProps>(
  ({ id, teamA, teamB, matchup, location, dateTime, competition, onWorkflowClick, onCredentialClick, onEditClick, className, ...props }, ref) => {
    const defaultTeamA: EventTeam = { name: 'Team A', state: 'SP' }
    const defaultTeamB: EventTeam = { name: 'Team B', state: 'BA' }

    const displayTeamA = teamA || defaultTeamA
    const displayTeamB = teamB || defaultTeamB

    const leading = (
      <Avatar className="size-10">
        <AvatarFallback>
          <span className="text-lg">⚽</span>
        </AvatarFallback>
      </Avatar>
    )

    const matchupText = matchup || `${displayTeamA.name}${displayTeamA.state ? ` - ${displayTeamA.state}` : ''} x ${displayTeamB.name}${displayTeamB.state ? ` - ${displayTeamB.state}` : ''}`

    const cells = [
      id !== undefined && <RowCell key="id" title={String(id)} className="min-w-[100px]" />,
      <RowCell
        key="matchup"
        title={matchupText}
        className="flex-1 min-w-[250px]"
      />,
      location && <RowCell key="location" title={location} className="min-w-[180px]" />,
      dateTime && <RowCell key="datetime" title={dateTime} className="min-w-[180px]" />,
      competition && <RowCell key="competition" title={competition} className="min-w-[200px]" />
    ].filter(Boolean) as React.ReactNode[]

    const trailing = (
      <>
        {onWorkflowClick && (
          <Button variant="ghost" size="icon" onClick={onWorkflowClick} aria-label="Workflow">
            <Workflow className="size-4" />
          </Button>
        )}
        {onCredentialClick && (
          <Button variant="ghost" size="icon" onClick={onCredentialClick} aria-label="Credentials">
            <User className="size-4" />
          </Button>
        )}
        {onEditClick && (
          <Button variant="ghost" size="icon" onClick={onEditClick} aria-label="Edit event">
            <Edit className="size-4" />
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

RowEvent.displayName = 'RowEvent'

