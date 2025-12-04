export interface CommunicationVehicleType {
  id: number
  name: string
  description?: string | null
  status: string
}

export interface CreateCommunicationVehicleTypeRequest {
  name: string
  description?: string | null
  status: string
}

export interface UpdateCommunicationVehicleTypeRequest {
  name: string
  description?: string | null
  status: string
}

export interface CommunicationVehicleTypeListResponse {
  success: boolean
  data: {
    communication_vehicle_types: CommunicationVehicleType[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }
}

export interface CommunicationVehicleTypeResponse {
  success: boolean
  data: CommunicationVehicleType
}

