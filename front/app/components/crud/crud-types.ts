import { type ColumnDef } from '@tanstack/react-table'

/**
 * Pagination state interface
 */
export interface PaginationState {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

/**
 * Parameters for list/fetch operations
 */
export interface ListParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

/**
 * Standard list response structure
 */
export interface ListResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pages?: number
}

/**
 * Alias for TanStack Table ColumnDef
 */
export type CrudColumn<T> = ColumnDef<T>

/**
 * Sort configuration
 */
export interface SortConfig {
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

/**
 * Search state
 */
export interface SearchState {
  draft: string // Local draft value
  committed: string // Committed value for API calls
}

