export interface User {
  id: number
  email: string
  name?: string
  avatar?: string
  roles: string[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateUserRequest {
  email: string
  password: string
  name?: string
  avatar?: string
  roles?: string[]
}

export interface UpdateUserRequest {
  email: string
  name?: string
  avatar?: string
  roles?: string[]
  password?: string
}

export interface UserListResponse {
  success: boolean
  data: {
    users: User[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }
}

export interface UserResponse {
  success: boolean
  data: User
}

export interface ApiErrorResponse {
  success: false
  error: string
}

export interface ApiSuccessResponse {
  success: true
  data: any
}
