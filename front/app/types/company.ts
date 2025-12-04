export interface Company {
  id: number
  corporateName: string
  tradeName: string
  cnpj: string
  email: string
  phone?: string | null
  mobile?: string | null
  responsibleName?: string | null
  communicationVehicleTypeId: number
  cep: string
  street: string
  number: string
  neighborhood: string
  complement?: string | null
  state: string
  city: string
  status: string
  userId?: number | null
  createdAt?: string
  updatedAt?: string
}

export interface CreateCompanyRequest {
  corporateName: string
  tradeName: string
  cnpj: string
  email: string
  phone?: string | null
  mobile?: string | null
  responsibleName?: string | null
  communicationVehicleTypeId: number
  cep: string
  street: string
  number: string
  neighborhood: string
  complement?: string | null
  state: string
  city: string
  status: string
  generateUser?: boolean
}

export interface UpdateCompanyRequest {
  corporateName: string
  tradeName: string
  email: string
  phone?: string | null
  mobile?: string | null
  responsibleName?: string | null
  communicationVehicleTypeId: number
  cep: string
  street: string
  number: string
  neighborhood: string
  complement?: string | null
  state: string
  city: string
  status: string
}

export interface CompanyListResponse {
  success: boolean
  data: {
    companies: Company[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }
}

export interface CompanyResponse {
  success: boolean
  data: Company
}

