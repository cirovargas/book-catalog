import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/hooks/use-auth'
import { AppSidebar } from '@/components/app-sidebar/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout, isAuthenticated, isLoading } = useAuth()

  const handleLogout = () => {
    logout()
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoadingSpinner size="md" />
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              {/*<Breadcrumb>*/}
              {/*    <BreadcrumbList>*/}
              {/*        <BreadcrumbItem className="hidden md:block">*/}
              {/*            <BreadcrumbLink href="#">*/}
              {/*                Building Your Application*/}
              {/*            </BreadcrumbLink>*/}
              {/*        </BreadcrumbItem>*/}
              {/*        <BreadcrumbSeparator className="hidden md:block" />*/}
              {/*        <BreadcrumbItem>*/}
              {/*            <BreadcrumbPage>Data Fetching</BreadcrumbPage>*/}
              {/*        </BreadcrumbItem>*/}
              {/*    </BreadcrumbList>*/}
              {/*</Breadcrumb>*/}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />

            {/*<button onClick={handleLogout}>Logout</button>*/}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default ProtectedLayout
