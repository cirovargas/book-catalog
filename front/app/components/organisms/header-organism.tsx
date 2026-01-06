'use client'

import * as React from 'react'
import { Link, useLocation } from 'react-router'
import { Home, Briefcase, Users, Calendar, Settings, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export interface HeaderMenuItem {
  label: string
  to?: string
  icon?: LucideIcon
  children?: Array<{ label: string; to: string }>
}

export interface HeaderUser {
  name: string
  email?: string
  avatarSrc?: string
}

export interface HeaderOrganismProps {
  items?: HeaderMenuItem[]
  user?: HeaderUser
  onLogout?: () => void
  logo?: React.ReactNode
  className?: string
}

const defaultIconMap: Record<string, LucideIcon> = {
  Home: Home,
  Companies: Briefcase,
  People: Users,
  Events: Calendar,
  Settings: Settings
}

export const HeaderOrganism = React.forwardRef<HTMLElement, HeaderOrganismProps>(
  ({ items = [], user, onLogout, logo, className, ...props }, ref) => {
    const location = useLocation()
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({})

    const defaultItems: HeaderMenuItem[] = [
      { label: 'Home', to: '/dashboard', icon: Home },
      { label: 'Companies', to: '/companies', icon: Briefcase },
      { label: 'People', to: '/users', icon: Users },
      { label: 'Events', to: '/events', icon: Calendar },
      { label: 'Settings', to: '/settings', icon: Settings }
    ]

    const menuItems = items.length > 0 ? items : defaultItems

    const isActiveRoute = (path?: string) => {
      if (!path) return false
      return location.pathname === path
    }

    const isMenuItemActive = (item: HeaderMenuItem) => {
      if (item.to && isActiveRoute(item.to)) return true
      if (item.children) {
        return item.children.some(child => isActiveRoute(child.to))
      }
      return false
    }

    const toggleMenu = (label: string) => {
      setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }))
    }

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <header
        ref={ref as any}
        className={cn('flex items-center justify-between px-6 py-4 border-b bg-background', className)}
        {...props}
      >
        {/* Logo */}
        <div className="flex items-center">
          {logo || (
            <Link to="/dashboard" className="flex items-center gap-2" aria-label="Home">
              <div className="text-xl font-bold text-primary">ORGANIZATION</div>
            </Link>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-2" aria-label="Main navigation">
          {menuItems.map((item) => {
            const ItemIcon = item.icon || defaultIconMap[item.label]
            const isActive = isMenuItemActive(item)
            const hasChildren = item.children && item.children.length > 0
            const isMenuOpen = openMenus[item.label] || false

            if (hasChildren) {
              return (
                <DropdownMenu key={item.label} open={isMenuOpen} onOpenChange={(open) => setOpenMenus({ ...openMenus, [item.label]: open })}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all outline-none',
                        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-background border border-border text-foreground hover:bg-accent/50'
                      )}
                      aria-label={item.label}
                      aria-expanded={isMenuOpen}
                    >
                      {ItemIcon && <ItemIcon className="size-4 shrink-0" />}
                      <span>{item.label}</span>
                      <svg
                        className={cn('size-4 shrink-0 transition-transform', isMenuOpen && 'rotate-180')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {item.children?.map((child) => (
                      <DropdownMenuItem key={child.to} asChild>
                        <Link to={child.to} className={cn(isActiveRoute(child.to) && 'bg-accent')}>
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={item.label}
                to={item.to || '#'}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all outline-none',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-background border border-border text-foreground hover:bg-accent/50'
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {ItemIcon && <ItemIcon className="size-4 shrink-0" />}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Profile Area */}
        <div className="flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarSrc} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left hidden sm:block">
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.email && <span className="text-xs text-muted-foreground">{user.email}</span>}
                  </div>
                  <svg className="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarSrc} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      {user.email && <span className="text-xs text-muted-foreground">{user.email}</span>}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {onLogout && (
                  <>
                    <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/50 transition-colors"
              aria-label="Login"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:block">Login</span>
            </Link>
          )}
        </div>
      </header>
    )
  }
)

HeaderOrganism.displayName = 'HeaderOrganism'

