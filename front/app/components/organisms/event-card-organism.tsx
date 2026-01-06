'use client'

import * as React from 'react'
import { MapPin, Calendar } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EventTeam {
  name: string
  logo?: React.ReactNode
  state?: string
}

export interface EventCardOrganismProps {
  teamA: EventTeam
  teamB: EventTeam
  location: string
  dateTime: string
  buttonLabel?: string
  timeRemaining?: string
  status?: 'open' | 'closing' | 'closed'
  tone?: 'primary' | 'warning' | 'disabled'
  onButtonClick?: () => void
  className?: string
}

export const EventCardOrganism = React.forwardRef<HTMLDivElement, EventCardOrganismProps>(
  ({ teamA, teamB, location, dateTime, buttonLabel = 'Credenciar', timeRemaining, status = 'open', tone, onButtonClick, className, ...props }, ref) => {
    // Determine tone from status if not explicitly provided
    const effectiveTone = tone || (status === 'closed' ? 'disabled' : status === 'closing' ? 'warning' : 'primary')

    const isDisabled = effectiveTone === 'disabled'
    const isWarning = effectiveTone === 'warning'

    const toneStyles = {
      primary: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
      warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
      disabled: 'border-gray-300 bg-gray-100 opacity-60 dark:bg-gray-900 dark:border-gray-700'
    }

    const buttonStyles = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      warning: 'bg-yellow-600 hover:bg-yellow-700 text-black',
      disabled: 'bg-gray-400 text-gray-600 cursor-not-allowed'
    }

    const textStyles = {
      primary: 'text-blue-700 dark:text-blue-300',
      warning: 'text-yellow-800 dark:text-yellow-200',
      disabled: 'text-gray-500 dark:text-gray-400'
    }

    return (
      <Card
        ref={ref}
        className={cn(
          'w-full max-w-sm',
          toneStyles[effectiveTone],
          isDisabled && 'grayscale',
          className
        )}
        {...props}
      >
        <CardContent className="pt-6">
          {/* Teams */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {teamA.logo || (
                <div className={cn('size-12 rounded bg-muted flex items-center justify-center', isDisabled && 'opacity-50')}>
                  <span className="text-xs font-bold">{teamA.name[0]}</span>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className={cn('text-sm font-medium truncate', isDisabled && 'opacity-70')}>
                  {teamA.name}
                </span>
                {teamA.state && (
                  <span className={cn('text-xs text-muted-foreground', isDisabled && 'opacity-50')}>
                    {teamA.state}
                  </span>
                )}
              </div>
            </div>

            <span className={cn('text-xl font-bold mx-2', isDisabled && 'opacity-50')}>x</span>

            <div className="flex items-center gap-2 flex-1 min-w-0">
              {teamB.logo || (
                <div className={cn('size-12 rounded bg-muted flex items-center justify-center', isDisabled && 'opacity-50')}>
                  <span className="text-xs font-bold">{teamB.name[0]}</span>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className={cn('text-sm font-medium truncate', isDisabled && 'opacity-70')}>
                  {teamB.name}
                </span>
                {teamB.state && (
                  <span className={cn('text-xs text-muted-foreground', isDisabled && 'opacity-50')}>
                    {teamB.state}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Location and DateTime */}
          <div className="flex flex-col gap-2 text-sm">
            <div className={cn('flex items-center gap-2', isDisabled && 'opacity-70')}>
              <MapPin className={cn('size-4', isDisabled && 'opacity-50')} />
              <span>{location}</span>
            </div>
            <div className={cn('flex items-center gap-2', isDisabled && 'opacity-70')}>
              <Calendar className={cn('size-4', isDisabled && 'opacity-50')} />
              <span>{dateTime}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            className={cn('w-full', buttonStyles[effectiveTone])}
            onClick={onButtonClick}
            disabled={isDisabled}
          >
            {buttonLabel}
          </Button>
          {timeRemaining && (
            <span className={cn('text-sm font-medium text-center w-full', textStyles[effectiveTone])}>
              {timeRemaining}
            </span>
          )}
        </CardFooter>
      </Card>
    )
  }
)

EventCardOrganism.displayName = 'EventCardOrganism'

