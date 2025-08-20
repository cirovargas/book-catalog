import { apiService } from './api'
import { getUserFromToken, isTokenExpired } from '@/utils/jwt'
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

    // Store token
    localStorage.setItem('token', response.token)

    // Decode JWT to get user data
    const tokenData = getUserFromToken(response.token)
    if (!tokenData) {
      throw new Error('Invalid token received')
    }

    const user: User = {
      id: 1, // We'll need to get this from a separate API call or include in JWT
      email: tokenData.email,
      roles: tokenData.roles,
    }

    localStorage.setItem('user', JSON.stringify(user))

    return { token: response.token, user }
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getCurrentUser(): User | null {
    const token = this.getToken()
    if (!token) {
      return null
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      this.logout()
      return null
    }

    // Try to get user from localStorage first
    const userStr = localStorage.getItem('user')
    if (userStr) {
      return JSON.parse(userStr)
    }

    // If no user in localStorage, try to decode from token
    const tokenData = getUserFromToken(token)
    if (tokenData) {
      const user: User = {
        id: 1, // Default ID, should be fetched from API
        email: tokenData.email,
        roles: tokenData.roles,
      }
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }

    return null
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }
}

export const userService = new UserService()
