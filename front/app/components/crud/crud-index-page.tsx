import * as React from 'react'
import {
  type ColumnDef,
  type SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { CrudIndexLayout } from './crud-layouts'
import { CrudPageHeader } from './crud-page-header'
import { CrudCard } from './crud-card'
import { CrudToolbar } from './crud-toolbar'
import { CrudTable } from './crud-table'
import { CrudPagination } from './crud-pagination'
import type { PaginationState, CrudColumn } from './crud-types'

type CrudIndexPageProps<TData> = {
  // Data & Loading
  data: TData[]
  isLoading?: boolean

  // Columns configuration
  columns: CrudColumn<TData>[]

  // Page header
  title: string
  description?: string
  headerActions?: React.ReactNode

  // Search
  searchValue: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  searchPlaceholder?: string

  // Pagination
  pagination: PaginationState
  onPageChange: (page: number) => void
  entityLabel?: string

  // Sorting (optional - can be handled client-side or server-side)
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  enableSorting?: boolean

  // Toolbar actions
  primaryAction?: React.ReactNode
  secondaryActions?: React.ReactNode

  // Empty state
  emptyStateTitle?: string
  emptyStateDescription?: string
  emptyStateAction?: {
    label: string
    onClick?: () => void
    href?: string
  }

  // Customizations
  rowActionsCellId?: string
  className?: string
}

export function CrudIndexPage<TData>({
  data,
  isLoading = false,
  columns,
  title,
  description,
  headerActions,
  searchValue,
  onSearchChange,
  onSearch,
  searchPlaceholder,
  pagination,
  onPageChange,
  entityLabel = 'items',
  sorting,
  onSortingChange,
  enableSorting = true,
  primaryAction,
  secondaryActions,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateAction,
  rowActionsCellId = 'actions',
  className
}: CrudIndexPageProps<TData>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const isControlledSorting = sorting !== undefined && onSortingChange !== undefined

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    onSortingChange: isControlledSorting ? onSortingChange : setInternalSorting,
    state: {
      sorting: isControlledSorting ? sorting : internalSorting
    },
    enableSorting,
    manualSorting: isControlledSorting // If controlled, sorting is handled externally
  })

  return (
    <CrudIndexLayout className={className}>
      <CrudPageHeader
        title={title}
        description={description}
        actions={headerActions}
      />

      <CrudCard
        title={null}
        toolbarSlot={
          <CrudToolbar
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onSearch={onSearch}
            searchPlaceholder={searchPlaceholder}
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
          />
        }
        footerSlot={
          <CrudPagination
            page={pagination.page}
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            hasPrevPage={pagination.hasPrevPage}
            hasNextPage={pagination.hasNextPage}
            onPageChange={onPageChange}
            entityLabel={entityLabel}
          />
        }
      >
        <CrudTable
          table={table}
          isLoading={isLoading}
          enableSorting={enableSorting}
          rowActionsCellId={rowActionsCellId}
          emptyStateTitle={emptyStateTitle}
          emptyStateDescription={emptyStateDescription}
          emptyStateAction={emptyStateAction}
        />
      </CrudCard>
    </CrudIndexLayout>
  )
}

