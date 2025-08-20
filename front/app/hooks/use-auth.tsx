import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { userService } from '@/services/user-service'
import type { User } from '@/types/user'
import { toast } from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already authenticated on app start
    const initializeAuth = async () => {
      try {
        if (userService.isAuthenticated()) {
          const currentUser = userService.getCurrentUser()
          if (currentUser) {
            setUser(currentUser)
          }
        }
      } catch (error) {
        // Token might be expired or invalid
        userService.logout()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await userService.login(email, password)
      setUser(response.user)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error: any) {
      // Don't show toast error here, let the form handle it
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    userService.logout()
    setUser(null)
    toast.success('Logged out successfully')
    navigate('/', { replace: true })
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && userService.isAuthenticated()
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
