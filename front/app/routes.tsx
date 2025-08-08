import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  index('pages/login/login.tsx'),
  layout('components/protected-layout/protected-layout.tsx', [route('dashboard', 'pages/dashboard/dashboard.tsx')])
] satisfies RouteConfig
