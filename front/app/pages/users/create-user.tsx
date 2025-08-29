import { useState } from 'react'
import { useNavigate } from 'react-router'
import { UserForm } from '@/pages/users/components/user-form'
import { useUsers } from '@/hooks/use-users'
import type { CreateUserRequest, UpdateUserRequest } from '@/types/user'

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { createUser } = useUsers()

  const handleSubmit = async (data: CreateUserRequest | UpdateUserRequest) => {
    try {
      setIsLoading(true)
      // Since this is create mode, we know data is CreateUserRequest
      await createUser(data as CreateUserRequest)
      navigate('/users')
    } catch (error: any) {
      // Error handling is done in the store
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
