import { type FC } from 'react'
import { cn } from '@/lib/utils'
import { ILLUSTRATION_VARIANTS } from '@/components/atoms/illustrations/illustration-atom'

export type AvatarSize = 'extra-tiny' | 'tiny' | 'small' | 'regular'
export type AvatarRoundness = 'round' | 'roundrect'
export type AvatarPicture = 'on' | 'off'

export interface AvatarAtomProps {
  size?: AvatarSize
  roundness?: AvatarRoundness
  picture?: AvatarPicture
  src?: string
  alt?: string
  className?: string
}

const getRandomIllustration = () => {
  const pick = ILLUSTRATION_VARIANTS[Math.floor(Math.random() * ILLUSTRATION_VARIANTS.length)]
  return `/assets/atoms/illustration/${pick}.png`
}

// Avatar sizing
const sizeMap: Record<AvatarSize, string> = {
  'extra-tiny': 'w-5 h-5',
  tiny: 'w-6 h-6',
  small: 'w-8 h-8',
  regular: 'w-10 h-10'
}

// Avatar rounding
const roundnessMap: Record<AvatarRoundness, Record<AvatarSize, string>> = {
  round: {
    'extra-tiny': 'rounded-full',
    tiny: 'rounded-full',
    small: 'rounded-full',
    regular: 'rounded-full'
  },
  roundrect: {
    'extra-tiny': 'rounded-[4px]',
    tiny: 'rounded-[6px]',
    small: 'rounded-[10px]',
    regular: 'rounded-[12px]'
  }
}

export const AvatarAtom: FC<AvatarAtomProps> = ({
                                                  size = 'regular',
                                                  roundness = 'round',
                                                  picture = 'off',
                                                  src,
                                                  alt = 'Avatar',
                                                  className
                                                }) => {
  const sizeClass = sizeMap[size]
  const roundnessClass = roundnessMap[roundness][size]

  if (picture === 'on' && src) {
    return (
      <div
        className={cn(
          sizeClass,
          roundnessClass,
          'border border-primary overflow-hidden relative',
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }

  if (picture === 'on' && !src) {
    const fallback = getRandomIllustration()

    return (
      <div
        className={cn(
          sizeClass,
          roundnessClass,
          'border border-primary overflow-hidden relative bg-muted',
          className
        )}
      >
        <img
          src={fallback}
          alt="Fallback avatar illustration"
          className="absolute inset-0 w-full h-full object-contain p-1"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        sizeClass,
        roundnessClass,
        'border border-primary bg-[#f3f9fc] dark:bg-muted flex items-center justify-center overflow-hidden relative',
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Placeholder icon (same as before) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'absolute',
          size === 'regular' ? 'left-[7px] top-[7px] w-[2.88px] h-[2.88px]' :
            size === 'small' ? 'left-[5px] top-[5px] w-2 h-2' :
              size === 'tiny' ? 'left-[3.5px] top-[4px] w-[15px] h-[15px]' :
                'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.5px] h-[0.5px]'
        )}
      >
        <path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        />
        <path
          d="M12 14C7.58172 14 4 16.6863 4 20V22H20V20C20 16.6863 16.4183 14 12 14Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        />
      </svg>
    </div>
  )
}
