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

  async getCurrentUserFromApi(): Promise<User> {
    const response = await apiService.get<UserResponse>('/me')
    return response.data
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

    // Get user data from API
    const user = await this.getCurrentUserFromApi()
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
        id: 1, // Default ID, will be updated when API call is made
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
