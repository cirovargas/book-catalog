import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type {
  CommunicationVehicleType,
  CreateCommunicationVehicleTypeRequest,
  UpdateCommunicationVehicleTypeRequest,
} from '@/types/communication-vehicle-type'
import { z } from 'zod'

interface CommunicationVehicleTypeFormProps {
  communicationVehicleType?: CommunicationVehicleType
  onSubmit: (
    data: CreateCommunicationVehicleTypeRequest | UpdateCommunicationVehicleTypeRequest
  ) => Promise<void>
  isLoading?: boolean
  mode: 'create' | 'edit'
}

export function CommunicationVehicleTypeForm({
  communicationVehicleType,
  onSubmit,
  isLoading = false,
  mode,
}: CommunicationVehicleTypeFormProps) {
  const schema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    description: z.string().optional().nullable(),
    status: z.enum(['active', 'inactive']),
  })

  type FormData = z.infer<typeof schema>

  const defaultValues = {
    name: communicationVehicleType?.name || '',
    description: communicationVehicleType?.description || '',
    status: (communicationVehicleType?.status || 'active') as 'active' | 'inactive',
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const statusValue = watch('status')

  const handleFormSubmit = async (data: FormData) => {
    await onSubmit(data)
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>
          {mode === 'create'
            ? 'Create New Communication Vehicle Type'
            : 'Edit Communication Vehicle Type'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              placeholder="e.g., Television, Radio, Internet"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Enter a description for this communication vehicle type"
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Status Field */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="status"
              checked={statusValue === 'active'}
              onCheckedChange={(checked) => setValue('status', checked ? 'active' : 'inactive')}
            />
            <Label
              htmlFor="status"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

