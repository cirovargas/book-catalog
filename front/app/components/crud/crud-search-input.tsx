import * as React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

type CrudSearchInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'onChange' | 'value'
> & {
  value: string
  onChange: (value: string) => void
}

function CrudSearchInput({
                           value,
                           onChange,
                           className,
                           placeholder = 'Search...',
                           ...props
                         }: CrudSearchInputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <div
      data-slot="crud-search-input-wrapper"
      className="relative flex-1 max-w-sm"
    >
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        data-slot="crud-search-input"
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn('pl-10', className)}
        {...props}
      />
    </div>
  )
}

export { CrudSearchInput }
