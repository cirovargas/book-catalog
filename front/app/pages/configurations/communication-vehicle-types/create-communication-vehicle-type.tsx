import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CommunicationVehicleTypeForm } from './components/communication-vehicle-type-form'
import { useCommunicationVehicleTypes } from '@/hooks/use-communication-vehicle-types'
import type {
  CreateCommunicationVehicleTypeRequest,
  UpdateCommunicationVehicleTypeRequest,
} from '@/types/communication-vehicle-type'

export default function CreateCommunicationVehicleType() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { create } = useCommunicationVehicleTypes()

  const handleSubmit = async (
    data: CreateCommunicationVehicleTypeRequest | UpdateCommunicationVehicleTypeRequest
  ) => {
    try {
      setIsLoading(true)
      await create(data as CreateCommunicationVehicleTypeRequest)
      navigate('/configurations/communication-vehicle-types')
    } catch (error: any) {
      // Error handling is done in the store
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Communication Vehicle Type</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new communication vehicle type to the system
        </p>
      </div>

      <CommunicationVehicleTypeForm
        mode="create"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

