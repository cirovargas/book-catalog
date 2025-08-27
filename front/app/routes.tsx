import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  index('pages/login/login.tsx'),
  layout('components/protected-layout/protected-layout.tsx', [
    route('dashboard', 'pages/dashboard/dashboard.tsx'),
    route('theme-demo', 'pages/theme-demo/theme-demo.tsx'),
    route('users', 'pages/users/users.tsx'),
    route('users/create', 'pages/users/create-user.tsx'),
    route('users/:id', 'pages/users/user-detail.tsx'),
    route('users/:id/edit', 'pages/users/edit-user.tsx')
  ])
] satisfies RouteConfig
