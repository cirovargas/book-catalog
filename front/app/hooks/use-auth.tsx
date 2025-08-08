import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useLocalStorage } from './use-local-storage'
import type { AuthUser } from '@/types/auth-user'
interface AuthContextType {
  user: AuthUser | null
  login: (data: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const login = async (data) => {
    setUser(data)
    navigate('/dashboard')
  }

  const logout = () => {
    setUser(null)
    navigate('/', { replace: true })
  }

  // const value = useMemo(
  //     () => ({
  //         user,
  //         login,
  //         logout,
  //     }),
  //     [user]
  // );

  const value = {
    user,
    login,
    logout
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
