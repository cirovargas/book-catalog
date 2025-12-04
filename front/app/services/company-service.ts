import { apiService, type ApiSuccessResponse } from './api'
import type {
  Company,
  CompanyListResponse,
  CompanyResponse,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from '@/types/company'

export class CompanyService {
  private readonly baseUrl = '/companies'

  async getAll(
    page = 1,
    limit = 10,
    search?: string,
    cnpj?: string,
    status?: string
  ): Promise<CompanyListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (search) {
      params.append('search', search)
    }

    if (cnpj) {
      params.append('cnpj', cnpj)
    }

    if (status) {
      params.append('status', status)
    }

    return apiService.get<CompanyListResponse>(`${this.baseUrl}?${params.toString()}`)
  }

  async getById(id: number): Promise<CompanyResponse> {
    return apiService.get<CompanyResponse>(`${this.baseUrl}/${id}`)
  }

  async create(data: CreateCompanyRequest): Promise<ApiSuccessResponse<string>> {
    return apiService.post<ApiSuccessResponse<string>>(this.baseUrl, data)
  }

  async update(id: number, data: UpdateCompanyRequest): Promise<ApiSuccessResponse<string>> {
    return apiService.put<ApiSuccessResponse<string>>(`${this.baseUrl}/${id}`, data)
  }

  async delete(id: number): Promise<ApiSuccessResponse<string>> {
    return apiService.delete<ApiSuccessResponse<string>>(`${this.baseUrl}/${id}`)
  }
}

export const companyService = new CompanyService()
