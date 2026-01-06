import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import {
  Edit,
  ArrowLeft,
  Mail,
  Calendar,
  Shield
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useUsers } from '@/hooks/use-users'
import { DeleteButton } from '@/components/crud/delete-button'

import { CrudDetailLayout } from '@/components/crud/crud-layouts'
import { CrudPageHeader } from '@/components/crud/crud-page-header'

export default function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { selectedUser, isLoadingUser, fetchUser, deleteUser } =
    useUsers()

  useEffect(() => {
    if (id) {
      fetchUser(parseInt(id, 10))
    }
  }, [id, fetchUser])

  function formatDate(dateString?: string) {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString()
  }

  function getRoleBadgeVariant(roles: string[]) {
    if (roles.includes('ROLE_ADMIN')) return 'destructive'
    return 'secondary'
  }

  async function handleDelete() {
    if (!selectedUser) return
    await deleteUser(selectedUser.id)
    navigate('/users')
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
        <div className="text-sm text-muted-foreground">
          User not found
        </div>
      </div>
    )
  }

  return (
    <CrudDetailLayout
      header={
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => navigate('/users')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Users
            </Button>

            <CrudPageHeader
              title="User Details"
              description="View and manage user information"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/users/${selectedUser.id}/edit`}>
              <Button variant="outline" type="button">
                <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
                Edit
              </Button>
            </Link>

            <DeleteButton
              onConfirm={handleDelete}
              title="Delete user"
              description="Are you sure you want to delete this user? This action cannot be undone."
            >
              Delete
            </DeleteButton>
          </div>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" aria-hidden="true" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-xs font-medium uppercase text-muted-foreground">
                User ID
              </span>
              <p className="text-lg font-medium">{selectedUser.id}</p>
            </div>

            <div>
              <span className="text-xs font-medium uppercase text-muted-foreground">
                Email Address
              </span>
              <p className="text-lg font-medium">{selectedUser.email}</p>
            </div>

            {selectedUser.name && (
              <div>
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Full Name
                </span>
                <p className="text-lg font-medium">
                  {selectedUser.name}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Roles & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" aria-hidden="true" />
              Roles & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span className="mb-2 block text-xs font-medium uppercase text-muted-foreground">
                Assigned Roles
              </span>
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

        {/* Timeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" aria-hidden="true" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Created At
                </span>
                <p className="text-lg font-medium">
                  {formatDate(selectedUser.createdAt)}
                </p>
              </div>
              <div>
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Last Updated
                </span>
                <p className="text-lg font-medium">
                  {formatDate(selectedUser.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CrudDetailLayout>
  )
}

