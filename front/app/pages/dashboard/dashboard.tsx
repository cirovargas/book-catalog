import { Outlet } from 'react-router'
import { useAuth } from '@/hooks/use-auth'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h1>This is a Secret page</h1>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  )
}
