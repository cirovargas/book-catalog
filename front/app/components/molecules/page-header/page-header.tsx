'use client'

import * as React from 'react'
import { Link } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface PageHeaderBreadcrumbItem {
  label: string
  href?: string
}

export interface PageHeaderMoleculeProps {
  breadcrumbs?: PageHeaderBreadcrumbItem[]
  title: string
  backLink?: {
    label?: string
    href: string
  }
  className?: string
}

export const PageHeaderMolecule = React.forwardRef<HTMLDivElement, PageHeaderMoleculeProps>(
  ({ breadcrumbs, title, backLink, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
        {backLink && (
          <Link to={backLink.href}>
            <Button variant="ghost" size="sm" className="gap-2 -ml-2">
              <ChevronLeft className="size-4" />
              {backLink.label || 'Back'}
            </Button>
          </Link>
        )}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1

                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {isLast || !crumb.href ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.href}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
    )
  }
)

PageHeaderMolecule.displayName = 'PageHeaderMolecule'

