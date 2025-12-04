import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { CommunicationVehicleTypeForm } from './components/communication-vehicle-type-form'
import { useCommunicationVehicleTypes } from '@/hooks/use-communication-vehicle-types'
import type { UpdateCommunicationVehicleTypeRequest } from '@/types/communication-vehicle-type'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ArrowLeft } from 'lucide-react'

export default function EditCommunicationVehicleType() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    selectedCommunicationVehicleType,
    isLoadingItem,
    fetchById,
    update,
  } = useCommunicationVehicleTypes()

  useEffect(() => {
    if (id) {
      fetchById(parseInt(id))
    }
  }, [id, fetchById])

  const handleSubmit = async (data: UpdateCommunicationVehicleTypeRequest) => {
    if (!selectedCommunicationVehicleType) return

    try {
      setIsSubmitting(true)
      await update(selectedCommunicationVehicleType.id, data)
      navigate('/configurations/communication-vehicle-types')
    } catch (error: any) {
      // Error handling is done in the store
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingItem) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" />
      </div>
    )
  }

  if (!selectedCommunicationVehicleType) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Communication vehicle type not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/configurations/communication-vehicle-types')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Edit Communication Vehicle Type</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update communication vehicle type information
        </p>
      </div>

      <CommunicationVehicleTypeForm
        mode="edit"
        communicationVehicleType={selectedCommunicationVehicleType}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  )
}

