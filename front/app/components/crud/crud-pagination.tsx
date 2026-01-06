import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type CrudPaginationProps = React.ComponentProps<'div'> & {
  page: number
  pageSize: number
  totalItems: number
  hasPrevPage: boolean
  hasNextPage: boolean
  onPageChange: (page: number) => void
  entityLabel?: string
}

function CrudPagination({
                          page,
                          pageSize,
                          totalItems,
                          hasPrevPage,
                          hasNextPage,
                          onPageChange,
                          entityLabel = 'items',
                          className,
                          ...props
                        }: CrudPaginationProps) {
  const safePage = page < 1 ? 1 : page
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1
  const end = Math.min(safePage * pageSize, totalItems)

  function handlePrevious() {
    if (!hasPrevPage) return
    onPageChange(safePage - 1)
  }

  function handleNext() {
    if (!hasNextPage) return
    onPageChange(safePage + 1)
  }

  return (
    <div
      data-slot="crud-pagination"
      className={cn(
        'mt-6 flex items-center justify-between gap-4 text-sm',
        className
      )}
      {...props}
    >
      <div
        data-slot="crud-pagination-summary"
        className="text-muted-foreground"
      >
        {totalItems === 0 ? (
          <>Showing 0 {entityLabel}</>
        ) : (
          <>
            Showing {start} to {end} of {totalItems} {entityLabel}
          </>
        )}
      </div>

      <div
        data-slot="crud-pagination-controls"
        className="flex items-center gap-2"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!hasPrevPage}
        >
          <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Previous
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!hasNextPage}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

export { CrudPagination }
