import * as React from 'react'
import { cn } from '@/lib/utils'

type CrudLayoutProps = React.ComponentProps<'div'> & {
  header: React.ReactNode
  children: React.ReactNode
}

function CrudIndexLayout({ header, children, className, ...props }: CrudLayoutProps) {
  return (
    <div
      data-slot="crud-index-layout"
      className={cn('space-y-6', className)}
      {...props}
    >
      {header}
      {children}
    </div>
  )
}

function CrudFormLayout({ header, children, className, ...props }: CrudLayoutProps) {
  return (
    <div
      data-slot="crud-form-layout"
      className={cn('space-y-6', className)}
      {...props}
    >
      {header}
      <div
        data-slot="crud-form-layout-body"
        className="flex flex-col items-start"
      >
        {children}
      </div>
    </div>
  )
}

function CrudDetailLayout({ header, children, className, ...props }: CrudLayoutProps) {
  return (
    <div
      data-slot="crud-detail-layout"
      className={cn('space-y-6', className)}
      {...props}
    >
      {header}
      {children}
    </div>
  )
}

export { CrudIndexLayout, CrudFormLayout, CrudDetailLayout }
