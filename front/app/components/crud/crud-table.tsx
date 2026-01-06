import * as React from 'react'
import {
  type Table as TanStackTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CrudEmptyState } from './crud-empty-state'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { cn } from '@/lib/utils'

type CrudTableProps<TData> = React.ComponentProps<'div'> & {
  table: TanStackTable<TData>
  isLoading?: boolean
  emptyState?: React.ReactNode
  emptyStateTitle?: string
  emptyStateDescription?: string
  emptyStateAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  enableSorting?: boolean
  rowActionsCellId?: string
}

export function CrudTable<TData>({
  table,
  isLoading = false,
  emptyState,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateAction,
  enableSorting = true,
  rowActionsCellId = 'actions',
  className,
  ...props
}: CrudTableProps<TData>) {
  const rows = table.getRowModel().rows
  const isEmpty = !isLoading && rows.length === 0

  if (isLoading) {
    return (
      <div
        data-slot="crud-table-loading"
        className={cn('flex items-center justify-center py-12', className)}
        {...props}
      >
        <LoadingSpinner size="md" />
      </div>
    )
  }

  if (isEmpty) {
    if (emptyState) {
      return <>{emptyState}</>
    }

    return (
      <CrudEmptyState
        title={emptyStateTitle}
        description={emptyStateDescription}
        action={emptyStateAction}
      />
    )
  }

  return (
    <div
      data-slot="crud-table-container"
      className={cn('rounded-md border', className)}
      {...props}
    >
      <Table data-slot="crud-table">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} data-slot="crud-table-header-row">
              {headerGroup.headers.map((header) => {
                const isActionsCell = header.id === rowActionsCellId
                const canSort = enableSorting && !isActionsCell && header.column.getCanSort()

                return (
                  <TableHead
                    key={header.id}
                    data-slot="crud-table-header-cell"
                    className={isActionsCell ? 'w-[50px] text-right' : ''}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          'flex items-center',
                          canSort && 'cursor-pointer select-none',
                          isActionsCell && 'justify-end'
                        )}
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              data-slot="crud-table-row"
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => {
                const isActionsCell = cell.column.id === rowActionsCellId
                return (
                  <TableCell
                    key={cell.id}
                    data-slot="crud-table-cell"
                    className={isActionsCell ? 'w-[50px] text-right' : ''}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

