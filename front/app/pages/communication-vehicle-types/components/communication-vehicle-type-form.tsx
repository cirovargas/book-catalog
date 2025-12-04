import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const communicationVehicleTypeSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  status: z.enum(['active', 'inactive'], {
    required_error: 'Status é obrigatório',
  }),
})

type CommunicationVehicleTypeFormData = z.infer<typeof communicationVehicleTypeSchema>

interface CommunicationVehicleTypeFormProps {
  mode: 'create' | 'edit'
  initialData?: {
    id?: number
    name: string
    description?: string | null
    status: 'active' | 'inactive'
  }
  onSubmit: (data: CommunicationVehicleTypeFormData) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

export function CommunicationVehicleTypeForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CommunicationVehicleTypeFormProps) {
  const form = useForm<CommunicationVehicleTypeFormData>({
    resolver: zodResolver(communicationVehicleTypeSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      status: initialData?.status || 'active',
    },
  })

  const handleSubmit = async (data: CommunicationVehicleTypeFormData) => {
    try {
      await onSubmit(data)
      form.reset()
    } catch (error) {
      // Error is handled by parent component
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Nome do tipo de veículo
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: TV, Rádio, Portal…"
                    className="h-12"
                    disabled={isSubmitting}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Descrição
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descrição opcional do tipo de veículo"
                    className="min-h-[100px] resize-none"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Field */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Status
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-12 px-8"
          >
            {mode === 'create' ? 'Cancelar' : 'Voltar'}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-8"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                {mode === 'create' ? 'Cadastrando...' : 'Salvando...'}
              </span>
            ) : mode === 'create' ? (
              'Cadastrar'
            ) : (
              'Salvar alterações'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

