import { type FC } from 'react'
import { cn } from '@/lib/utils'

export interface TeamFlagAtomProps {
  variant?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap: Record<NonNullable<TeamFlagAtomProps['size']>, string> = {
  sm: 'w-16 h-16',
  md: 'w-20 h-20',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
}

// Generic placeholder SVG for team/organization flag
const PlaceholderFlag = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="100" height="100" rx="8" fill="currentColor" className="opacity-10" />
    <rect x="10" y="10" width="80" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="40" r="12" fill="currentColor" className="opacity-30" />
    <path d="M50 28 L45 38 L55 38 Z" fill="currentColor" className="opacity-60" />
  </svg>
)

export const TeamFlagAtom: FC<TeamFlagAtomProps> = ({
  variant,
  size = 'md',
  className
}) => {
  const label = variant ? `Team flag: ${variant}` : 'Team flag'

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded bg-background',
        sizeMap[size],
        className
      )}
      role="img"
      aria-label={label}
    >
      <PlaceholderFlag className="h-full w-full" />
    </div>
  )
}
