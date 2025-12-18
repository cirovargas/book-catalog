'use client'

import * as React from 'react'
import { ChevronDown, ChevronRight, LogIn } from 'lucide-react'
import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'

export interface ProfileMoleculeProps {
  user?: User | null
  onLogout?: () => void
  loginUrl?: string
  className?: string
}

export const ProfileMolecule = React.forwardRef<HTMLDivElement, ProfileMoleculeProps>(
  ({ user, onLogout, loginUrl = '/login', className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    if (!user) {
      return (
        <Link
          to={loginUrl}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/50 transition-colors',
            className
          )}
          {...(props as any)}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-muted">
              <LogIn className="size-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Login</span>
        </Link>
      )
    }

    const initials = user.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || user.email[0].toUpperCase()

    return (
      <div ref={ref} className={cn('flex items-center', className)} {...props}>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/50 transition-colors w-full',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                open && 'bg-accent'
              )}
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name || user.email} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start flex-1 text-left min-w-0">
                <span className="text-sm font-medium truncate w-full">
                  {user.name || user.email}
                </span>
                {user.name && <span className="text-xs text-muted-foreground truncate w-full">{user.email}</span>}
              </div>
              {open ? (
                <ChevronRight className="ml-auto size-4 shrink-0" />
              ) : (
                <ChevronDown className="ml-auto size-4 shrink-0" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name || user.email} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{user.name || user.email}</span>
                  {user.name && <span className="text-xs text-muted-foreground truncate">{user.email}</span>}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {onLogout && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
)

ProfileMolecule.displayName = 'ProfileMolecule'

