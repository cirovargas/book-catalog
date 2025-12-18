'use client'

import * as React from 'react'
import { Link } from 'react-router'
import { MapPin, Calendar, Plus } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

export interface DashboardCardOrganismProps {
  teamA: DashboardTeam
  teamB: DashboardTeam
  location: string
  dateTime: string
  badges?: DashboardBadge[]
  chart?: React.ReactNode
  actionLabel?: string
  actionHref?: string
  actionOnClick?: () => void
  className?: string
}

export const DashboardCardOrganism = React.forwardRef<HTMLDivElement, DashboardCardOrganismProps>(
  ({ teamA, teamB, location, dateTime, badges = [], chart, actionLabel = 'Sobre este evento', actionHref, actionOnClick, className, ...props }, ref) => {
    const defaultBadges: DashboardBadge[] = [
      { label: 'Pendentes', value: 12, variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
      { label: 'Aprovados', value: 95, variant: 'secondary', className: 'bg-green-100 text-green-800 border-green-300' },
      { label: 'Impressos', value: 2, variant: 'secondary', className: 'bg-blue-100 text-blue-800 border-blue-300' },
      { label: 'Cadastros', value: 107, variant: 'secondary', className: 'bg-gray-100 text-gray-800 border-gray-300' }
    ]

    const displayBadges = badges.length > 0 ? badges : defaultBadges

    return (
      <Card ref={ref} className={cn('w-full', className)} {...props}>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            {/* Teams */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-shrink-0">
                {teamA.logo || (
                  <div className="size-10 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold">{teamA.name[0]}</span>
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{teamA.name}</span>
                  {teamA.state && <span className="text-xs text-muted-foreground">{teamA.state}</span>}
                </div>
              </div>
              <span className="text-lg font-bold mx-2">x</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                {teamB.logo || (
                  <div className="size-10 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold">{teamB.name[0]}</span>
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{teamB.name}</span>
                  {teamB.state && <span className="text-xs text-muted-foreground">{teamB.state}</span>}
                </div>
              </div>
            </div>

            {/* Badges */}
            {displayBadges.length > 0 && (
              <div className="flex flex-col gap-1 flex-shrink-0">
                {displayBadges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant={badge.variant || 'secondary'}
                    className={cn('w-fit', badge.className)}
                  >
                    {badge.value} {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Location and DateTime */}
          <div className="flex flex-col gap-2 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{dateTime}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {chart ? (
            <div className="flex items-center justify-center py-4">
              {chart}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4 min-h-[120px]">
              <div className="w-32 h-32 rounded-full border-8 border-green-500 border-t-yellow-500 flex items-center justify-center">
                <span className="text-2xl font-bold">95%</span>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center">
          {actionHref ? (
            <Button variant="outline" asChild>
              <Link to={actionHref}>
                <Plus className="size-4 mr-2" />
                {actionLabel}
              </Link>
            </Button>
          ) : (
            <Button variant="outline" onClick={actionOnClick}>
              <Plus className="size-4 mr-2" />
              {actionLabel}
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }
)

DashboardCardOrganism.displayName = 'DashboardCardOrganism'

