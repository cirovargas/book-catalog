import { type FC } from 'react'
import { cn } from '@/lib/utils'

export const ILLUSTRATION_VARIANTS = [
  'ball',
  'bench',
  'board',
  'captain-armband',
  'first',
  'football-boots',
  'football-equipament',
  'football-goalpost',
  'free-kick',
  'goalkeeper',
  'goalkeeper-gloves',
  'goalpost',
  'golden-boots',
  'golden-glove',
  'gooooool',
  'kicking',
  'locker-room',
  'penalty',
  'red-card-1',
  'red-card-2',
  'score-board-1',
  'score-board-2',
  'shirt',
  'stadium',
  'strategy',
  'ticket',
  'trophy',
  'water',
  'whistle',
  'yellow-card'
] as const

export type IllustrationVariant = (typeof ILLUSTRATION_VARIANTS)[number]

export interface IllustrationAtomProps {
  variant: IllustrationVariant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
}

export const IllustrationAtom: FC<IllustrationAtomProps> = ({
                                                              variant,
                                                              size = 'md',
                                                              className
                                                            }) => {
  if (!variant) return null

  const src = `/assets/atoms/illustration/${variant}.png`
  const alt = `Ilustração ${variant}`

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
