import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-10 h-10'
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  return (
    <div className={cn(
      'border-4 border-muted-foreground/20 border-t-primary rounded-full animate-spin',
      sizeClasses[size],
      className
    )} />
  )
}
