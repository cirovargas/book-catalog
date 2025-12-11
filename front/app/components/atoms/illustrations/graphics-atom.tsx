import { type FC } from 'react'
import { cn } from '@/lib/utils'

export const GRAPHICS_VARIANTS = [
  'vector-blue',
  'vector-yellow',
] as const

export type GraphicsVariant = (typeof GRAPHICS_VARIANTS)[number]

export interface GraphicsAtomProps {
  variant: GraphicsVariant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
  xl: 'w-40 h-40',
}

export const GraphicsAtom: FC<GraphicsAtomProps> = ({
                                                      variant,
                                                      size = 'md',
                                                      className
                                                    }) => {
  if (!variant) return null

  const src = `/assets/atoms/graphics/${variant}.png`
  const alt = `Graphic ${variant}`

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
