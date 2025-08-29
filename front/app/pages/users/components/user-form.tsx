import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import type { User, CreateUserRequest, UpdateUserRequest } from '@/types/user'
import { z } from 'zod'

interface UserFormProps {
  user?: User
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => Promise<void>
  isLoading?: boolean
  mode: 'create' | 'edit'
}

export function UserForm({ user, onSubmit, isLoading = false, mode }: UserFormProps) {

  const schema = z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    confirmPassword: z.string(),
    name: z.string().optional(),
    avatar: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    roles: z.array(z.string()).min(1, 'At least one role must be selected'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

  type UserFormData = z.infer<typeof schema>

  const defaultValues = {
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    name: user?.name || '',
    avatar: user?.avatar || '',
    roles: user?.roles || ['ROLE_USER'],
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const watchedPassword = watch('password')
  const watchedRoles = watch('roles')

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      // Transform form data to API format
      const submitData = {
        email: data.email,
        name: data.name || undefined,
        avatar: data.avatar || undefined,
        roles: data.roles,
        ...(data.password && { password: data.password }),
      }

      await onSubmit(submitData)

      // Reset form on successful submission
      if (mode === 'create') {
        reset()
      }
    } catch (error) {
      // Error handling is done in the parent component
    }
  }

  const handleRoleChange = (role: string, checked: boolean) => {
    const currentRoles = watchedRoles || []
    const newRoles = checked
      ? [...currentRoles, role]
      : currentRoles.filter(r => r !== role)

    setValue('roles', newRoles)
  }

  const availableRoles = [
    { value: 'ROLE_USER', label: 'User', description: 'Basic user access' },
    { value: 'ROLE_ADMIN', label: 'Administrator', description: 'Full system access' },
  ]

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create New User' : 'Edit User'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="user@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Avatar Field */}
          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar URL (Optional)</Label>
            <Input
              id="avatar"
              type="url"
              {...register('avatar')}
              placeholder="https://example.com/avatar.jpg"
            />
            {errors.avatar && (
              <p className="text-sm text-red-600">{errors.avatar.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password {mode === 'edit' && '(leave blank to keep current password)'}
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder={mode === 'create' ? 'Enter password' : 'Enter new password'}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          {watchedPassword && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm password"
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          {/* Roles Section */}
          <div className="space-y-4">
            <Label>User Roles</Label>
            <div className="space-y-3">
              {availableRoles.map((role) => (
                <div key={role.value} className="flex items-start space-x-3">
                  <Checkbox
                    id={role.value}
                    checked={watchedRoles?.includes(role.value) || false}
                    onCheckedChange={(checked) => handleRoleChange(role.value, checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor={role.value} className="text-sm font-medium">
                      {role.label}
                    </Label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {errors.roles && (
              <p className="text-sm text-red-600">{errors.roles.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isSubmitting}>
              {isLoading || isSubmitting
                ? (mode === 'create' ? 'Creating...' : 'Updating...')
                : (mode === 'create' ? 'Create User' : 'Update User')
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
