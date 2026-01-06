import { type FC } from 'react'
import { cn } from '@/lib/utils'

export const LOGO_VARIANTS = [
  'brasil',
  'selecao'
] as const

export type LogoVariant = (typeof LOGO_VARIANTS)[number]

export interface LogoAtomProps {
  variant: LogoVariant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
}

export const LogoAtom: FC<LogoAtomProps> = ({
                                              variant,
                                              size = 'md',
                                              className
                                            }) => {
  if (!variant) return null

  const src = `/assets/atoms/logo/${variant}.png`

  const alt = `Logo ${variant}`

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden',
        sizeMap[size],
        className
      )}
      role="img"
      aria-label={alt}
    >
      <img src={src} alt={alt} className="h-full w-full object-contain" />
    </div>
  )
}
