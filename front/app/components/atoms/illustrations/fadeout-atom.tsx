import { type FC, useId } from 'react'
import { cn } from '@/lib/utils'

export interface FadeoutAtomProps {
  direction?: 'top' | 'bottom' | 'left' | 'right'
  height?: string
  className?: string
}

// Figma specs: 40px height, backdrop blur, gradient from transparent to background
export const FadeoutAtom: FC<FadeoutAtomProps> = ({
  direction = 'bottom',
  height = '40px',
  className,
}) => {
  const gradientId = useId()

  const getGradient = () => {
    switch (direction) {
      case 'top':
        return {
          x1: '0%',
          y1: '0%',
          x2: '0%',
          y2: '100%',
        }
      case 'bottom':
        return {
          x1: '0%',
          y1: '0%',
          x2: '0%',
          y2: '100%',
        }
      case 'left':
        return {
          x1: '0%',
          y1: '0%',
          x2: '100%',
          y2: '0%',
        }
      case 'right':
        return {
          x1: '0%',
          y1: '0%',
          x2: '100%',
          y2: '0%',
        }
    }
  }

  const isVertical = direction === 'top' || direction === 'bottom'
  const width = isVertical ? '100%' : height
  const heightValue = isVertical ? height : '100%'

  // Figma specs: backdrop-blur-[6px], rounded bottom corners (12px), gradient
  const roundedClasses = isVertical
    ? direction === 'bottom'
      ? 'rounded-bl-[12px] rounded-br-[12px]'
      : 'rounded-tl-[12px] rounded-tr-[12px]'
    : direction === 'right'
      ? 'rounded-tr-[12px] rounded-br-[12px]'
      : 'rounded-tl-[12px] rounded-bl-[12px]'

  return (
    <div
      className={cn(
        'inline-block backdrop-blur-[6px] backdrop-filter',
        roundedClasses,
        className
      )}
      style={{
        width,
        height: heightValue,
        backgroundImage: isVertical
          ? `linear-gradient(${direction === 'bottom' ? '180deg' : '0deg'}, transparent 2.56%, hsl(var(--background)) 52.13%)`
          : `linear-gradient(${direction === 'right' ? '90deg' : '270deg'}, transparent 2.56%, hsl(var(--background)) 52.13%)`,
      }}
      role="img"
      aria-label={`Fade out: ${direction}`}
    />
  )
}

