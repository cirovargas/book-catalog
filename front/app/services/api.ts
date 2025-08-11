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
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
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
    const message = error.response?.data?.error || error.message || 'An error occurred'
    toast.error(message)
  }
}

export const apiService = new ApiService()
