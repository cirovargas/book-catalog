import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'

import { UserForm } from '@/pages/users/components/user-form'
import { useUsers } from '@/hooks/use-users'
import type { UpdateUserRequest } from '@/types/user'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

import { CrudFormLayout } from '@/components/crud/crud-layouts'
import { CrudPageHeader } from '@/components/crud/crud-page-header'

export default function EditUser() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { selectedUser, isLoadingUser, fetchUser, updateUser } =
    useUsers()

  useEffect(() => {
    if (id) {
      fetchUser(parseInt(id, 10))
    }
  }, [id, fetchUser])

  async function handleSubmit(data: UpdateUserRequest) {
    if (!selectedUser) return

    try {
      setIsSubmitting(true)
      await updateUser(selectedUser.id, data)
      navigate(`/users/${selectedUser.id}`)
    } finally {
      setIsSubmitting(false)
    }
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
    <CrudFormLayout
      header={
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => navigate(`/users/${selectedUser.id}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to User
          </Button>

          <CrudPageHeader
            title="Edit User"
            description="Update user information and permissions"
          />
        </div>
      }
    >
      <UserForm
        mode="edit"
        user={selectedUser}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </CrudFormLayout>
  )
}
