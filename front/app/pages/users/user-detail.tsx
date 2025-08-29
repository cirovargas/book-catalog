import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useUsers } from '@/hooks/use-users'
import { 
  Edit, 
  Trash2, 
  ArrowLeft,
  Mail,
  Calendar,
  Shield
} from 'lucide-react'

export default function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { selectedUser, isLoadingUser, fetchUser, deleteUser } = useUsers()

  useEffect(() => {
    if (id) {
      fetchUser(parseInt(id))
    }
  }, [id, fetchUser])

  const handleDelete = async () => {
    if (!selectedUser || !confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      await deleteUser(selectedUser.id)
      navigate('/users')
    } catch (error) {
      // Error handling is done in the store
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString()
  }

  const getRoleBadgeVariant = (roles: string[]) => {
    if (roles.includes('ROLE_ADMIN')) return 'destructive'
    return 'secondary'
  }

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" />
      </div>
    )
  }

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">User not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/users')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <div>
            <h1 className="text-3xl font-bold">User Details</h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage user information
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link to={`/users/${selectedUser.id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                User ID
              </label>
              <p className="text-lg font-medium">{selectedUser.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <p className="text-lg font-medium">{selectedUser.email}</p>
            </div>
            {selectedUser.name && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Full Name
                </label>
                <p className="text-lg font-medium">{selectedUser.name}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Roles & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Roles & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                Assigned Roles
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedUser.roles.map((role) => (
                  <Badge 
                    key={role} 
                    variant={getRoleBadgeVariant(selectedUser.roles)}
                  >
                    {role.replace('ROLE_', '')}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timestamps */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Created At
                </label>
                <p className="text-lg font-medium">{formatDate(selectedUser.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Updated
                </label>
                <p className="text-lg font-medium">{formatDate(selectedUser.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
