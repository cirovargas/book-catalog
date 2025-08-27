import axios from 'axios'
import { toast } from 'react-hot-toast'

class ApiService {
  private api: any

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        // Don't redirect on 401 for login endpoint - let the form handle the error
        if (error.response?.status === 401 && !error.config?.url?.includes('/login_check')) {
          // Token expired or invalid (but not login failure)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.api.get(url)
      return response.data
    } catch (error: any) {
      this.handleError(error)
      throw error
    }
  }

  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.api.post(url, data)
      return response.data
    } catch (error: any) {
      this.handleError(error)
      throw error
    }
  }

  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.api.put(url, data)
      return response.data
    } catch (error: any) {
      this.handleError(error)
      throw error
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.api.delete(url)
      return response.data
    } catch (error: any) {
      this.handleError(error)
      throw error
    }
  }

  private handleError(error: any) {
    // Don't show toast for login errors - let the form handle them
    if (error.config?.url?.includes('/login_check')) {
      return
    }
    
    const message = error.response?.data?.error || error.message || 'An error occurred'
    toast.error(message)
  }
}

export const apiService = new ApiService()
