import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import type { Company, CreateCompanyRequest, UpdateCompanyRequest } from '@/types/company'
import type { CommunicationVehicleType } from '@/types/communication-vehicle-type'
import { communicationVehicleTypeService } from '@/services/communication-vehicle-type-service'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

interface CompanyFormProps {
  company?: Company
  onSubmit: (data: CreateCompanyRequest | UpdateCompanyRequest) => Promise<void>
  isLoading?: boolean
  mode: 'create' | 'edit'
}

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

export function CompanyForm({ company, onSubmit, isLoading = false, mode }: CompanyFormProps) {
  const [vehicleTypes, setVehicleTypes] = useState<CommunicationVehicleType[]>([])
  const [loadingTypes, setLoadingTypes] = useState(true)

  const schema = z.object({
    corporateName: z
      .string()
      .min(1, 'Razão Social é obrigatória')
      .max(255, 'Razão Social muito longa'),
    tradeName: z
      .string()
      .min(1, 'Nome Fantasia é obrigatório')
      .max(255, 'Nome Fantasia muito longo'),
    cnpj: z
      .string()
      .min(1, 'CNPJ é obrigatório')
      .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, 'CNPJ inválido. Use o formato XX.XXX.XXX/XXXX-XX ou 14 dígitos'),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail inválido'),
    phone: z.string().optional().nullable(),
    mobile: z.string().optional().nullable(),
    responsibleName: z.string().optional().nullable(),
    communicationVehicleTypeId: z.number({
      required_error: 'Tipo de veículo de comunicação é obrigatório',
      invalid_type_error: 'Selecione um tipo válido'
    }).min(1, 'Selecione um tipo de veículo de comunicação'),
    cep: z
      .string()
      .min(1, 'CEP é obrigatório')
      .regex(/^\d{5}-?\d{3}$/, 'CEP inválido. Use o formato XXXXX-XXX'),
    street: z
      .string()
      .min(1, 'Logradouro é obrigatório')
      .max(255, 'Logradouro muito longo'),
    number: z
      .string()
      .min(1, 'Número é obrigatório')
      .max(20, 'Número muito longo'),
    neighborhood: z
      .string()
      .min(1, 'Bairro é obrigatório')
      .max(255, 'Bairro muito longo'),
    complement: z.string().optional().nullable(),
    state: z
      .string()
      .min(1, 'Estado é obrigatório')
      .length(2, 'Estado deve ter 2 caracteres')
      .refine((val) => BRAZILIAN_STATES.includes(val.toUpperCase()), 'Estado inválido'),
    city: z
      .string()
      .min(1, 'Cidade é obrigatória')
      .max(255, 'Cidade muito longa'),
    status: z.enum(['active', 'inactive']),
    generateUser: mode === 'create' ? z.boolean().optional() : z.never().optional()
  })

  type FormData = z.infer<typeof schema>

  const defaultValues: Partial<FormData> = {
    corporateName: company?.corporateName || '',
    tradeName: company?.tradeName || '',
    cnpj: company?.cnpj || '',
    email: company?.email || '',
    phone: company?.phone || '',
    mobile: company?.mobile || '',
    responsibleName: company?.responsibleName || '',
    communicationVehicleTypeId: company?.communicationVehicleTypeId || undefined,
    cep: company?.cep || '',
    street: company?.street || '',
    number: company?.number || '',
    neighborhood: company?.neighborhood || '',
    complement: company?.complement || '',
    state: company?.state || '',
    city: company?.city || '',
    status: (company?.status || 'active') as 'active' | 'inactive',
    generateUser: false
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const statusValue = watch('status')
  const generateUserValue = watch('generateUser')
  const communicationVehicleTypeIdValue = watch('communicationVehicleTypeId')

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        setLoadingTypes(true)
        const response = await communicationVehicleTypeService.getAll(1, 100)
        // Filter only active types
        const activeTypes = response.data.communication_vehicle_types.filter(
          (type) => type.status === 'active'
        )
        setVehicleTypes(activeTypes)
      } catch (error) {
        toast.error('Erro ao carregar tipos de veículo de comunicação')
      } finally {
        setLoadingTypes(false)
      }
    }

    fetchVehicleTypes()
  }, [])

  const handleFormSubmit = async (data: FormData) => {
    // Remove formatting from CNPJ and CEP before submitting
    const cleanedData = {
      ...data,
      cnpj: data.cnpj.replace(/\D/g, ''),
      cep: data.cep.replace(/\D/g, ''),
      phone: data.phone || null,
      mobile: data.mobile || null,
      responsibleName: data.responsibleName || null,
      complement: data.complement || null
    }

    await onSubmit(cleanedData as CreateCompanyRequest | UpdateCompanyRequest)
  }

  const formatCnpjInput = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const limited = numbers.slice(0, 14)

    if (limited.length <= 2) return limited
    if (limited.length <= 5) return `${limited.slice(0, 2)}.${limited.slice(2)}`
    if (limited.length <= 8) return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`
    if (limited.length <= 12) return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12)}`
  }

  const formatCepInput = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const limited = numbers.slice(0, 8)

    if (limited.length <= 5) return limited
    return `${limited.slice(0, 5)}-${limited.slice(5)}`
  }

  const formatPhoneInput = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.slice(0, 11)
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Cadastrar Nova Empresa' : 'Editar Empresa'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Company Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Informações da Empresa</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CNPJ Field */}
              <div className="space-y-2">
                <Label htmlFor="cnpj">
                  CNPJ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cnpj"
                  type="text"
                  {...register('cnpj')}
                  onChange={(e) => {
                    const formatted = formatCnpjInput(e.target.value)
                    setValue('cnpj', formatted)
                  }}
                  placeholder="XX.XXX.XXX/XXXX-XX"
                  className={errors.cnpj ? 'border-red-500' : ''}
                  maxLength={18}
                  disabled={mode === 'edit'}
                />
                {errors.cnpj && (
                  <p className="text-sm text-red-600">{errors.cnpj.message}</p>
                )}
                {mode === 'edit' && (
                  <p className="text-xs text-gray-500">CNPJ não pode ser alterado</p>
                )}
              </div>

              {/* Corporate Name Field */}
              <div className="space-y-2">
                <Label htmlFor="corporateName">
                  Razão Social <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="corporateName"
                  type="text"
                  {...register('corporateName')}
                  placeholder="Ex: Empresa LTDA"
                  className={errors.corporateName ? 'border-red-500' : ''}
                />
                {errors.corporateName && (
                  <p className="text-sm text-red-600">{errors.corporateName.message}</p>
                )}
              </div>

              {/* Trade Name Field */}
              <div className="space-y-2">
                <Label htmlFor="tradeName">
                  Nome Fantasia <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tradeName"
                  type="text"
                  {...register('tradeName')}
                  placeholder="Ex: Empresa Fantasia"
                  className={errors.tradeName ? 'border-red-500' : ''}
                />
                {errors.tradeName && (
                  <p className="text-sm text-red-600">{errors.tradeName.message}</p>
                )}
              </div>

              {/* Communication Vehicle Type */}
              <div className="space-y-2">
                <Label htmlFor="communicationVehicleTypeId">
                  Tipo de Veículo de Comunicação <span className="text-red-500">*</span>
                </Label>
                {loadingTypes ? (
                  <div className="flex items-center justify-center p-2">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <Select
                    value={communicationVehicleTypeIdValue?.toString()}
                    onValueChange={(value) => setValue('communicationVehicleTypeId', parseInt(value))}
                  >
                    <SelectTrigger className={errors.communicationVehicleTypeId ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.communicationVehicleTypeId && (
                  <p className="text-sm text-red-600">{errors.communicationVehicleTypeId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Informações de Contato</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="empresa@exemplo.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Responsible Name Field */}
              <div className="space-y-2">
                <Label htmlFor="responsibleName">Responsável</Label>
                <Input
                  id="responsibleName"
                  type="text"
                  {...register('responsibleName')}
                  placeholder="Nome do responsável"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="text"
                  {...register('phone')}
                  onChange={(e) => {
                    const formatted = formatPhoneInput(e.target.value)
                    setValue('phone', formatted)
                  }}
                  placeholder="(XX) XXXX-XXXX"
                  maxLength={11}
                />
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <Label htmlFor="mobile">Celular</Label>
                <Input
                  id="mobile"
                  type="text"
                  {...register('mobile')}
                  onChange={(e) => {
                    const formatted = formatPhoneInput(e.target.value)
                    setValue('mobile', formatted)
                  }}
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength={11}
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Endereço</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CEP Field */}
              <div className="space-y-2">
                <Label htmlFor="cep">
                  CEP <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cep"
                  type="text"
                  {...register('cep')}
                  onChange={(e) => {
                    const formatted = formatCepInput(e.target.value)
                    setValue('cep', formatted)
                  }}
                  placeholder="XXXXX-XXX"
                  className={errors.cep ? 'border-red-500' : ''}
                  maxLength={9}
                />
                {errors.cep && (
                  <p className="text-sm text-red-600">{errors.cep.message}</p>
                )}
              </div>

              {/* Street Field */}
              <div className="space-y-2">
                <Label htmlFor="street">
                  Logradouro <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="street"
                  type="text"
                  {...register('street')}
                  placeholder="Rua, Avenida, etc."
                  className={errors.street ? 'border-red-500' : ''}
                />
                {errors.street && (
                  <p className="text-sm text-red-600">{errors.street.message}</p>
                )}
              </div>

              {/* Number Field */}
              <div className="space-y-2">
                <Label htmlFor="number">
                  Número <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="number"
                  type="text"
                  {...register('number')}
                  placeholder="123"
                  className={errors.number ? 'border-red-500' : ''}
                />
                {errors.number && (
                  <p className="text-sm text-red-600">{errors.number.message}</p>
                )}
              </div>

              {/* Complement Field */}
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  type="text"
                  {...register('complement')}
                  placeholder="Apto, Sala, etc."
                />
              </div>

              {/* Neighborhood Field */}
              <div className="space-y-2">
                <Label htmlFor="neighborhood">
                  Bairro <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="neighborhood"
                  type="text"
                  {...register('neighborhood')}
                  placeholder="Nome do bairro"
                  className={errors.neighborhood ? 'border-red-500' : ''}
                />
                {errors.neighborhood && (
                  <p className="text-sm text-red-600">{errors.neighborhood.message}</p>
                )}
              </div>

              {/* State Field */}
              <div className="space-y-2">
                <Label htmlFor="state">
                  Estado (UF) <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={watch('state')}
                  onValueChange={(value) => setValue('state', value)}
                >
                  <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRAZILIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>

              {/* City Field */}
              <div className="space-y-2">
                <Label htmlFor="city">
                  Cidade <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  type="text"
                  {...register('city')}
                  placeholder="Nome da cidade"
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status and User Generation Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Configurações</h3>

            <div className="space-y-3">
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
                  Empresa Ativa
                </Label>
              </div>

              {/* Generate User Field (only on create) */}
              {mode === 'create' && (
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="generateUser"
                    checked={generateUserValue || false}
                    onCheckedChange={(checked) => setValue('generateUser', checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="generateUser"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Gerar usuário de acesso
                    </Label>
                    <p className="text-xs text-gray-500">
                      Se marcado, será criado um usuário com o e-mail da empresa e as credenciais de acesso serão
                      enviadas por e-mail.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : mode === 'create' ? 'Cadastrar Empresa' : 'Atualizar Empresa'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
