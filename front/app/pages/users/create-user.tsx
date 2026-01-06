import { useState } from 'react'
import { useNavigate } from 'react-router'
import { UserForm } from '@/pages/users/components/user-form'
import { useUsers } from '@/hooks/use-users'
import type {
  CreateUserRequest,
  UpdateUserRequest
} from '@/types/user'

import { CrudFormLayout } from '@/components/crud/crud-layouts'
import { CrudPageHeader } from '@/components/crud/crud-page-header'

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { createUser } = useUsers()

  async function handleSubmit(data: CreateUserRequest | UpdateUserRequest) {
    try {
      setIsLoading(true)
      await createUser(data as CreateUserRequest)
      navigate('/users')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CrudFormLayout
      header={
        <CrudPageHeader
          title="Create User"
          description="Add a new user to the system"
        />
      }
    >
      <UserForm
        mode="create"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </CrudFormLayout>
  )
}
