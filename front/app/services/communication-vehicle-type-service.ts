import { apiService, type ApiSuccessResponse } from './api'
import type {
  CommunicationVehicleType,
  CommunicationVehicleTypeListResponse,
  CommunicationVehicleTypeResponse,
  CreateCommunicationVehicleTypeRequest,
  UpdateCommunicationVehicleTypeRequest,
} from '@/types/communication-vehicle-type'

export class CommunicationVehicleTypeService {
  private readonly baseUrl = '/communication-vehicle-types'

  async getAll(
    page = 1,
    limit = 10,
    search?: string
  ): Promise<CommunicationVehicleTypeListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (search) {
      params.append('search', search)
    }

    return apiService.get<CommunicationVehicleTypeListResponse>(
      `${this.baseUrl}?${params.toString()}`
    )
  }

  async getById(id: number): Promise<CommunicationVehicleTypeResponse> {
    return apiService.get<CommunicationVehicleTypeResponse>(`${this.baseUrl}/${id}`)
  }

  async create(
    data: CreateCommunicationVehicleTypeRequest
  ): Promise<ApiSuccessResponse<string>> {
    return apiService.post<ApiSuccessResponse<string>>(this.baseUrl, data)
  }

  async update(
    id: number,
    data: UpdateCommunicationVehicleTypeRequest
  ): Promise<ApiSuccessResponse<string>> {
    return apiService.put<ApiSuccessResponse<string>>(`${this.baseUrl}/${id}`, data)
  }

  async delete(id: number): Promise<ApiSuccessResponse<string>> {
    return apiService.delete<ApiSuccessResponse<string>>(`${this.baseUrl}/${id}`)
  }
}

export const communicationVehicleTypeService = new CommunicationVehicleTypeService()

