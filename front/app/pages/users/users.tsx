import { useEffect } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useUserStore, useUserSelectors } from '@/stores/user-store'
import type { User } from '@/types/user'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function Users() {
  const {
    users,
    isLoading,
    searchQuery,
    currentPage,
    fetchUsers,
    deleteUser,
    setSearchQuery,
  } = useUserStore()

  const { paginationInfo, hasUsers } = useUserSelectors()

  useEffect(() => {
    fetchUsers(currentPage, searchQuery)
  }, [])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    fetchUsers(1, value) // Reset to first page when searching
  }

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      await deleteUser(userId)
    } catch (error) {
      // Error handling is done in the store
    }
  }

  const handlePageChange = (newPage: number) => {
    fetchUsers(newPage, searchQuery)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  const getRoleBadgeVariant = (roles: string[]) => {
    if (roles.includes('ROLE_ADMIN')) return 'destructive'
    return 'secondary'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage user accounts and permissions
          </p>
        </div>
        <Link to="/users/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Loading users...</div>
            </div>
          ) : !hasUsers ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">No users found</div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Roles</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          <div className="font-medium">{user.email}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <Badge
                                key={role}
                                variant={getRoleBadgeVariant(user.roles)}
                                className="text-xs"
                              >
                                {role.replace('ROLE_', '')}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Link to={`/users/${user.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/users/${user.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {((paginationInfo.currentPage - 1) * 10) + 1} to{' '}
                  {Math.min(paginationInfo.currentPage * 10, paginationInfo.totalUsers)} of{' '}
                  {paginationInfo.totalUsers} users
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                    disabled={!paginationInfo.hasPrevPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
                    disabled={!paginationInfo.hasNextPage}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
