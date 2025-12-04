'use client'

import { type LucideIcon, ChevronRight, MoreHorizontal, Trash2, Folder, Forward } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'


type AdministrationItem = {
  name: string
  url: string
  icon: LucideIcon
  items?: {
    title: string
    url: string
  }[]
}

export function NavAdministration({ projects }: { projects: AdministrationItem[] }) {
  const { isMobile } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (url?: string) => {
    if (!url || url === '#') return false
    return currentPath === url || currentPath.startsWith(url + '/')
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const hasChildren = !!item.items?.length
          const parentActive =
            isActive(item.url) ||
            item.items?.some((child) => isActive(child.url))

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={parentActive}>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          const hasRealUrl = item.url && item.url !== '#'

          if (!hasRealUrl) {
            return (
              <Collapsible
                key={item.name}
                asChild
                defaultOpen={parentActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={parentActive}>
                      <item.icon />
                      <span>{item.name}</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }

          return (
            <Collapsible
              key={item.name}
              asChild
              defaultOpen={parentActive}
            >
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={parentActive}>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>

                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Alternar submenu</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

