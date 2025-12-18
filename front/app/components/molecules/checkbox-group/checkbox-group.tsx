'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface CheckboxGroupOption {
  label: string
  value: string
  disabled?: boolean
}

export interface CheckboxGroupMoleculeProps {
  label?: string
  options: CheckboxGroupOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  defaultValue?: string[]
  className?: string
  disabled?: boolean
}

export const CheckboxGroupMolecule = React.forwardRef<HTMLDivElement, CheckboxGroupMoleculeProps>(
  ({ label, options, value, onChange, defaultValue = [], className, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = React.useCallback(
      (optionValue: string, checked: boolean) => {
        if (disabled) return

        const newValue = checked
          ? [...currentValue, optionValue]
          : currentValue.filter((v) => v !== optionValue)

        if (!isControlled) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [currentValue, disabled, isControlled, onChange]
    )

    return (
      <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
        {label && (
          <Label className={cn(disabled && 'opacity-50')}>{label}</Label>
        )}
        <div className="flex flex-col gap-3">
          {options.map((option) => {
            const isChecked = currentValue.includes(option.value)
            const isOptionDisabled = option.disabled || disabled

            return (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${option.value}`}
                  checked={isChecked}
                  onCheckedChange={(checked) => handleChange(option.value, checked === true)}
                  disabled={isOptionDisabled}
                  aria-label={option.label}
                />
                <Label
                  htmlFor={`checkbox-${option.value}`}
                  className={cn(
                    'text-sm font-normal cursor-pointer',
                    isOptionDisabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {option.label}
                </Label>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

CheckboxGroupMolecule.displayName = 'CheckboxGroupMolecule'

