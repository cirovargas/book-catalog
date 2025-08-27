import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, Settings, Activity } from 'lucide-react'

export default function DashboardHome() {
  const { user } = useAuth()

  const isAdmin = user?.roles?.includes('ROLE_ADMIN')

  const stats = [
    {
      title: 'Total Users',
      value: '12',
      icon: Users,
      description: 'Active users in the system',
      adminOnly: true
    },
    {
      title: 'Total Books',
      value: '156',
      icon: BookOpen,
      description: 'Books in the catalog'
    },
    {
      title: 'Categories',
      value: '8',
      icon: Settings,
      description: 'Book categories'
    },
    {
      title: 'Recent Activity',
      value: '24',
      icon: Activity,
      description: 'Actions in the last 24h'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.email}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          // Hide admin-only stats for non-admin users
          if (stat.adminOnly && !isAdmin) {
            return null
          }

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Book Management</h4>
              <div className="space-y-1">
                <a href="/books" className="block text-sm text-blue-600 hover:underline">
                  View all books
                </a>
                <a href="/books/create" className="block text-sm text-blue-600 hover:underline">
                  Add new book
                </a>
              </div>
            </div>

            {isAdmin && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Administration</h4>
                <div className="space-y-1">
                  <a href="/users" className="block text-sm text-blue-600 hover:underline">
                    Manage users
                  </a>
                  <a href="/users/create" className="block text-sm text-blue-600 hover:underline">
                    Add new user
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="text-sm text-green-600">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API</span>
                <span className="text-sm text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Authentication</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
