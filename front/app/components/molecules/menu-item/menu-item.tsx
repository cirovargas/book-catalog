'use client'

import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const menuItemVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        active: 'bg-primary text-primary-foreground shadow-sm',
        inactive: 'bg-background border border-border text-foreground hover:bg-accent/50',
        disabled: 'bg-background border border-border text-muted-foreground opacity-50'
      }
    },
    defaultVariants: {
      variant: 'inactive'
    }
  }
)

export interface MenuItemSubmenuItem {
  label: string
  to?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
}

export interface MenuItemMoleculeProps extends VariantProps<typeof menuItemVariants> {
  icon?: LucideIcon
  label: string
  showCaret?: boolean
  onClick?: () => void
  href?: string
  to?: string
  className?: string
  disabled?: boolean
  items?: MenuItemSubmenuItem[]
  'aria-label'?: string
}

// Hook for click outside detection
const useClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void) => {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}

export const MenuItemMolecule = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, MenuItemMoleculeProps>(
  ({ icon: Icon, label, showCaret = false, onClick, href, to, variant, className, disabled, items, 'aria-label': ariaLabel, ...props }, ref) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(false)
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const triggerRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null)
    const menuRef = React.useRef<HTMLUListElement>(null)
    const itemRefs = React.useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([])

    const hasSubmenu = items && items.length > 0
    const shouldShowCaret = showCaret || hasSubmenu

    // Check if current route matches
    const isActiveRoute = React.useMemo(() => {
      if (disabled) return false
      
      const currentPath = location.pathname
      
      // Check main item
      if (to && currentPath === to) return true
      if (href && currentPath === href) return true
      
      // Check submenu items
      if (items) {
        return items.some(item => {
          if (item.disabled) return false
          if (item.to && currentPath === item.to) return true
          if (item.href && currentPath === item.href) return true
          return false
        })
      }
      
      return false
    }, [location.pathname, to, href, items, disabled])

    const effectiveVariant = disabled ? 'disabled' : (variant || (isActiveRoute ? 'active' : 'inactive'))
    const ItemIcon = Icon

    // Click outside to close
    useClickOutside(containerRef, () => {
      if (isOpen) {
        setIsOpen(false)
        setFocusedIndex(null)
      }
    })

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!hasSubmenu) return

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          setFocusedIndex(0)
        } else if (focusedIndex !== null && items && items[focusedIndex]) {
          const item = items[focusedIndex]
          if (!item.disabled) {
            if (item.onClick) {
              item.onClick()
            } else if (item.to) {
              navigate(item.to)
            } else if (item.href) {
              window.location.href = item.href
            }
            setIsOpen(false)
            setFocusedIndex(null)
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        setFocusedIndex(null)
        triggerRef.current?.focus()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          setFocusedIndex(0)
        } else if (items) {
          setFocusedIndex(prev => {
            if (prev === null) return 0
            const next = prev + 1
            return next >= items.length ? 0 : next
          })
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (isOpen && items) {
          setFocusedIndex(prev => {
            if (prev === null) return items.length - 1
            const next = prev - 1
            return next < 0 ? items.length - 1 : next
          })
        }
      }
    }, [hasSubmenu, isOpen, focusedIndex, items])

    // Focus management
    React.useEffect(() => {
      if (isOpen && focusedIndex !== null && itemRefs.current[focusedIndex]) {
        itemRefs.current[focusedIndex]?.focus()
      }
    }, [isOpen, focusedIndex])

    const handleTriggerClick = (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault()
        return
      }

      if (hasSubmenu) {
        e.preventDefault()
        setIsOpen(prev => !prev)
        if (!isOpen) {
          setFocusedIndex(0)
        } else {
          setFocusedIndex(null)
        }
      } else {
        onClick?.()
      }
    }

    const handleSubmenuItemClick = (item: MenuItemSubmenuItem, index: number) => {
      if (item.disabled) return
      
      if (item.onClick) {
        item.onClick()
      }
      
      setIsOpen(false)
      setFocusedIndex(null)
    }

    const submenuId = React.useId()
    const menuId = `${submenuId}-menu`

    const content = (
      <div className="flex items-center gap-2 w-full">
        {ItemIcon && <ItemIcon className="size-4 shrink-0" />}
        <span className="flex-1">{label}</span>
        {shouldShowCaret && (
          <ChevronDown
            className={cn(
              'size-4 shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        )}
      </div>
    )

    const baseClassName = cn(menuItemVariants({ variant: effectiveVariant }), className)

    // Render submenu
    const renderSubmenu = () => {
      if (!hasSubmenu || !isOpen || !items) return null

      return (
        <ul
          ref={menuRef}
          id={menuId}
          role="menu"
          className="absolute top-full left-0 mt-1 min-w-[200px] rounded-md border border-border bg-popover shadow-lg z-50 py-1"
        >
          {items.map((item, index) => {
            const isFocused = focusedIndex === index
            const isItemActive = (item.to && location.pathname === item.to) || (item.href && location.pathname === item.href)

            const itemContent = (
              <span className="flex items-center gap-2">
                <span>{item.label}</span>
              </span>
            )

            if (item.to) {
              return (
                <li key={index} role="none">
                  <Link
                    ref={el => { itemRefs.current[index] = el }}
                    to={item.to}
                    onClick={() => handleSubmenuItemClick(item, index)}
                    role="menuitem"
                    aria-disabled={item.disabled}
                    aria-current={isItemActive ? 'page' : undefined}
                    tabIndex={isFocused ? 0 : -1}
                    className={cn(
                      'block w-full px-4 py-2 text-sm text-left transition-colors outline-none',
                      'focus-visible:bg-accent focus-visible:text-accent-foreground',
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed pointer-events-none'
                        : 'hover:bg-accent hover:text-accent-foreground cursor-pointer',
                      isItemActive && 'bg-accent/50 font-medium'
                    )}
                  >
                    {itemContent}
                  </Link>
                </li>
              )
            }

            if (item.href) {
              return (
                <li key={index} role="none">
                  <a
                    ref={el => { itemRefs.current[index] = el }}
                    href={item.href}
                    onClick={() => handleSubmenuItemClick(item, index)}
                    role="menuitem"
                    aria-disabled={item.disabled}
                    aria-current={isItemActive ? 'page' : undefined}
                    tabIndex={isFocused ? 0 : -1}
                    className={cn(
                      'block w-full px-4 py-2 text-sm text-left transition-colors outline-none',
                      'focus-visible:bg-accent focus-visible:text-accent-foreground',
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed pointer-events-none'
                        : 'hover:bg-accent hover:text-accent-foreground cursor-pointer',
                      isItemActive && 'bg-accent/50 font-medium'
                    )}
                  >
                    {itemContent}
                  </a>
                </li>
              )
            }

            return (
              <li key={index} role="none">
                <button
                  ref={el => { itemRefs.current[index] = el }}
                  type="button"
                  onClick={() => handleSubmenuItemClick(item, index)}
                  role="menuitem"
                  disabled={item.disabled}
                  tabIndex={isFocused ? 0 : -1}
                  className={cn(
                    'block w-full px-4 py-2 text-sm text-left transition-colors outline-none',
                    'focus-visible:bg-accent focus-visible:text-accent-foreground',
                    item.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-accent hover:text-accent-foreground cursor-pointer'
                  )}
                >
                  {itemContent}
                </button>
              </li>
            )
          })}
        </ul>
      )
    }

    // Container wrapper for positioning
    const wrapper = (
      <div ref={containerRef} className="relative">
        {/* Trigger */}
        {to && !hasSubmenu ? (
          <Link
            ref={triggerRef as any}
            to={to}
            className={baseClassName}
            aria-label={ariaLabel || label}
            aria-disabled={disabled}
            aria-current={isActiveRoute ? 'page' : undefined}
            onClick={disabled ? (e) => e.preventDefault() : onClick}
            {...(props as any)}
          >
            {content}
          </Link>
        ) : href && !hasSubmenu ? (
          <a
            ref={triggerRef as any}
            href={disabled ? undefined : href}
            className={baseClassName}
            aria-label={ariaLabel || label}
            aria-disabled={disabled}
            aria-current={isActiveRoute ? 'page' : undefined}
            onClick={disabled ? (e) => e.preventDefault() : onClick}
            {...props}
          >
            {content}
          </a>
        ) : (
          <button
            ref={triggerRef as any}
            type="button"
            onClick={handleTriggerClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={baseClassName}
            aria-label={ariaLabel || label}
            aria-expanded={hasSubmenu ? isOpen : undefined}
            aria-controls={hasSubmenu ? menuId : undefined}
            aria-haspopup={hasSubmenu ? 'menu' : undefined}
            aria-current={!hasSubmenu && isActiveRoute ? 'page' : undefined}
            {...props}
          >
            {content}
          </button>
        )}

        {/* Submenu */}
        {renderSubmenu()}
      </div>
    )

    return wrapper
  }
)

MenuItemMolecule.displayName = 'MenuItemMolecule'
