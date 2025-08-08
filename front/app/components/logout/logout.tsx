import styles from './logout.module.css'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/use-auth'

export default function Logout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (!user) {
    return <></>
  }

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ${styles.logoutButton}`}
    >
      Logout
    </button>
  )
}
