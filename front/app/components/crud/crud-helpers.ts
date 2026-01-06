import type { PaginationState, ListParams, ListResponse, SortConfig } from './crud-types'

/**
 * Normalize sort direction
 */
export function normalizeSortDir(dir?: string | null): 'asc' | 'desc' {
  if (dir === 'asc' || dir === 'desc') {
    return dir
  }
  return 'asc'
}

/**
 * Normalize sort by field
 */
export function normalizeSortBy(sortBy?: string | null): string | undefined {
  return sortBy && sortBy.trim() ? sortBy.trim() : undefined
}

/**
 * Create sort config from params
 */
export function createSortConfig(params?: ListParams): SortConfig {
  return {
    sortBy: normalizeSortBy(params?.sortBy),
    sortDir: normalizeSortDir(params?.sortDir)
  }
}

/**
 * Safely get page number (must be >= 1)
 */
export function safePage(page?: number | string | null): number {
  const parsed = typeof page === 'string' ? parseInt(page, 10) : page
  if (!parsed || parsed < 1 || isNaN(parsed)) {
    return 1
  }
  return parsed
}

/**
 * Safely get limit/pageSize (must be >= 1)
 */
export function safeLimit(limit?: number | string | null, defaultLimit = 10): number {
  const parsed = typeof limit === 'string' ? parseInt(limit, 10) : limit
  if (!parsed || parsed < 1 || isNaN(parsed)) {
    return defaultLimit
  }
  return parsed
}

/**
 * Calculate pagination state from response
 */
export function calculatePaginationState<T>(
  response: ListResponse<T>,
  pageSize?: number
): PaginationState {
  const limit = pageSize || response.limit || 10
  const page = safePage(response.page)
  const total = response.total || 0
  const pages = response.pages || Math.ceil(total / limit)

  return {
    page,
    pageSize: limit,
    totalItems: total,
    totalPages: pages,
    hasNextPage: page < pages,
    hasPrevPage: page > 1
  }
}

/**
 * Derive pagination summary text
 */
export function getPaginationSummary(
  page: number,
  pageSize: number,
  totalItems: number,
  entityLabel = 'items'
): string {
  if (totalItems === 0) {
    return `Showing 0 ${entityLabel}`
  }

  const safePage = page < 1 ? 1 : page
  const start = (safePage - 1) * pageSize + 1
  const end = Math.min(safePage * pageSize, totalItems)

  return `Showing ${start} to ${end} of ${totalItems} ${entityLabel}`
}

/**
 * Build query params from ListParams
 */
export function buildQueryParams(params: ListParams): URLSearchParams {
  const searchParams = new URLSearchParams()

  if (params.page !== undefined && params.page !== null) {
    searchParams.set('page', String(safePage(params.page)))
  }

  if (params.limit !== undefined && params.limit !== null) {
    searchParams.set('limit', String(safeLimit(params.limit)))
  }

  if (params.search && params.search.trim()) {
    searchParams.set('search', params.search.trim())
  }

  if (params.sortBy && params.sortBy.trim()) {
    searchParams.set('sortBy', params.sortBy.trim())
    searchParams.set('sortDir', normalizeSortDir(params.sortDir))
  }

  return searchParams
}

/**
 * Adapter to convert API response to ListResponse<T>
 * Useful when API structure differs slightly
 */
export function adaptListResponse<T>(
  response: any,
  itemsPath?: string,
  totalPath?: string,
  pagePath?: string,
  limitPath?: string
): ListResponse<T> {
  const items = itemsPath ? getNestedValue(response, itemsPath) : response.items || response.data || []
  const total = totalPath ? getNestedValue(response, totalPath) : response.total || response.count || 0
  const page = pagePath ? getNestedValue(response, pagePath) : response.page || 1
  const limit = limitPath ? getNestedValue(response, limitPath) : response.limit || response.per_page || 10

  return {
    items: Array.isArray(items) ? items : [],
    total: typeof total === 'number' ? total : 0,
    page: safePage(page),
    limit: safeLimit(limit),
    pages: response.pages || Math.ceil(total / limit)
  }
}

/**
 * Helper to get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

