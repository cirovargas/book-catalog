import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { UserForm } from '@/pages/users/components/user-form'
import { userService } from '@/services/user-service'
import type { User, UpdateUserRequest } from '@/types/user'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function EditUser() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      loadUser(parseInt(id))
    }
  }, [id])

  const loadUser = async (userId: number) => {
    try {
      setLoading(true)
      const response = await userService.getUser(userId)
      setUser(response.data)
    } catch (error) {
      toast.error('Failed to load user')
      navigate('/users')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: UpdateUserRequest) => {
    if (!user) return

    try {
      setIsSubmitting(true)
      await userService.updateUser(user.id, data)
      toast.success('User updated successfully!')
      navigate(`/users/${user.id}`)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update user')
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading user...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">User not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/users/${user.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to User
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit User</h1>
          <p className="text-gray-600 dark:text-gray-400">Update user information and permissions</p>
        </div>
      </div>

      <UserForm mode="edit" user={user} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  )
}
