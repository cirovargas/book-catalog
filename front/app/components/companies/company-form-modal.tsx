import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { X } from 'lucide-react'
import type { Company, CreateCompanyRequest } from '@/types/company'
import type { CommunicationVehicleType } from '@/types/communication-vehicle-type'
import { communicationVehicleTypeService } from '@/services/communication-vehicle-type-service'

// Brazilian states
const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
]

// CNPJ validation
const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]/g, '')

  if (cnpj.length !== 14) return false

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cnpj)) return false

  // Validate check digits
  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  length = length + 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return result === parseInt(digits.charAt(1))
}

// Form schema
const companyFormSchema = z.object({
  cnpj: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .refine(validateCNPJ, 'CNPJ inválido'),
  corporateName: z.string().min(1, 'Razão social é obrigatória'),
  tradeName: z.string().min(1, 'Nome fantasia é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  responsibleName: z.string().optional(),
  communicationVehicleTypeId: z.coerce.number().min(1, 'Tipo de empresa é obrigatório'),
  generateUser: z.boolean(),
  cep: z.string().min(1, 'CEP é obrigatório'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  complement: z.string().optional(),
  state: z.string().min(2, 'UF é obrigatória'),
  city: z.string().min(1, 'Município é obrigatório')
})

type CompanyFormData = z.infer<typeof companyFormSchema>

interface CompanyFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateCompanyRequest) => Promise<void>
  mode: 'create' | 'edit'
  initialData?: Company | null
  isSubmitting?: boolean
}

export function CompanyFormModal({
                                   open,
                                   onClose,
                                   onSubmit,
                                   mode,
                                   initialData,
                                   isSubmitting = false
                                 }: CompanyFormModalProps) {
  const [vehicleTypes, setVehicleTypes] = useState<CommunicationVehicleType[]>([])
  const [isLoadingTypes, setIsLoadingTypes] = useState(true)

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      cnpj: '',
      corporateName: '',
      tradeName: '',
      email: '',
      phone: '',
      mobile: '',
      responsibleName: '',
      communicationVehicleTypeId: 0,
      generateUser: false,
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      state: '',
      city: ''
    }
  })

  // Load communication vehicle types
  useEffect(() => {
    const loadVehicleTypes = async () => {
      try {
        setIsLoadingTypes(true)
        const response = await communicationVehicleTypeService.getAll(1, 100) // Get all types
        setVehicleTypes(response.data?.communication_vehicle_types || [])
      } catch (error) {
        console.error('Failed to load vehicle types:', error)
        setVehicleTypes([])
      } finally {
        setIsLoadingTypes(false)
      }
    }

    if (open) {
      loadVehicleTypes()
    }
  }, [open])

  // Load initial data for edit mode
  useEffect(() => {
    if (initialData && mode === 'edit') {
      form.reset({
        cnpj: initialData.cnpj || '',
        corporateName: initialData.corporateName || '',
        tradeName: initialData.tradeName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        mobile: initialData.mobile || '',
        responsibleName: initialData.responsibleName || '',
        communicationVehicleTypeId: initialData.communicationVehicleTypeId || 0,
        generateUser: false, // This field doesn't apply to edit mode
        cep: initialData.cep || '',
        street: initialData.street || '',
        number: initialData.number || '',
        neighborhood: initialData.neighborhood || '',
        complement: initialData.complement || '',
        state: initialData.state || '',
        city: initialData.city || ''
      })
    } else if (mode === 'create') {
      form.reset({
        cnpj: '',
        corporateName: '',
        tradeName: '',
        email: '',
        phone: '',
        mobile: '',
        responsibleName: '',
        communicationVehicleTypeId: 0,
        generateUser: false,
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        state: '',
        city: ''
      })
    }
  }, [initialData, mode, form])

  const handleSubmit = async (data: CompanyFormData) => {
    try {
      await onSubmit(data as CreateCompanyRequest)
      form.reset()
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Form submission error:', error)
    }
  }

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 14)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
    if (numbers.length <= 12)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12)}`
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8)
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11)
    if (numbers.length <= 2) return numbers ? `(${numbers}` : ''
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {mode === 'create' ? 'Cadastrar empresa' : 'Editar empresa'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Row 1: CNPJ, Razão Social */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 12.345.678/0001-90"
                        {...field}
                        onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                        disabled={mode === 'edit' || isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="corporateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão social</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome registrado da empresa"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Nome Fantasia, E-mail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tradeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome fantasia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome comercial usado publicamente"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Ex: contato@empresa.com.br"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: Telefone Fixo, Celular */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone fixo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: (11) 3456-7890"
                        {...field}
                        onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: (11) 98765-4321"
                        {...field}
                        onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 4: Responsável, Tipo de Empresa, Gerar Usuário */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="responsibleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsável</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome completo do responsável"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="communicationVehicleTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo da empresa</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString() || ''}
                      disabled={isSubmitting || isLoadingTypes}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" style={{ height: 'calc(var(--spacing) * 12)' }}>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generateUser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gerar usuário</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
                      disabled={isSubmitting || mode === 'edit'}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" style={{ height: 'calc(var(--spacing) * 12)' }}>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">Não</SelectItem>
                        <SelectItem value="true">Sim</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 5: CEP, Rua, Número */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 04547-005"
                        {...field}
                        onChange={(e) => field.onChange(formatCEP(e.target.value))}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Avenida das Américas"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 1250"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 6: Complemento, Município, Bairro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Sala 402"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Município</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: São Paulo"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Vila Olímpia"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 7: UF */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" style={{ height: 'calc(var(--spacing) * 12)' }}>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BRAZILIAN_STATES.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Salvando...'
                  : mode === 'create'
                    ? 'Cadastrar'
                    : 'Salvar alterações'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

