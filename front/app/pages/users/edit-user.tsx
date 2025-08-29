import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { UserForm } from '@/pages/users/components/user-form'
import { useUsers } from '@/hooks/use-users'
import type { UpdateUserRequest } from '@/types/user'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ArrowLeft } from 'lucide-react'

export default function EditUser() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { selectedUser, isLoadingUser, fetchUser, updateUser } = useUsers()

  useEffect(() => {
    if (id) {
      fetchUser(parseInt(id))
    }
  }, [id, fetchUser])

  const handleSubmit = async (data: UpdateUserRequest) => {
    if (!selectedUser) return

    try {
      setIsSubmitting(true)
      await updateUser(selectedUser.id, data)
      navigate(`/users/${selectedUser.id}`)
    } catch (error: any) {
      // Error handling is done in the store
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
        <div className="text-gray-500">User not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/users/${selectedUser.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to User
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit User</h1>
          <p className="text-gray-600 dark:text-gray-400">Update user information and permissions</p>
        </div>
      </div>

      <UserForm mode="edit" user={selectedUser} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  )
}
