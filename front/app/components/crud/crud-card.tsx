import * as React from 'react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

type CrudCardProps = React.ComponentProps<typeof Card> & {
  title: React.ReactNode
  description?: React.ReactNode
  statusSlot?: React.ReactNode
  toolbarSlot?: React.ReactNode
  footerSlot?: React.ReactNode
}

function CrudCard({
                    title,
                    description,
                    statusSlot,
                    toolbarSlot,
                    footerSlot,
                    className,
                    children,
                    ...props
                  }: CrudCardProps) {
  return (
    <Card
      data-slot="crud-card"
      className={cn(className)}
      {...props}
    >
      <CardHeader data-slot="crud-card-header">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {description ? (
              <CardDescription>{description}</CardDescription>
            ) : null}
          </div>

          {statusSlot ? (
            <CardAction data-slot="crud-card-status">{statusSlot}</CardAction>
          ) : null}
        </div>

        {toolbarSlot ? (
          <div
            data-slot="crud-card-toolbar"
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            {toolbarSlot}
          </div>
        ) : null}
      </CardHeader>

      <CardContent data-slot="crud-card-content">{children}</CardContent>

      {footerSlot ? (
        <CardFooter data-slot="crud-card-footer">
          {footerSlot}
        </CardFooter>
      ) : null}
    </Card>
  )
}

export { CrudCard }
