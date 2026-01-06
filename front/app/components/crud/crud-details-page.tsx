import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { CrudDetailLayout } from './crud-layouts'
import { CrudPageHeader } from './crud-page-header'
import { cn } from '@/lib/utils'

type FieldRenderer<T> = (value: any, item: T) => React.ReactNode

type CrudDetailsPageProps<T> = {
  // Data & Loading
  data: T | null | undefined
  isLoading?: boolean

  // Page header
  title: string
  description?: string
  headerActions?: React.ReactNode
  backUrl?: string
  backLabel?: string

  // Fields configuration
  fields: Array<{
    key: string
    label: string
    render?: FieldRenderer<T>
    className?: string
  }>

  // Empty/Error states
  notFoundTitle?: string
  notFoundDescription?: string

  // Customizations
  className?: string
}

export function CrudDetailsPage<T extends Record<string, any>>({
  data,
  isLoading = false,
  title,
  description,
  headerActions,
  backUrl,
  backLabel = 'Back',
  fields,
  notFoundTitle = 'Item not found',
  notFoundDescription = 'The requested item could not be found.',
  className
}: CrudDetailsPageProps<T>) {
  if (isLoading) {
    return (
      <CrudDetailLayout className={className}>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="md" />
        </div>
      </CrudDetailLayout>
    )
  }

  if (!data) {
    return (
      <CrudDetailLayout className={className}>
        <CrudPageHeader
          title={notFoundTitle}
          description={notFoundDescription}
        />
        <Card>
          <CardContent className="py-8">
            <p className="text-sm text-muted-foreground text-center">
              {notFoundDescription}
            </p>
          </CardContent>
        </Card>
      </CrudDetailLayout>
    )
  }

  const defaultFieldRenderer: FieldRenderer<T> = (value) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">N/A</span>
    }

    if (typeof value === 'boolean') {
      return <span>{value ? 'Yes' : 'No'}</span>
    }

    if (Array.isArray(value)) {
      return <span>{value.length} items</span>
    }

    if (typeof value === 'object') {
      return <span className="text-muted-foreground">[Object]</span>
    }

    return <span>{String(value)}</span>
  }

  return (
    <CrudDetailLayout className={className}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {backUrl && (
            <a
              href={backUrl}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← {backLabel}
            </a>
          )}
          <CrudPageHeader
            title={title}
            description={description}
          />
        </div>

        {headerActions && (
          <div className="flex items-center gap-2">
            {headerActions}
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            {fields.map((field) => {
              const value = data[field.key]
              const render = field.render || defaultFieldRenderer
              const renderedValue = render(value, data)

              return (
                <div
                  key={field.key}
                  className={cn(
                    'grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4',
                    field.className
                  )}
                >
                  <dt className="text-sm font-medium text-muted-foreground">
                    {field.label}
                  </dt>
                  <dd className="text-sm sm:col-span-2">
                    {renderedValue}
                  </dd>
                </div>
              )
            })}
          </dl>
        </CardContent>
      </Card>
    </CrudDetailLayout>
  )
}

