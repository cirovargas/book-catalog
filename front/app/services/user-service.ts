import { apiService } from './api'
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserResponse,
  ApiSuccessResponse,
} from '@/types/user'

export class UserService {
  async getUsers(page = 1, limit = 10, search?: string): Promise<UserListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (search) {
      params.append('search', search)
    }

    return apiService.get<UserListResponse>(`/users?${params.toString()}`)
  }

  async getUser(id: number): Promise<UserResponse> {
    return apiService.get<UserResponse>(`/users/${id}`)
  }

  async createUser(userData: CreateUserRequest): Promise<ApiSuccessResponse> {
    return apiService.post<ApiSuccessResponse>('/users', userData)
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<ApiSuccessResponse> {
    return apiService.put<ApiSuccessResponse>(`/users/${id}`, userData)
  }

  async deleteUser(id: number): Promise<ApiSuccessResponse> {
    return apiService.delete<ApiSuccessResponse>(`/users/${id}`)
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await apiService.post<{ token: string }>('/login_check', {
      username: email,
      password,
    })

    // Store token temporarily
    localStorage.setItem('token', response.token)

    // Create a mock user object from the JWT payload for now
    // In a real implementation, you might decode the JWT or fetch user data
    const user: User = {
      id: 1,
      email: email,
      roles: ['ROLE_USER'], // This would come from JWT or separate API call
    }

    localStorage.setItem('user', JSON.stringify(user))

    return { token: response.token, user }
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const userService = new UserService()
