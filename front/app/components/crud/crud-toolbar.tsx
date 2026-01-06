import * as React from 'react'
import { Button } from '@/components/ui/button'
import { CrudSearchInput } from './crud-search-input'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

type CrudToolbarProps = React.ComponentProps<'div'> & {
  searchValue: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  searchPlaceholder?: string
  primaryAction?: React.ReactNode
  secondaryActions?: React.ReactNode
}

export function CrudToolbar({
  searchValue,
  onSearchChange,
  onSearch,
  searchPlaceholder = 'Search...',
  primaryAction,
  secondaryActions,
  className,
  ...props
}: CrudToolbarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSearch()
    }
  }

  return (
    <div
      data-slot="crud-toolbar"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    >
      <div className="flex flex-1 items-center gap-2 min-w-[200px]">
        <CrudSearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSearch}
          aria-label="Search"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search
        </Button>
      </div>

      {secondaryActions && (
        <div
          data-slot="crud-toolbar-secondary"
          className="flex items-center gap-2"
        >
          {secondaryActions}
        </div>
      )}

      {primaryAction && (
        <div
          data-slot="crud-toolbar-primary"
          className="flex items-center"
        >
          {primaryAction}
        </div>
      )}
    </div>
  )
}

