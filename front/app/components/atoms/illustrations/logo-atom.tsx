import { type FC } from 'react'
import { cn } from '@/lib/utils'

export const LOGO_VARIANTS = [
  'primary',
  'secondary'
] as const

export type LogoVariant = (typeof LOGO_VARIANTS)[number]

export interface LogoAtomProps {
  variant?: LogoVariant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
}

// Generic placeholder SVG mark
const PlaceholderMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="100" height="100" rx="20" fill="currentColor" className="opacity-20" />
    <rect x="20" y="20" width="60" height="60" rx="12" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="15" fill="currentColor" />
  </svg>
)

export const LogoAtom: FC<LogoAtomProps> = ({
  variant = 'primary',
  size = 'md',
  className
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden',
        sizeMap[size],
        className
      )}
      role="img"
      aria-label="Organization logo"
    >
      <PlaceholderMark className="h-full w-full" />
    </div>
  )
}
