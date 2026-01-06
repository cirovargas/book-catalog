'use client'

import * as React from 'react'
import { Button as BaseButton, buttonVariants, type ButtonProps as BaseButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

// Extended button variants for ButtonMolecule
const buttonMoleculeVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--button-primary)] text-[var(--button-primary-foreground)] hover:opacity-90 focus-visible:ring-[var(--button-primary)]/50 shadow-xs',
        secondary: 'bg-transparent border border-[var(--button-primary)] text-[var(--button-secondary-foreground)] hover:bg-[var(--button-primary)]/10 focus-visible:ring-[var(--button-primary)]/50',
        error: 'bg-[var(--button-error)] text-[var(--button-error-foreground)] hover:opacity-90 focus-visible:ring-[var(--button-error)]/50 shadow-xs',
        neutral: 'bg-[var(--button-neutral)] text-[var(--button-neutral-foreground)] hover:opacity-90 focus-visible:ring-[var(--button-neutral)]/50 shadow-xs',
        tertiary: 'bg-[var(--button-tertiary)] text-[var(--button-tertiary-foreground)] hover:opacity-90 focus-visible:ring-[var(--button-tertiary-foreground)]/50 shadow-xs',
        // Legacy variants for backward compatibility
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50'
      },
      size: {
        sm: 'h-8 rounded-[12px] gap-1.5 px-3 text-sm has-[>svg]:px-2.5',
        default: 'h-9 rounded-[12px] gap-2 px-4 text-sm py-2 has-[>svg]:px-3',
        lg: 'h-14 rounded-[12px] gap-4 px-8 py-3 text-base has-[>svg]:px-6',
        icon: 'size-9 rounded-[12px]'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
)

export interface ButtonMoleculeProps extends Omit<BaseButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'error' | 'neutral' | 'tertiary' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg' | 'icon'
}

export const ButtonMolecule = React.forwardRef<HTMLButtonElement, ButtonMoleculeProps>(
  ({ variant = 'primary', size = 'default', className, ...props }, ref) => {
    // Map legacy variants to base button for backward compatibility
    const legacyVariants = ['outline', 'ghost']
    const isLegacyVariant = legacyVariants.includes(variant)

    if (isLegacyVariant) {
      // Use base button for legacy variants to maintain existing behavior
      const variantMap: Record<string, BaseButtonProps['variant']> = {
        outline: 'outline',
        ghost: 'ghost'
      }
      return (
        <BaseButton
          ref={ref}
          variant={variantMap[variant] || 'default'}
          size={size === 'lg' ? 'lg' : size}
          className={className}
          {...props}
        />
      )
    }

    // Use new molecule variants for semantic color variants
    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonMoleculeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

ButtonMolecule.displayName = 'ButtonMolecule'
