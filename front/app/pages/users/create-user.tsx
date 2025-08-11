import { useState } from 'react'
import { useNavigate } from 'react-router'
import { UserForm } from '@/pages/users/components/user-form'
import { userService } from '@/services/user-service'
import type { CreateUserRequest } from '@/types/user'
import { toast } from 'react-hot-toast'

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (data: CreateUserRequest) => {
    try {
      setIsLoading(true)
      await userService.createUser(data)
      toast.success('User created successfully!')
      navigate('/users')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create user')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create User</h1>
        <p className="text-gray-600 dark:text-gray-400">Add a new user to the system</p>
      </div>

      <UserForm mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
