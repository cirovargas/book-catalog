import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  index('pages/login/login.tsx'),
  layout('components/protected-layout/protected-layout.tsx', [
    route('dashboard', 'pages/dashboard/dashboard.tsx'),
    route('theme-demo', 'pages/theme-demo/theme-demo.tsx'),
    route('users', 'pages/users/users.tsx'),
    route('users/create', 'pages/users/create-user.tsx'),
    route('users/:id', 'pages/users/user-detail.tsx'),
    route('users/:id/edit', 'pages/users/edit-user.tsx'),
    route('configurations/communication-vehicle-types', 'pages/configurations/communication-vehicle-types/communication-vehicle-types.tsx'),
    route('configurations/communication-vehicle-types/create', 'pages/configurations/communication-vehicle-types/create-communication-vehicle-type.tsx'),
    route('configurations/communication-vehicle-types/:id/edit', 'pages/configurations/communication-vehicle-types/edit-communication-vehicle-type.tsx')
  ])
] satisfies RouteConfig
